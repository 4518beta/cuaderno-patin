# T50-mas-menu-subpantallas: Más tab menu and sub-screen navigation

| Field | Value |
|---|---|
| Route | `/` (tab Más, `ui.tab=mas`) |
| Source | `/home/claude/cuaderno-patin/index.html` (rMas, SUBS, ACTIONS.sub, go) |
| Flow | Open Más, enter each of the 5 sub-screens, return with "← Más" and with the bottom nav |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 38 |

## Preconditions
- App running at `http://localhost:8080`
- Role: anonymous (the app has no login; the only gate is the welcome form).
- Fresh browser profile: new browser context with empty localStorage, no cookies, no network access besides `localhost:8080`.
- No seed data. The welcome form is completed in TC-01 with `QA Profe`.
- TC-02 to TC-04 continue in the same browser context as TC-01 unless a step says "reload".

## Test data
- `profeName = "QA Profe"`
- Menu tiles (title / subtitle / sub-screen heading), in this order:

| Tile `data-id` | Title (`<b>`) | Subtitle (`.hand`) | Sub-screen `h2` |
|---|---|---|---|
| `sync` | Sincronizar | con la otra profe | Sincronizar |
| `mensajes` | Mensajes | para familias | Mensajes |
| `reglamento` | Reglamento | CAP 2024 | Reglamento |
| `aviso` | Aviso a familias | texto para mandar | Aviso a familias |
| `ajustes` | Ajustes | tu nombre y datos | Ajustes |

## Steps

### TC-01: Happy path - open each sub-screen from the Más menu and come back
1. Open a new browser context (empty localStorage). Navigate to `http://localhost:8080/`.
2. Assert: `h2` "Bienvenida" is visible, `#pname` has placeholder "Tu nombre de pila", button "Empezar" is visible, and the bottom nav `#bnav` shows 6 buttons: Hoy, Clases, Calendario, Coreos, Alumnas, Más.
3. Fill `#pname` with `QA Profe`.
4. Click **`Empezar`**.
5. Assert: `#subttl` reads "Profe QA Profe · Liga" and `h2` reads "Buen día, QA Profe".
6. Click the bottom nav button **`Más`** (`[data-a=go][data-id=mas]`).
7. Assert: `h2` "Más" is visible, the `Más` nav button has `aria-current="page"`, and exactly 5 `.tile` buttons exist with the titles and subtitles from the `Test data` table, in that order.
8. Assert: `location.hash` is empty (the URL did not change).
9. For each row of the `Test data` table, in order, do steps 10 to 13.
10. Click the tile with that title (`[data-a=sub][data-id=<id>]`).
11. Assert: `h2` equals the "Sub-screen `h2`" column, and a button **`← Más`** (`.back`, `[data-a=go][data-id=mas]`) is visible above it.
12. Click **`← Más`**.
13. Assert: `h2` "Más" is visible again and the 5 tiles are shown.
14. Take a screenshot of the Más menu.

### TC-02: Bottom nav behavior while inside a sub-screen
1. On the Más menu, click the tile **`Ajustes`**. Assert: `h2` "Ajustes" is visible.
2. Click the bottom nav button **`Más`**. Assert: `h2` "Más" is visible (menu, not Ajustes) and `.tile` count is 5.
3. Click the tile **`Mensajes`**. Assert: `h2` "Mensajes" is visible.
4. Click the bottom nav button **`Hoy`**. Assert: `h2` "Buen día, QA Profe" is visible and the `Hoy` nav button has `aria-current="page"`.
5. Click the bottom nav button **`Más`**. Assert: the Más menu is shown (`h2` "Más"), not the Mensajes sub-screen.
6. Click the tile **`Reglamento`**, then click the bottom nav button **`Alumnas`**, then click **`Más`**. Assert: `h2` "Más" is shown (the sub-screen is reset when leaving the tab).

### TC-03: State after reload
1. Click the tile **`Aviso a familias`**. Assert: `h2` "Aviso a familias" is visible.
2. Reload the page.
3. Assert: the welcome form is not shown, `#subttl` reads "Profe QA Profe · Liga", `h2` reads "Buen día, QA Profe" (the app opens on Hoy and the sub-screen is not remembered).
4. Open `localStorage` key `cuaderno-liga-v2`. Assert: JSON has `profe = "QA Profe"`, `fmt = 2`, and `D` equals `{}`.

### TC-04: Negative and edge cases
- Rapid double click on a tile: click **`Mensajes`** twice in a row. Assert: `h2` "Mensajes" is shown once, no duplicated content, one `← Más` button.
- Sub-screens add no history entries: open **`Mensajes`**, then read `history.length` before and after clicking **`← Más`**. Assert: both values are equal.
- Keyboard: focus the tile **`Ajustes`** with Tab and press Enter. Assert: `h2` "Ajustes" is visible.

## Assertions
- [ ] Más menu shows exactly 5 tiles with the titles and subtitles in `Test data`.
- [ ] Each tile opens its sub-screen heading and each sub-screen has a `← Más` button that returns to the menu.
- [ ] Bottom nav `Más` always returns to the menu, never to the previous sub-screen.
- [ ] The URL hash never changes while navigating (stays empty).
- [ ] `localStorage` `D` stays `{}` for the whole task (navigation writes no data).
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx) except where explicitly expected.

## Screenshots required
- Welcome gate on first load
- Más menu
- Each of the 5 sub-screens (5 screenshots)
- Final state after TC-04

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
