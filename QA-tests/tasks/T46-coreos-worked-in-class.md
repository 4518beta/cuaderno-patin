# T46-coreos-worked-in-class: "Trabajada en clase" follows the Calendario log

| Field | Value |
|---|---|
| Route | `/` (bottom nav tabs **Calendario** and **Coreos**, student view card "Trabajada en clase") |
| Source | `/home/claude/cuaderno-patin/index.html` (rStudent, coreoDates, dayPanel, calGrid, action logItem) |
| Flow | Mark a choreography as worked in a class day and see it in the student view |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 44 |

## Preconditions
- App running at `http://localhost:8080`
- Anonymous (no login, no network)
- Fresh browser profile: empty localStorage, no cookies
- The group has no class days, so every day is an "extra" day for it.
- About 25 seconds after marking attendance or a log item, a banner "Terminó la clase. ¿Sincronizás con la otra profe?" with buttons **Sincronizar** and **Ahora no** can appear at the bottom. If it appears, click **Ahora no**. Do not click **Sincronizar**.
- Do not click Web Share or download buttons anywhere.

## Test data
- `profeName = "QA Profe"`, `groupName = "Grupo QA"` (level Iniciación, no days, no hora), `studentName = "Alumna QA"`
- `student2Name = "Alumna QA B"` (second alumna in the same group, used in the edge cases)
- Day 1: today (selected by default in Calendario)
- Day 2: the first day of the displayed month, if that is not today; otherwise the second day of the month
- Marker button label in the day panel: "Coreo Alumna QA"

## Steps

### TC-00: Setup (fresh profile)
1. Open a new browser profile. Navigate to `http://localhost:8080/`.
2. Assert: heading "Bienvenida" is visible with input `#pname` and button **Empezar**.
3. Type `QA Profe` into `#pname`. Click **Empezar**. Assert: subtitle reads "Profe QA Profe · Liga".
4. Click bottom nav **Alumnas**. Assert: card "Nuevo grupo" is visible.
5. Type `Grupo QA` into `#gname`. Click **Guardar grupo**. Assert: group card "Grupo QA" is visible.
6. Type `Alumna QA` into `#newstu`. Click **Agregar**. Assert: heading "Alumnas (1)" and row "Alumna QA".
7. Click bottom nav **Coreos**. Click the card "Alumna QA". Assert: heading "Alumna QA" and button **← Alumnas del grupo**.

### TC-01: Happy path: mark the choreography in the calendar and see it in the student view
1. Assert: the card "Trabajada en clase" reads `Todavía no la marcaste en el calendario. En un día de clase tocá "Coreo Alumna QA".`
2. Click bottom nav **Calendario**.
3. Assert: heading "Calendario" and text "Tocá un día para pasar lista y anotar lo que se vio."; the segment button **Grupo QA** is selected; the month title shows the current month and year; today's cell has the class `today`.
4. Assert: the day panel shows today's long date as title, the chip "día extra", the card "Asistencia" with chip "0 de 1", and the card "Qué se vio" with the subtitle "Coreografías trabajadas" and the button **Coreo Alumna QA** (not selected).
5. Click **Coreo Alumna QA**.
6. Assert: the button **Coreo Alumna QA** has class `on`. Today's cell now shows the small label "extra" and its `aria-label` ends with ", extra".
7. Click bottom nav **Coreos**. Click the card "Alumna QA".
8. Assert: the card "Trabajada en clase" starts with "1 vez: " followed by today's short date (weekday, day and month in es-AR format). The text "Todavía no la marcaste" is gone.
9. Reload the page. Click **Coreos**, open "Alumna QA". Assert: the card still starts with "1 vez: ".

### TC-02: Second day and toggle off
1. Click bottom nav **Calendario**. Click the cell for Day 2 (button whose `aria-label` is that day's long date). Assert: the day panel title changes to that date and **Coreo Alumna QA** is not selected on that day.
2. Click **Coreo Alumna QA**. Assert: the button has class `on`; that day's cell shows the label "extra".
3. Click bottom nav **Coreos**, open "Alumna QA". Assert: the card reads "2 veces: " followed by two dates separated by ", ", sorted in ascending order.
4. Click bottom nav **Calendario**. Pick Day 2 again and click **Coreo Alumna QA** to unmark it. Assert: the button loses the class `on` and the label "extra" disappears from that cell.
5. Click bottom nav **Coreos**, open "Alumna QA". Assert: the card reads "1 vez: " with a single date (today).
6. In **Calendario** pick today and click **Coreo Alumna QA** to unmark it. Open "Alumna QA" in **Coreos**. Assert: the original text `Todavía no la marcaste en el calendario. En un día de clase tocá "Coreo Alumna QA".` is back.

### TC-03: Negative and edge cases
- "Sin clase este día" overrides the mark: in **Calendario** on today click **Coreo Alumna QA**, then click **Sin clase este día**. Assert: **Coreo Alumna QA** loses the class `on`, **Sin clase este día** gains it, and the student view in **Coreos** shows the "Todavía no la marcaste..." text again.
- Marking works without attendance: attendance stays "0 de 1" while **Coreo Alumna QA** is marked.
- Two students are independent: add "Alumna QA B" in **Alumnas**. In **Calendario** the section "Coreografías trabajadas" shows the buttons **Coreo Alumna QA** and **Coreo Alumna QA B**. Mark only **Coreo Alumna QA B** on today. Assert in **Coreos**: "Alumna QA" shows the "Todavía no la marcaste..." text and "Alumna QA B" shows "1 vez: ".
- Deleted student marker: not covered (deleting alumnas is out of scope for this route).

## Assertions
- [ ] The empty text of "Trabajada en clase" names the student: `En un día de clase tocá "Coreo <nombre>".`
- [ ] Marking "Coreo <nombre>" in the day panel adds one date to the student's card ("1 vez: ..." / "N veces: ...").
- [ ] Singular "vez" for one date, plural "veces" for two or more; dates sorted ascending.
- [ ] Unmarking removes the date; marking "Sin clase este día" removes the mark.
- [ ] Marks are per student.
- [ ] State persists after reload.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx).

## Screenshots required
- Student view with the empty "Trabajada en clase" card
- Calendario day panel with **Coreo Alumna QA** not selected
- Calendario day panel with **Coreo Alumna QA** selected
- Student view with "1 vez: ..."
- Student view with "2 veces: ..."

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
