# T01-welcome-hoy-name-gate: Welcome gate happy path, save the profe name

| Field | Value |
|---|---|
| Route | `/` (welcome gate) |
| Source | `index.html` (rWelcome) |
| Flow | First visit: enter name and press Empezar |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 14 |

## Preconditions
- App running at `http://localhost:8080`
- Role: anonymous (no login exists in this app)
- Fresh browser profile: empty localStorage (key `cuaderno-liga-v2` absent), no cookies, no network calls required
- Do not click any Web Share or download button

## Test data
- `pname = "QA Profe"`
- Expected heading on Hoy: `Buen día, QA Profe`
- Expected `#subttl`: `Profe QA Profe · Liga`
- Expected localStorage key: `cuaderno-liga-v2`

## Steps

### TC-01: Happy path, save the name and enter the app
1. Open a fresh browser profile (empty localStorage) at viewport 390x800. Navigate to `http://localhost:8080/`.
2. Assert: the welcome gate is shown, field `#pname` is visible with placeholder `Tu nombre de pila`, button `[data-a=setProfe]` with label `Empezar` is visible.
3. Assert: `#perr` is empty or not visible.
4. Assert: localStorage has no key `cuaderno-liga-v2` with a saved name.
5. Fill `#pname` with `QA Profe`.
6. Click **`Empezar`** (`[data-a=setProfe]`).
7. Assert: the welcome gate disappears and the tab Hoy is shown.
8. Assert: `#subttl` text is `Profe QA Profe · Liga`.
9. Assert: heading `Buen día, QA Profe` is visible.
10. Assert: bottom nav `#bnav` shows the six buttons `[data-a=go]` with `data-id` hoy, clases, calendario, coreos, alumnas, mas.
11. Assert: localStorage key `cuaderno-liga-v2` exists and its JSON contains the name `QA Profe`.
12. Reload the page.
13. Assert: the welcome gate is NOT shown, `#subttl` is still `Profe QA Profe · Liga`, heading `Buen día, QA Profe` is visible.

### TC-02: Gate is shown on every tab until a name is saved
1. Open a fresh browser profile and navigate to `http://localhost:8080/`.
2. Click each `#bnav [data-a=go]` button in turn (`data-id` = clases, calendario, coreos, alumnas, mas), re-querying the selector after every click.
3. Assert: after each click the welcome gate (`#pname` and `Empezar`) is still shown instead of the tab content.

### TC-03: Name with surrounding spaces is trimmed
1. Open a fresh browser profile and navigate to `http://localhost:8080/`.
2. Fill `#pname` with `  QA Profe  ` (two spaces before and after).
3. Click **`Empezar`**.
4. Assert: `#subttl` is `Profe QA Profe · Liga` (no extra spaces) and heading is `Buen día, QA Profe`.

## Assertions
- [ ] Welcome gate renders on first load with `#pname`, placeholder `Tu nombre de pila`, button `Empezar`.
- [ ] After a valid submit `#subttl` is `Profe QA Profe · Liga`.
- [ ] Name persists in localStorage `cuaderno-liga-v2` and survives reload.
- [ ] No console errors in DevTools at any step.
- [ ] No network requests are needed; no failed requests (no 4xx/5xx).

## Screenshots required
- Page initial load (welcome gate)
- Gate shown on another tab (TC-02)
- Final state after Empezar (Hoy with heading)
- State after reload

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
