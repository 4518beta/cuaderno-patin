# T15-alumnas-delete-student-group: Destructive - Borrar alumna and Borrar grupo

| Field | Value |
|---|---|
| Route | `/` (tab Alumnas, group view and ficha) |
| Source | `index.html` (delBtn, confirmed, ACTIONS.delStu, ACTIONS.delGroup, click handler) |
| Flow | Destructive: two-click confirm for delStu and delGroup |
| Requires auth | no |
| Required role | anonymous |
| Destructive | yes |
| Estimated steps | 52 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous user, no login. No network is needed or used.
- Fresh browser profile: empty localStorage and no cookies.
- Seed data is created through the UI in TC-00 (two groups, three students, one fee marked).
- The system month must be Mar to Dic (needed to mark a fee for the orphan check).

## Test data
- `profeName = "QA Profe"`
- Group 1: `gname = "Avanzado QA"`, level `Avanzado`, student `Ines`
- Group 2: `gname = "Grupo QA"`, level `Intermedio`, students `Bruno`, `Camila`
- `currentMonthLabel` = toggle label of the system month (for example `Oct`)
- Confirm text on the delete buttons: first state `Borrar alumna` / `Borrar grupo`, armed state `¿Seguro?`
- Known quirk: deleting leaves the fee keys `q:<studentId>:<year>-<MM>` in storage as orphans

## Steps

### TC-00: Setup (fresh profile, welcome, seed)
1. Open a new browser context with empty storage. Navigate to `http://localhost:8080`.
2. Fill `#pname` with `QA Profe`, click **`Empezar`**. Click the **`Alumnas`** nav item.
3. Create group `Avanzado QA` (level `Avanzado`) with **`Guardar grupo`**. Add student `Ines`.
4. Click **`+ Nuevo grupo`**, create group `Grupo QA` (level `Intermedio`). Add students `Bruno` and `Camila`.
5. Click **`Ficha`** on "Bruno", click the `<currentMonthLabel>` toggle, click **`← Volver al grupo`**. Assert: "Bruno" shows chip "cuota al día".
6. Assert: tabs "Avanzado QA" and "Grupo QA" exist, "Grupo QA" is highlighted with "Alumnas (2)".
7. Wait 1 second. Evaluate storage and record the ids: `bruno_id`, `camila_id`, `ines_id`, `grupoQA_id`, `avanzadoQA_id` (keys `s:<id>` and `g:<id>` whose `v.name` matches).

### TC-01: Borrar alumna - cancel by leaving the ficha
1. On "Grupo QA", click **`Ficha`** on "Camila".
2. Click **`Borrar alumna`**. Assert: the same button now reads "¿Seguro?" and has the danger style. The ficha is still open (h2 "Camila").
3. Screenshot: armed confirm state.
4. Click **`← Volver al grupo`** (another `data-a` element cancels the pending confirm).
5. Assert: the list shows "Alumnas (2)" with Bruno and Camila.
6. Click **`Ficha`** on "Camila" again. Assert: the delete button reads "Borrar alumna" (not "¿Seguro?").

### TC-02: Borrar alumna - cancel by clicking another action in the ficha
1. In the ficha of "Camila", click **`Borrar alumna`**. Assert: the button reads "¿Seguro?".
2. Click the `Mar` fee toggle. Assert: `Mar` is `aria-pressed="true"` and the delete button is back to "Borrar alumna".
3. Click `Mar` again to unmark it. Assert: `aria-pressed="false"`.
4. Click **`Borrar alumna`** once. Assert: the ficha is still open and the button reads "¿Seguro?" (one click never deletes).

