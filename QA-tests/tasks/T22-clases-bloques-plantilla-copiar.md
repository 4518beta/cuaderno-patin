# T22-clases-bloques-plantilla-copiar: Botones del planificador (Agregar bloque, Quitar, Cargar plantilla, Copiar texto)

| Field | Value |
|---|---|
| Route | `/` (tab Clases) |
| Source | `/home/claude/cuaderno-patin/index.html` (`rClases`, `ACTIONS.addBlock`, `delBlock`, `loadTpl`, `copyPlan`, `classText`, `TEMPLATES`) |
| Flow | Button coverage: block management, template loading, clipboard copy |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no (`Quitar` removes a block from the unsaved draft with no confirmation and no saved data is touched) |
| Estimated steps | 36 |

## Preconditions
- App running at `http://localhost:8080`
- Fresh browser profile / new context: localStorage is empty, no cookies.
- Anonymous user, no login, no network.
- If the runner can grant browser permissions, grant `clipboard-read` and `clipboard-write` for `http://localhost:8080` (needed only for the optional clipboard-content assertions in TC-01). Without them, only the `#cmsg` message is asserted.
- Do not click any Web Share or download button (none exist on this tab; stay on Clases).

## Test data
- `profe = "QA Profe"`
- `copyTitle = "Copia QA"`
- `tplTitle = "Plantilla QA"`
- `date = "2026-11-05"`
- Iniciación template (name / minutes / notes): `Entrada en calor` 10 `Movilidad de tobillos, rodillas y caderas. Juegos de equilibrio sin patines.`; `Técnica base` 20 `Posición base, marcha, deslizamiento y frenado.`; `Circuito o juego` 15 `Conos, cambios de dirección, pasar por debajo de un aro.`; `Paso o figura` 10 `Un solo contenido nuevo por clase.`; `Vuelta a la calma` 5 `Estiramiento suave y charla corta.` Total 60.
- Avanzado template: `Entrada en calor` 15, `Saltos` 25, `Trompos` 20, `Programa o coreo` 20, `Flexibilidad y calma` 10. Total 90.
- Extra block: `name = "Bloque extra QA"`, `minutes = 7`, `notes = "Nota extra QA"`
- Edited name for discard test: `"Editado QA"`

## Steps

### TC-01: Copiar texto
1. Open a fresh browser profile and navigate to `http://localhost:8080`.
2. Fill `#pname` with `QA Profe` and click **`Empezar`**. Assert: `#subttl` reads `Profe QA Profe · Liga`.
3. Click the bottom nav button **`Clases`** (`#bnav [data-a=go][data-id=clases]`).
4. Assert: 5 blocks and chip `Total 60 min`. Screenshot: page initial load.
5. Fill `[data-d=title]` with `Copia QA` and `[data-d=date]` with `2026-11-05`.
6. Click **`Copiar texto`**.
7. Assert: `#cmsg` (role `status`) reads `Copiado`. If the browser denies clipboard access, it reads `Seleccioná el texto y copialo` instead; any other text fails.
8. Assert: the form is untouched (title `Copia QA`, date `2026-11-05`, 5 blocks, `Total 60 min`) and no row was added under `Clases guardadas` (it still shows `Todavía no guardaste ninguna clase.`).
9. Optional, only with clipboard-read permission: read the clipboard and assert it has these lines in order:
   - line 1 `Copia QA`
   - line 2 contains `5 nov` and ends with `· Iniciación`
   - line 3 empty
   - line 4 `10 min  Entrada en calor: Movilidad de tobillos, rodillas y caderas. Juegos de equilibrio sin patines.` (two spaces after `min`)
   - the following four lines are the other four blocks in the same format (`20 min  Técnica base: ...`, `15 min  Circuito o juego: ...`, `10 min  Paso o figura: ...`, `5 min  Vuelta a la calma: ...`)
   - the last line is `Total: 60 min`
10. Fill `[data-d=title]` with `""` (empty) and click **`Copiar texto`** again.
11. Assert: `#cmsg` reads `Copiado` (or the fallback text above). Copying does not validate the title and shows no `Poné un título.`
12. Screenshot: state after copy.

