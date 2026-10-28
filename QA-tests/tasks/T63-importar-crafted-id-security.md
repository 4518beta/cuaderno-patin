# T63-importar-crafted-id-security: Crafted ids and javascript: urls in an import file are dropped and never execute

| Field | Value |
|---|---|
| Route | `/#importar` (Más > Sincronizar, file input `#impin`) |
| Source | `/home/claude/cuaderno-patin/index.html` (cleanData, cleanV, parseImport, readImport, ACTIONS.applyMerge; render of `data-id` in rHoy, rAlumnas, gOpts) |
| Flow | Upload a file with a group id and a student id that carry a double quote and an `onfocus` attribute, plus a `javascript:` url field; confirm the entries are dropped and no code runs |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 56 |

## Preconditions
- App running at `http://localhost:8080`
- Role: anonymous.
- Fresh browser profile: new browser context with empty localStorage, no cookies, no network access besides `localhost:8080`.
- Temp folder for this task: `/home/claude/cuaderno-patin/QA-tests/tmp/T63/` (create it before the first upload; the runner writes the file from the `Test data` below).
- Files are uploaded by clicking the label **`Elegir el archivo`** while waiting for the `filechooser` event, then calling `setFiles` (the input is `#impin`).
- Register a dialog listener before the first navigation: any `alert`, `confirm` or `prompt` dialog fails the task. Register an init script that sets nothing on `window.__x`; the task asserts `window.__x === undefined` throughout.
- Known status: the id check in `cleanData` is a pending security fix. Until it is in place the drop assertions (TC-01 steps 8 and 15, TC-02) are expected to fail; that is the finding this task exists to catch.

## Test data
- `profeName = "QA Profe"` (welcome form)
- Crafted group key: `g:x1" onfocus="window.__x=1" autofocus="` (contains a double quote; JSON-escaped in the file as `g:x1\" onfocus=\"window.__x=1\" autofocus=\"`).
- Crafted student key: `s:x2" onfocus="window.__x=2" autofocus="` (JSON-escaped the same way).
- File `/home/claude/cuaderno-patin/QA-tests/tmp/T63/crafted.json`, content exactly:

```json
{"app":"cuaderno-liga","fmt":2,"profe":"Otra Profe","at":1700000000000,"data":{"g:gq1":{"t":1700000000001,"v":{"id":"gq1","name":"Grupo QA","level":"Iniciación","hora":"18:00","dias":[0,1,2,3,4,5,6],"profe":"Otra Profe"}},"g:x1\" onfocus=\"window.__x=1\" autofocus=\"":{"t":1700000000002,"v":{"id":"x1\" onfocus=\"window.__x=1\" autofocus=\"","name":"Grupo Malo","level":"Iniciación","hora":"17:00","dias":[0,1,2,3,4,5,6],"profe":"Otra Profe"}},"s:x2\" onfocus=\"window.__x=2\" autofocus=\"":{"t":1700000000003,"v":{"id":"x2\" onfocus=\"window.__x=2\" autofocus=\"","gid":"gq1","name":"Alumna Mala"}},"s:sj1":{"t":1700000000004,"v":{"id":"sj1","gid":"gq1","name":"Alumna Link","songUrl":"javascript:window.__x=3","songName":"Cancion"}}}}
```

- Expected summary after the drop: "Archivo de Otra Profe", "2 cambios nuevos para vos. No hay datos pisados." (only `g:gq1` and `s:sj1` survive; `g:x1...` and `s:x2...` are dropped).
- Allowed outcome for `s:sj1`: kept with `songUrl` equal to `""`, or dropped. A stored `songUrl` that starts with `javascript:` is a failure.

## Steps

### TC-01: Upload the crafted file and Combinar
1. Open a new browser context. Navigate to `http://localhost:8080/`.
2. Assert: `h2` "Bienvenida" is visible.
3. Fill `#pname` with `QA Profe`. Click **`Empezar`**.
4. Assert: `#subttl` reads "Profe QA Profe · Liga" and `window.__x` is `undefined`.
5. Create the folder `/home/claude/cuaderno-patin/QA-tests/tmp/T63/` and write `crafted.json` with the content in `Test data`.
6. Click the bottom nav button **`Más`**, then the tile **`Sincronizar`**.
7. Click **`Elegir el archivo`** and select `crafted.json`.
8. Assert: the summary card "Archivo de Otra Profe" reads "2 cambios nuevos para vos. No hay datos pisados." (not 4).
9. Assert: `window.__x` is `undefined`, `document.querySelectorAll('[onfocus],[autofocus]').length` is 0, and no dialog was shown.
10. Take a screenshot of the summary.
11. Click **`Combinar`**.
12. Assert: `#smsg` reads "Listo, se combinó. Ahora hacé el paso 2 para guardar lo combinado en la carpeta."
13. Read `localStorage` key `cuaderno-liga-v2`. Assert: `D` has the key `g:gq1`.
14. Assert: no key of `D` contains the text `onfocus`, `autofocus` or a double quote; the string value of the whole `cuaderno-liga-v2` item does not contain `window.__x=1` or `window.__x=2`.
15. Assert: `D` has no key starting with `g:x1` and no key starting with `s:x2`.
16. Assert: if `D["s:sj1"]` exists, `D["s:sj1"].v.songUrl` equals `""`.
17. Assert: `window.__x` is `undefined`.

