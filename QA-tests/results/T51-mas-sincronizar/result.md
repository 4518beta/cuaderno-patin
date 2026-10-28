# T51 result

Verdict: **PASS**

Viewport 390x800, fresh context, Playwright (chromium headless). Screenshots in /tmp/qa-run-mas/shots/ (files named T51-*.png).

## TC table

| TC | Checks passed | Result | Observed vs expected |
|---|---|---|---|
| TC-01 | 19/19 | PASS | All checks matched expected text |
| TC-02 | 14/14 | PASS | All checks matched expected text |
| TC-03 | 3/3 | PASS | All checks matched expected text |
| TC-04 | 6/6 | PASS | All checks matched expected text |
| global | 2/2 | PASS | Console errors: none. Network 4xx/5xx: none |

## Failure classification

- (a) Real site bugs: none.
- (b) Task assumption problems: none that failed a TC.

## Notes

- Downloads were saved in /tmp/qa-run-mas/dl/ (scratch) instead of the task folder QA-tests/tmp/T51/, per the run instructions.
- Clipboard permission was granted, so "Copiado" appeared.
- Bare `h2`/`.back` selectors need `:visible` (hidden panels exist).
