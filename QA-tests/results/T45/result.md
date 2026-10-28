# T45-coreos-efficiency-and-duration: result

Verdict: **PASS**

Run: Playwright (chromium), fresh context per task, viewport 390x800, site http://localhost:8080. Task file and index.html untouched.

## TC table

| TC | Result | Checks | Failed checks (observed vs expected) |
|---|---|---|---|
| TC-00 | PASS | 1 | - |
| TC-01 | PASS | 13 | - |
| TC-02 | PASS | 18 | - |
| TC-03 | PASS | 8 | - |
| TC-04 | PASS | 11 | - |
| TC-05 | PASS | 11 | - |

Console errors / failed or external requests: none

## Failure classification

No failures. No real site bugs; no wrong task assumptions that blocked a TC.

## Notes

- No task assumption was wrong. Note: "Eficiencia Tercera" and "Eficiencia Promocional" exist in several optgroups; selecting by optgroup (as the task says) is required.

## Check log

- TC-00 PASS: setup reaches student view (obs: `true`)
- TC-01 PASS: default select (obs: `Según el nivel del grupo (Eficiencia Quinta)`)
- TC-01 PASS: subtitle (obs: `Grupo QA · Eficiencia Quinta`)
- TC-01 PASS: optgroups (obs: `Copa Roberto Rodríguez|Copa González Molina|Sub Divisional B|Sub Divisional A (Nacional)|Inline|Adultos`)
- TC-01 PASS: Tercera option count (task says unique per optgroup) (obs: `2`)
- TC-01 PASS: subtitle Tercera (obs: `Grupo QA · Eficiencia Tercera`)
- TC-01 PASS: chip 0 de 5 (obs: `true`)
- TC-01 PASS: note (obs: `Faltan 5: Waltz jump, Toe loop, Una combinación de trompos, Un trompo solo, Footwork sequence nivel 1 como máximo`)
- TC-01 PASS: 5 checkboxes (obs: `5`)
- TC-01 PASS: Tiempo permitido (obs: `Tiempo permitido: 1:30 ± 5 s`)
- TC-01 PASS: dur field (obs: `1:30`)
- TC-01 PASS: verdict (obs: `Dura 1:30, dentro de 1:25 a 1:35.`)
- TC-01 PASS: list card (obs: `true`)
- TC-01 PASS: persist (obs: `Grupo QA · Eficiencia Tercera|1:30|Dura 1:30, dentro de 1:25 a 1:35.`)
- TC-02 PASS: verdict 1:20 (obs: `Dura 1:20, le faltan 5 s para el mínimo de 1:25 (0,5 de descuento cada 10 s o parte en la mayoría de las copas).`)
- TC-02 PASS: style 1:20 (obs: `hand`)
- TC-02 PASS: time label 1:20 (obs: `Tiempo permitido: 1:30 ± 5 s`)
- TC-02 PASS: verdict 1:24 (obs: `Dura 1:24, le faltan 1 s para el mínimo de 1:25 (0,5 de descuento cada 10 s o parte en la mayoría de las copas).`)
- TC-02 PASS: style 1:24 (obs: `hand`)
- TC-02 PASS: time label 1:24 (obs: `Tiempo permitido: 1:30 ± 5 s`)
- TC-02 PASS: verdict 1:25 (obs: `Dura 1:25, dentro de 1:25 a 1:35.`)
- TC-02 PASS: style 1:25 (obs: `plain`)
- TC-02 PASS: time label 1:25 (obs: `Tiempo permitido: 1:30 ± 5 s`)
- TC-02 PASS: verdict 1:35 (obs: `Dura 1:35, dentro de 1:25 a 1:35.`)
- TC-02 PASS: style 1:35 (obs: `plain`)
- TC-02 PASS: time label 1:35 (obs: `Tiempo permitido: 1:30 ± 5 s`)
- TC-02 PASS: verdict 1:36 (obs: `Dura 1:36, se pasa 1 s del máximo de 1:35.`)
- TC-02 PASS: style 1:36 (obs: `hand`)
- TC-02 PASS: time label 1:36 (obs: `Tiempo permitido: 1:30 ± 5 s`)
- TC-02 PASS: verdict 1:40 (obs: `Dura 1:40, se pasa 5 s del máximo de 1:35.`)
- TC-02 PASS: style 1:40 (obs: `hand`)
- TC-02 PASS: time label 1:40 (obs: `Tiempo permitido: 1:30 ± 5 s`)
- TC-03 PASS: dur "" (obs: `Cargá la duración del programa (ej. 2:00) para controlar el tiempo.`)
- TC-03 PASS: dur "abc" (obs: `Cargá la duración del programa (ej. 2:00) para controlar el tiempo.`)
- TC-03 PASS: dur "90" (obs: `Cargá la duración del programa (ej. 2:00) para controlar el tiempo.`)
- TC-03 PASS: dur "1:5" (obs: `Cargá la duración del programa (ej. 2:00) para controlar el tiempo.`)
- TC-03 PASS: dur "1.30" (obs: `Dura 1:30, dentro de 1:25 a 1:35.`)
- TC-03 PASS: dur "1:60" (obs: `Dura 2:00, se pasa 25 s del máximo de 1:35.`)
- TC-03 PASS: 10 chars stored 8 (obs: `1:30:00:`)
- TC-03 PASS: verdict NONE (observed) (obs: `Cargá la duración del programa (ej. 2:00) para controlar el tiempo.`)
- TC-04 PASS: subtitle Quinta (obs: `Grupo QA · Eficiencia Quinta`)
- TC-04 PASS: chip 0 de 3, máx (obs: `true`)
- TC-04 PASS: Tiempo permitido máx (obs: `Tiempo permitido: máx. 1:30`)
- TC-04 PASS: dur holds last stored value (obs: `1:30:00:`)
- TC-04 PASS: Quinta 1:30 (obs: `Dura 1:30, dentro del máximo de 1:30.`)
- TC-04 PASS: Quinta 0:45 (obs: `Dura 0:45, dentro del máximo de 1:30.`)
- TC-04 PASS: Quinta 1:31 (obs: `Dura 1:31, se pasa 1 s del máximo de 1:30.`)
- TC-04 PASS: Quinta 2:00 (obs: `Dura 2:00, se pasa 30 s del máximo de 1:30.`)
- TC-04 PASS: Formativa (obs: `Grupo QA · Escuela Formativa|0 de 3|Tiempo permitido: máx. 1:30|Dura 2:00, se pasa 30 s del máximo de 1:30.`)
- TC-04 PASS: Promocional (obs: `Grupo QA · Eficiencia Promocional|0 de 4|Tiempo permitido: 2:00 ± 5 s|Dura 2:00, dentro de 1:55 a 2:05.`)
- TC-04 PASS: default again (obs: `Grupo QA · Eficiencia Quinta`)
- TC-05 PASS: Quinta step (obs: `true`)
- TC-05 PASS: step listed, no Cumple, 0 de 5 (obs: `true`)
- TC-05 PASS: sp_ref Tercera options (obs: `Ninguno|Obligatorio: Waltz jump|Obligatorio: Toe loop|Obligatorio: Una combinación de trompos|Obligatorio: Un trompo solo|Obligatorio: Footwork sequen`)
- TC-05 PASS: list Tercera 1 paso (obs: `true`)
- TC-05 PASS: Cumple back, 1 de 3 (obs: `true`)
- TC-05 PASS: choreo ticked (obs: `true`)
- TC-05 PASS: Tercera 0 ticked (obs: `0`)
- TC-05 PASS: choreo still ticked (obs: `true`)
- TC-05 PASS: group level Iniciación (obs: `true`)
- TC-05 PASS: no console errors (obs: `0`)
- TC-05 PASS: no external requests (obs: `0 `)