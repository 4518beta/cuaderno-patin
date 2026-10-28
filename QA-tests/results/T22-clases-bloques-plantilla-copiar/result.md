# T22-clases-bloques-plantilla-copiar result

## Verdict: PASS

Viewport 390x800, fresh context, 27 assertions run, 0 failed. Console errors: none. Failed requests: none.

| TC | Assertions passed | Failed | Result |
|---|---|---|---|
| TC-01 | 10 | 0 | PASS |
| TC-02 | 7 | 0 | PASS |
| TC-03 | 4 | 0 | PASS |
| TC-04 | 6 | 0 | PASS |

## Failure classification

None. No real site bugs and no wrong task assumptions found.

Note: `Copiado` is set asynchronously after `navigator.clipboard.writeText` resolves, so it is empty for a few ms right after the click. The runner waited 300 ms before asserting. Not a site bug; the task could mention waiting. Clipboard content matched exactly (permissions granted).
