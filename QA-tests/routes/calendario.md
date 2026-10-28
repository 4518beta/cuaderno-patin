# Route: / (tab Calendario)
Source: index.html (rCalendario). Live inventory + source. Role: anonymous.
- Empty state (no groups): heading "Calendario" and text "Primero creá un grupo…" with no controls.
- With a group: group selector `cgroup#<gid>`, month nav `month#-1` "←" and `month#1` "→", heading "Octubre 2026", day grid `pickDay#YYYY-MM-DD` (marks: "clase" on class days, "falta" where attendance has absences), selected day heading "martes, 27 de octubre".
- "Asistencia": per-alumna present/absent toggles (check in source: `asist` action; needs students). "Qué se vio": `logItem#x:sin` "Sin clase este día", `verPlan#<gid>` "Armar plan", and toggles `logItem#<name>` for Entrada en calor, Técnica, Saltos, Trompos, Figuras, Footwork, Pasada con música, Juegos, Evaluación; free text `#free` (placeholder "Algo más que se hizo") + `addFree` "Agregar"; notes `#nota` textarea (placeholder "Ej: faltó el parlante, repasar la entrada") + `saveNota` "Guardar nota".
- Every attendance or log change arms the 25 s `#ask` sync prompt.
