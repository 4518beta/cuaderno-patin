# T13-alumnas-ficha-edit: Edit a student in the ficha (name and group)

| Field | Value |
|---|---|
| Route | `/` (tab Alumnas, ficha `rFicha`) |
| Source | `index.html` (rFicha, ACTIONS.openFicha, ACTIONS.saveFicha, ACTIONS.closeFicha) |
| Flow | Open ficha, rename, validation, change group |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 38 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous user, no login. No network is needed or used.
- Fresh browser profile: empty localStorage and no cookies.
- Seed data is created through the UI in TC-00 (two groups, one student).

## Test data
- `profeName = "QA Profe"`
- Group A: `gname = "Avanzado QA"`, level `Avanzado`. Group B: `gname = "Grupo QA"`, level `Intermedio`
- Student: `studentName = "Valentina"` created in "Grupo QA"
- `newName = "Vale"`, `discardName = "Descartada"`, `emptyName = ""`, `blankName = "   "`
- Error text: `Poné un nombre.` (element `#ferr`, role status)

## Steps

### TC-00: Setup (fresh profile, welcome, seed)
1. Open a new browser context with empty storage. Navigate to `http://localhost:8080`.
2. Fill `#pname` with `QA Profe`, click **`Empezar`**. Click the **`Alumnas`** nav item.
3. Fill `#gname` with `Avanzado QA`, select `Avanzado`, click **`Guardar grupo`**.
4. Click **`+ Nuevo grupo`**, fill `#gname` with `Grupo QA`, select `Intermedio`, click **`Guardar grupo`**.
5. Assert: the tab strip order is "Avanzado QA", "Grupo QA" and "Grupo QA" is highlighted.
6. Type `Valentina` in `#newstu`, click **`Agregar`**. Assert: "Alumnas (1)" and row "Valentina".

### TC-01: Open the ficha
1. Click **`Ficha`** on the "Valentina" row.
2. Assert: the group view is replaced by the ficha. h2 is "Valentina". Button **`← Volver al grupo`** is visible.
3. Assert: `#fname` has value "Valentina" and label "Nombre (solo nombre de pila)". `#fgid` (label "Grupo") has options "Avanzado QA" and "Grupo QA" with "Grupo QA" selected.
4. Assert: buttons **`Guardar`** and **`Borrar alumna`** are visible, `#ferr` is empty, heading "Cuotas <current year>" and the text "Tocá el mes para marcarlo como pagado." are present.
5. Assert: the ficha has no song, level or notes field (the only form controls are `#fname` and `#fgid`).
6. Screenshot: ficha initial state.

### TC-02: Happy path - Rename the student
1. Clear `#fname` and type `Vale`.
2. Click **`Guardar`**.
3. Assert: the ficha closes and the group view of "Grupo QA" is shown. Heading "Alumnas (1)", row "Vale", no row "Valentina".
4. Wait 1 second. Reload, click **`Alumnas`**. Assert: row "Vale" is still the only student of "Grupo QA".
5. Click **`Ficha`** on "Vale". Assert: h2 "Vale" and `#fname` value "Vale".

### TC-03: Form validation - ficha
| Field | Empty value error | Pattern violation | Max-length overflow |
|---|---|---|---|
| `#fname` | "Poné un nombre." (also for `   `) | n/a | truncated to 60 by `maxlength` |
| `#fgid` | n/a (always has a value) | n/a | n/a |

1. Clear `#fname` (empty). Click **`Guardar`**.
2. Assert: `#ferr` text is exactly "Poné un nombre.", the ficha stays open (h2 still "Vale").
3. Screenshot: validation error state.
4. Fill `#fname` with `   ` (3 spaces). Click **`Guardar`**. Assert: `#ferr` shows "Poné un nombre." and the ficha stays open.
5. Type 61 × "c" in `#fname`. Assert: the field holds 60 characters. Click **`Guardar`**. Assert: back in the list, a row with 60 × "c" exists and no row "Vale".
6. Click **`Ficha`** on that row, set `#fname` back to `Vale`, click **`Guardar`**. Assert: row "Vale".

### TC-04: Volver discards unsaved edits
1. Click **`Ficha`** on "Vale". Fill `#fname` with `Descartada`.
2. Click **`← Volver al grupo`**.
3. Assert: the group view shows row "Vale" and no row "Descartada".

### TC-05: Change the student's group
1. Click **`Ficha`** on "Vale". Select `Avanzado QA` in `#fgid`.
2. Click **`Guardar`**.
3. Assert: back in the "Grupo QA" view, heading "Alumnas (0)" and text "Todavía no hay alumnas en este grupo.".
4. Click tab "Avanzado QA". Assert: heading "Alumnas (1)" and row "Vale".
5. Wait 1 second. Reload, click **`Alumnas`**, click tab "Avanzado QA". Assert: row "Vale" is still there; tab "Grupo QA" shows "Alumnas (0)".
6. Open the ficha of "Vale". Assert: `#fgid` has "Avanzado QA" selected.
7. Screenshot: final state.

## Assertions
- [ ] The ficha shows the name, group select, **`Guardar`**, **`Borrar alumna`** and **`← Volver al grupo`**.
- [ ] **`Guardar`** with a valid name returns to the group list with the new name.
- [ ] Empty or whitespace name shows "Poné un nombre." in `#ferr` and keeps the ficha open.
- [ ] **`← Volver al grupo`** discards unsaved edits.
- [ ] Changing `#fgid` moves the student to the other group.
- [ ] Changes survive a reload.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests, and no network requests other than the initial page load.

## Screenshots required
- Ficha initial state
- Validation error state
- List after rename
- Both groups after the move

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
