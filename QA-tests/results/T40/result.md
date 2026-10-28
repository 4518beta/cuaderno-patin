# T40-coreos-list-and-student-view: result

Verdict: **PASS**

Run: Playwright (chromium), fresh context per task, viewport 390x800, site http://localhost:8080. Task file and index.html untouched.

## TC table

| TC | Result | Checks | Failed checks (observed vs expected) |
|---|---|---|---|
| TC-01 | PASS | 24 | - |
| TC-02 | PASS | 22 | - |
| TC-03 | PASS | 11 | - |
| TC-04 | PASS | 5 | - |

Console errors / failed or external requests: none

## Failure classification

No failures. No real site bugs; no wrong task assumptions that blocked a TC.

## Notes

- No task assumption was wrong. #save read "Guardado en este celular".

## Check log

- TC-01 PASS: h1 (obs: `Cuaderno de Patín`)
- TC-01 PASS: Bienvenida (obs: `martes, 27 de octubre Cuaderno de Patín Clases, coreos y asistencia de la liga Guardado en este celular Bienvenida Esto es un cuaderno para organizar `)
- TC-01 PASS: #pname placeholder (obs: `Tu nombre de pila`)
- TC-01 PASS: Empezar visible (obs: `true`)
- TC-01 PASS: subtitle (obs: `martes, 27 de octubre Cuaderno de Patín Profe QA Profe · Liga Guardado en este celular Buen día, QA Profe Para empezar, creá tu primer grupo y cargá a`)
- TC-01 PASS: Hoy heading (obs: `Buen día, QA Profe Para empezar, creá tu primer grupo y cargá a las alumnas. Primer paso Un grupo es una clase que se repite, por ejemplo "Intermedio `)
- TC-01 PASS: Coreografías (obs: `Coreografías Primero creá un grupo y cargá alumnas en Alumnas.`)
- TC-01 PASS: empty no group (obs: `Coreografías Primero creá un grupo y cargá alumnas en Alumnas.`)
- TC-01 PASS: no group buttons/cards (obs: `0`)
- TC-01 PASS: Alumnas y grupos (obs: `Alumnas y grupos Un grupo es una clase que se repite. Cada profe crea y maneja los suyos. Nuevo grupo Nombre Nivel Iniciación Intermedio Avanzado Hora`)
- TC-01 PASS: Nuevo grupo (obs: `Alumnas y grupos Un grupo es una clase que se repite. Cada profe crea y maneja los suyos. Nuevo grupo Nombre Nivel Iniciación Intermedio Avanzado Hora`)
- TC-01 PASS: gname placeholder (obs: `Ej: Intermedio tarde`)
- TC-01 PASS: nivel default (obs: `Iniciación`)
- TC-01 PASS: group card (obs: `true`)
- TC-01 PASS: Alumnas (0) + empty (obs: `true`)
- TC-01 PASS: coreos group no students (obs: `true`)
- TC-01 PASS: seg Grupo QA on (obs: `true`)
- TC-01 PASS: Alumnas (1), row, sin cuota (obs: `true`)
- TC-01 PASS: #sterr empty (obs: ``)
- TC-01 PASS: #newstu empty (obs: ``)
- TC-01 PASS: #newstu focused (obs: `true`)
- TC-01 PASS: one student card (obs: `1`)
- TC-01 PASS: card text (obs: `true`)
- TC-01 PASS: card after reload (obs: `true`)
- TC-02 PASS: back button (obs: `true`)
- TC-02 PASS: h2 (obs: `Alumna QA`)
- TC-02 PASS: subtitle (obs: `Grupo QA · Eficiencia Quinta`)
- TC-02 PASS: eff select (obs: `Según el nivel del grupo (Eficiencia Quinta)`)
- TC-02 PASS: Del reglamento + chip (obs: `true`)
- TC-02 PASS: note faltan (obs: `true`)
- TC-02 PASS: 3 checkboxes false (obs: `3`)
- TC-02 PASS: total checkboxes (obs: `3`)
- TC-02 PASS: dur empty (obs: ``)
- TC-02 PASS: dur placeholder (obs: `Ej: 2:00`)
- TC-02 PASS: dur text (obs: `true`)
- TC-02 PASS: Agregar un paso card (obs: `true`)
- TC-02 PASS: sp_t placeholder (obs: `0:20`)
- TC-02 PASS: sp_txt placeholder (obs: `Ej: salto de vals en la diagonal`)
- TC-02 PASS: sp_tipo, sp_ref exist (obs: `true`)
- TC-02 PASS: Agregar paso btn (obs: `true`)
- TC-02 PASS: Canción card (obs: `true`)
- TC-02 PASS: songin placeholder (obs: `Pegá el link, y si querés el nombre al lado`)
- TC-02 PASS: Trabajada en clase text (obs: `true`)
- TC-02 PASS: list again (obs: `true`)
- TC-02 PASS: (after reload) Hoy tab shown (obs: `true`)
- TC-02 PASS: list not student view (obs: `true`)
- TC-03 PASS: group B card (obs: `true`)
- TC-03 PASS: B alumna row (obs: `true`)
- TC-03 PASS: segments order (obs: `Grupo QA|Grupo QA B`)
- TC-03 PASS: Grupo QA on (obs: `Grupo QA`)
- TC-03 PASS: only Alumna QA card (obs: `Alumna QA`)
- TC-03 PASS: Grupo QA B on (obs: `Grupo QA B`)
- TC-03 PASS: B card (obs: `true`)
- TC-03 PASS: B subtitle (obs: `Grupo QA B · Eficiencia Tercera`)
- TC-03 PASS: B select (obs: `Según el nivel del grupo (Eficiencia Tercera)`)
- TC-03 PASS: B chip & time (obs: `true`)
- TC-03 PASS: back to Alumna QA (obs: `Alumna QA`)
- TC-04 PASS: student view kept after tab switch (obs: `true`)
- TC-04 PASS: list with card (obs: `true`)
- TC-04 PASS: #save text (obs: `Guardado en este celular`)
- TC-04 PASS: no console errors (obs: `0`)
- TC-04 PASS: no external requests (obs: `0 `)