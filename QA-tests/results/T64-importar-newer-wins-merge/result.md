# T64-importar-newer-wins-merge result

Verdict: PASS

Run: Playwright (chromium), viewport 390x800, fresh context, scripts and screenshots in /tmp/qa-run-importar.

| TC | Check | Result | Observed |
|---|---|---|---|
| TC-01 | Base import | PASS | 3 cambios nuevos; Alumnas (2); D['g:gq1'].t=1700000000100 |
| TC-02 | Older edit ignored | PASS | 0 cambios nuevos; name stays Grupo QA |
| TC-03 | Newer edit wins | PASS | 1 cambios nuevos; Grupo QA Nuevo; t=1700000000200; s:sq1 t unchanged |
| TC-04 | Tombstone deletes | PASS | Alumnas (1); D['s:sq2'] = {t:1700000000300, v:null}; Hoy shows Grupo QA Nuevo |
| TC-05 | Older revival ignored | PASS | 0 cambios; still Alumnas (1); tombstone intact |
| TC-06 | Newer revival wins | PASS | Alumnas (2) with 'Alumna Dos Vuelta'; t=1700000000350; persists after reload |
| TC-07 | Edge cases | PASS | Reimport shows 'Ya combinaste...' + 0 cambios, Cancelar keeps D; older.json keeps name; keys exactly g:gq1,s:sq1,s:sq2 |
| Console/network | No errors | PASS | 0 console errors, 0 failed requests |

## Failure classification

No failures. No real site bugs.

## Task notes

None.

Note: all panels stay in the DOM and hidden panels contain cards and h2s of other tabs, so selectors must be scoped to the visible panel (for example '#p-alumnas'). Assertions that say 'first card' or 'h2' are only correct for the visible panel.
