# T45-coreos-efficiency-and-duration: Change the efficiency and check the program duration against the CAP 2024 time limit

| Field | Value |
|---|---|
| Route | `/` (bottom nav tab **Coreos**, student view, "Eficiencia del reglamento" and "Duración del programa") |
| Source | `/home/claude/cuaderno-patin/index.html` (rStudent effSel, stuEff, stuCheck, timeCheck, timeLabel, secs; change handler for `data-c="eff"` and `data-c="dur"`; EFF and DEFAULT_MAP data) |
| Flow | Pick an efficiency, type the program duration, read the time verdict |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 64 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous (no login, no network)
- Fresh browser profile: empty localStorage, no cookies
- Do not click Web Share or download buttons anywhere.
- The duration field saves on the `change` event: after typing, press Tab (or click elsewhere) before asserting.

## Test data
- `profeName = "QA Profe"`, `groupName = "Grupo QA"` (level Iniciación, default efficiency Eficiencia Quinta), `studentName = "Alumna QA"`
- Efficiencies used (select "Eficiencia del reglamento", options grouped by optgroup):
  - Default option: "Según el nivel del grupo (Eficiencia Quinta)"
  - `Escuela Formativa` (optgroup "Copa Roberto Rodríguez"): max 1:30, 3 mandatory items
  - `Eficiencia Quinta` (optgroup "Copa Roberto Rodríguez"): max 1:30, 3 mandatory items
  - `Eficiencia Tercera` (optgroup "Copa González Molina", not the one under "Sub Divisional B"): 1:30 ± 5 s (valid range 1:25 to 1:35), 5 mandatory items
  - `Eficiencia Promocional` (optgroup "Sub Divisional B", not the ones under "Adultos"): 2:00 ± 5 s, 4 mandatory items
- Durations for a max-type limit (Quinta, Formativa): `1:30`, `1:31`, `2:00`, `0:45`, `1.30`
- Durations for a centered limit (Tercera): `1:20`, `1:24`, `1:25`, `1:30`, `1:35`, `1:36`, `1:40`
- Invalid durations: `abc`, `90`, `1:5`, `""`
- Step for the reference check: `#sp_tipo` = `Técnico`, `#sp_t` = `0:20`, `#sp_txt` = `Trompo en dos pies en el centro`, `#sp_ref` = `Obligatorio: Trompo en dos pies`

## Steps

### TC-00: Setup (fresh profile)
1. Open a new browser profile. Navigate to `http://localhost:8080/`.
2. Assert: heading "Bienvenida" is visible with input `#pname` and button **Empezar**.
3. Type `QA Profe` into `#pname`. Click **Empezar**. Assert: subtitle reads "Profe QA Profe · Liga".
4. Click bottom nav **Alumnas**. Assert: card "Nuevo grupo" is visible.
5. Type `Grupo QA` into `#gname`. Click **Guardar grupo**. Assert: group card "Grupo QA" is visible.
6. Type `Alumna QA` into `#newstu`. Click **Agregar**. Assert: heading "Alumnas (1)" and row "Alumna QA".
7. Click bottom nav **Coreos**. Click the card "Alumna QA". Assert: heading "Alumna QA" and button **← Alumnas del grupo**.

### TC-01: Happy path: choose Eficiencia Tercera and enter a valid duration
1. Assert: the select "Eficiencia del reglamento" shows "Según el nivel del grupo (Eficiencia Quinta)"; subtitle "Grupo QA · Eficiencia Quinta".
2. Assert: the select has optgroups "Copa Roberto Rodríguez", "Copa González Molina", "Sub Divisional B", "Sub Divisional A (Nacional)", "Inline" and "Adultos".
3. Select `Eficiencia Tercera` under "Copa González Molina".
4. Assert: subtitle "Grupo QA · Eficiencia Tercera"; chip "0 de 5 obligatorios"; note "Faltan 5: Waltz jump, Toe loop, Una combinación de trompos, Un trompo solo, Footwork sequence nivel 1 como máximo"; 5 checkboxes; text "Tiempo permitido: 1:30 ± 5 s".
5. Type `1:30` into "Duración del programa" and press Tab.
6. Assert: the field shows "1:30"; the verdict reads "Dura 1:30, dentro de 1:25 a 1:35."
7. Click **← Alumnas del grupo**. Assert: the card "Alumna QA" shows "0/5 obligatorios" and "Eficiencia Tercera · 0 pasos".
8. Reload the page, click **Coreos**, open "Alumna QA". Assert: the efficiency is still Eficiencia Tercera, the field shows "1:30" and the verdict "Dura 1:30, dentro de 1:25 a 1:35."

### TC-02: Duration verdicts for a centered limit (Eficiencia Tercera, 1:25 to 1:35)
For each row type the value into "Duración del programa", press Tab and assert the verdict text exactly.

