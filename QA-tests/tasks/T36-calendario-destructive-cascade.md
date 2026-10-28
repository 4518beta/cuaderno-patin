# T36-calendario-destructive-cascade: Destructive, Limpiar attendance and deleting an alumna or group that the calendar uses

| Field | Value |
|---|---|
| Route | `/` (bottom-nav tab **Calendario**, panel `#p-calendario`; delete buttons live in tab **Alumnas**) |
| Source | `/home/claude/cuaderno-patin/index.html` (`attNone`, `rFicha` button `delStu`, `rAlumnas` button `delGroup`, `confirmed`, `delBtn`, `rCalendario` empty state) |
| Flow | Clear attendance, then delete an alumna and a group and check the calendar afterwards |
| Requires auth | no |
| Required role | anonymous |
| Destructive | yes (deletes local data in the test profile only) |
| Estimated steps | 70 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous visitor, no login, no network needed.
- Fresh browser profile: empty localStorage and cookies. Nothing seeded. All deletions happen in this throwaway profile.
- Today comes from the browser clock; its long form is in `#dt`.
- Delete buttons use a two-click confirm: the first click turns the label into **`¿Seguro?`**, the second click deletes. Any other click (another button, a tab change) cancels the pending confirm.

## Test data
- `profeName = "QA Profe"`
- `groupName = "Grupo QA"`, level `Iniciación`, `groupHora = "18:00"`, `groupDays = Lun, Mar, Mié, Jue, Vie, Sáb, Dom` (all seven)
- `student1 = "Alumna QA"`, `student2 = "Alumna QB"`
- `noteValid = "Repasar la entrada"`

## Steps

### TC-00: Setup, welcome, group and alumnas
1. Open a fresh browser profile and navigate to `http://localhost:8080/`.
2. Fill `#pname` with `QA Profe`. Click **`Empezar`**. Assert: `#subttl` reads `Profe QA Profe · Liga`.
3. Click bottom-nav **`Alumnas`**. Fill `#gname` with `Grupo QA`, `#ghora` with `18:00`, tick all seven day checkboxes. Click **`Guardar grupo`**.
4. Fill `#newstu` with `Alumna QA`, click **`Agregar`**. Fill `#newstu` with `Alumna QB`, click **`Agregar`**. Assert: card title `Alumnas (2)`.
5. Click bottom-nav **`Calendario`**.

### TC-01: Limpiar clears attendance only, with no confirm
1. Click **`Todas presentes`**. Assert: chip `2 de 2`, today's mark `hecha`.
2. Click the quick item **`Técnica`**. Fill `#nota` with `Repasar la entrada` and click **`Guardar nota`**.
3. Click **`Limpiar`**.
4. Assert: no confirm label or dialog appears; both `Presente: ...` buttons are `aria-pressed="false"`; chip `0 de 2`.
5. Assert: `Técnica` still has class `on`, `#nota` still contains `Repasar la entrada`, and today's mark is still `hecha` (the log item keeps the day marked).
6. Click `Técnica` to turn it off. Assert: today's mark is `clase`.

### TC-02: Borrar alumna, cancel path
1. Click `Presente: Alumna QB`. Assert: chip `1 de 2`.
2. Click bottom-nav **`Alumnas`**. Click **`Ficha`** on the row `Alumna QB`.
3. Assert: heading `Alumna QB`, and a button **`Borrar alumna`** with the muted text `Si se va del grupo, borrala.`
4. Click **`Borrar alumna`** once. Assert: its label becomes **`¿Seguro?`** and it has class `danger`.
5. Click **`← Volver al grupo`** (cancel by leaving). Assert: the group view shows card title `Alumnas (2)` with both names.
6. Click **`Ficha`** on `Alumna QB` again. Assert: the button reads **`Borrar alumna`** again (not `¿Seguro?`), proving the pending confirm was reset.
7. Click bottom-nav **`Calendario`**. Assert: `Presente: Alumna QB` is `aria-pressed="true"`, `Coreo Alumna QB` button exists, chip `1 de 2`.

