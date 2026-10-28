# Catálogo de pruebas: Cuaderno de Patín

Sitio: una sola página (`index.html`) servida en http://localhost:8080. Sin login: todo el estado vive en localStorage (`cuaderno-liga-v2`).

| Ruta | Auth | Roles | Pruebas |
|---|---|---|---|
| `/` | no | anonymous | T01-welcome-hoy-name-gate, T02-welcome-hoy-name-gate-validation, T03-welcome-hoy-hoy-no-groups, T04-welcome-hoy-hoy-one-group, T05-welcome-hoy-hoy-buttons, T06-welcome-hoy-sync-snackbar |
| `/ (tab: alumnas)` | no | anonymous | T10-alumnas-create-group, T11-alumnas-group-form-validation, T12-alumnas-add-student, T13-alumnas-ficha-edit, T14-alumnas-cuotas, T15-alumnas-delete-student-group, T16-alumnas-edit-group |
| `/ (tab: clases)` | no | anonymous | T20-clases-guardar-clase, T21-clases-validacion-guardar, T22-clases-bloques-plantilla-copiar, T23-clases-abrir-editar, T24-clases-destructive-borrar, T25-clases-grupo-vinculado |
| `/ (tab: calendario)` | no | anonymous | T30-calendario-render-and-navigation, T31-calendario-attendance, T32-calendario-que-se-vio, T33-calendario-nota, T34-calendario-plan-link, T35-calendario-sync-prompt, T36-calendario-destructive-cascade |
| `/ (tab: coreos)` | no | anonymous | T40-coreos-list-and-student-view, T41-coreos-checklist-mandatory-items, T42-coreos-add-step, T43-coreos-destructive-delete-step, T44-coreos-song-link, T45-coreos-efficiency-and-duration, T46-coreos-worked-in-class |
| `/ (tab: mas)` | no | anonymous | T50-mas-menu-subpantallas, T51-mas-sincronizar, T52-mas-mensajes, T53-mas-reglamento, T54-mas-aviso-familias, T55-mas-ajustes-nombre |
| `/#importar` | no | anonymous | T60-importar-valid-merge, T61-importar-rejected-files, T62-importar-hash-link, T63-importar-crafted-id-security, T64-importar-newer-wins-merge |

Total: 7 rutas lógicas, 44 pruebas.

Cómo correr: levantar el sitio con `python3 -m http.server 8080 --bind 127.0.0.1` dentro de la carpeta del sitio y ejecutar `/qa-my-app:run-all`.
