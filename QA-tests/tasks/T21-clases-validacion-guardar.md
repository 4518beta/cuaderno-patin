# T21-clases-validacion-guardar: Form validation - plan form (Guardar clase)

| Field | Value |
|---|---|
| Route | `/` (tab Clases) |
| Source | `/home/claude/cuaderno-patin/index.html` (`rClases`, `ACTIONS.savePlan`, `ui.cerr` rendered in `#cmsg`) |
| Flow | Form validation: required title, minutes coercion, message persistence |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 30 |

## Preconditions
- App running at `http://localhost:8080`
- Fresh browser profile / new context: localStorage is empty, no cookies.
- Anonymous user, no login, no network.
- No groups, no saved classes.

## Test data
- `profe = "QA Profe"`
- `emptyTitle = ""`
- `blankTitle = "   "` (3 spaces)
- `shortTitle = "x"` (1 character, the minimum that passes)
- `longTitle = 150 x "a"` (no max length is defined on the title input)
- `validTitle = "Validacion QA"`
- `date = "2026-11-05"`
- `emptyMinutes = ""` (block 1 minutes cleared)
- Only validation rule in the source: the title, after trimming, must not be empty. Error text: `Poné un título.` No other field (date, level, group, block names, minutes, notes) is validated on save.

## Steps

### TC-01: Setup and required-title error with the untouched form
1. Open a fresh browser profile and navigate to `http://localhost:8080`.
2. Fill `#pname` with `QA Profe` and click **`Empezar`**. Assert: `#subttl` reads `Profe QA Profe · Liga`.
3. Click the bottom nav button **`Clases`** (`#bnav [data-a=go][data-id=clases]`).
4. Assert: `[data-d=title]` is empty and `#cmsg` is empty.
5. Click **`Guardar clase`** without touching any field.
6. Assert: `#cmsg` (role `status`) reads `Poné un título.`
7. Assert: nothing was saved: `Clases guardadas` still shows `Todavía no guardaste ninguna clase.`, the main button label is still **`Guardar clase`** (not `Guardar cambios`), and `Armar otra` is not present.
8. Assert: the other fields keep their values (date = today, level `Iniciación`, 5 blocks, `Total 60 min`).
9. Screenshot: validation error state.

### TC-02: Form validation - `plan form`
For each case set `[data-d=title]` as listed (all other fields untouched), click **`Guardar clase`** and check the result. Run the rows in order.

| Case | Title value | Expected `#cmsg` | Saved rows under `Clases guardadas` | Main button label |
|---|---|---|---|---|
| Empty | `""` | `Poné un título.` | 0 | `Guardar clase` |
| Whitespace only | `"   "` | `Poné un título.` | 0 | `Guardar clase` |
| One character (boundary) | `"x"` | `Guardada.` | 1 (row title `x`) | `Guardar cambios` |

Notes for the runner:
1. For the first two rows, assert that the form was not reset: block names, minutes and the chip `Total 60 min` are unchanged.
2. After the third row (the plan is now saved and open), continue with TC-03 in the same session.

### TC-03: Title length, minutes coercion and message persistence
1. Click **`Armar otra`**. Assert: `[data-d=title]` is empty, the main button is **`Guardar clase`** again, `#cmsg` is empty.
2. Fill `[data-d=title]` with `longTitle` (150 x `a`).
3. Fill `[data-d=date]` with `2026-11-05`.
4. Fill `[data-b="0"][data-f="m"]` (block 1 minutes) with `""` (clear it).
5. Click **`Guardar clase`**.
6. Assert: `#cmsg` reads `Guardada.`
7. Assert: the chip reads `Total 50 min` (empty minutes are saved as 0: 0 + 20 + 15 + 10 + 5) and block 1 minutes input shows `0`.
8. Assert: `Clases guardadas` now has 2 rows (`x` and the 150-character title); the new row's muted line ends with `· 50 min`; the row shows the full 150-character title text.
9. Click **`Armar otra`**. Leave the title empty.
10. Click **`Guardar clase`**. Assert: `#cmsg` reads `Poné un título.` and the row count stays at 2.
11. Fill `[data-d=title]` with `validTitle` (`Validacion QA`) but do not save. Click **`Agregar bloque`**.
12. Assert (observed behavior: the message comes from `ui.cerr`, which is only cleared by Abrir, Armar otra or a save): `#cmsg` still reads `Poné un título.` even though the title is now filled; a 6th block was added and the chip reads `Total 70 min`.
13. Click **`Guardar clase`**.
14. Assert: `#cmsg` reads `Guardada.`, the row count is 3, and a row titled `Validacion QA` ends with `· 70 min`.
15. Screenshot: final state with 3 saved rows.

### TC-04: Negative and edge cases
- Save a plan after removing every block: click **`Armar otra`**, fill the title `Sin bloques QA`, click **`Quitar`** on each of the 5 blocks until none remain, assert `Total 0 min`, click **`Guardar clase`**. Assert `#cmsg` reads `Guardada.` and the new row ends with `· 0 min` (blocks are not validated).
- Save with the date cleared: click **`Armar otra`**, fill the title `Sin fecha QA`, clear `[data-d=date]`, click **`Guardar clase`**. Assert `#cmsg` reads `Guardada.` and the row `Sin fecha QA` shows no date text in its muted line (it reads only `· 60 min`).
- Title with markup: click **`Armar otra`**, fill the title `<b>QA</b> & "comillas"`, click **`Guardar clase`**. Assert the row shows the literal text `<b>QA</b> & "comillas"` (escaped, not rendered as bold) and there are no console errors.
- Reload (wait 1 second first): all saved rows remain; the error message and the draft do not (`#cmsg` empty, empty title).

## Assertions
- [ ] Empty or whitespace-only title gives exactly `Poné un título.` in `#cmsg` and saves nothing.
- [ ] A 1-character title saves (`Guardada.`).
- [ ] A failed save does not reset the other fields.
- [ ] Empty minutes are stored as 0 and the total recalculates after save.
- [ ] `#cmsg` keeps the last save message until Abrir, Armar otra or the next save (observed behavior).
- [ ] Blocks and date are not validated on save.
- [ ] Markup in the title is escaped.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (the app makes no network requests at all).

## Screenshots required
- Page initial load (Clases tab)
- `Poné un título.` validation error state
- Stale error message after `Agregar bloque`
- Final state with all saved rows

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
