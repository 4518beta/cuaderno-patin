# T11-alumnas-group-form-validation result

**Verdict: PASS**

Run: Playwright (chromium), fresh context per task, viewport 390x800, site http://localhost:8080. Screenshots in /tmp/qa-run-alumnas/T11/.

## Test cases

| TC | Check | Result | Observed vs expected |
|---|---|---|---|
| TC-00 | welcome gate visible | PASS |  |
| TC-00 | #pname placeholder | PASS |  |
| TC-00 | #subttl | PASS |  |
| TC-00 | heading and form | PASS |  |
| TC-00 | gerr empty | PASS |  |
| TC-01 | gerr | PASS |  |
| TC-01 | form still, no tabs | PASS |  |
| TC-01 | no g: keys | PASS |  |
| TC-02 | gerr | PASS |  |
| TC-02 | form open, nothing stored | PASS |  |
| TC-02 | fields kept | PASS |  |
| TC-03 | form still shown | PASS |  |
| TC-03 | gname empty after cancel | PASS |  |
| TC-03 | no g: keys | PASS |  |
| TC-04 | gerr | PASS |  |
| TC-04 | form closed | PASS |  |
| TC-04 | tab | PASS |  |
| TC-04 | highlighted | PASS |  |
| TC-04 | chip/sin dias/profe | PASS |  |
| TC-04 | no error text | PASS |  |
| TC-05 | 60 chars | PASS |  |
| TC-05 | tab with 60 a | PASS |  |
| TC-05 | h3 60 a | PASS |  |
| TC-05 | stored name len 60 | PASS |  |
| TC-06 | tab literal | PASS |  |
| TC-06 | h3 literal | PASS |  |
| TC-06 | no <b> inside h3/tab | PASS |  |
| TC-07 | 3 tabs | PASS |  |
| TC-07 | group view, tabs unchanged, no Descartar | PASS |  |
| END | No console errors/warnings | PASS |  |
| END | No network requests besides the page load | PASS |  |
| END | No dialogs | PASS |  |

Totals: 32 PASS, 0 FAIL.

## Failure classification

No real site bugs. No task assumptions failed.

Real site bugs: none.

Notes: No failures. TC-08 is an observation matrix with no separate assertions; its content was covered by TC-01..TC-06.
