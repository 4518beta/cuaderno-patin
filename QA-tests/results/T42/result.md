# T42-coreos-add-step: result

Verdict: **PASS**

Run: Playwright (chromium), fresh context per task, viewport 390x800, site http://localhost:8080. Task file and index.html untouched.

## TC table

| TC | Result | Checks | Failed checks (observed vs expected) |
|---|---|---|---|
| TC-00 | PASS | 1 | - |
| TC-01 | PASS | 15 | - |
| TC-02 | PASS | 18 | - |
| TC-03 | PASS | 9 | - |
| TC-04 | PASS | 5 | - |
| TC-05 | PASS | 6 | - |

Console errors / failed or external requests: none

## Failure classification

No failures. No real site bugs; no wrong task assumptions that blocked a TC.

## Notes

- Minor task note: TC-02 leaves 7 steps in the student (not 3). TC-03, TC-04 and TC-05 still hold, but "step 2", "last step" and list counts must be read against 7 steps (list card showed "8 pasos" after the extra step in TC-05).
- Option order of #sp_ref matched the task (figuras, Trompo, Opcional, Choreo).

## Check log

- TC-00 PASS: setup reaches student view (obs: `true`)
- TC-01 PASS: empty steps text (obs: `true`)
- TC-01 PASS: defaults (obs: `Técnico||Ninguno`)
- TC-01 PASS: sperr empty (obs: ``)
- TC-01 PASS: sp_ref options (order per task) (obs: `Ninguno|Obligatorio: Una combinación de figuras hacia adelante|Obligatorio: Trompo en dos pies|Opcional: Secuencia de skating skill hacia atrás|Obliga`)
- TC-01 PASS: empty text gone (obs: `false`)
- TC-01 PASS: step1 (obs: `true`)
- TC-01 PASS: form reset (obs: `|||Técnico|Ninguno`)
- TC-01 PASS: chip 1 de 3 (obs: `true`)
- TC-01 PASS: step2 (obs: `true`)
- TC-01 PASS: Artístico rosa (obs: `1`)
- TC-01 PASS: step3 (obs: `true`)
- TC-01 PASS: chip 2 de 3 (obs: `true`)
- TC-01 PASS: Mi coreo heading + order (obs: `true`)
- TC-01 PASS: list card (obs: `true`)
- TC-01 PASS: reload same steps (obs: `["1 Trompo en dos pies en el centro Técnico 0:20 Cumple: Trompo en dos pies","2 Entrada con brazos arriba Artístico 0:50","3 Combinación de figuras en`)
- TC-02 PASS: empty: msg (obs: `Escribí qué pasa en el paso.`)
- TC-02 PASS: empty: steps (obs: `3`)
- TC-02 PASS: spaces: msg (obs: `Escribí qué pasa en el paso.`)
- TC-02 PASS: spaces: steps (obs: `3`)
- TC-02 PASS: empty+fields: msg (obs: `Escribí qué pasa en el paso.`)
- TC-02 PASS: steps (obs: `3`)
- TC-02 PASS: choreo unticked (obs: `false`)
- TC-02 PASS: input holds 140 (obs: `140`)
- TC-02 PASS: step 4 text 140 chars (obs: `140`)
- TC-02 PASS: steps 4 (obs: `4`)
- TC-02 PASS: msg gone (obs: ``)
- TC-02 PASS: time chip 8 chars (obs: `true`)
- TC-02 PASS: no error (obs: ``)
- TC-02 PASS: no time chip (obs: `1`)
- TC-02 PASS: steps 6 (obs: `6`)
- TC-02 PASS: steps 7 (obs: `7`)
- TC-02 PASS: markup literal (obs: `<b>negrita</b> & co`)
- TC-02 PASS: no bold element rendered inside (obs: `0`)
- TC-03 PASS: edit form values (obs: `Artístico|0:50|Entrada con brazos arriba|Ninguno`)
- TC-03 PASS: Guardar/Cancelar (obs: `true`)
- TC-03 PASS: cancel keeps (obs: `true`)
- TC-03 PASS: saved edit (obs: `true`)
- TC-03 PASS: Técnico celeste (obs: `1`)
- TC-03 PASS: stays in edit mode (obs: `true`)
- TC-03 PASS: text unchanged (obs: `true`)
- TC-03 PASS: Cumple chip gone (obs: `false`)
- TC-03 PASS: chip 1 de 3 (obs: `true`)
- TC-04 PASS: up disabled on first (obs: `true`)
- TC-04 PASS: down disabled on last (obs: `true`)
- TC-04 PASS: swapped (obs: `true`)
- TC-04 PASS: restored (obs: `true`)
- TC-04 PASS: swapped persists (obs: `true`)
- TC-05 PASS: verdict (obs: `true`)
- TC-05 PASS: dur kept (obs: `1:30`)
- TC-05 PASS: list count (obs: `true`)
- TC-05 PASS: B no steps (obs: `true`)
- TC-05 PASS: no console errors (obs: `0`)
- TC-05 PASS: no external requests (obs: `0 `)