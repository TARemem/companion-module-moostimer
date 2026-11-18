import { InstanceBase, InstanceStatus, Regex } from '@companion-module/base'

const logoPng = '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'
const logoTestPng = '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'
const fmt = (ms) => {
  const negative = ms < 0 ? '-' : ''
  const secs = Math.floor(Math.abs(ms) / 1000)
  return `${negative}${String(Math.floor(secs / 3600)).padStart(2, '0')}:${String(Math.floor(secs / 60) % 60).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`
}
// MM:SS or HH:MM:SS; no ambiguous plain seconds input.
export function parseDuration(value) {
  const input = String(value ?? '').trim()
  const parts = input.split(':')
  if (parts.length !== 2 && parts.length !== 3) throw new Error('Use MM:SS or HH:MM:SS (e.g. 05:00 or 01:05:22)')
  if (!parts.every(part => /^\d+$/.test(part))) throw new Error('Time must contain digits and colons only')
  if (parts.slice(1).some(part => part.length !== 2)) throw new Error('Minutes/seconds must have two digits')
  const nums = parts.map(Number)
  if (parts.length === 2) {
    if (nums[1] > 59) throw new Error('Seconds must be 00–59')
    return nums[0] * 60 + nums[1]
  }
  if (nums[1] > 59 || nums[2] > 59) throw new Error('Minutes and seconds must be 00–59')
  return nums[0] * 3600 + nums[1] * 60 + nums[2]
}
const colorNumber = (hex, fallback = 0x232b36) => /^#[0-9a-f]{6}$/i.test(hex || '') ? parseInt(hex.slice(1), 16) : fallback
const timerColor = (state) => {
  if (!state?.settings) return 0xffffff
  const s = state.settings
  let hex = s.white || '#ffffff'
  if (!state.forceWhite && s.automaticColors && state.mode === 'down') {
    hex = state.ms <= Number(s.redAt) * 1000 ? s.red : state.ms <= Number(s.yellowAt) * 1000 ? s.yellow : s.green
  }
  if (String(hex).toLowerCase() === String(s.background).toLowerCase()) hex = String(hex).toLowerCase() === '#ffffff' ? '#000000' : '#ffffff'
  return colorNumber(hex, 0xffffff)
}
const presentationBackground = (state) => colorNumber(state?.settings?.background, 0x000000)

const splitTime = (ms) => {
  const total = Math.floor(Math.abs(Number(ms) || 0) / 1000)
  return { hours: String(Math.floor(total / 3600)).padStart(2, '0'), minutes: String(Math.floor(total / 60) % 60).padStart(2, '0'), seconds: String(total % 60).padStart(2, '0') }
}
const durationField = { id: 'duration', type: 'textinput', label: 'Duration (MM:SS or HH:MM:SS)', default: '05:00', useVariables: false }

