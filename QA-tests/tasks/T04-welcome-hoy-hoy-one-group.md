# T04-welcome-hoy-hoy-one-group: Hoy tab with one group scheduled today

| Field | Value |
|---|---|
| Route | `/` (tab Hoy) |
| Source | `index.html` (rHoy) |
| Flow | Create first group, then view the class card and week strip on Hoy |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 22 |

## Preconditions
- App running at `http://localhost:8080`
- Role: anonymous
- Fresh browser profile: empty localStorage, no network calls
- The group is created through the UI (no manual localStorage editing). Field labels of the group form in Alumnas were not confirmed in the analysis, so the runner uses the visible labels of the form and records them in the run report.
- Do not click any Web Share or download button

## Test data
- `pname = "QA Profe"`
- `groupName = "Grupo QA"`
- `groupDay = today's weekday` (resolve at run time from the browser date; the group MUST be a class day today)
- `groupTime = "18:00"`
- Expected class card text: `18:00 Grupo QA`

## Steps

### TC-01: Happy path, create the group and see it on Hoy
1. Navigate to `http://localhost:8080/` in a fresh profile at viewport 390x800.
2. Fill `#pname` with `QA Profe` and click **`Empezar`**.
3. Click **`Crear mi primer grupo`** (`[data-a=newGroup]`). Assert: the Alumnas group form is visible.
4. Fill every field of the group form: name = `Grupo QA`, class day = today's weekday, start time = `18:00`. Leave any other field at its default or fill it with a plain valid value (record it).
5. Click the form's save/submit button (use its visible label, record it).
6. Assert: the group `Grupo QA` appears in the Alumnas tab and the form closes or resets.
7. Click `#bnav [data-a=go][data-id=hoy]`.
8. Assert: heading `Buen día, QA Profe` is visible.
9. Assert: a card titled `18:00 Grupo QA` is visible with buttons `Pasar lista` (`[data-a=pasarLista]`, `data-id` is the group id) and `Ver plan` (`[data-a=verPlan]`).
10. Assert: the empty-state card `Primer paso` / `Crear mi primer grupo` is no longer shown.
11. Reload. Assert: the card `18:00 Grupo QA` is still shown on Hoy and the gate is not shown.

### TC-02: Week strip
1. On Hoy from TC-01, locate the week strip.
2. Assert: it contains exactly 7 buttons `[data-a=goDay]`, each with `data-id` in format `YYYY-MM-DD`, labelled Lun, Mar, Mié, Jue, Vie, Sáb, Dom in that order (read exact labels from the page).
3. Assert: exactly one button is marked as today, and its date equals the browser's current local date.
4. Assert: the 7 dates are consecutive days of the current week (Monday to Sunday).

### TC-03: Class card absent on a non-class day (data check)
1. Open the Alumnas tab and edit `Grupo QA` so its class day is a weekday other than today (use the form's own edit/save controls).
2. Go to Hoy. Assert: the card `18:00 Grupo QA` with `Pasar lista` is not shown today.
3. Restore the class day to today's weekday and save. Go to Hoy. Assert: `18:00 Grupo QA` is shown again.

## Assertions
- [ ] Card `18:00 Grupo QA` with `Pasar lista` and `Ver plan` renders on a class day.
- [ ] Week strip has 7 `goDay#YYYY-MM-DD` buttons and today is marked.
- [ ] Group persists after reload.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx).

## Screenshots required
- Alumnas group form filled
- Hoy with the class card and week strip
- State after reload
- Hoy on a non-class day (TC-03)

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
