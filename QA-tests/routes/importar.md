# Route: /#importar
Source: index.html boot() (the only reader of location.hash, runs once at load, no hashchange listener).
- Loading `/#importar` with a saved name opens Más > Sincronizar (`ui.tab=mas`, `ui.sub=sync`). Without a saved name the welcome gate shows first.
- Same screen as Más > Sincronizar; the import card has file input `#impin` and, after picking a valid file, a summary and `applyMerge` "Combinar".
- Test data: a valid export is {"app":"cuaderno-liga","fmt":2,"profe":"X","at":<ms>,"data":{"g:g1":{"t":1,"v":{...}}}}. Invalid cases: wrong `app`, `fmt` 3, non-JSON, empty file.
