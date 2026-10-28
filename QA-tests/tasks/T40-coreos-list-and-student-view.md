# T40-coreos-list-and-student-view: Coreos tab, empty states, student list and student view

| Field | Value |
|---|---|
| Route | `/` (bottom nav tab **Coreos**, panel `#p-coreos`) |
| Source | `/home/claude/cuaderno-patin/index.html` (rCoreos, rStudent, stuCheck) |
| Flow | Browse groups and students, open and close a student view |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 52 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous (no login, no network calls; the CSP of the page blocks all connections)
- Fresh browser profile: empty localStorage (key `cuaderno-liga-v2` absent), no cookies
- No seed data. The task itself creates everything it needs.
- Do not click Web Share or download buttons (**Guardar en Drive**, **Bajar al celular**, **Mandar por WhatsApp**) anywhere.

## Test data
- `profeName = "QA Profe"`
- `groupName = "Grupo QA"`, level left at the default `Iniciación`, hora empty, no class days
- `studentName = "Alumna QA"`
- `group2Name = "Grupo QA B"`, level `Intermedio`
- `student2Name = "Alumna QA B"`
- Expected default efficiency for `Iniciación`: `Eficiencia Quinta` (3 mandatory items)
- Expected default efficiency for `Intermedio`: `Eficiencia Tercera` (5 mandatory items)

## Steps

### TC-01: Happy path: empty states, then create group and alumna, then see them in Coreos
This TC performs the common setup with extra assertions interleaved. Other tasks run the same setup as TC-00.
1. Open a new browser profile. Navigate to `http://localhost:8080/`.
2. Assert: `<h1>` reads "Cuaderno de Patín"; heading "Bienvenida" is visible; input `#pname` (placeholder "Tu nombre de pila") and button **Empezar** are visible.
3. Type `QA Profe` into `#pname`. Click **Empezar**.
4. Assert: the subtitle reads "Profe QA Profe · Liga"; the Hoy panel shows heading "Buen día, QA Profe".
5. Click bottom nav **Coreos**.
6. Assert: heading "Coreografías" is visible and the empty box reads "Primero creá un grupo y cargá alumnas en Alumnas." No group buttons and no student cards exist.
7. Click bottom nav **Alumnas**. Assert: heading "Alumnas y grupos" and card "Nuevo grupo" are visible; `#gname` has placeholder "Ej: Intermedio tarde"; the Nivel select shows "Iniciación".
8. Type `Grupo QA` into `#gname`. Click **Guardar grupo**.
9. Assert: the group card titled "Grupo QA" with chip "Iniciación" and text "Sin días cargados" is visible; heading "Alumnas (0)" and the empty box "Todavía no hay alumnas en este grupo.".
10. Click bottom nav **Coreos**.
11. Assert: heading "Coreografías"; text "Elegí una alumna para ver el checklist del reglamento y armar su coreo."; segment button **Grupo QA** is selected (class `on`); the empty box reads "Este grupo no tiene alumnas todavía."
12. Click bottom nav **Alumnas**. Type `Alumna QA` into `#newstu`. Click **Agregar**.
13. Assert: heading "Alumnas (1)"; row "Alumna QA" with chip "sin cuota"; `#sterr` is empty; `#newstu` is empty and focused.
14. Click bottom nav **Coreos**.
15. Assert: exactly one student card is visible, with title "Alumna QA", chip "0/3 obligatorios" and text "Eficiencia Quinta · 0 pasos".
16. Reload the page. Click bottom nav **Coreos**. Assert: the same card ("Alumna QA", "0/3 obligatorios", "Eficiencia Quinta · 0 pasos") is still present (data persisted in localStorage).