| Duration | Expected verdict |
|---|---|
| `1:20` | "Dura 1:20, le faltan 5 s para el mínimo de 1:25 (0,5 de descuento cada 10 s o parte en la mayoría de las copas)." |
| `1:24` | "Dura 1:24, le faltan 1 s para el mínimo de 1:25 (0,5 de descuento cada 10 s o parte en la mayoría de las copas)." |
| `1:25` | "Dura 1:25, dentro de 1:25 a 1:35." |
| `1:35` | "Dura 1:35, dentro de 1:25 a 1:35." |
| `1:36` | "Dura 1:36, se pasa 1 s del máximo de 1:35." |
| `1:40` | "Dura 1:40, se pasa 5 s del máximo de 1:35." |

Assert for the out-of-range rows that the verdict uses the highlighted "hand" style and for the in-range rows the plain style; the text "Tiempo permitido: 1:30 ± 5 s" never changes.

### TC-03: Form validation: duration field (`data-c="dur"`)
Type each value, press Tab, assert the verdict.

| Value | Expected |
|---|---|
| `""` (clear the field) | "Cargá la duración del programa (ej. 2:00) para controlar el tiempo." |
| `abc` | "Cargá la duración del programa (ej. 2:00) para controlar el tiempo." |
| `90` | "Cargá la duración del programa (ej. 2:00) para controlar el tiempo." |
| `1:5` | "Cargá la duración del programa (ej. 2:00) para controlar el tiempo." |
| `1.30` (dot separator) | "Dura 1:30, dentro de 1:25 a 1:35." |
| `1:60` (observed: seconds are not limited to 59) | "Dura 2:00, se pasa 25 s del máximo de 1:35." |
| `1:30:00:99` (10 characters) | stored as the first 8 characters `1:30:00:`; verdict is the "Cargá la duración..." text because `1:30:00:` is not a valid time |

### TC-04: Duration verdicts for a max-type limit (Eficiencia Quinta)
1. Select "Según el nivel del grupo (Eficiencia Quinta)" in the efficiency select. Assert: subtitle "Grupo QA · Eficiencia Quinta"; chip "0 de 3 obligatorios"; "Tiempo permitido: máx. 1:30". The duration field still holds the last stored value.
2. For each row type the duration, press Tab and assert:

| Duration | Expected verdict |
|---|---|
| `1:30` | "Dura 1:30, dentro del máximo de 1:30." |
| `0:45` | "Dura 0:45, dentro del máximo de 1:30." |
| `1:31` | "Dura 1:31, se pasa 1 s del máximo de 1:30." |
| `2:00` | "Dura 2:00, se pasa 30 s del máximo de 1:30." |

3. Select `Escuela Formativa` (optgroup "Copa Roberto Rodríguez"). Assert: subtitle "Grupo QA · Escuela Formativa"; chip "0 de 3 obligatorios"; "Tiempo permitido: máx. 1:30"; verdict "Dura 2:00, se pasa 30 s del máximo de 1:30."
4. Select `Eficiencia Promocional` (optgroup "Sub Divisional B"). Assert: subtitle "Grupo QA · Eficiencia Promocional"; chip "0 de 4 obligatorios"; "Tiempo permitido: 2:00 ± 5 s"; verdict "Dura 2:00, dentro de 1:55 a 2:05."
5. Select the default option again. Assert: subtitle "Grupo QA · Eficiencia Quinta".

### TC-05: Negative and edge cases
- Steps keep their reference when the efficiency changes: with the default Eficiencia Quinta add the step from Test data. Assert: chip "Cumple: Trompo en dos pies" and "1 de 3 obligatorios". Select `Eficiencia Tercera` (Copa González Molina). Assert: the step is still listed (list card shows "Eficiencia Tercera · 1 paso"), the chip "Cumple:" is gone, "0 de 5 obligatorios", and `#sp_ref` lists "Obligatorio: Waltz jump", "Obligatorio: Toe loop", "Obligatorio: Una combinación de trompos", "Obligatorio: Un trompo solo", "Obligatorio: Footwork sequence nivel 1 como máximo". Select the default option again. Assert: the chip "Cumple: Trompo en dos pies" is back and "1 de 3 obligatorios".
- Manual ticks belong to the efficiency: with Eficiencia Quinta tick "Choreo Step Sequence" by hand, switch to `Eficiencia Tercera`, assert 0 ticked; switch back and assert the Choreo item is still ticked.
- The group's own level is not changed: click **Alumnas**; the group card "Grupo QA" still shows chip "Iniciación".

## Assertions
- [ ] The default efficiency comes from the group level (Iniciación gives Eficiencia Quinta).
- [ ] Changing the efficiency updates the subtitle, the mandatory counter and note, the checklist items and "Tiempo permitido".
- [ ] Time label formats: "máx. m:ss" for max-type, "m:ss ± N s" for centered limits.
- [ ] Verdict texts match the strings in the tables exactly, including seconds over or under.
- [ ] Invalid or empty durations show "Cargá la duración del programa (ej. 2:00) para controlar el tiempo."
- [ ] Efficiency and duration persist after reload.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx).

## Screenshots required
- Student view with the default efficiency
- Efficiency select open (optgroups)
- Verdict "dentro de" (valid)
- Verdict "le faltan" (under the minimum)
- Verdict "se pasa" (over the maximum)
- Final state after TC-05

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
