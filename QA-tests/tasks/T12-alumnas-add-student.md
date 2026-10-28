# T12-alumnas-add-student: Add students to a group

| Field | Value |
|---|---|
| Route | `/` (tab Alumnas, group view) |
| Source | `index.html` (rAlumnas, ACTIONS.addStu) |
| Flow | Add student, validation, per-group lists |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 40 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous user, no login. No network is needed or used.
- Fresh browser profile: empty localStorage and no cookies.
- Seed data is created through the UI in TC-00 (one group "Grupo QA").

## Test data
- `profeName = "QA Profe"`
- Seed group: `gname = "Grupo QA"`, level `Intermedio`, no time, no days
- Second group: `gname = "Avanzado QA"`, level `Avanzado`
- Students: `s1 = "Valentina"`, `s2 = "Camila"`, `s3 = "Bruno"`, `s4 = "Camila"` (duplicate on purpose), `sLong = 61 × "b"`, `sHtml = "<i>Zoe</i> & \"Co\""`, `sOther = "Ines"`
- `emptyName = ""`, `blankName = "   "`
- Error text: `Escribí el nombre.` (element `#sterr`, role alert)
- `currentMonth` = Spanish month name of the system date

## Steps

### TC-00: Setup (fresh profile, welcome, seed group)
1. Open a new browser context with empty storage. Navigate to `http://localhost:8080`.
2. Fill `#pname` with `QA Profe`, click **`Empezar`**. Assert: `#subttl` reads "Profe QA Profe · Liga".
3. Click the **`Alumnas`** nav item. The group form "Nuevo grupo" is shown.
4. Fill `#gname` with `Grupo QA`, select `Intermedio` in `#glevel`, click **`Guardar grupo`**.
5. Assert: tab "Grupo QA" is highlighted, heading "Alumnas (0)", text "Todavía no hay alumnas en este grupo.".

### TC-01: Happy path - Add a student
1. Assert: `#newstu` has placeholder "Nombre de pila" and is empty, button **`Agregar`** is visible, `#sterr` is empty.
2. Type `Valentina` in `#newstu`. Click **`Agregar`**.
3. Assert: heading is "Alumnas (1)". The empty text "Todavía no hay alumnas en este grupo." is gone.
4. Assert: one row shows bold "Valentina", chip "sin cuota" and a button **`Ficha`**.
5. Assert: `#newstu` is empty and has focus. `#sterr` is empty.
6. Assert: the group line reads "Profe: QA Profe · Cuota de <currentMonth>: 0 de 1".
7. Type `Camila` in `#newstu`, click **`Agregar`**. Type `Bruno`, click **`Agregar`**.
8. Assert: heading "Alumnas (3)" and the rows are in alphabetical order: Bruno, Camila, Valentina. Group line ends "0 de 3".
9. Screenshot: list with three students.
10. Wait 1 second. Reload the page. Click **`Alumnas`**. Assert: heading "Alumnas (3)" and the same three rows in the same order.

### TC-02: Form validation - add student
For the add form (`#newstu` + **`Agregar`**), submit with each value and assert:

| Field | Empty value error | Pattern violation | Max-length overflow |
|---|---|---|---|
| `#newstu` | "Escribí el nombre." (also for `   `) | n/a | truncated to 60 by `maxlength` |

1. With `#newstu` empty, click **`Agregar`**. Assert: `#sterr` text is exactly "Escribí el nombre." and the heading still reads "Alumnas (3)".
2. Type `   ` (3 spaces), click **`Agregar`**. Assert: `#sterr` shows "Escribí el nombre." and the count is unchanged.
3. Screenshot: validation error state.
4. Type `Dario` and click **`Agregar`**. Assert: "Alumnas (4)", row "Dario" present, `#sterr` is empty (list re-rendered).
5. With `#newstu` focused and text `Elena` typed, press the Enter key. Assert: no student "Elena" is added (there is no Enter handler); count stays 4. Clear the field.

### TC-03: Edge cases
1. Type 61 × "b" in `#newstu`. Assert: the field holds exactly 60 characters. Click **`Agregar`**. Assert: a row with 60 × "b" exists (count 5).
2. Type `<i>Zoe</i> & "Co"`, click **`Agregar`**. Assert: the row shows the literal text `<i>Zoe</i> & "Co"` (no italic element rendered). Count 6.
3. Type `Camila` again, click **`Agregar`**. Assert: two rows named "Camila" exist (no duplicate check). Count 7.
4. Screenshot: list with edge-case rows.

### TC-04: Students belong to one group
1. Click **`+ Nuevo grupo`**. Fill `#gname` with `Avanzado QA`, select `Avanzado`, click **`Guardar grupo`**.
2. Assert: tab "Avanzado QA" is highlighted, heading "Alumnas (0)", empty text "Todavía no hay alumnas en este grupo.".
3. Type `Ines` in `#newstu`, click **`Agregar`**. Assert: "Alumnas (1)", row "Ines".
4. Click tab "Grupo QA". Assert: heading "Alumnas (7)" and no row "Ines".
5. Click tab "Avanzado QA". Assert: heading "Alumnas (1)" and only "Ines".

## Assertions
- [ ] Empty and whitespace names show "Escribí el nombre." in `#sterr` and add nothing.
- [ ] A valid add increments "Alumnas (n)", shows chip "sin cuota" and a **`Ficha`** button, clears and focuses `#newstu`.
- [ ] Students are listed alphabetically.
- [ ] Group line "Cuota de <currentMonth>: 0 de n" tracks the student count.
- [ ] Names over 60 characters are cut to 60; HTML in names is shown literally; duplicate names are allowed.
- [ ] Students are scoped to their group and survive a reload.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests, and no network requests other than the initial page load.

## Screenshots required
- Group view with empty list
- List with three students
- Validation error state
- Edge-case rows
- Second group view

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
