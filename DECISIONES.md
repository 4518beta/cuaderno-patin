# Cuaderno de Patín: decisiones y solución de problemas

Este documento explica por qué el sitio está hecho como está, y qué hacer cuando algo no anda. Está escrito para alguien que no programa. Cada decisión dice qué se eligió, por qué, y qué se perdió al elegirla.

## 1. Qué hay en el repositorio

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La estructura y el diseño de la página. Lleva las tipografías y los estilos adentro. |
| `app.js` | Todo el funcionamiento: pantallas, guardado, compartir, reglamento. |
| `reglamento-cap-2024.pdf` | El reglamento, para abrirlo desde Más > Reglamento. |
| `README.md` | Cómo publicar y actualizar el sitio. |
| `QA-tests/` | 44 pruebas escritas y sus resultados. No las usa el sitio. |
| `DECISIONES.md` | Este documento. |

`index.html` y `app.js` van siempre juntos. Si subís uno solo después de un cambio, el sitio puede quedar en blanco o con botones que no responden.

## 2. Decisiones de producto

**Una página web y no una app.** Se probó primero una app instalable y se descartó. Una página no se instala, no pasa por tiendas y se actualiza subiendo un archivo. Lo que se perdió: no puede abrirse sola al tocar un archivo, ni mandar avisos al celular.

**GitHub Pages, gratis y público.** Es el único hosting gratis que no pide tarjeta. Por ser público, nadie puede guardar datos de alumnas en el repositorio: cualquiera los vería. Por eso el repo solo tiene código y reglamento.

**Sin base de datos y sin cuentas.** Cada profe guarda sus datos en su propio celular (`localStorage`, clave `cuaderno-liga-v2`). Se descartaron Supabase y los pedidos por GitHub porque pedían cuentas, claves y mantenimiento. Lo que se perdió: no hay sincronización en vivo y los datos viven en un solo celular hasta que se comparten.

**Compartir con Drive y WhatsApp.** Se usó lo que las profes ya tienen. "Guardar en Drive" abre el menú de compartir del celular y deja un archivo en la carpeta `Cuaderno Liga`. "Mandar por WhatsApp" manda el mismo archivo con un mensaje que incluye un link `#importar`. Esa carpeta compartida es de la liga, y quien la administra agrega a cada profe como editora.

**Cada profe crea sus grupos, pero cualquiera edita cualquier grupo.** Así lo pidió el equipo: la asistencia y lo visto en clase lo puede cargar la otra profe. Las alumnas son solo de nombre de pila.

**Pantallas.** Hoy, Clases, Calendario, Coreos y Alumnas están a un toque. Lo menos usado va en Más: Sincronizar, Mensajes, Reglamento, Aviso a familias y Ajustes. Cuotas y canción por alumna se mantuvieron porque se usan todas las semanas.

**Coreos.** Hay un checklist del reglamento CAP 2024 según el nivel de la alumna, y debajo un paso a paso editable de elementos técnicos y artísticos. El sitio solo avisa cuando falta un elemento obligatorio, nunca cuando sobran pasos, porque las profes pueden coreografiar de más.

**Reglamento y torneos los carga el administrador.** Los torneos están en `LIGA.torneos`, dentro de `app.js`, hoy vacío. Una profe no puede cambiar el reglamento desde la página, a propósito: así todas ven lo mismo.

**Sin anuncios, sin link de WhatsApp a una profe.** Se pidió y después se cortó para simplificar.

## 3. Decisiones de funcionamiento

**Cada dato lleva su fecha de modificación.** Los datos se guardan como una lista de registros, cada uno con la hora de su último cambio. Las claves empiezan con una letra que indica de qué es: `g:` grupos, `s:` alumnas, `c:` planes de clase, `a:` asistencia, `l:` lo visto en clase, `n:` notas, `k:` ticks del checklist, `p:` pasos de la coreo, `q:` cuotas.

**Al combinar gana el registro más nuevo.** Cuando entra el archivo de otra profe, para cada registro se queda el que tiene la fecha más reciente. Es simple y no pide decidir nada. Es idempotente: importar dos veces el mismo archivo da lo mismo que una vez.

**Borrar deja una marca.** Un borrado se guarda como un registro vacío con su fecha (una "lápida"). Si no, al combinar con la otra profe el registro volvería a aparecer.

**Guardado con 250 ms de espera.** Así no se escribe en cada letra. También se guarda cuando la página se oculta, para no perder el último toque si cerrás la pestaña.

