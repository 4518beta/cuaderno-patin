# T43-coreos-destructive-delete-step: Destructive: delete a step (two-click confirm)

| Field | Value |
|---|---|
| Route | `/` (bottom nav tab **Coreos**, student view, step cards) |
| Source | `/home/claude/cuaderno-patin/index.html` (stepCard, delBtn, confirmed, actions delStep, closeStu) |
| Flow | Remove a step with the inline confirmation (button **Quitar** turns into **¿Seguro?**) |
| Requires auth | no |
| Required role | anonymous |
| Destructive | yes (removes a step from localStorage; there is no undo) |
| Estimated steps | 46 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous (no login, no network)
- Fresh browser profile: empty localStorage, no cookies
- The deletion only touches the browser profile created for this task.
- Do not click Web Share or download buttons anywhere.

## Test data
- `profeName = "QA Profe"`, `groupName = "Grupo QA"` (level Iniciación), `studentName = "Alumna QA"`
- Step A: `#sp_tipo` = `Técnico`, `#sp_t` = `0:20`, `#sp_txt` = `Paso A QA`, `#sp_ref` = `Obligatorio: Trompo en dos pies`
- Step B: `#sp_tipo` = `Artístico`, `#sp_t` = `0:40`, `#sp_txt` = `Paso B QA`, `#sp_ref` = `Ninguno`
- Confirm labels: idle button **Quitar**, armed button **¿Seguro?**

## Steps

### TC-00: Setup (fresh profile)
1. Open a new browser profile. Navigate to `http://localhost:8080/`.
2. Assert: heading "Bienvenida" is visible with input `#pname` and button **Empezar**.
3. Type `QA Profe` into `#pname`. Click **Empezar**. Assert: subtitle reads "Profe QA Profe · Liga".
4. Click bottom nav **Alumnas**. Assert: card "Nuevo grupo" is visible.
5. Type `Grupo QA` into `#gname`. Click **Guardar grupo**. Assert: group card "Grupo QA" is visible.
6. Type `Alumna QA` into `#newstu`. Click **Agregar**. Assert: heading "Alumnas (1)" and row "Alumna QA".
7. Click bottom nav **Coreos**. Click the card "Alumna QA". Assert: heading "Alumna QA" and button **← Alumnas del grupo**.
8. Fill Step A and click **Agregar paso**. Fill Step B and click **Agregar paso**.
9. Assert: step cards "Paso A QA" (badge 1, chip "Cumple: Trompo en dos pies") and "Paso B QA" (badge 2); each card has a button **Quitar**; chip "1 de 3 obligatorios".

### TC-01: Cancel path: the confirm is abandoned
1. Click **Quitar** on the card "Paso A QA".
2. Assert: that button now reads **¿Seguro?** with the danger style; the button on "Paso B QA" still reads **Quitar**; both steps are still listed.
3. Click **← Alumnas del grupo** (any action that is not a delete resets the pending confirm).
4. Click the card "Alumna QA". Assert: both cards "Paso A QA" and "Paso B QA" are present, and both buttons read **Quitar**. Chip "1 de 3 obligatorios".
5. Click **Quitar** on "Paso A QA", then click **Quitar** on "Paso B QA".
6. Assert: the button on "Paso A QA" is back to **Quitar**; the button on "Paso B QA" reads **¿Seguro?**; both steps still exist (confirmation moves to the last clicked step).
7. Click **Editar** on "Paso A QA" and then **Cancelar**. Assert: the button on "Paso B QA" is back to **Quitar** (the confirmation was reset) and both steps still exist.
8. Reload the page, open Coreos and "Alumna QA". Assert: both steps still exist.

### TC-02: Confirm path: the step is removed
1. Click **Quitar** on "Paso A QA". Assert: it reads **¿Seguro?**.
2. Click **¿Seguro?**.
3. Assert: the card "Paso A QA" is gone; "Paso B QA" is now badge 1 and its up button (aria-label "Subir") is disabled; chip "0 de 3 obligatorios" (the item covered by step A is unticked and the "Está en el paso 1 de tu coreo" text is gone); note "Faltan 3: Una combinación de figuras hacia adelante, Trompo en dos pies, Choreo Step Sequence".
4. Assert: no confirmation text or "¿Seguro?" button remains anywhere on the page.
5. Click **← Alumnas del grupo**. Assert: the card "Alumna QA" shows "0/3 obligatorios" and "Eficiencia Quinta · 1 paso" (singular).
6. Reload the page. Click **Coreos**, open "Alumna QA". Assert: only "Paso B QA" is listed.
7. Click **Quitar**, then **¿Seguro?** on "Paso B QA". Assert: the text "Todavía no hay pasos. Agregá el primero abajo." is back. Click **← Alumnas del grupo**; the card shows "Eficiencia Quinta · 0 pasos".

### TC-03: Negative and edge cases
- Deleting a step does not touch other data. After TC-02 (no steps left) add Step A and Step B again. Type `1:30` into "Duración del programa" and press Tab; type `https://youtu.be/dQw4w9WgXcQ` into `#songin` and click **Guardar canción**; click the checkbox "Choreo Step Sequence" to tick it by hand. Click **Quitar** then **¿Seguro?** on "Paso A QA". Assert: the duration field still shows "1:30", the Canción card still shows the chip "YouTube", the Choreo item is still ticked (`aria-checked="true"`), "Paso B QA" remains as badge 1, and the chip reads "1 de 3 obligatorios".
- A single click never deletes: after any lone click on **Quitar** the step count is unchanged.

## Assertions
- [ ] One click on **Quitar** only arms the confirmation (**¿Seguro?**) and deletes nothing.
- [ ] Any non-delete action (back, edit, cancel) disarms the confirmation.
- [ ] Only one **¿Seguro?** button exists at a time.
- [ ] The second click removes the step, renumbers the remaining ones and updates the checklist and counters.
- [ ] The singular "1 paso" is used when one step remains.
- [ ] The removal persists after reload.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx).

## Screenshots required
- Two steps before deleting
- Button in the **¿Seguro?** state
- State after the cancel path
- State after the confirm path
- Empty steps list after deleting both

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
