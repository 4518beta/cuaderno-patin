# T16-alumnas-edit-group result

**Verdict: PASS with task fixes**

Run: Playwright (chromium), fresh context per task, viewport 390x800, site http://localhost:8080. Screenshots in /tmp/qa-run-alumnas/T16/.

## Test cases

| TC | Check | Result | Observed vs expected |
|---|---|---|---|
| TC-00 | welcome gate visible | PASS |  |
| TC-00 | #pname placeholder | PASS |  |
| TC-00 | #subttl | PASS |  |
| TC-00 | Alumnas (1) | PASS |  |
| TC-00 | tabs | PASS |  |
| TC-00 | B card Sáb · 10:00 | PASS |  |
| TC-01 | h2 + title Editar grupo | PASS |  |
| TC-01 | no tabs/list | PASS |  |
| TC-01 | prefill | PASS |  |
| TC-01 | checked Lun,Mié | PASS |  |
| TC-02 | all 7 checked | PASS |  |
| TC-02 | tabs | PASS |  |
| TC-02 | highlight | PASS |  |
| TC-02 | h3 | PASS |  |
| TC-02 | chip Intermedio | PASS |  |
| TC-02 | day line | PASS |  |
| TC-02 | profe line | PASS |  |
| TC-02 | Lola | PASS |  |
| TC-02 | after reload tab present | PASS |  |
| TC-02 | card after reload + Lola | PASS |  |
| TC-02 | reedit prefill | PASS |  |
| TC-03 | gerr | PASS |  |
| TC-03 | title Editar grupo | PASS |  |
| TC-03 | blank gerr | PASS |  |
| TC-03 | unchanged | PASS |  |
| TC-03 | 60 chars | PASS |  |
| TC-03 | tab 60 d | PASS |  |
| TC-03 | restored | PASS |  |
| TC-04 | Sáb · 10:00 | PASS |  |
| TC-04 | prefill | PASS |  |
| TC-04 | Sin días cargados exact | PASS |  |
| TC-04 | after reload | PASS |  |
| TC-05 | unchanged | PASS |  |
| TC-05 | group A intact | PASS |  |
| END | No console errors/warnings | PASS |  |
| END | No network requests besides the page load | PASS |  |
| END | No dialogs | PASS |  |

Totals: 37 PASS, 0 FAIL.

## Failure classification

- Task wording (not a failed TC): (b) task assumption wrong. `<currentMonth>` is described as the Spanish month name but the site shows the short label (`Oct`). Run used the short label and passed.

Real site bugs: none.
