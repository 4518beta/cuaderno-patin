# T63-importar-crafted-id-security result

Verdict: PASS

Run: Playwright (chromium), viewport 390x800, fresh context, scripts and screenshots in /tmp/qa-run-importar.

| TC | Check | Result | Observed |
|---|---|---|---|
| TC-01 | Crafted file import | PASS | Summary '2 cambios nuevos...'; stored keys exactly ['g:gq1','s:sj1']; no key/value with onfocus, autofocus, quote or window.__x=1/2; s:sj1 songUrl === ''; window.__x undefined; no dialogs |
| TC-02 | Render surfaces on Hoy, Clases, Calendario, Coreos, Alumnas, Sincronizar | PASS | 0 elements with onfocus/autofocus/onclick/onerror/onload; 25 Tab presses and .focus() on all controls leave window.__x undefined; no javascript: href/src; 'Grupo Malo' and 'Alumna Mala' absent; Alumnas (1); gid select has 2 safe options |
| TC-03 | Alumna Link on Coreos | PASS | s:sj1 kept; no javascript: href/src, no iframe; __x undefined |
| TC-04 | Persistence after reload | PASS | No injection, Hoy shows 18:00 Grupo QA, 25 Tabs safe |
| TC-05 | Crafted id only in value | PASS | Entry dropped (summary 0 cambios); no stored g:gv1; __x undefined; no dialogs |
| Console/network | No errors | PASS | 0 console errors, 0 failed requests |

## Failure classification

No failures. No real site bugs.

## Task notes

None. Task note (stale): Preconditions say the id check in cleanData is 'a pending security fix' and drop assertions are expected to fail. The check is now in place (ID_FIELDS/ID_OK/idsOk in cleanData) and all assertions pass; the note should be removed.

Note: all panels stay in the DOM and hidden panels contain cards and h2s of other tabs, so selectors must be scoped to the visible panel (for example '#p-alumnas'). Assertions that say 'first card' or 'h2' are only correct for the visible panel.