**Se pide almacenamiento permanente.** Por eso Chrome muestra el cartel de "guardar datos permanentemente". Conviene aceptar: reduce el riesgo de que el celular borre los datos cuando le falta espacio.

**Cambio de versión sin perder datos.** Si algún día cambia el formato de los datos, la versión vieja se copia a `cuaderno-liga-v2-anterior` antes de convertirla.

**Aviso después de la clase.** Pasados 25 segundos de cargar asistencia o lo visto, aparece "Terminó la clase. ¿Sincronizás con la otra profe?". "Ahora no" lo apaga hasta mañana. No hay avisos automáticos del celular, porque una página no puede mandarlos sin una app.

**El link `#importar`.** Una página no puede registrarse para abrir archivos `.json` en Android. El link del mensaje de WhatsApp lleva directo a la pantalla Sincronizar, donde se elige el archivo y se toca "Combinar". Es un paso manual, pero funciona sin instalar nada.

**Borrar pide dos toques.** El primer toque cambia el botón a "¿Seguro?". Tocar cualquier otra cosa lo cancela. No hay ventanas emergentes porque se pueden tocar sin querer.

**Fechas y el mes.** La cuota cubre de marzo a diciembre. Enero y febrero no tienen botón.

**El checklist del reglamento.** Cada ítem obligatorio tiene una clave calculada a partir de su texto. Un paso de la coreo que apunta a un ítem lo tilda solo, y también se puede tildar a mano. La duración del programa se compara con el tiempo que permite la eficiencia elegida.

**Sin internet.** Las tipografías van embebidas en `index.html` y la política de seguridad prohíbe pedir cosas a otros sitios. Una vez abierta no necesita internet para funcionar (sí para cargarse, porque no guarda una copia propia para abrir sin conexión), y no puede mandar nada a terceros.

## 4. Decisiones de seguridad

| Decisión | Por qué |
|---|---|
| La página solo ejecuta `app.js` (`script-src 'self'`) | Aunque algo malicioso se colara en la pantalla, el navegador no lo ejecuta. Probado con un script, un `onclick`, un `onerror` y un link `javascript:`. |
| Todo texto que viene de los datos se escapa antes de mostrarse | Un nombre como `<b>x</b>` se ve literal y no se interpreta. |
| Al importar se rechaza el archivo si `app` no es `cuaderno-liga` o si `fmt` es mayor que 2 | Evita mezclar archivos de otra cosa. |
| Al importar solo se aceptan claves con prefijo conocido | Una clave inventada no entra. |
| Al importar se descartan registros con ids raros | Un id con comillas fue el camino para inyectar código. Se permite solo letras, números, punto, guion y guion bajo, hasta 64. |
| Los links de canciones deben empezar con `http` o `https` | Evita `javascript:`. Se abren con `noopener noreferrer`. |
| Se ignoran `__proto__`, `constructor` y `prototype` | Evita alterar el funcionamiento interno de la página. |
| Textos de hasta 4000 caracteres y hasta 60000 registros | Un archivo enorme no cuelga el celular. |
| Las fechas más de un día en el futuro se recortan | Un archivo con fecha lejana ganaba siempre contra las ediciones reales. |
| El repositorio no tiene datos de alumnas | Es público. |

**Lo que no cubre:** `style-src 'unsafe-inline'` sigue activo porque el diseño usa estilos dentro de las etiquetas. Un estilo no ejecuta código ni saca datos. Tampoco se puede impedir que la profe importe un archivo que ella misma eligió: el resumen antes de "Combinar" es la última defensa, y conviene mirarlo.

**Familias.** En Argentina la Ley 25.326 protege los datos personales. Al ser nombres de pila de menores, conviene avisar a las familias por escrito. En Más > Aviso a familias hay un texto para copiar. No es asesoramiento legal.

## 5. Límites conocidos

