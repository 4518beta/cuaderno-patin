# T23-clases-abrir-editar: Abrir una clase guardada, editarla y armar otra

| Field | Value |
|---|---|
| Route | `/` (tab Clases) |
| Source | `/home/claude/cuaderno-patin/index.html` (`rClases`, `ACTIONS.openPlan`, `savePlan`, `newPlan`) |
| Flow | Edit an existing saved class, save changes without duplicating, start a second class, check ordering and persistence |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 36 |

## Preconditions
- App running at `http://localhost:8080`
- Fresh browser profile / new context: localStorage is empty, no cookies.
- Anonymous user, no login, no network.
- No groups, no saved classes.

## Test data
- `profe = "QA Profe"`
- Plan A: `title = "Clase base QA"`, `date = "2026-11-05"`, level `Iniciación`, default Iniciación blocks (10, 20, 15, 10, 5 = 60 min)
- Plan A edited: `title = "Clase base QA editada"`, block 1 minutes `30` (total 80 min), block 1 notes `"Notas editadas QA"`
- Unsaved edit: `title = "Descartado QA"`
- Plan B: `title = "Clase posterior QA"`, `date = "2026-12-10"`, level `Iniciación`, default blocks (60 min)

## Steps

### TC-01: Happy path - save plan A and reopen it with Abrir
1. Open a fresh browser profile and navigate to `http://localhost:8080`.
2. Fill `#pname` with `QA Profe` and click **`Empezar`**. Assert: `#subttl` reads `Profe QA Profe · Liga`.
3. Click the bottom nav button **`Clases`** (`#bnav [data-a=go][data-id=clases]`).
4. Fill `[data-d=title]` with `Clase base QA` and `[data-d=date]` with `2026-11-05`.
5. Click **`Guardar clase`**.
6. Assert: `#cmsg` reads `Guardada.`, the main button is **`Guardar cambios`**, one saved row `Clase base QA` with `5 nov` and `· 60 min`.
7. Click **`Armar otra`**.
8. Assert: `[data-d=title]` is empty, `[data-d=date]` is today's date, the 5 Iniciación blocks are shown (`Total 60 min`), the main button is **`Guardar clase`**, **`Armar otra`** is not present and `#cmsg` is empty. The saved row `Clase base QA` is still there.
9. Click **`Abrir`** on the row `Clase base QA`.
10. Assert: `[data-d=title]` = `Clase base QA`, `[data-d=date]` = `2026-11-05`, `[data-d=level]` = `Iniciación`, 5 blocks with the same names and minutes, chip `Total 60 min`, main button **`Guardar cambios`**, button **`Armar otra`** visible, `#cmsg` empty.
11. Screenshot: plan A open for editing.

### TC-02: Edit and save changes without duplicating
1. With plan A open, fill `[data-d=title]` with `Clase base QA editada`.
2. Fill `[data-b="0"][data-f="m"]` with `30` and `[data-b="0"][data-f="t"]` with `Notas editadas QA`.
3. Assert: the saved row still shows the old title `Clase base QA` and `· 60 min` (nothing is saved until the button is clicked).
4. Click **`Guardar cambios`**.
5. Assert: `#cmsg` reads `Guardada.`; chip reads `Total 80 min`.
6. Assert: `Clases guardadas` still has exactly one row, now titled `Clase base QA editada` with `5 nov` and `· 80 min` (updated in place, not duplicated).
7. Click **`Armar otra`**, then click **`Abrir`** on the row `Clase base QA editada`.
8. Assert: block 1 minutes `30` and notes `Notas editadas QA` were persisted.
9. Screenshot: final state of the edit.

### TC-03: Unsaved edits are discarded and the list is sorted by date
1. With plan A open, fill `[data-d=title]` with `Descartado QA` and do not save.
2. Click **`Armar otra`**.
3. Assert: the saved row is still titled `Clase base QA editada`; no row `Descartado QA` exists.
4. Fill `[data-d=title]` with `Clase posterior QA` and `[data-d=date]` with `2026-12-10`.
5. Click **`Guardar clase`**.
6. Assert: `#cmsg` reads `Guardada.`; `Clases guardadas` has 2 rows.
7. Assert: row order: first `Clase posterior QA` (muted line contains `10 dic`, ends with `· 60 min`), second `Clase base QA editada` (the list is sorted by date, latest first).
8. Click **`Abrir`** on the second row (`Clase base QA editada`).
9. Assert: title, date `2026-11-05` and `Total 80 min` match plan A; the main button is **`Guardar cambios`**.
10. Click **`Abrir`** on the first row (`Clase posterior QA`).
11. Assert: `[data-d=title]` = `Clase posterior QA`, `[data-d=date]` = `2026-12-10`, `Total 60 min`; both rows still present.

### TC-04: Persistence
1. Wait 1 second (storage writes are debounced 250 ms).
2. Reload the page. Click the bottom nav button **`Clases`**.
3. Assert: both rows are present in the same order (`Clase posterior QA`, then `Clase base QA editada`) with `· 60 min` and `· 80 min`.
4. Assert: the form is a fresh draft (`[data-d=title]` empty, **`Guardar clase`**).
5. Click **`Abrir`** on `Clase base QA editada`. Assert: block 1 minutes `30`, notes `Notas editadas QA`.

### TC-05: Negative and edge cases
- Open plan A, clear `[data-d=title]`, click **`Guardar cambios`**. Assert: `#cmsg` reads `Poné un título.`, the saved row for plan A still shows its old title (the stored plan is unchanged), and the main button remains **`Guardar cambios`**.
- Open plan A, change the date to `2027-01-15`, click **`Guardar cambios`**. Assert: still 2 rows and the order changes so that plan A (`15 ene`) is first.
- Open plan A and click **`Abrir`** on plan A again: the form shows the stored values (any unsaved typing is replaced) and `#cmsg` is empty.

## Assertions
- [ ] `Abrir` loads title, date, level, every block (name, minutes, notes) and the total.
- [ ] `Guardar cambios` updates the existing row; the row count does not change.
- [ ] Unsaved edits never reach the saved list.
- [ ] `Armar otra` gives a clean draft (empty title, today's date, Iniciación blocks) and the label `Guardar clase`.
- [ ] Saved rows are ordered by date, latest first.
- [ ] Saved classes persist after reload; the open draft does not.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (the app makes no network requests at all).

## Screenshots required
- Page initial load
- Plan A open (`Guardar cambios` and `Armar otra` visible)
- Final state after the edit (one updated row)
- List with two rows in date order
- Validation error on `Guardar cambios` with an empty title

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
