# T42-coreos-add-step: Add, validate, edit and reorder choreography steps

| Field | Value |
|---|---|
| Route | `/` (bottom nav tab **Coreos**, student view, card "Agregar un paso") |
| Source | `/home/claude/cuaderno-patin/index.html` (rStudent, stepCard, refSelect, actions addStep, editStep, saveStep, cancelStep, stepUp, stepDown) |
| Flow | Add a step to a student's choreography |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 62 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous (no login, no network)
- Fresh browser profile: empty localStorage, no cookies
- Do not click Web Share or download buttons anywhere.

## Test data
- `profeName = "QA Profe"`, `groupName = "Grupo QA"` (level Iniciación), `studentName = "Alumna QA"`
- Step 1: `#sp_tipo` = `Técnico`, `#sp_t` = `0:20`, `#sp_txt` = `Trompo en dos pies en el centro`, `#sp_ref` = `Obligatorio: Trompo en dos pies`
- Step 2: `#sp_tipo` = `Artístico`, `#sp_t` = `0:50`, `#sp_txt` = `Entrada con brazos arriba`, `#sp_ref` = `Ninguno`
- Step 3: `#sp_tipo` = `Técnico`, `#sp_t` = `1:10`, `#sp_txt` = `Combinación de figuras en la diagonal`, `#sp_ref` = `Obligatorio: Una combinación de figuras hacia adelante`
- Edit values for step 2: `se_tipo` = `Técnico`, `se_t` = `0:45`, `se_txt` = `Entrada con brazos arriba y giro`
- `emptyText = ""`, `spacesText = "   "`
- `longText = 141 × "a"` (maxlength is 140)
- `longTime = "0:20:00:99"` (10 chars, stored as the first 8)
- `markupText = "<b>negrita</b> & co"`

## Steps

### TC-00: Setup (fresh profile)
1. Open a new browser profile. Navigate to `http://localhost:8080/`.
2. Assert: heading "Bienvenida" is visible with input `#pname` and button **Empezar**.
3. Type `QA Profe` into `#pname`. Click **Empezar**. Assert: subtitle reads "Profe QA Profe · Liga".
4. Click bottom nav **Alumnas**. Assert: card "Nuevo grupo" is visible.
5. Type `Grupo QA` into `#gname`. Click **Guardar grupo**. Assert: group card "Grupo QA" is visible.
6. Type `Alumna QA` into `#newstu`. Click **Agregar**. Assert: heading "Alumnas (1)" and row "Alumna QA".
7. Click bottom nav **Coreos**. Click the card "Alumna QA". Assert: heading "Alumna QA" and button **← Alumnas del grupo**.

### TC-01: Happy path: add three steps
1. Assert: text "Todavía no hay pasos. Agregá el primero abajo." is visible. `#sp_tipo` shows "Técnico"; `#sp_t` and `#sp_txt` are empty; `#sp_ref` shows "Ninguno". `#sperr` is empty.
2. Assert: `#sp_ref` lists exactly: "Ninguno", "Obligatorio: Una combinación de figuras hacia adelante", "Obligatorio: Trompo en dos pies", "Opcional: Secuencia de skating skill hacia atrás", "Obligatorio: Choreo Step Sequence".
3. Fill Step 1 (every field from Test data). Click **Agregar paso**.
4. Assert: the text "Todavía no hay pasos..." is gone; step card number badge "1", bold text "Trompo en dos pies en el centro", chips "Técnico", "0:20" and "Cumple: Trompo en dos pies" (menta).
5. Assert: the form reset: `#sp_txt` and `#sp_t` are empty, `#sp_tipo` is "Técnico", `#sp_ref` is "Ninguno". Chip "1 de 3 obligatorios" in "Del reglamento".
6. Fill Step 2. Click **Agregar paso**.
7. Assert: step card badge "2", text "Entrada con brazos arriba", chips "Artístico" (rosa) and "0:50"; no "Cumple:" chip.
8. Fill Step 3. Click **Agregar paso**.
9. Assert: step card badge "3", text "Combinación de figuras en la diagonal", chips "Técnico", "1:10", "Cumple: Una combinación de figuras hacia adelante"; chip "2 de 3 obligatorios". The step cards appear in the order 1, 2, 3 under "Mi coreo, paso a paso".
10. Click **← Alumnas del grupo**. Assert: the card "Alumna QA" shows "2/3 obligatorios" and "Eficiencia Quinta · 3 pasos".
11. Reload the page. Click **Coreos**, open "Alumna QA". Assert: the three steps are present in the same order with the same chips.

### TC-02: Form validation: add step form (`#sp_txt`, `#sp_t`, `#sp_tipo`, `#sp_ref`)
Run each row from the student view. After each row assert the number of step cards (still 3) and the message in `#sperr`.

