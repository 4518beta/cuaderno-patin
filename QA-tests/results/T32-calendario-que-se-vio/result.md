# T32-calendario-que-se-vio QA result

Verdict: **PASS**

All assertions matched. Selector note (not a task error): an "on" quick button gets a "✓" via CSS ::before (index.html line 142), so its accessible name becomes "✓ Coreo Alumna QA"; role+exact-name selectors stop matching once toggled on. Use class/text selectors. Toggle state is also not exposed with aria-pressed (minor a11y observation, not covered by the task). Screenshots in /tmp/qa-run-calendario/T32/.

## Test cases

| TC | Result | Checks passed | Observed vs expected (failures only) |
|---|---|---|---|
| TC-00 | PASS | 2/2 | - |
| TC-01 | PASS | 28/28 | - |
| TC-02 | PASS | 9/9 | - |
| TC-03 | PASS | 8/8 | - |
| TC-04 | PASS | 6/6 | - |
| TC-05 | PASS | 13/13 | - |
| TC-06 | PASS | 6/6 | - |

Console errors: none
Network requests besides document load / 4xx-5xx: none

## Failure classification

No failures.
