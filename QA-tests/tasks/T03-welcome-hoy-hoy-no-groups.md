# T03-welcome-hoy-hoy-no-groups: Hoy tab with no groups

| Field | Value |
|---|---|
| Route | `/` (tab Hoy) |
| Source | `index.html` (rHoy) |
| Flow | Hoy empty state and its two call-to-action buttons |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 20 |

## Preconditions
- App running at `http://localhost:8080`
- Role: anonymous
- Fresh browser profile: empty localStorage, no groups, no network calls
- Do not click any Web Share or download button

## Test data
- `pname = "QA Profe"`
- Expected heading: `Buen día, QA Profe`

## Steps

### TC-01: Happy path, empty Hoy renders
1. Navigate to `http://localhost:8080/` in a fresh profile at viewport 390x800.
2. Fill `#pname` with `QA Profe` and click **`Empezar`**.
3. Assert: the tab Hoy is active in `#bnav` (`[data-a=go][data-id=hoy]`).
4. Assert: heading `Buen día, QA Profe` is visible.
5. Assert: a card titled `Primer paso` is visible and contains button `[data-a=newGroup]` labelled `Crear mi primer grupo`.
6. Assert: a card titled `Sincronizar con la otra profe` is visible and contains button `[data-a=goSync]` labelled `Sincronizar`.
7. Assert: the text `Todo compartido. No hay cambios nuevos tuyos.` is visible.
8. Assert: no card with `Pasar lista` or `Ver plan` and no week strip of `goDay#` buttons is shown.
9. Reload. Assert: the same empty Hoy state renders and the gate is not shown.

### TC-02: Button `Crear mi primer grupo`
1. From the empty Hoy state, click **`Crear mi primer grupo`** (`[data-a=newGroup]`).
2. Assert: the app switches to the tab Alumnas (`[data-a=go][data-id=alumnas]` is active) and the group creation form is visible.
3. Do NOT submit the form. Click `[data-a=go][data-id=hoy]`.
4. Assert: Hoy still shows the empty state (`Primer paso` card present), so no group was created.

### TC-03: Button `Sincronizar`
1. From the empty Hoy state, click **`Sincronizar`** (`[data-a=goSync]`).
2. Assert: the app switches to the tab Más (`[data-a=go][data-id=mas]` is active) and the Sincronizar section is visible.
3. Do NOT click any Web Share, export or download control inside it.
4. Click `[data-a=go][data-id=hoy]`. Assert: the empty Hoy state is shown again.

## Assertions
- [ ] Heading `Buen día, QA Profe` and cards `Primer paso` and `Sincronizar con la otra profe` render.
- [ ] `Todo compartido. No hay cambios nuevos tuyos.` is visible.
- [ ] `Crear mi primer grupo` goes to the Alumnas group form; `Sincronizar` goes to Más > Sincronizar.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx).

## Screenshots required
- Page initial load (Hoy empty state)
- Alumnas group form after `Crear mi primer grupo`
- Más > Sincronizar after `Sincronizar`
- Final state back on Hoy

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
