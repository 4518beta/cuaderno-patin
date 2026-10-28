# T16-alumnas-edit-group: Edit an existing group

| Field | Value |
|---|---|
| Route | `/` (tab Alumnas, group form in edit mode) |
| Source | `index.html` (groupForm, ACTIONS.editGroup, ACTIONS.saveGroup, ACTIONS.cancelGroup) |
| Flow | Edit group: prefill, update, validation, cancel, students kept |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 40 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous user, no login. No network is needed or used.
- Fresh browser profile: empty localStorage and no cookies.
- Seed data is created through the UI in TC-00 (two groups, one student).

## Test data
- `profeName = "QA Profe"`
- Group A (seed): `gname = "Avanzado tarde"`, `glevel = "Avanzado"`, `ghora = "19:00"`, days `Lun` and `Mié`, student `Lola`
- Group B (seed): `gname = "Iniciación sábado"`, `glevel = "Iniciación"`, `ghora = "10:00"`, day `Sáb`
- Edit values for A: `gname = "Avanzado noche"`, `glevel = "Intermedio"`, `ghora = "20:15"`, days all 7 checked
- Edit values for B: `ghora` cleared, all days unchecked
- Error text: `Poné un nombre.` (element `#gerr`)
- `currentMonth` = Spanish month name of the system date

## Steps

### TC-00: Setup (fresh profile, welcome, seed)
1. Open a new browser context with empty storage. Navigate to `http://localhost:8080`.
2. Fill `#pname` with `QA Profe`, click **`Empezar`**. Click the **`Alumnas`** nav item.
3. Fill the group form with Group A data (`Avanzado tarde`, `Avanzado`, `19:00`, check `Lun` and `Mié`). Click **`Guardar grupo`**.
4. Type `Lola` in `#newstu`, click **`Agregar`**. Assert: "Alumnas (1)".
5. Click **`+ Nuevo grupo`** and fill Group B data (`Iniciación sábado`, `Iniciación`, `10:00`, check `Sáb`). Click **`Guardar grupo`**.
6. Assert: tabs in order "Avanzado tarde", "Iniciación sábado". Group B card shows "Sáb · 10:00". Click tab "Avanzado tarde".

### TC-01: Edit form is prefilled
1. On "Avanzado tarde", click **`Editar grupo`**.
2. Assert: h2 "Alumnas y grupos" and form title "Editar grupo" (not "Nuevo grupo"). The tab strip and student list are not shown.
3. Assert: `#gname` = "Avanzado tarde", `#glevel` = "Avanzado", `#ghora` = "19:00".
4. Assert: only the `Lun` and `Mié` checkboxes are checked; `Mar`, `Jue`, `Vie`, `Sáb`, `Dom` are unchecked.
5. Screenshot: prefilled edit form.

### TC-02: Happy path - Update the group
1. Clear `#gname` and type `Avanzado noche`.
2. Select `Intermedio` in `#glevel`.
3. Fill `#ghora` with `20:15`.
4. Check the `Mar`, `Jue`, `Vie`, `Sáb` and `Dom` checkboxes (so all 7 are checked).
5. Click **`Guardar grupo`**.
6. Assert: group view returns, with tabs "Avanzado noche" (highlighted) and "Iniciación sábado". There are exactly 2 tabs (no duplicate and no tab "Avanzado tarde").
7. Assert: the card shows h3 "Avanzado noche", chip "Intermedio", the line "Lun, Mar, Mié, Jue, Vie, Sáb, Dom · 20:15", and "Profe: QA Profe · Cuota de <currentMonth>: 0 de 1" (the profe is kept).
8. Assert: heading "Alumnas (1)" with "Lola" still in the list (students stay with the edited group).
9. Wait 1 second. Reload, click **`Alumnas`**. Assert: tab "Avanzado noche" exists with the same card data and "Lola".
10. Click **`Editar grupo`**. Assert: the form is prefilled with the new values and all 7 checkboxes are checked. Click **`Cancelar`**.
11. Screenshot: group after the edit.

### TC-03: Form validation - edit mode
| Field | Empty value error | Pattern violation | Max-length overflow |
|---|---|---|---|
| `#gname` | "Poné un nombre." (also for `   `) | n/a | truncated to 60 by `maxlength` |
| `#ghora` | none, optional | n/a | n/a |

1. Click **`Editar grupo`**. Clear `#gname`. Click **`Guardar grupo`**.
2. Assert: `#gerr` text is exactly "Poné un nombre.", form title still "Editar grupo".
3. Screenshot: validation error state.
4. Type `   ` (3 spaces) in `#gname`, click **`Guardar grupo`**. Assert: the same error.
5. Click **`Cancelar`**. Assert: group view with tab and h3 still "Avanzado noche" (the failed edit changed nothing).
6. Click **`Editar grupo`**, type 61 × "d" after clearing `#gname`. Assert: the field holds 60 characters. Click **`Guardar grupo`**. Assert: the tab text is 60 × "d". Click **`Editar grupo`**, set `#gname` back to `Avanzado noche`, click **`Guardar grupo`**.

### TC-04: Clearing time and days on another group
1. Click tab "Iniciación sábado". Assert: the card shows "Sáb · 10:00".
2. Click **`Editar grupo`**. Assert: `#gname` "Iniciación sábado", `#glevel` "Iniciación", `#ghora` "10:00", only `Sáb` checked.
3. Clear `#ghora`. Uncheck `Sáb`. Click **`Guardar grupo`**.
4. Assert: the day line is exactly "Sin días cargados" (no " · "). Chip "Iniciación" unchanged.
5. Wait 1 second. Reload, click **`Alumnas`**, click tab "Iniciación sábado". Assert: still "Sin días cargados".

### TC-05: Cancel discards edits and edit does not affect other groups
1. On "Iniciación sábado", click **`Editar grupo`**, type `Cambio perdido` in `#gname`, select `Avanzado`, click **`Cancelar`**.
2. Assert: group view, tab and h3 still "Iniciación sábado", chip "Iniciación", no tab "Cambio perdido".
3. Click tab "Avanzado noche". Assert: card still shows chip "Intermedio" and "Lun, Mar, Mié, Jue, Vie, Sáb, Dom · 20:15" (group A not modified by editing group B).

## Assertions
- [ ] **`Editar grupo`** opens the form titled "Editar grupo", prefilled with name, level, time and days.
- [ ] A valid save updates the same group (no duplicate), keeps the profe and keeps its students.
- [ ] Empty or whitespace name shows "Poné un nombre." and keeps the edit form open without changes.
- [ ] Clearing time and days gives "Sin días cargados" with no " · ".
- [ ] **`Cancelar`** discards the edits.
- [ ] Changes survive a reload.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests, and no network requests other than the initial page load.

## Screenshots required
- Prefilled edit form
- Validation error state in edit mode
- Group after the edit
- Group with cleared time and days

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
