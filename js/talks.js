/* =========================================================
   CONVERSACIONES (botón “💬 Hablar”) — cada personaje tiene las suyas, sin temas repetidos
   Cada tema: t = lo que dice el personaje
              o = opciones: [lo que respondes, lo que te contesta, (opcional) siguiente ronda {t,o}]
   ========================================================= */
const TALKS={
 // ---------------- JORGE ----------------
 samuel:[
  {t:"Estoy haciendo una playlist para el laboratorio. ¿Qué le pongo?",o:[
    ["Cumbia, obviamente","¡Eso! La centrífuga gira mejor con cumbia. Está demostrado. Bueno, lo demostré yo, con n = 1."],
    ["Silencio, por favor","¿Silencio? Eso suena a velorio. Ya tenemos suficientes con los experimentos."],
    ["Cantos de ballena","Relajante. Hasta que el Dr. Revisor crea que es su móvil y conteste."]]},
  {t:"Mi código funcionó a la primera. Tengo miedo.",o:[
    ["¡Felicidades!","Gracias… pero cuando algo funciona a la primera, es que viene algo peor.",{t:"¿Tú qué harías en mi lugar?",o:[
      ["Hacer copia de seguridad","Sabio. Ya hice tres. Una está en un USB que no encuentro desde 2022."],
      ["No tocar nada nunca más","Exacto. El código es mío, pero ya no lo entiendo. Como debe ser."]]}],
    ["Seguro hay un error escondido","Gracias por la paranoia. Ahora no voy a dormir. Otra vez."],
    ["¿Le pusiste música?","Obvio. Por eso funcionó. El ritmo compila."]]},
  {t:"Me rapé la cabeza. Ahorro 40 minutos al día. Los uso para llorar por la tesis.",o:[
    ["Te queda muy bien","Gracias. Además el brillo sirve de reflector para el microscopio."],
    ["¿40 minutos? Es mucho llanto","Es un llanto productivo. Lo tengo agendado de 9:00 a 9:40."],
    ["¿Y si lloras con peluca?","Lo probé. Se me cayó en una muestra. Ahora la muestra tiene más pelo que yo."]]},
  {t:"Mi experimento murió anoche. Hoy le hacemos el funeral a las 4. Habrá cumbia.",o:[
    ["Voy, llevo flores","Mejor lleva café. Las flores contaminan las muestras que siguen vivas.",{t:"¿Quieres decir unas palabras en el funeral?",o:[
      ["“Murió como vivió: sin resultados”","Precioso. Lo voy a grabar en la placa de Petri."],
      ["“Ojalá el próximo dure más”","Eso dijimos del anterior. Y del anterior del anterior."]]}],
    ["¿De qué murió?","Causas naturales: lo dejé fuera de la nevera el fin de semana."],
    ["Pon reguetón triste","No. Respeto. Solo cumbia. Que se vaya bailando."]]},
  {t:"Hoy almorcé dos veces. La beca no da para tres.",o:[
    ["Te invito al tercero","Eres de las pocas personas buenas que quedan aquí. Sospechoso, pero lo acepto."],
    ["La beca no da ni para uno","Por eso voy a todos los seminarios con catering. Ayer fui a uno de astrofísica. No entendí nada, pero había croquetas."],
    ["Cómete un paper, tiene fibra","Ya me comí el borrador del artículo. Estaba más seco que los comentarios del revisor."]]},
  {t:"Si un día desaparezco, el código está en una carpeta llamada “final_final_ahora_si_v7”.",o:[
    ["¿Hay copia?","Sí: “final_final_ahora_si_v7 (copia)”. Soy un profesional."],
    ["¿A dónde piensas desaparecer?","A un pueblo sin wifi. Voy a criar gallinas. Las gallinas no piden resultados.",{t:"¿Me llevas?",o:[
      ["Sí, yo cuido las gallinas","Trato. Pero si una gallina me pide un informe, me voy otra vez."],
      ["No, me quedo a sufrir aquí","Respeto tu decisión. Te mandaré huevos por correo. Con acuse de recibo."]]}],
    ["Nadie va a abrir esa carpeta","Lo sé. Por eso la llamé así. Seguridad por desesperación."]]}],

 // ---------------- CACHOPO FLAVOR ----------------
 mateo:[
  {t:"Traje arepas. Quedan dos. Una es mía y la otra… también, pero te escucho.",o:[
    ["¿Me das media?","Media… vale. Pero la media pequeña. Y me debes un favor de por vida."],
    ["Tranquilo, ya comí","Mejor. Porque ya me la estaba comiendo mientras preguntaba."],
    ["¿Es la del yogur robado?","¡SHHH! No hay pruebas. Nadie vio nada. Esa arepa es inocente."]]},
  {t:"Voy a dormir una siesta en el sofá azul. ¿Me cubres?",o:[
    ["Claro, yo vigilo","Eres un ángel. Si viene un profe, dile que estoy “meditando sobre los resultados”.",{t:"¿Y si pregunta qué resultados?",o:[
      ["Le digo que son confidenciales","Perfecto. Confidenciales hasta para mí."],
      ["Le enseño una gráfica cualquiera","Mejor la de mis arepas por semana. Esa sí tiene tendencia."]]}],
    ["Solo si me dejas el otro lado","Trato. Pero si roncas, te despierto con una empanada en la cara."],
    ["Te grabo y lo subo al grupo","Ni se te ocurra. Tengo fotos tuyas de la cena de Navidad. Y sé usarlas."]]},
  {t:"Me dicen Cachopo Flavor porque huelo a cachopo. Es un perfume que no se compra: se fríe.",o:[
    ["Hueles bien","Gracias. Es mi forma de dar amor. Y de que nadie se siente a mi lado en los exámenes."],
    ["Me estás dando hambre","A mí también. Me doy hambre a mí mismo. Es un ciclo hermoso y trágico."],
    ["Eso no es muy higiénico","La higiene es una construcción social. El cachopo es real."]]},
  {t:"El yogur que me robaron tenía mi nombre. El ladrón lo tachó y puso “anónimo”.",o:[
    ["Qué descaro","Y dejó la cuchara lamida en el fregadero. Un monstruo con modales."],
    ["¿Sospechas de alguien?","De todos. Bueno, de Lechero Mayor no: él solo roba leche. Es un especialista."],
    ["Fui yo","…Lo sabía. Tienes cara de yogur de fresa. Me debes dos.",{t:"¿Aceptas un abrazo de oso como castigo?",o:[
      ["Acepto el abrazo","Perfecto. Ahora no puedes respirar, pero estás perdonado."],
      ["Prefiero pagar","Dos yogures, una arepa y mi dignidad de vuelta. En efectivo."]]}]]},
  {t:"Mi director dice que como demasiado en las reuniones. Es que sus reuniones duran demasiado.",o:[
    ["Es supervivencia","Exacto. Reunión de 3 horas = 3 comidas. Ciencia básica."],
    ["Lleva para todos","Llevé. Me miraron feo y luego se lo comieron. Hipócritas con migas."],
    ["Come antes de entrar","Ya como antes. Y durante. Y después, para olvidar lo que dijeron."]]},
  {t:"Si me muero, que me entierren con una arepa. Por si en el más allá también hay seminarios largos.",o:[
    ["¿Solo una?","Tienes razón. Que sean tres. Y una nevera portátil. Y salsa."],
    ["Qué tétrico","Tétrico es morir con hambre. Eso sí da miedo."],
    ["Yo te llevo la arepa","Gracias. Que esté caliente. No pienso pasar la eternidad con una arepa fría."]]}],

 // ---------------- LECHERO MAYOR ----------------
 julian:[
  {t:"Desde aquí arriba veo tu pantalla. Tienes una errata en el título.",o:[
    ["¡Gracias por avisar!","De nada. También veo tres en el resumen, pero no quería arruinarte el día del todo."],
    ["¿Me estás espiando?","No espío. Simplemente existo a 1,90 m. Es distinto."],
    ["Es a propósito, es arte","Arte moderno, entonces. El tribunal no va a pagar entrada."]]},
  {t:"Me volví a pegar con la lámpara del laboratorio. Cuarta vez esta semana.",o:[
    ["¿Te duele?","Solo el orgullo. Y la frente. Y un poco el alma.",{t:"¿Crees que debería quejarme?",o:[
      ["Sí, que suban la lámpara","Ya lo pedí. Me dijeron que mejor me agache. Me agacho desde 2019."],
      ["No, ya es tu amiga","Tienes razón. La llamo Lámpara. Es la única que me escucha."]]}],
    ["Deberían poner un aviso","Hay uno. Lo puse yo. A la altura de mis ojos. Nadie más lo ve."],
    ["La lámpara te tiene envidia","Normal. Yo ilumino más con mis comentarios pasivo-agresivos."]]},
  {t:"Me dicen Lechero Mayor porque me tomo un litro de leche al día. La leche caduca. Como mis sueños.",o:[
    ["Qué profundo","Gracias. Lo escribí en un cartón de leche. Ahí cabe mi tesis entera."],
    ["¿Entera o desnatada?","Entera. Como mis ganas de terminar la tesis. …Bueno, desnatada."],
    ["Eso explica la altura","Y los huesos fuertes. Mi esqueleto es lo único estable de mi vida."]]},
  {t:"Alguien se tomó mi leche de la nevera. Dejé una nota con mi letra más amenazante.",o:[
    ["¿Qué decía la nota?","“Sé quién eres. Sé lo que hiciste. Y tengo el ADN del vaso.”",{t:"¿De verdad vas a analizar el ADN?",o:[
      ["¿Lo vas a secuenciar?","Ya pedí presupuesto. Cuesta más que mil litros de leche. Pero esto es personal."],
      ["Sospecho de Cachopo Flavor","Yo también. Tenía bigote blanco y cero remordimientos."]]}],
    ["Fui yo, perdón","…Te perdono. Pero me debes un litro. Con intereses lácteos."],
    ["Compra más y ya","No es la leche. Es el principio. …Bueno, también es la leche."]]},
  {t:"Desde aquí arriba veo que tienes una cana nueva.",o:[
    ["¡¿Qué?!","Tranquilo. Es una cana académica. Las de la tesis no cuentan. …Sí cuentan."],
    ["Es por la tesis","Exacto. Cuando termines tendrás el pelo del Dr. Revisor. Y su carácter."],
    ["Tú tienes más","Sí, pero las mías están más arriba. Nadie las ve. Ventajas de la altura."]]},
  {t:"En mi funeral quiero que proyecten mis gráficas. Al menos ahí alguien las mirará.",o:[
    ["Qué oscuro","La oscuridad es la luz de los doctorandos. Y la lámpara que me golpea."],
    ["Yo las miraré antes","¿En serio? Son 87. Trae leche. Y pañuelos."],
    ["Y barra libre de leche","Obvio. Es mi última voluntad. Entera, por favor."]]}],

 // ---------------- MISS ANNOYING ----------------
 lucia:[
  {t:"¿Tú también sientes que el café de hoy sabe a desesperación?",o:[
    ["Sabe a esperanza","Ay, qué bonito. Te doy dos semanas de beca antes de que pienses como yo."],
    ["Sabe a agua con culpa","¡Exacto! Agua con culpa. Lo voy a poner en mi tesis como hallazgo."],
    ["Yo solo tomo agua","Ya veo por qué te ves tan descansado. Eres sospechoso."]]},
  {t:"Mi plan de vida: publicar, dormir, repetir. ¿Y el tuyo?",o:[
    ["Igual, pero con más café","Me gusta. Somos un equipo. Un equipo cansado y con temblores."],
    ["Sobrevivir al Dr. Revisor","Ambicioso. Me gusta la gente con metas realistas.",{t:"¿Ya le enviaste algo?",o:[
      ["Todavía no","Bien. Si no le envías nada, no te puede rechazar. Estrategia de élite."],
      ["Sí, y me devolvió 74 comentarios","Solo 74. Te quiere. A mí me mandó 120 y un dibujo de una calavera."]]}],
    ["Abrir una frutería","¿Con el Dr. Cumbia? Él ya sabe qué fruta es cada cliente."]]},
  {t:"¿Ya terminaste? ¿Ya? ¿Y ahora? ¿Ya?",o:[
    ["No, y si sigues preguntando, menos","Perfecto. Te pregunto en cinco minutos. O en tres. O ahora. ¿Ya?"],
    ["Ya","¡Mentira! Se te nota en la cara. Esa cara es de “voy por la introducción”."],
    ["¿Terminar qué?","Exacto. Esa es la actitud del doctorando sano: negar que existe la tesis."]]},
  {t:"Te mandé 14 mensajes. ¿Por qué no contestas? ¿Estás muerto? ¿Me puedo quedar con tu silla?",o:[
    ["Estaba en el baño","¿40 minutos? Eso no es ir al baño, eso es una estancia de investigación."],
    ["Silencié el grupo","¿SILENCIASTE EL GRUPO? Eso es violencia. Lo voy a reportar… en el grupo."],
    ["Sí, quédate la silla","¡Gracias! Ya la tenía. Solo quería tu permiso emocional.",{t:"¿Y tu taza también?",o:[
      ["La taza no, es sagrada","Entendido. Esperaré a que caduques."],
      ["Llévatela, ya no siento nada","Qué bonito. Así habla la gente en tercer año."]]}]]},
  {t:"Me enteré de un chisme del Dr. Revisor. ¿Lo quieres?",o:[
    ["¡Obvio!","Dicen que una vez aceptó un paper sin comentarios. El autor se desmayó del susto."],
    ["No, no me interesa","Sí te interesa. Dicen que tiene una lista de becarios que le caen mal. Estás en ella. Con asterisco."],
    ["¿Es verdad que no tiene alma?","Sí tiene. Pero la dejó en el formulario 27-B y el Prof. Burocracia no se la devuelve."]]},
  {t:"Estoy organizando una fiesta sorpresa para la entrega de mi tesis. La sorpresa es que no la he empezado.",o:[
    ["Qué valiente","Valiente no. Desesperada con confeti."],
    ["¿Y cuándo es la entrega?","Mañana. Pero tranquilo: ya tengo el título. Y una foto con birrete hecha en Paint."],
    ["Invítame igual","Claro. Trae globos negros. Es una celebración mixta: fiesta y velorio."]]}],

 // ---------------- GLORIA ISABEL ----------------
 valeria:[
  {t:"Revisé tu póster. Solo cambié unas cositas.",o:[
    ["¡Gracias, eres lo máximo!","Lo sé. Cambié el título, las figuras, los colores… y tu nombre estaba mal escrito."],
    ["¿Unas cositas? Ya no es mi póster","Ahora es mejor. Es nuestro póster. Bueno, mío."],
    ["Me gustaba con faltas","A mí también me gustan las cucarachas, y no por eso las dejo en la nevera."]]},
  {t:"¿Usas Excel para todo, como la gente decente?",o:[
    ["Hasta para la lista del mercado","Así me gusta. ¿Con tablas dinámicas? Dime que sí.",{t:"¿Con tablas dinámicas o no?",o:[
      ["Obvio, y con gráficas","Te acabas de ganar mi respeto eterno. Y un sitio en mi testamento."],
      ["¿Qué es una tabla dinámica?","…Ven. Siéntate. Esto va a tomar toda la tarde y parte de tu alma."]]}],
    ["Uso papel y lápiz","¿Y las copias de seguridad? ¿Fotocopias? Me estás dando taquicardia."],
    ["Uso Python, soy moderno","Muy bien, moderno. Ahora pásamelo en Excel."]]},
  {t:"Corregí la carta de la cafetería. Tenía siete faltas. Don Tinto ya no me habla.",o:[
    ["Bien hecho","Gracias. La ortografía es lo único que nos separa del caos. Eso y el café."],
    ["Pobre Don Tinto","Pobre del que escribió “empanadas” con b. Con B, por Dios."],
    ["¿Le cobraste?","Le cobré un café. Me lo sirvió sin azúcar. Fue su venganza."]]},
  {t:"Mis gafas rojas detectan errores. Ahora mismo detecto uno: tu cara de no haber leído mi correo.",o:[
    ["Lo leí, lo juro","¿Ah, sí? ¿Qué decía el punto 4.3.2?",{t:"¿Qué decía el punto 4.3.2?",o:[
      ["Que… todo bien","El punto 4.3.2 decía: “si lees esto, me debes un café”. Me debes un café."],
      ["No había punto 4.3.2","Sí había. Lo añadí después. Para casos como el tuyo."]]}],
    ["No lo leí","Gracias por tu honestidad. Te lo reenvío. En negrita. En rojo. Tres veces."],
    ["¿Las gafas también ven el futuro?","Sí. Veo tu tesis con los márgenes mal. Arréglalos ya."]]},
  {t:"Tengo un Excel para planificar mi vida. La columna D es “días sin llorar”. Está vacía.",o:[
    ["La llenamos juntos","Qué bonito. Pero sería una columna compartida. No sé si mi Excel está preparado emocionalmente."],
    ["Cambia la fórmula","Ya lo hice. Ahora cuenta los días que lloro. Excel se colgó."],
    ["Agrega una columna de cafés","Ya existe. Columna E. Tiene más datos que mi tesis."]]},
  {t:"Si mi tesis tiene una sola errata, me mudo a una isla sin internet.",o:[
    ["Seguro está perfecta","Nada es perfecto. Excepto mi bibliografía. Y mis tablas. Y yo."],
    ["Te encuentro una por un café","Trato. Si no la encuentras, me debes dos. Ya perdiste."],
    ["Yo te acompaño a la isla","Solo si llevas un diccionario. Y Excel sin conexión."]]}],

 // ---------------- ELI ----------------
 sofia:[
  {t:"La centrífuga hizo un ruido raro otra vez. Creo que me odia.",o:[
    ["Seguro está desequilibrada","Como todos aquí. Pero ella al menos gira bien."],
    ["Háblale bonito","Ya lo intenté. Le canté. Ahora hace un ruido más raro y huele a quemado."],
    ["Dale un golpecito","¡NO! Eso va contra el protocolo. …Pero sí, a veces funciona."]]},
  {t:"Todos piensan que soy pequeña y tranquila. Error.",o:[
    ["Yo sé que eres peligrosa","Bien. Que corra la voz. Y que nadie toque mi bata."],
    ["Pequeña pero matona","Exacto. Muerdo papers. Y tobillos, si hace falta.",{t:"¿Tú me tienes miedo?",o:[
      ["Un poquito","Perfecto. Ese es el nivel correcto de miedo."],
      ["Para nada","Error de cálculo. Te espero en la batalla amistosa."]]}],
    ["¿Te alcanzo algo del estante?","No, gracias. Tengo una escalera, una silla y mucho rencor."]]},
  {t:"Hoy alguien me dijo que era “adorable”. Ya no trabaja aquí.",o:[
    ["¿Lo despidieron?","Digamos que se fue a buscar nuevos horizontes. Lejos. Lejísimos. En otro hemisferio."],
    ["Pero sí eres adorable","Lo sé. Es camuflaje. Como las ranas venenosas."],
    ["Recuérdame no decírtelo","Ya te lo estoy recordando. Con la mirada."]]},
  {t:"Tengo una escalera que se llama Venganza. La uso para alcanzar reactivos y metas.",o:[
    ["¿Por qué Venganza?","Porque cada vez que alguien guarda algo en el estante de arriba, la saco. Y apunto su nombre."],
    ["Te ayudo yo","No necesito ayuda. Necesito que dejen de guardar todo arriba, gigantes."],
    ["Ponle un nombre más tierno","Vale: Venganza Pequeñita. ¿Mejor?"]]},
  {t:"Ayer mordí un paper. Literal. Estaba tan mal escrito que me dio hambre de justicia.",o:[
    ["¿Cómo sabía?","A metodología incompleta y a autores sin dormir."],
    ["¿Era tuyo?","Sí. Por eso me dolió más. Pero estaba crujiente.",{t:"¿Lo vas a reescribir?",o:[
      ["Sí, desde cero","Bien. Esta vez lo imprimo en papel de arroz, por si me lo vuelvo a comer."],
      ["Mejor déjalo así","Así se habla. El caos también es una metodología."]]}],
    ["Eso no es higiénico","Lo higiénico es aburrido. Y lo aburrido no publica."]]},
  {t:"Dicen que lo bueno viene en frasco pequeño. El veneno también.",o:[
    ["Me das miedo","Gracias. Lo voy a poner en mi currículum."],
    ["¿Y tú qué eres?","Las dos cosas. Depende de si me traes café o no."],
    ["Te traigo un café","Sabia decisión. Acabas de sobrevivir un día más."]]}],

 // ---------------- PABLO CANARIO ----------------
 diego:[
  {t:"Tengo 47 pestañas abiertas. Si cierro una, colapsa el universo.",o:[
    ["Cierra solo una, valiente","Cerré una y se abrió otra sola. Creo que el navegador está vivo y me odia."],
    ["Yo tengo 112","Respeto. Ahora eres mi superior jerárquico."],
    ["Dame el portátil, yo lo arreglo","¡No! Ahí está todo mi doctorado. En pestañas. Sin guardar."]]},
  {t:"Hice el análisis estadístico. p = 0,051.",o:[
    ["¡Ay no, casi!","Casi. Mi vida en una palabra.",{t:"¿Qué hago ahora?",o:[
      ["Repetir el experimento","Sí… con más muestras. Y más café. Y más pánico."],
      ["Decir “marginalmente significativo”","Peligroso. Pero me gusta. Lo escribo en letra pequeñita."]]}],
    ["Redondea, nadie se da cuenta","El Dr. Revisor se da cuenta. Huele los redondeos desde su despacho."],
    ["¿Eso se come?","Ojalá. Llevo dos días comiendo solo café y desesperanza."]]},
  {t:"Me dicen Canario porque canto cuando estoy nervioso. Llevo tres semanas cantando.",o:[
    ["Canta algo para mí","🎵 Mi p-valor no es significativo, lalalá… 🎵 Ya. Ahora estamos los dos tristes."],
    ["¿Por qué tan nervioso?","Tengo reunión con mi director. La última vez dijo “interesante” y no sé si es un elogio o una amenaza.",{t:"¿Qué crees que significa “interesante”?",o:[
      ["Que le gustó","Qué optimista. Te envidio. Debe ser bonito vivir así."],
      ["Que estás perdido","Gracias. Por fin alguien honesto. Voy a cantar más fuerte."]]}],
    ["Los canarios avisaban en las minas…","Lo sé. Por eso soy el primero en enterarme cuando algo en este grupo se va a derrumbar."]]},
  {t:"Hice una encuesta en el grupo. El 100 % está agotado. N = 13. Muy significativo.",o:[
    ["¿Y tú también?","Yo soy el outlier. No estoy agotado: estoy en otra dimensión."],
    ["Con 13 no concluyes nada","Gracias, Dr. Revisor. ¿Usted también vino a arruinarme el día?"],
    ["Publícalo","Ya lo envié. Me lo rechazaron por “obviedad excesiva”."]]},
  {t:"Mi gráfica tiene las barras de error más grandes que las barras.",o:[
    ["Eso es honestidad","Honestidad científica. Y una crisis existencial con eje Y."],
    ["Escóndelas, nadie las mira","El tribunal las mira. Es lo único que mira. Eso y mis ojeras."],
    ["Ponle colores bonitos","Le puse arcoíris. Ahora parece una fiesta de mis fracasos."]]},
  {t:"Anoche soñé que el ordenador se apagaba sin guardar. Me desperté gritando “¡CONTROL + S!”.",o:[
    ["Eso es trauma","Trauma académico. ¿Lo cubre el seguro? No. Nada lo cubre."],
    ["A mí me pasa con el correo","¿El del director a las 23:58? Ese sueño lo tenemos todos.",{t:"¿Qué haces cuando llega ese correo?",o:[
      ["Lo leo a la mañana siguiente","Sabio. Por la noche los correos muerden."],
      ["Contesto al instante, temblando","Igual que yo. Por eso tengo esta voz de canario."]]}],
    ["Guarda cada tres segundos","Ya lo hago. Mi dedo meñique tiene más músculo que mis piernas."]]}],

 // ---------------- MR JAIMY ----------------
 tomas:[
  {t:"Mis rizos dicen que va a llover. Nunca fallan.",o:[
    ["¡Qué útil!","Lo sé. Deberían ponerme en el telediario. El hombre higrómetro."],
    ["El pronóstico dice sol","El pronóstico no tiene rizos. Trae paraguas."],
    ["¿Y qué dicen de mi tesis?","Que también se viene tormenta. Con granizo."]]},
  {t:"Repetí el experimento 14 veces. Salieron 14 resultados distintos.",o:[
    ["Eso es ciencia","Eso es caos. Pero con bata, que se ve más profesional."],
    ["Haz el 15, ese es el bueno","¿Tú crees? Si sale bien, lo llamo “el tuyo”.",{t:"¿Y si sale mal?",o:[
      ["Culpamos a la humedad","Perfecto. Mis rizos firmarán como testigos."],
      ["Lo llamamos “resultado inesperado”","Y lo publicamos. Así nace la ciencia moderna."]]}],
    ["Saca el promedio y listo","El promedio de 14 desastres es… un desastre promedio."]]},
  {t:"El otro día explotó un reactivo. Mis rizos amortiguaron el golpe. Son airbags naturales.",o:[
    ["¿Estás bien?","Sí. Uno de los rizos sigue humeando, pero está bien. Es fuerte."],
    ["Eso no es nada seguro","Nada aquí es seguro. Ni el experimento, ni la beca, ni el café."],
    ["Deberían patentarte","Lo intenté. Burocracia me pidió el formulario de patente capilar. No existe."]]},
  {t:"Mi director me dijo que repitiera todo desde cero. Es la quinta vez que vuelvo a nacer académicamente.",o:[
    ["Lo siento mucho","No lo sientas. Cada vez que renazco, mis gráficas son más bonitas y más inútiles."],
    ["Ya tienes experiencia","Tanta que podría hacerlo dormido. De hecho, el último lo hice dormido.",{t:"¿Y salió bien?",o:[
      ["Seguro mejor que despierto","Sí. Dormido no tengo miedo. Despierto, muchísimo."],
      ["Prefiero no saberlo","Haces bien. Yo tampoco quiero saberlo."]]}],
    ["Busca otro director","Ya busqué. Todos me dijeron: “repítelo desde cero”."]]},
  {t:"Si encuentras pelos rizados en tus muestras, no son míos. Son de un fantasma con rizos.",o:[
    ["Claro, un fantasma","Un fantasma muy parecido a mí. Pura coincidencia científica."],
    ["Usa gorro","El gorro no me cabe. Probé tres tallas y una funda de almohada."],
    ["Eso es contaminación","Eso es firma de autor. Como en los cuadros. Pero en tu muestra."]]},
  {t:"Cada vez que publico algo, mi abuela lo imprime y lo pega en la nevera. Nadie más lo lee.",o:[
    ["Qué tierno","Tierno y triste. Mi índice h es, literalmente, mi abuela."],
    ["Yo también lo leí","¿En serio? ¿Cuál fue tu parte favorita?",{t:"¿Cuál fue tu parte favorita?",o:[
      ["Los agradecimientos","La única parte que escribí con el corazón. Y llorando."],
      ["…el título","Lo sabía. Nadie pasa del título. Ni el revisor."]]}],
    ["Tu abuela es tu mejor revisora","Sí. Siempre dice “muy bien, mijo”. El Dr. Revisor podría aprender."]]}],

 // ---------------- DR. CUMBIA ----------------
 fernando:[
  {t:"¿Sabes qué fruta serías? Yo sí lo sé. Pero no te lo voy a decir.",o:[
    ["¡Dímelo, por favor!","No. Tienes que jugar a Frutas Cumbia. En esta vida hay que ganarse las cosas. Y sufrir."],
    ["Seguro soy una fresa","¿Una fresa? Ja. Eso querrías tú.",{t:"¿Quieres una pista?",o:[
      ["Sí","Pista: tiene pepas. …Casi todas tienen pepas. Sigue participando."],
      ["No, prefiero sufrir","Así me gusta. Sufrir es parte del doctorado."]]}],
    ["No me interesa","Mentira. Todos quieren saber. Hasta el Dr. Revisor jugó. Le salió durián."]]},
  {t:"El café de abajo es 70 % agua y 30 % fe. ¿Tú con cuál te quedas?",o:[
    ["Con el 30 % de fe","Buena elección. La fe es lo único que nos queda antes del seminario."],
    ["Con el agua, soy sano","Sano en un doctorado. Qué ternura. Ya se te quitará."],
    ["Prefiero cerveza","Eso es los viernes. Hoy es… bueno, en espíritu siempre es viernes."]]},
  {t:"Te veo con cara de tesis. ¿Cómo vas?",o:[
    ["Bien, avanzando","Qué bien. Eso decía yo… hace tres años."],
    ["Mal, pero con estilo","Esa es la actitud. El estilo no se reprueba.",{t:"¿Quieres un consejo del Dr. Cumbia?",o:[
      ["Sí, por favor","Nunca abras el correo un viernes a las 18:00. Nunca. Ahí viven los monstruos."],
      ["No, gracias","Bien. Mis consejos cuestan un café. Acabas de ahorrar."]]}],
    ["¿Qué tesis?","Exacto. Si no la miras, no existe. Teoría del Dr. Cumbia."]]},
  {t:"Soy el Dr. Cumbia. Bueno, todavía no. Pero el título ya me lo puse, por si acaso.",o:[
    ["Te queda bien","Lo sé. Solo me falta la tesis. Detalle menor."],
    ["¿Eso es legal?","Es tan legal como el sueldo de un becario: técnicamente existe."],
    ["Llámame doctor a mí también","No. Tienes que ganártelo. Yo me lo gané inventándomelo."]]},
  {t:"Según mis cálculos, en este grupo hay tres lulos, dos durianes y un aguacate que se daña mañana.",o:[
    ["¿Yo cuál soy?","Tú eres… no. Juega a Frutas Cumbia. No regalo spoilers."],
    ["¿Quién es el durián?","No puedo decirlo. Pero huele a alguien de la sala de becarios.",{t:"¿Adivinas quién es?",o:[
      ["¿Cachopo Flavor?","Eso huele a cachopo, no a durián. Sigue intentando."],
      ["¿Soy yo?","…No digo nada. Pero abre una ventana."]]}],
    ["¿Y el aguacate?","El aguacate es la tesis de Mr Jaimy. Mañana se daña. Ya lo sabe."]]},
  {t:"Tengo una teoría: el café de la cafetería es el mismo desde 2019. Solo lo recalientan.",o:[
    ["Eso explica el sabor","Sabor a historia. A sufrimiento acumulado. A Don Tinto."],
    ["Pregúntale a Don Tinto","Ya le pregunté. Me dijo “fiado no” y cambió de tema. Sospechoso."],
    ["Tómalo igual","Obvio. Es lo único que me mantiene vivo. Eso y saber qué fruta eres."]]}],

 // ---------------- DOÑA BONSÁI ----------------
 paula:[
  {t:"Desde aquí abajo veo cosas que ustedes no. Por ejemplo: debajo de la mesa hay una galleta de 2021.",o:[
    ["¿Sigue ahí?","Sigue ahí. Ya es parte del edificio. Tiene nombre.",{t:"¿Adivinas cómo se llama?",o:[
      ["¿Galletita?","Casi. Se llama Doctora Galleta. Tiene más antigüedad que todos nosotros."],
      ["Prefiero no saberlo","Sabia decisión. Ella prefiere el anonimato."]]}],
    ["Qué asco","Asco es lo que hay debajo de la nevera. Esa expedición no la hago ni con casco."],
    ["Eres el radar del grupo","Lo sé. Nada se me escapa. Ni las migas ni los chismes."]]},
  {t:"Ayer me escondí tres horas en el armario de reactivos y nadie lo notó.",o:[
    ["¿Estás bien?","Sí, solo necesitaba silencio. Y había wifi. Mejor que la biblioteca."],
    ["¿Por qué hiciste eso?","Huía de una reunión. Funcionó. Te recomiendo el armario 3."],
    ["Yo te estuve buscando","Mentira. Pero gracias por fingir. Te doy media galleta. No la del suelo."]]},
  {t:"Me dicen Doña Bonsái porque soy pequeña y porque necesito cuidados constantes.",o:[
    ["¿Te riego?","Con café, por favor. Y háblame bonito, que si no me marchito."],
    ["Los bonsáis viven siglos","Exacto. Voy a sobrevivir a todos ustedes y a sus tesis."],
    ["Eres más dura que un bonsái","Gracias. Los bonsáis no tienen que hablar con el Prof. Burocracia."]]},
  {t:"Desde abajo se escuchan cosas. Ayer un profesor dijo: “ese becario no llega”.",o:[
    ["¿Qué becario?","No lo sé. Pero estaba mirando hacia tu escritorio.",{t:"¿Y ahora qué hago?",o:[
      ["Demostrarle que sí llego","Así se habla. Y si no llegas, yo llego a su tobillo."],
      ["Esconderme en el armario 3","Comparto el armario. Hay sitio. Trae galletas."]]}],
    ["¿Y qué hiciste?","Nada. Solo le até los cordones a la pata de la mesa. Desde abajo se puede."],
    ["No quiero saberlo","Demasiado tarde. Ahora vives con eso. Como yo."]]},
  {t:"Siempre me dicen “¿te ayudo a alcanzar eso?”. Nunca me dicen “¿te ayudo con la tesis?”.",o:[
    ["¿Te ayudo con la tesis?","…Gracias. Me lo pensaré. Primero alcánzame el café de arriba."],
    ["Alcanzar cosas es más fácil","Exacto. La tesis está demasiado arriba. Ni con escalera."],
    ["Usa una silla","Ya uso una silla. Para llorar. Para alcanzar cosas uso la de otro."]]},
  {t:"Hice un mapa de los escondites del edificio donde nadie te encuentra. Lo vendo.",o:[
    ["¿Cuánto cuesta?","Dos galletas y tu silencio. Incluye el armario 3 y el hueco detrás de la fotocopiadora."],
    ["¿Para qué lo necesito?","Para cuando venga la Dra. Deadline. Créeme: lo vas a necesitar."],
    ["Ya me sé los escondites","¿El armario 3? Eso es de principiante. Hay sitios que ni el Dr. Revisor conoce."]]}],

 // ---------------- MISTER AZULEJO ----------------
 nico:[
  {t:"Esta camiseta azul me da suerte. Hoy tengo reunión con un profe.",o:[
    ["Seguro sale bien","Gracias. Si sale mal, es culpa de la lavadora: la lavé ayer."],
    ["¿Nunca la lavas?","La lavo. Con cuidado. A mano. Con respeto. Y poco."],
    ["Préstamela para mi defensa","Imposible. Su poder solo funciona conmigo. Lo dice el manual (que escribí yo)."]]},
  {t:"Tengo un plan perfecto para terminar la tesis en un mes.",o:[
    ["¡Cuéntame!","Paso 1: dejar de dormir. Paso 2… todavía voy por el paso 1.",{t:"¿Te apuntas al plan?",o:[
      ["Me apunto","Bienvenido al club. Primera regla: nadie duerme. Segunda regla: nadie duerme."],
      ["Prefiero dormir","Cobarde. Pero descansado. Te envidio."]]}],
    ["Eso dijiste el mes pasado","Y el anterior. Pero este mes tengo la camiseta azul."],
    ["Ese plan es una trampa","Todos los planes son trampas. Por eso tengo varios."]]},
  {t:"Me dicen Mister Azulejo porque siempre voy de azul. Y porque todo el mundo me pisa, como al suelo.",o:[
    ["Nadie te pisa","Hoy me pisaron tres veces. Una fue Eli. Creo que fue a propósito."],
    ["Al menos combinas","Combino con el suelo, con el cielo y con mi estado de ánimo."],
    ["Cambia de color","Probé con una camiseta roja. Ese día se me cayó el experimento, el móvil y la autoestima."]]},
  {t:"Llevo 4 meses escribiendo un correo para pedirle una reunión a mi director.",o:[
    ["Envíalo ya","¿Ya? ¿Ahora? ¿Sin la camiseta de la suerte? Estás loco.",{t:"¿Y si me dice que no?",o:[
      ["Pues plan B","Ya fui a ver a Lady Plan B. Me cobró por el plan."],
      ["No te va a contestar","Gracias. Ahora estoy tranquilo y también triste."]]}],
    ["4 meses es normal","Eso pensaba. Pero mi director ya se jubiló."],
    ["Pídesela en persona","¿En persona? ¿Con mi cara? No, gracias. Yo mando correos como la gente normal."]]},
  {t:"Mi camiseta de la suerte tiene un agujero. Creo que la suerte se está escapando por ahí.",o:[
    ["Cóselo rápido","Ya lo cosí. Ahora la suerte tiene una cicatriz. Es más fuerte."],
    ["Compra otra igual","No es lo mismo. Esta tiene seis años de sudor de laboratorio. Es un ecosistema."],
    ["La suerte no existe","Dijo la persona que no tiene camiseta de la suerte. Mírate. Mírate bien."]]},
  {t:"Soy pequeño, pero mi ansiedad es enorme. Hacemos buen equipo.",o:[
    ["Te entiendo","Gracias. ¿Montamos un club? “Los que revisan el correo cada dos minutos”."],
    ["¿Y quién manda?","La ansiedad. Yo solo firmo."],
    ["Respira hondo","Ya respiro hondo. Ahora tengo ansiedad y mareo. Combo."]]}],

 // ---------------- IRAMA ----------------
 alex:[
  {t:"¿Necesitas algo del estante de arriba? Cobro en galletas.",o:[
    ["Sí, la caja de pipetas","Hecho. Son dos galletas: una por subir el brazo y otra por bajarlo."],
    ["No, uso escalera","La escalera no te da conversación. Yo sí. Poca, pero sí."],
    ["¿Aceptas empanadas?","Acepto empanadas, cafés y halagos. En ese orden."]]},
  {t:"Hoy cambié tres bombillas. Sin escalera. Soy útil.",o:[
    ["Eres un héroe","Lo sé. Deberían darme un sello como los de los profes.",{t:"¿Qué sello me pondrías?",o:[
      ["El Sello de la Luz","Me encanta. Lo pondré en mi bata. Brillará."],
      ["El Sello del Cuello Largo","…Acepto. Pero solo porque es verdad."]]}],
    ["¿Y las del Aula Magna?","Esas no. Hasta yo tengo límites. Y vértigo."],
    ["Deberías cobrar por eso","Ya cobro. En galletas. Es una economía sólida."]]},
  {t:"Compuse una canción sobre mi tesis. Se llama “Sin resultados (remix)”.",o:[
    ["¡Cántala!","🎵 Bebé, mis datos no salen, y mi director no me llama… 🎵 Es número uno en el armario de reactivos."],
    ["Suena triste","Es reguetón triste. Se baila llorando. Muy de doctorado."],
    ["¿Tiene videoclip?","Sí. Salgo cambiando una bombilla bajo la lluvia. Muy dramático.",{t:"¿Me dejas salir en el videoclip?",o:[
      ["¡Sí, quiero bailar!","Perfecto. Tu papel: becario que llora en cámara lenta."],
      ["Solo si no tengo que bailar","Entonces haces de lámpara. Quieto. Iluminando."]]}]]},
  {t:"La gente solo me pide que alcance cosas. Ya nadie me pregunta cómo estoy.",o:[
    ["¿Cómo estás?","…Nadie me lo había preguntado en meses. Ahora estoy incómodo. Gracias, supongo."],
    ["Alcánzame la caja de arriba","¿Ves? Ese es el problema. Dos galletas, por favor."],
    ["Es el precio de la altura","Y el de los techos bajos. Tengo más chichones que publicaciones."]]},
  {t:"Dicen que me parezco a un cantante famoso. Yo creo que me parezco a alguien que no duerme.",o:[
    ["Te pareces al cantante","Gracias. Si triunfo en la música, dejo el doctorado. Si no, también."],
    ["Te pareces a un zombi","Un zombi con estilo. Las ojeras son naturales. Las cultivo."],
    ["Te pareces a la lámpara del lab","Alta, brillante y golpeando a Lechero Mayor. Me acepto."]]},
  {t:"Hoy le cambié la bombilla al Prof. Burocracia. Me pidió un formulario para poder darme las gracias.",o:[
    ["¿Lo llenaste?","Sí. El agradecimiento llegará en un plazo de 3 a 5 días hábiles."],
    ["Debiste dejarlo a oscuras","Lo pensé. Pero a oscuras no vería sus formularios. Y eso sería peor para todos."],
    ["Pídele un sello","Me dio uno: “Agradecimiento pendiente de revisión”. Lo enmarqué."]]}],

 // ---------------- LADY PLAN B ----------------
 marta:[
  {t:"Reservé el equipo para las 7 de la mañana. Lo voy a usar a las 11.",o:[
    ["¿Por qué tan temprano?","Para que nadie más lo use. Es estrategia, no madrugar."],
    ["Eso es trampa","Se llama planificación. Trampa es lo de Mister Azulejo con su camiseta de la suerte."],
    ["Yo lo reservo a las 6","Ajá. Y lo usarás a las 12. Te conozco.",{t:"¿Hacemos un trato?",o:[
      ["Lo compartimos","Trato. Tú las mañanas, yo… también las mañanas."],
      ["Que gane quien madrugue más","Acepto. Mi plan B es ponerte una alarma en el móvil a las 4."]]}]]},
  {t:"Siempre tengo un plan B. ¿Quieres saber cuál es para la defensa?",o:[
    ["¡Sí!","Si me preguntan algo difícil, digo “excelente pregunta” y miro por la ventana hasta que se aburran."],
    ["¿Y el plan A?","El plan A es estudiar. Por eso existe el plan B."],
    ["Yo tengo plan Z","¿Plan Z? Eso es nivel experto. ¿Incluye huir al Amazonas?"]]},
  {t:"Mi plan B para la vida es abrir una cafetería. Mi plan C es trabajar en la de Don Tinto.",o:[
    ["Me gusta el plan B","A mí también. Lo malo es el plan A: terminar la tesis."],
    ["Don Tinto no te contrata","Ya lo intenté. Me dijo “fiado no”. No sé qué tiene que ver, pero dolió."],
    ["¿Y el plan D?","Huir con las gallinas de Jorge. Ya tenemos pueblo elegido."]]},
  {t:"Reservé la sala de reuniones todo diciembre. Por si acaso.",o:[
    ["¿Por si acaso qué?","Por si alguien quiere reunirse conmigo. Así no puede. Plan perfecto."],
    ["Eso es egoísta","Es estratégico. Egoísta sería reservarla también en enero. Que también lo hice."],
    ["Préstamela un día","Te la presto el 31 de diciembre, de 23:00 a 23:59. Pide un deseo."]]},
  {t:"Tengo un plan para cuando el tribunal me pregunte algo que no sé.",o:[
    ["¿Cuál?","Paso 1: “excelente pregunta”. Paso 2: toser. Paso 3: activar la alarma de incendios.",{t:"¿Y si no funciona?",o:[
      ["Plan B, obviamente","Exacto: desmayarme con elegancia. Lo tengo ensayado."],
      ["Responder la verdad","¿La verdad? Qué idea tan rara. La apunto como plan Z."]]}],
    ["¿Y si estudias?","Estudiar es el plan A. Y yo nunca uso el plan A. Es demasiado obvio."],
    ["Eso no va a funcionar","Por eso tengo 26 planes más. Uno por cada letra del alfabeto."]]},
  {t:"Mi agenda tiene tres colores: rojo para urgente, naranja para muy urgente y negro para “ya es tarde”.",o:[
    ["¿Cuál usas más?","El negro. Se me acabó el rotulador negro. Ahora todo es invisible, como mis avances."],
    ["Yo no tengo agenda","Eso explica tu cara. Te regalo una. Ya viene todo en negro."],
    ["Añade el verde","¿Verde para qué? ¿Para “todo bien”? Eso no existe en un doctorado."]]}],

 // ---------------- DON TINTO ----------------
 tinto:[
  {t:"¿Lo de siempre?",o:[
    ["Sí, un café, por favor","Café. Fuerte, como su voluntad. Flojo, como su tesis."],
    ["¿Qué es lo de siempre?","No sé. Siempre pregunto eso. Así parece que me acuerdo."],
    ["Sorpréndame","Café con sal. No, mentira. O sí. Nunca lo sabrá."]]},
  {t:"Aquí he visto pasar muchos becarios. Todos llegan con ilusión.",o:[
    ["¿Y cómo se van?","Con ojeras y título. Pero contentos. Bueno, con título.",{t:"¿Y usted cómo cree que se irá?",o:[
      ["Con título y sin ojeras","Ja. Eso espero. Le guardo una empanada para celebrarlo."],
      ["No me voy, me quedo a vivir","Ya hubo dos que lo intentaron. Duermen en el Aula Magna desde 2015."]]}],
    ["Qué bonito","No se emocione. Ahora le cobro el café."],
    ["Cuénteme chismes","Yo no cuento nada. Pero la Dra. Deadline toma el café sin azúcar. Saque sus conclusiones."]]},
  {t:"Ayer un becario me quiso pagar con una patente. Le dije que fiado no.",o:[
    ["¿Valía algo la patente?","Menos que una empanada. La usé para calzar la mesa 3."],
    ["Qué cruel","Cruel es su director, no yo. Yo solo vendo café."],
    ["¿Le dio el café?","Le di agua caliente con nostalgia. Gratis. Soy un sentimental."]]},
  {t:"La cafetera tiene más años que la mitad de los profesores. Y funciona mejor.",o:[
    ["¿Cuántos años tiene?","No sé. Cuando llegué ya estaba. Creo que la instaló el primer doctorando de la historia."],
    ["¿Por qué no la cambian?","Porque Burocracia pidió el formulario en 2009. Sigue en revisión."],
    ["Al menos ella da resultados","Exacto. Café en 30 segundos. Ustedes llevan cuatro años y nada.",{t:"¿Me pone uno doble?",o:[
      ["Sí, doble y fuerte","Doble. Para que aguante la reunión, no para que la disfrute."],
      ["Mejor uno pequeño","Pequeño. Como su beca. Marchando."]]}]]},
  {t:"Veo a los becarios llegar cada mañana. Cada año con más ojeras.",o:[
    ["¿Y a mí cómo me ve?","Usted va bien. Todavía le brillan los ojos. Ya se le quitará."],
    ["Es el sistema","El sistema y el café de anoche. Pero sobre todo el sistema."],
    ["Póngalo más fuerte","Si lo pongo más fuerte, despierto a los que duermen en el Aula Magna."]]}],
};

