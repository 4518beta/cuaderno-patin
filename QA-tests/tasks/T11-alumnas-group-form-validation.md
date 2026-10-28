# T11-alumnas-group-form-validation: Form validation for the group form

| Field | Value |
|---|---|
| Route | `/` (tab Alumnas, group form `groupForm`) |
| Source | `index.html` (groupForm, ACTIONS.saveGroup, ACTIONS.cancelGroup, `val()`, `esc()`) |
| Flow | Form validation: groupForm |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 40 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous user, no login. No network is needed or used.
- Fresh browser profile: empty localStorage and no cookies.
- No seed data. Zero groups at the start (the group form is shown directly on Alumnas).

## Test data
- `profeName = "QA Profe"`
- `emptyName = ""`
- `blankName = "   "` (3 spaces)
- `validName = "Error Recovery QA"`
- `longName = 61 × "a"` (typed in full, 61 characters)
- `expectedLongStored = 60 × "a"`
- `htmlName = "Grupo <b>QA</b> & \"Co\""`
- Error text for name: `Poné un nombre.` (element `#gerr`, role alert)

## Steps

### TC-00: Setup (fresh profile and welcome form)
1. Open a new browser context with empty storage. Navigate to `http://localhost:8080`.
2. Assert: welcome gate visible with `#pname` and button **`Empezar`**.
3. Fill `#pname` with `QA Profe`. Click **`Empezar`**. Assert: `#subttl` reads "Profe QA Profe · Liga".
4. Click the **`Alumnas`** nav item (`#bnav [data-a=go][data-id=alumnas]`).
5. Assert: heading "Alumnas y grupos" and form title "Nuevo grupo" are visible, `#gerr` is empty.

### TC-01: Empty name is rejected
1. With `#gname` empty (other fields untouched), click **`Guardar grupo`**.
2. Assert: `#gerr` text is exactly "Poné un nombre.".
3. Assert: the form is still shown (title "Nuevo grupo"), no tab strip, no group card.
4. Evaluate `JSON.parse(localStorage.getItem("cuaderno-liga-v2") || "null")`. Assert: there is no key starting with `g:` in `D` (either `D` is empty or storage is `null`).
5. Screenshot: validation error state.

### TC-02: Whitespace-only name is rejected
1. Type `   ` (3 spaces) in `#gname`. Select level `Avanzado`, fill `#ghora` with `10:00`, check `Lun`.
2. Click **`Guardar grupo`**.
3. Assert: `#gerr` text is exactly "Poné un nombre.", the form stays open, and nothing is written (no `g:` key in storage).
4. Assert: the level `Avanzado`, time `10:00` and the `Lun` checkbox are still set in the form (the error path does not re-render the form).

### TC-03: Cancelar with zero groups keeps the form
1. Click **`Cancelar`**.
2. Assert: the group form "Nuevo grupo" is still shown (there is no group to return to). `#gname` is empty and no tab strip appears.
3. Assert: no `g:` key in storage.

### TC-04: Recover after an error
1. Click **`Guardar grupo`** with `#gname` empty. Assert: `#gerr` shows "Poné un nombre.".
2. Fill `#gname` with `Error Recovery QA`. Click **`Guardar grupo`**.
3. Assert: the form closes, tab "Error Recovery QA" is highlighted, the card shows chip "Iniciación", "Sin días cargados" and "Profe: QA Profe".
4. Assert: no error text is visible anywhere on the panel.

### TC-05: Name max length (60)
1. Click **`+ Nuevo grupo`**.
2. Click `#gname` and type 61 × "a". Assert: the field holds exactly 60 characters (`maxlength` 60 truncates the 61st).
3. Click **`Guardar grupo`**.
4. Assert: a new tab and the card h3 show exactly 60 × "a". The text of the tab button has length 60 (CSS may truncate the display, check the DOM text).
5. Evaluate storage. Assert: the new `g:` record has `name` of length 60.

### TC-06: HTML in the name is escaped
1. Click **`+ Nuevo grupo`**. Fill `#gname` with `Grupo <b>QA</b> & "Co"`. Click **`Guardar grupo`**.
2. Assert: the tab button and card h3 show the literal text `Grupo <b>QA</b> & "Co"` (angle brackets visible, no bold element rendered inside the h3 or the tab).
3. Assert: no console error and no dialog appeared.
4. Screenshot: escaped name.

### TC-07: Cancelar with existing groups discards the form
1. Note the number of tabs in the strip (expected 3: "Error Recovery QA", the 60-character name, the HTML name).
2. Click **`+ Nuevo grupo`**. Type `Descartar` in `#gname`. Click **`Cancelar`**.
3. Assert: the group view returns, the number of tabs is unchanged, no tab "Descartar".

### TC-08: Form validation matrix
For each field, the observed behavior:

| Field | Empty value error | Pattern violation | Max-length overflow |
|---|---|---|---|
| `#gname` | "Poné un nombre." (also for whitespace only) | n/a | truncated to 60 by `maxlength`, saved as 60 characters |
| `#glevel` | n/a (always has a value, default Iniciación) | n/a | n/a |
| `#ghora` | none, optional (empty allowed, verified in T10 TC-02) | native time input only accepts HH:MM | n/a |
| `input.gday` (7) | none, optional (no day gives "Sin días cargados") | n/a | n/a |

## Assertions
- [ ] Empty name and whitespace-only name both show "Poné un nombre." in `#gerr` and write nothing.
- [ ] Cancelar with zero groups re-shows the form; with groups it returns to the group view without saving.
- [ ] After an error, a valid name saves normally and no error remains.
- [ ] Names longer than 60 characters are cut to 60.
- [ ] HTML in the name is rendered as literal text.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests, and no network requests other than the initial page load.

## Screenshots required
- Empty-name error state
- Whitespace-name error state
- Form after Cancelar with zero groups
- Group saved after recovery
- 60-character name tab
- Escaped HTML name

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
