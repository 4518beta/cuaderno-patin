# Route: / (welcome gate + tab Hoy)
Source: index.html (rWelcome, rHoy). Analysis mode: live (Playwright, 390x800) + source. Role: anonymous. No auth. No console errors observed.
Navigation: single page, bottom nav `#bnav [data-a=go][data-id=hoy|clases|calendario|coreos|alumnas|mas]`, URL never changes. State in localStorage key `cuaderno-liga-v2`. Panels re-render on every action: re-query selectors.
## Welcome gate (shown on every tab until a name is saved)
- Field `#pname` text, maxlength 40, placeholder "Tu nombre de pila". Button `[data-a=setProfe]` "Empezar". Error `#perr` role=alert.
- Empty or whitespace name: "Escribí tu nombre." and nothing saved. Valid: name trimmed to 40 chars, `#subttl` becomes "Profe QA Profe · Liga".
## Hoy with no groups
- Heading "Buen día, QA Profe"; card "Primer paso" with `[data-a=newGroup]` "Crear mi primer grupo" (goes to Alumnas group form); card "Sincronizar con la otra profe" with `[data-a=goSync]` "Sincronizar" (goes to Más > Sincronizar); text "Todo compartido. No hay cambios nuevos tuyos."
## Hoy with one group (Grupo QA, today is a class day)
- Card "18:00 Grupo QA" with `pasarLista#<gid>` "Pasar lista" and `verPlan#<gid>` "Ver plan"; week strip of 7 `goDay#YYYY-MM-DD` buttons (Lun..Dom, today marked); buttons go to Calendario (pasarLista, goDay) and Clases (verPlan).
- `#ask` snackbar "Terminó la clase. ¿Sincronizás con la otra profe?" appears 25 s after attendance or log actions when there are unshared changes; "Ahora no" suppresses it for the day.