| Field / action | Input | Expected |
|---|---|---|
| `#sp_txt` empty | click **Agregar paso** with `#sp_txt` = "" | `#sperr` reads "Escribí qué pasa en el paso."; no step added |
| `#sp_txt` spaces only | `#sp_txt` = "   ", click **Agregar paso** | `#sperr` reads "Escribí qué pasa en el paso."; no step added |
| `#sp_txt` empty with other fields filled | `#sp_t` = `0:30`, `#sp_ref` = `Obligatorio: Choreo Step Sequence`, `#sp_txt` empty, click **Agregar paso** | same message; no step added; the Choreo item stays unticked |
| `#sp_txt` max length | type `longText` (141 × "a") | the input holds 140 characters (maxlength); after **Agregar paso** the new step text has 140 characters |
| `#sp_t` overflow | `#sp_txt` = `Paso con tiempo largo`, `#sp_t` = `0:20:00:99` | after **Agregar paso** the time chip reads "0:20:00:" (first 8 characters); no error |
| `#sp_t` empty | `#sp_txt` = `Paso sin minuto`, `#sp_t` empty | step added, no time chip |
| markup in text | `#sp_txt` = `<b>negrita</b> & co` | step text is shown literally as `<b>negrita</b> & co`, no bold element is rendered |

Assert for the last four rows that the step count increases by one each time (4, 5, 6, 7 steps). The text "Escribí qué pasa en el paso." disappears after a successful add.

### TC-03: Edit a step
1. On step card "Entrada con brazos arriba" click **Editar**.
2. Assert: the card turns into an edit form with `#se_tipo` = "Artístico", `#se_t` = "0:50", `#se_txt` = "Entrada con brazos arriba", `#se_ref` = "Ninguno", and buttons **Guardar** and **Cancelar**.
3. Change `#se_txt` to "XX" and click **Cancelar**. Assert: the card returns to the display form with the original text "Entrada con brazos arriba" and chips "Artístico", "0:50".
4. Click **Editar** again. Set `#se_tipo` = `Técnico`, `#se_t` = `0:45`, `#se_txt` = `Entrada con brazos arriba y giro`. Click **Guardar**.
5. Assert: the card shows "Entrada con brazos arriba y giro", chips "Técnico" (celeste) and "0:45"; the step keeps its position 2.
6. Click **Editar** on that card, clear `#se_txt`, click **Guardar**. Assert: nothing happens: the card stays in edit mode, no message is shown and the stored text is unchanged. Click **Cancelar**; the text is still "Entrada con brazos arriba y giro".
7. Click **Editar** on step 1, set `#se_ref` = `Ninguno`, click **Guardar**. Assert: the chip "Cumple: Trompo en dos pies" is gone; chip "1 de 3 obligatorios".

### TC-04: Reorder steps
1. Assert: on step 1 the **↑** button (aria-label "Subir") is disabled; on the last step the **↓** button (aria-label "Bajar") is disabled.
2. Click **↓** on step 1 ("Trompo en dos pies en el centro").
3. Assert: that step is now badge 2 and "Entrada con brazos arriba y giro" is badge 1.
4. Click **↑** on the step now at position 2. Assert: the order is back to the original.
5. Click **↓** on step 1, then reload the page, open Coreos and "Alumna QA". Assert: the swapped order is still shown.

### TC-05: Negative and edge cases
- Adding a step does not clear the other student fields: type `1:30` in "Duración del programa" and press Tab (the text "Dura 1:30, dentro del máximo de 1:30." appears), then add a step. Assert: the duration field still shows "1:30".
- Steps are per student: create a second alumna "Alumna QA B" in Alumnas, open her in Coreos. Assert: "Todavía no hay pasos. Agregá el primero abajo." and the first student's steps are not shown.

## Assertions
- [ ] A submitted step appears as a numbered card with its text, type chip, minute chip and "Cumple:" chip.
- [ ] The add form resets after each successful add.
- [ ] Empty or whitespace text shows "Escribí qué pasa en el paso." in `#sperr` and adds nothing.
- [ ] Text is limited to 140 characters and time to 8 characters.
- [ ] User text is HTML-escaped.
- [ ] Edit with **Cancelar** changes nothing; **Guardar** with empty text does nothing.
- [ ] Reordering with **↑** and **↓** persists after reload.
- [ ] The list card shows "N pasos" (or "1 paso") matching the number of steps.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx).

## Screenshots required
- Student view with the empty steps list
- Validation error "Escribí qué pasa en el paso."
- Three steps added
- Step in edit mode
- Final state after the reorder

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
