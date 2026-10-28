# T03-welcome-hoy-hoy-no-groups: result

Verdict: PASS
Run: Playwright, 390x800 (script /tmp/qa-run-welcome/t03.js).

| TC | Result | Observed vs expected |
|---|---|---|
| TC-01 empty Hoy | PASS | Hoy active, heading, card `Primer paso` with `Crear mi primer grupo`, card `Sincronizar con la otra profe` with `Sincronizar`, text `Todo compartido. No hay cambios nuevos tuyos.`, no Pasar lista / Ver plan / goDay; same after reload |
| TC-02 Crear mi primer grupo | PASS | Goes to Alumnas, `#gname` form visible; back on Hoy the empty state remains and no `g:` key in LS |
| TC-03 Sincronizar | PASS | Goes to Más, section `Sincronizar` visible; back on Hoy the empty state is shown |
| Console / network | PASS | None |

## Failure classification
No failures.
