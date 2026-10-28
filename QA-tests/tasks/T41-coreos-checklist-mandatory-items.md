# T41-coreos-checklist-mandatory-items: CAP 2024 mandatory checklist, manual tick and auto tick

| Field | Value |
|---|---|
| Route | `/` (bottom nav tab **Coreos**, student view) |
| Source | `/home/claude/cuaderno-patin/index.html` (stuCheck, rStudent, actions tick, addStep, delStep) |
| Flow | Tick mandatory items of the Eficiencia Quinta checklist, manually and through steps |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 58 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous (no login, no network)
- Fresh browser profile: empty localStorage, no cookies
- Do not click Web Share or download buttons anywhere.

## Test data
- `profeName = "QA Profe"`, `groupName = "Grupo QA"` (level Iniciación), `studentName = "Alumna QA"`
- Mandatory items of Eficiencia Quinta (full text, short name used in notes and in the step selector):
  - M1 "Una combinación de figuras hacia adelante, 2 a 4 posiciones, con una posición Sit base" (short: "Una combinación de figuras hacia adelante")
  - M2 "Trompo en dos pies (mínimo 1, máximo 2)" (short: "Trompo en dos pies")
  - M3 "Choreo Step Sequence: máx. 30 s, empieza quieta o con stop and go, cubre ¾ de la pista" (short: "Choreo Step Sequence")
- Limit item (not tickable): "El mismo trompo se puede repetir como máximo 2 veces"
- Optional item: short name "Secuencia de skating skill hacia atrás"
- Step A: tipo `Técnico`, minuto `0:20`, texto `Trompo en dos pies en el centro`, ref `Obligatorio: Trompo en dos pies`
- Step B: tipo `Técnico`, minuto `0:50`, texto `Secuencia coreográfica por la pista`, ref `Obligatorio: Choreo Step Sequence`
- Step C: tipo `Artístico`, minuto `1:10`, texto `Brazos arriba en la entrada`, ref `Opcional: Secuencia de skating skill hacia atrás`

## Steps

### TC-00: Setup (fresh profile)
1. Open a new browser profile. Navigate to `http://localhost:8080/`.
2. Assert: heading "Bienvenida" is visible with input `#pname` and button **Empezar**.
3. Type `QA Profe` into `#pname`. Click **Empezar**. Assert: subtitle reads "Profe QA Profe · Liga".
4. Click bottom nav **Alumnas**. Assert: card "Nuevo grupo" is visible.
5. Type `Grupo QA` into `#gname`. Click **Guardar grupo**. Assert: group card "Grupo QA" is visible.
6. Type `Alumna QA` into `#newstu`. Click **Agregar**. Assert: heading "Alumnas (1)" and row "Alumna QA".
7. Click bottom nav **Coreos**. Click the card "Alumna QA". Assert: heading "Alumna QA" and button **← Alumnas del grupo**.

### TC-01: Happy path: tick all three mandatory items by hand
1. Assert: chip "0 de 3 obligatorios" (rosa); progress bar `role="img"` with `aria-label="0 de 3"`; note "Faltan 3: Una combinación de figuras hacia adelante, Trompo en dos pies, Choreo Step Sequence".
2. Assert: three elements with `role="checkbox"`, `aria-checked="false"`, no "✓" in their text; the "Límite" item is not among them.
3. Click the checkbox "Trompo en dos pies (mínimo 1, máximo 2)".
4. Assert: that checkbox has `aria-checked="true"` and its text starts with "✓ "; chip "1 de 3 obligatorios"; progress bar `aria-label="1 de 3"`; note "Faltan 2: Una combinación de figuras hacia adelante, Choreo Step Sequence".
5. Click the checkbox "Una combinación de figuras hacia adelante, ...". Assert: chip "2 de 3 obligatorios"; note "Faltan 1: Choreo Step Sequence".
6. Click the checkbox "Choreo Step Sequence: ...". Assert: chip "3 de 3 obligatorios" with menta color; the note reads "Están todos los obligatorios" (class `ok`); progress bar `aria-label="3 de 3"`.
7. Click **← Alumnas del grupo**. Assert: the card "Alumna QA" shows chip "3/3 obligatorios" (menta) and "Eficiencia Quinta · 0 pasos".
8. Reload the page. Click **Coreos**. Assert: the card still shows "3/3 obligatorios". Open the card. Assert: all three checkboxes have `aria-checked="true"`.

### TC-02: Untick a manual tick
1. Click the checkbox "Trompo en dos pies (mínimo 1, máximo 2)".
2. Assert: `aria-checked="false"`, no "✓ " prefix; chip "2 de 3 obligatorios" (rosa); note "Faltan 1: Trompo en dos pies".
3. Click **← Alumnas del grupo**. Assert: the card shows chip "2/3 obligatorios" with white color.
4. Open the card again. Click the same checkbox. Assert: chip "3 de 3 obligatorios".