- **Relojes distintos.** Si el reloj del celular de una profe está atrasado o adelantado, puede ganar la edición equivocada al combinar. Revisar que la hora esté en automático.
- **Si dos profes editan lo mismo a la vez,** gana la más nueva y la otra se pierde. El resumen de "Combinar" cuenta cuántos registros se editaron en ambos lados.
- **No hay sincronización en vivo.** Cada profe comparte cuando termina.
- **Cuotas huérfanas.** Al borrar una alumna o un grupo, quedan registros de cuotas sueltos. No se ven ni molestan.
- **WhatsApp puede perder el texto.** En algunas versiones manda el archivo sin el mensaje. Está el botón "Copiar el mensaje".
- **Android puede no recordar la carpeta de Drive.** Hay que elegirla cada vez.
- **Al apretar Enter en "Nombre de pila" no pasa nada.** Hay que tocar "Agregar".
- **La ficha de la alumna** tiene nombre, grupo, cuotas y borrado. La canción está en Coreos y las notas en Calendario.
- **Una clase vinculada a un grupo borrado** muestra un separador de más en el listado.
- **Los datos viven en el navegador.** Si se borran los datos del sitio, desinstalás Chrome o cambiás de celular, se pierden. Por eso existe "Guardar en Drive".

## 6. Si algo no anda

| Qué pasa | Causa probable | Qué hacer |
|---|---|---|
| Pantalla en blanco o botones que no responden | Falta `app.js` en el repositorio, o el navegador guardó una versión vieja | Verificar que `app.js` esté en el repo junto con `index.html`. Recargar. En Chrome: tocar los tres puntos, "Configuración del sitio", "Borrar datos" solo si ya guardaste en Drive. |
| Sigue la versión vieja después de actualizar | Pages tarda uno o dos minutos y el navegador guarda copias | Esperar, recargar con tirar hacia abajo. Revisar en GitHub, pestaña Actions, que el último "pages build and deployment" esté en verde. Si dice "cancelled", otro cambio lo reemplazó: es normal si hubo dos subidas seguidas. |
| Desaparecieron todos los datos | Se borraron los datos del sitio, o es otro navegador u otra dirección | Entrar por la dirección exacta de siempre y con el mismo navegador. Importar el último archivo guardado en Drive (Más > Sincronizar > "Subir los datos"). Si cambió la versión de los datos, mirar si existe `cuaderno-liga-v2-anterior`: pedir ayuda para recuperarla. |
| "Este navegador no puede mandarlo directo" | El celular no ofrece el menú de compartir con archivos | Se baja el archivo a Descargas. Adjuntarlo a mano en WhatsApp o Drive y usar "Copiar el mensaje". |
| WhatsApp manda el archivo sin el mensaje | Algunas versiones descartan el texto | Tocar "Copiar el mensaje" y pegarlo en el chat. |
| El link `#importar` abre el sitio pero no carga el archivo | Una página no puede recibir archivos por sí sola | Es lo esperado: en Sincronizar, tocar "Subir los datos que me mandó otra profe" y elegir el archivo guardado. |
| Al importar dice que el archivo no sirve | No es de este sitio, o es de una versión más nueva | Pedir que lo vuelvan a mandar desde "Guardar en Drive". Si es de una versión más nueva, actualizar el sitio primero. |
| Después de importar no aparece lo de la otra profe | Su archivo era más viejo que lo tuyo para esos registros | Pedirle que guarde de nuevo. Revisar la hora de los dos celulares. |
| Una alumna borrada sigue contando en la asistencia | Versión anterior al arreglo del 28 de octubre | Actualizar y recargar. |
| Me pide permiso para guardar datos permanentes | Es el pedido de almacenamiento persistente | Aceptar. |
| El aviso "¿Sincronizás?" no aparece | Pasaron menos de 25 segundos, ya tocaste "Ahora no" hoy, o no hay cambios sin compartir | Ir a Más > Sincronizar cuando quieras. |
| Drive dice que no tiene permiso | La profe no está como editora de la carpeta | El administrador la agrega por mail como editora. |
| Quiero empezar de cero | Cambio de ciclo o prueba | Más > Ajustes > "Borrar todo" (dos toques). Antes, guardar en Drive. |
| El nombre de la profe está mal | Se cargó con un error al empezar | Más > Ajustes, corregir y "Guardar". |

## 7. Qué mirar antes de tocar el código

1. Cualquier texto que venga de datos o de un archivo importado pasa por `esc()` antes de ir al HTML.
2. No agregar código dentro del HTML (`onclick`, `<script>` incrustado). Va en `app.js`.
3. Un campo nuevo de id (grupo, alumna, paso) debe sumarse a `ID_FIELDS`.
4. Un dato nuevo que se comparta debe tener un prefijo de clave de los permitidos y pasar por `cleanData`.
5. Un cambio en el formato de los datos sube `FMT` y conserva la copia anterior.
6. Después de cambiar algo, correr las pruebas de `QA-tests/` (ver `QA-tests/catalog.md`).