/* =========================================================
   COMENTARIOS ENTRE PERSONAJES — a veces los escuchas al entrar en una sala.
   rooms: dónde puede pasar · "*" y "**" = cualquier persona presente
   ========================================================= */
const BANTER=[
 {rooms:["becarios"],l:[["lucia","¿Ya terminaste el informe? ¿Ya? ¿Ya?"],["julian","Desde aquí arriba veo que no. Y veo que tú tampoco."]]},
 {rooms:["becarios"],l:[["mateo","¿Alguien ha visto mi yogur?"],["julian","Yo solo tomo leche."],["mateo","Eso es justo lo que diría un ladrón de yogures."]]},
 {rooms:["becarios"],l:[["diego","¡p = 0,049! ¡ES SIGNIFICATIVO!"],["valeria","Has redondeado."],["diego","…Voy a cantar una canción triste y vuelvo."]]},
 {rooms:["becarios"],l:[["tomas","Repetí el experimento por decimosexta vez."],["sofia","Si lo repites otra vez, te muerdo."],["tomas","Lo repito con miedo, entonces."]]},
 {rooms:["becarios"],l:[["samuel","Pongo cumbia para animar el ambiente."],["valeria","Volumen 3. Calculé en Excel que a partir de 4 bajamos la productividad."],["samuel","Tu Excel no tiene ritmo."]]},
 {rooms:["becarios"],l:[["sofia","¿Quién dejó la caja de pipetas en el estante de arriba?"],["julian","…"],["sofia","Venganza (mi escalera) y yo vamos a por ti."]]},
 {rooms:["becarios"],l:[["mateo","Me voy a echar una siesta."],["lucia","¿Ya? ¿Ahora? ¿Ya te dormiste? ¿Ya?"],["mateo","Ya no."]]},
 {rooms:["becarios"],l:[["diego","Tengo 48 pestañas abiertas."],["tomas","Mis rizos predicen que tu ordenador va a explotar en 3, 2, 1…"]]},
 {rooms:["est"],l:[["paula","Desde aquí abajo veo que alguien lleva los cordones desatados."],["alex","Desde aquí arriba veo que alguien no llega a la mesa."],["paula","Nos vemos luego. En tu tobillo."]]},
 {rooms:["est"],l:[["nico","Hoy tengo reunión. Me puse la camiseta de la suerte."],["marta","Yo reservé la sala de reuniones. Para siempre."],["nico","…Pues la tendré en el pasillo."]]},
 {rooms:["est"],l:[["fernando","Sé qué fruta es cada uno de ustedes."],["alex","¿Y yo?"],["fernando","Tú eres un banano: alto y te dañas rápido."]]},
 {rooms:["est"],l:[["marta","Mi plan B es renunciar."],["nico","¿Y el plan A?"],["marta","Quejarme hasta llegar al plan B."]]},
 {rooms:["est"],l:[["alex","🎵 Mis datos no salen, bebé… 🎵"],["paula","Si vuelves a cantar, cambio todas tus bombillas por fundidas."]]},
 {rooms:["cafe"],l:[["tinto","¿Café?"],["*","Doble, por favor. Tengo reunión con el Dr. Revisor."],["tinto","Entonces le pongo triple. Y una empanada para el duelo."]]},
 {rooms:["cafe"],l:[["tinto","Fiado no."],["*","¡Pero si todavía no he pedido nada!"],["tinto","Por si acaso."]]},
 {rooms:["cafe"],l:[["*","¿Este café es de hoy?"],["tinto","Es de esta semana. Que ya es mucho."]]},
 {rooms:["lab1","lab2","lab3"],l:[["*","¿Quién dejó la muestra fuera de la nevera?"],["**","Yo no fui. Pero huele como si hubiera muerto hace tres días."]]},
 {rooms:["lab1","lab2","lab3"],l:[["*","Esta vez el experimento va a salir bien."],["**","Eso dijiste la última vez. Y la anterior. Y la anterior de la anterior."]]},
 {rooms:["lab1","lab2","lab3"],l:[["*","¿Esto se puede tocar sin guantes?"],["**","Sí, si no le tienes cariño a tus dedos."]]},
];
