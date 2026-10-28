# Cuaderno de Patín (sitio web)

Un sitio web de una sola página para profes de patín artístico: clases, calendario con asistencia, coreografías con el checklist del reglamento CAP 2024 y fichas de alumnas. No se instala nada: se abre el link en Chrome.

Los datos de cada profe quedan guardados en su propio celular. Para compartir entre las dos profes se usa una carpeta privada de Google Drive y el botón "Sincronizar".

## Publicarlo (una sola vez)

1. Entrá a github.com, creá una cuenta y activá la verificación en dos pasos.
2. "New repository". Nombre: `cuaderno-patin`. Marcá **Public** (con cuenta gratis, Pages solo funciona con repositorios públicos). Tildá "Add a README file" y creá.
3. "Add file", "Upload files". Arrastrá **el contenido** de esta carpeta (no la carpeta): `index.html`, `reglamento-cap-2024.pdf` y `.nojekyll`. "Commit changes".
4. "Settings", "Pages". En "Source" elegí "Deploy from a branch", rama `main`, carpeta `/ (root)` y "Save".
5. En uno o dos minutos aparece el link: `https://4518beta.github.io/cuaderno-patin/`.

El repositorio solo tiene el código. Nunca se suben nombres de alumnas.

## Usarlo

- Abrí el link en Chrome. Tocá los tres puntitos y "Agregar a la pantalla principal" para tener un acceso directo (es opcional).
- La primera vez pide tu nombre. La otra profe lo ve al sincronizar.
- Cada profe crea sus grupos en **Alumnas**. En **Calendario** cualquiera de las dos puede pasar lista y anotar lo que se vio, en cualquier grupo.
- En **Coreos**, cada alumna tiene el checklist del reglamento de su nivel y una lista de pasos propios (técnicos y artísticos). Si un paso cumple un elemento del reglamento, el checklist lo tilda solo. La app avisa solo si faltan elementos obligatorios.

## Sincronizar entre las dos profes

Las dos comparten una carpeta de Drive llamada `Cuaderno Liga` (compartida como Editor, nunca con "cualquiera con el vínculo").

1. **Más, Sincronizar, Paso 1:** elegí el archivo más nuevo de la otra profe, que está en la carpeta. La app muestra cuántos cambios trae y cuántos datos editaron las dos. Tocá **Combinar**. Si las dos editaron lo mismo, queda lo editado más tarde.
2. **Paso 2:** tocá **Guardar en Drive**, elegí la carpeta `Cuaderno Liga` y Guardar.

Conviene hacerlo después de cada clase. Después de pasar lista o anotar, la app pregunta si querés sincronizar.

Cada vez que se guarda, Drive crea un archivo nuevo con el nombre de la profe y la fecha. Se pueden borrar los viejos.

## Actualizar el sitio

Subí el `index.html` nuevo al repositorio ("Add file", "Upload files", mismo nombre). Los datos de cada celular no se tocan mientras la dirección del sitio sea la misma. No cambies el nombre del repositorio ni de la cuenta, porque cambia la dirección y los celulares empiezan vacíos.

## Torneos y reglamento

Los carga el administrador en el código (`LIGA.torneos`) y en el PDF. Para sumar un torneo o un reglamento nuevo, se pasa la información y se sube un `index.html` actualizado.

## Privacidad

- No hay servidor ni base de datos online. Los datos viven en cada celular y en la carpeta de Drive de las profes.
- La página no puede conectarse a ningún otro sitio ni cargar nada de internet: no usa Google Fonts, analíticas ni librerías externas.
- Cargá solo nombres de pila y grupos. Nada de DNI, direcciones ni fotos.
- Mandá a las familias el texto de **Más, Aviso a familias** antes de cargar a las alumnas. Drive guarda los archivos en servidores del exterior.
- Poné bloqueo de pantalla en el celular y verificación en dos pasos en Google.

## Licencia y créditos

Código libre. Tipografías Fredoka, Caveat y Nunito (SIL Open Font License), incluidas dentro de la página.
