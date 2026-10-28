# T34-calendario-plan-link: Armar plan / Ver plan from a calendar day

| Field | Value |
|---|---|
| Route | `/` (bottom-nav tab **Calendario**, panel `#p-calendario`, then tab **Clases**) |
| Source | `/home/claude/cuaderno-patin/index.html` (`dayPanel` button `verPlan`, action `verPlan`, `newDraft`, `savePlan`) |
| Flow | Open the class planner for the selected day, save the plan, come back and reopen it |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 45 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous visitor, no login, no network needed.
- Fresh browser profile: empty localStorage and cookies. Nothing seeded.
- Today as ISO date (`YYYY-MM-DD`) comes from the browser clock. Its long form is in `#dt`.
- Do not click **`Copiar texto`** or any Web Share, `Guardar en Drive`, `Bajar al celular` or `Mandar por WhatsApp` button.

## Test data
- `profeName = "QA Profe"`
- `groupName = "Grupo QA"`, level `Iniciación`, `groupHora = "18:00"`, `groupDays = Lun, Mar, Mié, Jue, Vie, Sáb, Dom` (all seven)
- `studentName = "Alumna QA"`
- Expected draft title: `Clase de Grupo QA`
- Expected template blocks for level `Iniciación` (name, minutes): `Entrada en calor` 10, `Técnica base` 20, `Circuito o juego` 15, `Paso o figura` 10, `Vuelta a la calma` 5. Expected total chip: `Total 60 min`.
- `otherDay` = day number 15 of the previous month

## Steps

### TC-00: Setup, welcome, group and alumna
1. Open a fresh browser profile and navigate to `http://localhost:8080/`.
2. Fill `#pname` with `QA Profe`. Click **`Empezar`**. Assert: `#subttl` reads `Profe QA Profe · Liga`.
3. Click bottom-nav **`Alumnas`**. Fill `#gname` with `Grupo QA`, `#ghora` with `18:00`, tick all seven day checkboxes. Click **`Guardar grupo`**.
4. Fill `#newstu` with `Alumna QA`. Click **`Agregar`**. Assert: card title `Alumnas (1)` and row `Alumna QA`.
5. Click bottom-nav **`Calendario`**.

### TC-01: Happy path, Armar plan opens a prefilled planner and the plan is saved
1. Assert: in the day panel's first card, next to **`Sin clase este día`**, a button labelled **`Armar plan`** is visible (no plan exists yet).
2. Click **`Armar plan`**.
3. Assert: the Clases tab opens (bottom-nav `Clases` has `aria-current="page"`) with heading `Planificador de clases`.
4. Assert: `Título` input (`[data-d="title"]`) value is `Clase de Grupo QA`; `Grupo` select shows `Grupo QA`; `Fecha` input value is today's ISO date; `Plantilla de nivel` shows `Iniciación`.
5. Assert: five blocks are listed with the names and minutes from `Test data`, and the chip reads `Total 60 min`. The primary button reads **`Guardar clase`**.
6. Click **`Guardar clase`**.
7. Assert: `#cmsg` reads `Guardada.` and under `Clases guardadas` a row appears with title `Clase de Grupo QA` and a muted line ending in `· Grupo QA · 60 min`.
8. Wait 1 second, reload the page, click bottom-nav **`Clases`**. Assert: the saved row `Clase de Grupo QA` is still listed.

### TC-02: Ver plan replaces Armar plan once a plan exists
1. Click bottom-nav **`Calendario`**.
2. Assert: the button that was `Armar plan` now reads **`Ver plan`** for today.
3. Click **`Ver plan`**.
4. Assert: Clases tab shows `Título` = `Clase de Grupo QA`, `Fecha` = today's ISO date, the five blocks and `Total 60 min`. The primary button reads **`Guardar cambios`** and a button **`Armar otra`** is visible.
5. Click bottom-nav **`Calendario`**. Assert: today's grid mark is still `clase` (a saved plan does not change the mark), `Asistencia` chip is `0 de 1`.

### TC-03: A different day starts a fresh draft
1. In Calendario click **`←`**, then click day button `15`.
2. Assert: the day panel shows **`Armar plan`** (the plan belongs to today only).
3. Click **`Armar plan`**.
4. Assert: Clases tab shows `Título` = `Clase de Grupo QA`, `Fecha` = the ISO date of day 15 of the previous month, primary button **`Guardar clase`** (not `Guardar cambios`), and no `Armar otra` button.
5. Do not save. Click bottom-nav **`Calendario`**.
6. Assert: the calendar is still on the previous month with button `15` selected, and the day panel still shows **`Armar plan`**.
7. Click **`→`**, click today's button. Assert: the button reads **`Ver plan`**.

### TC-04: Plan link and other day data are independent
1. On today, click the quick item **`Técnica`** and click **`Coreo Alumna QA`**. Click **`Ver plan`**.
2. Assert: the draft is unchanged (`Título` = `Clase de Grupo QA`, `Total 60 min`) and the saved plan list still shows exactly one row.
3. Return to **`Calendario`**. Assert: `Técnica` and `Coreo Alumna QA` still have class `on`.

### TC-05: Negative cases
- In Calendario go to the previous month (**`←`**), click button `15`, click **`Armar plan`**. In the Clases tab clear the `Título` field and click **`Guardar clase`**. Assert: `#cmsg` reads `Poné un título.` and `Clases guardadas` still lists exactly one row.
- Click **`Calendario`** right after the failed save. Assert: day 15 still shows **`Armar plan`**. Click **`→`** and today's button. Assert: today still shows **`Ver plan`** (the plan saved in TC-01 is untouched).

## Assertions
- [ ] `Armar plan` shows when no plan exists for group and day; `Ver plan` shows once one is saved.
- [ ] The planner opens with title `Clase de <group>`, the selected day as `Fecha`, the group's level template, and `Total 60 min`.
- [ ] Saving shows `Guardada.` and lists the plan with `· Grupo QA · 60 min`.
- [ ] Plans do not leak to other days.
- [ ] Returning to Calendario keeps month, group and selected day.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx).

## Screenshots required
- Calendario with `Armar plan`
- Planner prefilled from the calendar day
- Planner after `Guardada.`
- Calendario with `Ver plan`
- Day 15 with `Armar plan` after returning without saving

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
