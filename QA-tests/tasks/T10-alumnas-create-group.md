# T10-alumnas-create-group: Create a group from the Alumnas group form

| Field | Value |
|---|---|
| Route | `/` (tab Alumnas, group form `groupForm`) |
| Source | `index.html` (groupForm, rAlumnas, ACTIONS.saveGroup) |
| Flow | Create first group, create second group with defaults, persistence |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 42 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous user, no login. No network is needed or used.
- Fresh browser profile: empty localStorage (`localStorage.getItem("cuaderno-liga-v2")` is `null`), no cookies.
- No seed data. The task creates every record through the UI.

## Test data
- `profeName = "QA Profe"` (welcome form `#pname`)
- Group 1: `gname = "Intermedio martes y jueves"`, `glevel = "Intermedio"`, `ghora = "18:30"`, days checked = `Mar` and `Jue` (checkbox values 2 and 4)
- Group 2 (defaults): `gname = "Iniciación mañana"`, `glevel` left at default `Iniciación`, `ghora` left empty, no day checked
- Expected stored group 1 (key `g:<id>` in `D` of `cuaderno-liga-v2`): `{name:"Intermedio martes y jueves", level:"Intermedio", hora:"18:30", dias:[2,4], profe:"QA Profe"}`
- `currentMonth` = the Spanish month name of the system date (October when authored, used in the "Cuota de <Mes>" line)

## Steps

### TC-00: Setup (fresh profile and welcome form)
1. Open a new browser context with empty storage. Navigate to `http://localhost:8080`.
2. Assert: welcome gate is visible, `#pname` has placeholder "Tu nombre de pila", button **`Empezar`** is visible.
3. Fill `#pname` with `QA Profe`. Click **`Empezar`**.
4. Assert: `#subttl` reads "Profe QA Profe · Liga" and the heading "Buen día, QA Profe" is visible.
5. Screenshot: Hoy with no groups.

### TC-01: Happy path - Create a group with level, time and days
1. On Hoy, assert card "Primer paso" is visible. Click **`Crear mi primer grupo`**.
2. Assert: the Alumnas tab is active in `#bnav`, heading "Alumnas y grupos" and form title "Nuevo grupo" are visible.
3. Assert form defaults: `#gname` is empty with placeholder "Ej: Intermedio tarde", `#glevel` shows "Iniciación" (options in order: Iniciación, Intermedio, Avanzado), `#ghora` is empty, the 7 `input.gday` checkboxes are in order Lun, Mar, Mié, Jue, Vie, Sáb, Dom and none is checked. Buttons **`Guardar grupo`** and **`Cancelar`** are visible. `#gerr` is empty.
4. Fill `#gname` with `Intermedio martes y jueves` (type the text, do not set the value programmatically).
5. Select `Intermedio` in `#glevel`.
6. Fill `#ghora` with `18:30`.
7. Check the `Mar` checkbox and the `Jue` checkbox.
8. Click **`Guardar grupo`**.
9. Assert: the form is gone. A segmented tab button "Intermedio martes y jueves" (`[data-a=agroup]`) is present and highlighted (class `on`).
10. Assert: the group card shows h3 "Intermedio martes y jueves", chip "Intermedio", the line "Mar, Jue · 18:30", and the line "Profe: QA Profe · Cuota de <currentMonth>: 0 de 0".
11. Assert: buttons **`Editar grupo`**, **`Borrar grupo`** and **`+ Nuevo grupo`** are visible.
12. Assert: card heading "Alumnas (0)", `#newstu` with placeholder "Nombre de pila", button **`Agregar`**, and the text "Todavía no hay alumnas en este grupo.".
13. Screenshot: group view after the first save.
14. Wait 1 second (storage save is debounced 250 ms). Evaluate `JSON.parse(localStorage.getItem("cuaderno-liga-v2")).D` and assert there is exactly one key starting with `g:` whose value `v` equals the expected stored group 1.
15. Reload the page. Assert: no welcome gate (profe name persisted), `#subttl` still reads "Profe QA Profe · Liga", and Hoy no longer shows **`Crear mi primer grupo`**.
16. Click the **`Alumnas`** nav item. Assert: tab "Intermedio martes y jueves" is present and the group card shows "Mar, Jue · 18:30" and chip "Intermedio".

### TC-02: Second group with default values only
1. Click **`+ Nuevo grupo`**. Assert: form title "Nuevo grupo", `#gname` empty, `#glevel` "Iniciación", no day checked.
2. Fill `#gname` with `Iniciación mañana`. Leave level, time and days untouched.
3. Click **`Guardar grupo`**.
4. Assert: two tab buttons exist in this order: "Iniciación mañana", "Intermedio martes y jueves" (alphabetical, Spanish collation). "Iniciación mañana" is highlighted.
5. Assert: group card h3 "Iniciación mañana", chip "Iniciación", day line is exactly "Sin días cargados" (no " · " suffix), and "Profe: QA Profe · Cuota de <currentMonth>: 0 de 0".
6. Click tab "Intermedio martes y jueves". Assert: the card still shows "Mar, Jue · 18:30" (first group not modified).
7. Screenshot: both groups in the tab strip.
8. Reload, open **`Alumnas`**. Assert: both tabs are still present.

### TC-03: Button coverage
| Button | Action taken | Expected result |
|---|---|---|
| `Crear mi primer grupo` (Hoy) | click | Alumnas tab opens with form "Nuevo grupo" |
| `Guardar grupo` | click with valid data | group saved, view switches to the new group |
| `+ Nuevo grupo` | click | form "Nuevo grupo" opens, empty |
| `Cancelar` | click with 2 groups present | form closes, group view returns, no new group |

1. With two groups present, click **`+ Nuevo grupo`**, type `No guardar` in `#gname`, click **`Cancelar`**.
2. Assert: group view is shown, only the two tabs from TC-02 exist, no tab "No guardar".

## Assertions
- [ ] Welcome gate accepts "QA Profe" and `#subttl` becomes "Profe QA Profe · Liga".
- [ ] Group form defaults are: empty name, level Iniciación, empty time, no day checked.
- [ ] A valid save shows the new group tab, chip with level, day line "Mar, Jue · 18:30" and "Cuota de <currentMonth>: 0 de 0".
- [ ] A group with no days and no time shows "Sin días cargados" with no " · ".
- [ ] The stored group has the expected shape and `profe` "QA Profe".
- [ ] Data survives a reload.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests, and no network requests other than the initial page load.

## Screenshots required
- Welcome gate
- Hoy with no groups
- Empty group form (defaults)
- Filled group form before saving
- Group view after the first save
- Both groups in the tab strip

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
