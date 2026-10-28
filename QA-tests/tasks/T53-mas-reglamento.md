# T53-mas-reglamento: Más > Reglamento copa and efficiency selectors

| Field | Value |
|---|---|
| Route | `/` (tab Más, sub-screen `reglamento`) |
| Source | `/home/claude/cuaderno-patin/index.html` (rReglamento, COPAS, EFF, DESC, ACLAR, KIND, timeLabel, ACTIONS.rcopa, ACTIONS.reff) |
| Flow | Browse the CAP 2024 summary by copa and by efficiency level, open the PDF link |
| Requires auth | no |
| Required role | anonymous |
| Destructive | no |
| Estimated steps | 46 |

## Preconditions
- App running at `http://localhost:8080`
- Role: anonymous.
- Fresh browser profile: new browser context with empty localStorage, no cookies, no network access besides `localhost:8080`.
- File `/home/claude/cuaderno-patin/reglamento-cap-2024.pdf` is served at `http://localhost:8080/reglamento-cap-2024.pdf`.
- No seed data. The welcome form is completed in TC-01 with `QA Profe`.

## Test data
- `profeName = "QA Profe"`
- Copa buttons (`[data-a=rcopa]`), in this order: "Copa Roberto Rodríguez" (`rr`), "Copa González Molina" (`gm`), "Sub Divisional B" (`sb`), "Sub Divisional A (Nacional)" (`sa`), "Inline" (`in`), "Adultos" (`ad`).
- Default selection on first open: copa `gm`, efficiency "Eficiencia Tercera".
- Per copa, the first efficiency selected after clicking the copa, its time chip, the discount table heading and number of discount rows:

| Copa button | Efficiency buttons (`[data-a=reff]`) in order | First efficiency (card `h2`) | Chip "Tiempo: ..." | Discount `h3` | Rows |
|---|---|---|---|---|---|
| Copa Roberto Rodríguez | Escuela Formativa, Eficiencia Quinta, Eficiencia Cuarta | Escuela Formativa | Tiempo: máx. 1:30 | Descuentos de Copa Roberto Rodríguez | 9 |
| Copa González Molina | Eficiencia Tercera, Eficiencia Segunda, Eficiencia Primera | Eficiencia Tercera | Tiempo: 1:30 ± 5 s | Descuentos de Copa González Molina | 10 |
| Sub Divisional B | Eficiencia Promocional, Eficiencia Tercera, Eficiencia Segunda (Minis en adelante), Eficiencia Primera (Infantil en adelante) | Eficiencia Promocional | Tiempo: 2:00 ± 5 s | Descuentos de Sub Divisional B | 9 |
| Sub Divisional A (Nacional) | Nacional Tots, Nacional Minis, Nacional Infantil en adelante | Nacional Tots | Tiempo: 2:45 ± 10 s | Descuentos de Sub Divisional A (Nacional) | 10 |
| Inline | Divisional C: Preliminar, Divisional B: Intermedio, Divisional A: Avanzado | Divisional C: Preliminar | Tiempo: 2:00 ± 5 s | Descuentos de Inline | 2 |
| Adultos | Eficiencia Básica, Eficiencia Promocional, Eficiencia Elite, Eficiencia Leyenda | Eficiencia Básica | Tiempo: 2:00 ± 5 s | Descuentos de Adultos | 2 |

- Item kind chips: "Obligatorio", "Límite", "Opcional".
- Section order inside the page: Saltos, Trompos, Figuras, Pasos (a section with no items for the efficiency is not shown).

## Steps

### TC-01: Happy path - setup and default view (Copa González Molina, Eficiencia Tercera)
1. Open a new browser context. Navigate to `http://localhost:8080/`.
2. Assert: `h2` "Bienvenida" is visible.
3. Fill `#pname` with `QA Profe`. Click **`Empezar`**.
4. Assert: `#subttl` reads "Profe QA Profe · Liga".
5. Click the bottom nav button **`Más`**, then click the tile **`Reglamento`**.
6. Assert: `h2` "Reglamento" is visible with the text "Qué pide cada eficiencia. El checklist de cada alumna sale de acá." and a **`← Más`** button and a link **`Abrir el PDF`**.
7. Assert: text "Elegí la copa o divisional" and the 6 copa buttons exist in the order in `Test data`; only "Copa González Molina" has class `on`.
8. Assert: text "Eficiencia" and exactly 3 efficiency buttons ("Eficiencia Tercera", "Eficiencia Segunda", "Eficiencia Primera"); only "Eficiencia Tercera" has class `on`.
9. Assert: the summary card shows `h2` "Eficiencia Tercera", a white chip "Copa González Molina", and the chip "Tiempo: 1:30 ± 5 s".
10. Assert: sections `h3` "Saltos", "Trompos", "Pasos" are shown in that order and "Figuras" is not shown.
11. Assert: in "Saltos" there are 5 items; the item "Waltz jump, suelto o combinado" carries the chip "Obligatorio" and the item "Máximo 5 saltos en total (toe loop, salchow, flip, loop y vals)" carries the chip "Límite". In "Trompos" there are 4 items; in "Pasos" there are 3 items.
12. Assert: the card `h3` "Descuentos de Copa González Molina" has a table with headers "Situación" and "Descuento", 10 body rows, and the first row is "Arrodillarse o acostarse más de una vez, o más de 5 s" / "1,0".
13. Assert: the card `h3` "Aclaraciones generales" has 7 list items; the first starts with "Tiempo del programa: en la Copa RR empieza con el primer golpe musical."
14. Assert: the footer text starts with "Resumen del Reglamento Nacional de Patinaje Artístico CAP 2024." and ends with "Ante una duda, vale el PDF original."
15. Take a screenshot of the default view.

