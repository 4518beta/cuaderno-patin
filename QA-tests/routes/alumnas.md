# Route: / (tab Alumnas: group form, group view, ficha)
Source: index.html (groupForm, rAlumnas, rFicha, ACTIONS). Live inventory + source analysis. Role: anonymous.
## Group form (shown directly on Alumnas when there are no groups; also via `newGroup` and `editGroup`)
- `#gname` text maxlength 60, placeholder "Ej: Intermedio tarde", required. `#glevel` select: Iniciación (default), Intermedio, Avanzado. `#ghora` time, optional. 7 checkboxes `input.gday` values 1,2,3,4,5,6,0 (Lun..Dom), none checked by default.
- `[data-a=saveGroup]` "Guardar grupo"; `[data-a=cancelGroup]` "Cancelar" (with zero groups the form shows again). Error `#gerr` role=alert: empty or whitespace name gives "Poné un nombre." and writes nothing.
- Valid save writes `g:<id>` {name, level, hora, dias, profe}; view switches to the group with `agroup#<gid>` tab, chip with level, days "Mar, Jue · 18:30" or "Sin días cargados", line "Profe: QA Profe · Cuota de <Mes>: 0 de 0".
- Edit: `editGroup#<gid>` opens the form titled "Editar grupo", prefilled. No duplicate-name check.
## Group view
- `newGroup` "+ Nuevo grupo", `agroup#<gid>` segmented tabs, `editGroup`, `delGroup#<gid>` "Borrar grupo" (two-click inline confirm: first click shows "¿Seguro?", clicking any other data-a element cancels, second click deletes group and its students; q:* cuota keys are left as orphans).
- Heading "Alumnas (n)". Add form: `#newstu` text maxlength 60, placeholder "Nombre de pila", `[data-a=addStu]` "Agregar", error `#sterr`: "Escribí el nombre." Empty list text: "Todavía no hay alumnas en este grupo." Row: name, chip "sin cuota" / "cuota al día" (current month), `openFicha#<sid>` "Ficha".
## Ficha
- `#fname` text (required, "Poné un nombre." in `#ferr` role=status), `#fgid` select of groups, `[data-a=saveFicha]` "Guardar" (returns to list), `closeFicha` "← Volver al grupo".
- 10 cuota toggles `cuota#q:<sid>:<YEAR>-<MM>` Mar..Dic with aria-pressed; Ene and Feb have no button.
- `delStu` "Borrar alumna" two-click "¿Seguro?"; deletes `s:<id>`, keeps q:* orphans.
- The ficha has no canción, nivel or notas (canción is in Coreos; notas in Calendario).
