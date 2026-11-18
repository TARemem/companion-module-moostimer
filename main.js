import { InstanceBase, InstanceStatus, Regex } from '@companion-module/base'

const fmt = (ms) => {
  const negative = ms < 0 ? '-' : ''
  const secs = Math.floor(Math.abs(ms) / 1000)
  return `${negative}${String(Math.floor(secs / 3600)).padStart(2, '0')}:${String(Math.floor(secs / 60) % 60).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`
}
const options = [
  { id: 'seconds', type: 'number', label: 'Seconds', default: 300, min: 0, max: 359999 },
]
export default class MoosTimer extends InstanceBase {
  async init(config) {
    this.config = config
    this.state = null
    this.pollTimer = null
    this.inFlight = false
    this.initActions()
    this.initFeedbacks()
    this.initVariables()
    this.initPresets()
    this.startPolling()
  }
  async destroy() {
    clearInterval(this.pollTimer)
    this.pollTimer = null
  }
  getConfigFields() {
    return [
      { type: 'textinput', id: 'host', label: 'MoosTimer IP address or hostname', width: 8, default: '127.0.0.1', regex: Regex.HOSTNAME },
      { type: 'number', id: 'port', label: 'Port', width: 4, default: 3950, min: 1, max: 65535 },
    ]
  }
  async configUpdated(config) {
    this.config = config
    this.state = null
    this.startPolling()
  }
  get baseUrl() {
    const host = String(this.config?.host || '127.0.0.1').trim()
    const port = Number(this.config?.port || 3950)
    return `http://${host}:${port}`
  }
  async request(path, body) {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 1800)
    try {
      const res = await fetch(this.baseUrl + path, body ? {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctrl.signal,
      } : { signal: ctrl.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`)
      return await res.json()
    } finally { clearTimeout(timer) }
  }
  async command(action, data = {}) {
    try {
      const state = await this.request('/api/action', { action, ...data })
      this.updateState(state)
    } catch (e) {
      this.log('error', `Command ${action} failed: ${e.message}`)
      this.updateStatus(InstanceStatus.ConnectionFailure, e.message)
    }
  }
  updateState(state) {
    this.state = state
    this.updateStatus(InstanceStatus.Ok)
    this.setVariableValues({
      remaining: fmt(state.ms || 0),
      remaining_seconds: String(Math.round((state.ms || 0) / 1000)),
      mode: state.mode || '',
      display_mode: state.displayMode || '',
      running: state.running ? 'Running' : 'Paused',
      blinking: state.blinking ? 'Yes' : 'No',
      end_time: state.endTime ? new Date(state.endTime).toLocaleTimeString('de-DE') : '—',
      preset_count: String(state.presets?.length || 0),
    })
    this.checkFeedbacks('running', 'display', 'blinking', 'countmode')
  }
  startPolling() {
    clearInterval(this.pollTimer)
    this.updateStatus(InstanceStatus.Connecting)
    const poll = async () => {
      if (this.inFlight) return
      this.inFlight = true
      try { this.updateState(await this.request('/api/state')) }
      catch (e) { this.state = null; this.updateStatus(InstanceStatus.ConnectionFailure, e.message); this.checkFeedbacks('running', 'display', 'blinking', 'countmode') }
      finally { this.inFlight = false }
    }
    void poll()
    this.pollTimer = setInterval(poll, 300)
  }
  initActions() {
    const simple = [
      ['start', 'Start timer'], ['pause', 'Pause timer'], ['toggle', 'Start / pause'],
      ['reset', 'Reset immediately (no confirmation)'], ['blink', 'Toggle blink'], ['white', 'Toggle force white'],
    ]
    const actions = Object.fromEntries(simple.map(([id, name]) => [id, { name, options: [], callback: () => this.command(id) }]))
    actions.display = {
      name: 'Set presentation display mode',
      options: [{ id: 'displayMode', type: 'dropdown', label: 'Display', default: 'timer', choices: [
        { id: 'timer', label: 'Timer' }, { id: 'clock', label: 'Clock' }, { id: 'blackout', label: 'Blackout' },
      ] }],
      callback: (ev) => this.command('displayMode', { displayMode: ev.options.displayMode }),
    }
    actions.countmode = {
      name: 'Set count direction',
      options: [{ id: 'mode', type: 'dropdown', label: 'Direction', default: 'down', choices: [
        { id: 'down', label: 'Countdown' }, { id: 'up', label: 'Count up' },
      ] }],
      callback: (ev) => this.command('mode', { mode: ev.options.mode }),
    }
    actions.adjust = {
      name: 'Adjust time (positive or negative seconds)',
      options: [{ id: 'seconds', type: 'number', label: 'Adjustment (seconds)', default: 60, min: -86400, max: 86400 }],
      callback: (ev) => this.command('adjust', { seconds: Number(ev.options.seconds) }),
    }
    actions.set = { name: 'Set timer duration', options, callback: (ev) => this.command('set', { seconds: Number(ev.options.seconds) }) }
    actions.preset = {
      name: 'Load MoosTimer preset by name',
      options: [{ id: 'name', type: 'textinput', label: 'Exact preset name', default: '5 Minuten', useVariables: false }],
      callback: (ev) => this.command('preset', { name: String(ev.options.name) }),
    }
    actions.profile = {
      name: 'Load event profile by name',
      options: [{ id: 'name', type: 'textinput', label: 'Exact profile name', default: '', useVariables: false }],
      callback: (ev) => this.command('loadProfile', { name: String(ev.options.name) }),
    }
    this.setActionDefinitions(actions)
  }
  initFeedbacks() {
    const bool = (name, callback) => ({ type: 'boolean', name, defaultStyle: { bgcolor: 0x168a58, color: 0xffffff }, options: [], callback })
    this.setFeedbackDefinitions({
      running: bool('Timer is running', () => !!this.state?.running),
      blinking: bool('Timer is blinking', () => !!this.state?.blinking),
      display: {
        ...bool('Selected presentation mode is active', (ev) => this.state?.displayMode === ev.options.mode),
        options: [{ id: 'mode', type: 'dropdown', label: 'Mode', default: 'timer', choices: [
          { id: 'timer', label: 'Timer' }, { id: 'clock', label: 'Clock' }, { id: 'blackout', label: 'Blackout' },
        ] }],
      },
      countmode: {
        ...bool('Selected count direction is active', (ev) => this.state?.mode === ev.options.mode),
        options: [{ id: 'mode', type: 'dropdown', label: 'Mode', default: 'down', choices: [
          { id: 'down', label: 'Countdown' }, { id: 'up', label: 'Count up' },
        ] }],
      },
    })
  }
   initVariables() {
    this.setVariableDefinitions({
      remaining: { name: 'Formatted remaining time' },
      remaining_seconds: { name: 'Remaining seconds' },
      mode: { name: 'Count direction' },
      display_mode: { name: 'Display mode' },
      running: { name: 'Run status' },
      blinking: { name: 'Blink status' },
      end_time: { name: 'End time' },
      preset_count: { name: 'Number of presets' },
    })
  }
  initPresets() {
    const make = (
      name,
      text,
      actionId,
      actionOptions = {},
      feedbackId,
      feedbackOptions = {}
    ) => ({
      type: 'button',
      category: 'MoosTimer',
      name,
      options: {},
      style: {
        text,
        size: 'auto',
        color: 0xffffff,
        bgcolor: 0x232b36,
      },
      steps: [
        {
          down: [{ actionId, options: actionOptions }],
          up: [],
        },
      ],
      feedbacks: feedbackId
        ? [
            {
              feedbackId,
              options: feedbackOptions,
              style: {
                bgcolor: 0x168a58,
                color: 0xffffff,
              },
            },
          ]
        : [],
    })

    this.setPresetDefinitions({
      start: make('Start', '▶ START', 'start', {}, 'running'),
      pause: make('Pause', 'Ⅱ PAUSE', 'pause'),
      toggle: make('Start / Pause', 'START / PAUSE', 'toggle', {}, 'running'),
      reset: make('Reset', '↺ RESET', 'reset'),

      timer: make(
        'Timer display',
        'TIMER',
        'display',
        { displayMode: 'timer' },
        'display',
        { mode: 'timer' }
      ),

      clock: make(
        'Clock display',
        'UHRZEIT',
        'display',
        { displayMode: 'clock' },
        'display',
        { mode: 'clock' }
      ),

      blackout: make(
        'Blackout',
        'BLACKOUT',
        'display',
        { displayMode: 'blackout' },
        'display',
        { mode: 'blackout' }
      ),

      blink: make('Blink', 'BLINKEN', 'blink', {}, 'blinking'),

      plus60: make('+1 minute', '+1 MIN', 'adjust', { seconds: 60 }),
      minus60: make('-1 minute', '-1 MIN', 'adjust', { seconds: -60 }),
      plus10: make('+10 seconds', '+10 SEK', 'adjust', { seconds: 10 }),
      minus10: make('-10 seconds', '-10 SEK', 'adjust', { seconds: -10 }),

      time: {
        type: 'button',
        category: 'MoosTimer',
        name: 'Live timer',
        options: {},
        style: {
          text: '$(moostimer:remaining)',
          size: 'auto',
          color: 0xffffff,
          bgcolor: 0x232b36,
        },
        steps: [],
        feedbacks: [],
      },
    })
  }
}
