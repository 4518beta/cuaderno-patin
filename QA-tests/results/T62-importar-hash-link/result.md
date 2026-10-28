# T62-importar-hash-link result

Verdict: PASS

Run: Playwright (chromium), viewport 390x800, fresh context, scripts and screenshots in /tmp/qa-run-importar.

| TC | Check | Result | Observed |
|---|---|---|---|
| TC-01 | First visit via /#importar | PASS | Welcome gate first; empty name gives 'Escribí tu nombre.'; after Empezar h2 Sincronizar, '← Más', #impin, Más aria-current=page, href ends #importar |
| TC-02 | Saved name | PASS | Direct to Sincronizar; '← Más' shows Más and keeps hash; reload returns to Sincronizar |
| TC-03 | Hash read once | PASS | location.hash change does nothing; reload opens Sincronizar; '' then '#importar' leaves Hoy |
| TC-04 | Non-matching hashes | PASS | #Importar, #importar/, #sync, # all open Hoy |
| TC-05 | Copied link | PASS | Clipboard equals expected message; 'Copiado'; URL opens Sincronizar |
| TC-06 | Query string + hash; no data written | PASS | ?src=wa#importar opens Sincronizar; D={} profe='QA Profe' |
| Console/network | No errors | PASS | 0 console errors, 0 failed requests |

## Failure classification

No failures. No real site bugs.

## Task notes

None.

Note: all panels stay in the DOM and hidden panels contain cards and h2s of other tabs, so selectors must be scoped to the visible panel (for example '#p-alumnas'). Assertions that say 'first card' or 'h2' are only correct for the visible panel.
