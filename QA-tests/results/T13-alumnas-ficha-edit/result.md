# T13-alumnas-ficha-edit result

**Verdict: PASS with task fixes**

Run: Playwright (chromium), fresh context per task, viewport 390x800, site http://localhost:8080. Screenshots in /tmp/qa-run-alumnas/T13/.

## Test cases

| TC | Check | Result | Observed vs expected |
|---|---|---|---|
| TC-00 | welcome gate visible | PASS |  |
| TC-00 | #pname placeholder | PASS |  |
| TC-00 | #subttl | PASS |  |
| TC-00 | tabs order + highlight | PASS |  |
| TC-00 | Alumnas (1) Valentina | PASS |  |
| TC-01 | h2 | PASS |  |
| TC-01 | volver btn | PASS |  |
| TC-01 | fname | PASS |  |
| TC-01 | fname label | PASS |  |
| TC-01 | fgid options | PASS |  |
| TC-01 | fgid selected | PASS |  |
| TC-01 | Guardar + Borrar alumna | PASS |  |
| TC-01 | ferr empty | PASS |  |
| TC-01 | Cuotas heading + hint | PASS |  |
| TC-01 | only fname,fgid controls | PASS |  |
| TC-02 | back to list, Vale only | PASS |  |
| TC-02 | Vale after reload | PASS |  |
| TC-02 | h2/fname | PASS |  |
| TC-03 | ferr | PASS |  |
| TC-03 | h2 still Vale | PASS |  |
| TC-03 | blank ferr | PASS |  |
| TC-03 | ficha open | PASS |  |
| TC-03 | 60 chars | PASS |  |
| TC-03 | 60c row, no Vale | PASS |  |
| TC-03 | row Vale | PASS |  |
| TC-04 | Vale kept | PASS |  |
| TC-05 | Grupo QA empty | PASS |  |
| TC-05 | Avanzado has Vale | PASS |  |
| TC-05 | Vale after reload | PASS |  |
| TC-05 | Grupo QA 0 | PASS |  |
| TC-05 | fgid Avanzado | PASS |  |
| END | No console errors/warnings | PASS |  |
| END | No network requests besides the page load | PASS |  |
| END | No dialogs | PASS |  |

Totals: 34 PASS, 0 FAIL.

## Failure classification

- TC-02 step 4 / TC-05 step 5: (b) task assumption wrong. After a reload the Alumnas tab selects the first group alphabetically (`Avanzado QA`), not the group last used. The task says the row is 'the only student of Grupo QA' straight after reload and clicks no tab. The run clicked tab `Grupo QA` first; then it passed. Add that tab click to TC-02 step 4.

Real site bugs: none.
