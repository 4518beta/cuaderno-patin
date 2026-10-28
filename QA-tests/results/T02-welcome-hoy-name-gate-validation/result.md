# T02-welcome-hoy-name-gate-validation: result

Verdict: PASS
Run: Playwright, fresh context per TC, 390x800 (script /tmp/qa-run-welcome/t02.js).

| TC | Result | Observed vs expected |
|---|---|---|
| TC-01 empty name | PASS | `#perr` = `Escribí tu nombre.`, gate still shown, `#subttl` = `Clases, coreos y asistencia de la liga`, no name in LS |
| TC-02 whitespace only | PASS | Same error, gate shown, nothing saved |
| TC-03 max length 40 | PASS | `maxlength="40"`, typed 45 A, value length 40, `#subttl` = `Profe ` + 40 A + ` · Liga`, stored name length 40 |
| TC-04 error clears | PASS | After valid submit: subttl `Profe QA Profe · Liga`, heading visible, error text no longer visible on the page |
| Console / network | PASS | None |

## Failure classification
No failures. Note for task authors: do not check for `Escribí tu nombre.` with page HTML (it is present in the inline script source); check visible text.
