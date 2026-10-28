# T35-calendario-sync-prompt QA result

Verdict: **PASS**

TC-00 and TC-01 ran in real time (30 s idle, then 10/20/28 s checks). TC-02 to TC-06 used Playwright clock.fastForward after installing the clock (same code path: setTimeout 25000 in armAsk). All assertions matched. Screenshots in /tmp/qa-run-calendario/T35/.

## Test cases

| TC | Result | Checks passed | Observed vs expected (failures only) |
|---|---|---|---|
| TC-00 | PASS | 4/4 | - |
| TC-01 | PASS | 11/11 | - |
| TC-02 | PASS | 8/8 | - |
| TC-03 | PASS | 3/3 | - |
| TC-04 | PASS | 4/4 | - |
| TC-05 | PASS | 6/6 | - |
| TC-06 | PASS | 9/9 | - |

Console errors: none
Network requests besides document load / 4xx-5xx: none

## Failure classification

No failures.
