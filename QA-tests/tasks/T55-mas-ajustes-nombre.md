# T55-mas-ajustes-nombre: Más > Ajustes change the profe name

| Field | Value |
|---|---|
| Route | `/` (tab Más, sub-screen `ajustes`) |
| Source | `/home/claude/cuaderno-patin/index.html` (rAjustes, ACTIONS.saveProfe, renderAll) |
| Flow | Change the saved profe name with "Guardar" and see it everywhere |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 52 |

## Preconditions
- App running at `http://localhost:8080`
- Role: anonymous.
- Fresh browser profile: new browser context with empty localStorage, no cookies, no network access besides `localhost:8080`.
- No seed data. The welcome form is completed in TC-01 with `QA Profe`.
- The button **`Borrar todo`** in this screen is not clicked in this task (see T56).

## Test data
- `profeName = "QA Profe"` (welcome form)
- `newName = "QA Profe Dos"`
- `paddedName = "  Lola  "` (expected saved value `Lola`)
- `emptyName = ""`
- `blankName = "   "` (3 spaces)
- `longName = 45 x "A"` (45 uppercase A characters); expected stored value is the first 40 characters
- `htmlName = "<i>Lu</i> & \"Ro\""`
- Messages: empty name error "Escribí tu nombre."; success "Guardado".

## Steps

### TC-01: Happy path - rename the profe and see it applied
1. Open a new browser context. Navigate to `http://localhost:8080/`.
2. Assert: `h2` "Bienvenida" is visible.
3. Fill `#pname` with `QA Profe`. Click **`Empezar`**.
4. Assert: `#subttl` reads "Profe QA Profe · Liga".
5. Click the bottom nav button **`Más`**, then click the tile **`Ajustes`**.
6. Assert: `h2` "Ajustes" and a **`← Más`** button are visible; the label "Tu nombre (lo ve la otra profe al sincronizar)" is shown; `#pname2` has value `QA Profe` and `maxlength="40"`; a button **`Guardar`** is visible; `#perr` is empty.
7. Assert: a section `h3` "Borrar todo en este celular" is visible with a button **`Borrar todo`**.
8. Take a screenshot of Ajustes.
9. Replace the value of `#pname2` with `newName`.
10. Click **`Guardar`** (`[data-a=saveProfe]`).
11. Assert: `#perr` reads "Guardado".
12. Assert: `#subttl` reads "Profe QA Profe Dos · Liga" and `#pname2` value is `QA Profe Dos`.
13. Click the bottom nav button **`Hoy`**. Assert: `h2` reads "Buen día, QA Profe Dos".
14. Reload the page. Assert: `#subttl` reads "Profe QA Profe Dos · Liga" and the welcome form is not shown.
15. Read `localStorage` key `cuaderno-liga-v2`. Assert: `profe = "QA Profe Dos"` and `D` equals `{}`.

### TC-02: Form validation - profe name in Ajustes
Open Más > Ajustes. For each case, set `#pname2`, click **`Guardar`**, and check:

| Case | `#pname2` value | Expected `#perr` | Expected `#subttl` after |
|---|---|---|---|
| Empty | `emptyName` | "Escribí tu nombre." | "Profe QA Profe Dos · Liga" (unchanged) |
| Only spaces | `blankName` | "Escribí tu nombre." | "Profe QA Profe Dos · Liga" (unchanged) |
| Surrounding spaces | `paddedName` | "Guardado" | "Profe Lola · Liga" |

1. After the "Empty" and "Only spaces" cases, read `localStorage` `profe`. Assert: it is still `QA Profe Dos`.
2. After the "Surrounding spaces" case, assert `#pname2` value is `Lola` (trimmed) and `localStorage` `profe` is `Lola`.
3. Take a screenshot of the error state "Escribí tu nombre."

### TC-03: Max length and special characters
1. Click into `#pname2`, select all, and type `longName` with the keyboard (one key press per character; do not set the value programmatically).
2. Assert: `#pname2` value has exactly 40 characters (40 x "A").
3. Click **`Guardar`**. Assert: `#perr` reads "Guardado" and `#subttl` reads "Profe " + 40 x "A" + " · Liga".
4. Select all in `#pname2`, type `htmlName`, click **`Guardar`**.
5. Assert: `#subttl` text is `Profe <i>Lu</i> & "Ro" · Liga` shown literally (no italic element is created in the header).
6. Click the bottom nav button **`Hoy`**. Assert: `h2` text is `Buen día, <i>Lu</i> & "Ro"` literally and `h2 i` count is 0.
7. Click **`Más`**, **`Ajustes`**. Assert: `#pname2` value is `<i>Lu</i> & "Ro"` (attribute escaped correctly, input not broken).

### TC-04: Unsaved edits are discarded
1. In Ajustes, type `Sin guardar` into `#pname2` without clicking **`Guardar`**.
2. Click **`← Más`**, then click the tile **`Ajustes`**.
3. Assert: `#pname2` value is `<i>Lu</i> & "Ro"` (the saved name) and `#subttl` is unchanged.
4. Restore the name: set `#pname2` to `QA Profe`, click **`Guardar`**. Assert: `#perr` reads "Guardado" and `#subttl` reads "Profe QA Profe · Liga".

### TC-05: Negative and edge cases
- Press Enter inside `#pname2` after typing `Enter Test`. Assert: current behavior is documented (the form has no submit handler, so the name stays `QA Profe` until **`Guardar`** is clicked); `#subttl` still reads "Profe QA Profe · Liga".
- Click **`Guardar`** twice in a row with the same value. Assert: `#perr` reads "Guardado" and no duplicated rows or errors appear.

## Assertions
- [ ] `#pname2` is prefilled with the saved name and limited to 40 characters.
- [ ] "Guardar" saves the trimmed name, shows "Guardado", updates `#subttl`, the Hoy heading and `localStorage` `profe`.
- [ ] Empty or blank names show "Escribí tu nombre." and change nothing.
- [ ] HTML characters in the name are shown literally and never create elements.
- [ ] Unsaved edits are discarded when leaving the screen.
- [ ] `localStorage` `D` stays `{}`.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx) except where explicitly expected.

## Screenshots required
- Ajustes on first open
- After a successful save ("Guardado" visible)
- Validation error state ("Escribí tu nombre.")
- Hoy with the special-character name
- Final state after TC-04

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
