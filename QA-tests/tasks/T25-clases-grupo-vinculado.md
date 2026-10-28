# T25-clases-grupo-vinculado: Planificador de clases con un grupo creado en Alumnas

| Field | Value |
|---|---|
| Route | `/` (tabs Alumnas and Clases) |
| Source | `/home/claude/cuaderno-patin/index.html` (`newDraft`, `rClases`, `gOpts`, the `change` listener for `data-d="gid"`, `groupForm`, `ACTIONS.saveGroup`) |
| Flow | Happy path with a group: the draft is pre-filled from the group, group/level/title sync rules, save with group name |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 40 |

## Preconditions
- App running at `http://localhost:8080`
- Fresh browser profile / new context: localStorage is empty, no cookies.
- Anonymous user, no login, no network.
- The group is created in TC-01 before the Clases tab is opened for the first time in this session (the Clases draft is created on first render and is not re-seeded when groups are added later).

## Test data
- `profe = "QA Profe"`
- Group: `gname = "Grupo QA"`, `glevel = "Avanzado"`, `ghora = "18:00"`, no class days ticked
- Auto title for the group: `Clase de Grupo QA`
- Avanzado template: `Entrada en calor` 15, `Saltos` 25, `Trompos` 20, `Programa o coreo` 20, `Flexibilidad y calma` 10. Total 90.
- `customTitle = "Mi titulo QA"`
- `date = "2026-11-05"`

## Steps

### TC-01: Setup - create the group
1. Open a fresh browser profile and navigate to `http://localhost:8080`.
2. Fill `#pname` with `QA Profe` and click **`Empezar`**. Assert: `#subttl` reads `Profe QA Profe · Liga`.
3. Click the bottom nav button **`Alumnas`** (`#bnav [data-a=go][data-id=alumnas]`).
4. Assert: card `Nuevo grupo` is shown with `#gname` (placeholder `Ej: Intermedio tarde`), `#glevel`, `#ghora` and buttons **`Guardar grupo`** and **`Cancelar`**.
5. Fill `#gname` with `Grupo QA`, select `Avanzado` in `#glevel`, fill `#ghora` with `18:00`.
6. Click **`Guardar grupo`**.
7. Assert: the group card shows heading `Grupo QA` and the chip `Avanzado`; the text `Sin días cargados · 18:00` is visible.

### TC-02: Happy path - the Clases draft starts from the group
1. Click the bottom nav button **`Clases`** (`#bnav [data-a=go][data-id=clases]`).
2. Assert: heading `Planificador de clases`.
3. Assert: `[data-d=gid]` has options `Sin grupo` and `Grupo QA`, and `Grupo QA` is selected.
4. Assert: `[data-d=title]` = `Clase de Grupo QA`; `[data-d=level]` = `Avanzado`; `[data-d=date]` is today's date.
5. Assert: the 5 Avanzado blocks are shown and the chip reads `Total 90 min`.
6. Screenshot: page initial load with the group.
7. Fill `[data-d=title]` with `Mi titulo QA` and `[data-d=date]` with `2026-11-05`.
8. Click **`Guardar clase`**.
9. Assert: `#cmsg` reads `Guardada.`; the main button is **`Guardar cambios`**.
10. Assert: `Clases guardadas` has one row titled `Mi titulo QA` whose muted line contains `5 nov`, `· Grupo QA` and ends with `· 90 min`.
11. Screenshot: final state after the happy path.

### TC-03: Group, level and title sync rules (new draft)
1. Click **`Armar otra`**.
2. Assert: `[data-d=gid]` = `Grupo QA`, `[data-d=title]` = `Clase de Grupo QA`, `[data-d=level]` = `Avanzado`, `Total 90 min` (a new draft inherits the group of the previous draft), main button **`Guardar clase`**.
3. Select `Sin grupo` in `[data-d=gid]`.
4. Assert: `[data-d=title]` still reads `Clase de Grupo QA`, `[data-d=level]` still `Avanzado`, the 5 blocks and `Total 90 min` are unchanged.
5. Select `Intermedio` in `[data-d=level]`. Assert: `Total 90 min` and block names unchanged.
6. Select `Grupo QA` in `[data-d=gid]`.
7. Assert: `[data-d=level]` switches back to `Avanzado` (the group's level), the title stays `Clase de Grupo QA`, and the blocks are unchanged (`Total 90 min`).
8. Fill `[data-d=title]` with `""` (empty). Select `Sin grupo`, then select `Grupo QA`.
9. Assert: `[data-d=title]` is filled again with `Clase de Grupo QA` (auto title applies when the draft is new and the title is empty).
10. Fill `[data-d=title]` with `Mi titulo QA 2` (custom). Select `Sin grupo`, then select `Grupo QA`.
11. Assert: `[data-d=title]` still reads `Mi titulo QA 2` (a typed title is never overwritten).
12. Select `Sin grupo` and click **`Guardar clase`**. Assert: `#cmsg` reads `Guardada.` and the new saved row `Mi titulo QA 2` has a muted line that does not contain `Grupo QA` (it ends with `· 90 min`).
13. Screenshot: list with one row with group and one without.

### TC-04: Editing a saved class does not auto-fill the title
1. With the class saved in step 12 still open (main button **`Guardar cambios`**), fill `[data-d=title]` with `""`.
2. Select `Grupo QA` in `[data-d=gid]`.
3. Assert: `[data-d=title]` stays empty (auto title only applies to unsaved drafts).
4. Click **`Guardar cambios`**.
5. Assert: `#cmsg` reads `Poné un título.` and the saved row `Mi titulo QA 2` keeps its title, without the `· Grupo QA` part.
6. Fill `[data-d=title]` with `Mi titulo QA 2 editada`, click **`Guardar cambios`**. Assert: `#cmsg` reads `Guardada.`; there are still 2 rows; the edited row is titled `Mi titulo QA 2 editada` and its muted line now contains `· Grupo QA`; the row `Mi titulo QA` is unchanged.

### TC-05: Persistence and negative cases
- Wait 1 second, reload the page, click **`Clases`**. Assert: both saved rows remain. The form is a fresh draft with `Grupo QA` selected, title `Clase de Grupo QA`, level `Avanzado`, `Total 90 min`.
- Open Alumnas, click **`Borrar grupo`**, then **`¿Seguro?`** (the group is deleted). Click **`Clases`**. Assert: the saved rows still list the class titles; no saved row shows the text `Grupo QA` any more; `[data-d=gid]` options now contain only `Sin grupo`; no console errors. Observed behavior to record: rows that were linked to the deleted group keep a dangling separator in the muted line (for example `5 nov ·  · 90 min`) because the group id is still stored on the class.

## Assertions
- [ ] A group created in Alumnas appears as an option in the Grupo select of Clases.
- [ ] The first draft pre-fills group, level, title `Clase de <group>` and the matching level template.
- [ ] Selecting a group sets the level to the group's level and never changes blocks.
- [ ] The title is auto-filled only for an unsaved draft with an empty title.
- [ ] Saved rows show `· <group name>` only when a group is selected.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (the app makes no network requests at all).

## Screenshots required
- Page initial load with the group
- Final state after the happy path
- List with and without the group name
- Validation error on `Guardar cambios` with an empty title

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