### TC-03: Borrar alumna - confirm
1. Click **`¿Seguro?`** (second click on the same button).
2. Assert: the ficha closes and the group view of "Grupo QA" shows "Alumnas (1)" with only "Bruno". No row "Camila".
3. Assert: the group line reads "Cuota de <currentMonth>: 1 de 1" (Bruno is up to date).
4. Wait 1 second. Reload, click **`Alumnas`**. Assert: "Grupo QA" still has only "Bruno".
5. Evaluate storage. Assert: `D["s:<camila_id>"].v` is `null`. Assert: `D["s:<bruno_id>"].v` is an object with name "Bruno".
6. Screenshot: list after the student deletion.

### TC-04: Borrar grupo - cancel by switching tab
1. On "Grupo QA", click **`Borrar grupo`**. Assert: the button reads "¿Seguro?" with the danger style, the group card is still visible.
2. Click the tab "Avanzado QA". Assert: "Alumnas (1)" with "Ines".
3. Click the tab "Grupo QA". Assert: the button reads "Borrar grupo" (confirm cancelled), the group and "Bruno" are intact.
4. Click **`Borrar grupo`** once more. Assert: the button reads "¿Seguro?" and the group still exists (one click never deletes).
5. Click **`Editar grupo`**. Assert: the form "Editar grupo" opens. Click **`Cancelar`**. Assert: group view, delete button reads "Borrar grupo".

### TC-05: Borrar grupo - confirm
1. On "Grupo QA", click **`Borrar grupo`**, then click **`¿Seguro?`**.
2. Assert: tab "Grupo QA" is gone. Only tab "Avanzado QA" remains and it is highlighted, showing "Alumnas (1)" with "Ines".
3. Assert: no row "Bruno" anywhere (students of the deleted group are deleted too).
4. Wait 1 second. Reload, click **`Alumnas`**. Assert: only "Avanzado QA" exists.
5. Evaluate storage. Assert: `D["g:<grupoQA_id>"].v` is `null` and `D["s:<bruno_id>"].v` is `null`.
6. Assert the known quirk: the key `q:<bruno_id>:<year>-<MM>` is still in `D` with `v` equal to 1 (orphan fee key left behind). Record this as an observation, not a failure.
7. Screenshot: after the group deletion.

### TC-06: Borrar grupo - last group
1. On "Avanzado QA", click **`Borrar grupo`**, then **`¿Seguro?`**.
2. Assert: the tab strip and group card are gone and the group form (h2 "Alumnas y grupos", title "Nuevo grupo") is shown.
3. Click **`Cancelar`**. Assert: the form is still shown (no groups to return to).
4. Click the **`Hoy`** nav item. Assert: card "Primer paso" and button **`Crear mi primer grupo`** are visible.
5. Reload and open **`Alumnas`**. Assert: the form "Nuevo grupo" is shown and there are no tabs.
6. Screenshot: final state.

### TC-07: Button coverage
| Button | Action taken | Expected result |
|---|---|---|
| `Borrar alumna` | click | label changes to "¿Seguro?", nothing deleted |
| `Borrar alumna` / `¿Seguro?` | click, then another action | confirm cancelled, label back to "Borrar alumna" |
| `¿Seguro?` (student) | second click | student removed, back to the group list |
| `Borrar grupo` | click | label changes to "¿Seguro?", nothing deleted |
| `¿Seguro?` (group) | second click | group and its students removed |

## Assertions
- [ ] The first click on either delete button only arms it ("¿Seguro?"); the second click deletes.
- [ ] Clicking another action element (tab, **`← Volver al grupo`**, fee toggle, **`Editar grupo`**) cancels the pending confirm.
- [ ] Deleting a student removes only that student and updates the counters.
- [ ] Deleting a group removes the group and all its students and selects the next group, or shows the form when none is left.
- [ ] Orphan `q:*` fee keys remain after deletion (known quirk, recorded).
- [ ] Deletions survive a reload.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests, and no network requests other than the initial page load.

## Screenshots required
- Armed "¿Seguro?" state for a student
- Armed "¿Seguro?" state for a group
- List after the student deletion
- After the group deletion
- Final empty-groups state

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
