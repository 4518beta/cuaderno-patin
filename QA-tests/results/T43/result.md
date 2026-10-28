# T43-coreos-destructive-delete-step: result

Verdict: **PASS**

Run: Playwright (chromium), fresh context per task, viewport 390x800, site http://localhost:8080. Task file and index.html untouched.

## TC table

| TC | Result | Checks | Failed checks (observed vs expected) |
|---|---|---|---|
| TC-00 | PASS | 4 | - |
| TC-01 | PASS | 10 | - |
| TC-02 | PASS | 12 | - |
| TC-03 | PASS | 8 | - |

Console errors / failed or external requests: none

## Failure classification

No failures. No real site bugs; no wrong task assumptions that blocked a TC.

## Notes

- No task assumption was wrong.

## Check log

- TC-00 PASS: setup reaches student view (obs: `true`)
- TC-00 PASS: setup steps (obs: `true`)
- TC-00 PASS: Quitar x2 (obs: `Quitar|Quitar`)
- TC-00 PASS: chip 1 de 3 (obs: `true`)
- TC-01 PASS: A armed, B idle (obs: `¿Seguro?|Quitar`)
- TC-01 PASS: danger style (obs: `true`)
- TC-01 PASS: both listed (obs: `2`)
- TC-01 PASS: both back to Quitar (obs: `Quitar|Quitar`)
- TC-01 PASS: 2 steps, chip 1 de 3 (obs: `true`)
- TC-01 PASS: confirm moves (obs: `Quitar|¿Seguro?`)
- TC-01 PASS: still 2 (obs: `2`)
- TC-01 PASS: reset after edit/cancel (obs: `Quitar|Quitar`)
- TC-01 PASS: 2 steps (obs: `2`)
- TC-01 PASS: after reload 2 steps (obs: `2`)
- TC-02 PASS: armed (obs: `¿Seguro?`)
- TC-02 PASS: A gone (obs: `false`)
- TC-02 PASS: B badge 1 (obs: `1`)
- TC-02 PASS: Subir disabled (obs: `true`)
- TC-02 PASS: chip 0 de 3 (obs: `true`)
- TC-02 PASS: no Está en el paso (obs: `false`)
- TC-02 PASS: note (obs: `Faltan 3: Una combinación de figuras hacia adelante, Trompo en dos pies, Choreo Step Sequence`)
- TC-02 PASS: no ¿Seguro? (obs: `0`)
- TC-02 PASS: list card singular (obs: `true`)
- TC-02 PASS: only B (obs: `true`)
- TC-02 PASS: empty text back (obs: `true`)
- TC-02 PASS: 0 pasos (obs: `true`)
- TC-03 PASS: dur kept (obs: `1:30`)
- TC-03 PASS: song chip YouTube (obs: `1`)
- TC-03 PASS: choreo ticked (obs: `true`)
- TC-03 PASS: B badge 1, one step (obs: `true`)
- TC-03 PASS: chip 1 de 3 (obs: `true`)
- TC-03 PASS: single click does not delete (obs: `1`)
- TC-03 PASS: no console errors (obs: `0`)
- TC-03 PASS: no external requests (obs: `0 `)