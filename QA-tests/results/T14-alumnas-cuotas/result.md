# T14-alumnas-cuotas result

**Verdict: PASS with task fixes**

Run: Playwright (chromium), fresh context per task, viewport 390x800, site http://localhost:8080. Screenshots in /tmp/qa-run-alumnas/T14/.

## Test cases

| TC | Check | Result | Observed vs expected |
|---|---|---|---|
| TC-00 | welcome gate visible | PASS |  |
| TC-00 | #pname placeholder | PASS |  |
| TC-00 | #subttl | PASS |  |
| TC-00 | 2 sin cuota, 0 de 2 | PASS |  |
| TC-01 | heading + hint | PASS |  |
| TC-01 | 10 buttons order | PASS |  |
| TC-01 | all false | PASS |  |
| TC-02 | h2 Bruno | PASS |  |
| TC-02 | only current true | PASS |  |
| TC-02 | current true | PASS |  |
| TC-02 | toggle off | PASS |  |
| TC-02 | toggle on | PASS |  |
| TC-02 | chips + 1 de 2 | PASS |  |
| TC-03 | 3 pressed | PASS |  |
| TC-03 | pressed Mar | PASS |  |
| TC-03 | pressed Abr | PASS |  |
| TC-03 | pressed May | PASS |  |
| TC-03 | Camila sin cuota, 1 de 2 | PASS |  |
| TC-03 | both al día, 2 de 2 | PASS |  |
| TC-04 | after reload 2 de 2 | PASS |  |
| TC-04 | pressed set | PASS |  |
| TC-04 | 4 q keys v=1 | PASS |  |
| TC-04 | key format | PASS |  |
| TC-04 | Camila sin cuota, 1 de 2 | PASS |  |
| TC-04 | persisted | PASS |  |
| TC-05 | Jun pressed w/o Guardar | PASS |  |
| END | No console errors/warnings | PASS |  |
| END | No network requests besides the page load | PASS |  |
| END | No dialogs | PASS |  |

Totals: 29 PASS, 0 FAIL.

## Failure classification

- Task wording (not a failed TC): (b) task assumption wrong. `<currentMonth>` is described as the Spanish month name but the site shows the short label (`Oct`). Run used the short label. Green style of pressed toggles (TC-02 step 2) was not asserted visually; only `aria-pressed` was checked.

Real site bugs: none.
