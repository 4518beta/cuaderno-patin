# T36-calendario-destructive-cascade QA result

Verdict: **FAIL**

Verdict FAIL because of one real site bug (stale attendance of a deleted alumna), which the task itself anticipates as a defect. Two task assumptions are also wrong.

## Test cases

| TC | Result | Checks passed | Observed vs expected (failures only) |
|---|---|---|---|
| TC-00 | PASS | 2/2 | - |
| TC-01 | PASS | 6/6 | - |
| TC-02 | PASS | 7/7 | - |
| TC-03 | FAIL | 3/5 | NOTE task gap: Alumnas tab reopens on Ficha (ui.ficha kept), no Ficha button to click: delStu button already visible: Alumnas tab still shows QB ficha, h2=Alumna QB; step6 chip 0 de 1 and mark clase (stale attendance): chip=1 de 1 mark=hecha |
| TC-04 | FAIL | 3/4 | chip 1 de 1: chip=2 de 1 (stale defect expected 2 de 1 if present) |
| TC-05 | PASS | 6/6 | - |
| TC-06 | FAIL | 4/5 | NOTE task gap: Back leaves the app (about:blank) and Forward reloads on Hoy; no in-app history: after Back url=about:blank; after Forward tab=Hoy |

Console errors: none
Network requests besides document load / 4xx-5xx: none

## Failure classification

- **TC-03 step 6 / TC-04 step 1**: (a) REAL SITE BUG. Deleting Alumna QB (who had attendance today) leaves her attendance record. `presentCount` (index.html line 477) counts stored `a:<gid>:<date>:` keys, not existing students, and `delStu` (line 946) only deletes `s:<id>`. Observed after delete: chip `1 de 1`, today mark `hecha` (expected `0 de 1`, `clase`). In TC-04, after marking Alumna QA, chip reads `2 de 1` (expected `1 de 1`). The Hoy card count (`N de M vinieron`, line 589) uses the same function, so it is wrong too. Fix idea: count only attendance keys whose student id still exists, or delete `a:*:*:<sid>` in `delStu`.
- **TC-03 step 1**: (b) task assumption wrong. After TC-02 step 6 the Alumnas tab is left on QB's ficha (`ui.ficha` is kept across tab changes). On returning to Alumnas the ficha is already open, so there is no `Ficha` button to click on the group list. Fix: first click `← Volver al grupo`, or drop the "Click Ficha" part of step 1.
- **TC-06 bullet 1**: (b) task assumption wrong. The app has no history/routing: Back from the first page goes to about:blank and Forward reloads the app on Hoy (not Calendario). "Calendario open, press Back and Forward, empty state remains" cannot be observed as written. After Forward and clicking Calendario the empty state was correct.
