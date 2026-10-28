# T44-coreos-song-link: result

Verdict: **PASS**

Run: Playwright (chromium), fresh context per task, viewport 390x800, site http://localhost:8080. Task file and index.html untouched.

## TC table

| TC | Result | Checks | Failed checks (observed vs expected) |
|---|---|---|---|
| TC-00 | PASS | 1 | - |
| TC-01 | PASS | 9 | - |
| TC-02 | PASS | 4 | - |
| TC-03 | PASS | 13 | - |
| TC-04 | PASS | 8 | - |
| TC-05 | PASS | 7 | - |

Console errors / failed or external requests: none

## Failure classification

No failures. No real site bugs; no wrong task assumptions that blocked a TC.

## Notes

- Observed as the task expects: trailing dot URL gives name "." (minor product finding, see task note). An http:// link is accepted (chip Link, name Canción) although the error text mentions https.

## Check log

- TC-00 PASS: setup reaches student view (obs: `true`)
- TC-01 PASS: label (obs: `true`)
- TC-01 PASS: placeholder (obs: `Pegá el link, y si querés el nombre al lado`)
- TC-01 PASS: Guardar btn, sgerr empty (obs: `true`)
- TC-01 PASS: spotify chip/name (obs: `Spotify|Vals de QA`)
- TC-01 PASS: chip menta (obs: `1`)
- TC-01 PASS: Abrir + Quitar (obs: `true`)
- TC-01 PASS: Abrir attrs (obs: `https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC|_blank|noopener noreferrer`)
- TC-01 PASS: songin gone, no error (obs: `true`)
- TC-01 PASS: persist (obs: `Spotify|Vals de QA|https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC`)
- TC-02 PASS: form back (obs: `true`)
- TC-02 PASS: chip & name gone (obs: `false`)
- TC-02 PASS: counters unchanged (obs: `Del reglamento 0 de 3 obligatorios`)
- TC-02 PASS: empty after reload (obs: `true`)
- TC-03 PASS: empty error (obs: `Pegá un link que empiece con https://`)
- TC-03 PASS: empty songin still shown (obs: `true`)
- TC-03 PASS: spaces error (obs: `Pegá un link que empiece con https://`)
- TC-03 PASS: spaces songin still shown (obs: `true`)
- TC-03 PASS: hola error (obs: `Pegá un link que empiece con https://`)
- TC-03 PASS: hola songin still shown (obs: `true`)
- TC-03 PASS: noScheme error (obs: `Pegá un link que empiece con https://`)
- TC-03 PASS: noScheme songin still shown (obs: `true`)
- TC-03 PASS: ftp error (obs: `Pegá un link que empiece con https://`)
- TC-03 PASS: ftp songin still shown (obs: `true`)
- TC-03 PASS: onlyScheme error (obs: `Pegá un link que empiece con https://`)
- TC-03 PASS: onlyScheme songin still shown (obs: `true`)
- TC-03 PASS: youtube saved (obs: `YouTube|Canción`)
- TC-04 PASS: nameFirst (obs: `YouTube|Himno QA|https://youtu.be/dQw4w9WgXcQ`)
- TC-04 PASS: ytMusic (obs: `YouTube Music|Tema QA`)
- TC-04 PASS: plain (obs: `Link|Tema web`)
- TC-04 PASS: trailingDot (obs: `YouTube|.|https://youtu.be/dQw4w9WgXcQ`)
- TC-04 PASS: longName (obs: `YouTube|nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn`)
- TC-04 PASS: name length 80 (obs: `80`)
- TC-04 PASS: markup (obs: `YouTube|<i>x</i>`)
- TC-04 PASS: no <i> element (obs: `0`)
- TC-05 PASS: err shown (obs: `Pegá un link que empiece con https://`)
- TC-05 PASS: row shown, err gone (obs: `true`)
- TC-05 PASS: B empty songin (obs: `true`)
- TC-05 PASS: http accepted (obs: `Link|Canción`)
- TC-05 PASS: counters unchanged (obs: `Del reglamento 0 de 3 obligatorios`)
- TC-05 PASS: no console errors (obs: `0`)
- TC-05 PASS: no external requests (obs: `0 `)