# T33-calendario-nota QA result

Verdict: **PASS with task fixes**

Verdict PASS with task fixes: the site behaves correctly; one task step is wrong (see classification).

## Test cases

| TC | Result | Checks passed | Observed vs expected (failures only) |
|---|---|---|---|
| TC-00 | PASS | 2/2 | - |
| TC-01 | PASS | 9/9 | - |
| TC-02 | PASS | 2/2 | - |
| TC-03 | PASS with task fix | 7/8 | NOTE: selected day after step 5 is still day 15, not today (task gap): selected=martes, 15 de septiembre today=martes, 27 de octubre |
| TC-04 | PASS | 14/14 | - |
| TC-05 | PASS | 2/2 | - |
| TC-06 | PASS | 4/4 | - |

Console errors: none
Network requests besides document load / 4xx-5xx: none

## Failure classification

- **TC-03 step 6 (and cascade into TC-04 start)**: (b) task assumption wrong. After step 4 the selected day is still day 15 of the previous month; step 5 only changes the month (`month` does not move the selection) and step 6 never clicks today. The note checks "for today" therefore ran on day 15 (selected=martes, 15 de septiembre). Likewise TC-04 says "go to today" but nothing in the preceding steps selects it. Fix: add "click today's button" after step 5. After clicking today in my run, g2 empty and g1 `Repasar la entrada y el vals` both passed.