### TC-03: Keyboard operation of the checkboxes
1. Click the checkbox "Trompo en dos pies (mínimo 1, máximo 2)" (it is ticked after TC-02) so it becomes unticked. Assert: chip "2 de 3 obligatorios".
2. Press Tab until that checkbox has focus (it has `tabindex="0"`). Press Space.
3. Assert: `aria-checked="true"`; chip "3 de 3 obligatorios". The page does not scroll.
4. Focus the same checkbox again (the panel was re-rendered, so press Tab from the top of the checklist until it is focused). Press Enter.
5. Assert: `aria-checked="false"`; chip "2 de 3 obligatorios".

### TC-04: A step with a reference auto-ticks the item; manual tick survives step removal
1. Do not click anything yet. Assert (state left by TC-03): the Choreo Step Sequence item is ticked by hand (`aria-checked="true"`), the figures item is ticked, the Trompo item is unticked; chip "2 de 3 obligatorios".
2. In "Agregar un paso", fill Step A: `#sp_tipo` = Técnico, `#sp_t` = `0:20`, `#sp_txt` = `Trompo en dos pies en el centro`, `#sp_ref` = `Obligatorio: Trompo en dos pies`. Click **Agregar paso**.
3. Assert: step card 1 with text "Trompo en dos pies en el centro", chips "Técnico", "0:20" and "Cumple: Trompo en dos pies" (menta). Chip "3 de 3 obligatorios".
4. Assert: the item "Trompo en dos pies (mínimo 1, máximo 2)" now has class `auto`, shows "Está en el paso 1 de tu coreo" and is not a checkbox (no `role="checkbox"`, no `data-a="tick"`). Clicking its text changes nothing.
5. Fill Step B: `#sp_tipo` = Técnico, `#sp_t` = `0:50`, `#sp_txt` = `Secuencia coreográfica por la pista`, `#sp_ref` = `Obligatorio: Choreo Step Sequence`. Click **Agregar paso**.
6. Assert: the Choreo item shows "Está en el paso 2 de tu coreo" and is no longer clickable, even though it was ticked by hand; chip stays "3 de 3 obligatorios".
7. On step card 2 click **Quitar** (button turns to **¿Seguro?**), then click **¿Seguro?**.
8. Assert: step card 2 is gone; the Choreo item is a checkbox again with `aria-checked="true"` and "✓ " (the manual tick `k:<sid>:<key>` was kept); chip "3 de 3 obligatorios". The Trompo item still shows "Está en el paso 1 de tu coreo".
9. Reload the page, open Coreos and the card "Alumna QA". Assert: same state as step 8.

### TC-05: Negative and edge cases
- Extra steps do not change the warning: fill Step C (`#sp_ref` = `Opcional: Secuencia de skating skill hacia atrás`) and click **Agregar paso**. Assert: the new step shows the chip "Cumple: Secuencia de skating skill hacia atrás"; the mandatory count is unchanged ("3 de 3 obligatorios"); the note still reads "Están todos los obligatorios".
- Warning shows only for missing mandatory items: on the step card "Trompo en dos pies en el centro" click **Quitar**, then **¿Seguro?**. Assert: the Trompo item is a checkbox again and unticked (it was never ticked by hand); chip "2 de 3 obligatorios"; note "Faltan 1: Trompo en dos pies". Step C (extra) is still present and does not remove the warning.
- Limit items are not selectable: open `#sp_ref`. Assert: options are "Ninguno", three "Obligatorio: ..." options and one "Opcional: Secuencia de skating skill hacia atrás"; no option starts with "Límite".

## Assertions
- [ ] Eficiencia Quinta has exactly 3 mandatory checklist items.
- [ ] Manual tick toggles `aria-checked`, the "✓ " prefix, the counter chip, the progress bar label and the note.
- [ ] The list card chip is "N/3 obligatorios", white while items are missing and menta when complete.
- [ ] Items covered by a step show "Está en el paso N de tu coreo" and cannot be ticked by hand.
- [ ] A manual tick is kept when the covering step is removed.
- [ ] Extra (optional) steps never remove the warning for missing mandatory items and never add a new one.
- [ ] State persists after reload.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx).

## Screenshots required
- Checklist at 0 of 3 with the "Faltan 3" note
- Checklist at 1 of 3
- Checklist at 3 of 3 ("Están todos los obligatorios")
- Auto-ticked item with "Está en el paso 1 de tu coreo"
- Final state after TC-05

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