### TC-02: Render surfaces never carry injected attributes or run code
1. Click the bottom nav button **`Hoy`**.
2. Assert: a card `h3` "18:00 Grupo QA" is shown; the text "Grupo Malo" appears nowhere on the page (`document.body.innerText`).
3. Assert: `document.querySelectorAll('[onfocus],[autofocus],[onclick],[onerror],[onload]').length` is 0.
4. Press Tab 25 times from the top of the page. After each press assert `window.__x` is `undefined`.
5. Evaluate: call `.focus()` on every `button`, `a`, `input`, `select` and `textarea` in the document, in order. Assert: `window.__x` is `undefined` afterwards.
6. Repeat steps 3 to 5 on each of the bottom nav tabs **`Clases`**, **`Calendario`**, **`Coreos`**, **`Alumnas`** and on Más > Sincronizar.
7. On **`Alumnas`** assert: exactly one group button exists (**`Grupo QA`**), `h3` "Alumnas (1)" is shown if `s:sj1` was kept (or "Alumnas (0)" if it was dropped), and the text "Alumna Mala" and "Grupo Malo" are absent.
8. On **`Clases`** assert: the `Grupo` select (`select[data-d=gid]`) has exactly two options ("Sin grupo" and "Grupo QA") and every option `value` matches `/^[A-Za-z0-9_-]+$/`.
9. Assert on every tab: no `a[href^="javascript:"]` and no element with a `src` or `href` that starts with `javascript:` exists.
10. Assert: no dialog was shown during the whole task.
11. Take a screenshot of Hoy.

### TC-03: Student with the javascript: url field on Coreos
1. If `D["s:sj1"]` was kept: click the bottom nav button **`Coreos`** and open the student **`Alumna Link`**. Assert: no link, button or iframe on the page has an `href` or `src` that starts with `javascript:`; the song field is empty or shows no link.
2. If `D["s:sj1"]` was dropped: assert the text "Alumna Link" is absent from Alumnas.
3. Assert: `window.__x` is `undefined` and no dialog was shown.

### TC-04: Persistence
1. Reload the page.
2. Assert: `window.__x` is `undefined`, `document.querySelectorAll('[onfocus],[autofocus]').length` is 0, Hoy still shows "18:00 Grupo QA", and `localStorage` `D` has no key containing `onfocus`.
3. Tab through the page 25 times. Assert: `window.__x` is `undefined`.

### TC-05: Negative and edge cases
- Crafted id only in the value: write `/home/claude/cuaderno-patin/QA-tests/tmp/T63/crafted-value.json` with the same envelope (`"profe":"Otra Profe"`, `"at":1700000000900`) and one entry `"g:gv1":{"t":1700000000901,"v":{"id":"gv1\" onfocus=\"window.__x=4\" autofocus=\"","name":"Grupo Valor","level":"Iniciación","hora":"16:00","dias":[0,1,2,3,4,5,6],"profe":"Otra Profe"}}`. Upload it, click **`Combinar`**, open Hoy, press Tab 25 times and call `.focus()` on every button. Assert: `window.__x` is `undefined`, `document.querySelectorAll('[onfocus],[autofocus]').length` is 0, and no dialog was shown. The count in the summary is not asserted for this file (the entry may be dropped or sanitized).
- Assert at the end: `window.__x` is `undefined`.

## Assertions
- [ ] The summary counts only the 2 safe entries; the group id and student id with a double quote and `onfocus` are dropped by `cleanData`.
- [ ] `localStorage` holds no key or value with `onfocus`, `autofocus` or an unescaped double quote from the file.
- [ ] `window.__x` stays `undefined` after every import, render, Tab traversal and `.focus()` call.
- [ ] No element in the DOM has an injected `onfocus`, `autofocus` or other inline handler attribute.
- [ ] No stored or rendered `javascript:` url.
- [ ] No dialog (`alert`, `confirm`, `prompt`) appears.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx) except where explicitly expected.

## Screenshots required
- Summary of the crafted file
- Hoy after Combinar
- Alumnas after Combinar
- Final state after TC-05

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
