# T41-coreos-checklist-mandatory-items: result

Verdict: **PASS**

Run: Playwright (chromium), fresh context per task, viewport 390x800, site http://localhost:8080. Task file and index.html untouched.

## TC table

| TC | Result | Checks | Failed checks (observed vs expected) |
|---|---|---|---|
| TC-00 | PASS | 1 | - |
| TC-01 | PASS | 23 | - |
| TC-02 | PASS | 6 | - |
| TC-03 | PASS | 9 | - |
| TC-04 | PASS | 17 | - |
| TC-05 | PASS | 9 | - |

Console errors / failed or external requests: none

## Failure classification

No failures. No real site bugs; no wrong task assumptions that blocked a TC.

## Notes

- No task assumption was wrong.

## Check log

- TC-00 PASS: setup reaches student view (obs: `true`)
- TC-01 PASS: chip 0 de 3 (obs: `true`)
- TC-01 PASS: chip rosa (obs: `true`)
- TC-01 PASS: bar 0 de 3 (obs: `0 de 3`)
- TC-01 PASS: note (obs: `Faltan 3: Una combinación de figuras hacia adelante, Trompo en dos pies, Choreo Step Sequence`)
- TC-01 PASS: 3 checkboxes unticked (obs: `3`)
- TC-01 PASS: no ✓ (obs: `false`)
- TC-01 PASS: Límite not a checkbox (obs: `false`)
- TC-01 PASS: trompo ticked (obs: `true`)
- TC-01 PASS: starts with ✓  (obs: `true`)
- TC-01 PASS: chip 1 de 3 (obs: `true`)
- TC-01 PASS: bar 1 de 3 (obs: `1 de 3`)
- TC-01 PASS: note 2 (obs: `Faltan 2: Una combinación de figuras hacia adelante, Choreo Step Sequence`)
- TC-01 PASS: chip 2 (obs: `true`)
- TC-01 PASS: note 1 (obs: `Faltan 1: Choreo Step Sequence`)
- TC-01 PASS: chip 3 (obs: `true`)
- TC-01 PASS: chip menta (obs: `1`)
- TC-01 PASS: note ok (obs: `Están todos los obligatorios`)
- TC-01 PASS: note class ok (obs: `1`)
- TC-01 PASS: bar 3 de 3 (obs: `3 de 3`)
- TC-01 PASS: list chip 3/3 (obs: `true`)
- TC-01 PASS: list chip menta (obs: `1`)
- TC-01 PASS: after reload 3/3 (obs: `true`)
- TC-01 PASS: 3 ticked after reload (obs: `3`)
- TC-02 PASS: unticked (obs: `false`)
- TC-02 PASS: no ✓ prefix (obs: `false`)
- TC-02 PASS: chip 2 rosa (obs: `true`)
- TC-02 PASS: note (obs: `Faltan 1: Trompo en dos pies`)
- TC-02 PASS: list 2/3 white (obs: `true`)
- TC-02 PASS: chip 3 (obs: `true`)
- TC-03 PASS: chip 2 (obs: `true`)
- TC-03 PASS: tabindex 0 (obs: `0`)
- TC-03 PASS: focus reached by Tab (obs: `true`)
- TC-03 PASS: Space ticks (obs: `true`)
- TC-03 PASS: chip 3 (obs: `true`)
- TC-03 PASS: no scroll (obs: `[0,0]`)
- TC-03 PASS: focus again (obs: `true`)
- TC-03 PASS: Enter unticks (obs: `false`)
- TC-03 PASS: chip 2 (obs: `true`)
- TC-04 PASS: state: choreo ticked, fig ticked, trompo unticked (obs: `true,true,false`)
- TC-04 PASS: step1 card (obs: `true`)
- TC-04 PASS: step1 chip menta (obs: `1`)
- TC-04 PASS: chip 3 (obs: `true`)
- TC-04 PASS: trompo class auto (obs: `true`)
- TC-04 PASS: trompo text (obs: `true`)
- TC-04 PASS: trompo not checkbox (obs: `0`)
- TC-04 PASS: click auto changes nothing (obs: `Del reglamento 3 de 3 obligatorios`)
- TC-04 PASS: choreo auto paso 2 (obs: `true`)
- TC-04 PASS: chip 3 (obs: `true`)
- TC-04 PASS: button ¿Seguro? (obs: `true`)
- TC-04 PASS: 1 step left (obs: `1`)
- TC-04 PASS: choreo checkbox true w ✓ (obs: `true`)
- TC-04 PASS: choreo ✓ (obs: `true`)
- TC-04 PASS: chip 3 (obs: `true`)
- TC-04 PASS: trompo still auto (obs: `true`)
- TC-04 PASS: reload same state (obs: `true`)
- TC-05 PASS: step C chip (obs: `true`)
- TC-05 PASS: still 3 de 3 + note (obs: `true`)
- TC-05 PASS: trompo checkbox unticked (obs: `false`)
- TC-05 PASS: chip 2, note faltan 1 (obs: `true`)
- TC-05 PASS: step C remains (obs: `true`)
- TC-05 PASS: sp_ref options (obs: `Ninguno|Obligatorio: Una combinación de figuras hacia adelante|Obligatorio: Trompo en dos pies|Opcional: Secuencia de skating skill hacia atrás|Obliga`)
- TC-05 PASS: no Límite option (obs: `false`)
- TC-05 PASS: no console errors (obs: `0`)
- TC-05 PASS: no external requests (obs: `0 `)