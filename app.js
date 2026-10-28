"use strict";
const ICON = {
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-6h4v6"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5a3.5 3.5 0 010 6M18 14c2 .6 3 2.6 3 6"/></svg>',
  music:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h10a4 4 0 014 4v12H9a4 4 0 01-4-4z"/><path d="M5 16a4 4 0 014-4h10M9 8h5"/></svg>',
  dots:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="5.5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18.5" cy="12" r="1.2"/></svg>'
};
const LEVELS = ["Iniciación","Intermedio","Avanzado"];
const TEMPLATES = {
  "Iniciación": [
    {n:"Entrada en calor",m:10,t:"Movilidad de tobillos, rodillas y caderas. Juegos de equilibrio sin patines."},
    {n:"Técnica base",m:20,t:"Posición base, marcha, deslizamiento y frenado."},
    {n:"Circuito o juego",m:15,t:"Conos, cambios de dirección, pasar por debajo de un aro."},
    {n:"Paso o figura",m:10,t:"Un solo contenido nuevo por clase."},
    {n:"Vuelta a la calma",m:5,t:"Estiramiento suave y charla corta."}
  ],
  "Intermedio": [
    {n:"Entrada en calor",m:15,t:"Movilidad, activación de piernas y core."},
    {n:"Técnica",m:20,t:"Cruces, tres, mohawk, marcha de espalda."},
    {n:"Saltos y trompos",m:20,t:"Salto de vals y trompo básico con progresiones."},
    {n:"Coreo",m:15,t:"Repaso de la música y las formaciones."},
    {n:"Vuelta a la calma",m:5,t:"Estiramiento y comentarios de la clase."}
  ],
  "Avanzado": [
    {n:"Entrada en calor",m:15,t:"Movilidad, activación y saltos de preparación."},
    {n:"Saltos",m:25,t:"Repeticiones con calidad. Anotar cuántos salen limpios."},
    {n:"Trompos",m:20,t:"Entradas, centrado y salidas."},
    {n:"Programa o coreo",m:20,t:"Pasada completa con música."},
    {n:"Flexibilidad y calma",m:10,t:"Elongación activa y respiración."}
  ]
};
const MESES_CUOTA = [3,4,5,6,7,8,9,10,11,12];
const MESES = ["","Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const MENSAJES = [
  ["Aviso de torneo","Familias","Hola, les cuento que el {fecha} tenemos {torneo} en {lugar}. Hay que estar a las {hora}. Tienen que llevar los patines revisados, el traje, el peinado de torneo y la ficha médica. Confirmen por acá si van antes del {limite}. Gracias."],
  ["Recordatorio de cuota","Familias","Hola, les recuerdo que la cuota de {mes} vence el {fecha}. Pueden abonarla por {medio}. Si ya la pagaron, avísenme y la marco. Gracias."],
  ["Clase suspendida","Familias","Hola, hoy {dia} no vamos a tener clase por {motivo}. La recuperamos el {fecha}. Perdón por avisar sobre la hora."],
  ["Bienvenida","Familias","Bienvenidos a la escuela. Las clases son los {dias} de {hora} en {lugar}. Para la primera clase traigan patines, casco, rodilleras, coderas y muñequeras, y ropa cómoda. Cualquier duda me escriben por acá."],
  ["Festival de fin de año","Familias","Ya tenemos fecha para el festival: {fecha} en {lugar}. Los ensayos generales son el {ensayo}. En estos días les paso el detalle del vestuario y de la música."],
  ["Inscripciones abiertas","Redes","Abrimos inscripciones de patín artístico. Hay grupos para chicos y grandes, desde cero. Las clases son {dias} en {lugar}. La primera clase de prueba no tiene costo. Escribinos por privado y te contamos los horarios."],
  ["Anuncio del festival","Redes","Ya hay fecha para nuestro festival de fin de año: {fecha}. Gracias a las alumnas y a las familias por acompañar todo el año. Pronto compartimos el programa."]
];
const COPAS = { rr:"Copa Roberto Rodríguez", gm:"Copa González Molina", sb:"Sub Divisional B", sa:"Sub Divisional A (Nacional)", in:"Inline", ad:"Adultos" };
const M = (g, t) => ({ k:"m", g, t }), L = (g, t) => ({ k:"l", g, t }), O = (g, t) => ({ k:"o", g, t });
const KIND = { m:["Obligatorio","rosa"], l:["Límite","celeste"], o:["Opcional","limon"] };
const FW_N1 = "Nivel 1: 4 elementos distintos entre cruce por delante, tres interno, tres externo, open mohawk, traveling (uno horario y uno antihorario) y body movement. Máx. 30 s.";
const FW_N12 = "Nivel 1: 4 giros confirmados y 1 feature. Nivel 2: 6 giros y 2 features, una de ellas Body Movement o Choctaw. Giros que cuentan: traveling, rocker, counter, bucle, bracket (ninguno más de 2 veces). Máx. 30 s.";
const FW_DECL = "Cubre ¾ de la pista y se declara la hora de inicio en la planilla de elementos.";
const RR_TROMPO = L("Trompos","El mismo trompo se puede repetir como máximo 2 veces");
const SB_J3 = L("Saltos","El mismo salto simple, máximo 3 veces. Si se repite, uno va en combinación");
const NOTE_SIT = "Si piden combinación con Sit, esa es obligatoria. El trompo suelto es opcional según la aclaración del reglamento";
const SPIN_SEL = L("Trompos","Todos los trompos están permitidos menos Broken e Invertido (y Heel donde se aclara)");
const EFF = [
 { id:"rr-formativa", c:"rr", n:"Escuela Formativa", tm:{ max:90 }, items:[
   M("Figuras","Una figura Sit de posición base (mínimo 1)"), L("Figuras","Figuras hacia adelante sin combinar, máximo 3"),
   M("Trompos","Trompo en dos pies (mínimo 1, máximo 2)"), RR_TROMPO,
   O("Pasos","Secuencia de skating skill hacia adelante: serpentina con 2 curvas, cubre ¾ de la pista"),
   M("Pasos","Choreo Step Sequence: máx. 30 s, empieza quieta o con stop and go, cubre ¾ de la pista, hacia adelante"),
   L("Pasos","Deslizar hacia atrás es elemento ilegal en Formativa") ] },
 { id:"rr-quinta", c:"rr", n:"Eficiencia Quinta", tm:{ max:90 }, items:[
   M("Figuras","Una combinación de figuras hacia adelante, 2 a 4 posiciones, con una posición Sit base"),
   M("Trompos","Trompo en dos pies (mínimo 1, máximo 2)"), RR_TROMPO,
   O("Pasos","Secuencia de skating skill hacia atrás: serpentina con 2 curvas, cubre ¾ de la pista"),
   M("Pasos","Choreo Step Sequence: máx. 30 s, empieza quieta o con stop and go, cubre ¾ de la pista") ] },
 { id:"rr-cuarta", c:"rr", n:"Eficiencia Cuarta", tm:{ max:95 }, items:[
   M("Figuras","Combinación de figuras (2 a 4 posiciones) con un cambio de dirección, filo externo e interno, una posición Sit base y una Camel"),
   M("Saltos","Waltz jump (mínimo 1, máximo 2)"),
   L("Trompos","Máximo 2 trompos Upright (interno adelante o atrás)"), RR_TROMPO,
   O("Pasos","Secuencia de skating skill hacia adelante y atrás, con variedad de pasos y giros en dos pies"),
   M("Pasos","Choreo Step Sequence: máx. 30 s, empieza quieta o con stop and go, cubre ¾ de la pista") ] },
 { id:"gm-tercera", c:"gm", n:"Eficiencia Tercera", tm:{ c:90, tol:5 }, items:[
   L("Saltos","Máximo 5 saltos en total (toe loop, salchow, flip, loop y vals)"), L("Saltos","Una combinación de máximo 2 saltos (vals, toe loop, salchow)"),
   M("Saltos","Waltz jump, suelto o combinado"), M("Saltos","Toe loop, suelto o combinado"),
   L("Saltos","Solo uno de los saltos puede repetirse 2 veces (no el loop)"),
   L("Trompos","Máximo 2 elementos de trompos, todos Upright"), M("Trompos","Una combinación de trompos (máximo 2 posiciones)"), M("Trompos","Un trompo solo"), L("Trompos","Los trompos no se pueden repetir entre sí"),
   M("Pasos","Footwork sequence nivel 1 como máximo"), L("Pasos",FW_N1), L("Pasos",FW_DECL) ] },
 { id:"gm-segunda", c:"gm", n:"Eficiencia Segunda", tm:{ c:120, tol:5 }, items:[
   L("Saltos","Máximo 8 saltos de una rotación, incluido el vals"), L("Saltos","Máximo 2 combinaciones, cada una de máximo 2 saltos y distintas entre sí"),
   L("Saltos","El mismo salto máximo 2 veces. Si se repite, uno va en combinación"),
   L("Trompos","Máximo 2 elementos de trompos"), M("Trompos","Una combinación de trompos (máximo 3 posiciones, solo Upright)"), M("Trompos","Un trompo solo (Upright o Sit)"), L("Trompos","Los trompos no se pueden repetir entre sí"),
   M("Pasos","Footwork sequence nivel 1 como máximo"), L("Pasos",FW_N1), L("Pasos",FW_DECL) ] },
 { id:"gm-primera", c:"gm", n:"Eficiencia Primera", tm:{ c:120, tol:5 }, items:[
   L("Saltos","Máximo 10 saltos simples de una vuelta"), L("Saltos","Máximo 2 combinaciones distintas: una de hasta 4 saltos y otra de hasta 2"),
   M("Saltos","Toe loop simple, suelto o combinado"), SB_J3,
   L("Trompos","Máximo 2 elementos de trompos, solo Upright y Sit"), M("Trompos","Una combinación de trompos (máximo 3 posiciones) que incluya un Sit"), O("Trompos","Un trompo suelto Sit. " + NOTE_SIT), L("Trompos","El mismo trompo máximo 2 veces en todo el programa"),
   M("Pasos","Footwork sequence nivel 1 como máximo"), L("Pasos",FW_N1), L("Pasos",FW_DECL) ] },
 { id:"sb-promo", c:"sb", n:"Eficiencia Promocional", tm:{ c:120, tol:5 }, items:[
   L("Saltos","Máximo 12 saltos simples de una vuelta y Axel, incluido el vals"), L("Saltos","Máximo 2 combinaciones de hasta 4 saltos, distintas entre sí"),
   M("Saltos","Loop simple, suelto o combinado"), M("Saltos","Un Axel suelto (máximo 1)"), L("Saltos","Un Waltz jump se acepta como intento del Axel requerido"), SB_J3,
   L("Trompos","Máximo 2 elementos de trompos, solo Upright y Sit"), M("Trompos","Una combinación de trompos (máximo 3 posiciones) que incluya un Sit"), O("Trompos","Un trompo suelto Sit. " + NOTE_SIT),
   M("Pasos","Footwork sequence nivel 1 como máximo, 30 s"), L("Pasos",FW_N12) ] },
 { id:"sb-tercera", c:"sb", n:"Eficiencia Tercera", tm:{ c:120, tol:5 }, items:[
   L("Saltos","Máximo 12 saltos simples de una vuelta y Axel, incluido el vals"), L("Saltos","Máximo 2 combinaciones de hasta 4 saltos, distintas entre sí"),
   M("Saltos","Loop simple, suelto o combinado"), M("Saltos","Axel (1 o 2 veces; si son 2, uno va en combinación)"), SB_J3,
   L("Trompos","Máximo 2 elementos de trompos, solo Upright y Sit"), M("Trompos","Una combinación de trompos (máximo 3 posiciones) que incluya un Sit"), O("Trompos","Un trompo suelto en Camel (se confirma con 2 rotaciones en posición y filo correcto). " + NOTE_SIT),
   M("Pasos","Footwork sequence nivel 1 como máximo, 30 s"), L("Pasos",FW_N12) ] },
 { id:"sb-segunda", c:"sb", n:"Eficiencia Segunda (Minis en adelante)", tm:{ c:165, tol:10 }, items:[
   L("Saltos","Máximo 12 saltos: una vuelta, Axel, doble toe loop y doble salchow"), L("Saltos","Máximo 2 combinaciones de hasta 4 saltos. El Axel y los dobles solo se combinan con simples"),
   M("Saltos","Axel, suelto o combinado"), M("Saltos","Toe loop (simple o doble), suelto o combinado"), L("Saltos","Axel máximo 2 veces; si son 2, uno va en combinación"), L("Saltos","Máximo 2 dobles (2T o 2S), distintos entre sí"), SB_J3,
   L("Trompos","Entre 2 y 3 elementos de trompos, todas las combinaciones distintas"), M("Trompos","Una combinación de trompos (máximo 3 posiciones) que incluya un Sit"), O("Trompos","Un trompo suelto. " + NOTE_SIT),
   M("Trompos","Un trompo Camel en cualquier filo, suelto o combinado"), SPIN_SEL,
   M("Pasos","Footwork sequence nivel 1 como máximo, 30 s"), L("Pasos",FW_N12) ] },
 { id:"sb-primera", c:"sb", n:"Eficiencia Primera (Infantil en adelante)", tm:{ c:180, tol:10 }, items:[
   L("Saltos","Máximo 8 saltos sin contar los de conexión. No se permiten doble Axel ni triples"), L("Saltos","Máximo 2 combinaciones de hasta 4 saltos con conexión, distintas entre sí"),
   M("Saltos","Axel simple, solo o combinado"), M("Saltos","Loop (simple o doble), suelto o combinado"), M("Saltos","Un doble flip, doble lutz o doble loop"),
   L("Saltos","Axel y dobles máximo 2 veces; si son 2, uno va en combinación"), L("Saltos","El mismo salto de una rotación máximo 3 veces; si se repite, uno va en combinación"),
   L("Trompos","Entre 2 y 3 elementos de trompos"), M("Trompos","Una combinación de trompos (máximo 4 posiciones) que incluya un Sit"), O("Trompos","Un trompo suelto. " + NOTE_SIT),
   M("Trompos","Un trompo Camel en cualquier filo, suelto o combinado"), L("Trompos","Todos los trompos están permitidos menos Broken e Invertido"),
   M("Pasos","Footwork sequence nivel 2 como máximo, 30 s"), L("Pasos",FW_N12) ] },
 { id:"sa-tots", c:"sa", n:"Nacional Tots", tm:{ c:165, tol:10 }, items:[
   L("Saltos","Máximo 12 saltos: una vuelta, Axel, doble toe loop y doble salchow"), L("Saltos","Máximo 2 combinaciones de hasta 4 saltos. El Axel y los dobles solo se combinan con simples"),
   M("Saltos","Axel, suelto o combinado"), M("Saltos","Toe loop (simple o doble), suelto o combinado"), L("Saltos","Axel máximo 2 veces; si son 2, uno va en combinación"), L("Saltos","Máximo 2 dobles (2T o 2S), distintos entre sí"), SB_J3,
   L("Trompos","Entre 2 y 3 elementos de trompos, todas las combinaciones distintas"), M("Trompos","Una combinación de trompos (máximo 4 posiciones) que incluya un Sit"), O("Trompos","Un trompo suelto. " + NOTE_SIT),
   M("Trompos","Un trompo Camel en cualquier filo, suelto o combinado"), L("Trompos","Todos los trompos están permitidos menos Broken, Heel e Invertido"),
   M("Pasos","Footwork sequence nivel 1 como máximo, 30 s") ] },
 { id:"sa-minis", c:"sa", n:"Nacional Minis", tm:{ c:165, tol:10 }, items:[
   L("Saltos","Máximo 12 saltos (incluye Axel, doble toe loop y doble salchow)"), L("Saltos","Máximo 2 combinaciones de hasta 4 saltos"),
   M("Saltos","Toe loop (simple o doble), suelto o combinado"), L("Saltos","Axel y dobles máximo 2 veces; si son 2, uno va en combinación"), SB_J3,
   L("Trompos","Entre 2 y 3 elementos de trompos, todas las combinaciones distintas"), M("Trompos","Una combinación de trompos (máximo 4 posiciones) que incluya un Sit"), O("Trompos","Un trompo suelto. " + NOTE_SIT),
   M("Trompos","Un trompo Camel en cualquier filo, suelto o combinado"), L("Trompos","Todos los trompos están permitidos menos Broken, Heel e Invertido"),
   M("Pasos","Footwork sequence nivel 2 como máximo, 30 s") ] },
 { id:"sa-infantil", c:"sa", n:"Nacional Infantil en adelante", tm:{ c:180, tol:10 }, items:[
   L("Saltos","Máximo 8 saltos sin contar los de conexión. No se permiten doble Axel ni triples"), L("Saltos","Máximo 2 combinaciones de hasta 4 saltos con conexión"),
   M("Saltos","Axel simple, solo o combinado"), M("Saltos","Loop (simple o doble), suelto o combinado"),
   L("Saltos","Axel y dobles máximo 2 veces; si son 2, uno va en combinación"), L("Saltos","El mismo salto de una rotación máximo 3 veces; si se repite, uno va en combinación"),
   L("Trompos","Entre 2 y 3 elementos de trompos"), M("Trompos","Una combinación de trompos (máximo 4 posiciones) que incluya un Sit"), O("Trompos","Un trompo suelto. " + NOTE_SIT),
   M("Trompos","Un trompo Camel en cualquier filo, suelto o combinado"), L("Trompos","Todos los trompos están permitidos menos Broken e Invertido"),
   M("Pasos","Footwork sequence nivel 3 como máximo, 30 s") ] },
 { id:"in-prelim", c:"in", n:"Divisional C: Preliminar", tm:{ c:120, tol:5 }, items:[
   L("Saltos","Máximo 8 saltos de una rotación, incluido el vals"), L("Saltos","Máximo 2 combinaciones de máximo 2 saltos"), L("Saltos","El mismo salto máximo 2 veces"),
   M("Trompos","Una combinación de trompos (máximo 3 posiciones, solo Upright)"), M("Trompos","Un trompo suelto (Upright o Sit)"),
   M("Pasos","Footwork sequence nivel 1 como máximo, 30 s"), L("Pasos",FW_N1),
   M("Pasos","Secuencia coreográfica (ChSq): máx. 30 s, cubre ¾ de la pista, patrón libre, empieza quieta o con stop and go e incluye un elemento claro (Ina Bauer, spread eagle, Camel, posición artística sobre un pie)") ] },
 { id:"in-inter", c:"in", n:"Divisional B: Intermedio", tm:{ c:165, tol:10 }, items:[
   L("Saltos","Máximo 12 saltos: una vuelta, Axel, doble toe loop y doble salchow"), L("Saltos","Máximo 2 combinaciones de hasta 4 saltos. El Axel y los dobles solo con simples"),
   M("Saltos","Axel, suelto o combinado"), M("Saltos","Toe loop (simple o doble), suelto o combinado"), L("Saltos","Axel máximo 2 veces; si son 2, uno va en combinación"), L("Saltos","Los dobles se presentan una sola vez y deben ser distintos"), SB_J3,
   L("Trompos","Entre 2 y 3 elementos de trompos, combinaciones distintas"), M("Trompos","Una combinación de trompos (máximo 3 posiciones) que incluya un Sit"), O("Trompos","Un trompo solo. " + NOTE_SIT),
   M("Trompos","Un trompo Camel en cualquier filo, suelto o combinado"), L("Trompos","Todos los trompos están permitidos menos Broken, Heel e Invertido"),
   M("Pasos","Footwork sequence nivel 1 como máximo, 30 s"),
   M("Pasos","Secuencia coreográfica (ChSq): máx. 30 s, cubre ¾ de la pista, empieza quieta o con stop and go e incluye un elemento claro (Ina Bauer, spread eagle, Camel...)") ] },
 { id:"in-avanz", c:"in", n:"Divisional A: Avanzado", tm:{ c:180, tol:10 }, items:[
   L("Saltos","Máximo 8 saltos sin contar los de conexión. No se permiten doble Axel ni triples"), L("Saltos","Máximo 2 combinaciones de hasta 4 saltos con conexión"),
   M("Saltos","Axel simple, solo o combinado"), M("Saltos","Loop (simple o doble), solo o combinado"),
   L("Saltos","Axel y dobles máximo 2 veces; si son 2, uno va en combinación"), L("Saltos","El mismo salto de una rotación máximo 3 veces"),
   L("Trompos","Entre 2 y 3 elementos de trompos"), M("Trompos","Una combinación de trompos (máximo 4 posiciones) que incluya un Sit"), O("Trompos","Un trompo solo. " + NOTE_SIT),
   M("Trompos","Un trompo Camel en cualquier filo, suelto o combinado"), L("Trompos","Todos los trompos están permitidos menos Broken e Invertido"),
   M("Pasos","Footwork sequence nivel 3 como máximo, 30 s"),
   M("Pasos","Secuencia coreográfica (ChSq): máx. 30 s, cubre ¾ de la pista, empieza quieta o con stop and go e incluye un elemento claro") ] },
 { id:"ad-basica", c:"ad", n:"Eficiencia Básica", tm:{ c:120, tol:5 }, items:[
   L("Saltos","Máximo 8 saltos de una rotación, incluido el vals"), L("Saltos","Máximo 2 combinaciones de máximo 2 saltos"), L("Saltos","El mismo salto máximo 2 veces"),
   L("Trompos","Máximo 2 elementos de trompos, solo Upright"), M("Trompos","Una combinación de trompos (máximo 3 posiciones)"), M("Trompos","Un trompo solo"),
   M("Pasos","Footwork sequence nivel 1 como máximo"), L("Pasos",FW_N1) ] },
 { id:"ad-promo", c:"ad", n:"Eficiencia Promocional", tm:{ c:120, tol:5 }, items:[
   L("Saltos","Máximo 12 saltos simples de una vuelta y Axel, incluido el vals"), L("Saltos","Máximo 2 combinaciones de hasta 4 saltos"),
   M("Saltos","Loop simple, solo o combinado"), M("Saltos","Un Axel suelto (máximo 1)"), SB_J3,
   L("Trompos","Máximo 2 elementos de trompos, solo Upright y Sit"), M("Trompos","Una combinación de trompos (máximo 3 posiciones) que incluya un Sit"), M("Trompos","Un trompo suelto Sit"), L("Trompos","El mismo trompo (posición, pie y filo) máximo 2 veces"),
   M("Pasos","Footwork sequence nivel 1 como máximo, 30 s") ] },
 { id:"ad-elite", c:"ad", n:"Eficiencia Elite", tm:{ c:165, tol:10 }, items:[
   L("Saltos","Máximo 12 saltos: una vuelta, Axel, doble toe loop y doble salchow"), L("Saltos","Máximo 2 combinaciones de hasta 4 saltos. El Axel y los dobles solo con simples"),
   M("Saltos","Axel, suelto o combinado"), M("Saltos","Toe loop (simple o doble), solo o combinado"), L("Saltos","Axel máximo 2 veces; si son 2, uno va en combinación"), L("Saltos","Los dobles se presentan una sola vez y deben ser distintos"),
   L("Trompos","Entre 2 y 3 elementos de trompos, combinaciones distintas"), M("Trompos","Una combinación de trompos (máximo 3 posiciones) que incluya un Sit"), M("Trompos","Un trompo solo"),
   M("Trompos","Un trompo Camel en cualquier filo, suelto o combinado"), L("Trompos","Todos los trompos están permitidos menos Broken, Heel e Invertido"),
   M("Pasos","Footwork sequence nivel 1 como máximo, 30 s") ] },
 { id:"ad-leyenda", c:"ad", n:"Eficiencia Leyenda", tm:{ c:180, tol:10 }, items:[
   L("Saltos","Máximo 8 saltos sin contar los de conexión. No se permiten doble Axel ni triples"), L("Saltos","Máximo 2 combinaciones de hasta 4 saltos con conexión"),
   M("Saltos","Axel simple, solo o combinado"), M("Saltos","Loop (simple o doble), solo o combinado"), L("Saltos","Axel y dobles máximo 2 veces; si son 2, uno va en combinación"),
   L("Trompos","Entre 2 y 3 elementos de trompos"), M("Trompos","Una combinación de trompos (máximo 4 posiciones) que incluya un Sit"), M("Trompos","Un trompo solo"),
   M("Trompos","Un trompo Camel en cualquier filo, suelto o combinado"), L("Trompos","Todos los trompos están permitidos menos Broken e Invertido"),
   M("Pasos","Footwork sequence nivel 3 como máximo, 30 s") ] }
];
const effById = id => EFF.find(e => e.id === id);
const DEFAULT_MAP = { "Iniciación":"rr-quinta", "Intermedio":"gm-tercera", "Avanzado":"gm-primera" };
const DESC = {
  rr:[["Arrodillarse o acostarse más de una vez, o más de 5 s","0,5"],["Más de 10 s entre el comienzo de la música y el primer movimiento","0,5"],["Música con letra inapropiada","0,5"],["Violación de vestuario","0,5"],["Interrupción injustificada","1,0 por vez"],["Elemento obligatorio faltante","0,5"],["Elemento ilegal","0,5"],["Salto de una rotación o más durante el programa","0,5"],["Caídas","Sin descuento. Los jueces las consideran en Performance"]],
  gm:[["Arrodillarse o acostarse más de una vez, o más de 5 s","1,0"],["Más de 10 s entre el comienzo de la música y el primer movimiento","0,5"],["Programa menor al tiempo mínimo","0,5 cada 10 s o parte"],["Música con letra inapropiada","1,0"],["Violación de vestuario","1,0"],["Interrupción injustificada","1,0 por vez"],["Caídas","1,0 cada una"],["Más de un salto o más de una rotación en la footwork","1,0"],["Elemento obligatorio faltante","1,0"],["Elemento ilegal","1,0"]],
  sb:[["Arrodillarse o acostarse más de una vez, o más de 5 s","1,0"],["Violación de vestuario","1,0"],["Más de 10 s entre el comienzo de la música y el primer movimiento","0,5"],["Programa menor al tiempo mínimo","0,5 cada 10 s o parte"],["Música con letra inapropiada","1,0"],["Caídas","1,0 cada una"],["Más de un salto o más de una rotación en la footwork","1,0"],["Elemento obligatorio faltante","1,0"],["Elemento ilegal","1,0"]],
  sa:[["Arrodillarse o acostarse más de una vez, o más de 5 s","1,0"],["Violación de vestuario","1,0"],["Programa menor al tiempo mínimo","0,5 cada 10 s o parte"],["Más de 10 s entre el comienzo de la música y el primer movimiento","0,5"],["Música con letra inapropiada","1,0"],["Caídas en eficiencia Nacional","1,0 cada una"],["Más de un salto o más de una rotación en la footwork","1,0"],["Elemento obligatorio faltante","1,0"],["Elemento ilegal","1,0"],["Posición obligatoria de trompo no intentada","1,0"]],
  in:[["Caídas, en las tres divisionales (C, B y A)","1,0 cada una"],["El resto de los descuentos sigue lo de las divisionales Sub B y Sub A","según tabla"]],
  ad:[["Caídas, en todas las eficiencias","0,5 cada una"],["El resto de los descuentos sigue lo de las divisionales Sub B y Sub A","según tabla"]]
};
const ACLAR = [
  "Tiempo del programa: en la Copa RR empieza con el primer golpe musical. En Copa GM, Sub B, Sub A e Inline empieza con el primer movimiento de la patinadora.",
  "Los elementos en exceso (permitidos en la categoría) no se penalizan, el panel técnico los anula. Los elementos ilegales sí tienen descuento.",
  "Un trompo no requerido se anula y no se penaliza.",
  "Una secuencia de pasos de nivel más alto que el permitido baja un nivel y no recibe descuento.",
  "Interrupción justificada en Copas RR y GM: se puede repatinar, con 1,0 de descuento por cada vez que se abandona el programa.",
  "En Copa GM, Sub B y Sub A no hay bonus por saltos en la segunda mitad del programa.",
  "Los trompos de Sub B, Sub A y GM permiten variaciones y posiciones difíciles. Cada una cuenta una sola vez por programa; la segunda vez se anula."
];
const QUICK = ["Entrada en calor","Técnica","Saltos","Trompos","Figuras","Footwork","Pasada con música","Juegos","Evaluación"];
const WD = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
const WDS = ["D","L","M","M","J","V","S"];
const secs = v => { const m = String(v || "").trim().match(/^(\d{1,2})\s*[:.]\s*(\d{2})$/); return m ? (+m[1]) * 60 + (+m[2]) : null; };
const mmss = n => Math.floor(n / 60) + ":" + z2(n % 60);
const timeLabel = e => e.tm.max ? "máx. " + mmss(e.tm.max) : mmss(e.tm.c) + " ± " + e.tm.tol + " s";
function timeCheck(e, dur) {
  const sec = secs(dur);
  if (sec === null) return { st: "none", txt: "Cargá la duración del programa (ej. 2:00) para controlar el tiempo." };
  if (e.tm.max) return sec <= e.tm.max ? { st: "ok", txt: "Dura " + mmss(sec) + ", dentro del máximo de " + mmss(e.tm.max) + "." } : { st: "bad", txt: "Dura " + mmss(sec) + ", se pasa " + (sec - e.tm.max) + " s del máximo de " + mmss(e.tm.max) + "." };
  const lo = e.tm.c - e.tm.tol, hi = e.tm.c + e.tm.tol;
  if (sec < lo) return { st: "bad", txt: "Dura " + mmss(sec) + ", le faltan " + (lo - sec) + " s para el mínimo de " + mmss(lo) + " (0,5 de descuento cada 10 s o parte en la mayoría de las copas)." };
  if (sec > hi) return { st: "bad", txt: "Dura " + mmss(sec) + ", se pasa " + (sec - hi) + " s del máximo de " + mmss(hi) + "." };
  return { st: "ok", txt: "Dura " + mmss(sec) + ", dentro de " + mmss(lo) + " a " + mmss(hi) + "." };
}
const shortName = t => { const x = String(t).split(/[.,(:]/)[0].trim(); return x.length > 44 ? x.slice(0, 42) + "…" : x; };
function parseSong(raw) {
  const url = ((String(raw).match(/https?:\/\/\S+/) || [""])[0]).replace(/[)\]>.,]+$/, "");
  const name = String(raw).replace(url, "").replace(/[\r\n]+/g, " ").replace(/^["“”'\s]+|["“”'\s]+$/g, "").trim();
  return { url, name };
}
function songInfo(url) {
  let m;
  if ((m = url.match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(track|album|playlist|episode)\/([A-Za-z0-9]+)/))) return { p: "Spotify", kind: m[1] };
  if (/spotify\.link|spotify\.com/.test(url)) return { p: "Spotify" };
  if (/music\.youtube\.com/.test(url)) return { p: "YouTube Music" };
  if ((m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:[^#]*&)?v=|shorts\/|embed\/|live\/))([\w-]{11})/))) return { p: "YouTube", id: m[1] };
  if (/youtube\.com|youtu\.be/.test(url)) return { p: "YouTube" };
  return { p: "Link" };
}
/* ===== Utilidades ===== */
const $ = (s, r = document) => r.querySelector(s);
const z2 = n => String(n).padStart(2, "0");
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const uid = () => "x" + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3);
const iso = d => d.getFullYear() + "-" + z2(d.getMonth() + 1) + "-" + z2(d.getDate());
const todayISO = () => iso(new Date());
const parse = s => new Date(s + "T12:00:00");
const addDaysTo = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return iso(d); };
const fmt = s => s ? parse(s).toLocaleDateString("es-AR", { weekday: "short", day: "numeric", month: "short" }) : "";
const fmtLong = s => parse(s).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });
const daysTo = s => Math.round((parse(s) - parse(todayISO())) / 864e5);
const wdOf = s => parse(s).getDay();
const YEAR = new Date().getFullYear();
const hashStr = str => { let h = 5381; for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
const okUrl = u => /^https?:\/\/\S+$/i.test(u);
const chip = (t, c = "white") => `<span class="chip ${c}">${esc(t)}</span>`;
const emptyBox = t => `<div class="empty">${t}</div>`;

/* ===== Datos de la liga (los carga el administrador, no se sincronizan) ===== */
const LIGA = {
  /* { name: "Torneo de la liga", date: "2026-11-14", lugar: "Club tal" } */
  torneos: []
};

/* ===== Guardado: cada dato lleva la hora de su última edición ===== */
const STORE = "cuaderno-liga-v2", FMT = 2;
const blank = () => ({ fmt: FMT, D: {}, base: {}, profe: "", lastShared: 0, merged: {}, askNo: "" });
function load() {
  try {
    const r = localStorage.getItem(STORE);
    if (r) {
      const o = JSON.parse(r);
      if (o && o.fmt === FMT && o.D) return Object.assign(blank(), o);
      localStorage.setItem(STORE + "-anterior", r);
    }
  } catch (e) {}
  return blank();
}
let ST = load(), saveTimer = 0;
const setStatus = t => { const e = $("#save"); if (e) e.textContent = t; };
function persist() { try { localStorage.setItem(STORE, JSON.stringify(ST)); setStatus("Guardado en este celular"); } catch (e) { setStatus("No se pudo guardar en este navegador"); } }
function save() { clearTimeout(saveTimer); setStatus("Guardando..."); saveTimer = setTimeout(persist, 250); }
let lastT = 0;
const tick = () => (lastT = Math.max(Date.now(), lastT + 1));
const put = (k, v) => { ST.D[k] = { t: tick(), v }; save(); };
const del = k => { ST.D[k] = { t: tick(), v: null }; save(); };
const get = k => { const x = ST.D[k]; return x ? x.v : null; };
const has = k => get(k) === 1;
const toggle = k => { if (has(k)) del(k); else put(k, 1); };
const live = pre => Object.keys(ST.D).filter(k => k.startsWith(pre) && ST.D[k].v !== null);
const list = pre => live(pre).map(k => ST.D[k].v);

/* ===== Lectura de datos ===== */
const byName = (a, b) => String(a.name || "").localeCompare(String(b.name || ""), "es");
const groups = () => list("g:").sort(byName);
const group = id => get("g:" + id);
const students = gid => list("s:").filter(s => s.gid === gid).sort(byName);
const student = id => get("s:" + id);
const plans = () => list("c:");
const attKey = (gid, d, sid) => "a:" + gid + ":" + d + ":" + sid;
const presentCount = (gid, d) => { const ids = new Set(students(gid).map(s => s.id)); return live("a:" + gid + ":" + d + ":").filter(k => ids.has(k.split(":").pop())).length; };
const logCodes = (gid, d) => { const p = "l:" + gid + ":" + d + ":"; return live(p).map(k => k.slice(p.length)); };
const notaKey = (gid, d) => "n:" + gid + ":" + d;
const stepsOf = sid => list("p:" + sid + ":").sort((a, b) => (a.o - b.o) || String(a.id).localeCompare(String(b.id)));
const isScheduled = (g, d) => (g.dias || []).includes(wdOf(d));
const coreoDates = (gid, sid) => { const out = []; live("l:" + gid + ":").forEach(k => { const m = k.match(/^l:[^:]+:(\d{4}-\d{2}-\d{2}):co:(.+)$/); if (m && m[2] === sid) out.push(m[1]); }); return out.sort(); };
const upcomingTorneos = () => LIGA.torneos.filter(t => t.date && daysTo(t.date) >= 0).sort((a, b) => a.date.localeCompare(b.date));
const when = n => n === 0 ? "hoy" : n === 1 ? "mañana" : n > 1 ? "en " + n + " días" : "hace " + (-n) + " días";

/* ===== Reglamento y checklist ===== */
const COPA_S = { rr: "Copa RR", gm: "Copa GM", sb: "Sub B", sa: "Sub A", in: "Inline", ad: "Adultos" };
const itemKey = (e, it) => hashStr(e.id + "|" + it.g + "|" + it.t);
const stuEff = s => { const g = group(s.gid); return effById(s.eff || (g ? DEFAULT_MAP[g.level] : "")) || null; };
function stuCheck(s) {
  const e = stuEff(s); if (!e) return null;
  const steps = stepsOf(s.id);
  const must = e.items.filter(it => it.k === "m").map(it => {
    const key = itemKey(e, it), by = steps.filter(p => p.ref === key), manual = has("k:" + s.id + ":" + key);
    return { it, key, by, manual, done: by.length > 0 || manual };
  });
  return { e, must, done: must.filter(x => x.done).length, missing: must.filter(x => !x.done), tc: timeCheck(e, s.dur) };
}

/* ===== Combinar con la otra profe ===== */
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
function mergeData(mine, theirs, base) {
  const out = {}; let nuevos = 0, ambos = 0;
  new Set([...Object.keys(mine), ...Object.keys(theirs)]).forEach(k => {
    const a = mine[k], b = theirs[k];
    if (!a) { out[k] = b; nuevos++; return; }
    if (!b) { out[k] = a; return; }
    if (same(a.v, b.v)) { out[k] = a.t >= b.t ? a : b; return; }
    const bb = base[k], ambas = !bb || (a.t > bb.t && b.t > bb.t);
    if (ambas) ambos++;
    if (b.t > a.t || (b.t === a.t && JSON.stringify(b.v) > JSON.stringify(a.v))) { out[k] = b; nuevos++; } else out[k] = a;
  });
  return { out, nuevos, ambos };
}
function cleanV(v, key) {
  if (Array.isArray(v)) return v.slice(0, 300).map(x => cleanV(x));
  if (v && typeof v === "object") { const r = {}; Object.keys(v).forEach(k => { if (k === "__proto__" || k === "constructor" || k === "prototype") return; r[k] = cleanV(v[k], k); }); return r; }
  if (typeof v === "string") { if (/url$/i.test(key || "") && v && !okUrl(v)) return ""; return v.slice(0, 4000); }
  return typeof v === "number" || typeof v === "boolean" || v === null ? v : null;
}
const ID_FIELDS = ["id", "gid", "sid", "ref", "eff"], ID_OK = /^[\w.-]{0,64}$/;
const idsOk = v => !v || typeof v !== "object" || ID_FIELDS.every(f => v[f] === undefined || (typeof v[f] === "string" && ID_OK.test(v[f])));
function cleanData(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const out = {}, ok = /^[gscalnkpq]:.{1,300}$/; let n = 0;
  Object.keys(raw).forEach(k => {
    if (n > 60000 || !ok.test(k)) return;
    const x = raw[k];
    if (!x || typeof x !== "object" || typeof x.t !== "number" || !isFinite(x.t)) return;
    const v = cleanV(x.v, k);
    if (!idsOk(v)) return;
    out[k] = { t: Math.min(x.t, Date.now() + 864e5), v }; n++;
  });
  return out;
}
const unshared = () => Object.keys(ST.D).filter(k => ST.D[k].t > ST.lastShared).length;
const slug = s => String(s || "profe").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase() || "profe";
const exportFile = () => ({ app: "cuaderno-liga", fmt: FMT, profe: ST.profe, at: Date.now(), data: ST.D });
function parseImport(text) {
  let o; try { o = JSON.parse(text); } catch (e) { return { err: "Ese archivo no es una copia del cuaderno." }; }
  if (!o || o.app !== "cuaderno-liga") return { err: "Ese archivo no es una copia del cuaderno de la liga." };
  if (typeof o.fmt === "number" && o.fmt > FMT) return { err: "Ese archivo es de una versión más nueva del cuaderno. Actualizá la página y probá de nuevo." };
  const data = cleanData(o.data); if (!data) return { err: "El archivo está dañado." };
  return { data, profe: String(o.profe || "otra profe").slice(0, 60), at: +o.at || 0 };
}

/* ===== Estado de pantalla ===== */
const SEC = { hoy: "lila", clases: "celeste", calendario: "limon", coreos: "rosa", alumnas: "menta", mas: "durazno" };
const NAV = [["hoy", "Hoy", "lila", "home"], ["clases", "Clases", "celeste", "book"], ["calendario", "Calendario", "limon", "cal"], ["coreos", "Coreos", "rosa", "music"], ["alumnas", "Alumnas", "menta", "users"], ["mas", "Más", "durazno", "dots"]];
const ui = { tab: "hoy", sub: "", cg: null, cdate: todayISO(), month: todayISO().slice(0, 7), draft: null, coGroup: null, sid: null, editStep: null, ag: null, editG: null, ficha: null, confirm: null, rcopa: "gm", reff: "gm-tercera", imp: null, syncMsg: "", ask: false, cerr: "", copied: "" };
const gOpts = sel => groups().map(g => `<option value="${esc(g.id)}"${g.id === sel ? " selected" : ""}>${esc(g.name)}</option>`).join("");
const gName = id => (group(id) || {}).name || "";
const delBtn = (a, id, label = "Borrar") => { const k = a + id; return `<button class="btn small ${ui.confirm === k ? "danger" : "ghost"}" data-a="${a}" data-id="${esc(id)}">${ui.confirm === k ? "¿Seguro?" : label}</button>`; };
const mins = bl => bl.reduce((t, b) => t + (+b.m || 0), 0);
const hmToMin = h => /^\d{1,2}:\d{2}$/.test(h || "") ? +h.split(":")[0] * 60 + +h.split(":")[1] : 0;
const codeLabel = c => { if (c === "x:sin") return "Sin clase"; if (c.startsWith("co:")) { const s = student(c.slice(3)); return "Coreografía " + (s ? s.name : "(alumna borrada)"); } return c; };
const go = t => { ui.tab = t; ui.sub = ""; ui.confirm = null; renderPanel(); window.scrollTo(0, 0); };

/* ===== Hoy ===== */
function nextClass() {
  const now = new Date(), nowM = now.getHours() * 60 + now.getMinutes();
  for (let i = 0; i < 8; i++) {
    const d = addDaysTo(todayISO(), i); let best = null;
    groups().forEach(g => {
      if (!isScheduled(g, d)) return;
      const hm = hmToMin(g.hora);
      if (i === 0 && hm && hm + 60 < nowM) return;
      const key = (g.hora || "00:00").padStart(5, "0");
      if (!best || key < best.key) best = { key, d, g };
    });
    if (best) return best;
  }
  return null;
}
function weekStrip() {
  const t = todayISO(), lead = (wdOf(t) + 6) % 7, mon = addDaysTo(t, -lead);
  return `<div class="wk">${[0, 1, 2, 3, 4, 5, 6].map(i => { const d = addDaysTo(mon, i), has = groups().some(g => isScheduled(g, d)); return `<button class="btn small${d === t ? " on" : ""}" data-a="goDay" data-id="${esc(d)}" aria-label="${esc(fmtLong(d))}"><span style="display:block;font-size:.7rem">${WD[wdOf(d)]}</span><b>${+d.slice(8)}</b>${has ? '<span style="display:block;line-height:.4;font-size:1.2rem">·</span>' : ""}</button>`; }).join("")}</div>`;
}
function rHoy() {
  const gs = groups(), t = todayISO();
  if (!gs.length) return `<div class="head"><div><h2>Buen día, ${esc(ST.profe)}</h2><p>Para empezar, creá tu primer grupo y cargá a las alumnas.</p></div></div>
  <div class="card tint tape stack" style="--sec:var(--menta);--sh:var(--sh-menta)"><h3>Primer paso</h3><p>Un grupo es una clase que se repite, por ejemplo "Intermedio martes y jueves".</p><div class="row"><button class="btn" data-a="newGroup">Crear mi primer grupo</button></div></div>
  <div class="card tape tilt" style="margin-top:26px">${syncCard()}</div>`;
  const nc = nextClass();
  const big = nc ? `<div class="card tint tape stack" style="--sec:var(--lila);--sh:var(--sh-lila);gap:10px"><div class="row" style="justify-content:space-between"><span class="chip white">Próxima clase${nc.d === t ? " · hoy" : " · " + esc(fmt(nc.d))}</span></div>
    <div class="stat">${esc(nc.g.hora || "--:--")}</div><p><b>${esc(nc.g.name)}</b> · ${students(nc.g.id).length} alumnas</p>
    <div class="row"><button class="btn" data-a="pasarLista" data-id="${esc(nc.g.id)}" data-d="${nc.d}">Pasar lista</button><button class="btn ghost" data-a="verPlan" data-id="${esc(nc.g.id)}" data-d="${nc.d}">Ver plan</button></div></div>` : `<div class="empty">No hay clases en los próximos días. Cargá los días de cada grupo en Alumnas.</div>`;
  const hoy = gs.filter(g => isScheduled(g, t)).sort((a, b) => (a.hora || "").localeCompare(b.hora || ""));
  const cards = hoy.map((g, i) => { const n = students(g.id).length, p = presentCount(g.id, t), c = ["celeste", "rosa", "menta", "limon"][i % 4]; return `<div class="card tint stack" style="--sec:var(--${c});--sh:var(--sh-${c});gap:8px"><div class="row" style="justify-content:space-between"><h3>${esc(g.hora || "")} ${esc(g.name)}</h3>${p ? chip(p + " de " + n + " vinieron", "white") : chip("sin lista todavía", "white")}</div><div class="row"><button class="btn small" data-a="pasarLista" data-id="${esc(g.id)}" data-d="${t}">Pasar lista</button><button class="btn small ghost" data-a="verPlan" data-id="${esc(g.id)}" data-d="${t}">Ver plan</button></div></div>`; }).join("");
  const tor = upcomingTorneos()[0];
  return `<div class="head"><div><h2>Buen día, ${esc(ST.profe)}</h2></div></div>
  <div class="stack" style="gap:22px">${big}${weekStrip()}
  ${hoy.length ? `<div class="stack" style="gap:16px"><p class="gtitle" style="margin:0">Clases de hoy</p>${cards}</div>` : ""}
  ${tor ? `<div class="card flat"><p class="muted">Próximo torneo de la liga</p><h3>${esc(tor.name)}</h3><p>${esc(fmtLong(tor.date))} · ${when(daysTo(tor.date))}${tor.lugar ? " · " + esc(tor.lugar) : ""}</p></div>` : ""}
  <div class="card tape tilt">${syncCard()}</div></div>`;
}
function syncCard() {
  const n = unshared();
  return `<h3>Sincronizar con la otra profe</h3><p class="${n ? "hand" : "muted"}" style="margin-top:4px">${n ? n + " cambios tuyos todavía sin compartir." : "Todo compartido. No hay cambios nuevos tuyos."}</p><div class="row" style="margin-top:10px"><button class="btn small" data-a="goSync">Sincronizar</button></div>`;
}

/* ===== Clases ===== */
const newDraft = (gid, date) => { const g = gid ? group(gid) : null, lv = g ? g.level : "Iniciación"; return { id: "", title: g ? "Clase de " + g.name : "", gid: gid || "", date: date || todayISO(), level: lv, blocks: TEMPLATES[lv].map(b => ({ ...b })) }; };
function classText(c) { return `${c.title}\n${fmt(c.date)} · ${c.level}${c.gid ? " · " + gName(c.gid) : ""}\n\n` + c.blocks.map(b => `${b.m} min  ${b.n}${b.t ? ": " + b.t : ""}`).join("\n") + `\n\nTotal: ${mins(c.blocks)} min`; }
function rClases() {
  if (!ui.draft) ui.draft = newDraft(groups()[0] && groups()[0].id);
  const d = ui.draft;
  const blocks = d.blocks.map((b, i) => `<div class="card stack" style="gap:8px"><div class="row"><label class="f" style="flex:1 1 160px">Bloque<input data-b="${i}" data-f="n" value="${esc(b.n)}"></label><label class="f" style="width:84px">Minutos<input type="number" min="0" inputmode="numeric" data-b="${i}" data-f="m" value="${esc(b.m)}"></label><button class="btn small ghost" data-a="delBlock" data-id="${esc(i)}">Quitar</button></div><label class="f">Qué se hace<textarea data-b="${i}" data-f="t" rows="2">${esc(b.t)}</textarea></label></div>`).join("");
  const saved = plans().sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return `<div class="head"><div><h2>Planificador de clases</h2><p>Elegí el grupo y la fecha, ajustá los bloques y guardá el plan.</p></div></div>
  <div class="card tint stack"><div class="row"><label class="f" style="flex:2 1 200px">Título<input data-d="title" value="${esc(d.title)}" placeholder="Ej: Saltos de vals"></label>
  <label class="f" style="flex:1 1 150px">Grupo<select data-d="gid" data-r="1"><option value="">Sin grupo</option>${gOpts(d.gid)}</select></label>
  <label class="f" style="flex:1 1 140px">Fecha<input type="date" data-d="date" value="${esc(d.date)}"></label></div>
  <div class="row"><label class="f" style="flex:1 1 160px">Plantilla de nivel<select data-d="level" data-r="1">${LEVELS.map(l => `<option${l === d.level ? " selected" : ""}>${l}</option>`).join("")}</select></label><button class="btn small ghost" data-a="loadTpl" style="align-self:end">Cargar plantilla</button></div></div>
  <div class="stack" style="margin-top:18px;gap:16px">${blocks}<div class="row"><button class="btn ghost" data-a="addBlock">Agregar bloque</button><span class="chip white">Total ${mins(d.blocks)} min</span></div></div>
  <div class="row" style="margin-top:18px"><button class="btn" data-a="savePlan">${d.id ? "Guardar cambios" : "Guardar clase"}</button>${d.id ? `<button class="btn ghost" data-a="newPlan">Armar otra</button>` : ""}<button class="btn ghost" data-a="copyPlan">Copiar texto</button><span class="muted" id="cmsg" role="status">${esc(ui.cerr)}</span></div>
  <div class="head" style="margin-top:30px"><div><h3>Clases guardadas</h3></div></div>
  <div class="stack" style="gap:12px">${saved.length ? saved.map(c => `<div class="card flat row" style="justify-content:space-between"><div style="min-width:0"><b>${esc(c.title)}</b><p class="muted">${esc(fmt(c.date))}${c.gid ? " · " + esc(gName(c.gid)) : ""} · ${mins(c.blocks)} min</p></div><span class="row" style="gap:6px"><button class="btn small ghost" data-a="openPlan" data-id="${esc(c.id)}">Abrir</button>${delBtn("delPlan", c.id)}</span></div>`).join("") : emptyBox("Todavía no guardaste ninguna clase.")}</div>`;
}

/* ===== Calendario (asistencia y lo que se vio) ===== */
function monthShift(m, n) { const [y, mo] = m.split("-").map(Number), d = new Date(y, mo - 1 + n, 1); return d.getFullYear() + "-" + z2(d.getMonth() + 1); }
function calGrid(g) {
  const [y, m] = ui.month.split("-").map(Number), lead = (new Date(y, m - 1, 1).getDay() + 6) % 7, nd = new Date(y, m, 0).getDate(), t = todayISO();
  let h = `<div class="cal">${["L", "M", "M", "J", "V", "S", "D"].map(x => `<div class="wd">${x}</div>`).join("")}`;
  for (let i = 0; i < lead; i++) h += `<div class="cd off"></div>`;
  for (let n = 1; n <= nd; n++) {
    const d = y + "-" + z2(m) + "-" + z2(n), codes = logCodes(g.id, d), sin = codes.includes("x:sin"), work = presentCount(g.id, d) > 0 || codes.some(c => c !== "x:sin"), sch = isScheduled(g, d), tor = LIGA.torneos.some(x => x.date === d);
    let cls = "", lab = "";
    if (work) { cls = sch ? "done" : "extra"; lab = sch ? "hecha" : "extra"; } else if (sin) { cls = "sin"; lab = "sin"; } else if (sch) { if (d < t) { cls = "miss"; lab = "falta"; } else { cls = "sch"; lab = "clase"; } }
    if (tor) lab = "torneo";
    h += `<button class="cd ${cls}${d === t ? " today" : ""}${d === ui.cdate ? " sel" : ""}" data-a="pickDay" data-id="${esc(d)}" aria-label="${esc(fmtLong(d))}${lab ? ", " + lab : ""}">${n}${lab ? `<small>${lab}</small>` : ""}</button>`;
  }
  return h + "</div>";
}
function dayPanel(g) {
  const d = ui.cdate, sts = students(g.id), codes = logCodes(g.id, d), n = presentCount(g.id, d), sch = isScheduled(g, d);
  const free = codes.filter(c => !QUICK.includes(c) && !c.startsWith("co:") && c !== "x:sin");
  const plan = plans().find(c => c.gid === g.id && c.date === d);
  const on = c => codes.includes(c);
  const chipBtn = (c, label) => `<button class="btn small${on(c) ? " on" : ""}" data-a="logItem" data-id="${esc(c)}">${esc(label)}</button>`;
  return `<div class="card tint tape stack" style="--sec:var(--limon);--sh:var(--sh-limon)"><div class="row" style="justify-content:space-between"><h3>${esc(fmtLong(d))}</h3>${chip(sch ? "clase del grupo" : "día extra", sch ? "lila" : "celeste")}</div>
    <p class="muted">${esc(g.name)}${g.hora ? " · " + esc(g.hora) : ""}</p>
    <div class="row">${chipBtn("x:sin", "Sin clase este día")}${plan ? `<button class="btn small ghost" data-a="verPlan" data-id="${esc(g.id)}" data-d="${d}">Ver plan</button>` : `<button class="btn small ghost" data-a="verPlan" data-id="${esc(g.id)}" data-d="${d}">Armar plan</button>`}</div></div>
  <div class="card stack"><div class="row" style="justify-content:space-between"><h3>Asistencia</h3><span class="chip menta">${n} de ${sts.length}</span></div>
    ${sts.length ? `<div class="row"><button class="btn small ghost" data-a="attAll">Todas presentes</button><button class="btn small ghost" data-a="attNone">Limpiar</button></div>
    <div class="stack" style="gap:6px">${sts.map(s => `<div class="row" style="justify-content:space-between;flex-wrap:nowrap"><b>${esc(s.name)}</b><button class="dot${has(attKey(g.id, d, s.id)) ? " on" : ""}" data-a="att" data-id="${esc(s.id)}" aria-label="Presente: ${esc(s.name)}" aria-pressed="${has(attKey(g.id, d, s.id))}"></button></div>`).join("")}</div>` : emptyBox("Este grupo todavía no tiene alumnas. Cargalas en Alumnas.")}</div>
  <div class="card stack"><h3>Qué se vio</h3><div class="quick">${QUICK.map(c => chipBtn(c, c)).join("")}</div>
    ${sts.length ? `<p class="gtitle" style="margin:0">Coreografías trabajadas</p><div class="quick">${sts.map(s => chipBtn("co:" + s.id, "Coreo " + s.name)).join("")}</div>` : ""}
    ${free.length ? `<div class="quick">${free.map(c => chipBtn(c, c)).join("")}</div>` : ""}
    <div class="row"><input id="free" placeholder="Algo más que se hizo" style="flex:1 1 180px" maxlength="80"><button class="btn small" data-a="addFree">Agregar</button></div></div>
  <div class="card stack"><label class="f">Nota de la clase<textarea id="nota" rows="3" placeholder="Ej: faltó el parlante, repasar la entrada">${esc(get(notaKey(g.id, d)) || "")}</textarea></label><div class="row"><button class="btn small" data-a="saveNota">Guardar nota</button></div></div>`;
}
function rCalendario() {
  const gs = groups();
  if (!gs.length) return `<div class="head"><div><h2>Calendario</h2></div></div>${emptyBox("Primero creá un grupo en Alumnas.")}`;
  if (!ui.cg || !group(ui.cg)) ui.cg = gs[0].id;
  const g = group(ui.cg), [y, m] = ui.month.split("-").map(Number);
  const tors = upcomingTorneos().slice(0, 5);
  return `<div class="head"><div><h2>Calendario</h2><p>Tocá un día para pasar lista y anotar lo que se vio.</p></div></div>
  <div class="stack"><div class="seg">${gs.map(x => `<button class="btn small${x.id === g.id ? " on" : ""}" data-a="cgroup" data-id="${esc(x.id)}">${esc(x.name)}</button>`).join("")}</div>
  <div class="card stack"><div class="row" style="justify-content:space-between"><button class="btn small ghost" data-a="month" data-id="-1" aria-label="Mes anterior">←</button><h3>${esc(MESES_LARGO[m])} ${y}</h3><button class="btn small ghost" data-a="month" data-id="1" aria-label="Mes siguiente">→</button></div>${calGrid(g)}
  <div class="row"><span class="chip lila">clase</span><span class="chip menta">hecha</span><span class="chip rosa">falta</span><span class="chip celeste">extra</span></div></div>
  ${dayPanel(g)}
  ${tors.length ? `<div class="card flat stack"><h3>Torneos de la liga</h3>${tors.map(t => `<p><b>${esc(fmt(t.date))}</b> ${esc(t.name)}${t.lugar ? " · " + esc(t.lugar) : ""} <span class="muted">(${when(daysTo(t.date))})</span></p>`).join("")}</div>` : ""}</div>`;
}
const MESES_LARGO = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

/* ===== Coreos ===== */
function stepCard(s, p, i, n) {
  if (ui.editStep === p.id) return `<div class="card stack" style="gap:8px"><div class="row"><label class="f" style="flex:1 1 120px">Tipo<select id="se_tipo"><option value="tec"${p.tipo === "tec" ? " selected" : ""}>Técnico</option><option value="art"${p.tipo === "art" ? " selected" : ""}>Artístico</option></select></label><label class="f" style="width:96px">Minuto<input id="se_t" value="${esc(p.t || "")}" placeholder="0:20"></label></div>
    <label class="f">Qué pasa<input id="se_txt" value="${esc(p.txt)}" maxlength="140"></label>${refSelect("se_ref", s, p.ref)}<div class="row"><button class="btn small" data-a="saveStep" data-id="${esc(p.id)}">Guardar</button><button class="btn small ghost" data-a="cancelStep">Cancelar</button></div></div>`;
  const e = stuEff(s), it = e && p.ref ? e.items.find(x => itemKey(e, x) === p.ref) : null;
  return `<div class="card stack" style="gap:8px"><div class="stepc"><span class="stepn">${i + 1}</span><div style="min-width:0;flex:1"><b>${esc(p.txt)}</b><p class="muted">${chip(p.tipo === "art" ? "Artístico" : "Técnico", p.tipo === "art" ? "rosa" : "celeste")} ${p.t ? chip(p.t, "white") : ""} ${it ? chip("Cumple: " + shortName(it.t), "menta") : ""}</p></div></div>
    <div class="row"><button class="btn small ghost" data-a="stepUp" data-id="${esc(p.id)}"${i === 0 ? " disabled" : ""} aria-label="Subir">↑</button><button class="btn small ghost" data-a="stepDown" data-id="${esc(p.id)}"${i === n - 1 ? " disabled" : ""} aria-label="Bajar">↓</button><button class="btn small ghost" data-a="editStep" data-id="${esc(p.id)}">Editar</button>${delBtn("delStep", p.id, "Quitar")}</div></div>`;
}
function refSelect(id, s, sel) {
  const e = stuEff(s); if (!e) return "";
  return `<label class="f">Cumple este elemento del reglamento (opcional)<select id="${id}"><option value="">Ninguno</option>${e.items.filter(it => it.k !== "l").map(it => { const k = itemKey(e, it); return `<option value="${k}"${k === sel ? " selected" : ""}>${KIND[it.k][0]}: ${esc(shortName(it.t))}</option>`; }).join("")}</select></label>`;
}
function rStudent(s) {
  const g = group(s.gid), c = stuCheck(s), steps = stepsOf(s.id), song = s.songUrl ? songInfo(s.songUrl) : null, dates = coreoDates(s.gid, s.id);
  const effSel = `<label class="f">Eficiencia del reglamento<select data-c="eff"><option value="">Según el nivel del grupo${g ? " (" + esc(lvlName(DEFAULT_MAP[g.level])) + ")" : ""}</option>${Object.keys(COPAS).map(k => `<optgroup label="${esc(COPAS[k])}">${EFF.filter(e => e.c === k).map(e => `<option value="${e.id}"${s.eff === e.id ? " selected" : ""}>${esc(e.n)}</option>`).join("")}</optgroup>`).join("")}</select></label>`;
  const head = `<div class="row" style="margin-bottom:12px"><button class="back" data-a="closeStu">← Alumnas del grupo</button></div><div class="head"><div><h2>${esc(s.name)}</h2><p>${esc(g ? g.name : "")}${c ? " · " + esc(c.e.n) : ""}</p></div></div>`;
  let check = "";
  if (c) {
    const must = c.must.map(x => `<div class="ck${x.done ? " done" : ""}${x.by.length ? " auto" : ""}" ${x.by.length ? "" : `data-a="tick" data-id="${esc(x.key)}" role="checkbox" aria-checked="${x.done}" tabindex="0"`}><span>${x.done ? "✓ " : ""}${esc(x.it.t)}${x.by.length ? `<br><span class="muted">Está en el paso ${steps.indexOf(x.by[0]) + 1} de tu coreo</span>` : ""}</span></div>`).join("");
    const lim = c.e.items.filter(it => it.k !== "m").map(it => `<p><span class="chip ${KIND[it.k][1]}">${KIND[it.k][0]}</span> ${esc(it.t)}</p>`).join("");
    const tcCls = { ok: "ok", bad: "", none: "" }[c.tc.st];
    check = `<div class="card stack"><div class="row" style="justify-content:space-between"><h3>Del reglamento</h3>${chip(c.done + " de " + c.must.length + " obligatorios", c.missing.length ? "rosa" : "menta")}</div>
      <div class="bar" role="img" aria-label="${c.done} de ${c.must.length}"><i class="${c.done === 0 ? "z" : ""}" style="width:${c.must.length ? Math.round(100 * c.done / c.must.length) : 0}%"></i></div>
      ${c.missing.length ? `<span class="note">Faltan ${c.missing.length}: ${esc(c.missing.map(x => shortName(x.it.t)).join(", "))}</span>` : `<span class="note ok">Están todos los obligatorios</span>`}
      <div class="stack" style="gap:8px">${must}</div><p class="muted">Se tilda solo si lo ponés en un paso de tu coreo, o lo tildás a mano.</p>
      <details><summary>Límites y opcionales</summary><div class="stack" style="gap:6px;margin-top:8px">${lim}</div></details></div>
    <div class="card stack"><label class="f">Duración del programa<input data-c="dur" value="${esc(s.dur || "")}" placeholder="Ej: 2:00" style="max-width:140px"></label><p class="${tcCls === "ok" ? "" : "hand"}">${esc(c.tc.txt)}</p><p class="muted">Tiempo permitido: ${esc(timeLabel(c.e))}</p></div>`;
  } else check = `<div class="card">${emptyBox("Elegí una eficiencia para ver qué pide el reglamento.")}</div>`;
  const stepsHtml = steps.length ? steps.map((p, i) => stepCard(s, p, i, steps.length)).join("") : emptyBox("Todavía no hay pasos. Agregá el primero abajo.");
  const add = `<div class="card tint stack" style="--sec:var(--celeste);--sh:var(--sh-celeste)"><h3>Agregar un paso</h3><div class="row"><label class="f" style="flex:1 1 120px">Tipo<select id="sp_tipo"><option value="tec">Técnico</option><option value="art">Artístico</option></select></label><label class="f" style="width:96px">Minuto<input id="sp_t" placeholder="0:20"></label></div>
    <label class="f">Qué pasa<input id="sp_txt" maxlength="140" placeholder="Ej: salto de vals en la diagonal"></label>${refSelect("sp_ref", s, "")}<div class="row"><button class="btn" data-a="addStep">Agregar paso</button><span class="muted" id="sperr" role="alert"></span></div></div>`;
  const songBox = song ? `<div class="row" style="justify-content:space-between"><div style="min-width:0"><span class="chip menta">${esc(song.p)}</span> <b>${esc(s.songName || "Canción")}</b></div><span class="row" style="gap:6px"><a class="btn small" href="${esc(s.songUrl)}" target="_blank" rel="noopener noreferrer">Abrir</a><button class="btn small ghost" data-a="delSong">Quitar</button></span></div>` : `<label class="f">Canción (Spotify o YouTube)<input id="songin" inputmode="url" placeholder="Pegá el link, y si querés el nombre al lado"></label><div class="row"><button class="btn small" data-a="saveSong">Guardar canción</button><span class="muted" id="sgerr" role="alert"></span></div>`;
  return `${head}<div class="stack" style="gap:20px">${effSel}${check}
    <div><p class="gtitle" style="margin:0 0 8px">Mi coreo, paso a paso</p><div class="stack" style="gap:12px">${stepsHtml}</div></div>${add}
    <div class="card stack"><h3>Canción</h3>${songBox}</div>
    <div class="card flat"><h3>Trabajada en clase</h3><p class="muted">${dates.length ? dates.length + (dates.length === 1 ? " vez: " : " veces: ") + dates.map(d => esc(fmt(d))).join(", ") : "Todavía no la marcaste en el calendario. En un día de clase tocá \"Coreo " + esc(s.name) + "\"."}</p></div></div>`;
}
function rCoreos() {
  const gs = groups();
  if (ui.sid && student(ui.sid)) return rStudent(student(ui.sid));
  ui.sid = null;
  if (!gs.length) return `<div class="head"><div><h2>Coreografías</h2></div></div>${emptyBox("Primero creá un grupo y cargá alumnas en Alumnas.")}`;
  if (!ui.coGroup || !group(ui.coGroup)) ui.coGroup = gs[0].id;
  const sts = students(ui.coGroup);
  const rows = sts.map(s => { const c = stuCheck(s), n = stepsOf(s.id).length; return `<button class="card tint stack" data-a="openStu" data-id="${esc(s.id)}" style="--sec:var(--rosa);--sh:var(--sh-rosa);text-align:left;cursor:pointer;gap:6px;border:2px solid var(--ink)"><div class="row" style="justify-content:space-between"><h3>${esc(s.name)}</h3>${c ? chip(c.done + "/" + c.must.length + " obligatorios", c.missing.length ? "white" : "menta") : ""}</div><p class="muted">${c ? esc(c.e.n) : "Sin eficiencia"} · ${n} ${n === 1 ? "paso" : "pasos"}</p></button>`; }).join("");
  return `<div class="head"><div><h2>Coreografías</h2><p>Elegí una alumna para ver el checklist del reglamento y armar su coreo.</p></div></div>
  <div class="stack"><div class="seg">${gs.map(x => `<button class="btn small${x.id === ui.coGroup ? " on" : ""}" data-a="coGroup" data-id="${esc(x.id)}">${esc(x.name)}</button>`).join("")}</div>
  <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">${rows || emptyBox("Este grupo no tiene alumnas todavía.")}</div></div>`;
}

/* ===== Alumnas y grupos ===== */
function groupForm(g) {
  const id = g ? g.id : "";
  return `<div class="card tint tape stack" style="--sec:var(--menta);--sh:var(--sh-menta)"><h3>${g ? "Editar grupo" : "Nuevo grupo"}</h3>
  <label class="f">Nombre<input id="gname" value="${esc(g ? g.name : "")}" placeholder="Ej: Intermedio tarde" maxlength="60"></label>
  <div class="row"><label class="f" style="flex:1 1 150px">Nivel<select id="glevel">${LEVELS.map(l => `<option${g && g.level === l ? " selected" : ""}>${l}</option>`).join("")}</select></label><label class="f" style="width:130px">Hora<input id="ghora" type="time" value="${esc(g ? g.hora || "" : "")}"></label></div>
  <p class="muted" style="margin-top:4px"><b>Días de clase</b></p><div class="seg">${[1, 2, 3, 4, 5, 6, 0].map(n => `<label class="btn small ghost" style="cursor:pointer"><input type="checkbox" class="gday" value="${n}"${g && (g.dias || []).includes(n) ? " checked" : ""}> ${WD[n]}</label>`).join("")}</div>
  <div class="row"><button class="btn" data-a="saveGroup" data-id="${esc(id)}">Guardar grupo</button><button class="btn ghost" data-a="cancelGroup">Cancelar</button><span class="muted" id="gerr" role="alert"></span></div></div>`;
}
function rFicha(s) {
  const cuotas = MESES_CUOTA.map(m => { const k = "q:" + s.id + ":" + YEAR + "-" + z2(m); return `<button class="btn small ghost${has(k) ? " on" : ""}" data-a="cuota" data-id="${esc(k)}" style="${has(k) ? "background:var(--menta)" : ""}" aria-pressed="${has(k)}">${MESES[m]}</button>`; }).join("");
  return `<div class="row" style="margin-bottom:12px"><button class="back" data-a="closeFicha">← Volver al grupo</button></div><div class="head"><div><h2>${esc(s.name)}</h2></div></div>
  <div class="stack"><div class="card stack"><label class="f">Nombre (solo nombre de pila)<input id="fname" value="${esc(s.name)}" maxlength="60"></label><label class="f">Grupo<select id="fgid">${gOpts(s.gid)}</select></label><div class="row"><button class="btn small" data-a="saveFicha" data-id="${esc(s.id)}">Guardar</button><span class="muted" id="ferr" role="status"></span></div></div>
  <div class="card stack"><h3>Cuotas ${YEAR}</h3><div class="seg">${cuotas}</div><p class="muted">Tocá el mes para marcarlo como pagado.</p></div>
  <div class="card flat row" style="justify-content:space-between"><span class="muted">Si se va del grupo, borrala.</span>${delBtn("delStu", s.id, "Borrar alumna")}</div></div>`;
}
function rAlumnas() {
  const gs = groups();
  if (ui.ficha && student(ui.ficha)) return rFicha(student(ui.ficha));
  ui.ficha = null;
  if (ui.editG === "new" || !gs.length) return `<div class="head"><div><h2>Alumnas y grupos</h2><p>Un grupo es una clase que se repite. Cada profe crea y maneja los suyos.</p></div></div>${groupForm(null)}`;
  if (ui.editG && group(ui.editG)) return `<div class="head"><div><h2>Alumnas y grupos</h2></div></div>${groupForm(group(ui.editG))}`;
  if (!ui.ag || !group(ui.ag)) ui.ag = gs[0].id;
  const g = group(ui.ag), sts = students(g.id), mk = YEAR + "-" + z2(new Date().getMonth() + 1), pagaron = sts.filter(s => has("q:" + s.id + ":" + mk)).length;
  return `<div class="head"><div><h2>Alumnas y grupos</h2></div><button class="btn small" data-a="newGroup">+ Nuevo grupo</button></div>
  <div class="stack"><div class="seg">${gs.map(x => `<button class="btn small${x.id === g.id ? " on" : ""}" data-a="agroup" data-id="${esc(x.id)}">${esc(x.name)}</button>`).join("")}</div>
  <div class="card tint tape stack" style="--sec:var(--menta);--sh:var(--sh-menta);gap:8px"><div class="row" style="justify-content:space-between"><h3>${esc(g.name)}</h3>${chip(g.level, "white")}</div><p>${(g.dias || []).length ? (g.dias || []).map(n => WD[n]).join(", ") : "Sin días cargados"}${g.hora ? " · " + esc(g.hora) : ""}</p><p class="muted">Profe: ${esc(g.profe || "")} · Cuota de ${MESES[new Date().getMonth() + 1]}: ${pagaron} de ${sts.length}</p><div class="row"><button class="btn small ghost" data-a="editGroup" data-id="${esc(g.id)}">Editar grupo</button>${delBtn("delGroup", g.id, "Borrar grupo")}</div></div>
  <div class="card stack"><h3>Alumnas (${sts.length})</h3><div class="row"><input id="newstu" placeholder="Nombre de pila" maxlength="60" style="flex:1 1 180px"><button class="btn small" data-a="addStu">Agregar</button></div><span class="muted" id="sterr" role="alert"></span>
  <div class="stack" style="gap:8px">${sts.length ? sts.map(s => `<div class="row" style="justify-content:space-between;flex-wrap:nowrap"><b>${esc(s.name)}</b><span class="row" style="gap:6px">${has("q:" + s.id + ":" + mk) ? chip("cuota al día", "menta") : chip("sin cuota", "white")}<button class="btn small ghost" data-a="openFicha" data-id="${esc(s.id)}">Ficha</button></span></div>`).join("") : emptyBox("Todavía no hay alumnas en este grupo.")}</div></div></div>`;
}

/* ===== Más ===== */
const SUBS = [["sync", "Sincronizar", "con la otra profe", "celeste"], ["mensajes", "Mensajes", "para familias", "rosa"], ["reglamento", "Reglamento", "CAP 2024", "limon"], ["aviso", "Aviso a familias", "texto para mandar", "menta"], ["ajustes", "Ajustes", "tu nombre y datos", "durazno"]];
const AVISO = "Hola, les cuento que para organizar las clases usamos un cuaderno digital. Guardamos solo el nombre de pila de cada alumna, su grupo, la asistencia, la cuota y lo que trabajamos en clase. No guardamos DNI, direcciones ni fotos. Los datos quedan en el celular de las profes y los compartimos entre nosotras por una carpeta privada de Google Drive, cuyos servidores están en el exterior. Si quieren ver, corregir o borrar los datos de su hija o hijo, escríbanme. Si están de acuerdo, respondan \"Conforme\". Gracias.";
function rSync() {
  const n = unshared(), last = ST.lastShared ? "Última vez que compartiste: " + new Date(ST.lastShared).toLocaleString("es-AR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "Todavía no compartiste nada.";
  const imp = ui.imp;
  const prev = imp ? `<div class="card tint stack" style="--sec:var(--limon);--sh:var(--sh-limon)"><h3>Archivo de ${esc(imp.profe)}</h3><p>${imp.nuevos} cambios nuevos para vos. ${imp.ambos ? imp.ambos + " datos los editaron las dos, queda el más reciente." : "No hay datos pisados."}</p>${imp.warn ? `<p class="hand">${esc(imp.warn)}</p>` : ""}<div class="row"><button class="btn" data-a="applyMerge">Combinar</button><button class="btn ghost" data-a="cancelMerge">Cancelar</button></div></div>` : "";
  return `<div class="head"><div><h2>Sincronizar</h2><p>Cada profe guarda lo suyo en su Drive y le manda una copia a la otra por WhatsApp. Al recibirla, la otra la sube acá.</p></div></div>
  <div class="stack"><div class="card"><p class="${n ? "hand" : "muted"}">${n ? n + " cambios tuyos sin compartir." : "No hay cambios tuyos sin compartir."}</p><p class="muted">${esc(last)}</p></div>
  <div class="card stack"><h3>Guardar mis datos en Drive</h3><p class="muted">Se abre el menú del celular. Elegí Drive, la carpeta "Cuaderno Liga" y Guardar.</p><div class="row"><button class="btn" data-a="share">Guardar en Drive</button><button class="btn ghost" data-a="download">Bajar al celular</button></div></div>
  <div class="card stack"><h3>Mandar mis datos por WhatsApp</h3><p class="muted">Elegí WhatsApp y la profe. Va el archivo y un mensaje con un link que lleva directo a esta pantalla.</p><div class="row"><button class="btn" data-a="shareWa">Mandar por WhatsApp</button><button class="btn small ghost" data-a="copyWaMsg">Copiar el mensaje</button></div><span class="muted" id="smsg2" role="status"></span></div>
  <div class="card stack"><h3>Subir los datos que me mandó otra profe</h3><p class="muted">Si te llegó un archivo por WhatsApp, tocá el botón y buscalo en Descargas o en WhatsApp. La app muestra qué trae antes de combinar.</p><label class="btn" style="cursor:pointer;align-self:flex-start">Elegir el archivo<input type="file" accept=".json,application/json" id="impin" style="display:none"></label></div>
  ${prev}
  <p class="muted" id="smsg" role="status">${esc(ui.syncMsg)}</p></div>`;
}
function rMensajes() {
  return `<div class="head"><div><h2>Mensajes</h2><p>Textos listos para familias y redes. Completá lo que está entre llaves {así} y copiá.</p></div></div>
  <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr))">${MENSAJES.map(([t, tag, body], i) => `<div class="card"><div class="row" style="justify-content:space-between"><h3>${esc(t)}</h3><span class="chip ${tag === "Redes" ? "rosa" : "celeste"}">${esc(tag)}</span></div><textarea id="m${i}" rows="7" style="margin-top:8px">${esc(body)}</textarea><div class="row" style="margin-top:8px"><button class="btn small" data-a="copyMsg" data-id="m${i}">Copiar</button><span class="muted" id="cm-m${i}" role="status"></span></div></div>`).join("")}</div>`;
}
function rReglamento() {
  const copa = ui.rcopa, effs = EFF.filter(e => e.c === copa);
  if (!effs.find(e => e.id === ui.reff)) ui.reff = effs[0].id;
  const e = effById(ui.reff), gs = ["Saltos", "Trompos", "Figuras", "Pasos"];
  const body = gs.map(g => { const its = e.items.filter(x => x.g === g); return its.length ? `<div class="card flat"><h3>${g}</h3><div class="stack" style="gap:8px;margin-top:8px">${its.map(it => `<p><span class="chip ${KIND[it.k][1]}">${KIND[it.k][0]}</span> ${esc(it.t)}</p>`).join("")}</div></div>` : ""; }).join("");
  return `<div class="head"><div><h2>Reglamento</h2><p>Qué pide cada eficiencia. El checklist de cada alumna sale de acá.</p></div><a class="btn small ghost" href="reglamento-cap-2024.pdf" target="_blank" rel="noopener">Abrir el PDF</a></div>
  <div class="stack"><div class="card stack"><p class="gtitle" style="margin:0">Elegí la copa o divisional</p><div class="seg">${Object.keys(COPAS).map(c => `<button class="btn small${copa === c ? " on" : ""}" data-a="rcopa" data-id="${esc(c)}">${esc(COPAS[c])}</button>`).join("")}</div>
  <p class="gtitle" style="margin:6px 0 0">Eficiencia</p><div class="seg">${effs.map(x => `<button class="btn small${e.id === x.id ? " on" : ""}" data-a="reff" data-id="${esc(x.id)}">${esc(x.n)}</button>`).join("")}</div></div>
  <div class="card tint tape stack" style="--sec:var(--rosa);--sh:var(--sh-rosa)"><div class="row" style="justify-content:space-between"><h2>${esc(e.n)}</h2><span class="chip white">${esc(COPAS[copa])}</span></div><span class="chip limon" style="align-self:flex-start">Tiempo: ${esc(timeLabel(e))}</span></div>
  <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px">${body}</div>
  <div class="card"><h3>Descuentos de ${esc(COPAS[copa])}</h3><div class="scroll"><table><thead><tr><th>Situación</th><th>Descuento</th></tr></thead><tbody>${DESC[copa].map(([t, v]) => `<tr><td class="name">${esc(t)}</td><td style="white-space:normal">${esc(v)}</td></tr>`).join("")}</tbody></table></div></div>
  <div class="card"><h3>Aclaraciones generales</h3><ul class="steps">${ACLAR.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <p class="muted">Resumen del Reglamento Nacional de Patinaje Artístico CAP 2024. No incluye Elite ni las categorías internacionales de World Skate. Ante una duda, vale el PDF original.</p></div>`;
}
function rAjustes() {
  return `<div class="head"><div><h2>Ajustes</h2></div></div><div class="stack">
  <div class="card stack"><label class="f">Tu nombre (lo ve la otra profe al sincronizar)<input id="pname2" value="${esc(ST.profe)}" maxlength="40"></label><div class="row"><button class="btn small" data-a="saveProfe">Guardar</button><span class="muted" id="perr" role="status"></span></div></div>
  <div class="card flat stack"><h3>Borrar todo en este celular</h3><p class="muted">Borra grupos, alumnas y clases de este celular. Antes guardá una copia con Sincronizar. No toca lo que tenga la otra profe, pero si después sincronizás con su archivo, vuelve todo.</p><div class="row">${delBtn("delAll", "all", "Borrar todo")}</div></div></div>`;
}
function rMas() {
  if (ui.sub === "sync") return `<div class="row" style="margin-bottom:10px"><button class="back" data-a="go" data-id="mas">← Más</button></div>${rSync()}`;
  if (ui.sub === "mensajes") return `<div class="row" style="margin-bottom:10px"><button class="back" data-a="go" data-id="mas">← Más</button></div>${rMensajes()}`;
  if (ui.sub === "reglamento") return `<div class="row" style="margin-bottom:10px"><button class="back" data-a="go" data-id="mas">← Más</button></div>${rReglamento()}`;
  if (ui.sub === "aviso") return `<div class="row" style="margin-bottom:10px"><button class="back" data-a="go" data-id="mas">← Más</button></div><div class="head"><div><h2>Aviso a familias</h2><p>Mandalo antes de cargar a las alumnas, y guardá las respuestas "Conforme". Es un modelo, no reemplaza una consulta legal.</p></div></div><div class="card stack"><textarea id="avisotxt" rows="10">${esc(AVISO)}</textarea><div class="row"><button class="btn small" data-a="copyMsg" data-id="avisotxt">Copiar</button><span class="muted" id="cm-avisotxt" role="status"></span></div></div>`;
  if (ui.sub === "ajustes") return `<div class="row" style="margin-bottom:10px"><button class="back" data-a="go" data-id="mas">← Más</button></div>${rAjustes()}`;
  return `<div class="head"><div><h2>Más</h2></div></div><div class="tiles3">${SUBS.map(([k, t, s, c]) => `<button class="tile" style="--c:var(--${c})" data-a="sub" data-id="${esc(k)}"><b>${t}</b><span class="hand">${s}</span></button>`).join("")}</div>`;
}
function rWelcome() {
  return `<div class="head"><div><h2>Bienvenida</h2><p>Esto es un cuaderno para organizar clases, asistencia y coreografías de la liga.</p></div></div>
  <div class="card tint tape stack" style="--sec:var(--lila);--sh:var(--sh-lila)"><label class="f">¿Cómo te llamás? (la otra profe lo ve al sincronizar)<input id="pname" maxlength="40" placeholder="Tu nombre de pila"></label><div class="row"><button class="btn" data-a="setProfe">Empezar</button><span class="muted" id="perr" role="alert"></span></div></div>`;
}

/* ===== Pantalla ===== */
const lvlName = id => (effById(id) || {}).n || "";
ICON.cal = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>';
const RENDER = { hoy: rHoy, clases: rClases, calendario: rCalendario, coreos: rCoreos, alumnas: rAlumnas, mas: rMas };
function renderNav() {
  const cur = NAV.find(n => n[0] === ui.tab) ? ui.tab : "hoy";
  $("#bnav").innerHTML = NAV.map(([k, l, c, ic]) => `<button class="nt" style="--c:var(--${c})" data-a="go" data-id="${k}"${cur === k ? ' aria-current="page"' : ""}>${ICON[ic]}<span>${l}</span></button>`).join("");
}
function renderAsk() {
  const el = $("#ask"); if (!el) return;
  const show = ui.ask && ST.profe && unshared() > 0 && ST.askNo !== todayISO();
  el.innerHTML = show ? `<div class="ask" role="status"><p>Terminó la clase. ¿Sincronizás con la otra profe?</p><div class="row"><button class="btn small" data-a="goSync">Sincronizar</button><button class="btn small ghost" data-a="askNo">Ahora no</button></div></div>` : "";
}
let askTimer = 0;
const armAsk = () => { clearTimeout(askTimer); askTimer = setTimeout(() => { ui.ask = true; renderAsk(); }, 25000); };
function renderPanel() {
  const c = SEC[ui.tab] || "lila", root = document.documentElement.style;
  root.setProperty("--sec", "var(--" + c + ")"); root.setProperty("--sh", "var(--sh-" + c + ")");
  document.querySelectorAll("section.panel").forEach(p => p.classList.toggle("on", p.id === "p-" + ui.tab));
  const el = $("#p-" + ui.tab);
  if (el) el.innerHTML = ST.profe ? RENDER[ui.tab]() : rWelcome();
  renderNav(); renderAsk();
}
function renderAll() {
  $("#dt").textContent = fmtLong(todayISO());
  $("#subttl").textContent = ST.profe ? "Profe " + ST.profe + " · Liga" : "Clases, coreos y asistencia de la liga";
  renderPanel();
}

/* ===== Acciones ===== */
const val = id => { const e = document.getElementById(id); return e ? e.value.trim() : ""; };
const confirmed = key => { if (ui.confirm === key) { ui.confirm = null; return true; } ui.confirm = key; renderPanel(); return false; };
function copyText(text, note) {
  const done = ok => { if (note) note.textContent = ok ? "Copiado" : "Seleccioná el texto y copialo"; };
  const fallback = () => { try { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); const ok = document.execCommand("copy"); ta.remove(); done(ok); } catch (e) { done(false); } };
  try { navigator.clipboard.writeText(text).then(() => done(true), fallback); } catch (e) { fallback(); }
}
const putStu = s => put("s:" + s.id, s);
const mapCodes = { x: 1 };
function saveJsonFile(name, json) {
  const file = new File([json], name, { type: "application/json" });
  return file;
}
const importLink = () => location.href.split("#")[0] + "#importar";
const waText = () => "Cuaderno de Patín: copia de " + ST.profe + ". Para sumarla a tu cuaderno, tocá este link y elegí el archivo que te mandé: " + importLink();
async function doShare(modo) {
  /* modo: "drive" abre el menú del celular, "wa" lo abre con un mensaje listo, "file" baja el archivo */
  const at = Date.now(), name = "cuaderno-liga-" + slug(ST.profe) + "-" + todayISO() + ".json", file = saveJsonFile(name, JSON.stringify({ ...exportFile(), at }));
  const data = { files: [file], title: "Cuaderno de la liga" };
  if (modo === "wa") data.text = waText();
  try {
    if (modo !== "file" && navigator.canShare && navigator.canShare(data)) {
      await navigator.share(data);
      ST.lastShared = at; persist();
      ui.syncMsg = modo === "wa" ? "Listo. Elegí WhatsApp y la profe. Si el archivo llegó sin el mensaje, mandale también el link de abajo." : "Listo. Revisá en Drive que el archivo esté en la carpeta Cuaderno Liga.";
      renderPanel(); return;
    }
  } catch (e) { if (e && e.name === "AbortError") { ui.syncMsg = "Se canceló. No se guardó nada."; renderPanel(); return; } }
  try {
    const u = URL.createObjectURL(file), el = document.createElement("a"); el.href = u; el.download = name; document.body.appendChild(el); el.click(); el.remove(); setTimeout(() => URL.revokeObjectURL(u), 4000);
    ST.lastShared = at; persist();
    ui.syncMsg = modo === "wa" ? "Este navegador no puede mandarlo directo. Se bajó " + name + " a Descargas: adjuntalo en WhatsApp y pegá el mensaje de abajo." : "Se bajó " + name + " a Descargas. Subilo a la carpeta Cuaderno Liga de Drive.";
  } catch (e) { ui.syncMsg = "No pude armar el archivo en este navegador."; }
  renderPanel();
}
function readImport(file) {
  if (!file) return;
  const r = new FileReader();
  r.onload = () => {
    const p = parseImport(String(r.result));
    if (p.err) { ui.imp = null; ui.syncMsg = p.err; renderPanel(); return; }
    const m = mergeData(ST.D, p.data, ST.base);
    let warn = "";
    if (p.profe === ST.profe) warn = "Ese archivo tiene tu mismo nombre. Fijate que sea el de la otra profe.";
    else if (ST.merged[p.profe] && p.at <= ST.merged[p.profe]) warn = "Ya combinaste este archivo o uno más nuevo de " + p.profe + ".";
    ui.imp = { profe: p.profe, at: p.at, data: p.data, nuevos: m.nuevos, ambos: m.ambos, warn }; ui.syncMsg = "";
    renderPanel();
  };
  r.readAsText(file);
}
const stepKey = p => "p:" + p.sid + ":" + p.id;

const ACTIONS = {
  go: id => go(id),
  sub: id => { ui.sub = id; ui.imp = null; ui.syncMsg = ""; renderPanel(); window.scrollTo(0, 0); },
  goSync: () => { ui.ask = false; ui.tab = "mas"; ui.sub = "sync"; renderPanel(); window.scrollTo(0, 0); },
  askNo: () => { ST.askNo = todayISO(); ui.ask = false; persist(); renderAsk(); },
  goDay: id => { const g = groups().find(x => isScheduled(x, id)); if (g) ui.cg = g.id; ui.cdate = id; ui.month = id.slice(0, 7); go("calendario"); },
  pasarLista: (id, el) => { ui.cg = id; ui.cdate = el.dataset.d; ui.month = el.dataset.d.slice(0, 7); go("calendario"); },
  verPlan: (id, el) => { const d = el.dataset.d, p = plans().find(c => c.gid === id && c.date === d); ui.draft = p ? JSON.parse(JSON.stringify(p)) : newDraft(id, d); ui.cerr = ""; go("clases"); },
  setProfe: () => { const n = val("pname"); if (!n) { $("#perr").textContent = "Escribí tu nombre."; return; } ST.profe = n.slice(0, 40); persist(); renderAll(); },
  saveProfe: () => { const n = val("pname2"); if (!n) { $("#perr").textContent = "Escribí tu nombre."; return; } ST.profe = n.slice(0, 40); persist(); renderAll(); $("#perr") && ($("#perr").textContent = "Guardado"); },
  /* clases */
  addBlock: () => { ui.draft.blocks.push({ n: "", m: 10, t: "" }); renderPanel(); },
  delBlock: id => { ui.draft.blocks.splice(+id, 1); renderPanel(); },
  loadTpl: () => { ui.draft.blocks = TEMPLATES[ui.draft.level].map(b => ({ ...b })); renderPanel(); },
  savePlan: () => { const d = ui.draft; if (!d.title.trim()) { ui.cerr = "Poné un título."; renderPanel(); return; } if (!d.id) d.id = uid(); put("c:" + d.id, { id: d.id, title: d.title.trim(), gid: d.gid, date: d.date, level: d.level, blocks: d.blocks.map(b => ({ n: String(b.n || ""), m: +b.m || 0, t: String(b.t || "") })) }); ui.cerr = "Guardada."; renderPanel(); },
  newPlan: () => { ui.draft = newDraft(ui.draft.gid); ui.cerr = ""; renderPanel(); },
  copyPlan: () => copyText(classText(ui.draft), $("#cmsg")),
  openPlan: id => { const p = get("c:" + id); if (p) { ui.draft = JSON.parse(JSON.stringify(p)); ui.cerr = ""; renderPanel(); window.scrollTo(0, 0); } },
  delPlan: id => { if (confirmed("delPlan" + id)) { del("c:" + id); if (ui.draft && ui.draft.id === id) ui.draft = null; renderPanel(); } },
  /* calendario */
  cgroup: id => { ui.cg = id; renderPanel(); },
  month: id => { ui.month = monthShift(ui.month, +id); renderPanel(); },
  pickDay: id => { ui.cdate = id; renderPanel(); },
  att: id => { toggle(attKey(ui.cg, ui.cdate, id)); armAsk(); renderPanel(); },
  attAll: () => { students(ui.cg).forEach(s => put(attKey(ui.cg, ui.cdate, s.id), 1)); armAsk(); renderPanel(); },
  attNone: () => { students(ui.cg).forEach(s => { if (has(attKey(ui.cg, ui.cdate, s.id))) del(attKey(ui.cg, ui.cdate, s.id)); }); renderPanel(); },
  logItem: id => { const k = "l:" + ui.cg + ":" + ui.cdate + ":" + id; if (id === "x:sin") { logCodes(ui.cg, ui.cdate).forEach(c => { if (c !== "x:sin") del("l:" + ui.cg + ":" + ui.cdate + ":" + c); }); } else if (has("l:" + ui.cg + ":" + ui.cdate + ":x:sin")) del("l:" + ui.cg + ":" + ui.cdate + ":x:sin"); toggle(k); armAsk(); renderPanel(); },
  addFree: () => { const t = val("free").replace(/\s+/g, " "); if (!t || /^(co:|x:)/.test(t)) return; put("l:" + ui.cg + ":" + ui.cdate + ":" + t.slice(0, 80), 1); armAsk(); renderPanel(); },
  saveNota: () => { const t = val("nota"); if (t) put(notaKey(ui.cg, ui.cdate), t.slice(0, 1000)); else if (get(notaKey(ui.cg, ui.cdate)) !== null) del(notaKey(ui.cg, ui.cdate)); armAsk(); renderPanel(); },
  /* coreos */
  coGroup: id => { ui.coGroup = id; renderPanel(); },
  openStu: id => { ui.sid = id; ui.editStep = null; renderPanel(); window.scrollTo(0, 0); },
  closeStu: () => { ui.sid = null; ui.editStep = null; renderPanel(); },
  tick: id => { toggle("k:" + ui.sid + ":" + id); renderPanel(); },
  addStep: () => {
    const txt = val("sp_txt"); if (!txt) { $("#sperr").textContent = "Escribí qué pasa en el paso."; return; }
    const steps = stepsOf(ui.sid), id = uid(), o = steps.reduce((m, p) => Math.max(m, p.o || 0), 0) + 1;
    put("p:" + ui.sid + ":" + id, { id, sid: ui.sid, tipo: val("sp_tipo") === "art" ? "art" : "tec", txt: txt.slice(0, 140), t: val("sp_t").slice(0, 8), ref: val("sp_ref"), o }); renderPanel();
  },
  editStep: id => { ui.editStep = id; renderPanel(); },
  cancelStep: () => { ui.editStep = null; renderPanel(); },
  saveStep: id => { const p = get("p:" + ui.sid + ":" + id); if (!p) return; const txt = val("se_txt"); if (!txt) return; put(stepKey(p), { ...p, tipo: val("se_tipo") === "art" ? "art" : "tec", txt: txt.slice(0, 140), t: val("se_t").slice(0, 8), ref: val("se_ref") }); ui.editStep = null; renderPanel(); },
  delStep: id => { if (confirmed("delStep" + id)) { del("p:" + ui.sid + ":" + id); renderPanel(); } },
  stepUp: id => moveStep(id, -1), stepDown: id => moveStep(id, 1),
  saveSong: () => { const el = $("#songin"), r = parseSong(el ? el.value : ""); if (!r.url || !okUrl(r.url)) { $("#sgerr").textContent = "Pegá un link que empiece con https://"; return; } const s = student(ui.sid); putStu({ ...s, songUrl: r.url, songName: r.name.slice(0, 80) }); renderPanel(); },
  delSong: () => { const s = student(ui.sid), n = { ...s }; delete n.songUrl; delete n.songName; putStu(n); renderPanel(); },
  /* alumnas */
  agroup: id => { ui.ag = id; renderPanel(); },
  newGroup: () => { ui.tab = "alumnas"; ui.editG = "new"; renderPanel(); window.scrollTo(0, 0); },
  editGroup: id => { ui.editG = id; renderPanel(); },
  cancelGroup: () => { ui.editG = null; renderPanel(); },
  saveGroup: id => {
    const name = val("gname"); if (!name) { $("#gerr").textContent = "Poné un nombre."; return; }
    const dias = [...document.querySelectorAll(".gday:checked")].map(x => +x.value), old = id ? group(id) : null, gid = id || uid();
    put("g:" + gid, { id: gid, name: name.slice(0, 60), level: val("glevel"), hora: val("ghora"), dias, profe: old ? old.profe : ST.profe });
    ui.editG = null; ui.ag = gid; renderAll();
  },
  delGroup: id => { if (confirmed("delGroup" + id)) { students(id).forEach(s => del("s:" + s.id)); del("g:" + id); ui.ag = null; renderPanel(); } },
  addStu: () => { const n = val("newstu"); if (!n) { $("#sterr").textContent = "Escribí el nombre."; return; } const id = uid(); putStu({ id, gid: ui.ag, name: n.slice(0, 60) }); renderPanel(); const e = $("#newstu"); if (e) e.focus(); },
  openFicha: id => { ui.ficha = id; renderPanel(); window.scrollTo(0, 0); },
  closeFicha: () => { ui.ficha = null; renderPanel(); },
  saveFicha: id => { const s = student(id), n = val("fname"); if (!s || !n) { $("#ferr").textContent = "Poné un nombre."; return; } putStu({ ...s, name: n.slice(0, 60), gid: val("fgid") || s.gid }); ui.ficha = null; renderPanel(); },
  cuota: id => { toggle(id); renderPanel(); },
  delStu: id => { if (confirmed("delStu" + id)) { live("a:").filter(k => k.endsWith(":" + id)).forEach(del); del("s:" + id); ui.ficha = null; renderPanel(); } },
  /* más */
  rcopa: id => { ui.rcopa = id; ui.reff = EFF.find(e => e.c === id).id; renderPanel(); },
  reff: id => { ui.reff = id; renderPanel(); },
  copyMsg: (id) => { const t = document.getElementById(id); if (t) copyText(t.value, document.getElementById("cm-" + id)); },
  share: () => doShare("drive"),
  shareWa: () => doShare("wa"),
  download: () => doShare("file"),
  copyWaMsg: () => copyText(waText(), $("#smsg2")),
  applyMerge: () => {
    const imp = ui.imp; if (!imp) return;
    const m = mergeData(ST.D, imp.data, ST.base);
    ST.D = m.out; ST.base = JSON.parse(JSON.stringify(m.out)); ST.merged[imp.profe] = imp.at;
    Object.keys(ST.D).forEach(k => { if (ST.D[k].t > lastT) lastT = ST.D[k].t; });
    ui.imp = null; ui.syncMsg = "Listo, se combinó. Ahora hacé el paso 2 para guardar lo combinado en la carpeta."; persist(); renderAll();
  },
  cancelMerge: () => { ui.imp = null; renderPanel(); },
  delAll: () => { if (confirmed("delAllall")) { ST.D = {}; ST.base = {}; ST.lastShared = 0; ui.sid = ui.ficha = ui.cg = ui.ag = ui.coGroup = null; ui.draft = null; persist(); renderAll(); } }
};
function moveStep(id, dir) {
  const steps = stepsOf(ui.sid);
  steps.forEach((p, i) => { if (p.o !== i + 1) { p.o = i + 1; put(stepKey(p), { ...p, o: i + 1 }); } });
  const i = steps.findIndex(p => p.id === id), j = i + dir;
  if (i < 0 || j < 0 || j >= steps.length) return;
  const a = steps[i], b = steps[j];
  put(stepKey(a), { ...a, o: b.o }); put(stepKey(b), { ...b, o: a.o });
  renderPanel();
}

document.addEventListener("click", ev => {
  const t = ev.target.closest("[data-a]"); if (!t) return;
  const a = t.dataset.a; if (!/^del/.test(a)) ui.confirm = null;
  const fn = ACTIONS[a]; if (fn) fn(t.dataset.id, t);
});
document.addEventListener("keydown", ev => { if ((ev.key === "Enter" || ev.key === " ") && ev.target.matches && ev.target.matches('[role="checkbox"][data-a]')) { ev.preventDefault(); ev.target.click(); } });
document.addEventListener("input", ev => {
  const t = ev.target;
  if (t.dataset.d && ui.draft) { ui.draft[t.dataset.d] = t.value; }
  else if (t.dataset.b !== undefined && ui.draft) { const b = ui.draft.blocks[+t.dataset.b]; if (b) b[t.dataset.f] = t.dataset.f === "m" ? +t.value || 0 : t.value; }
});
document.addEventListener("change", ev => {
  const t = ev.target;
  if (t.dataset.d && ui.draft) {
    ui.draft[t.dataset.d] = t.value;
    if (t.dataset.d === "gid" && t.value && group(t.value)) { ui.draft.level = group(t.value).level; if (!ui.draft.id && !ui.draft.title.trim()) ui.draft.title = "Clase de " + group(t.value).name; }
    if (t.dataset.r) renderPanel();
  } else if (t.dataset.c && ui.sid) {
    const s = student(ui.sid); if (!s) return;
    if (t.dataset.c === "eff") { const n = { ...s }; if (t.value) n.eff = t.value; else delete n.eff; putStu(n); renderPanel(); }
    if (t.dataset.c === "dur") { putStu({ ...s, dur: t.value.trim().slice(0, 8) }); renderPanel(); }
  } else if (t.id === "impin") { readImport(t.files && t.files[0]); }
});

/* ===== Inicio ===== */
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") { clearTimeout(saveTimer); persist(); } });
(function boot() {
  if (location.hash === "#importar") { ui.tab = "mas"; ui.sub = "sync"; }
  renderAll();
  setStatus("Guardado en este celular");
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
})();

