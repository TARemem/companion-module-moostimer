# MoosTimer Companion 0.1.6

Basiert auf 0.1.4. Behebt die externe PNG-Datei-Abhängigkeit von 0.1.5: beide Logo-Bilder sind direkt in main.js eingebettet und werden vom Companion-Build nicht mehr als separate Dateien benötigt.

- Zwei Logo-Presets: kleines Logo ein/aus und Vollbild-Logo-Test
- Zeit-Feedback: Schriftfarbe folgt den MoosTimer-Warnfarben, Hintergrund folgt der Präsentationsfarbe
- Alle Aktionen, Variablen, dynamischen Presets und Zeitformate bleiben erhalten

## Installation
Quellcode im GitHub-Repository aktualisieren, GitHub Actions ausführen, das erzeugte .tgz aus dem Build-Artefakt in Companion importieren. Bestehende Companion-Konfiguration vor Modulwechsel sichern.

## Test
1. Modul startet ohne Timeout.
2. Timer-Zeitbutton zeigt Schriftfarben, nicht farbigen Hintergrund.
3. Beide Logo-Presets funktionieren und zeigen die Bilder.
4. Bestehende Start/Pause/Reset-Buttons funktionieren.

Hinweis: Der Build und die Ausführung in Companion wurden hier nicht durchgeführt; nur Syntax und Paketinhalt geprüft.

## 0.1.7
- Fullscreen-Logo-Test schaltet beim zweiten Drücken zurück auf Timer.
- Beide Logo-Buttons haben Statusfeedback (kleines Logo: sichtbar; Logo-Test: Anzeigemodus aktiv).
- Count-up/down-Umschalter als Preset, Status über `$(moostimer:mode)`.
- Endzeit als eigener Button `$(moostimer:end_time)`.
- Keine Änderungen an der Windows-App. Beschleunigung/Verlangsamung ist noch nicht implementiert.
