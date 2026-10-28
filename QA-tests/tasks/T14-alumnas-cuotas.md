# T14-alumnas-cuotas: Monthly fee toggles in the ficha

| Field | Value |
|---|---|
| Route | `/` (tab Alumnas, ficha `rFicha`) |
| Source | `index.html` (rFicha, ACTIONS.cuota, rAlumnas fee chip) |
| Flow | Mark and unmark monthly fees, chip and group counter, persistence |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 36 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous user, no login. No network is needed or used.
- Fresh browser profile: empty localStorage and no cookies.
- Seed data is created through the UI in TC-00 (one group, two students).
- The system month must be Mar to Dic (Ene and Feb have no toggle, so the chip assertions cannot run in those months).

## Test data
- `profeName = "QA Profe"`
- Group: `gname = "Grupo QA"`, level `Intermedio`
- Students: `s1 = "Bruno"`, `s2 = "Camila"`
- `currentMonthLabel` = toggle label of the system month (for example `Oct` in October) and `currentMonth` = its Spanish name used in the group line "Cuota de <currentMonth>"
- `otherMonthLabels = ["Mar", "Abr", "May"]` (if the system month is one of them, replace it with `Jun`)
- Expected toggle order: Mar, Abr, May, Jun, Jul, Ago, Sep, Oct, Nov, Dic (10 buttons)

## Steps

### TC-00: Setup (fresh profile, welcome, seed)
1. Open a new browser context with empty storage. Navigate to `http://localhost:8080`.
2. Fill `#pname` with `QA Profe`, click **`Empezar`**. Click the **`Alumnas`** nav item.
3. Fill `#gname` with `Grupo QA`, select `Intermedio`, click **`Guardar grupo`**.
4. Add `Bruno` and `Camila` with `#newstu` and **`Agregar`**.
5. Assert: "Alumnas (2)", rows Bruno and Camila both with chip "sin cuota", group line ends "Cuota de <currentMonth>: 0 de 2".

### TC-01: Toggles render unpressed
1. Click **`Ficha`** on "Bruno".
2. Assert: heading "Cuotas <current year>" and the text "Tocá el mes para marcarlo como pagado.".
3. Assert: exactly 10 month buttons (`[data-a=cuota]`) in order Mar, Abr, May, Jun, Jul, Ago, Sep, Oct, Nov, Dic. There is no Ene or Feb button.
4. Assert: every month button has `aria-pressed="false"`.
5. Screenshot: all toggles unpressed.

### TC-02: Happy path - Mark the current month as paid
1. Click the `<currentMonthLabel>` toggle.
2. Assert: the ficha stays open (h2 "Bruno"). The toggle has `aria-pressed="true"` and the highlighted (green) style; the other 9 toggles remain `aria-pressed="false"`.
3. Click the same toggle again. Assert: `aria-pressed="false"` again.
4. Click it a third time. Assert: `aria-pressed="true"`.
5. Click **`← Volver al grupo`**.
6. Assert: row "Bruno" shows chip "cuota al día". Row "Camila" shows chip "sin cuota". Group line reads "Cuota de <currentMonth>: 1 de 2".
7. Screenshot: group view with one student up to date.

### TC-03: Other months do not change the chip
1. Click **`Ficha`** on "Camila". Click the toggles `Mar`, `Abr`, `May` (the `otherMonthLabels`), one after another.
2. Assert: each clicked toggle is `aria-pressed="true"`, the others stay `false`, and each click is independent.
3. Click **`← Volver al grupo`**.
4. Assert: "Camila" still shows chip "sin cuota" (only the current month counts). Group line still reads "1 de 2".
5. Click **`Ficha`** on "Camila" and click the `<currentMonthLabel>` toggle. Click **`← Volver al grupo`**.
6. Assert: both students show chip "cuota al día" and the group line reads "Cuota de <currentMonth>: 2 de 2".

### TC-04: Persistence after reload
1. Wait 1 second. Reload the page. Click **`Alumnas`**.
2. Assert: both rows show chip "cuota al día" and the group line reads "2 de 2".
3. Click **`Ficha`** on "Camila". Assert: `Mar`, `Abr`, `May` and `<currentMonthLabel>` have `aria-pressed="true"`; the other 6 are `false`.
4. Evaluate `JSON.parse(localStorage.getItem("cuaderno-liga-v2")).D`. Assert: keys of the form `q:<studentId>:<year>-<MM>` exist for Camila (4 keys with `v` equal to 1).
5. Click the `<currentMonthLabel>` toggle to unmark it. Click **`← Volver al grupo`**. Assert: "Camila" shows chip "sin cuota" and the group line reads "1 de 2".
6. Wait 1 second. Reload, click **`Alumnas`**. Assert: the same state ("Camila" sin cuota, "1 de 2"). Screenshot: final state.

### TC-05: Button coverage
| Button | Action taken | Expected result |
|---|---|---|
| Month toggle (`cuota`) | click | `aria-pressed` flips, state saved, ficha stays open |
| `← Volver al grupo` | click | returns to the group list with updated chips |
| `Guardar` | not needed for fees | fees are saved on click, without **`Guardar`** |

1. Open the ficha of "Bruno", click the `Jun` toggle, click **`← Volver al grupo`** without pressing **`Guardar`**. Reopen the ficha. Assert: `Jun` is `aria-pressed="true"`.

## Assertions
- [ ] The ficha shows 10 fee toggles, Mar to Dic, and none for Ene and Feb.
- [ ] Toggles flip `aria-pressed` on click and save immediately.
- [ ] Chip "cuota al día" and "Cuota de <currentMonth>: n de m" reflect only the current month.
- [ ] State survives a reload.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests, and no network requests other than the initial page load.

## Screenshots required
- Ficha with all toggles unpressed
- Group view with one student up to date
- Ficha with several months pressed
- Final state after reload

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
