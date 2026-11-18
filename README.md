# MoosTimer Companion Module (development 0.1.1)

Experimental Companion integration for MoosTimer. Source code is provided for development and testing; **not yet tested inside Companion 5.1.2**.

## Build

Install Node.js 22+, then in this directory run:

```bash
npm install
npm run check
npm run package
```

The packaging tool should produce a `.tgz` module package for installation through Companion Modules. See the official Companion module packaging documentation.

## Configuration

Start MoosTimer and enter its LAN IP or `127.0.0.1` if both applications run on the same machine. Default port: **3950**.

## Known limitations

- This package has not been built or loaded in Companion in this environment.
- The module polls the API every 300ms rather than consuming server-sent events.
- Check action names against your running MoosTimer build during first testing.
- Current MoosTimer API has no authentication; restrict use to trusted networks.
- Before public submission, add a maintainer contact and validate manifest with the Bitfocus tooling.

See https://companion.free/for-developers/module-development/ for official guidance.

## Version 0.1.2

The **Set timer duration** and **Adjust time** actions now accept `MM:SS` or `HH:MM:SS`, such as `05:00` and `01:05:22`. Adjust time includes an Add/Subtract dropdown. Invalid values are logged and do not send a command.

**Known limitation:** The built-in button presets remain disabled while the Companion 5.x preset schema is being corrected. Actions, feedbacks and variables are available for manually configured buttons.


## Version 0.1.3 – Companion-Presets

Die Presets sind nach Companion-Modul-API 2.x aufgebaut (`setPresetDefinitions(sections, presets)`, Typ `simple`).
Im Companion-Tab **Buttons → Presets** stehen die Kategorien Timersteuerung, Anzeige, Zeitkorrektur und Status bereit.
Reset erfolgt ohne Rückfrage. Zeiteingaben für Aktionen verwenden MM:SS oder HH:MM:SS.
Die Presets sind noch nicht in Companion 5.1.2 live getestet.

## Version 0.1.4
- Pause-Feedback, farbsynchronisierte Live-Zeit (gesamt und HH/MM/SS einzeln).
- Feste Zeiten und dynamische Presets aus der MoosTimer-Regie. Änderungen werden beim nächsten Poll erkannt; ggf. Preset-Browser neu öffnen.
- Logo-Toggle benötigt MoosTimer 1.0.12 oder neuer.
- Individuelle Farben und Schwellwerte werden aus /api/state übernommen.
