# T61-importar-rejected-files result

Verdict: PASS

Run: Playwright (chromium), viewport 390x800, fresh context, scripts and screenshots in /tmp/qa-run-importar.

| TC | Check | Result | Observed |
|---|---|---|---|
| TC-01 | wrongapp.json rejected | PASS | #smsg = 'Ese archivo no es una copia del cuaderno de la liga.'; no card; D={} merged={} |
| TC-02 | fmt3.json rejected | PASS | Exact newer-version message; Alumnas shows Nuevo grupo form |
| TC-03 | notjson.json rejected | PASS | 'Ese archivo no es una copia del cuaderno.' |
| TC-04 | empty.json rejected | PASS | 'Ese archivo no es una copia del cuaderno.' |
| TC-05 | Recovery and error replacing summary | PASS | ok.json: '1 cambios nuevos...' and #smsg empty; wrongapp after summary removes card and shows error; Cancelar clears |
| TC-06 | Same file twice, reload, final state | PASS | Same message twice; #smsg empty after reload; D={} lastShared=0 |
| Console/network | No errors | PASS | 0 console errors, 0 failed requests |

## Failure classification

No failures. No real site bugs.

## Task notes

None.

Note: all panels stay in the DOM and hidden panels contain cards and h2s of other tabs, so selectors must be scoped to the visible panel (for example '#p-alumnas'). Assertions that say 'first card' or 'h2' are only correct for the visible panel.
