# T30-calendario-render-and-navigation: Calendario renders, empty state, month and day navigation, group selector

| Field | Value |
|---|---|
| Route | `/` (bottom-nav tab **Calendario**, panel `#p-calendario`) |
| Source | `/home/claude/cuaderno-patin/index.html` (`rCalendario`, `calGrid`, `dayPanel`, actions `month`, `pickDay`, `cgroup`) |
| Flow | Open Calendario, change month, pick a day, switch group |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 70 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous visitor, no login, no network needed (CSP blocks all connections).
- Fresh browser profile: empty localStorage, empty cookies, no service-worker data. Nothing is seeded.
- The browser clock is the source of "today". Read today's long date from the header element `#dt` (example on 2026-10-27: `martes, 27 de octubre`). Never hard-code a date.
- Note on weekday-dependent assertions: this task creates the group with days Lun, Mié, Vie only. The runner computes which weekday each date falls on from the grid (the grid starts on Monday, columns are `L M M J V S D`).

## Test data
- `profeName = "QA Profe"`
- `groupName = "Grupo QA"`, `groupLevel = "Iniciación"` (default option), `groupHora = "18:00"`, `groupDays = Lun, Mié, Vie` (tick only these three checkboxes)
- `studentName = "Alumna QA"`
- `group2Name = "Grupo QA 2"`, `group2Hora = ""` (leave empty), `group2Days = Mar, Jue`
- `MesActual` = Spanish month name of today (capitalised, from `MESES_LARGO`: Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre) and `AñoActual` = 4-digit year. On 2026-10-27 the heading is `Octubre 2026`.

## Steps

### TC-00: Setup, welcome form (no group yet)
1. Open a fresh browser profile and navigate to `http://localhost:8080/`.
2. Assert: panel shows heading `Bienvenida`, field `#pname` with placeholder `Tu nombre de pila`, button **`Empezar`**.
3. Fill `#pname` with `QA Profe`. Click **`Empezar`**.
4. Assert: `#subttl` reads `Profe QA Profe · Liga` and the Hoy panel heading reads `Buen día, QA Profe`.

### TC-01: Empty state before any group exists
1. Click bottom-nav button **`Calendario`**.
2. Assert: heading `Calendario` is visible and the bottom-nav button `Calendario` has `aria-current="page"`.
3. Assert: a `.empty` box reads exactly `Primero creá un grupo en Alumnas.`
4. Assert: there is no group selector button, no `←`/`→` month buttons, no day grid (`.cal` absent), no `Asistencia` card, no `#free`, no `#nota`.

### TC-02: Setup, create group and alumna
1. Click bottom-nav button **`Alumnas`**.
2. Assert: heading `Alumnas y grupos` and a card titled `Nuevo grupo` are visible.
3. Fill `#gname` with `Grupo QA`. Leave select `#glevel` on `Iniciación`. Fill `#ghora` with `18:00`. Tick only the checkboxes labelled `Lun`, `Mié`, `Vie`.
4. Click **`Guardar grupo`**.
5. Assert: the group card shows title `Grupo QA`, chip `Iniciación`, and the line `Lun, Mié, Vie · 18:00`.
6. Fill `#newstu` with `Alumna QA`. Click **`Agregar`**.
7. Assert: card title reads `Alumnas (1)`, row `Alumna QA` with chip `sin cuota` is listed, `#newstu` is empty, `#sterr` is empty.

### TC-03: Happy path, Calendario renders with a group
1. Click bottom-nav button **`Calendario`**.
2. Assert: heading `Calendario` and paragraph `Tocá un día para pasar lista y anotar lo que se vio.`
3. Assert: exactly one group button `Grupo QA` exists and it has class `on`.
4. Assert: month heading (`h3` inside the calendar card) reads `<MesActual> <AñoActual>`. Buttons with `aria-label` `Mes anterior` (text `←`) and `Mes siguiente` (text `→`) are visible.
5. Assert: the grid header shows seven `.wd` cells with texts `L M M J V S D` in that order.
6. Assert: the number of day buttons `.cd[data-a="pickDay"]` equals the number of days in the current month, numbered 1 to N.
7. Assert: the legend row shows chips `clase`, `hecha`, `falta`, `extra`.
8. Assert: today's button has classes `today` and `sel`. Its `aria-label` starts with the `#dt` text.
9. Assert: the day panel `h3` equals the `#dt` text. The chip beside it reads `clase del grupo` if today is a Lun, Mié or Vie, otherwise `día extra`. The muted line reads `Grupo QA · 18:00`.
10. Assert: card `Asistencia` shows chip `0 de 1`, buttons **`Todas presentes`** and **`Limpiar`**, and a row `Alumna QA` with a round button `aria-label="Presente: Alumna QA"` and `aria-pressed="false"`.
11. Assert: card `Qué se vio` shows nine buttons in this order: `Entrada en calor`, `Técnica`, `Saltos`, `Trompos`, `Figuras`, `Footwork`, `Pasada con música`, `Juegos`, `Evaluación`; a sub-title `Coreografías trabajadas` with button `Coreo Alumna QA`; input `#free` with placeholder `Algo más que se hizo`; button **`Agregar`**. No button has class `on`.
12. Assert: the card with `Nota de la clase` has textarea `#nota` with placeholder `Ej: faltó el parlante, repasar la entrada` (empty value) and button **`Guardar nota`**.
13. Assert: no card titled `Torneos de la liga` exists (the league tournament list is empty in the source).

