# T20-clases-guardar-clase: Planificador de clases - guardar una clase nueva

| Field | Value |
|---|---|
| Route | `/` (tab Clases, bottom nav `#bnav [data-a=go][data-id=clases]`; URL never changes) |
| Source | `/home/claude/cuaderno-patin/index.html` (`rClases`, `ACTIONS.savePlan`, `ACTIONS.loadTpl`) |
| Flow | Happy path: fill the plan form, load a template, edit a block, save, see it under "Clases guardadas", reload |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 34 |

## Preconditions
- App running at `http://localhost:8080`
- Fresh browser profile / new context: localStorage is empty (no key `cuaderno-liga-v2`), no cookies, no service worker.
- Anonymous user, no login, no network access needed (the page's CSP blocks all network requests).
- No groups, no saved classes (empty profile).

## Test data
- `profe = "QA Profe"` (welcome form, field `#pname`)
- `title = "Saltos de vals QA"`
- `date = "2026-11-05"` (Thursday; format `YYYY-MM-DD` for the date input)
- `level = "Intermedio"`
- Intermedio template after "Cargar plantilla" (name / minutes): `Entrada en calor` 15, `Técnica` 20, `Saltos y trompos` 20, `Coreo` 15, `Vuelta a la calma` 5. Total 75 min.
- Edited block 1: `name = "Entrada en calor QA"`, `minutes = 20`, `notes = "Movilidad y juegos QA"`
- Expected total after the edit: 20 + 20 + 20 + 15 + 5 = 80 min.

## Steps

### TC-01: Page renders in its initial state (empty profile)
1. Open a fresh browser profile and navigate to `http://localhost:8080`.
2. Assert: heading `Bienvenida` is visible, input `#pname` (placeholder "Tu nombre de pila") and button **`Empezar`** are visible.
3. Fill `#pname` with `QA Profe`.
4. Click **`Empezar`**.
5. Assert: `#subttl` reads `Profe QA Profe · Liga` and heading `Buen día, QA Profe` is visible.
6. Click the bottom nav button **`Clases`** (`#bnav [data-a=go][data-id=clases]`).
7. Assert: heading `Planificador de clases` is visible with the text `Elegí el grupo y la fecha, ajustá los bloques y guardá el plan.`; the `Clases` nav button has `aria-current="page"`.
8. Assert: input `[data-d=title]` (label "Título") is empty and has placeholder `Ej: Saltos de vals`.
9. Assert: select `[data-d=gid]` (label "Grupo") has exactly one option, `Sin grupo`, selected.
10. Assert: input `[data-d=date]` (label "Fecha") has the runner's local current date as `YYYY-MM-DD`.
11. Assert: select `[data-d=level]` (label "Plantilla de nivel") has options `Iniciación`, `Intermedio`, `Avanzado` and `Iniciación` is selected.
12. Assert: 5 blocks are shown with names `Entrada en calor`, `Técnica base`, `Circuito o juego`, `Paso o figura`, `Vuelta a la calma` and minutes 10, 20, 15, 10, 5. The chip reads `Total 60 min`.
13. Assert: buttons **`Cargar plantilla`**, **`Agregar bloque`**, **`Guardar clase`**, **`Copiar texto`** and five **`Quitar`** buttons are visible. The button **`Armar otra`** is not present. `#cmsg` is empty.
14. Assert: section `Clases guardadas` shows the empty message `Todavía no guardaste ninguna clase.`
15. Screenshot: initial load.

### TC-02: Happy path - save a class built from the Intermedio template
1. Continue in the same session on the Clases tab.
2. Fill `[data-d=title]` with `Saltos de vals QA`.
3. Fill `[data-d=date]` with `2026-11-05`.
4. Select `Intermedio` in `[data-d=level]`.
5. Assert: the 5 blocks are still the Iniciación blocks and the chip still reads `Total 60 min` (changing the level alone does not change the blocks). The title still reads `Saltos de vals QA` and the date still `2026-11-05`.
6. Click **`Cargar plantilla`**.
7. Assert: the 5 blocks are now `Entrada en calor` 15, `Técnica` 20, `Saltos y trompos` 20, `Coreo` 15, `Vuelta a la calma` 5, the notes of block 1 read `Movilidad, activación de piernas y core.`, and the chip reads `Total 75 min`. Title and date are unchanged.
8. In block 1 fill `[data-b="0"][data-f="n"]` with `Entrada en calor QA`, `[data-b="0"][data-f="m"]` with `20`, and `[data-b="0"][data-f="t"]` with `Movilidad y juegos QA`.
9. Click **`Guardar clase`**.
10. Assert: `#cmsg` reads `Guardada.`
11. Assert: the main button label is now **`Guardar cambios`** and a new button **`Armar otra`** is visible.
12. Assert: the chip reads `Total 80 min`; block 1 still shows `Entrada en calor QA`, 20 and `Movilidad y juegos QA`.
13. Assert: under `Clases guardadas` there is exactly one row. Its bold title is `Saltos de vals QA`, its muted line contains `5 nov` and ends with `· 80 min` (no group name is shown because no group is selected), and it has buttons **`Abrir`** and **`Borrar`**. The empty message `Todavía no guardaste ninguna clase.` is gone.
14. Screenshot: final state after the happy path.

### TC-03: Persistence after reload
1. Wait 1 second (storage writes are debounced 250 ms) and assert the status text `#save` reads `Guardado en este celular`.
2. Reload the page (same profile).
3. Assert: the welcome form is not shown; `#subttl` reads `Profe QA Profe · Liga`; the active tab is `Hoy` (heading `Buen día, QA Profe`).
4. Click the bottom nav button **`Clases`**.
5. Assert: under `Clases guardadas` there is one row `Saltos de vals QA` with `5 nov` and `· 80 min`.
6. Assert: the form is a fresh draft (the open plan is not restored): `[data-d=title]` is empty, the main button is **`Guardar clase`**, `Armar otra` is not present, chip reads `Total 60 min`.
7. Click **`Abrir`** on the row `Saltos de vals QA`.
8. Assert: `[data-d=title]` = `Saltos de vals QA`, `[data-d=date]` = `2026-11-05`, `[data-d=level]` = `Intermedio`, block 1 = `Entrada en calor QA` / 20 / `Movilidad y juegos QA`, chip `Total 80 min`, main button **`Guardar cambios`**.

## Assertions
- [ ] Empty profile shows the welcome gate; after `Empezar` the header subtitle is `Profe QA Profe · Liga`.
- [ ] Clases tab with no groups shows only `Sin grupo` in the Grupo select and the Iniciación template (60 min).
- [ ] Changing the level select does not replace blocks; only `Cargar plantilla` does.
- [ ] `Guardar clase` shows `Guardada.` in `#cmsg`, switches the button to `Guardar cambios` and shows `Armar otra`.
- [ ] The saved row shows title, short date and total minutes (`80 min`).
- [ ] The saved class survives a reload; an open draft does not.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (the app makes no network requests at all).

## Screenshots required
- Page initial load (Clases tab, empty profile)
- Form after `Cargar plantilla` and the block 1 edit
- Final state after the happy path (`Guardada.`, saved row)
- State after reload with the saved row

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
