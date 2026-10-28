# T35-calendario-sync-prompt: The 25 second "Sincronizás con la otra profe?" snackbar (#ask)

| Field | Value |
|---|---|
| Route | `/` (bottom-nav tab **Calendario**, panel `#p-calendario`, snackbar container `#ask`) |
| Source | `/home/claude/cuaderno-patin/index.html` (`armAsk`, `renderAsk`, actions `goSync`, `askNo`, and the calendar actions `att`, `attAll`, `logItem`, `addFree`, `saveNota` that call `armAsk`) |
| Flow | Change attendance or log, wait 25 seconds, answer the sync prompt |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 60 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous visitor, no login, no network needed.
- Fresh browser profile: empty localStorage and cookies. Nothing seeded.
- This task uses real waiting time (about 3 minutes in total). Use the browser clock, not fake timers.
- The TCs must run in the order written, in one profile. TC-06 stores `askNo` for the current day, which disables the prompt for the rest of that day, so it is last.
- Never click **`Guardar en Drive`**, **`Bajar al celular`**, **`Mandar por WhatsApp`**, **`Copiar el mensaje`** or **`Elegir el archivo`** on the Sincronizar screen. Only read it.

## Test data
- `profeName = "QA Profe"`
- `groupName = "Grupo QA"`, level `Iniciación`, `groupHora = "18:00"`, `groupDays = Lun, Mar, Mié, Jue, Vie, Sáb, Dom` (all seven)
- `studentName = "Alumna QA"`
- `promptText = "Terminó la clase. ¿Sincronizás con la otra profe?"`
- Buttons in the prompt: **`Sincronizar`**, **`Ahora no`**
- `storageKey = "cuaderno-liga-v2"`; the stored JSON has the field `askNo`, which is `""` until **`Ahora no`** is clicked and then today's ISO date.

## Steps

### TC-00: Setup, welcome, group and alumna
1. Open a fresh browser profile and navigate to `http://localhost:8080/`.
2. Fill `#pname` with `QA Profe`. Click **`Empezar`**. Assert: `#subttl` reads `Profe QA Profe · Liga`.
3. Click bottom-nav **`Alumnas`**. Fill `#gname` with `Grupo QA`, `#ghora` with `18:00`, tick all seven day checkboxes. Click **`Guardar grupo`**.
4. Fill `#newstu` with `Alumna QA`. Click **`Agregar`**. Assert: card title `Alumnas (1)` and row `Alumna QA`.
5. Click bottom-nav **`Calendario`**.
6. Assert: `#ask` is empty (no `.ask` element). Wait 30 seconds without touching anything. Assert: `#ask` is still empty (creating the group and alumna did not arm the prompt).

### TC-01: Happy path, prompt appears 25 seconds after an attendance change
1. At time `t0` click the round button `Presente: Alumna QA`.
2. Assert at `t0 + 10 s`: `#ask` is still empty.
3. Assert at `t0 + 20 s`: `#ask` is still empty.
4. Wait until `t0 + 28 s`. Assert: `#ask` contains an element `.ask` with `role="status"`, text `Terminó la clase. ¿Sincronizás con la otra profe?`, and two buttons **`Sincronizar`** and **`Ahora no`** (the second has the ghost style).
5. Click bottom-nav **`Hoy`**, then **`Calendario`**. Assert: the prompt stays visible on both tabs.
6. Assert: the calendar state is unchanged (`Presente: Alumna QA` is `aria-pressed="true"`, chip `1 de 1`).

### TC-02: Sincronizar button
1. Click **`Sincronizar`** inside the prompt.
2. Assert: `#ask` is empty. The bottom-nav `Más` button has `aria-current="page"`. Heading `Sincronizar` is visible.
3. Assert: the first card text matches `N cambios tuyos sin compartir.` with `N` a number greater than 0 (a fresh profile has unshared changes), and the muted line reads `Todavía no compartiste nada.`
4. Click **`← Más`**, then bottom-nav **`Calendario`**. Assert: `#ask` is still empty.
5. Wait 30 seconds without touching anything. Assert: `#ask` stays empty (the prompt does not reappear without a new change).

### TC-03: Timer restarts on every new change
1. At time `t1` click the quick item **`Técnica`**.
2. At `t1 + 15 s` click the quick item **`Juegos`**.
3. Assert at `t1 + 30 s` (15 s after the last click): `#ask` is empty. The first timer would have fired at `t1 + 25 s`, so a visible prompt here is a failure.
4. Assert at `t1 + 45 s` (30 s after the last click): the prompt with `promptText` is visible.
5. Click **`Hoy`** tab then **`Calendario`**. Assert: prompt still visible.

### TC-04: Reload clears the prompt and the pending timer
1. With the prompt visible from TC-03, reload the page.
2. Assert: `#ask` is empty right after the reload and stays empty after clicking **`Calendario`**.
3. Click the quick item **`Saltos`**. Within 5 seconds reload the page and click **`Calendario`**.
4. Wait 30 seconds. Assert: `#ask` is empty (the pending timer died with the page; unshared changes alone do not show the prompt).
5. Assert: `Técnica`, `Juegos` and `Saltos` have class `on` (the data is kept even though the prompt is gone).

### TC-05: Which actions arm the prompt
Start each row with the page freshly reloaded and **`Calendario`** open so no timer is running.

| Action | Expected after waiting 28 s |
|---|---|
| Click **`Todas presentes`** | prompt visible |
| Reload, fill `#free` with `Juego de la soga`, click **`Agregar`** | prompt visible |
| Reload, fill `#nota` with `Repasar la entrada`, click **`Guardar nota`** | prompt visible |
| Reload, click **`Limpiar`** | prompt not visible |
| Reload, click another day button, click **`←`**, click **`→`** | prompt not visible |
| Reload, click **`Alumnas`** then **`Calendario`** | prompt not visible |

### TC-06: Ahora no button
1. Reload, click **`Calendario`**, click the quick item **`Evaluación`**. Wait until the prompt is visible (up to 30 s).
2. Click **`Ahora no`**.
3. Assert: `#ask` becomes empty. No navigation happens (the Calendario tab is still the current tab).
4. Read `localStorage["cuaderno-liga-v2"]` and parse it. Assert: `askNo` equals today's ISO date (`YYYY-MM-DD`).
5. Click the quick item **`Trompos`**. Wait 30 seconds. Assert: `#ask` stays empty (the answer `Ahora no` silences the prompt for the rest of the day).
6. Reload, click **`Calendario`**, click **`Figuras`**. Wait 30 seconds. Assert: `#ask` stays empty after the reload as well.
7. Click bottom-nav **`Más`**, **`Sincronizar`** tile. Assert: the card still shows `N cambios tuyos sin compartir.` with `N` greater than 0 (the data is not marked as shared by `Ahora no`). Do not click any button on that screen.

## Assertions
- [ ] `#ask` is empty at load, after setup and after non-arming actions.
- [ ] After `att`, `attAll`, `logItem`, `addFree` or `saveNota`, the prompt appears 25 seconds after the last such action and not before.
- [ ] `Limpiar`, `pickDay`, `month` and tab changes do not arm the prompt.
- [ ] `Sincronizar` hides the prompt and opens Más > Sincronizar.
- [ ] `Ahora no` hides the prompt and stores `askNo` = today so it does not return that day, including after reload.
- [ ] Reload removes a visible prompt and any pending timer.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx).

## Screenshots required
- Calendario right after the click, before 25 s (no prompt)
- Prompt visible on Calendario
- Prompt visible on Hoy
- Sincronizar screen after clicking `Sincronizar`
- Calendario after `Ahora no`

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
