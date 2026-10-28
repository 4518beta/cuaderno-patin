# T32-calendario-que-se-vio: Log what was worked in class (quick items, Sin clase, Coreo, free text)

| Field | Value |
|---|---|
| Route | `/` (bottom-nav tab **Calendario**, panel `#p-calendario`) |
| Source | `/home/claude/cuaderno-patin/index.html` (`dayPanel`, `QUICK`, actions `logItem`, `addFree`) |
| Flow | Toggle `Qué se vio` items, mark `Sin clase este día`, add free-text items |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 75 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous visitor, no login, no network needed.
- Fresh browser profile: empty localStorage and cookies. Nothing seeded.
- Today comes from the browser clock; its long form is in `#dt`.
- Do not click any Web Share, `Guardar en Drive`, `Bajar al celular` or `Mandar por WhatsApp` button.

## Test data
- `profeName = "QA Profe"`
- `groupName = "Grupo QA"`, level `Iniciación`, `groupHora = "18:00"`, `groupDays = Lun, Mar, Mié, Jue, Vie, Sáb, Dom` (all seven)
- `studentName = "Alumna QA"`
- `quickItems = ["Entrada en calor", "Técnica", "Saltos", "Trompos", "Figuras", "Footwork", "Pasada con música", "Juegos", "Evaluación"]`
- `freeValid = "Juego de la soga"`
- `freeSpaces = "  Mucha   práctica   de  vals  "` (expected stored text: `Mucha práctica de vals`)
- `freeCoPrefix = "co:abc"`, `freeXPrefix = "x:sin"`, `freeUpperCo = "Co:abc"`
- `freeEmpty = ""`, `freeBlank = "   "`
- `freeLong = 81 × "a"` (expected stored text: 80 × "a", the input has `maxlength="80"`)
- `freeHtml = "<b>negrita</b> & \"comillas\""`

## Steps

### TC-00: Setup, welcome, group and alumna
1. Open a fresh browser profile and navigate to `http://localhost:8080/`.
2. Fill `#pname` with `QA Profe`. Click **`Empezar`**. Assert: `#subttl` reads `Profe QA Profe · Liga`.
3. Click bottom-nav **`Alumnas`**. Fill `#gname` with `Grupo QA`, `#ghora` with `18:00`, tick all seven day checkboxes. Click **`Guardar grupo`**.
4. Fill `#newstu` with `Alumna QA`. Click **`Agregar`**. Assert: card title `Alumnas (1)` and row `Alumna QA`.
5. Click bottom-nav **`Calendario`**.

### TC-01: Happy path, toggle every quick item
1. Assert: the nine quick buttons are visible in the `quickItems` order and none has class `on`. Today's grid button shows mark `clase`.
2. Click **`Entrada en calor`**.
3. Assert: that button has class `on`; the other eight do not. Today's grid button now shows mark `hecha` (class `done`) even though nobody is marked present.
4. Click, one at a time, `Técnica`, `Saltos`, `Trompos`, `Figuras`, `Footwork`, `Pasada con música`, `Juegos`, `Evaluación`. After each click assert the clicked button has class `on` and the earlier ones keep `on`.
5. Assert: all nine buttons have class `on`. `Asistencia` chip still reads `0 de 1` (logging does not mark attendance).
6. Click the nine buttons again in the same order. After each click assert the clicked button loses `on`.
7. Assert: no quick button has `on` and today's mark returns to `clase`.
8. Click **`Saltos`** and **`Juegos`** (leave both on). Wait 1 second. Reload the page and click **`Calendario`**.
9. Assert: only `Saltos` and `Juegos` have class `on`; today's mark is `hecha`.
10. Click **`Saltos`** and **`Juegos`** to turn them off.

### TC-02: Coreo toggle
1. Assert: under sub-title `Coreografías trabajadas` the button `Coreo Alumna QA` is visible without class `on`.
2. Click **`Coreo Alumna QA`**. Assert: it has class `on` and today's mark is `hecha`. No new free-text chip appears (the `co:` entry is not shown among the free items).
3. Wait 1 second. Click bottom-nav **`Coreos`**. Assert: the group button `Grupo QA` has class `on`. Click the card for `Alumna QA`.
4. Assert: the section `Trabajada en clase` text starts with `1 vez: `.
5. Click **`← Alumnas del grupo`**, then bottom-nav **`Calendario`**. Click **`Coreo Alumna QA`** to turn it off.
6. Click bottom-nav **`Coreos`**, open `Alumna QA`. Assert: the `Trabajada en clase` text reads `Todavía no la marcaste en el calendario. En un día de clase tocá "Coreo Alumna QA".` Return to **`Calendario`**.

