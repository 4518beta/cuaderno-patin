# T06-welcome-hoy-sync-snackbar: result

Verdict: PASS with task fixes
Run: Playwright, 390x800, script /tmp/qa-run-welcome/t06.js. Student `Alumna QA` added first. Action used: first `[data-a=att]` toggle in Calendario (attendance mark, saved immediately, no save button).

| TC | Result | Observed vs expected |
|---|---|---|
| TC-01 before action | PASS | `#ask` empty. Hoy showed `2 cambios tuyos todavía sin compartir.` (group and student already count), so `Todo compartido...` is NOT shown; the task allows the sync card alternative |
| TC-01 after attendance | PASS | Text became `3 cambios tuyos todavía sin compartir.` |
| TC-01 after 25 s | PASS | Hidden at 24 s, visible at 25.3 s with `Terminó la clase. ¿Sincronizás con la otra profe?`, buttons `Sincronizar` and `Ahora no` |
| TC-02 Ahora no | PASS | Hidden; after another attendance toggle and 30 s it did not return; after reload, same action and 30 s, still hidden |
| TC-03 no unshared actions | PASS | Fresh profile with group only, 30 s on Hoy: `#ask` never appeared (timer only arms on attendance, log, note actions) |
| Console / network | PASS | None |

## Failure classification
No site bugs. Task assumptions (b): (1) step 1 / TC-01 "Todo compartido..." can only be seen before creating the group; creating a group or student already makes changes unshared, and TC-03 relies on the snackbar being armed only by attendance/log/note actions, not by "no unshared changes" (the group creation alone leaves unshared changes but no snackbar). (2) There is no "save attendance" control, marks save on tap. (3) `#ask` also contains a `Sincronizar` button besides `Ahora no`.
