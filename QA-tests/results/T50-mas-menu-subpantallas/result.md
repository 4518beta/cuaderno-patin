# T50 result

Verdict: **PASS**

Viewport 390x800, fresh context, Playwright (chromium headless). Screenshots in /tmp/qa-run-mas/shots/ (files named T50-*.png).

## TC table

| TC | Checks passed | Result | Observed vs expected |
|---|---|---|---|
| TC-01 | 35/35 | PASS | All checks matched expected text |
| TC-02 | 8/8 | PASS | All checks matched expected text |
| TC-03 | 7/7 | PASS | All checks matched expected text |
| TC-04 | 6/6 | PASS | All checks matched expected text |
| global | 2/2 | PASS | Console errors: none. Network 4xx/5xx: none |

## Failure classification

- (a) Real site bugs: none.
- (b) Task assumption problems: none that failed a TC.

## Notes

- Advisory (not a failure): selector `[data-a=go][data-id=mas]` matches both the bottom nav button and the `← Más` back button, and bare `h2` matches hidden tab panels (Hoy h2 comes first in DOM). Runner scoped selectors to `#bnav ...` and `:visible`.
