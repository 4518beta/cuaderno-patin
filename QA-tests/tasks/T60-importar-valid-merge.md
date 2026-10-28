# T60-importar-valid-merge: Import a valid file, review the summary, Combinar, and import it again

| Field | Value |
|---|---|
| Route | `/#importar` (Más > Sincronizar, card "Subir los datos que me mandó otra profe") |
| Source | `/home/claude/cuaderno-patin/index.html` (readImport, parseImport, cleanData, mergeData, ACTIONS.applyMerge, ACTIONS.cancelMerge) |
| Flow | Upload a valid export with the file chooser on `#impin`, read the summary, press Combinar, check the data, upload the same file again |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 52 |

## Preconditions
- App running at `http://localhost:8080`
- Role: anonymous.
- Fresh browser profile: new browser context with empty localStorage, no cookies, no network access besides `localhost:8080`.
- Temp folder for this task: `/home/claude/cuaderno-patin/QA-tests/tmp/T60/` (create it before step 1 of TC-01; the files are written by the runner from the `Test data` below).
- Files are uploaded by clicking the label **`Elegir el archivo`** while waiting for the browser `filechooser` event, then calling `setFiles` on the chooser (the input is `#impin`, `display:none`).
- Do not click **`Guardar en Drive`** or **`Mandar por WhatsApp`**.

## Test data
- `profeName = "QA Profe"` (welcome form)
- File `/home/claude/cuaderno-patin/QA-tests/tmp/T60/valid.json`, content exactly:

```json
{"app":"cuaderno-liga","fmt":2,"profe":"Otra Profe","at":1700000000000,"data":{"g:gq1":{"t":1700000000001,"v":{"id":"gq1","name":"Grupo QA","level":"Iniciación","hora":"18:00","dias":[0,1,2,3,4,5,6],"profe":"Otra Profe"}},"s:sq1":{"t":1700000000002,"v":{"id":"sq1","gid":"gq1","name":"Alumna Uno"}},"s:sq2":{"t":1700000000003,"v":{"id":"sq2","gid":"gq1","name":"Alumna Dos"}}}}
```

- Expected summary: heading "Archivo de Otra Profe", text "3 cambios nuevos para vos. No hay datos pisados.", no warning paragraph.
- Expected success message: "Listo, se combinó. Ahora hacé el paso 2 para guardar lo combinado en la carpeta."
- Expected second-import warning: "Ya combinaste este archivo o uno más nuevo de Otra Profe."
- Expected second-import summary: "0 cambios nuevos para vos. No hay datos pisados."

## Steps

### TC-01: Happy path - upload, summary, Combinar, data appears
1. Open a new browser context. Navigate to `http://localhost:8080/`.
2. Assert: `h2` "Bienvenida" is visible.
3. Fill `#pname` with `QA Profe`. Click **`Empezar`**.
4. Assert: `#subttl` reads "Profe QA Profe · Liga" and `h2` reads "Buen día, QA Profe".
5. Create the folder `/home/claude/cuaderno-patin/QA-tests/tmp/T60/` and write `valid.json` with the content in `Test data`.
6. Click the bottom nav button **`Más`**, then the tile **`Sincronizar`**.
7. Assert: `h2` "Sincronizar" is visible, `#impin` exists, and no button **`Combinar`** exists.
8. Click the label **`Elegir el archivo`**, and in the file chooser select `valid.json`.
9. Assert: a card with `h3` "Archivo de Otra Profe" appears with the text "3 cambios nuevos para vos. No hay datos pisados."; no `p.hand` warning is inside the card.
10. Assert: buttons **`Combinar`** and **`Cancelar`** are visible; `#smsg` is empty.
11. Read `localStorage` key `cuaderno-liga-v2`. Assert: `D` is still `{}` (nothing is saved before Combinar).
12. Take a screenshot of the summary.
13. Click **`Combinar`** (`[data-a=applyMerge]`).
14. Assert: `#smsg` reads the expected success message; the summary card is gone; **`Combinar`** no longer exists.
15. Assert: the first card reads "3 cambios tuyos sin compartir."
16. Read `localStorage` key `cuaderno-liga-v2`. Assert: `D` has exactly the keys `g:gq1`, `s:sq1`, `s:sq2`; `D["g:gq1"].t = 1700000000001`; `D["s:sq1"].v.name = "Alumna Uno"`; `merged["Otra Profe"] = 1700000000000`; `profe = "QA Profe"`.
17. Click the bottom nav button **`Alumnas`**.
18. Assert: the group button **`Grupo QA`** is shown and selected; card `h3` "Grupo QA" with chip "Iniciación"; days text "Dom, Lun, Mar, Mié, Jue, Vie, Sáb · 18:00"; text starts "Profe: Otra Profe"; `h3` "Alumnas (2)"; the names listed are "Alumna Dos" then "Alumna Uno".
19. Click the bottom nav button **`Hoy`**.
20. Assert: a card `h3` "18:00 Grupo QA" with chip "sin lista todavía" is shown under "Clases de hoy".
21. Reload the page. Assert: Hoy still shows "18:00 Grupo QA" and Alumnas still shows "Alumnas (2)" (data persisted).
22. Take a screenshot of the final state.

### TC-02: Idempotent second import of the same file
1. Open Más > Sincronizar. Snapshot `localStorage` `D` as `snapshotD` (JSON string).
2. Click **`Elegir el archivo`** and select `valid.json` again.
3. Assert: the summary card shows "Archivo de Otra Profe", the warning paragraph "Ya combinaste este archivo o uno más nuevo de Otra Profe." and the text "0 cambios nuevos para vos. No hay datos pisados."
4. Click **`Cancelar`**. Assert: the summary card is gone and `#smsg` is empty; `localStorage` `D` equals `snapshotD`.
5. Click **`Elegir el archivo`** and select `valid.json` a third time (the same file name is accepted again).
6. Assert: the same summary and warning appear.
7. Click **`Combinar`**. Assert: `#smsg` reads the expected success message.
8. Assert: `localStorage` `D` equals `snapshotD` (same 3 keys, same values, same `t`).
9. Open Alumnas. Assert: `h3` "Alumnas (2)" (no duplicated students) and only one group button **`Grupo QA`** exists.

### TC-03: Negative and edge cases
- Reload the page, open Más > Sincronizar. Assert: no summary card is shown (the preview is not persisted) and `#smsg` is empty.
- Open Más > Sincronizar, select `valid.json`, then click **`← Más`** without choosing Combinar or Cancelar. Reopen Sincronizar. Assert: no summary card is shown and `D` is unchanged.

## Assertions
- [ ] Summary shows the sender name, the count of new changes and the "No hay datos pisados." line before anything is saved.
- [ ] Combinar saves exactly the 3 entries and shows the success message.
- [ ] The group and its 2 students appear in Alumnas and Hoy and survive a reload.
- [ ] Importing the same file again shows the "Ya combinaste ..." warning, 0 new changes, and leaves `D` identical.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx) except where explicitly expected.

## Screenshots required
- Sincronizar before choosing a file
- Summary card with the 3 new changes
- Alumnas after Combinar
- Summary card with the "Ya combinaste ..." warning
- Final state after TC-03

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
