# Route: / (tab Clases)
Source: index.html (rClases). Live inventory + source. Role: anonymous.
- Heading "Planificador de clases", "Clases guardadas". Works with no groups (select shows "Sin grupo").
- Fields: title text (placeholder "Ej: Saltos de vals"); group select ("Sin grupo" + each group); date input; level select (Iniciación, Intermedio, Avanzado); 5 default blocks, each with text, number (minutes) and textarea (notes).
- Buttons: `loadTpl` "Cargar plantilla", `delBlock#0..4` "Quitar", `addBlock` "Agregar bloque", `savePlan` "Guardar clase", `copyPlan` "Copiar texto" (clipboard). Saved plans appear in "Clases guardadas" with delete (two-click confirm `delPlan`).
- `verPlan#<gid>` from Hoy or Calendario jumps here. Check in source: save validation messages, template contents, total minutes, saved plan list actions.
