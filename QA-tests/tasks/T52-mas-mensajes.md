# T52-mas-mensajes: Más > Mensajes templates and copy buttons

| Field | Value |
|---|---|
| Route | `/` (tab Más, sub-screen `mensajes`) |
| Source | `/home/claude/cuaderno-patin/index.html` (rMensajes, MENSAJES, ACTIONS.copyMsg, copyText) |
| Flow | Read the 7 message templates, edit one, copy each with its "Copiar" button |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 34 |

## Preconditions
- App running at `http://localhost:8080`
- Role: anonymous.
- Fresh browser profile: new browser context with empty localStorage, no cookies, no network access besides `localhost:8080`.
- Clipboard: grant `clipboard-read` and `clipboard-write` to `http://localhost:8080` when the runner allows it.
- No seed data. The welcome form is completed in TC-01 with `QA Profe`.

## Test data
- `profeName = "QA Profe"`
- Templates (textarea id / title / tag chip / first words of the body):

| Textarea | `copyMsg` button `data-id` | Title (`h3`) | Chip | Body starts with |
|---|---|---|---|---|
| `#m0` | `m0` | Aviso de torneo | Familias | "Hola, les cuento que el {fecha} tenemos {torneo} en {lugar}." |
| `#m1` | `m1` | Recordatorio de cuota | Familias | "Hola, les recuerdo que la cuota de {mes} vence el {fecha}." |
| `#m2` | `m2` | Clase suspendida | Familias | "Hola, hoy {dia} no vamos a tener clase por {motivo}." |
| `#m3` | `m3` | Bienvenida | Familias | "Bienvenidos a la escuela." |
| `#m4` | `m4` | Festival de fin de año | Familias | "Ya tenemos fecha para el festival: {fecha} en {lugar}." |
| `#m5` | `m5` | Inscripciones abiertas | Redes | "Abrimos inscripciones de patín artístico." |
| `#m6` | `m6` | Anuncio del festival | Redes | "Ya hay fecha para nuestro festival de fin de año: {fecha}." |

- `editedText = "Hola, les recuerdo que la cuota de Noviembre vence el 10/11. Pueden abonarla por transferencia. Gracias. QA-{runId}"` (replace `{runId}` with a short unique string, for example the current time in ms).

## Steps

### TC-01: Happy path - setup, render and copy the first template
1. Open a new browser context. Navigate to `http://localhost:8080/`.
2. Assert: `h2` "Bienvenida" is visible.
3. Fill `#pname` with `QA Profe`. Click **`Empezar`**.
4. Assert: `#subttl` reads "Profe QA Profe · Liga".
5. Click the bottom nav button **`Más`**, then click the tile **`Mensajes`**.
6. Assert: `h2` "Mensajes" is visible with the text "Textos listos para familias y redes. Completá lo que está entre llaves {así} y copiá." and a **`← Más`** button.
7. Assert: exactly 7 cards exist. For each row of the `Test data` table, the `h3` title, the chip text, the textarea (`rows=7`) and a **`Copiar`** button are present, in the table order. Each textarea value starts with the "Body starts with" text.
8. Assert: the 5 "Familias" chips have class `celeste` and the 2 "Redes" chips have class `rosa`.
9. Assert: `#cm-m0` through `#cm-m6` exist and are empty.
10. Take a screenshot of the Mensajes screen.
11. Click **`Copiar`** in the card "Aviso de torneo" (`[data-a=copyMsg][data-id=m0]`).
12. Assert: `#cm-m0` reads "Copiado".
13. Read the clipboard text. Assert: it equals the full value of `#m0` (starts with "Hola, les cuento que el {fecha} tenemos {torneo} en {lugar}." and ends with "Gracias.").

### TC-02: Edit a template and copy the edited text
1. In `#m1` select all text and replace it with `editedText`.
2. Assert: `#m1` value equals `editedText`.
3. Click **`Copiar`** in the card "Recordatorio de cuota" (`[data-a=copyMsg][data-id=m1]`).
4. Assert: `#cm-m1` reads "Copiado".
5. Read the clipboard text. Assert: it equals `editedText` exactly (the copy uses the edited value, not the original template).
6. Assert: `#m0` still contains the original "Aviso de torneo" text.

### TC-03: Copy every template
1. For each `n` from 0 to 6, click **`Copiar`** (`[data-a=copyMsg][data-id=m<n>]`), then assert `#cm-m<n>` reads "Copiado" and the clipboard equals the value of `#m<n>`.
2. After the loop, assert `#cm-m0` to `#cm-m6` all read "Copiado".
3. If the runner cannot grant clipboard permission: assert each `#cm-m<n>` reads "Copiado" or "Seleccioná el texto y copialo" and note which one appeared.

### TC-04: Edits are not persisted
1. Click **`← Más`**. Assert: `h2` "Más" is visible.
2. Click the tile **`Mensajes`**.
3. Assert: `#m1` value starts again with "Hola, les recuerdo que la cuota de {mes} vence el {fecha}." (the edit is gone) and every `#cm-m<n>` is empty.
4. Read `localStorage` key `cuaderno-liga-v2`. Assert: `D` equals `{}` (copying and editing write no data).
5. Reload the page and open Más > Mensajes. Assert: all 7 titles are shown and the textareas hold the original templates.

### TC-05: Negative and edge cases
- Textarea with characters that need escaping: type `<b>x</b> & "q"` at the end of `#m3`, click **`Copiar`** on `m3`. Assert: the clipboard text ends with `<b>x</b> & "q"` literally, and no `<b>` element exists inside the card.
- Click **`Copiar`** on `m5` and `m6` quickly in a row. Assert: `#cm-m5` and `#cm-m6` both read "Copiado".

## Assertions
- [ ] 7 templates with the titles, chips and starting text listed in `Test data`.
- [ ] Every "Copiar" button sets its own `#cm-m<n>` to "Copiado" and copies the current textarea value.
- [ ] Edited text is copied as typed; edits are lost after leaving the screen.
- [ ] `localStorage` `D` stays `{}`.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx) except where explicitly expected.

## Screenshots required
- Mensajes screen on first open
- After copying "Aviso de torneo" ("Copiado" visible)
- After editing `#m1` and copying
- Final state after TC-05

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
