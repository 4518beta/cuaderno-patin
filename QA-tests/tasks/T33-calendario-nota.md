# T33-calendario-nota: Write, edit and clear the class note

| Field | Value |
|---|---|
| Route | `/` (bottom-nav tab **Calendario**, panel `#p-calendario`) |
| Source | `/home/claude/cuaderno-patin/index.html` (`dayPanel` textarea `#nota`, action `saveNota`) |
| Flow | Save a note for a group and day |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 50 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous visitor, no login, no network needed.
- Fresh browser profile: empty localStorage and cookies. Nothing seeded.
- Today comes from the browser clock; its long form is in `#dt`.
- The note form has no success toast. Success is observed through the textarea value after the panel re-renders, the `#save` status text, and persistence after reload.

## Test data
- `profeName = "QA Profe"`
- `groupName = "Grupo QA"`, level `Iniciación`, `groupHora = "18:00"`, `groupDays = Lun, Mar, Mié, Jue, Vie, Sáb, Dom` (all seven)
- `studentName = "Alumna QA"`
- `noteValid = "Faltó el parlante, repasar la entrada"`
- `noteEdited = "Repasar la entrada y el vals"`
- `notePastDay = "Nota del día 15"`
- `noteSpaces = "   hola profe   "` (expected stored text: `hola profe`)
- `noteBlank = "   "` followed by a newline and two more spaces (whitespace only)
- `noteMultiline = "Línea 1" + newline + "Línea 2"`
- `noteHtml = "<script>alert(1)</script> & \"comillas\""`
- `noteLong = 1005 × "a"` (expected stored length: 1000)
- `unsavedText = "texto sin guardar"`

## Steps

### TC-00: Setup, welcome, group and alumna
1. Open a fresh browser profile and navigate to `http://localhost:8080/`.
2. Fill `#pname` with `QA Profe`. Click **`Empezar`**. Assert: `#subttl` reads `Profe QA Profe · Liga`.
3. Click bottom-nav **`Alumnas`**. Fill `#gname` with `Grupo QA`, `#ghora` with `18:00`, tick all seven day checkboxes. Click **`Guardar grupo`**.
4. Fill `#newstu` with `Alumna QA`. Click **`Agregar`**. Assert: card title `Alumnas (1)` and row `Alumna QA`.
5. Click bottom-nav **`Calendario`**.

### TC-01: Happy path, save a note and keep it after reload
1. Assert: textarea `#nota` is empty, has placeholder `Ej: faltó el parlante, repasar la entrada`, and the label above it reads `Nota de la clase`. Today's grid mark is `clase`.
2. Fill `#nota` with `Faltó el parlante, repasar la entrada`.
3. Click **`Guardar nota`**.
4. Assert: `#nota` still contains exactly `Faltó el parlante, repasar la entrada` after the panel re-renders.
5. Assert: `#save` reads `Guardado en este celular` within 1 second. Today's grid mark is still `clase` (a note alone does not count as work). `Asistencia` chip is `0 de 1`.
6. Wait 1 second, reload the page, click **`Calendario`**.
7. Assert: `#nota` contains `Faltó el parlante, repasar la entrada`.

### TC-02: Edit an existing note
1. Replace the content of `#nota` with `Repasar la entrada y el vals`. Click **`Guardar nota`**.
2. Assert: `#nota` contains exactly `Repasar la entrada y el vals` (the old text is gone).
3. Reload, click **`Calendario`**. Assert: the same text is shown.

### TC-03: Note per day and per group
1. Click **`←`**, click the day button `15`. Assert: panel `h3` shows day 15 of the previous month and `#nota` is empty.
2. Fill `#nota` with `Nota del día 15`. Click **`Guardar nota`**. Assert: `#nota` contains `Nota del día 15`.
3. Click **`→`**, click today's button. Assert: `#nota` contains `Repasar la entrada y el vals`.
4. Click **`←`**, click button `15`. Assert: `#nota` contains `Nota del día 15`.
5. Click **`→`** to return to the current month.
6. Click bottom-nav **`Alumnas`**, **`+ Nuevo grupo`**, fill `#gname` with `Grupo QA 2`, click **`Guardar grupo`**. Click **`Calendario`**, click `Grupo QA 2`. Assert: `#nota` is empty for today. Click `Grupo QA` again. Assert: `#nota` contains `Repasar la entrada y el vals`.

### TC-04: Note validation and edge input
For each row: go to today, fill `#nota` with the input, click **`Guardar nota`**, read `#nota` after the re-render, then reload and read it again.

| Input | Value shown after save | Value after reload |
|---|---|---|
| `noteSpaces` | `hola profe` (outer spaces trimmed) | `hola profe` |
| `noteMultiline` | `Línea 1` + newline + `Línea 2` (line break kept) | same |
| `noteHtml` | the literal text `<script>alert(1)</script> & "comillas"`; no dialog opens, no script runs | same |
| `noteLong` (1005 × `a`) | exactly 1000 × `a` | 1000 × `a` |
| `noteBlank` (whitespace only) | empty (saving a blank note deletes the stored note) | empty |
| empty string after a saved note | empty | empty |

After the `noteBlank` row, assert the previous text is gone (the note was deleted, not kept). After the empty-string row, assert the same.

### TC-05: Unsaved text is discarded on re-render
1. Fill `#nota` with `Repasar la entrada y el vals` and click **`Guardar nota`**.
2. Replace `#nota` with `texto sin guardar` but do not click **`Guardar nota`**.
3. Click **`Todas presentes`**.
4. Assert: `#nota` shows `Repasar la entrada y el vals` again (unsaved text is replaced by the saved value).
5. Replace `#nota` with `texto sin guardar` again and click a different day button (any non-today day). Click today's button. Assert: `#nota` shows `Repasar la entrada y el vals`.

### TC-06: Negative cases
- Click **`Guardar nota`** with an empty `#nota` on a day that never had a note. Assert: no error text appears, the textarea stays empty, and the grid mark does not change.
- Save a note on day 15 of the previous month, then click **`Limpiar`** on that day. Assert: the note is not affected (clearing attendance does not remove notes).

## Assertions
- [ ] Textarea shows its placeholder when empty and its saved value after the panel re-renders.
- [ ] Note is trimmed, line breaks are kept, max 1000 characters stored, blank input deletes the note.
- [ ] HTML in a note is shown as text, never executed.
- [ ] Notes are kept per group and per day, and survive reload.
- [ ] Unsaved text is not persisted.
- [ ] `#save` returns to `Guardado en este celular` after each save.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx).

## Screenshots required
- Empty note with placeholder
- Note saved (textarea with text)
- Day 15 with its own note
- 1000-character note after save
- Final state after reload

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
