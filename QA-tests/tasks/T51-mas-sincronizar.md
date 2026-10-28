# T51-mas-sincronizar: Más > Sincronizar screen, file download and WhatsApp message copy

| Field | Value |
|---|---|
| Route | `/` (tab Más, sub-screen `sync`) |
| Source | `/home/claude/cuaderno-patin/index.html` (rSync, doShare, saveJsonFile, waText, importLink, ACTIONS.download, ACTIONS.copyWaMsg) |
| Flow | Open Sincronizar, check the three cards, download the export file, copy the WhatsApp message |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 36 |

## Preconditions
- App running at `http://localhost:8080`
- Role: anonymous.
- Fresh browser profile: new browser context with empty localStorage, no cookies, no network access besides `localhost:8080`.
- Downloads enabled in the runner (the Playwright `download` event is observed). Save downloads in the task's own temp folder `/home/claude/cuaderno-patin/QA-tests/tmp/T51/` (create it first).
- Clipboard: grant `clipboard-read` and `clipboard-write` to `http://localhost:8080` when the runner allows it.
- Before the first navigation, register an init script that counts calls to the Web Share API: if `navigator.share` exists, wrap it so it increments `window.__shareCalls` (start at 0) and rejects with `AbortError`. The buttons **`Guardar en Drive`** and **`Mandar por WhatsApp`** (`share`, `shareWa`) are never clicked in this task.

## Test data
- `profeName = "QA Profe"`
- `expectedFileName = "cuaderno-liga-qa-profe-<YYYY-MM-DD>.json"` where `<YYYY-MM-DD>` is the runner's local date (the app slugs "QA Profe" to `qa-profe`).
- `expectedWaMessage = "Cuaderno de Patín: copia de QA Profe. Para sumarla a tu cuaderno, tocá este link y elegí el archivo que te mandé: http://localhost:8080/#importar"`
- Screen texts:
  - Intro: "Cada profe guarda lo suyo en su Drive y le manda una copia a la otra por WhatsApp. Al recibirla, la otra la sube acá."
  - Card headings: "Guardar mis datos en Drive", "Mandar mis datos por WhatsApp", "Subir los datos que me mandó otra profe"

## Steps

### TC-01: Setup and screen render
1. Open a new browser context. Navigate to `http://localhost:8080/`.
2. Assert: `h2` "Bienvenida" is visible.
3. Fill `#pname` with `QA Profe`.
4. Click **`Empezar`**.
5. Assert: `#subttl` reads "Profe QA Profe · Liga".
6. Click the bottom nav button **`Más`**, then click the tile **`Sincronizar`**.
7. Assert: `h2` "Sincronizar" and the intro text from `Test data` are visible; a **`← Más`** button is visible.
8. Assert: the first card shows "No hay cambios tuyos sin compartir." and "Todavía no compartiste nada."
9. Assert: the three card headings from `Test data` are visible, in that order.
10. Assert: buttons **`Guardar en Drive`**, **`Bajar al celular`**, **`Mandar por WhatsApp`**, **`Copiar el mensaje`** are visible and enabled; the label **`Elegir el archivo`** is visible.
11. Assert: `#impin` exists, has `type="file"`, `accept=".json,application/json"`, and is not visible (`display:none`).
12. Assert: no button **`Combinar`** and no button **`Cancelar`** exist, and `#smsg` and `#smsg2` have empty text.
13. Take a screenshot of the Sincronizar screen.

### TC-02: Happy path - download the export file with "Bajar al celular"
1. Start waiting for a `download` event, then click **`Bajar al celular`** (`[data-a=download]`).
2. Assert: a download starts with suggested filename equal to `expectedFileName`.
3. Save the file to `/home/claude/cuaderno-patin/QA-tests/tmp/T51/`. Parse it as JSON.
4. Assert: `app = "cuaderno-liga"`, `fmt = 2`, `profe = "QA Profe"`, `at` is a number within the last 60 seconds, and `data` equals `{}`.
5. Assert: `#smsg` reads "Se bajó " + `expectedFileName` + " a Descargas. Subilo a la carpeta Cuaderno Liga de Drive."
6. Assert: the first card now starts with "Última vez que compartiste:" (the "Todavía no compartiste nada." text is gone) and still shows "No hay cambios tuyos sin compartir."
7. Read `localStorage` key `cuaderno-liga-v2`. Assert: `lastShared` is a number greater than 0 and equal to the `at` of the downloaded file.
8. Assert: `window.__shareCalls` is 0 (the download path does not use the Web Share API).
9. Take a screenshot of the success message.
10. Click **`← Más`**, then click the tile **`Sincronizar`** again. Assert: `#smsg` is empty (the message is cleared on re-entry) and "Última vez que compartiste:" is still shown.

### TC-03: Copy the WhatsApp message with "Copiar el mensaje"
1. Click **`Copiar el mensaje`** (`[data-a=copyWaMsg]`).
2. Assert: `#smsg2` reads "Copiado".
3. Read the clipboard text. Assert: it equals `expectedWaMessage`.
4. Assert: `window.__shareCalls` is still 0 and no download was started by this click.
5. If the runner cannot grant clipboard permission: assert `#smsg2` reads "Copiado" or "Seleccioná el texto y copialo" and note which one appeared.

### TC-04: Negative and edge cases
- Do not click **`Guardar en Drive`** or **`Mandar por WhatsApp`**. Assert at the end of the task that `window.__shareCalls` is 0.
- Download twice: click **`Bajar al celular`** a second time. Assert: a second download starts with the same filename pattern, `#smsg` shows the same "Se bajó ..." text, and `lastShared` in `localStorage` is greater than or equal to the first value.
- Reload the page, open Más > Sincronizar. Assert: "Última vez que compartiste:" is still shown (persisted) and `#smsg` is empty.

## Assertions
- [ ] Sincronizar shows the three cards, the file label, and no preview/Combinar before a file is chosen.
- [ ] `#impin` is a hidden file input accepting `.json,application/json`.
- [ ] "Bajar al celular" downloads `cuaderno-liga-qa-profe-<date>.json` with `app`, `fmt`, `profe`, `at`, `data` as in `Test data`.
- [ ] `lastShared` is saved and the "Última vez que compartiste:" line appears.
- [ ] "Copiar el mensaje" puts `expectedWaMessage` in the clipboard and shows "Copiado".
- [ ] `window.__shareCalls` is 0 at the end (share and shareWa never used).
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx) except where explicitly expected.

## Screenshots required
- Welcome gate
- Sincronizar screen on first open
- After "Bajar al celular" (success message)
- After "Copiar el mensaje"

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
