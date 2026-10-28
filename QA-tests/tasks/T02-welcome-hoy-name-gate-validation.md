# T02-welcome-hoy-name-gate-validation: Form validation, welcome gate name field

| Field | Value |
|---|---|
| Route | `/` (welcome gate) |
| Source | `index.html` (rWelcome) |
| Flow | Form validation, `#pname` |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 16 |

## Preconditions
- App running at `http://localhost:8080`
- Role: anonymous
- Fresh browser profile: empty localStorage for every TC (clear storage and reload between TCs), no network calls
- Do not click any Web Share or download button

## Test data
- `emptyName = ""`
- `whitespaceName = "     "` (5 spaces)
- `longName = "A" × 45` (45 characters, maxlength is 40)
- `expectedTruncated = "A" × 40`
- `validName = "QA Profe"`
- Expected error text: `Escribí tu nombre.`

## Steps

### TC-01: Empty name is rejected
1. Navigate to `http://localhost:8080/` in a fresh profile.
2. Leave `#pname` empty.
3. Click **`Empezar`** (`[data-a=setProfe]`).
4. Assert: `#perr` (role=alert) is visible with text `Escribí tu nombre.`
5. Assert: the welcome gate is still shown, `#subttl` has not changed to a `Profe ... · Liga` value.
6. Assert: localStorage key `cuaderno-liga-v2` contains no saved name (absent, or name empty).

### TC-02: Whitespace-only name is rejected
1. Reload with cleared localStorage.
2. Fill `#pname` with `whitespaceName` (5 spaces).
3. Click **`Empezar`**.
4. Assert: `#perr` shows `Escribí tu nombre.`
5. Assert: the gate is still shown and nothing is saved in localStorage.

### TC-03: Max length 40
1. Reload with cleared localStorage.
2. Assert: `#pname` has attribute `maxlength="40"`.
3. Type (keyboard, not programmatic fill) `longName` (45 × "A") into `#pname`.
4. Assert: the field value length is 40 and equals `expectedTruncated`.
5. Click **`Empezar`**.
6. Assert: the gate disappears, `#subttl` is `Profe ` + 40 × "A" + ` · Liga`.
7. Assert: stored name in `cuaderno-liga-v2` is 40 characters long.

### TC-04: Error clears after a valid submit
1. Reload with cleared localStorage.
2. Click **`Empezar`** with `#pname` empty. Assert `#perr` shows `Escribí tu nombre.`
3. Fill `#pname` with `QA Profe` and click **`Empezar`**.
4. Assert: gate disappears, `#subttl` is `Profe QA Profe · Liga`, heading `Buen día, QA Profe` is visible, the text `Escribí tu nombre.` is no longer on the page.

### Validation matrix summary
| Field | Empty value error | Whitespace-only error | Max-length overflow |
|---|---|---|---|
| `#pname` | `Escribí tu nombre.` | `Escribí tu nombre.` | Input truncated to 40 characters by `maxlength`, no error |

## Assertions
- [ ] Empty and whitespace-only submit show `Escribí tu nombre.` in `#perr` and save nothing.
- [ ] `#pname` enforces maxlength 40.
- [ ] Error disappears after a valid submit.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx).

## Screenshots required
- Page initial load
- Empty-name error state
- Whitespace-only error state
- Field after typing 45 characters (40 kept)
- Final state after valid submit

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