### TC-04: Pick a day (`pickDay`)
1. In the current month grid, pick a day button that is not today: day `1`, or day `2` if today is the 1st. Click it. Record its ISO date from `data-id`.
2. Assert: that button now has class `sel` and today's button no longer has `sel` (it keeps `today`).
3. Assert: the day panel `h3` equals the long date of the picked day (`aria-label` of that button without the trailing `, <mark>`). The month heading and the selected group are unchanged.
4. Assert: the chip beside the heading is `clase del grupo` when the picked weekday is Lun, Mié or Vie, otherwise `día extra`.
5. Assert: `Asistencia` chip reads `0 de 1`. All `Qué se vio` buttons are off.
6. Click today's button again. Assert: panel `h3` returns to the `#dt` text and `sel` returns to today.

### TC-05: Month navigation and day marks
1. Click **`←`** (`Mes anterior`).
2. Assert: heading shows the previous month and year (for January, December of the previous year). Day panel `h3` still equals the `#dt` text (selection does not move). No button in this grid has class `sel`.
3. Assert: every day whose weekday is Lun, Mié or Vie has a `<small>` mark `falta` and `aria-label` ending in `, falta`; the count of `falta` marks equals the count of Mondays, Wednesdays and Fridays in that month. Days that are Mar, Jue, Sáb or Dom have no `<small>` mark.
4. Click a Tuesday button. Assert: chip reads `día extra`, no mark changes in the grid except that this button gets `sel`.
5. Click a Monday button. Assert: chip reads `clase del grupo`.
6. Click **`→`** twice. Assert: heading shows the month after the current one. Every Lun, Mié, Vie button has mark `clase` (class `sch`); there is no `falta` mark. Day panel `h3` still shows the last picked Monday.
7. Click **`←`** once. Assert: heading is `<MesActual> <AñoActual>` again and today's button shows its mark `clase` (if Lun/Mié/Vie) or no mark.
8. Click **`→`** 12 times. Assert: heading shows `<MesActual> <AñoActual + 1>`. Click **`←`** 12 times. Assert: heading is back at `<MesActual> <AñoActual>`.

### TC-06: Group selector (`cgroup`) with a second group
1. Click bottom-nav **`Alumnas`**, click **`+ Nuevo grupo`**.
2. Fill `#gname` with `Grupo QA 2`, leave `#ghora` empty, tick only `Mar` and `Jue`. Click **`Guardar grupo`**. Assert: the new group card is shown with the line `Mar, Jue`.
3. Click bottom-nav **`Calendario`**.
4. Assert: two group buttons exist in this order: `Grupo QA` (class `on`), `Grupo QA 2`.
5. Click **`←`**. Assert: Lun, Mié, Vie days show `falta` for `Grupo QA`.
6. Click **`Grupo QA 2`**. Assert: that button gets `on`, `Grupo QA` loses it. Month heading is unchanged. Now Mar and Jue days show `falta` and Lun, Mié, Vie have no mark.
7. Assert: the day panel muted line reads `Grupo QA 2` (no ` · ` suffix because no hora). `Asistencia` shows chip `0 de 0`, the text `Este grupo todavía no tiene alumnas. Cargalas en Alumnas.`, and neither **`Todas presentes`** nor **`Limpiar`**. `Qué se vio` shows the nine quick buttons but no `Coreografías trabajadas` section.
8. Click **`Grupo QA`**. Assert: the Lun, Mié, Vie `falta` marks return and the `Coreo Alumna QA` button reappears.
9. Click **`→`**. Assert: heading is `<MesActual> <AñoActual>`.

### TC-07: Negative and edge cases
- Open the page with hash `#importar` appended (`http://localhost:8080/#importar`) and then click **`Calendario`**. Assert: the calendar still renders with `Grupo QA` and no error text appears.
- Resize the viewport to 360 px wide. Assert: all 7 weekday header cells (`L M M J V S D`) are visible on one row and day `1` and the last day number are both visible without horizontal page scroll.
- Reload the page, click **`Calendario`**. Assert: both groups and the alumna are still present (data is read from localStorage) and the month shown is `<MesActual> <AñoActual>` (month state is not persisted).

## Assertions
- [ ] Empty state text is exactly `Primero creá un grupo en Alumnas.` and no controls render before a group exists.
- [ ] Heading, helper paragraph, group selector, month heading, nav arrows, 7-column grid, legend and day panel render as listed in TC-03.
- [ ] Today is `today` + `sel` on first open; the day panel heading equals `#dt`.
- [ ] `pickDay` moves `sel` and the panel heading only; month and group do not change.
- [ ] `month` moves by exactly one month per click; 12 clicks move exactly one year; selection does not move.
- [ ] `falta` appears only on scheduled days before today; `clase` only on scheduled days from today on; unscheduled days have no mark.
- [ ] `cgroup` changes marks, panel line and attendance list to the chosen group.
- [ ] No console errors in DevTools at any step.
- [ ] No network requests besides the initial document load, and no 4xx/5xx.

## Screenshots required
- Welcome form
- Calendario empty state
- Calendario with group on first load (today selected)
- Previous month with `falta` marks
- Next month with `clase` marks
- Second group selected with empty attendance text

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
