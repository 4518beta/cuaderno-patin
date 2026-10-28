# Route: / (tab Más and its sub-screens)
Source: index.html (rMas, rSync, rMensajes, rReglamento, rAviso, rAjustes). Live inventory. Role: anonymous.
- Menu `sub#sync|mensajes|reglamento|aviso|ajustes`; every sub-screen has `go#mas` "← Más".
- Sincronizar: cards "Guardar mis datos en Drive" (`share` "Guardar en Drive", `download` "Bajar al celular"), "Mandar mis datos por WhatsApp" (`shareWa` "Mandar por WhatsApp", `copyWaMsg` "Copiar el mensaje"), "Subir los datos que me mandó otra profe" (file input `#impin`, preview and `applyMerge` "Combinar"). Share and download use the Web Share API or a file download: do not click them in automated runs except where a download is expected.
- Mensajes: 7 templates (Aviso de torneo, Recordatorio de cuota, Clase suspendida, Bienvenida, Festival de fin de año, Inscripciones abiertas, Anuncio del festival), each a textarea `#m0..#m6` + `copyMsg#m<n>` "Copiar".
- Reglamento: copa selector `rcopa#rr|gm|sb|sa|in|ad`, efficiency selector `reff#<copa>-<nivel>`, sections Saltos, Trompos, Pasos, "Descuentos de Copa González Molina", "Aclaraciones generales", link to reglamento-cap-2024.pdf (target _blank).
- Aviso a familias: textarea `#avisotxt` + `copyMsg#avisotxt`.
- Ajustes: `#pname2` (name) + `saveProfe` "Guardar"; section "Borrar todo en este celular" with `delAll#all` two-click confirm "Borrar todo" (wipes localStorage; use only for cleanup).
- Import validation (source): `parseImport` rejects a foreign `app` or `fmt` greater than 2; `cleanData` drops keys not matching /^[gscalnkpq]:.{1,300}$/ and (after the pending security fix) entries with bad ids.
