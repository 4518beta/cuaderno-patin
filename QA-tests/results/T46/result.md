# T46-coreos-worked-in-class: result

Verdict: **PASS with task fixes**

Run: Playwright (chromium), fresh context per task, viewport 390x800, site http://localhost:8080. Task file and index.html untouched.

## TC table

| TC | Result | Checks | Failed checks (observed vs expected) |
|---|---|---|---|
| TC-00 | PASS | 1 | - |
| TC-01 | PASS | 16 | - |
| TC-02 | PASS | 9 | - |
| TC-03 | PASS | 10 | - |

Console errors / failed or external requests: none

## Failure classification

No real site bugs.
(b) Wrong assumption in task: see notes below.

## Notes

- Task assumption wrong (b): after switching tab (Calendario -> Coreos) the student view stays open (ui.sid is kept, same behavior the T40 TC-04 documents). The steps "Click bottom nav Coreos. Click the card Alumna QA" in TC-01 step 7, TC-02 steps 3, 5, 6 and TC-03 fail literally because the card is not in the DOM; the student view is already shown. Fix: say "Click Coreos (the student view is still open; if the list is shown, click the card)". Also Day 2 requires choosing the first of the month; works (2026-10-01) because torneo labels did not collide.
- All checks passed once that step was skipped.

## Check log

- TC-00 PASS: setup reaches student view (obs: `true`)
- TC-01 PASS: empty text (obs: `Todavía no la marcaste en el calendario. En un día de clase tocá "Coreo Alumna QA".`)
- TC-01 PASS: Calendario + hint (obs: `true`)
- TC-01 PASS: Grupo QA selected (obs: `1`)
- TC-01 PASS: month title (obs: `true`)
- TC-01 PASS: today cell class (obs: `1`)
- TC-01 PASS: day title long date (obs: `true`)
- TC-01 PASS: chip día extra (obs: `true`)
- TC-01 PASS: Asistencia 0 de 1 (obs: `true`)
- TC-01 PASS: Qué se vio / Coreografías trabajadas (obs: `true`)
- TC-01 PASS: Coreo btn not selected (obs: `true`)
- TC-01 PASS: Coreo btn on (obs: `true`)
- TC-01 PASS: today cell label extra (obs: `true`)
- TC-01 PASS: aria-label ends ", extra" (obs: `true`)
- TC-01 PASS: 1 vez (obs: `1 vez: mar, 27 oct`)
- TC-01 PASS: Todavía gone (obs: `false`)
- TC-01 PASS: persist 1 vez (obs: `true`)
- TC-02 PASS: panel title day2 (obs: `true`)
- TC-02 PASS: Coreo not selected day2 (obs: `false`)
- TC-02 PASS: Coreo on (obs: `true`)
- TC-02 PASS: day2 cell extra (obs: `true`)
- TC-02 PASS: 2 veces sorted (obs: `2 veces: jue, 1 oct, mar, 27 oct`)
- TC-02 PASS: Coreo off (obs: `false`)
- TC-02 PASS: label gone (obs: `false`)
- TC-02 PASS: 1 vez today (obs: `1 vez: mar, 27 oct`)
- TC-02 PASS: empty again (obs: `Todavía no la marcaste en el calendario. En un día de clase tocá "Coreo Alumna QA".`)
- TC-03 PASS: Coreo loses on (obs: `false`)
- TC-03 PASS: Sin clase gains on (obs: `true`)
- TC-03 PASS: empty after Sin clase (obs: `Todavía no la marcaste en el calendario. En un día de clase tocá "Coreo Alumna QA".`)
- TC-03 PASS: attendance 0 de 1 while marked (obs: `true`)
- TC-03 PASS: both Coreo buttons (obs: `Coreo Alumna QA|Coreo Alumna QA B`)
- TC-03 PASS: A empty (obs: `Todavía no la marcaste en el calendario. En un día de clase tocá "Coreo Alumna QA".`)
- TC-03 PASS: B 1 vez (obs: `1 vez: mar, 27 oct`)
- TC-03 PASS: NOTE: student view stayed open after tab switch (task says click the card again); count (obs: `6`)
- TC-03 PASS: no console errors (obs: `0`)
- TC-03 PASS: no external requests (obs: `0 `)