### TC-03: Borrar alumna, confirm path
1. Click bottom-nav **`Alumnas`**, **`Ficha`** on `Alumna QB`.
2. Click **`Borrar alumna`**, then click **`¿Seguro?`**.
3. Assert: the view returns to the group list with card title `Alumnas (1)`; only `Alumna QA` is listed.
4. Click bottom-nav **`Calendario`**.
5. Assert: `Asistencia` lists only `Presente: Alumna QA`; the button `Coreo Alumna QB` no longer exists; `Coreo Alumna QA` exists.
6. Assert: chip reads `0 de 1` and today's mark is `clase`, because the only attendance record belonged to the deleted alumna. Source note: `presentCount` counts stored attendance keys by group and date, not by existing alumnas, so the app may show `1 de 1` and mark `hecha`. If that happens, record it as a defect (stale attendance of a deleted alumna), do not change the expected value.
7. Reload, click **`Calendario`**. Assert: the same state as step 5 (the deletion persisted).

### TC-04: Borrar grupo, cancel path
1. Click `Presente: Alumna QA`. Assert: chip reads `1 de 1` (it reads `2 de 1` only if the stale-attendance defect from TC-03 step 6 occurred; record it again if so).
2. Click bottom-nav **`Alumnas`**. Click **`Borrar grupo`** once. Assert: label becomes **`¿Seguro?`** with class `danger`.
3. Click bottom-nav **`Calendario`**, then **`Alumnas`**.
4. Assert: the button reads **`Borrar grupo`** again; the group card `Grupo QA` and `Alumnas (1)` are intact.
5. Click **`Calendario`**. Assert: `Presente: Alumna QA` is still `aria-pressed="true"`.

### TC-05: Borrar grupo, confirm path and aftermath
1. Click bottom-nav **`Alumnas`**. Click **`Borrar grupo`**, then **`¿Seguro?`**.
2. Assert: the Alumnas tab shows the `Nuevo grupo` form (no groups left) and heading `Alumnas y grupos`.
3. Click bottom-nav **`Calendario`**. Assert: heading `Calendario` and the box `Primero creá un grupo en Alumnas.`; no group selector, no grid, no `Asistencia` card.
4. Click bottom-nav **`Hoy`**. Assert: the button **`Crear mi primer grupo`** is visible.
5. Reload and click **`Calendario`**. Assert: the same empty state (the deletion persisted).
6. Click **`Alumnas`**, create group again: `#gname` = `Grupo QA`, `#ghora` = `18:00`, all seven days, **`Guardar grupo`**; add `Alumna QA` with **`Agregar`**.
7. Click **`Calendario`**. Assert: the new `Grupo QA` shows chip `0 de 1`, `Presente: Alumna QA` is `aria-pressed="false"`, no quick item has class `on`, `#nota` is empty, and today's mark is `clase` (data of the deleted group is not shown for the new group).

### TC-06: Negative cases
- With no group, open **`Calendario`** and press the browser Back and Forward buttons. Assert: no error is shown and the empty state remains.
- Click **`Limpiar`** twice in a row on a day with no attendance. Assert: no error and no change.

## Assertions
- [ ] `Limpiar` clears attendance immediately without a confirm and leaves log items and notes.
- [ ] `Borrar alumna` and `Borrar grupo` need two clicks; any other click cancels the first.
- [ ] After deleting an alumna, she disappears from the attendance list and from `Coreografías trabajadas`; the chip count and the day mark do not count her stale attendance.
- [ ] After deleting the last group, Calendario shows `Primero creá un grupo en Alumnas.` and Hoy shows `Crear mi primer grupo`.
- [ ] Deletions persist after reload; a recreated group starts empty.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx).

## Screenshots required
- Calendario after `Limpiar`
- Ficha with `¿Seguro?` showing
- Calendario after the alumna was deleted
- Alumnas with group `¿Seguro?` showing
- Calendario empty state after the group was deleted
- Calendario with the recreated group (all empty)

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