### TC-02: Switch copa - each copa resets to its first efficiency
1. For each row of the copa table in `Test data`, in order, do steps 2 to 5.
2. Click the copa button (`[data-a=rcopa]`).
3. Assert: only that copa button has class `on`; the efficiency buttons are exactly the list in the "Efficiency buttons" column and only the first has class `on`.
4. Assert: the summary card `h2` equals "First efficiency", the white chip equals the copa name, and the time chip equals the "Chip" column.
5. Assert: the discount card `h3` equals the "Discount `h3`" column and its table has the number of body rows in "Rows".
6. For the copa "Copa Roberto Rodríguez": assert the sections shown are "Trompos", "Figuras", "Pasos" in that order, and "Saltos" is not shown.
7. For the copa "Inline": assert the second discount row reads "El resto de los descuentos sigue lo de las divisionales Sub B y Sub A" / "según tabla".
8. Take a screenshot after each copa.

### TC-03: Switch efficiency inside a copa
1. Click the copa **`Copa Roberto Rodríguez`**, then click **`Eficiencia Cuarta`**.
2. Assert: only "Eficiencia Cuarta" has class `on`; the card `h2` is "Eficiencia Cuarta"; the time chip reads "Tiempo: máx. 1:35".
3. Assert: a "Saltos" section is now shown and contains "Waltz jump (mínimo 1, máximo 2)" with the chip "Obligatorio".
4. Click the copa **`Adultos`**, then click **`Eficiencia Elite`**.
5. Assert: the card `h2` is "Eficiencia Elite", the time chip reads "Tiempo: 2:45 ± 10 s", and the discount `h3` is "Descuentos de Adultos".
6. Click the copa **`Copa González Molina`**, then click **`Eficiencia Primera`**. Assert: the card `h2` is "Eficiencia Primera" and the time chip reads "Tiempo: 2:00 ± 5 s".
7. Click **`Copa Roberto Rodríguez`**, then **`Copa González Molina`**. Assert: the card `h2` is "Eficiencia Tercera" (the efficiency is reset to the first one of the copa, not remembered).

### TC-04: Selection is kept while the app stays loaded, and reset on reload
1. Click **`Sub Divisional B`**, then click **`Eficiencia Tercera`**. Assert: the card `h2` is "Eficiencia Tercera" and the white chip is "Sub Divisional B".
2. Click **`← Más`**, then click the tile **`Reglamento`**. Assert: "Sub Divisional B" has class `on` and the card `h2` is "Eficiencia Tercera" (the selection is kept in memory).
3. Reload the page, open Más > Reglamento. Assert: "Copa González Molina" has class `on` and the card `h2` is "Eficiencia Tercera" (the selection is not saved).
4. Read `localStorage` key `cuaderno-liga-v2`. Assert: `D` equals `{}`.

### TC-05: PDF link
1. Assert: the link **`Abrir el PDF`** has `href` ending in `reglamento-cap-2024.pdf`, `target="_blank"` and `rel` containing `noopener`.
2. Click the link and wait for the new tab.
3. Assert: the new tab URL is `http://localhost:8080/reglamento-cap-2024.pdf` and the response status is 200 with content type `application/pdf`.
4. Close the new tab. Assert: the original tab still shows the Reglamento screen.

### TC-06: Negative and edge cases
- Click the already selected copa button twice. Assert: the screen does not change and no error appears.
- Keyboard: focus **`Inline`** with Tab and press Enter. Assert: the card `h2` is "Divisional C: Preliminar".
- Long names: in "Sub Divisional B" assert the button "Eficiencia Segunda (Minis en adelante)" is fully visible (not cut off) at a 390x800 viewport.

## Assertions
- [ ] 6 copa buttons and the efficiency buttons listed in `Test data`.
- [ ] Time chips and discount tables match `Test data` for every copa.
- [ ] Item chips "Obligatorio", "Límite", "Opcional" render with the right text.
- [ ] Changing the copa resets the efficiency to the first one; changing the efficiency keeps the copa.
- [ ] "Abrir el PDF" opens the PDF in a new tab with status 200.
- [ ] `localStorage` `D` stays `{}`.
- [ ] No console errors in DevTools at any step.
- [ ] No failed network requests (no 4xx/5xx) except where explicitly expected.

## Screenshots required
- Default view (Copa González Molina, Eficiencia Tercera)
- Each of the 6 copas
- Eficiencia Cuarta with the Saltos section
- Discount table of Inline
- Final state after TC-06

## Pass criteria
All TCs above pass AND no unexpected console/network errors.
