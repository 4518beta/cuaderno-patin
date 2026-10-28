# T54-mas-aviso-familias: Más > Aviso a familias text and copy button

| Field | Value |
|---|---|
| Route | `/` (tab Más, sub-screen `aviso`) |
| Source | `/home/claude/cuaderno-patin/index.html` (rMas branch `aviso`, AVISO, ACTIONS.copyMsg, copyText) |
| Flow | Read the privacy notice for families and copy it |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 24 |

## Preconditions
- App running at `http://localhost:8080`
- Role: anonymous.
- Fresh browser profile: new browser context with empty localStorage, no cookies, no network access besides `localhost:8080`.
- Clipboard: grant `clipboard-read` and `clipboard-write` to `http://localhost:8080` when the runner allows it.
- No seed data. The welcome form is completed in TC-01 with `QA Profe`.

## Test data
- `profeName = "QA Profe"`
- `avisoText` (exact value of `#avisotxt`): `Hola, les cuento que para organizar las clases usamos un cuaderno digital. Guardamos solo el nombre de pila de cada alumna, su grupo, la asistencia, la cuota y lo que trabajamos en clase. No guardamos DNI, direcciones ni fotos. Los datos quedan en el celular de las profes y los compartimos entre nosotras por una carpeta privada de Google Drive, cuyos servidores están en el exterior. Si quieren ver, corregir o borrar los datos de su hija o hijo, escríbanme. Si están de acuerdo, respondan "Conforme". Gracias.`
- `editedAviso = avisoText + " QA-{runId}"` (replace `{runId}` with the current time in ms).
- Intro text: `Mandalo antes de cargar a las alumnas, y guardá las respuestas "Conforme". Es un modelo, no reemplaza una consulta legal.`

## Steps

### TC-01: Happy path - setup, read and copy the notice
1. Open a new browser context. Navigate to `http://localhost:8080/`.
2. Assert: `h2` "Bienvenida" is visible.
3. Fill `#pname` with `QA Profe`. Click **`Empezar`**.
4. Assert: `#subttl` reads "Profe QA Profe · Liga".
5. Click the bottom nav button **`Más`**, then click the tile **`Aviso a familias`**.
6. Assert: `h2` "Aviso a familias", the intro text from `Test data`, and a **`← Más`** button are visible.
7. Assert: `#avisotxt` is a textarea with `rows=10` whose value equals `avisoText` exactly (including the double quotes around Conforme).
8. Assert: a button **`Copiar`** (`[data-a=copyMsg][data-id=avisotxt]`) is visible and `#cm-avisotxt` is empty.
9. Take a screenshot of the screen.
10. Click **`Copiar`**.
11. Assert: `#cm-avisotxt` reads "Copiado".
12. Read the clipboard text. Assert: it equals `avisoText`.

### TC-02: Edited text is copied as typed
1. In `#avisotxt` move the cursor to the end (Ctrl+End) and type ` QA-{runId}` using the `editedAviso` suffix.
2. Assert: `#avisotxt` value equals `editedAviso`.
3. Click **`Copiar`**.
4. Assert: `#cm-avisotxt` reads "Copiado" and the clipboard equals `editedAviso`.
5. Click **`← Más`**, then click the tile **`Aviso a familias`**.
6. Assert: `#avisotxt` value equals `avisoText` again (edits are not saved) and `#cm-avisotxt` is empty.

### TC-03: Privacy content checks
1. Assert: the value of `#avisotxt` contains "No guardamos DNI, direcciones ni fotos." and "respondan \"Conforme\"".
2. Assert: the value does not contain any unresolved placeholder in braces (no `{` and no `}`).
3. Read `localStorage` key `cuaderno-liga-v2`. Assert: `D` equals `{}` (copying writes no data).

### TC-04: Negative and edge cases
- If the runner cannot grant clipboard permission: click **`Copiar`** and assert `#cm-avisotxt` reads "Copiado" or "Seleccioná el texto y copialo"; note which one appeared.
- Reload the page, open Más > Aviso a familias. Assert: the text is intact and the screen opens with no console error.

## Assertions
- [ ] `#avisotxt` holds the exact notice text in `Test data`.
- [ ] "Copiar" shows "Copiado" in `#cm-avisotxt` and puts the current textarea value in the clipboard.
- [ ] Edits are not persisted; `localStorage` `D` stays `{}`.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx) except where explicitly expected.

## Screenshots required
- Aviso a familias screen on first open
- After "Copiar" ("Copiado" visible)
- Final state after TC-04

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