export default class MoosTimer extends InstanceBase {
  async init(config) {
    this.config = config
    this.state = null
    this.pollTimer = null
    this.inFlight = false
    this.presetSignature = null
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
      hours: splitTime(state.ms).hours,
      minutes: splitTime(state.ms).minutes,
      seconds: splitTime(state.ms).seconds,
      timer_color: '#' + timerColor(state).toString(16).padStart(6, '0'),
      logo_visible: state.settings?.showLogo ? 'Yes' : 'No',
      paused: state.running ? 'No' : 'Yes',
    })
    this.checkFeedbacks('running', 'paused', 'display', 'blinking', 'countmode', 'timercolor', 'logo')
    const signature = JSON.stringify((state.presets || []).map(p => [p.name, p.seconds]))
    if (signature !== this.presetSignature) {
      this.presetSignature = signature
      this.initPresets()
    }
  }
  startPolling() {
    clearInterval(this.pollTimer)
    this.updateStatus(InstanceStatus.Connecting)
    const poll = async () => {
      if (this.inFlight) return
      this.inFlight = true
      try { this.updateState(await this.request('/api/state')) }
      catch (e) { this.state = null; this.updateStatus(InstanceStatus.ConnectionFailure, e.message); this.checkFeedbacks('running', 'paused', 'display', 'blinking', 'countmode', 'timercolor', 'logo') }
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
    actions.logo = { name: 'Toggle presentation logo (requires MoosTimer 1.0.12+)', options: [], callback: () => this.command('toggleLogo') }
    // Toggle between fullscreen logo and the regular timer view.
    actions.logo_test_toggle = {
      name: 'Toggle fullscreen logo test / timer', options: [],
      callback: () => this.command('displayMode', { displayMode: this.state?.displayMode === 'logo' ? 'timer' : 'logo' }),
    }
    actions.countmode_toggle = {
      name: 'Toggle countdown / count up', options: [],
      callback: () => this.command('mode', { mode: this.state?.mode === 'up' ? 'down' : 'up' }),
    }
    actions.display = {
      name: 'Set presentation display mode',
      options: [{ id: 'displayMode', type: 'dropdown', label: 'Display', default: 'timer', choices: [
        { id: 'timer', label: 'Timer' }, { id: 'clock', label: 'Clock' }, { id: 'blackout', label: 'Blackout' }, { id: 'logo', label: 'Logo fullscreen test' },
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
      name: 'Adjust time',
      options: [
        { ...durationField, default: '01:00', label: 'Adjustment (MM:SS or HH:MM:SS)' },
        { id: 'direction', type: 'dropdown', label: 'Direction', default: 'add', choices: [
          { id: 'add', label: 'Add time (+)' }, { id: 'subtract', label: 'Subtract time (-)' },
        ] },
      ],
      callback: (ev) => {
        try {
          const seconds = parseDuration(ev.options.duration)
          if (seconds > 86400) throw new Error('Adjustment may not exceed 24 hours')
          return this.command('adjust', { seconds: ev.options.direction === 'subtract' ? -seconds : seconds })
        } catch (e) { this.log('error', `Invalid time adjustment: ${e.message}`) }
      },
    }
    actions.set = {
      name: 'Set timer duration',
      options: [{ ...durationField }],
      callback: (ev) => {
        try {
          const seconds = parseDuration(ev.options.duration)
          if (seconds > 359999) throw new Error('Duration exceeds supported maximum')
          return this.command('set', { seconds })
        } catch (e) { this.log('error', `Invalid timer duration: ${e.message}`) }
      },
    }
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
      paused: bool('Timer is paused', () => !!this.state && !this.state.running),
      logo: bool('Presentation logo is visible', () => !!this.state?.settings?.showLogo),
      timercolor: {
        type: 'advanced', name: 'Live timer color (uses presentation colors)', options: [],
        callback: () => ({ bgcolor: presentationBackground(this.state), color: timerColor(this.state) }),
      },
      display: {
        ...bool('Selected presentation mode is active', (ev) => this.state?.displayMode === ev.options.mode),
        options: [{ id: 'mode', type: 'dropdown', label: 'Mode', default: 'timer', choices: [
          { id: 'timer', label: 'Timer' }, { id: 'clock', label: 'Clock' }, { id: 'blackout', label: 'Blackout' }, { id: 'logo', label: 'Logo fullscreen test' },
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
      hours: { name: 'Hours (HH)' },
      minutes: { name: 'Minutes (MM)' },
      seconds: { name: 'Seconds (SS)' },
      timer_color: { name: 'Timer color (hex)' },
      logo_visible: { name: 'Presentation logo visible' },
      paused: { name: 'Paused status' },
    })
  }
  initPresets() {
    const white = 0xffffff, dark = 0x232b36, green = 0x168a58
    const make = (name, text, actionId, actionOptions = {}, feedbackId, feedbackOptions = {}) => ({
      type: 'simple', name,
      style: { text, size: 'auto', color: white, bgcolor: dark },
      steps: [{ down: [{ actionId, options: actionOptions }], up: [] }],
      feedbacks: feedbackId ? [{ feedbackId, options: feedbackOptions, style: { bgcolor: green, color: white } }] : [],
    })
    const time = (name, text) => ({
      type: 'simple', name,
      style: { text, size: 'auto', color: white, bgcolor: 0x000000 },
      steps: [{ down: [], up: [] }],
      feedbacks: [{ feedbackId: 'timercolor', options: {} }],
    })
    const presets = {
      start: make('Start', '▶ START', 'start', {}, 'running'),
      pause: make('Pause', 'Ⅱ PAUSE', 'pause', {}, 'paused'),
      toggle: make('Start / Pause', 'START / PAUSE', 'toggle', {}, 'running'),
      reset: make('Reset immediately', '↺ RESET', 'reset'),
      timer: make('Timer display', 'TIMER', 'display', { displayMode: 'timer' }, 'display', { mode: 'timer' }),
      clock: make('Clock display', 'UHRZEIT', 'display', { displayMode: 'clock' }, 'display', { mode: 'clock' }),
      blackout: make('Blackout', 'BLACKOUT', 'display', { displayMode: 'blackout' }, 'display', { mode: 'blackout' }),
      blink: make('Blink', 'BLINKEN', 'blink', {}, 'blinking'),
      white: make('Force white', 'WEISS', 'white'),
      logo: { ...make('Toggle small presentation logo', '', 'logo', {}, 'logo'), style: { text: '', size: 'auto', color: white, bgcolor: 0x000000, png64: logoPng } },
      logo_test: { ...make('Fullscreen logo signal test (toggle)', '', 'logo_test_toggle', {}, 'display', { mode: 'logo' }), style: { text: '', size: 'auto', color: white, bgcolor: 0x000000, png64: logoTestPng } },
      plus60: make('+1 minute', '+1 MIN', 'adjust', { duration: '01:00', direction: 'add' }),
      minus60: make('-1 minute', '-1 MIN', 'adjust', { duration: '01:00', direction: 'subtract' }),
      plus10: make('+10 seconds', '+10 SEK', 'adjust', { duration: '00:10', direction: 'add' }),
      minus10: make('-10 seconds', '-10 SEK', 'adjust', { duration: '00:10', direction: 'subtract' }),
      endtime: { type: 'simple', name: 'Expected end time', style: { text: 'ENDE\n$(moostimer:end_time)', size: 'auto', color: white, bgcolor: dark }, steps: [{ down: [], up: [] }], feedbacks: [] },
      countmode_toggle: make('Toggle count direction', '$(moostimer:mode)', 'countmode_toggle', {}, 'countmode', { mode: 'up' }),
      time: time('Full live timer', '$(moostimer:remaining)'),
      hours: time('Hours', '$(moostimer:hours)'),
      minutes: time('Minutes', '$(moostimer:minutes)'),
      seconds: time('Seconds', '$(moostimer:seconds)'),
    }
    const fixed = [['5 Minuten',300],['10 Minuten',600],['15 Minuten',900],['20 Minuten',1200],['30 Minuten',1800],['45 Minuten',2700],['60 Minuten',3600]]
    for (const [name, seconds] of fixed) {
      const key = `fixed_${seconds}`
      const duration = `${String(Math.floor(seconds / 60)).padStart(2,'0')}:00`
      presets[key] = make(name, name.toUpperCase(), 'set', { duration })
    }
    const dynamic = []
    for (const [index, item] of (this.state?.presets || []).entries()) {
      if (!item || typeof item.name !== 'string' || !item.name.trim()) continue
      const key = `saved_${index}`
      presets[key] = make(`Saved: ${item.name}`, item.name, 'preset', { name: item.name })
      dynamic.push(key)
    }
    const sections = [
      { id: 'transport', name: 'Timersteuerung', definitions: ['start', 'pause', 'toggle', 'reset', 'countmode_toggle'] },
      { id: 'display', name: 'Anzeige', definitions: ['timer', 'clock', 'blackout', 'logo_test', 'blink', 'white', 'logo'] },
      { id: 'adjustments', name: 'Zeitkorrektur', definitions: ['plus60', 'minus60', 'plus10', 'minus10'] },
      { id: 'status', name: 'Live-Zeitanzeige', definitions: ['time', 'hours', 'minutes', 'seconds', 'endtime'] },
      { id: 'fixed', name: 'Feste Zeiten', definitions: fixed.map(([,seconds]) => `fixed_${seconds}`) },
      { id: 'saved', name: 'Gespeicherte MoosTimer-Presets', definitions: dynamic },
    ]
    this.setPresetDefinitions(sections, presets)
  }
}
