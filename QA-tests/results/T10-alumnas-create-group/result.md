# T10-alumnas-create-group result

**Verdict: PASS with task fixes**

Run: Playwright (chromium), fresh context per task, viewport 390x800, site http://localhost:8080. Screenshots in /tmp/qa-run-alumnas/T10/.

## Test cases

| TC | Check | Result | Observed vs expected |
|---|---|---|---|
| TC-00 | welcome gate visible | PASS |  |
| TC-00 | #pname placeholder | PASS |  |
| TC-00 | #subttl | PASS |  |
| TC-00 | Buen día heading | PASS |  |
| TC-01 | Primer paso card | PASS |  |
| TC-01 | Alumnas nav active | PASS |  |
| TC-01 | heading + form title | PASS |  |
| TC-01 | gname empty | PASS |  |
| TC-01 | gname placeholder | PASS |  |
| TC-01 | glevel default | PASS |  |
| TC-01 | level options | PASS |  |
| TC-01 | ghora empty | PASS |  |
| TC-01 | 7 day labels | PASS |  |
| TC-01 | none checked | PASS |  |
| TC-01 | buttons | PASS |  |
| TC-01 | gerr empty | PASS |  |
| TC-01 | form gone | PASS |  |
| TC-01 | tab present | PASS |  |
| TC-01 | tab highlighted | PASS |  |
| TC-01 | h3 | PASS |  |
| TC-01 | chip Intermedio | PASS |  |
| TC-01 | line Mar, Jue · 18:30 | PASS |  |
| TC-01 | Profe line present | PASS |  |
| TC-01 | Cuota month label (task says Spanish month name) | FAIL | observed "Oct", expected "octubre" per task wording (short label would be "Oct") |
| TC-01 | buttons Editar/Borrar/+Nuevo | PASS |  |
| TC-01 | Alumnas (0) | PASS |  |
| TC-01 | newstu placeholder | PASS |  |
| TC-01 | Agregar + empty text | PASS |  |
| TC-01 | exactly one g: key | PASS |  |
| TC-01 | stored shape | PASS |  |
| TC-01 | no welcome gate after reload | PASS |  |
| TC-01 | subttl after reload | PASS |  |
| TC-01 | Hoy no Crear primer grupo | PASS |  |
| TC-01 | tab after reload | PASS |  |
| TC-01 | card after reload | PASS |  |
| TC-02 | form Nuevo grupo | PASS |  |
| TC-02 | empty/default | PASS |  |
| TC-02 | tab order | PASS |  |
| TC-02 | first highlighted | PASS |  |
| TC-02 | h3 | PASS |  |
| TC-02 | chip Iniciación | PASS |  |
| TC-02 | "Sin días cargados" exact line | PASS |  |
| TC-02 | Profe line | PASS |  |
| TC-02 | first group unchanged | PASS |  |
| TC-02 | both tabs after reload | PASS |  |
| TC-03 | group view | PASS |  |
| TC-03 | tabs unchanged | PASS |  |
| END | No console errors/warnings | PASS |  |
| END | No network requests besides the page load | PASS |  |
| END | No dialogs | PASS |  |

Totals: 49 PASS, 1 FAIL.

## Failure classification

- TC-01 Cuota month label: (b) task assumption wrong. The group line renders `Cuota de Oct: n de m` (short label from `MESES`, index.html line ~745), not the full Spanish month name `octubre`/`Octubre` that the task data (`currentMonth = Spanish month name`) describes. Fix the task: use the 3-letter label (Ene, Feb, Mar, ... Dic).

Real site bugs: none.
