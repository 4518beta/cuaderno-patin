# T64-importar-newer-wins-merge: Newer timestamp wins on import and a tombstone deletes

| Field | Value |
|---|---|
| Route | `/#importar` (Más > Sincronizar, file input `#impin`) |
| Source | `/home/claude/cuaderno-patin/index.html` (mergeData, cleanData, readImport, ACTIONS.applyMerge) |
| Flow | Import a base file, then an older edit (ignored), a newer edit (applied), a tombstone (deletes), and an older revival (ignored) |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 60 |

## Preconditions
- App running at `http://localhost:8080`
- Role: anonymous.
- Fresh browser profile: new browser context with empty localStorage, no cookies, no network access besides `localhost:8080`.
- Temp folder for this task: `/home/claude/cuaderno-patin/QA-tests/tmp/T64/` (create it before the first upload; the runner writes the files from the `Test data` below).
- Files are uploaded by clicking the label **`Elegir el archivo`** while waiting for the `filechooser` event, then calling `setFiles` (the input is `#impin`).
- TC-02 to TC-06 run in order in the same browser context as TC-01; each depends on the state left by the previous one.

## Test data
- `profeName = "QA Profe"` (welcome form)
- All files use `"app":"cuaderno-liga"`, `"fmt":2`, `"profe":"Otra Profe"`. Each file has a larger `at` than the one before so the "Ya combinaste ..." warning never appears.
- `base.json` (`at` 1700000000000):

```json
{"app":"cuaderno-liga","fmt":2,"profe":"Otra Profe","at":1700000000000,"data":{"g:gq1":{"t":1700000000100,"v":{"id":"gq1","name":"Grupo QA","level":"Iniciación","hora":"18:00","dias":[1,3],"profe":"Otra Profe"}},"s:sq1":{"t":1700000000100,"v":{"id":"sq1","gid":"gq1","name":"Alumna Uno"}},"s:sq2":{"t":1700000000100,"v":{"id":"sq2","gid":"gq1","name":"Alumna Dos"}}}}
```

- `older.json` (`at` 1700000000200): same key `g:gq1` with `t` 1700000000050 (older than 1700000000100):

```json
{"app":"cuaderno-liga","fmt":2,"profe":"Otra Profe","at":1700000000200,"data":{"g:gq1":{"t":1700000000050,"v":{"id":"gq1","name":"Grupo Viejo","level":"Iniciación","hora":"18:00","dias":[1,3],"profe":"Otra Profe"}}}}
```

- `newer.json` (`at` 1700000000300): same key `g:gq1` with `t` 1700000000200 (newer):

```json
{"app":"cuaderno-liga","fmt":2,"profe":"Otra Profe","at":1700000000300,"data":{"g:gq1":{"t":1700000000200,"v":{"id":"gq1","name":"Grupo QA Nuevo","level":"Iniciación","hora":"18:00","dias":[1,3],"profe":"Otra Profe"}}}}
```

- `tombstone.json` (`at` 1700000000400): `s:sq2` deleted with `v: null` and `t` 1700000000300:

```json
{"app":"cuaderno-liga","fmt":2,"profe":"Otra Profe","at":1700000000400,"data":{"s:sq2":{"t":1700000000300,"v":null}}}
```

- `revive-old.json` (`at` 1700000000500): `s:sq2` live again but with `t` 1700000000250 (older than the tombstone):

```json
{"app":"cuaderno-liga","fmt":2,"profe":"Otra Profe","at":1700000000500,"data":{"s:sq2":{"t":1700000000250,"v":{"id":"sq2","gid":"gq1","name":"Alumna Dos"}}}}
```

- `revive-new.json` (`at` 1700000000600): `s:sq2` live again with `t` 1700000000350 (newer than the tombstone):

```json
{"app":"cuaderno-liga","fmt":2,"profe":"Otra Profe","at":1700000000600,"data":{"s:sq2":{"t":1700000000350,"v":{"id":"sq2","gid":"gq1","name":"Alumna Dos Vuelta"}}}}
```

## Steps

### TC-01: Setup and import the base file
1. Open a new browser context. Navigate to `http://localhost:8080/`.
2. Assert: `h2` "Bienvenida" is visible.
3. Fill `#pname` with `QA Profe`. Click **`Empezar`**.
4. Assert: `#subttl` reads "Profe QA Profe · Liga".
5. Create the folder `/home/claude/cuaderno-patin/QA-tests/tmp/T64/` and write the six files from `Test data`.
6. Click the bottom nav button **`Más`**, then the tile **`Sincronizar`**.
7. Click **`Elegir el archivo`** and select `base.json`.
8. Assert: the summary card "Archivo de Otra Profe" reads "3 cambios nuevos para vos. No hay datos pisados." and has no warning paragraph.
9. Click **`Combinar`**. Assert: `#smsg` reads "Listo, se combinó. Ahora hacé el paso 2 para guardar lo combinado en la carpeta."
10. Click the bottom nav button **`Alumnas`**.
11. Assert: the group button **`Grupo QA`** is shown; `h3` "Alumnas (2)"; names "Alumna Dos" and "Alumna Uno".
12. Read `localStorage` key `cuaderno-liga-v2`. Assert: `D["g:gq1"].t = 1700000000100` and `D["g:gq1"].v.name = "Grupo QA"`.
13. Take a screenshot.

