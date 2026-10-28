# T05-welcome-hoy-hoy-buttons: result

Verdict: PASS with task fixes
Run: Playwright, 390x800, today = 2026-10-27, script /tmp/qa-run-welcome/t05.js.

| TC | Result | Observed vs expected |
|---|---|---|
| TC-01 Pasar lista | PASS | Goes to Calendario (nav active). Heading `Calendario`, group chip `Grupo QA`, month `Octubre 2026`, detail `martes, 27 de octubre`, `clase del grupo`, `Grupo QA · 18:00`, section `Asistencia` (0 de 0, no students). Back to Hoy: card still shown |
| TC-02 Pasar lista | PASS | See TC-01 |
| TC-02 Ver plan | PASS | Goes to Clases, `Planificador de clases` with group preselected `Grupo QA` |
| TC-02 goDay today | PASS | Calendario, `martes, 27 de octubre` |
| TC-02 goDay Lun | PASS | Calendario, `lunes, 26 de octubre` (labelled `día extra`) |
| TC-02 goDay Dom | PASS | Calendario, `domingo, 1 de noviembre`, month switched to Noviembre 2026 (labelled `día extra`) |
| TC-03 round trip stability | PASS | One `18:00 Grupo QA` card, 7 strip buttons, exactly one group in LS, no attendance (`a:`) or log (`l:`) keys |
| Console / network | PASS | None |

## Failure classification
No site bugs. Task assumption (b): `[data-a=pasarLista]` and `[data-a=verPlan]` are duplicated on Hoy (the `Próxima clase` card plus the `Clases de hoy` card), so selectors must be scoped to the card of the day; the `Próxima clase` card may point to a later date (here Tuesday 3 Nov, because the 18:00 class time had already passed). Also the "Calendario shows attendance ready" step cannot be verified without students; with zero students it shows `Este grupo todavía no tiene alumnas`.
