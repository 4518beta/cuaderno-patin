# T24-clases-destructive-borrar: Destructive - Borrar clase guardada (confirmación en dos toques)

| Field | Value |
|---|---|
| Route | `/` (tab Clases) |
| Source | `/home/claude/cuaderno-patin/index.html` (`rClases`, `delBtn`, `confirmed`, `ACTIONS.delPlan`, global click handler) |
| Flow | Destructive: delete a saved class with the two-click `Borrar` / `¿Seguro?` confirmation (cancel and proceed paths) |
| Requires auth | no |
| Required role | anonymous |
| Destructive | yes |
| Estimated steps | 38 |

## Preconditions
- App running at `http://localhost:8080`
- Fresh browser profile / new context: localStorage is empty, no cookies. The test only deletes classes it created itself.
- Anonymous user, no login, no network.
- No groups, no saved classes at the start.

## Test data
- `profe = "QA Profe"`
- Plan A: `title = "Borrar A QA"`, `date = "2026-11-05"`
- Plan B: `title = "Borrar B QA"`, `date = "2026-11-06"`
- Both plans use the default Iniciación blocks (60 min).
- The delete button label cycle is `Borrar` (class `ghost`) then `¿Seguro?` (class `danger`) on the second click.

## Steps

### TC-01: Setup - save two classes
1. Open a fresh browser profile and navigate to `http://localhost:8080`.
2. Fill `#pname` with `QA Profe` and click **`Empezar`**. Assert: `#subttl` reads `Profe QA Profe · Liga`.
3. Click the bottom nav button **`Clases`** (`#bnav [data-a=go][data-id=clases]`).
4. Fill `[data-d=title]` with `Borrar A QA` and `[data-d=date]` with `2026-11-05`. Click **`Guardar clase`**. Assert: `#cmsg` reads `Guardada.`
5. Click **`Armar otra`**.
6. Fill `[data-d=title]` with `Borrar B QA` and `[data-d=date]` with `2026-11-06`. Click **`Guardar clase`**. Assert: `#cmsg` reads `Guardada.`
7. Assert: `Clases guardadas` has 2 rows in this order: `Borrar B QA` (6 nov), `Borrar A QA` (5 nov). Each row has **`Abrir`** and a button labelled **`Borrar`**. Plan B is the open draft (main button **`Guardar cambios`**, title `Borrar B QA`).
8. Screenshot: both rows before any delete.

### TC-02: Destructive - Borrar clase (cancel paths)
1. Click **`Borrar`** on the row `Borrar A QA`.
2. Assert: that button now reads **`¿Seguro?`** and has the danger style; the row `Borrar A QA` is still present; the button on row `Borrar B QA` still reads **`Borrar`**; 2 rows in total.
3. Screenshot: confirmation state.
4. Click **`Agregar bloque`** (any action that is not a delete action cancels the pending confirmation).
5. Assert: the button on row `Borrar A QA` reads **`Borrar`** again; 2 rows in total; the open draft `Borrar B QA` now has 6 blocks (the form was not saved, so rows are unchanged).
6. Click **`Quitar`** on the 6th block to return the draft to 5 blocks. Assert: `Total 60 min`.
7. Click **`Borrar`** on the row `Borrar A QA` (it reads **`¿Seguro?`**), then click **`Borrar`** on the row `Borrar B QA`.
8. Assert: the row `Borrar B QA` now reads **`¿Seguro?`**, the row `Borrar A QA` is back to **`Borrar`** (only one pending confirmation at a time), and both rows are still present.
9. Click **`Agregar bloque`** and then **`Quitar`** on the new 6th block to cancel the confirmation again. Assert: both buttons read **`Borrar`**, 2 rows.
10. Reload the page (wait 1 second first), click **`Clases`**. Assert: both rows are still present (cancel paths removed nothing).

### TC-03: Destructive - Borrar clase (confirm proceed, a class that is not open)
1. Click **`Abrir`** on the row `Borrar B QA`. Assert: `[data-d=title]` = `Borrar B QA`, main button **`Guardar cambios`**.
2. Click **`Borrar`** on the row `Borrar A QA`. Assert: it reads **`¿Seguro?`**.
3. Click **`¿Seguro?`** on the row `Borrar A QA`.
4. Assert: the row `Borrar A QA` is gone; exactly 1 row remains (`Borrar B QA`) and its button reads **`Borrar`**.
5. Assert: the open draft is untouched: `[data-d=title]` = `Borrar B QA`, main button **`Guardar cambios`**, **`Armar otra`** visible.

### TC-04: Destructive - Borrar clase (confirm proceed, the class that is open)
1. Click **`Borrar`** on the row `Borrar B QA`, then click **`¿Seguro?`** on the same row.
2. Assert: `Clases guardadas` shows `Todavía no guardaste ninguna clase.` and no rows.
3. Assert: the form was reset to a fresh draft: `[data-d=title]` is empty, `[data-d=date]` is today's date, the 5 Iniciación blocks are shown (`Total 60 min`), the main button is **`Guardar clase`** and **`Armar otra`** is not present.
4. Wait 1 second and reload the page. Click **`Clases`**.
5. Assert: `Clases guardadas` still shows `Todavía no guardaste ninguna clase.` (the deletions persisted).
6. Screenshot: final state with the empty list.

### TC-05: Negative and edge cases
- Double-click speed test: save a class `Doble QA`, click **`Borrar`** and **`¿Seguro?`** in immediate succession on the same row. Assert: exactly that one class is deleted and no console errors appear.
- Delete the first of three saved classes (`Uno QA` 2026-11-01, `Dos QA` 2026-11-02, `Tres QA` 2026-11-03): only `Uno QA` disappears and the other two stay in order (`Tres QA`, `Dos QA`).
- Observed behavior: click **`Borrar`** on a row (label `¿Seguro?`), then click **`Quitar`** on any block. The `¿Seguro?` label stays pending, because the global click handler only cancels the confirmation for actions whose name does not start with `del` (`delBlock` does). Record the result; if it changes, report it as a behavior change, not a failure of the cancel paths above.
- Save a class, delete it, then save a new class with the same title `Repetida QA`: the list shows exactly 1 row (the deleted class does not come back).

## Assertions
- [ ] First click on `Borrar` changes the label to `¿Seguro?` and deletes nothing.
- [ ] Clicking any non-delete action cancels the pending confirmation (label returns to `Borrar`).
- [ ] Only one row can be in the `¿Seguro?` state at a time.
- [ ] Second click on `¿Seguro?` removes exactly that row.
- [ ] Deleting a class that is not open leaves the form untouched; deleting the open class resets the form to a fresh draft with `Guardar clase`.
- [ ] After the last delete the list shows `Todavía no guardaste ninguna clase.`
- [ ] Deletions persist after reload.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (the app makes no network requests at all).

## Screenshots required
- Page initial load
- Both rows before any delete
- Confirmation state (`¿Seguro?`)
- Final state after the last delete (empty list, fresh form)

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
