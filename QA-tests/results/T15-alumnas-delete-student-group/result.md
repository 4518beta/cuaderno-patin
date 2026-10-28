# T15-alumnas-delete-student-group result

**Verdict: PASS with task fixes**

Run: Playwright (chromium), fresh context per task, viewport 390x800, site http://localhost:8080. Screenshots in /tmp/qa-run-alumnas/T15/.

## Test cases

| TC | Check | Result | Observed vs expected |
|---|---|---|---|
| TC-00 | welcome gate visible | PASS |  |
| TC-00 | #pname placeholder | PASS |  |
| TC-00 | #subttl | PASS |  |
| TC-00 | Bruno al día | PASS |  |
| TC-00 | tabs+highlight+2 | PASS |  |
| TC-01 | armed text | PASS |  |
| TC-01 | danger style, ficha open | PASS |  |
| TC-01 | list 2 students | PASS |  |
| TC-01 | btn reset | PASS |  |
| TC-02 | armed | PASS |  |
| TC-02 | Mar pressed | PASS |  |
| TC-02 | btn back | PASS |  |
| TC-02 | Mar unpressed | PASS |  |
| TC-02 | one click no delete | PASS |  |
| TC-03 | ficha closed, 1 student Bruno | PASS |  |
| TC-03 | 1 de 1 | PASS |  |
| TC-03 | after reload selected tab (observed, task silent) | PASS |  |
| TC-03 | Grupo QA only Bruno | PASS |  |
| TC-03 | camila deleted v null | PASS |  |
| TC-03 | bruno name | PASS |  |
| TC-04 | armed danger + card visible | PASS |  |
| TC-04 | Avanzado Ines | PASS |  |
| TC-04 | reset + intact | PASS |  |
| TC-04 | armed again, exists | PASS |  |
| TC-04 | Editar grupo form | PASS |  |
| TC-04 | delete btn reset | PASS |  |
| TC-05 | one tab remains | PASS |  |
| TC-05 | highlighted, Ines | PASS |  |
| TC-05 | no Bruno | PASS |  |
| TC-05 | after reload tabs | PASS |  |
| TC-05 | group null | PASS |  |
| TC-05 | bruno null | PASS |  |
| TC-05 | orphan q key v=1 (known quirk) | PASS |  |
| TC-06 | tabs gone, form shown | PASS |  |
| TC-06 | form stays | PASS |  |
| TC-06 | Hoy Primer paso | PASS |  |
| TC-06 | after reload form, no tabs | PASS |  |
| END | No console errors/warnings | PASS |  |
| END | No network requests besides the page load | PASS |  |
| END | No dialogs | PASS |  |

Totals: 40 PASS, 0 FAIL.

## Failure classification

- TC-03 step 4: (b) task assumption wrong. After reload the first group alphabetically (`Avanzado QA`) is shown, not `Grupo QA`. The task does not click tab `Grupo QA` before asserting that it has only Bruno. The run added that click. Also `<currentMonth>` is the short label (`Oct`).

Real site bugs: none.

Notes: Known quirk confirmed: after deleting the group, `q:<bruno_id>:<year>-<MM>` stays in storage with v=1 (recorded as observation, not a failure).
