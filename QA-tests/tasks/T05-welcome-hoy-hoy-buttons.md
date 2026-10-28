# T05-welcome-hoy-hoy-buttons: Button coverage on Hoy with one group

| Field | Value |
|---|---|
| Route | `/` (tab Hoy) |
| Source | `index.html` (rHoy) |
| Flow | Pasar lista, Ver plan and week-day navigation |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 24 |

## Preconditions
- App running at `http://localhost:8080`
- Role: anonymous
- Fresh browser profile: empty localStorage, no network calls
- Setup (repeat in each TC, or reuse one session and return to Hoy between rows): enter name `QA Profe`, click `Crear mi primer grupo`, create group `Grupo QA` with class day = today's weekday and time `18:00` (same setup as T04 TC-01), open Hoy. Card `18:00 Grupo QA` must be visible.
- Do not click any Web Share or download button

## Test data
- `pname = "QA Profe"`
- `groupName = "Grupo QA"`, `groupTime = "18:00"`, class day = today's weekday
- Week strip buttons: `[data-a=goDay]` with `data-id = YYYY-MM-DD`

## Steps

### TC-01: Happy path, Pasar lista
1. Complete the setup and be on Hoy.
2. Click **`Pasar lista`** (`[data-a=pasarLista]` of `Grupo QA`).
3. Assert: the app switches to the tab Calendario (`[data-a=go][data-id=calendario]` is active).
4. Assert: the Calendario view shows today's date and the class `Grupo QA` for today, ready for taking attendance (read the visible heading and record it).
5. Click `#bnav [data-a=go][data-id=hoy]`. Assert: card `18:00 Grupo QA` is still shown.

### TC-02: Button coverage
| Button | Action taken | Expected result |
|---|---|---|
| `Pasar lista` (`pasarLista#<gid>`) | click | Goes to tab Calendario on today's class of `Grupo QA` |
| `Ver plan` (`verPlan#<gid>`) | click | Goes to tab Clases (`[data-a=go][data-id=clases]` active) showing the plan for `Grupo QA` |
| Week strip, today's `goDay#YYYY-MM-DD` | click | Goes to Calendario on today's date |
| Week strip, Lun `goDay#...` | click | Goes to Calendario on that Monday's date |
| Week strip, Dom `goDay#...` | click | Goes to Calendario on that Sunday's date |

For each row: start from Hoy, re-query the selector (panels re-render on every action), click, assert the destination tab is active and the date or group shown matches, then return to Hoy via `#bnav [data-a=go][data-id=hoy]`.

### TC-03: Back-and-forth stability
1. From Hoy click `Ver plan`, return to Hoy, click `Pasar lista`, return to Hoy.
2. Assert: card `18:00 Grupo QA` and 7 week-strip buttons are still rendered, no duplicated cards.
3. Assert: localStorage key `cuaderno-liga-v2` still contains exactly one group named `Grupo QA`.

## Assertions
- [ ] `Pasar lista` goes to Calendario; `Ver plan` goes to Clases; each `goDay` goes to Calendario on its date.
- [ ] Hoy re-renders intact after each navigation round trip.
- [ ] No attendance is recorded by only opening Calendario (do not save any attendance in this task).
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx).

## Screenshots required
- Hoy before clicks
- Calendario after `Pasar lista`
- Clases after `Ver plan`
- Calendario after a week-strip day click
- Final state back on Hoy

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
