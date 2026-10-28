# T61-importar-rejected-files: Rejected import files show an error and change nothing

| Field | Value |
|---|---|
| Route | `/#importar` (Más > Sincronizar, file input `#impin`) |
| Source | `/home/claude/cuaderno-patin/index.html` (readImport, parseImport, cleanData) |
| Flow | Upload a wrong-app file, a fmt 3 file, a non-JSON file and an empty file; each is rejected |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 48 |

## Preconditions
- App running at `http://localhost:8080`
- Role: anonymous.
- Fresh browser profile: new browser context with empty localStorage, no cookies, no network access besides `localhost:8080`.
- Temp folder for this task: `/home/claude/cuaderno-patin/QA-tests/tmp/T61/` (create it before the first upload; the runner writes the files from the `Test data` below).
- Files are uploaded by clicking the label **`Elegir el archivo`** while waiting for the `filechooser` event, then calling `setFiles` (the input is `#impin`).

## Test data
- `profeName = "QA Profe"` (welcome form)
- Files in `/home/claude/cuaderno-patin/QA-tests/tmp/T61/`:

| File | Content (exact) | Expected `#smsg` |
|---|---|---|
| `wrongapp.json` | `{"app":"otra-app","fmt":2,"profe":"Otra Profe","at":1700000000000,"data":{}}` | Ese archivo no es una copia del cuaderno de la liga. |
| `fmt3.json` | `{"app":"cuaderno-liga","fmt":3,"profe":"Otra Profe","at":1700000000000,"data":{"g:gq1":{"t":1700000000001,"v":{"id":"gq1","name":"Grupo Futuro"}}}}` | Ese archivo es de una versión más nueva del cuaderno. Actualizá la página y probá de nuevo. |
| `notjson.json` | the single line `esto no es json` | Ese archivo no es una copia del cuaderno. |
| `empty.json` | zero bytes (empty file) | Ese archivo no es una copia del cuaderno. |

- Control file `/home/claude/cuaderno-patin/QA-tests/tmp/T61/ok.json` (valid, used to check recovery after an error):

```json
{"app":"cuaderno-liga","fmt":2,"profe":"Otra Profe","at":1700000000000,"data":{"g:gq1":{"t":1700000000001,"v":{"id":"gq1","name":"Grupo QA","level":"Iniciación","hora":"18:00","dias":[1,3],"profe":"Otra Profe"}}}}
```

## Steps

### TC-01: Setup and reject the wrong-app file
1. Open a new browser context. Navigate to `http://localhost:8080/`.
2. Assert: `h2` "Bienvenida" is visible.
3. Fill `#pname` with `QA Profe`. Click **`Empezar`**.
4. Assert: `#subttl` reads "Profe QA Profe · Liga".
5. Create the folder `/home/claude/cuaderno-patin/QA-tests/tmp/T61/` and write the five files from `Test data`.
6. Click the bottom nav button **`Más`**, then the tile **`Sincronizar`**. Assert: `h2` "Sincronizar" and `#impin` exist.
7. Click **`Elegir el archivo`** and select `wrongapp.json`.
8. Assert: `#smsg` reads "Ese archivo no es una copia del cuaderno de la liga."
9. Assert: no card "Archivo de ..." exists, and no button **`Combinar`** or **`Cancelar`** exists.
10. Read `localStorage` key `cuaderno-liga-v2`. Assert: `D` equals `{}` and `merged` equals `{}`.
11. Take a screenshot of the error state.

### TC-02: Reject fmt 3 (newer version)
1. Click **`Elegir el archivo`** and select `fmt3.json`.
2. Assert: `#smsg` reads "Ese archivo es de una versión más nueva del cuaderno. Actualizá la página y probá de nuevo."
3. Assert: no summary card, no **`Combinar`** button.
4. Assert: `localStorage` `D` equals `{}`. Open Alumnas and assert the group form `h3` "Nuevo grupo" is shown (no group "Grupo Futuro" exists).
5. Return to Más > Sincronizar.

### TC-03: Reject non-JSON text
1. Click **`Elegir el archivo`** and select `notjson.json`.
2. Assert: `#smsg` reads "Ese archivo no es una copia del cuaderno."
3. Assert: no summary card, no **`Combinar`** button, and `localStorage` `D` equals `{}`.

### TC-04: Reject an empty file
1. Click **`Elegir el archivo`** and select `empty.json`.
2. Assert: `#smsg` reads "Ese archivo no es una copia del cuaderno."
3. Assert: no summary card, no **`Combinar`** button, and `localStorage` `D` equals `{}`.

### TC-05: Recovery and error replacing a summary
1. Click **`Elegir el archivo`** and select `ok.json`.
2. Assert: the summary card "Archivo de Otra Profe" shows "1 cambios nuevos para vos. No hay datos pisados." and `#smsg` is empty (the previous error is cleared).
3. Click **`Elegir el archivo`** and select `wrongapp.json` while the summary is on screen.
4. Assert: the summary card disappears, **`Combinar`** no longer exists, and `#smsg` reads "Ese archivo no es una copia del cuaderno de la liga."
5. Assert: `localStorage` `D` is still `{}`.
6. Take a screenshot.
7. Select `ok.json` again, click **`Cancelar`**. Assert: the summary card is gone and `D` is `{}`.

### TC-06: Negative and edge cases
- Select `notjson.json` twice in a row. Assert: the same message shows both times (the file input is re-created, so the same file triggers the check again).
- Reload the page, open Más > Sincronizar. Assert: `#smsg` is empty (errors are not persisted).
- After all uploads assert `localStorage` `D` equals `{}` and `lastShared` equals 0.

## Assertions
- [ ] Wrong app, fmt 3, non-JSON and empty files each show their exact error message in `#smsg`.
- [ ] No summary card and no Combinar button appear after a rejected file.
- [ ] `localStorage` `D` and `merged` stay empty through every rejected upload.
- [ ] A valid file after an error clears the error; an error after a summary removes the summary.
- [ ] No console errors in DevTools at any step (a handled parse failure must not log an uncaught error).
- [ ] No failed network requests (no 4xx/5xx) except where explicitly expected.

## Screenshots required
- Error for the wrong-app file
- Error for fmt 3
- Error for the non-JSON file
- Error for the empty file
- Final state after TC-06

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