### TC-02: Agregar bloque, Quitar, level select and Cargar plantilla
1. Continue in the same session. Fill `[data-d=title]` with `Plantilla QA`.
2. Click **`Agregar bloque`**.
3. Assert: 6 blocks. The 6th (`[data-b="5"]`) has name empty, minutes `10`, notes empty. The chip reads `Total 70 min`. `[data-d=title]` still reads `Plantilla QA`.
4. Fill `[data-b="5"][data-f="n"]` with `Bloque extra QA`, `[data-b="5"][data-f="m"]` with `7`, `[data-b="5"][data-f="t"]` with `Nota extra QA`.
5. Click **`Agregar bloque`** again.
6. Assert: 7 blocks. Block 6 still shows `Bloque extra QA` / `7` / `Nota extra QA` (values typed earlier survive the re-render). Block 7 has minutes `10`. The chip reads `Total 77 min` (60 + 7 + 10).
7. Click **`Quitar`** on the 2nd block (`Técnica base`, `[data-b="1"]`).
8. Assert: no confirmation appears; 6 blocks remain, in this order: `Entrada en calor`, `Circuito o juego`, `Paso o figura`, `Vuelta a la calma`, `Bloque extra QA`, (empty name). The chip reads `Total 57 min`.
9. Select `Avanzado` in `[data-d=level]`.
10. Assert: the 6 blocks and `Total 57 min` are unchanged (changing the level does not reload blocks). `[data-d=level]` shows `Avanzado`.
11. Click **`Cargar plantilla`**.
12. Assert: exactly 5 blocks: `Entrada en calor` 15, `Saltos` 25, `Trompos` 20, `Programa o coreo` 20, `Flexibilidad y calma` 10. The chip reads `Total 90 min`. The block 1 notes read `Movilidad, activación y saltos de preparación.` `Bloque extra QA` is gone.
13. Assert: `[data-d=title]` still reads `Plantilla QA`, `[data-d=date]` still reads `2026-11-05`, `[data-d=level]` still `Avanzado`.
14. Fill `[data-b="0"][data-f="n"]` with `Editado QA`, then click **`Cargar plantilla`** again.
15. Assert: block 1 name is back to `Entrada en calor` (edits to blocks are discarded by the template). Chip `Total 90 min`.
16. Screenshot: state after loading the Avanzado template.

### TC-03: Button coverage
| Button | Action taken | Expected result |
|---|---|---|
| **`Agregar bloque`** | click | one more block (name empty, minutes 10, notes empty); total +10 min |
| **`Quitar`** (any block) | click | that block disappears immediately, no confirm; total minus its minutes |
| **`Quitar`** on the only remaining block | click | zero blocks, chip `Total 0 min`, **`Agregar bloque`** still available |
| **`Cargar plantilla`** | click with level `Iniciación` | the 5 Iniciación blocks, `Total 60 min` |
| **`Cargar plantilla`** | click with level `Intermedio` | `Entrada en calor` 15, `Técnica` 20, `Saltos y trompos` 20, `Coreo` 15, `Vuelta a la calma` 5, `Total 75 min` |
| **`Cargar plantilla`** | click with level `Avanzado` | `Total 90 min` (see TC-02) |
| **`Copiar texto`** | click | `#cmsg` = `Copiado` or `Seleccioná el texto y copialo` (see TC-01) |

Run the following to cover the last rows of the table:
1. Click **`Quitar`** on block 1 five times (always the first block).
2. Assert: no block cards remain, the chip reads `Total 0 min`, buttons **`Agregar bloque`**, **`Guardar clase`**, **`Copiar texto`** are still visible.
3. Click **`Agregar bloque`**. Assert: exactly 1 block, minutes `10`, `Total 10 min`.
4. Select `Iniciación` in `[data-d=level]` and click **`Cargar plantilla`**. Assert: 5 Iniciación blocks, `Total 60 min`.
5. Select `Intermedio` in `[data-d=level]` and click **`Cargar plantilla`**. Assert: 5 Intermedio blocks, `Total 75 min`.

### TC-04: Negative and edge cases
- Select `Iniciación` and click **`Cargar plantilla`** (`Total 60 min`), then clear the minutes of block 1 (`""`) and click **`Agregar bloque`**: block 1 shows `0` after the re-render, the new 6th block has minutes `10`, and the chip reads `Total 60 min` (60 - 10 + 10).
- Click **`Copiar texto`** with zero blocks: `#cmsg` shows `Copiado` (or fallback text); optional clipboard content ends with `Total: 0 min`.
- After `Quitar` and `Agregar bloque` nothing is written to storage until **`Guardar clase`** is clicked: reload the page, open Clases, and assert the draft is a fresh Iniciación draft and `Clases guardadas` is empty.

## Assertions
- [ ] `Agregar bloque` appends a block with empty name, 10 minutes, empty notes.
- [ ] `Quitar` removes the chosen block without confirmation and the total updates.
- [ ] Values typed into earlier blocks survive re-renders.
- [ ] Changing the level select does not touch the blocks; `Cargar plantilla` replaces all blocks (discarding edits) but keeps title and date.
- [ ] Totals shown in the chip match the sum of block minutes after every re-render.
- [ ] `Copiar texto` shows `Copiado` or `Seleccioná el texto y copialo`, saves nothing and does not validate the title.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (the app makes no network requests at all).

## Screenshots required
- Page initial load
- State after `Copiar texto` with `#cmsg` visible
- State with 7 blocks (after the second `Agregar bloque`)
- State after `Cargar plantilla` (Avanzado)
- State with zero blocks

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
