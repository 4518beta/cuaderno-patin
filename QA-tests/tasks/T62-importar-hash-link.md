# T62-importar-hash-link: Loading /#importar opens Sincronizar (hash read once at boot)

| Field | Value |
|---|---|
| Route | `/#importar` |
| Source | `/home/claude/cuaderno-patin/index.html` (boot, rWelcome, ACTIONS.setProfe, ACTIONS.copyWaMsg, importLink) |
| Flow | Open the WhatsApp link with and without a saved name; check that the hash is read only at load |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 44 |

## Preconditions
- App running at `http://localhost:8080`
- Role: anonymous.
- Fresh browser profile: new browser context with empty localStorage, no cookies, no network access besides `localhost:8080`.
- Clipboard: grant `clipboard-read` and `clipboard-write` to `http://localhost:8080` when the runner allows it (used only in TC-05).
- No import file is needed. Temp folder is not used by this task.

## Test data
- `profeName = "QA Profe"`
- `deepLink = "http://localhost:8080/#importar"`
- Non-matching URLs (all must open Hoy): `http://localhost:8080/#Importar`, `http://localhost:8080/#importar/`, `http://localhost:8080/#sync`, `http://localhost:8080/#`
- Expected copied message: "Cuaderno de Patín: copia de QA Profe. Para sumarla a tu cuaderno, tocá este link y elegí el archivo que te mandé: http://localhost:8080/#importar"

## Steps

### TC-01: Happy path - first visit through the link, no saved name
1. Open a new browser context (empty localStorage). Navigate to `deepLink` as the very first URL.
2. Assert: `h2` "Bienvenida" is visible (the welcome gate comes first), `#pname` is visible, and `h2` "Sincronizar" is not in the page.
3. Take a screenshot of the welcome gate.
4. Click **`Empezar`** with `#pname` empty.
5. Assert: `#perr` reads "Escribí tu nombre." and the gate is still shown.
6. Fill `#pname` with `QA Profe`. Click **`Empezar`**.
7. Assert: `h2` "Sincronizar" is visible (the app lands on Más > Sincronizar, not on Hoy), a **`← Más`** button is visible, `#impin` exists, and the `Más` nav button has `aria-current="page"`.
8. Assert: `#subttl` reads "Profe QA Profe · Liga" and `location.href` still ends with `#importar`.
9. Take a screenshot of Sincronizar.

### TC-02: Link with a saved name
1. With the name saved, reload the page (the URL still ends with `#importar`).
2. Assert: the welcome gate is not shown; `h2` "Sincronizar" is visible directly; `#impin` exists.
3. Click **`← Más`**. Assert: `h2` "Más" (the menu) is visible and `location.hash` is still `#importar`.
4. Reload the page. Assert: `h2` "Sincronizar" is visible again (the hash is applied on every load).

### TC-03: Hash is read only once at load (no hashchange listener)
1. Open a new tab in the same browser context. Navigate to `http://localhost:8080/` (no hash).
2. Assert: `h2` "Buen día, QA Profe" is visible (Hoy).
3. Evaluate `location.hash = "#importar"`.
4. Assert: the page still shows `h2` "Buen día, QA Profe"; `h2` "Sincronizar" is not shown (changing the hash after load does nothing).
5. Reload the page. Assert: `h2` "Sincronizar" is visible.
6. Click the bottom nav button **`Hoy`**. Evaluate `location.hash = ""` and then `location.hash = "#importar"`. Assert: the page still shows Hoy.

### TC-04: Non-matching hashes do not open Sincronizar
1. For each URL in the "Non-matching URLs" list: open a new tab in the same context and navigate to it as a fresh load.
2. Assert: `h2` "Buen día, QA Profe" is visible (Hoy) and `h2` "Sincronizar" is not in the page.
3. Close the tab.

### TC-05: The link copied by the app opens Sincronizar
1. In the first tab, click **`Hoy`**, then open Más > Sincronizar (click **`Más`**, then the tile **`Sincronizar`**).
2. Click **`Copiar el mensaje`**. Assert: `#smsg2` reads "Copiado".
3. Read the clipboard. Assert: it equals the expected copied message and ends with `deepLink`.
4. Open a new tab and navigate to the URL found at the end of the clipboard text. Assert: `h2` "Sincronizar" is visible.
5. If clipboard permission is not available: build the URL from `deepLink` and run step 4 only; note that the copy check was skipped.

### TC-06: Negative and edge cases
- Query string before the hash: navigate in a new tab to `http://localhost:8080/?src=wa#importar`. Assert: `h2` "Sincronizar" is visible.
- Read `localStorage` key `cuaderno-liga-v2` at the end. Assert: `D` equals `{}` and `profe = "QA Profe"` (opening the link writes no data).

## Assertions
- [ ] Without a saved name, `/#importar` shows the welcome gate first; after "Empezar" the app opens Sincronizar.
- [ ] With a saved name, `/#importar` opens Sincronizar directly on every load.
- [ ] Changing `location.hash` after load does not change the screen.
- [ ] Hashes other than exactly `#importar` open Hoy.
- [ ] The link inside "Copiar el mensaje" opens Sincronizar.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx) except where explicitly expected.

## Screenshots required
- Welcome gate loaded from `/#importar`
- Sincronizar after "Empezar"
- Hoy after changing the hash without reloading
- Final state after TC-06

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
