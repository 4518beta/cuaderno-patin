# T04-welcome-hoy-hoy-one-group: result

Verdict: PASS with task fixes
Run: Playwright, 390x800, today = 2026-10-27 (Tuesday), script /tmp/qa-run-welcome/t04.js.
Group form labels recorded: Nombre (`#gname`), Nivel (`#glevel`, default Iniciación), Hora (`#ghora`, type time), Días de clase (checkboxes `.gday` Lun..Dom). Save button: `Guardar grupo` (`[data-a=saveGroup]`), the form closes after saving.

| TC | Result | Observed vs expected |
|---|---|---|
| TC-01 create group and see card | PASS | Group in Alumnas, Hoy shows h3 `18:00 Grupo QA` with Pasar lista and Ver plan, no `Primer paso`, persists after reload |
| TC-02 week strip | PASS | 7 `goDay` buttons, ids 2026-10-26..2026-11-01, labels Lun Mar Mié Jue Vie Sáb Dom, exactly one marked (class `on`) = 2026-10-27, consecutive Monday to Sunday |
| TC-03 non-class day | PASS with task fix | After moving the class day to another weekday, the h3 `18:00 Grupo QA` is gone from Hoy; restored and it returns. A `Pasar lista` button still exists but belongs to the `Próxima clase` card (future date) |
| Console / network | PASS | None |

## Failure classification
- No site bugs.
- Task assumptions to fix (b): (1) Hoy always renders a `Próxima clase` card with its own `Pasar lista` and `Ver plan` buttons, so `[data-a=pasarLista]` matches 2 elements on a class day and still 1 on a non-class day; scope selectors to the `Clases de hoy` card (`.card:has(h3:text("18:00 Grupo QA"))`). TC-03 step 2 "Pasar lista is not shown today" must be read as "not in today's card". (2) Today in the week strip is marked by CSS class `on` only, with no aria attribute. (3) The group form has no day dropdown, days are checkboxes.