### TC-03: Sin clase este día
1. Click **`Saltos`** and **`Coreo Alumna QA`** (both now `on`). Click `Presente: Alumna QA` (attendance now marked).
2. Click **`Sin clase este día`**.
3. Assert: `Sin clase este día` has class `on`; `Saltos` and `Coreo Alumna QA` lost class `on` (all other log entries are cleared).
4. Assert: `Presente: Alumna QA` is still `aria-pressed="true"` (attendance is not cleared) and today's mark is `hecha`.
5. Click **`Limpiar`**. Assert: attendance is cleared (`0 de 1`) and today's mark is now `sin` (class `sin`, `aria-label` ends `, sin`).
6. Click **`Técnica`**. Assert: `Sin clase este día` loses `on`, `Técnica` has `on`, mark is `hecha`.
7. Click **`Sin clase este día`**, then click it once more. Assert: after the first click it is `on` and `Técnica` is off; after the second click it is off and today's mark is `clase`.

### TC-04: Free text, valid input (`#free` + **`Agregar`**)
1. Fill `#free` with `Juego de la soga`. Click **`Agregar`**.
2. Assert: a new button `Juego de la soga` with class `on` appears in the row of free items below the quick items. `#free` is empty again. Today's mark is `hecha`.
3. Click the `Juego de la soga` button. Assert: it disappears from the panel (an unselected free item is removed) and today's mark returns to `clase`.
4. Fill `#free` with `Juego de la soga` and click **`Agregar`** twice. Assert: exactly one `Juego de la soga` button exists.
5. Wait 1 second, reload, click **`Calendario`**. Assert: the `Juego de la soga` button is still there with class `on`.

### TC-05: Free text validation matrix
For each row fill `#free`, click **`Agregar`**, then compare the free-item buttons (those after the nine quick buttons, excluding `Coreo ...`) with the expected result. Start the matrix with only `Juego de la soga` present.

| Input | Expected result |
|---|---|
| `freeEmpty` (`""`) | Nothing added, no error text, no change in buttons |
| `freeBlank` (`"   "`) | Nothing added (the value is trimmed to empty) |
| `freeCoPrefix` (`co:abc`) | Nothing added (text starting with `co:` is rejected) |
| `freeXPrefix` (`x:sin`) | Nothing added, and `Sin clase este día` does not turn on |
| `freeUpperCo` (`Co:abc`) | Button `Co:abc` is added (the rejection check is case-sensitive) |
| `freeSpaces` | Button `Mucha práctica de vals` is added (outer spaces trimmed, inner runs collapsed to one space) |
| `freeLong` (81 × `a`) | Field holds only 80 characters after typing; button with 80 × `a` is added |
| `freeHtml` | Button shows the literal text `<b>negrita</b> & "comillas"`; no bold element is rendered and no dialog opens |
| `Saltos` (same as a quick item) | No new button; the existing quick button `Saltos` turns `on` |
| `juego de la soga` (different case) | A second, separate button `juego de la soga` is added (names are case-sensitive) |

After the matrix, turn off every free item by clicking it. Assert: each one disappears and the quick-item row shows only `Saltos` with class `on` (turned on by the matrix row above).

### TC-06: Negative and edge cases
- Click a quick item, then pick another day (**`←`**, button `15`). Assert: the quick item is off for that day and the free item row is empty; return with **`→`** and today's button. Assert: the earlier choice is still `on`.
- Click **`Sin clase este día`** on today, then click **`←`**, button `15`. Assert: the `Sin clase este día` state of today does not appear on day 15.
- Create a second group `Grupo QA 2` from **`Alumnas`** (button **`+ Nuevo grupo`**, name only, no days), return to **`Calendario`**, click `Grupo QA 2`. Assert: no `Qué se vio` button has class `on` and no free items from `Grupo QA` are shown.

## Assertions
- [ ] Nine quick buttons render in the documented order and toggle `on` and off per click.
- [ ] Any logged item on a scheduled day changes the grid mark to `hecha`; `Sin clase este día` alone gives `sin`.
- [ ] `Sin clase este día` clears other log items but not attendance; any other log item clears `Sin clase este día`.
- [ ] `Coreo <name>` appears in `Coreos` > student detail as `Trabajada en clase`, and not as a free item.
- [ ] Free text: trimmed, inner whitespace collapsed, max 80, empty and `co:`/`x:` prefixed entries rejected, HTML escaped.
- [ ] Data is stored per group and per day and survives reload.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx).

## Screenshots required
- Calendario before logging
- All nine quick items on
- `Sin clase este día` on with mark `sin`
- Free item added
- Free text matrix final state
- Coreos `Trabajada en clase` with `1 vez:`

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