### TC-02: Older edit does not win
1. Open Más > Sincronizar. Click **`Elegir el archivo`** and select `older.json`.
2. Assert: the summary card reads "0 cambios nuevos para vos. No hay datos pisados." and has no warning paragraph.
3. Click **`Combinar`**. Assert: `#smsg` reads the success message "Listo, se combinó. Ahora hacé el paso 2 para guardar lo combinado en la carpeta."
4. Open Alumnas. Assert: the group button reads **`Grupo QA`** (not "Grupo Viejo") and the text "Grupo Viejo" is absent.
5. Read `localStorage`. Assert: `D["g:gq1"].t = 1700000000100` and `D["g:gq1"].v.name = "Grupo QA"`.

### TC-03: Newer edit wins
1. Open Más > Sincronizar. Click **`Elegir el archivo`** and select `newer.json`.
2. Assert: the summary card reads "1 cambios nuevos para vos. No hay datos pisados." and has no warning paragraph.
3. Click **`Combinar`**. Assert: `#smsg` reads the success message.
4. Open Alumnas. Assert: the group button and the card `h3` read **`Grupo QA Nuevo`**; `h3` "Alumnas (2)" (students unchanged).
5. Read `localStorage`. Assert: `D["g:gq1"].t = 1700000000200` and `D["g:gq1"].v.name = "Grupo QA Nuevo"`; `D["s:sq1"].t = 1700000000100`.
6. Take a screenshot.

### TC-04: Tombstone (v: null) deletes
1. Open Más > Sincronizar. Click **`Elegir el archivo`** and select `tombstone.json`.
2. Assert: the summary card reads "1 cambios nuevos para vos. No hay datos pisados."
3. Click **`Combinar`**. Assert: `#smsg` reads the success message.
4. Open Alumnas. Assert: `h3` "Alumnas (1)"; "Alumna Uno" is listed; "Alumna Dos" is absent.
5. Read `localStorage`. Assert: `D["s:sq2"]` exists (kept as a tombstone) with `t = 1700000000300` and `v = null`; `D["s:sq1"].v.name = "Alumna Uno"`.
6. Open Hoy. Assert: the group card (`h3` containing "Grupo QA Nuevo") is shown and the group still has 1 student (via Alumnas).
7. Take a screenshot.

### TC-05: An older revival does not undo the delete
1. Open Más > Sincronizar. Click **`Elegir el archivo`** and select `revive-old.json`.
2. Assert: the summary card reads "0 cambios nuevos para vos. No hay datos pisados."
3. Click **`Combinar`**. Open Alumnas. Assert: `h3` "Alumnas (1)" and "Alumna Dos" is still absent.
4. Read `localStorage`. Assert: `D["s:sq2"].t = 1700000000300` and `D["s:sq2"].v = null`.

### TC-06: A newer revival brings the student back
1. Open Más > Sincronizar. Click **`Elegir el archivo`** and select `revive-new.json`.
2. Assert: the summary card reads "1 cambios nuevos para vos. No hay datos pisados."
3. Click **`Combinar`**. Open Alumnas.
4. Assert: `h3` "Alumnas (2)"; the names listed are "Alumna Dos Vuelta" and "Alumna Uno"; "Alumna Dos" alone (without "Vuelta") is absent.
5. Read `localStorage`. Assert: `D["s:sq2"].t = 1700000000350` and `D["s:sq2"].v.name = "Alumna Dos Vuelta"`.
6. Reload the page and open Alumnas. Assert: the same two names are shown (persisted).
7. Take a screenshot of the final state.

### TC-07: Negative and edge cases
- Re-import `revive-new.json`. Assert: the warning "Ya combinaste este archivo o uno más nuevo de Otra Profe." and "0 cambios nuevos para vos. No hay datos pisados." are shown; click **`Cancelar`** and assert `D` is unchanged.
- Import `older.json` again after all merges. Assert: "0 cambios nuevos para vos." and, after Combinar, `D["g:gq1"].v.name` is still "Grupo QA Nuevo".
- Assert at the end: `localStorage` `D` has exactly the keys `g:gq1`, `s:sq1`, `s:sq2`.

## Assertions
- [ ] An entry with an older `t` than the local one never overwrites it (summary shows 0 new changes).
- [ ] An entry with a newer `t` replaces the local one (summary shows 1 new change; name updates in Alumnas).
- [ ] A `v: null` entry with a newer `t` deletes the record and the tombstone is stored.
- [ ] A live entry older than the tombstone does not resurrect the record; a newer one does.
- [ ] The "No hay datos pisados." text shows for every step (nothing was edited on both sides).
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx) except where explicitly expected.

## Screenshots required
- Alumnas after base import
- Alumnas after the newer edit
- Alumnas after the tombstone
- Final state after TC-06

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
