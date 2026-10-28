# T60-importar-valid-merge result

Verdict: PASS

Run: Playwright (chromium), viewport 390x800, fresh context, scripts and screenshots in /tmp/qa-run-importar.

| TC | Check | Result | Observed |
|---|---|---|---|
| TC-01 | Upload valid.json, summary, Combinar, data in Alumnas/Hoy, persists | PASS | Summary 'Archivo de Otra Profe' / '3 cambios nuevos para vos. No hay datos pisados.'; D empty before Combinar; after: keys g:gq1,s:sq1,s:sq2, t and merged correct; Alumnas shows Grupo QA, Alumnas (2), Dos then Uno; Hoy '18:00 Grupo QA' / 'sin lista todavía'; survives reload |
| TC-02 | Second import is idempotent | PASS | Warning 'Ya combinaste este archivo o uno más nuevo de Otra Profe.' + '0 cambios nuevos...'; Cancelar leaves D identical; third upload + Combinar leaves D identical; one group button, Alumnas (2) |
| TC-03 | Preview not persisted; back button drops preview | PASS | No card after reload; '← Más' then reopen shows no card, D unchanged |
| Console/network | No errors | PASS | 0 console errors, 0 failed requests |

## Failure classification

No failures. No real site bugs.

## Task notes

None. Note: the 'selected' state of the group button in TC-01 step 18 was not asserted (no aria-pressed on the button); the card content was checked instead.

Note: all panels stay in the DOM and hidden panels contain cards and h2s of other tabs, so selectors must be scoped to the visible panel (for example '#p-alumnas'). Assertions that say 'first card' or 'h2' are only correct for the visible panel.