### TC-02: Open the student view and go back
1. Click the card "Alumna QA".
2. Assert: a button **← Alumnas del grupo** is visible; heading "Alumna QA"; subtitle "Grupo QA · Eficiencia Quinta".
3. Assert: select "Eficiencia del reglamento" shows "Según el nivel del grupo (Eficiencia Quinta)".
4. Assert: card "Del reglamento" with chip "0 de 3 obligatorios"; note "Faltan 3: Una combinación de figuras hacia adelante, Trompo en dos pies, Choreo Step Sequence"; exactly 3 elements with `role="checkbox"` and `aria-checked="false"`.
5. Assert: the field "Duración del programa" (`data-c="dur"`, placeholder "Ej: 2:00") is empty; text "Cargá la duración del programa (ej. 2:00) para controlar el tiempo."; text "Tiempo permitido: máx. 1:30".
6. Assert: card "Agregar un paso" with `#sp_tipo`, `#sp_t` (placeholder "0:20"), `#sp_txt` (placeholder "Ej: salto de vals en la diagonal"), `#sp_ref` and button **Agregar paso**. The text "Todavía no hay pasos. Agregá el primero abajo." is visible.
7. Assert: card "Canción" with `#songin` (placeholder "Pegá el link, y si querés el nombre al lado") and button **Guardar canción**.
8. Assert: card "Trabajada en clase" with text `Todavía no la marcaste en el calendario. En un día de clase tocá "Coreo Alumna QA".`
9. Click **← Alumnas del grupo**.
10. Assert: the student list is shown again (heading "Coreografías", card "Alumna QA").
11. Click the card "Alumna QA" again, then reload the page. Assert: after reload the page shows the Hoy tab (the open tab and student are not persisted). Click **Coreos** and assert the list (heading "Coreografías", card "Alumna QA") is shown, not the student view.

### TC-03: Group selector with two groups
1. Click bottom nav **Alumnas**. Click **+ Nuevo grupo**.
2. Type `Grupo QA B` into `#gname`. Select Nivel `Intermedio`. Click **Guardar grupo**.
3. Assert: the card "Grupo QA B" with chip "Intermedio" is shown, with "Alumnas (0)".
4. Type `Alumna QA B` into `#newstu`. Click **Agregar**. Assert: "Alumnas (1)" and the row "Alumna QA B".
5. Click bottom nav **Coreos**.
6. Assert: two segment buttons "Grupo QA" and "Grupo QA B" in this order; "Grupo QA" has class `on` and the card "Alumna QA" is the only student card.
7. Click **Grupo QA B**.
8. Assert: "Grupo QA B" has class `on`; exactly one card "Alumna QA B" with chip "0/5 obligatorios" and text "Eficiencia Tercera · 0 pasos". The card "Alumna QA" is not visible.
9. Click the card "Alumna QA B". Assert: subtitle "Grupo QA B · Eficiencia Tercera"; select shows "Según el nivel del grupo (Eficiencia Tercera)"; chip "0 de 5 obligatorios"; text "Tiempo permitido: 1:30 ± 5 s".
10. Click **← Alumnas del grupo**. Click **Grupo QA**. Assert: the card "Alumna QA" is shown again.

### TC-04: Negative and edge cases
- Tab switch keeps the open student: click the card "Alumna QA", click bottom nav **Alumnas**, then bottom nav **Coreos**. Assert: the student view "Alumna QA" (button **← Alumnas del grupo**) is shown, not the list.
- Back button after tab switch: click **← Alumnas del grupo**. Assert: the list with the card "Alumna QA" is shown.
- The chip color change at 3 of 3 mandatory items is verified in T41 and is not repeated here.

## Assertions
- [ ] Empty states: "Primero creá un grupo y cargá alumnas en Alumnas." (no group) and "Este grupo no tiene alumnas todavía." (group without students).
- [ ] The student card shows name, chip "N/M obligatorios" and "<efficiency name> · <n> paso(s)".
- [ ] Default efficiency follows the group level: Iniciación gives Eficiencia Quinta, Intermedio gives Eficiencia Tercera.
- [ ] Student view contains the sections Del reglamento, Agregar un paso, Canción and Trabajada en clase.
- [ ] **← Alumnas del grupo** returns to the list.
- [ ] Data survives a reload; the open tab and student do not.
- [ ] The status text `#save` reads "Guardado en este celular" after changes.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx); the page makes no requests after the initial load.

## Screenshots required
- Welcome form
- Coreos empty state (no group)
- Coreos with a group but no students
- Coreos list with one student card
- Student view top (header, select, checklist)
- Coreos with two groups, second group selected

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
