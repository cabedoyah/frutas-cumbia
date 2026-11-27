/* =========================================================
   CONVERSACIONES (botón “💬 Hablar”)
   Cada tema: t = lo que dice el personaje
              o = opciones: [lo que respondes, lo que te contesta, (opcional) siguiente ronda {t,o}]
   _all = temas comunes que puede sacar cualquier colega
   ========================================================= */
const TALKS={
 samuel:[
  {t:"Estoy haciendo una playlist para el laboratorio. ¿Qué le pongo?",o:[
    ["Cumbia, obviamente","¡Eso! La centrífuga gira mejor con cumbia. Está demostrado. Bueno, lo demostré yo."],
    ["Silencio, por favor","¿Silencio? ¿Eso es un género nuevo? Suena aburrido. Le pongo cumbia igual."],
    ["Cantos de ballena","Relajante. Hasta que el Dr. Revisor crea que es su móvil y conteste."]]},
  {t:"Mi código funcionó a la primera. Tengo miedo.",o:[
    ["¡Felicidades!","Gracias… pero cuando algo funciona a la primera, es que viene algo peor.",{t:"¿Tú qué harías en mi lugar?",o:[
      ["Hacer copia de seguridad","Sabio. Ya hice tres. Una está en un USB que no encuentro."],
      ["No tocar nada nunca más","Exacto. El código es mío, pero ya no lo entiendo. Como debe ser."]]}],
    ["Seguro hay un error escondido","Gracias por la paranoia. Ahora no voy a dormir."],
    ["¿Le pusiste música?","Obvio. Por eso funcionó. El ritmo compila."]]}],
 mateo:[
  {t:"Traje arepas. Quedan dos. Una es mía y la otra… también, pero te escucho.",o:[
    ["¿Me das media?","Media… vale. Pero la media pequeña. Y me debes un favor de por vida."],
    ["Tranquilo, ya comí","Mejor. Porque ya me la estaba comiendo mientras preguntaba."],
    ["¿Es la del yogur robado?","¡SHHH! No hay pruebas. Nadie vio nada. Esa arepa es inocente."]]},
  {t:"Voy a dormir una siesta en el sofá azul. ¿Me cubres?",o:[
    ["Claro, yo vigilo","Eres un ángel. Si viene un profe, dile que estoy “meditando sobre los resultados”.",{t:"¿Y si pregunta qué resultados?",o:[
      ["Le digo que son confidenciales","Perfecto. Confidenciales hasta para mí."],
      ["Le enseño una gráfica cualquiera","Mejor la de mis arepas por semana. Esa sí tiene tendencia."]]}],
    ["Solo si me dejas el otro lado","Trato. Pero si roncas, te despierto con una empanada."],
    ["Te grabo y lo subo al grupo","Ni se te ocurra. Tengo fotos tuyas de la cena de Navidad."]]}],
 julian:[
  {t:"Desde aquí arriba veo tu pantalla. Tienes una errata en el título.",o:[
    ["¡Gracias por avisar!","De nada. También veo tres en el resumen, pero no quería abrumarte."],
    ["¿Me estás espiando?","No espío. Simplemente existo a 1,90 m. Es distinto."],
    ["Es a propósito, es arte","Arte moderno, entonces. El tribunal no va a pagar entrada."]]},
  {t:"Me volví a pegar con la lámpara del laboratorio. Cuarta vez esta semana.",o:[
    ["¿Te duele?","Solo el orgullo. Y la frente. Y un poco el alma.",{t:"¿Crees que debería quejarme?",o:[
      ["Sí, que suban la lámpara","Ya lo pedí. Me dijeron que mejor me agache. Me agacho desde 2019."],
      ["No, ya es tu amiga","Tienes razón. La llamo Lámpara. Es la que más me escucha."]]}],
    ["Deberían poner un aviso","Hay uno. Lo puse yo. A la altura de mis ojos. Nadie más lo ve."],
    ["La lámpara te tiene envidia","Normal. Yo ilumino más con mis comentarios."]]}],
 lucia:[
  {t:"¿Tú también sientes que el café de hoy sabe a desesperación?",o:[
    ["Sabe a esperanza","Ay, qué bonito. Te doy dos semanas de beca antes de que pienses como yo."],
    ["Sabe a agua con culpa","¡Exacto! Agua con culpa. Lo voy a poner en mi tesis."],
    ["Yo solo tomo agua","Ya veo por qué te ves tan descansado. Sospechoso."]]},
  {t:"Mi plan de vida: publicar, dormir, repetir. ¿Y el tuyo?",o:[
    ["Igual, pero con más café","Me gusta. Somos un equipo. Un equipo cansado."],
    ["Sobrevivir al Dr. Revisor","Ambicioso. Me gusta la gente con metas realistas.",{t:"¿Ya le enviaste algo?",o:[
      ["Todavía no","Bien. Si no le envías nada, no te puede rechazar. Estrategia."],
      ["Sí, y me devolvió 74 comentarios","Solo 74. Te quiere. A mí me mandó 120 y un dibujo de una calavera."]]}],
    ["Abrir una frutería","¿Con Fernando? Él ya sabe qué fruta es cada cliente."]]}],
 valeria:[
  {t:"Revisé tu póster. Solo cambié unas cositas.",o:[
    ["¡Gracias, eres lo máximo!","Lo sé. Cambié el título, las figuras, los colores… y tu nombre estaba mal escrito."],
    ["¿Unas cositas? Ya no es mi póster","Ahora es mejor. Es nuestro póster. Bueno, mío."],
    ["Me gustaba con faltas","A mí también me gustan las cucarachas, y no por eso las dejo en la nevera."]]},
  {t:"¿Usas Excel para todo, como la gente decente?",o:[
    ["Hasta para la lista del mercado","Así me gusta. ¿Con tablas dinámicas? Dime que sí.",{t:"¿Con tablas dinámicas o no?",o:[
      ["Obvio, y con gráficas","Te acabas de ganar mi respeto eterno."],
      ["¿Qué es una tabla dinámica?","…Ven. Siéntate. Esto va a tomar toda la tarde."]]}],
    ["Uso papel y lápiz","¿Y las copias de seguridad? ¿Fotocopias? Me estás dando ansiedad."],
    ["Uso Python, soy moderno","Muy bien, moderno. Ahora pásamelo en Excel."]]}],
 sofia:[
  {t:"La centrífuga hizo un ruido raro otra vez. Creo que me odia.",o:[
    ["Seguro está desequilibrada","Como todos aquí. Pero ella al menos gira bien."],
    ["Háblale bonito","Ya lo intenté. Le canté. Ahora hace un ruido más raro."],
    ["Dale un golpecito","¡NO! Eso va contra el protocolo. …Pero sí, a veces funciona."]]},
  {t:"Todos piensan que soy pequeña y tranquila. Error.",o:[
    ["Yo sé que eres peligrosa","Bien. Que corra la voz. Y que nadie toque mi bata."],
    ["Pequeña pero matona","Exacto. Muerdo papers. Y tobillos, si hace falta.",{t:"¿Tú me tienes miedo?",o:[
      ["Un poquito","Perfecto. Ese es el nivel correcto de miedo."],
      ["Para nada","Error de cálculo. Te espero en la batalla amistosa."]]}],
    ["¿Te alcanzo algo del estante?","No, gracias. Tengo una escalera, una silla y mucha determinación."]]}],
 diego:[
  {t:"Tengo 47 pestañas abiertas. Si cierro una, colapsa el universo.",o:[
    ["Cierra solo una, valiente","Cerré una y se abrió otra sola. Creo que el navegador está vivo."],
    ["Yo tengo 112","Respeto. Ahora eres mi superior jerárquico."],
    ["Dame el portátil, yo lo arreglo","¡No! Ahí está todo mi doctorado. En pestañas. Sin guardar."]]},
  {t:"Hice el análisis estadístico. p = 0,051.",o:[
    ["¡Ay no, casi!","Casi. Mi vida en una palabra.",{t:"¿Qué hago ahora?",o:[
      ["Repetir el experimento","Sí… con más muestras. Y más café. Y más pánico."],
      ["Decir “marginalmente significativo”","Peligroso. Pero me gusta. Lo escribo en letra pequeña."]]}],
    ["Redondea, nadie se da cuenta","El Dr. Revisor se da cuenta. Huele los redondeos desde su despacho."],
    ["¿Eso se come?","Ojalá. Llevo dos días comiendo solo café y desesperanza."]]}],
 tomas:[
  {t:"Mis rizos dicen que va a llover. Nunca fallan.",o:[
    ["¡Qué útil!","Lo sé. Deberían ponerme en el telediario. El hombre higrómetro."],
    ["El pronóstico dice sol","El pronóstico no tiene rizos. Trae paraguas."],
    ["¿Y qué dicen de mi tesis?","Que también se viene tormenta. Lo siento."]]},
  {t:"Repetí el experimento 14 veces. Salieron 14 resultados distintos.",o:[
    ["Eso es ciencia","Eso es caos. Pero con bata, que se ve más profesional."],
    ["Haz el 15, ese es el bueno","¿Tú crees? Si sale bien, lo llamo “el tuyo”.",{t:"¿Y si sale mal?",o:[
      ["Culpamos a la humedad","Perfecto. Mis rizos lo confirman."],
      ["Lo llamamos “resultado inesperado”","Y lo publicamos. Así nace la ciencia moderna."]]}],
    ["Saca el promedio y listo","El promedio de 14 desastres es… un desastre promedio."]]}],
 fernando:[
  {t:"¿Sabes qué fruta serías? Yo sí lo sé. Pero no te lo voy a decir.",o:[
    ["¡Dímelo, por favor!","No. Tienes que jugar a Frutas Cumbia. En esta vida hay que ganarse las cosas."],
    ["Seguro soy una fresa","¿Una fresa? Ja. Eso querrías tú.",{t:"¿Quieres una pista?",o:[
      ["Sí","Pista: tiene pepas. …Casi todas tienen pepas. Sigue participando."],
      ["No, prefiero sufrir","Así me gusta. Sufrir es parte del doctorado."]]}],
    ["No me interesa","Mentira. Todos quieren saber. Hasta el Dr. Revisor jugó. Le salió durián."]]},
  {t:"El café de abajo es 70% agua y 30% fe. ¿Tú con cuál te quedas?",o:[
    ["Con el 30% de fe","Buena elección. La fe es lo único que nos queda antes del seminario."],
    ["Con el agua, soy sano","Sano en un doctorado. Qué ternura. Ya se te quitará."],
    ["Prefiero cerveza","Eso es los viernes. Hoy es… bueno, en espíritu es viernes."]]},
  {t:"Te veo con cara de tesis. ¿Cómo vas?",o:[
    ["Bien, avanzando","Qué bien. Eso decía yo… hace tres años."],
    ["Mal, pero con estilo","Esa es la actitud. El estilo no se reprueba.",{t:"¿Quieres un consejo de Fernando?",o:[
      ["Sí, por favor","Nunca abras el correo un viernes a las 18:00. Nunca."],
      ["No, gracias","Bien. Mis consejos cuestan un café. Acabas de ahorrar."]]}],
    ["¿Qué tesis?","Exacto. Si no la miras, no existe. Teoría de Fernando."]]}],
 paula:[
  {t:"Desde aquí abajo veo cosas que ustedes no. Por ejemplo: debajo de la mesa hay una galleta de 2021.",o:[
    ["¿Sigue ahí?","Sigue ahí. Ya es parte del edificio. Tiene nombre.",{t:"¿Adivinas cómo se llama?",o:[
      ["¿Galletita?","Casi. Se llama Doctora Galleta. Tiene más antigüedad que todos."],
      ["Prefiero no saberlo","Sabia decisión. Ella prefiere el anonimato."]]}],
    ["Qué asco","Asco es lo que hay debajo de la nevera. Esa expedición no la hago."],
    ["Eres el radar del grupo","Lo sé. Nada se me escapa. Ni las migas ni los chismes."]]},
  {t:"Ayer me escondí tres horas en el armario de reactivos y nadie lo notó.",o:[
    ["¿Estás bien?","Sí, solo necesitaba silencio. Y había wifi. Mejor que la biblioteca."],
    ["¿Por qué hiciste eso?","Huía de una reunión. Funcionó. Te recomiendo el armario 3."],
    ["Yo te estuve buscando","Mentira. Pero gracias por fingir. Te doy media galleta. No la del suelo."]]}],
 nico:[
  {t:"Esta camiseta azul me da suerte. Hoy tengo reunión con un profe.",o:[
    ["Seguro sale bien","Gracias. Si sale mal, es culpa de la lavadora: la lavé ayer."],
    ["¿Nunca la lavas?","La lavo. Con cuidado. A mano. Con respeto. Y poco."],
    ["Préstamela para mi defensa","Imposible. Su poder solo funciona conmigo. Lo dice el manual (que escribí yo)."]]},
  {t:"Tengo un plan perfecto para terminar la tesis en un mes.",o:[
    ["¡Cuéntame!","Paso 1: dejar de dormir. Paso 2… todavía voy por el paso 1.",{t:"¿Te apuntas al plan?",o:[
      ["Me apunto","Bienvenido al club. Primera regla: nadie duerme."],
      ["Prefiero dormir","Cobarde. Pero descansado. Te envidio."]]}],
    ["Eso dijiste el mes pasado","Y el anterior. Pero este mes tengo la camiseta azul."],
    ["Ese plan es una trampa","Todos los planes son trampas. Por eso tengo varios."]]}],
 alex:[
  {t:"¿Necesitas algo del estante de arriba? Cobro en galletas.",o:[
    ["Sí, la caja de pipetas","Hecho. Son dos galletas: una por subir el brazo y otra por bajarlo."],
    ["No, uso escalera","La escalera no te da conversación. Yo sí."],
    ["¿Aceptas empanadas?","Acepto empanadas, cafés y halagos. En ese orden."]]},
  {t:"Hoy cambié tres bombillas. Sin escalera. Soy útil.",o:[
    ["Eres un héroe","Lo sé. Deberían darme un sello como los de los profes.",{t:"¿Qué sello me pondrías?",o:[
      ["El Sello de la Luz","Me encanta. Lo pondré en mi bata. Brillará."],
      ["El Sello del Cuello Largo","…Acepto. Pero solo porque es verdad."]]}],
    ["¿Y las del Aula Magna?","Esas no. Hasta yo tengo límites. Y vértigo."],
    ["Deberías cobrar por eso","Ya cobro. En galletas. Es una economía sólida."]]}],
 marta:[
  {t:"Reservé el equipo para las 7 de la mañana. Lo voy a usar a las 11.",o:[
    ["¿Por qué tan temprano?","Para que nadie más lo use. Es estrategia, no madrugar."],
    ["Eso es trampa","Se llama planificación. Trampa es lo de la camiseta azul de la suerte."],
    ["Yo lo reservo a las 6","Ajá. Y lo usarás a las 12. Te conozco.",{t:"¿Hacemos un trato?",o:[
      ["Lo compartimos","Trato. Tú las mañanas, yo… también las mañanas."],
      ["Que gane quien madrugue más","Acepto. Mi plan B es ponerte una alarma en el móvil a las 4."]]}]]},
  {t:"Siempre tengo un plan B. ¿Quieres saber cuál es para la defensa?",o:[
    ["¡Sí!","Plan B: si me preguntan algo difícil, digo “excelente pregunta” y miro por la ventana."],
    ["¿Y el plan A?","El plan A es estudiar. Por eso existe el plan B."],
    ["Yo tengo plan Z","¿Plan Z? Eso es nivel experto. ¿Incluye huir al Amazonas?"]]}],
 tinto:[
  {t:"¿Lo de siempre?",o:[
    ["Sí, un café, por favor","Café. Fuerte, como su voluntad. Débil, como su tesis."],
    ["¿Qué es lo de siempre?","No sé. Siempre pregunto eso. Así parece que me acuerdo."],
    ["Sorpréndame","Café con sal. No, mentira. O sí. Nunca lo sabrá."]]},
  {t:"Aquí he visto pasar muchos becarios. Todos llegan con ilusión.",o:[
    ["¿Y cómo se van?","Con ojeras y título. Pero contentos. Bueno, con título.",{t:"¿Y usted cómo cree que se irá?",o:[
      ["Con título y sin ojeras","Ja. Eso espero. Le guardo una empanada para celebrarlo."],
      ["No me voy, me quedo a vivir","Ya hay dos que lo intentaron. Duermen en el Aula Magna."]]}],
    ["Qué bonito","No se emocione. Ahora le cobro el café."],
    ["Cuénteme chismes","Yo no cuento nada. Pero la Dra. Deadline toma el café sin azúcar. Saque conclusiones."]]}],
 _all:[
  {t:"¿Has visto a la Dra. Deadline hoy? Dicen que adelantó otro plazo.",o:[
    ["Yo ya entregué","¿Entregaste? ¿A tiempo? ¿Quién eres y qué hiciste con mi colega?"],
    ["Me escondo en el armario","El armario 3 está ocupado. Prueba el 4, tiene mejor wifi."],
    ["Los plazos son una construcción social","Díselo a ella. Te espero en la puerta con una empanada de consuelo."]]},
  {t:"Este viernes hay cervezas en la cafetería. ¿Vienes?",o:[
    ["¡Claro!","¡Así me gusta! Yo llevo el tema de conversación: quejarnos de los experimentos."],
    ["Tengo que trabajar","Nadie trabaja los viernes después de las 5. Es ley. No escrita, pero ley."],
    ["Solo si invitas tú","Invito la primera… de agua. Las demás, que las pague Fernando."]]},
  {t:"Estoy escribiendo la introducción de la tesis. Llevo tres semanas en la primera frase.",o:[
    ["¿Cuál es la frase?","“Desde tiempos inmemoriales…”. Y ahí me quedé. Inmemorialmente.",{t:"¿Me ayudas a seguirla?",o:[
      ["“…la humanidad ha tomado café”","¡Perfecto! Es verdad, es universal y me representa."],
      ["“…nadie ha leído esta tesis”","Demasiado honesto para la introducción. Me lo guardo para las conclusiones."]]}],
    ["Escribe algo y luego corriges","Eso dice todo el mundo. Luego llega el Dr. Revisor con el bolígrafo rojo."],
    ["Empieza por las conclusiones","Las conclusiones ya las tengo: “hacen falta más estudios”. Sirve para todo."]]},
  {t:"¿Te has fijado que el microondas siempre tiene cola a la una?",o:[
    ["Yo voy a las 12:45, estratégico","Genio. Pero ahora lo sabe todo el mundo. Gracias por arruinarlo."],
    ["Yo como frío","Respeto. Eres de otra especie. Más evolucionada y más triste."],
    ["Hagamos un horario en Excel","Ya existe. Lo hizo la de las gafas rojas. Nadie lo respeta."]]},
 ],
};
