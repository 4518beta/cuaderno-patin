# T06-welcome-hoy-sync-snackbar: Sync reminder snackbar `#ask` after class actions

| Field | Value |
|---|---|
| Route | `/` (tab Hoy) |
| Source | `index.html` (rHoy, `#ask`) |
| Flow | Unshared changes trigger the snackbar after 25 s; "Ahora no" suppresses it for the day |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 20 |

## Preconditions
- App running at `http://localhost:8080`
- Role: anonymous
- Fresh browser profile: empty localStorage, no network calls
- Setup: enter name `QA Profe`, create group `Grupo QA` (class day = today's weekday, time `18:00`) as in T04 TC-01, then open Hoy.
- Do not click any Web Share or download button, including any share/export control in Más > Sincronizar.

## Test data
- `pname = "QA Profe"`, `groupName = "Grupo QA"`, `groupTime = "18:00"`
- Action that creates an unshared change: mark attendance (or add a log entry) for today's class of `Grupo QA`. Use the first attendance or log control visible, record which was used. If the group has no students, add one student `Alumna QA` in Alumnas first.
- Snackbar text: `Terminó la clase. ¿Sincronizás con la otra profe?`
- Dismiss button label: `Ahora no`
- Wait time: 25 s (allow up to 30 s)

## Steps

### TC-01: Happy path, snackbar appears after 25 s
1. Complete the setup. On Hoy assert: `#ask` is not visible and the text `Todo compartido. No hay cambios nuevos tuyos.` is shown (no groups changes yet) or the `Sincronizar con la otra profe` card is present.
2. Click **`Pasar lista`**, mark attendance for at least one student in today's class and save it using the visible control (do not use any share control).
3. Return to Hoy via `#bnav [data-a=go][data-id=hoy]`. Assert: `Todo compartido. No hay cambios nuevos tuyos.` is no longer shown (there are unshared changes).
4. Wait 25 seconds without further interaction. Wait up to 30 s.
5. Assert: `#ask` is visible with text `Terminó la clase. ¿Sincronizás con la otra profe?` and a button `Ahora no`.

### TC-02: `Ahora no` suppresses it for the day
1. With `#ask` visible from TC-01, click **`Ahora no`**.
2. Assert: `#ask` is hidden.
3. Perform another attendance action (change one mark and save), then wait 30 seconds.
4. Assert: `#ask` does not appear again.
5. Reload the page and repeat the action and the 30 s wait. Assert: `#ask` still does not appear today.

### TC-03: No snackbar without unshared changes
1. Use a fresh profile. Enter name `QA Profe` and create `Grupo QA`, but take no attendance and add no log.
2. Go to Hoy and wait 30 seconds.
3. Assert: `#ask` never appears.

## Assertions
- [ ] `#ask` appears about 25 s after an attendance or log action when there are unshared changes.
- [ ] `#ask` text is `Terminó la clase. ¿Sincronizás con la otra profe?`.
- [ ] `Ahora no` hides `#ask` and suppresses it for the rest of the day, also after reload.
- [ ] `#ask` does not appear when there are no unshared changes.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx).

## Screenshots required
- Hoy before the action
- Hoy right after the action (change detected)
- `#ask` visible after 25 s
- State after `Ahora no`

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
