# T31-calendario-attendance: Take attendance for a class day

| Field | Value |
|---|---|
| Route | `/` (bottom-nav tab **Calendario**, panel `#p-calendario`) |
| Source | `/home/claude/cuaderno-patin/index.html` (`dayPanel`, actions `att`, `attAll`, `attNone`, `pickDay`) |
| Flow | Mark alumnas present or absent for a day, bulk mark, clear |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 55 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous visitor, no login, no network needed.
- Fresh browser profile: empty localStorage and cookies. Nothing seeded.
- Today comes from the browser clock; read its long form from `#dt` (example: `martes, 27 de octubre`).
- Do not click any Web Share, `Guardar en Drive`, `Bajar al celular` or `Mandar por WhatsApp` button.

## Test data
- `profeName = "QA Profe"`
- `groupName = "Grupo QA"`, level `Iniciación` (default), `groupHora = "18:00"`, `groupDays = Lun, Mar, Mié, Jue, Vie, Sáb, Dom` (tick all seven, so today is always a class day)
- `student1 = "Alumna QA"`, `student2 = "Alumna QB"`
- `pastDay` = day number 15 of the previous month (always before today)

## Steps

### TC-00: Setup, welcome, group and alumnas
1. Open a fresh browser profile and navigate to `http://localhost:8080/`.
2. Fill `#pname` with `QA Profe`. Click **`Empezar`**. Assert: `#subttl` reads `Profe QA Profe · Liga`.
3. Click bottom-nav **`Alumnas`**. Fill `#gname` with `Grupo QA`, `#ghora` with `18:00`, tick all seven day checkboxes. Click **`Guardar grupo`**.
4. Assert: group card shows `Grupo QA`, chip `Iniciación`, line `Lun, Mar, Mié, Jue, Vie, Sáb, Dom · 18:00`.
5. Fill `#newstu` with `Alumna QA`. Click **`Agregar`**. Fill `#newstu` with `Alumna QB`. Click **`Agregar`**.
6. Assert: card title reads `Alumnas (2)` and rows `Alumna QA`, `Alumna QB` are listed in that order.
7. Click bottom-nav **`Calendario`**.

### TC-01: Happy path, mark one alumna present and keep it after reload
1. Assert: day panel `h3` equals the `#dt` text and the chip reads `clase del grupo`. `Asistencia` chip reads `0 de 2`. Both round buttons `Presente: Alumna QA` and `Presente: Alumna QB` have `aria-pressed="false"`. Today's grid button shows mark `clase`.
2. Click the round button `aria-label="Presente: Alumna QA"`.
3. Assert: that button has class `on` and `aria-pressed="true"`; the other button is unchanged (`false`).
4. Assert: `Asistencia` chip reads `1 de 2`.
5. Assert: today's grid button now shows mark `hecha` and its `aria-label` ends with `, hecha`; its class includes `done`.
6. Assert: `#save` text becomes `Guardado en este celular` within 1 second.
7. Wait 1 second, then reload the page.
8. Assert: Hoy panel shows a card titled `18:00 Grupo QA` with chip `1 de 2 vinieron`.
9. Click bottom-nav **`Calendario`**. Assert: `Presente: Alumna QA` is `aria-pressed="true"`, `Presente: Alumna QB` is `false`, chip `1 de 2`, today's mark `hecha`.

### TC-02: Toggle a present alumna back to absent
1. Click `Presente: Alumna QA` again.
2. Assert: `aria-pressed="false"`, no class `on`, chip `0 de 2`.
3. Assert: today's grid mark returns to `clase` (class `sch`), and `aria-label` ends with `, clase`.
4. Reload the page, click **`Calendario`**. Assert: both buttons are `aria-pressed="false"`.

### TC-03: Todas presentes (`attAll`)
1. Click **`Todas presentes`**.
2. Assert: both round buttons are `aria-pressed="true"`, chip reads `2 de 2`, today's mark is `hecha`.
3. Click **`Todas presentes`** a second time.
4. Assert: still both `true` and chip still `2 de 2` (the action is idempotent, it does not toggle off).
5. Click `Presente: Alumna QB` once. Assert: chip `1 de 2`, `Alumna QB` is `false`, `Alumna QA` is `true`.
6. Click **`Todas presentes`**. Assert: chip `2 de 2`.

### TC-04: Limpiar (`attNone`)
1. Click **`Limpiar`**.
2. Assert: no confirmation prompt or dialog appears. Both buttons are `aria-pressed="false"`, chip `0 de 2`, today's mark `clase`.
3. Click **`Limpiar`** again with nothing marked. Assert: no change and no error.

### TC-05: Attendance is stored per day
1. Click `Presente: Alumna QA` (today). Assert: chip `1 de 2`.
2. Click **`←`**. Click the day button numbered `15`.
3. Assert: day panel `h3` shows day 15 of the previous month, chip beside it reads `clase del grupo`, `Asistencia` chip reads `0 de 2`, both round buttons are `false`. The `15` grid button has mark `falta`.
4. Click `Presente: Alumna QB`. Assert: chip `1 de 2` and the `15` grid button mark changes from `falta` to `hecha` (class `done`).
5. Click **`→`**. Assert: today's button still shows `hecha`. Click today's button. Assert: `Alumna QA` is `true`, `Alumna QB` is `false`, chip `1 de 2`.
6. Click **`←`**, click button `15`. Assert: `Alumna QB` is `true` and `Alumna QA` is `false`.

### TC-06: Edge cases
- Keyboard: focus `Presente: Alumna QA` with Tab and press Space. Assert: the state toggles once. The panel re-renders after each toggle, so focus is lost; focus the same button again and press Enter. Assert: the state toggles once more (back to the starting value).
- Double click `Presente: Alumna QB` quickly. Assert: final state equals the starting state (two toggles) and the chip count matches the number of `aria-pressed="true"` buttons.
- Assert after every action in this task: the number printed in the `Asistencia` chip equals the count of `aria-pressed="true"` round buttons.

## Assertions
- [ ] Each round button exposes `aria-label="Presente: <name>"` and a correct `aria-pressed`.
- [ ] Chip `N de M` equals the count of pressed buttons over the number of alumnas.
- [ ] Grid mark: `hecha` when anyone is present on a scheduled day, `clase` for today or a future scheduled day with no data, `falta` for a past scheduled day with no data.
- [ ] `Todas presentes` is idempotent; `Limpiar` clears without a confirmation.
- [ ] Attendance is separate per date and survives reload; Hoy shows `N de M vinieron`.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx); there are no requests after document load.

## Screenshots required
- Calendario before marking (0 de 2)
- After first alumna marked (1 de 2, mark `hecha`)
- After `Todas presentes` (2 de 2)
- Previous month day 15 with attendance (`hecha`)
- Hoy card `1 de 2 vinieron`

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
