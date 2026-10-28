# T01-welcome-hoy-name-gate: result

Verdict: PASS with task fixes
Run: Playwright, fresh context per TC group, 390x800. Screenshots and scripts in /tmp/qa-run-welcome (t01.js, t01b.js).

| TC | Result | Observed vs expected |
|---|---|---|
| TC-01 steps 2-4 gate | PASS | `#pname` visible, placeholder `Tu nombre de pila`, button `Empezar`, `#perr` empty, localStorage key absent |
| TC-01 steps 5-11 submit | PASS | Gate gone, `#subttl` = `Profe QA Profe · Liga`, heading `Buen día, QA Profe`, nav ids hoy,clases,calendario,coreos,alumnas,mas, LS contains `"profe":"QA Profe"` after 1 s |
| TC-01 steps 12-13 reload | PASS | No gate, subttl and heading unchanged |
| TC-02 gate on every tab | FAIL as written, PASS with fix | With selector `#pname` the check failed on all 5 tabs (`isVisible('#pname')` returned false). With `section.panel.on #pname` and `Empezar` the gate is visible on clases, calendario, coreos, alumnas, mas |
| TC-03 trim | PASS | subttl `Profe QA Profe · Liga`, heading `Buen día, QA Profe` |
| Console / network | PASS | No console errors, no 4xx/5xx, no failed requests |

## Failure classification
- TC-02: (b) wrong selector in the task. After a tab switch, the Hoy panel keeps its old gate markup in the DOM (hidden panel), so `#pname` matches two elements and the first one is hidden. The gate itself is shown correctly. Fix the task: scope to `section.panel.on #pname` (or `#p-<tab> #pname`). Minor site note, not a functional bug: duplicate id `pname` in the DOM while the gate is shown on a non-Hoy tab (panels are only re-rendered when active, see renderPanel in index.html).
