# T12-alumnas-add-student result

**Verdict: PASS with task fixes**

Run: Playwright (chromium), fresh context per task, viewport 390x800, site http://localhost:8080. Screenshots in /tmp/qa-run-alumnas/T12/.

## Test cases

| TC | Check | Result | Observed vs expected |
|---|---|---|---|
| TC-00 | welcome gate visible | PASS |  |
| TC-00 | #pname placeholder | PASS |  |
| TC-00 | #subttl | PASS |  |
| TC-00 | tab | PASS |  |
| TC-00 | Alumnas (0)+empty | PASS |  |
| TC-01 | newstu empty/placeholder | PASS |  |
| TC-01 | sterr empty | PASS |  |
| TC-01 | Alumnas (1), empty text gone | PASS |  |
| TC-01 | bold name, chip, Ficha | PASS |  |
| TC-01 | newstu empty | PASS |  |
| TC-01 | newstu focused | PASS |  |
| TC-01 | sterr empty | PASS |  |
| TC-01 | group line 0 de 1 | PASS |  |
| TC-01 | Alumnas (3) | PASS |  |
| TC-01 | alphabetical | PASS |  |
| TC-01 | 0 de 3 | PASS |  |
| TC-01 | after reload | PASS |  |
| TC-01 | order after reload | PASS |  |
| TC-02 | empty err | PASS |  |
| TC-02 | count 3 | PASS |  |
| TC-02 | blank err | PASS |  |
| TC-02 | count 3 | PASS |  |
| TC-02 | Alumnas (4)+Dario | PASS |  |
| TC-02 | sterr cleared | PASS |  |
| TC-02 | Enter adds nothing | PASS |  |
| TC-03 | 60 chars | PASS |  |
| TC-03 | 60b row, count 5 | PASS |  |
| TC-03 | literal html row, count 6 | PASS |  |
| TC-03 | two Camila, count 7 | PASS |  |
| TC-04 | tabs | PASS |  |
| TC-04 | Avanzado QA highlighted, 0 | PASS |  |
| TC-04 | Alumnas (1) Ines | PASS |  |
| TC-04 | Grupo QA 7 no Ines | PASS |  |
| TC-04 | Avanzado 1 Ines | PASS |  |
| END | No console errors/warnings | PASS |  |
| END | No network requests besides the page load | PASS |  |
| END | No dialogs | PASS |  |

Totals: 37 PASS, 0 FAIL.

## Failure classification

- Task wording (not a failed TC): (b) task assumption wrong. `<currentMonth>` is described as the Spanish month name but the site shows the short label (`Oct`). The run substituted the short label and all assertions passed. Fix the wording as in T10.

Real site bugs: none.
