import { useState, useEffect } from "react";

const CONFIG = {
  ghl_webhook:    "https://YOUR-GHL-WEBHOOK-URL",
  ghl_order_form: "https://YOUR-GHL-ORDER-FORM-URL",
};

function getFullReading(bd, bt) {
  const d=new Date(bd),m=d.getMonth()+1,dy=d.getDate();
  const S=[
    {s:"Capricornio",r:[[12,22],[1,19]],e:"Tierra",destiny:"Viniste a construir algo que trascienda tu nombre. No desde la obligación — desde la maestría. Tu vida fue diseñada para dejar estructura, orden y legado. No el tipo que se mide en cifras — el tipo que cambia la forma en que otros se sostienen.",blocked:"te mantiene construyendo para demostrar, no para trascender. Convierte tu legado en una carrera sin fin."},
    {s:"Acuario",r:[[1,20],[2,18]],e:"Aire",destiny:"Viniste a ver lo que otros no ven. A pensar diferente, a crear desde lo que aún no existe. Tu mente fue diseñada para innovar, conectar ideas que parecen inconexas y abrir caminos donde otros solo ven paredes.",blocked:"te desconecta de las personas mientras intentas conectar con las ideas. Te aleja del cuerpo y del sentir."},
    {s:"Piscis",r:[[2,19],[3,20]],e:"Agua",destiny:"Viniste a sentir la vida en una frecuencia que muy pocos alcanzan. Tu sensibilidad no es debilidad — es tu superpoder. Fuiste diseñado para crear desde la intuición pura, para sanar con tu presencia, para ver más allá de lo visible.",blocked:"convierte esa sensibilidad en una carga. Te hace absorber el dolor de todos y perder el tuyo propio en el proceso."},
    {s:"Aries",r:[[3,21],[4,19]],e:"Fuego",destiny:"Viniste a abrir camino. A ser el primero en atreverse. Tu energía fue diseñada para iniciar lo que otros no se animan, para liderar con coraje, para encender fuegos que iluminen — no que destruyan.",blocked:"convierte ese fuego en prisa. Te hace actuar sin sentir, avanzar sin mirar, y quemar lo que más importa en nombre de la velocidad."},
    {s:"Tauro",r:[[4,20],[5,20]],e:"Tierra",destiny:"Viniste a demostrar que la abundancia real se construye con calma. Tu vida fue diseñada para crear belleza, estabilidad y gozo. No el gozo rápido — el profundo. El que se siente en el cuerpo.",blocked:"convierte la calma en resistencia. Te ancla a lo conocido por miedo a lo que puede ser. Y lo que puede ser es más grande de lo que imaginas."},
    {s:"Géminis",r:[[5,21],[6,20]],e:"Aire",destiny:"Viniste a comunicar verdades que otros no saben nombrar. Tu mente fue diseñada para conectar mundos, traducir lo complejo en simple, y hacer que otros se entiendan a sí mismos a través de tus palabras.",blocked:"dispersa esa energía en mil direcciones. Te hace vivir en la superficie de muchas cosas sin profundizar en ninguna."},
    {s:"Cáncer",r:[[6,21],[7,22]],e:"Agua",destiny:"Viniste a crear espacios donde otros puedan ser vulnerables sin miedo. Tu corazón fue diseñado para nutrir, contener y dar hogar — no solo físico, sino emocional. Donde tú estás, otros se sienten seguros de ser.",blocked:"te hace cargar con todos y olvidarte de ti. Convierte tu hogar en una fortaleza donde nadie entra y tú no sales."},
    {s:"Leo",r:[[7,23],[8,22]],e:"Fuego",destiny:"Viniste a inspirar. Tu presencia fue diseñada para recordarle a otros lo que es posible cuando alguien decide ser completamente auténtico. No necesitas aplausos — necesitas expresarte. Y cuando lo haces desde la verdad, todo se alinea.",blocked:"convierte esa necesidad de expresión en necesidad de validación. Te hace brillar para que te vean en lugar de brillar porque es lo que eres."},
    {s:"Virgo",r:[[8,23],[9,22]],e:"Tierra",destiny:"Viniste a perfeccionar lo que importa — no todo. Tu mente fue diseñada para ver los detalles que otros ignoran, para crear sistemas que funcionen, para servir desde la excelencia sin perderte en ella.",blocked:"convierte la excelencia en autoexigencia destructiva. Te hace creer que nunca es suficiente — y eso te roba el gozo de lo que ya creaste."},
    {s:"Libra",r:[[9,23],[10,22]],e:"Aire",destiny:"Viniste a crear equilibrio donde hay caos. Tu presencia fue diseñada para mediar, armonizar y mostrar que se puede ser justo sin ser frío. Donde tú estás, las cosas encuentran su lugar.",blocked:"te hace buscar la paz de los demás sacrificando la tuya. Convierte la armonía en sumisión disfrazada de diplomacia."},
    {s:"Escorpio",r:[[10,23],[11,21]],e:"Agua",destiny:"Viniste a transformar. No lo superficial — lo profundo. Tu energía fue diseñada para mirar donde otros no se atreven, para tocar las heridas que nadie quiere nombrar, y para renacer tantas veces como sea necesario.",blocked:"convierte esa profundidad en control. Te hace manipular desde la sombra lo que podrías sanar desde la luz."},
    {s:"Sagitario",r:[[11,22],[12,21]],e:"Fuego",destiny:"Viniste a expandir los límites de lo posible. Tu espíritu fue diseñado para explorar, enseñar y mostrar que hay más allá de lo que se ve. No eres de un solo lugar ni de una sola verdad.",blocked:"convierte la expansión en huida. Te hace correr hacia lo nuevo para no enfrentar lo que dejaste atrás."},
  ];
  const astro=S.find(s=>{const[[sm,sd],[em,ed]]=s.r;if(sm>em)return(m===sm&&dy>=sd)||(m===em&&dy<=ed);return(m===sm&&dy>=sd)||(m===em&&dy<=ed)||(m>sm&&m<em);})||S[0];
  let lp=bd.replace(/-/g,"").split("").map(Number).reduce((a,b)=>a+b,0);
  while(lp>9&&lp!==11&&lp!==22){lp=String(lp).split("").map(Number).reduce((a,b)=>a+b,0);}
  const lpR={1:{g:"liderazgo natural",l:"Tu vida te pide que aprendas a liderar sin necesitar controlar. A ir primero sin dejar atrás a quienes importan."},2:{g:"sensibilidad extraordinaria",l:"Tu vida te pide que aprendas a conectar profundamente sin perderte en el otro. A ser puente sin dejar de ser orilla."},3:{g:"expresión creativa poderosa",l:"Tu vida te pide que aprendas a crear sin necesitar aprobación. A expresarte porque es tu naturaleza, no porque necesitas ser visto."},4:{g:"capacidad de construir lo que perdura",l:"Tu vida te pide que aprendas a construir con gozo, no con obligación. A crear estructura sin convertirla en cárcel."},5:{g:"libertad como motor de vida",l:"Tu vida te pide que aprendas a ser libre sin huir. A fluir con el cambio sin que sea una forma de escapar de lo que duele."},6:{g:"capacidad de nutrir y sostener",l:"Tu vida te pide que aprendas a cuidar sin vaciarte. A dar desde la elección, no desde la obligación que te enseñaron."},7:{g:"profundidad espiritual e intelectual",l:"Tu vida te pide que aprendas a confiar en lo que no se ve. A soltar la necesidad de entender todo antes de sentirlo."},8:{g:"poder de manifestación real",l:"Tu vida te pide que aprendas a usar el poder para crear, no para controlar. A construir abundancia que incluya paz interior."},9:{g:"sabiduría compasiva",l:"Tu vida te pide que aprendas a soltar lo que ya cumplió su ciclo. A servir sin martyrizarte. A cerrar capítulos sin que te definan."},11:{g:"intuición elevada",l:"Tu vida te pide que confíes en lo que percibes aunque nadie más lo vea. Que dejes de racionalizar tu intuición para encajar."},22:{g:"potencial de impacto masivo",l:"Tu vida te pide que materialices lo que ves posible. Que dejes de prepararte eternamente y empieces a construir el mundo que sabes que es posible."}};
  const ld=lpR[lp]||{g:"una capacidad única de transformación",l:"Tu vida te pide que te atrevas a ser quien viniste a ser."};
  let timeLayer="";
  if(bt&&bt!=="no_conozco"){const[hh]=bt.split(":").map(Number);const p=hh<6?"madrugada":hh<12?"mañana":hh<18?"tarde":"noche";const tQ={madrugada:"Quienes nacen en la madrugada cargan una sensibilidad que otros no entienden. Llegaste al mundo en silencio, y eso marcó tu forma de procesar: profunda, interna, a veces solitaria. Tu mayor poder está en lo que percibes cuando todo está quieto.",mañana:"Quienes nacen en la mañana llegan con energía de acción. Viniste listo para hacer, crear, mover. Tu impulso natural es hacia adelante. El riesgo es que confundas avanzar con escapar, y hacer con ser.",tarde:"Quienes nacen en la tarde cargan una dualidad: la energía del día que se transforma en reflexión. Viniste a integrar acción y conciencia. Tu poder está en ver ambos lados — pero eso mismo te puede paralizar si no decides desde cuál actuar.",noche:"Quienes nacen en la noche llegan con una conexión natural con lo invisible. No todo se explica. Y tú lo sabes. Tu mayor poder está en confiar en lo que sientes aunque no puedas demostrarlo. Tu intuición es más precisa de lo que le das crédito."};timeLayer=tQ[p];}
  const eR={Tierra:"Tu energía base es de construcción y materialización. Viniste a crear cosas reales, tangibles, que se puedan tocar. El riesgo es quedarte atrapado en lo concreto y olvidar que lo más importante no se ve.",Agua:"Tu energía base es emocional e intuitiva. Viniste a sentir profundamente y a usar esa sensibilidad como brújula. El riesgo es que las emociones te manejen en lugar de guiarte.",Fuego:"Tu energía base es de transformación y acción. Viniste a encender cosas nuevas, a inspirar, a mover lo estático. El riesgo es quemar lo que importa en nombre de la intensidad.",Aire:"Tu energía base es mental y comunicativa. Viniste a conectar ideas, personas y mundos. El riesgo es vivir en la cabeza y desconectarte del cuerpo y del sentir."};
  return{sign:astro.s,element:astro.e,destiny:astro.destiny,blocked:astro.blocked,lifePath:lp,lifePathMeaning:ld.g,lifePathLesson:ld.l,timeLayer,elementReading:eR[astro.e]||""};
}

const CONST={parentification:{name:"El Hijo Parentalizado",desc:"Aprendiste a cuidar antes de que alguien te cuidara. Ese rol no desapareció — se convirtió en tu modo por defecto.",press:"Seguirás atrayendo personas que necesitan ser salvadas hasta que decidas que tu valor no depende de lo que das."},hero:{name:"El Héroe de la Familia",desc:"Fuiste quien resolvía, quien lograba, quien no podía fallar. Te construiste hacia afuera. Por dentro hay mucho que no tocaste.",press:"El éxito externo seguirá sintiéndose vacío hasta que te preguntes para quién lo construiste."},invisible:{name:"El Invisible",desc:"Aprendiste que lo más seguro era no ser visto. No hacer ruido. No necesitar.",press:"Seguirás reduciéndote en espacios donde mereces tomar lugar."},perfectionist:{name:"El Perfecto",desc:"El amor llegaba condicionado a tu rendimiento. Ahora te exiges sin parar porque inconscientemente sigues ganando ese amor.",press:"La autocrítica te seguirá saboteando justo cuando estés más cerca de lo que genuinamente deseas."},scapegoat:{name:"El Chivo Expiatorio",desc:"Creciste creyendo que tú eras el problema. Eso dejó marca: o te sobre-esfuerzas o te saboteas para confirmarlo.",press:"El patrón se activará cada vez que alguien necesite a quién culpar."}};

const CHARS={
  controladora:{name:"El/La Controlador/a",emoji:"🔒",painHook:"Porque en tu casa todo era un caos. Alguien no cumplió, alguien falló, alguien se fue. Y la única opción que encontraste fue hacerte cargo. Sostener a todos. Menos a ti. Desde entonces no sabes cómo dejar de hacerlo sin sentir que todo se derrumba.",core:"Necesitas que todo esté en orden para poder respirar. Lideras, organizas, planificas y anticipas. Desde afuera pareces admirable. Desde adentro vives agotado, cargado y profundamente solo. No porque te guste mandar — sino porque no sabes cómo dejar de hacerlo sin sentir que estás fallando.",shadow:"No es fuerza. Es miedo disfrazado de organización.",costBlood:"Estás agotando a quienes más quieres. Tu pareja se aleja. Tus hijos se cierran. Tu cuerpo grita. Lo que se está cayendo es tu vida — mientras tú sostienes la de todos los demás.",teaser3:"Hay 3 momentos exactos donde este personaje decide por ti sin pedirte permiso: 1) Cuando alguien que amas toma una decisión sin consultarte y tu cuerpo reacciona como si fuera una traición. 2) Cuando algo se sale del plan y entras en modo emergencia aunque no lo sea. 3) Cuando estás a punto de descansar y tu mente te dice que aún no mereces parar.",manifestations:"Te cuesta delegar. Te frustras cuando las cosas no salen como las planeaste. Estás siempre ocupado, incluso cuando no hace falta. Te metes en todo, incluso en lo que no te corresponde. Te cuesta fluir con la incertidumbre.",phrases:"'Si no lo hago yo, nadie lo hará bien.' 'No puedo soltar, todo depende de mí.' 'Después descanso, ahora hay que resolver.' 'No puedo confiar del todo, ya me fallaron antes.'",futureBlock:"El control seguirá cerrando puertas: relaciones profundas, decisiones valientes, momentos de gozo real. Nadie puede vivir libremente bajo supervisión constante.",liberation:"Soltar no es perder. Es confiar. Y eso empieza con una sola cosa pequeña."},
  salvadora:{name:"El/La Salvador/a",emoji:"🛡️",painHook:"Porque nadie te cuidó cuando lo necesitaste. Y aprendiste que la única forma de que te vieran era siendo útil. Dando. Siempre dando. Hasta que un día te miraste y ya no quedaba nada para ti. Pero seguiste dando, porque no sabías qué otra cosa ser.",core:"Vives con el radar emocional encendido las 24 horas. Siempre disponible para todos, menos para ti. Aprendiste que el amor se gana. Que si das lo suficiente, te verán. Te elegirán.",shadow:"No es generosidad. Es una forma sofisticada de no sentir. Nace de la herida de no haber sido cuidado.",costBlood:"Te vacías completamente. Tu energía, tu tiempo, tu identidad — todo se fue en sostener a otros. Y cuando al fin necesitas algo, no hay nadie. Porque les enseñaste que tú no necesitas.",teaser3:"Este personaje tiene un intercambio secreto que hace contigo: te da la ilusión de que eres indispensable a cambio de que nunca te mires. Mientras estás ocupado salvando a otros, no tienes que enfrentar lo que realmente te duele.",manifestations:"Te ofreces a resolver todo. Das consejos aunque nadie los pida. Sientes culpa si no ayudas. Toleras vínculos desgastantes porque 'esa persona me necesita'. Te cuesta poner límites sin sentirte egoísta.",phrases:"'No me cuesta nada, yo puedo.' 'Si no lo hago yo, ¿quién lo va a ayudar?' 'Lo hago por amor.' 'Después me ocupo de lo mío.'",futureBlock:"Seguirás dando desde el vacío, atrayendo personas que se nutren de ti sin devolverte nada, alejando a quienes podrían darte lo que realmente necesitas.",liberation:"Ayudar desde la elección es diferente a ayudar desde el miedo. Solo tú sabes cuál de los dos es el tuyo."},
  invisible:{name:"El/La Invisible",emoji:"👁️",painHook:"Porque alguien te hizo sentir que eras demasiado. Demasiado intenso. Demasiado sensible. Demasiado tú. Y decidiste achicarte para que te quisieran. Bajaste la voz. Bajaste la mirada. Bajaste tus sueños. Desde entonces nadie te busca — porque tú les enseñaste a no hacerlo.",core:"Aprendiste a hacerte pequeño para que no te rechazaran. No es que no tengas poder — es que lo escondes. Por miedo a ser demasiado. Desde adentro vives en una cárcel construida por todas las veces que creíste que ser auténtico era un peligro.",shadow:"No es humildad. Es una herida que aprendiste a llamar virtud.",costBlood:"Las personas no te ven porque tú les enseñaste a no buscarte. Y lo más doloroso: un día despiertas rodeado de personas que no conocen quién eres — porque nunca te mostraste.",teaser3:"Este personaje cobra un precio invisible que pagas todos los días: en las palabras que no dices, los límites que no pones, los sueños que achicaste para caber en la vida de otros.",manifestations:"No dices lo que realmente piensas o sientes para no generar conflicto. Cedes fácilmente, incluso cuando algo te duele. Te minimizas en conversaciones. Hablas bajito, no por timidez, sino por costumbre de no molestar.",phrases:"'No quiero causar problemas.' 'Mejor no digo nada.' 'No es tan grave, yo puedo aguantar.' 'Si me muestro mucho, seguro me critican.'",futureBlock:"El resentimiento silencioso se acumula. Un día explota — o se convierte en algo que ya no puedes ignorar. Lo que te bloquea no es el mundo. Eres tú eligiendo no aparecer.",liberation:"Tu presencia no molesta. Ocupar el espacio que te pertenece es el primer acto de quien decide vivir."},
  proveedora:{name:"El/La Proveedor/a",emoji:"💼",painHook:"Porque desde muy chico te enseñaron que tu valor estaba en lo que hacías, no en lo que eras. Rendimiento, disciplina, resultados. Y cuando no producías, nadie te miraba. Entonces convertiste el trabajo en tu identidad. Y ahora no sabes cómo existir sin hacer.",core:"Tu rol es funcionar. Producir. Sostener. El descanso te genera culpa. La inactividad te inquieta. Tu cuerpo pide tregua pero tu mente exige más.",shadow:"No es ambición. Es identidad construida sobre el hacer — y sin el hacer, no sabes existir.",costBlood:"Tu cuerpo está avisando que pare. Tus relaciones son superficiales porque mostrar la verdad da miedo. El burnout no avisa. Y cuando llega, todo lo que construiste se siente como una condena.",teaser3:"Este personaje tiene un límite — y tu cuerpo ya lleva tiempo tratando de decírtelo. Cada noche que no duermes, cada comida que te saltas, cada momento de descanso que conviertes en productividad — es una señal que estás ignorando.",manifestations:"No sabes descansar sin sentir que pierdes tiempo. Siempre persigues la próxima meta. No celebras tus logros. Tu agenda está llena — y tú estás vacío.",phrases:"'No puedo parar ahora, después descanso.' 'Si dejo de producir, dejo de merecer.' 'Necesito demostrar que valgo.' 'Todo depende de mí.'",futureBlock:"El burnout no avisa. Llega cuando ya no puedes más. Y entonces todo lo que construiste se siente como una condena, no como un logro.",liberation:"SER precede al HACER. Pero eso requiere sentarse con el silencio sin escapar hacia la próxima tarea."},
  exitosaVacia:{name:"El/La Exitoso/a Vacío/a",emoji:"🏆",painHook:"Lo lograste todo. El título, el puesto, el dinero, el reconocimiento. Y hay un silencio que nadie ve. Porque por fuera eres el ejemplo. Por dentro te preguntas: ¿esto era todo? Construiste según el plano de otra persona. Ahora vives en esa casa y no se siente tuya.",core:"Lo tienes todo — menos a ti. Este personaje no nació del éxito. Nació de la herida de no sentirse suficiente.",shadow:"No es ingratitud. Es que el mapa que seguiste no era el tuyo.",costBlood:"El vacío no desaparece con más logros. Con cada nuevo éxito, la pregunta crece. Estás perdiendo tu humanidad, tu derecho a quebrarte. Y nadie sabe lo solo que te sientes en realidad.",teaser3:"Este personaje tiene una grieta que el próximo logro no va a cerrar. Lo sientes cada vez que recibes un aplauso que por dentro suena vacío. Cada vez que alguien dice 'qué envidia tu vida' y tú piensas: si supieran.",manifestations:"Estás constantemente ocupado. No sabes recibir reconocimiento sin justificarlo. No celebras tus logros. No te permites quebrarte. Lloras en silencio. Tus vínculos son superficiales.",phrases:"'Lo tengo todo… pero me siento solo.' 'No puedo parar ahora.' 'Me felicitan, pero no me conocen de verdad.' '¿Esto era todo? Pensé que se iba a sentir distinto.'",futureBlock:"La siguiente crisis no será de cansancio — será existencial. Una pregunta que no tiene respuesta en los logros: ¿para qué construí todo esto?",liberation:"Lo que construiste no está mal. Lo que falta es saber quién eres cuando no tienes que demostrar nada."},
  espiritualReprimida:{name:"El/La Espiritual Reprimido/a",emoji:"🔮",painHook:"Encontraste en la espiritualidad una tabla de salvación. Estabas tan herido, tan roto, tan vacío que necesitabas algo que te sostuviera. Y lo encontraste. Pero con el tiempo convertiste la espiritualidad en un nuevo personaje. Uno que habla de amor pero no se ama. Que habla de luz pero no se permite ser humano.",core:"Meditas, visualizas, afirmas, estudias conciencia. Pero por dentro sigues sintiéndote vacío o desconectado. Dices 'todo pasa por algo' cuando en realidad no te permites sentir el duelo. Estás 'alineado' pero no sientes. 'Conectado' pero no encarnado.",shadow:"No es sabiduría. Es represión disfrazada de conciencia. Cuando reprimes tu sombra, también te alejas de tu luz verdadera.",costBlood:"Estás perdiendo tu humanidad. Tu capacidad de sentir sin censura. Tu conexión con el cuerpo, el placer, la rabia, el deseo. Hace tiempo que no te sientas con tu sombra. Y esa es la conexión que más necesitas recuperar.",teaser3:"Este personaje usa la luz como escondite. Cada vez que dices 'ya lo solté' sin haberlo sentido, cada vez que 'proteges tu energía' en lugar de enfrentar lo que te incomoda — el disfraz se refuerza.",manifestations:"Usas frases espirituales como defensa emocional. Evitas el conflicto disfrazándolo de 'preservar tu paz'. No te permites sentir rabia o miedo porque 'baja la vibración'. Buscas respuestas afuera pero te cuesta escucharte adentro.",phrases:"'Todo es perfecto.' 'Ya lo trabajé, eso está sanado.' 'No debo engancharme, debo soltar.' 'Estoy bien.' (porque no sabes cómo decir: me siento perdido)",futureBlock:"Seguirás usando la espiritualidad como anestesia. Y un día la anestesia ya no va a alcanzar. Y lo que estaba debajo — la rabia, la soledad, el miedo — va a salir todo junto. Sin filtro.",liberation:"Soltar este personaje no es dejar de ser espiritual. Es permitirte ser espiritual sin dejar de ser humano. Baja al cuerpo. Siéntelo. Eso es conexión real."},
};

const QS=[
  {id:1,type:"i",text:"Cuando algo no sale como lo planeaste, ¿qué es lo primero que sientes?",opts:[{text:"Ansiedad. Necesito retomar el control rápido.",chars:["controladora","proveedora"],w:3,pain:2},{text:"Frustración, pero lo proceso y sigo.",chars:[],w:0,pain:1},{text:"Soy flexible. Los cambios no me afectan mucho.",chars:[],w:0},{text:"Culpa. Siento que fallé en algo.",chars:["salvadora"],w:2,pain:2}]},
  {id:2,type:"i",text:"¿Con qué frecuencia priorizas las necesidades de otros sobre las tuyas?",opts:[{text:"Casi siempre. Es automático, ni lo pienso.",chars:["salvadora","invisible"],w:3,pain:3,disp:-1},{text:"Con frecuencia, aunque a veces me cuido.",chars:["salvadora"],w:2,pain:2},{text:"Lo balanceo bien.",chars:[],w:0,disp:1},{text:"Me cuido a mí primero sin culpa.",chars:[],w:0,disp:2}]},
  {id:3,type:"i",text:"Cuando hay conflicto en tus relaciones importantes, ¿qué haces?",opts:[{text:"Me callo para no empeorar la situación.",chars:["invisible"],w:3,pain:3,disp:-1,con:"invisible"},{text:"Intento resolver para que todos estén bien.",chars:["salvadora","controladora"],w:2,pain:2},{text:"Lo enfrento directamente, aunque sea incómodo.",chars:[],w:0,pain:1,disp:2},{text:"Me alejo en silencio y vuelvo cuando baja la tensión.",chars:["invisible"],w:1,pain:2}]},
  {id:4,type:"f",text:"¿Cómo describirías tu situación profesional hoy?",opts:[{text:"Tengo empleo o negocio establecido, pero algo no encaja.",filter:"employed",pain:2,disp:2},{text:"Soy emprendedor o trabajo de manera independiente.",filter:"entrepreneur",pain:2,disp:3},{text:"Estoy en transición — dejé algo o estoy buscando qué sigue.",filter:"transition",pain:3,disp:4},{text:"No estoy trabajando en este momento.",filter:"unemployed",pain:1,disp:0}]},
  {id:5,type:"i",text:"¿Qué pasa en tu cuerpo cuando no tienes nada pendiente o en qué ocuparte?",opts:[{text:"Inquietud. Me siento culpable si no estoy produciendo.",chars:["proveedora","controladora"],w:3,pain:2},{text:"Un poco incómodo, pero lo tolero.",chars:["proveedora"],w:1,pain:1},{text:"Disfruto descansar sin problema.",chars:[],w:0},{text:"No sé. Hace tanto que no paro que no recuerdo.",chars:["proveedora","exitosaVacia"],w:3,pain:3}]},
  {id:6,type:"i",text:"¿Cuándo fue la última vez que hiciste algo solo para ti, sin justificarlo o sentir culpa?",opts:[{text:"No recuerdo.",chars:["salvadora","proveedora","exitosaVacia"],w:3,pain:3,disp:3},{text:"Hace mucho. Casi no me pasa.",chars:["salvadora","proveedora"],w:2,pain:2,disp:2},{text:"Hace poco. Intento hacerlo.",chars:[],w:1,disp:1},{text:"Regularmente. Me cuido sin culpa.",chars:[],w:0}]},
  {id:7,type:"i",text:"Cuando alguien cercano toma una decisión que consideras equivocada, ¿qué haces?",opts:[{text:"Siento urgencia de intervenir y corregirlo.",chars:["controladora"],w:3,pain:1},{text:"Lo señalo aunque no me lo pidan.",chars:["controladora","salvadora"],w:2,pain:1},{text:"Expreso mi opinión una vez y dejo que decida.",chars:[],w:0},{text:"Es su vida. Respeto sin opinar.",chars:[],w:0}]},
  {id:8,type:"i",text:"Si alguien cercano te decepcionó, ¿qué haces normalmente?",opts:[{text:"Me lo guardo. No quiero generar más problemas.",chars:["invisible"],w:3,pain:2,con:"invisible"},{text:"Lo proceso solo y sigo como si nada.",chars:["invisible"],w:2,pain:2},{text:"Lo hablo directamente con esa persona.",chars:[],w:0,disp:2},{text:"Me alejo en silencio.",chars:["invisible"],w:2,pain:2}]},
  {id:9,type:"f",text:"¿Qué tan urgente se siente para ti hacer algo diferente en tu vida ahora mismo?",opts:[{text:"Muy urgente. Si no es ahora, voy a seguir igual para siempre.",filter:"urgent",pain:3,disp:4},{text:"Urgente. Sé que necesito moverme pero no sé por dónde.",filter:"ready",pain:3,disp:3},{text:"Lo sé, pero todavía no me siento listo.",filter:"notready",pain:2,disp:1},{text:"Estoy explorando, no hay urgencia real.",filter:"exploring",pain:1,disp:0}]},
  {id:10,type:"i",text:"¿Cómo describes tu relación con el éxito y los logros hoy?",opts:[{text:"Logré mucho pero no siento lo que esperaba sentir.",chars:["exitosaVacia"],w:3,pain:3,disp:3},{text:"Sigo trabajando duro porque temo perder lo que tengo.",chars:["proveedora","controladora"],w:2,pain:2,disp:2},{text:"Estoy en proceso. No tengo claridad todavía.",chars:["exitosaVacia"],w:1,pain:2,disp:2},{text:"Equilibrado. Disfruto lo que construí.",chars:[],w:0}]},
  {id:11,type:"i",text:"¿Qué tan difícil es para ti pedir ayuda cuando la necesitas?",opts:[{text:"Muy difícil. Prefiero resolver solo aunque me cueste.",chars:["controladora","proveedora"],w:3,pain:2,disp:-1},{text:"Me cuesta pero a veces lo hago.",chars:["controladora"],w:1,disp:1},{text:"Pido ayuda sin problema cuando la necesito.",chars:[],w:0,disp:2},{text:"Depende. Con unas personas sí, con otras no.",chars:[],w:1,disp:1}]},
  {id:12,type:"i",text:"Cuando piensas en tu infancia, ¿cuál de estas frases resuena más?",opts:[{text:"Había que ser fuerte. No se podía fallar.",chars:["controladora","proveedora"],w:3,pain:3,con:"hero"},{text:"Era mejor no molestar. Estar callado era más seguro.",chars:["invisible"],w:3,pain:3,con:"invisible"},{text:"Yo cuidaba de los demás antes que de mí.",chars:["salvadora"],w:3,pain:3,con:"parentification"},{text:"El amor llegaba cuando cumplía las expectativas.",chars:["exitosaVacia","controladora"],w:3,pain:3,con:"perfectionist"}]},
  {id:13,type:"i",text:"¿Cuándo fue la última vez que alguien te vio o te mostraste — de verdad — como eres?",opts:[{text:"Hace mucho. O quizás nunca.",chars:["invisible","exitosaVacia"],w:3,pain:3,disp:3},{text:"Hay pocas personas que me conocen de verdad.",chars:["invisible"],w:2,pain:2,disp:2},{text:"Me siento comprendido con frecuencia.",chars:[],w:0},{text:"La gente me ve, pero solo por mis logros.",chars:["exitosaVacia","proveedora"],w:2,pain:2,disp:2}]},
  {id:14,type:"f",text:"Si supieras exactamente qué está bloqueando tu vida y tuvieras un proceso claro para desbloquearlo, ¿estarías dispuesto a invertir en eso?",opts:[{text:"Sí, sin duda. Si es lo que necesito, invierto.",filter:"investor_high",pain:3,disp:4,invest:true},{text:"Sí, dependiendo del monto y lo que incluya.",filter:"investor_mid",pain:2,disp:2,invest:true},{text:"Tal vez, pero ahora no es el momento económico.",filter:"investor_low",pain:2,disp:1,invest:false},{text:"Prefiero explorar opciones gratuitas primero.",filter:"investor_none",pain:1,disp:0,invest:false}]},
  {id:15,type:"i",text:"Si mañana pudieras cambiar una sola cosa de tu vida, ¿cuál sería?",opts:[{text:"Sentir que lo que hago tiene sentido para mí.",chars:["exitosaVacia"],w:3,pain:3,disp:3},{text:"Tener más tiempo y energía para mí.",chars:["proveedora","salvadora"],w:2,pain:2,disp:2},{text:"Relaciones más auténticas y profundas.",chars:["invisible","salvadora"],w:2,pain:2,disp:2},{text:"Menos miedo. Más confianza en mí.",chars:["controladora"],w:2,pain:2,disp:2}]},
  {id:16,type:"i",text:"Cuando algo te duele, ¿cuál es tu primera reacción?",opts:[{text:"Me repito que 'todo pasa por algo' e intento soltarlo rápido.",chars:["espiritualReprimida"],w:3,pain:2},{text:"Busco una señal, una carta o una respuesta afuera de mí.",chars:["espiritualReprimida"],w:2,pain:2},{text:"Lo siento, lloro si hace falta y después lo proceso.",chars:[],w:0,disp:2},{text:"Me lo trago y sigo funcionando.",chars:["proveedora","invisible"],w:2,pain:2}]},
  {id:17,type:"i",text:"¿Alguna vez has sentido que la imagen que proyectas por fuera no coincide con lo que sientes por dentro?",opts:[{text:"Siempre. Proyecto calma o conciencia pero por dentro estoy destruido.",chars:["espiritualReprimida","exitosaVacia"],w:3,pain:3,disp:3},{text:"A veces. Sobre todo cuando tengo que mostrarme fuerte ante otros.",chars:["proveedora","controladora"],w:2,pain:2,disp:2},{text:"Rara vez. Suelo ser bastante transparente.",chars:[],w:0},{text:"Siempre me muestro fuerte, pero nadie sabe lo que realmente cargo.",chars:["exitosaVacia","invisible"],w:2,pain:2,disp:2}]},
  {id:18,type:"i",text:"Cuando estás solo o sola, sin distracciones, ¿qué aparece?",opts:[{text:"Ruido mental. Necesito hacer algo para no sentir.",chars:["proveedora","controladora"],w:2,pain:2},{text:"Vacío. Como si faltara algo que no sé nombrar.",chars:["exitosaVacia"],w:3,pain:3,disp:3},{text:"Ansiedad de que debería estar haciendo algo productivo.",chars:["proveedora"],w:2,pain:2},{text:"Nada particular. Disfruto estar conmigo.",chars:[],w:0}]},
];

function scoreAll(answers,reading){
  const ch={controladora:0,salvadora:0,invisible:0,proveedora:0,exitosaVacia:0,espiritualReprimida:0};
  const cv={};let pain=0,pn=0,disp=0,fd={};
  answers.forEach(({qid,oi})=>{const q=QS.find(q=>q.id===qid);if(!q)return;const o=q.opts[oi];if(!o)return;
    if(q.type==="i"){(o.chars||[]).forEach(c=>{if(c in ch)ch[c]+=(o.w||0);});if(o.con)cv[o.con]=(cv[o.con]||0)+1;}
    if(q.type==="f")fd[q.id]=o;if(o.pain!==undefined){pain+=o.pain;pn++;}if(o.disp!==undefined)disp+=o.disp;});
  const mods={Tierra:{controladora:1,proveedora:1},Agua:{salvadora:1,invisible:1},Fuego:{proveedora:1,exitosaVacia:1},Aire:{invisible:1,espiritualReprimida:1}};
  if(reading?.element&&mods[reading.element])Object.entries(mods[reading.element]).forEach(([k,v])=>{ch[k]+=v;});
  const sorted=Object.entries(ch).sort((a,b)=>b[1]-a[1]);
  const pri=sorted[0][0],sec=sorted[1][1]>=sorted[0][1]*0.55?sorted[1][0]:null;
  const tc=Object.entries(cv).sort((a,b)=>b[1]-a[1])[0];
  return{primary:CHARS[pri],secondary:sec?CHARS[sec]:null,constellation:CONST[tc?.[0]]||CONST.hero,avgPain:pn>0?pain/pn:0,disp,willingToInvest:fd[14]?.invest===true,urgency:fd[9]?.filter,profession:fd[4]?.filter};
}

async function pushGHL(ud,res){
  try{await fetch(CONFIG.ghl_webhook,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:ud.name,email:ud.email,birthdate:ud.birthdate,birth_time:ud.birthtime||"",gender:ud.gender,country:ud.country,province:ud.province||"",personaje:res.primary.name,personaje_secundario:res.secondary?.name||"",pain_score:res.avgPain,disposition:res.disp,willing_invest:res.willingToInvest,urgency:res.urgency||"",profession:res.profession||"",source:"diagnostico-identidad",ts:new Date().toISOString()})});}catch(e){}
}

const css=`
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Poppins:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Poppins',sans-serif;background:#0A0A0A;color:#F5F0E8;min-height:100vh;-webkit-font-smoothing:antialiased;}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.screen{min-height:100vh;display:flex;flex-direction:column;animation:fadeIn .4s ease;}
.btn{display:block;width:100%;padding:16px 20px;background:#C0392B;border:none;border-radius:3px;color:#fff;font-family:'Poppins',sans-serif;font-size:13px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;transition:background .2s,transform .15s;text-align:center;text-decoration:none;}
.btn:hover:not(:disabled){background:#922B21;transform:translateY(-2px);}
.btn:active:not(:disabled){transform:translateY(0);}
.btn:disabled{opacity:.3;cursor:not-allowed;}
.sl{font-size:12px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#E74C3C;margin-bottom:12px;}
.st{font-size:16px;line-height:1.8;color:rgba(245,240,232,.85);}
.foot{text-align:center;padding:24px 20px;font-size:11px;color:rgba(245,240,232,.18);letter-spacing:2px;text-transform:uppercase;}
`;
const iS=()=>({width:"100%",padding:"12px 16px",background:"rgba(245,240,232,.05)",border:"1px solid rgba(245,240,232,.12)",borderRadius:3,color:"#F5F0E8",fontFamily:"'Poppins',sans-serif",fontSize:15,outline:"none",transition:"border-color .2s"});
const lS=()=>({display:"block",fontSize:11,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(245,240,232,.45)",marginBottom:8});

export default function App(){
  const[screen,setScreen]=useState("hero");
  const[ud,setUd]=useState(null);
  const[result,setResult]=useState(null);
  const onQuizDone=answers=>{
    setScreen("loading");
    const rd=getFullReading(ud.birthdate,ud.birthtime||"no_conozco");
    const r=scoreAll(answers,rd);r.reading=rd;
    setResult(r);pushGHL(ud,r);
    setTimeout(()=>setScreen("teaser"),3200);
  };
  return(<div style={{minHeight:"100vh",background:"#0A0A0A"}}><style>{css}</style>
    {screen==="hero"    &&<Hero    onStart={()=>setScreen("form")}/>}
    {screen==="form"    &&<Form    onSubmit={d=>{setUd(d);setScreen("quiz");}}/>}
    {screen==="quiz"    &&<Quiz    onComplete={onQuizDone}/>}
    {screen==="loading" &&<Loading/>}
    {screen==="teaser"  &&<Teaser  result={result} ud={ud}/>}
  </div>);
}

function Hero({onStart}){return(
  <div className="screen" style={{justifyContent:"center",alignItems:"center",textAlign:"center",padding:"52px 24px",background:"radial-gradient(ellipse at 50% 0%,#1c0606 0%,#0a0a0a 65%)"}}>
    <p style={{fontSize:11,fontWeight:600,letterSpacing:5,textTransform:"uppercase",color:"#C0392B",marginBottom:32}}>Ingeniería de Identidad</p>
    <h1 style={{fontFamily:"'Lora',serif",fontSize:"clamp(36px,8vw,64px)",fontWeight:700,lineHeight:1.06,color:"#F5F0E8",marginBottom:20,maxWidth:600}}>
      ¿Quién está<br/><em style={{color:"#C0392B"}}>viviendo tu vida?</em>
    </h1>
    <div style={{width:40,height:2,background:"#C0392B",margin:"0 auto 24px"}}/>
    <p style={{fontSize:17,fontWeight:300,color:"rgba(245,240,232,.6)",lineHeight:1.7,maxWidth:440,margin:"0 auto 12px"}}>
      Hace años construiste un personaje para sobrevivir. El problema es que funcionó.
    </p>
    <p style={{fontSize:16,fontWeight:300,color:"rgba(245,240,232,.45)",lineHeight:1.7,maxWidth:440,margin:"0 auto 44px"}}>
      Y ahora ese personaje toma las decisiones, cobra el dinero, aparece en las fotos — y lo peor: ya lo normalizaste.
    </p>
    <button className="btn" style={{maxWidth:340,fontSize:14}} onClick={onStart}>Descubrir qué personaje me controla →</button>
    <p style={{marginTop:18,fontSize:12,color:"rgba(245,240,232,.22)",letterSpacing:1}}>5 minutos · Diagnóstico personalizado</p>
  </div>
);}

function Form({onSubmit}){
  const[f,setF]=useState({name:"",email:"",birthdate:"",birthtime:"",gender:"",country:"",province:""});
  const ok=f.name&&f.email&&f.birthdate&&f.gender&&f.country;
  const set=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  return(
  <div className="screen" style={{justifyContent:"center",alignItems:"center",padding:"48px 20px",background:"#0a0a0a"}}>
    <div style={{width:"100%",maxWidth:460,background:"#111",border:"1px solid rgba(192,57,43,.18)",borderRadius:4,padding:"38px 34px"}}>
      <h2 style={{fontFamily:"'Lora',serif",fontSize:26,fontWeight:700,color:"#F5F0E8",marginBottom:8}}>Antes de comenzar</h2>
      <p style={{fontSize:14,color:"rgba(245,240,232,.4)",marginBottom:30,lineHeight:1.5}}>Esta información personaliza tu lectura. No se comparte con nadie.</p>
      {[{k:"name",l:"Tu nombre",t:"text",ph:"¿Cómo te llamas?"},{k:"email",l:"Correo electrónico",t:"email",ph:"tu@correo.com"},{k:"birthdate",l:"Fecha de nacimiento",t:"date",ph:""}].map(({k,l,t,ph})=>(
        <div key={k} style={{marginBottom:20}}><label style={lS()}>{l}</label><input style={iS()} type={t} placeholder={ph} value={f[k]} onChange={set(k)}/></div>))}
      <div style={{marginBottom:20}}><label style={lS()}>Hora de nacimiento</label>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <input type="time" style={{...iS(),flex:1}} value={f.birthtime==="no_conozco"?"":f.birthtime} onChange={set("birthtime")} disabled={f.birthtime==="no_conozco"}/>
          <label style={{display:"flex",alignItems:"center",gap:7,fontSize:13,color:"rgba(245,240,232,.5)",cursor:"pointer",flexShrink:0,userSelect:"none"}}>
            <input type="checkbox" checked={f.birthtime==="no_conozco"} onChange={e=>setF(p=>({...p,birthtime:e.target.checked?"no_conozco":""}))} style={{accentColor:"#C0392B",width:16,height:16}}/>No la conozco
          </label>
        </div></div>
      <div style={{marginBottom:20}}><label style={lS()}>Género</label>
        <select style={iS()} value={f.gender} onChange={set("gender")}>
          <option value="" style={{background:"#111"}}>Selecciona...</option>
          <option value="mujer" style={{background:"#111"}}>Mujer</option>
          <option value="hombre" style={{background:"#111"}}>Hombre</option>
          <option value="otro" style={{background:"#111"}}>Otro</option>
        </select></div>
      <div style={{marginBottom:20}}><label style={lS()}>País de nacimiento</label>
        <select style={iS()} value={f.country} onChange={set("country")}>
          <option value="" style={{background:"#111"}}>Selecciona...</option>
          {["Costa Rica","México","Colombia","Argentina","España","Chile","Perú","Venezuela","Ecuador","Guatemala","Otro"].map(c=><option key={c} value={c} style={{background:"#111"}}>{c}</option>)}
        </select></div>
      <div style={{marginBottom:28}}><label style={lS()}>Provincia o lugar de nacimiento</label>
        <input style={iS()} placeholder="¿Dónde naciste?" value={f.province} onChange={set("province")}/></div>
      <button className="btn" onClick={()=>onSubmit(f)} disabled={!ok}>Comenzar diagnóstico →</button>
      <p style={{marginTop:14,fontSize:12,color:"rgba(245,240,232,.22)",textAlign:"center"}}>Tu correo solo se usa para enviarte tu resultado</p>
    </div></div>);}

function Quiz({onComplete}){
  const[idx,setIdx]=useState(0);const[ans,setAns]=useState([]);const[sel,setSel]=useState(null);const q=QS[idx];
  const pick=oi=>{setSel(oi);setTimeout(()=>{const n=[...ans,{qid:q.id,oi}];setAns(n);setSel(null);if(idx<QS.length-1)setIdx(idx+1);else onComplete(n);},280);};
  return(
  <div className="screen" style={{padding:"32px 24px 64px",alignItems:"center",background:"#0a0a0a"}}>
    <div style={{width:"100%",maxWidth:560}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <span style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:"rgba(245,240,232,.28)"}}>Diagnóstico</span>
        <span style={{fontSize:11,fontWeight:600,color:"#E74C3C"}}>{idx+1} / {QS.length}</span>
      </div>
      <div style={{width:"100%",height:3,background:"rgba(245,240,232,.07)",borderRadius:2,marginBottom:38}}>
        <div style={{height:"100%",background:"#C0392B",borderRadius:2,width:`${(idx/QS.length)*100}%`,transition:"width .4s ease"}}/>
      </div>
      <p key={`q${idx}`} style={{fontFamily:"'Lora',serif",fontSize:"clamp(18px,4vw,25px)",fontWeight:600,lineHeight:1.45,color:"#F5F0E8",marginBottom:30}}>{q.text}</p>
      <div key={`o${idx}`} style={{display:"flex",flexDirection:"column",gap:11}}>
        {q.opts.map((o,i)=>(
          <button key={i} onClick={()=>pick(i)} style={{width:"100%",textAlign:"left",padding:"16px 20px",background:sel===i?"rgba(192,57,43,.12)":"rgba(245,240,232,.03)",border:`1px solid ${sel===i?"#C0392B":"rgba(245,240,232,.09)"}`,borderRadius:3,color:sel===i?"#F5F0E8":"rgba(245,240,232,.72)",fontFamily:"'Poppins',sans-serif",fontSize:14,lineHeight:1.5,cursor:"pointer",transition:"all .2s",animation:"fadeUp .3s ease both",animationDelay:`${i*.06+.04}s`}}>
            {o.text}
          </button>))}
      </div></div></div>);}

function Loading(){
  const[m,setM]=useState(0);
  const msgs=["Analizando tus respuestas...","Cruzando patrones de identidad...","Construyendo tu lectura..."];
  useEffect(()=>{const t1=setTimeout(()=>setM(1),1100),t2=setTimeout(()=>setM(2),2300);return()=>{clearTimeout(t1);clearTimeout(t2);};},[]);
  return(
  <div className="screen" style={{justifyContent:"center",alignItems:"center",textAlign:"center",padding:"40px 24px",background:"#0a0a0a"}}>
    <div style={{fontSize:50,marginBottom:30,animation:"pulse 2s infinite"}}>🔍</div>
    <h2 style={{fontFamily:"'Lora',serif",fontSize:24,fontWeight:600,color:"#F5F0E8",marginBottom:12}}>{msgs[m]}</h2>
    <p style={{fontSize:14,color:"rgba(245,240,232,.38)",maxWidth:300,lineHeight:1.65}}>Cada respuesta tiene una capa que no es visible a primera vista.</p>
  </div>);}

function Teaser({result,ud}){
  if(!result)return null;
  const{primary:p,secondary:s}=result;
  const first=ud.name.split(" ")[0];
  return(
  <div className="screen" style={{background:"#0a0a0a"}}>
    <div style={{background:"linear-gradient(160deg,#1c0606 0%,#0a0a0a 100%)",padding:"52px 24px 40px",textAlign:"center",borderBottom:"1px solid rgba(192,57,43,.16)"}}>
      <p style={{fontSize:11,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:"rgba(245,240,232,.4)",marginBottom:12}}>Tu diagnóstico, {first}</p>
      <span style={{fontSize:46,display:"block",marginBottom:14}}>{p.emoji}</span>
      <h1 style={{fontFamily:"'Lora',serif",fontSize:"clamp(30px,7vw,52px)",fontWeight:700,color:"#F5F0E8",lineHeight:1.1,marginBottom:10}}>{p.name}</h1>
      {s&&<p style={{fontSize:14,color:"rgba(245,240,232,.4)",marginBottom:14}}>con rasgos de <strong style={{color:"rgba(245,240,232,.62)"}}>{s.name}</strong></p>}
      <span style={{display:"inline-block",padding:"6px 18px",background:"rgba(192,57,43,.1)",border:"1px solid rgba(192,57,43,.22)",borderRadius:20,fontSize:12,fontWeight:600,color:"#E74C3C",letterSpacing:1}}>Personaje dominante</span>
    </div>
    <div style={{padding:"36px 24px 0",maxWidth:580,margin:"0 auto",width:"100%"}}>
      <div style={{marginBottom:30}}><p className="sl">De dónde viene</p><p className="st">{p.painHook}</p></div>
      <div style={{marginBottom:30}}><p className="sl">Lo que te está costando hoy</p><p className="st">{p.costBlood}</p></div>
      <div style={{background:"rgba(192,57,43,.07)",borderLeft:"3px solid #C0392B",padding:"18px 22px",marginBottom:10}}>
        <p style={{fontSize:15,lineHeight:1.75,color:"rgba(245,240,232,.8)",fontStyle:"italic"}}>{p.teaser3}</p>
      </div>
    </div>
    <div style={{position:"relative",padding:"0 24px 48px",maxWidth:580,margin:"10px auto 0",width:"100%"}}>
      <div style={{filter:"blur(5px)",userSelect:"none",pointerEvents:"none",opacity:.48,padding:"22px 0"}}>
        <p style={{fontSize:15,lineHeight:1.75,color:"rgba(245,240,232,.7)",marginBottom:14}}>Tu identidad real — esa que no estás utilizando — fue diseñada para algo mucho más grande que este personaje. Hay una vida que está esperándote y que este personaje te está impidiendo vivir...</p>
        <p style={{fontSize:15,lineHeight:1.75,color:"rgba(245,240,232,.7)"}}>Tu lectura profunda revela exactamente para qué fuiste diseñado, qué dones traes, y cómo el personaje los bloquea cada día que pasa...</p>
      </div>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:"20px 24px"}}>
        <span style={{fontSize:30,marginBottom:12}}>🔒</span>
        <h3 style={{fontFamily:"'Lora',serif",fontSize:21,fontWeight:700,color:"#F5F0E8",marginBottom:10,lineHeight:1.3}}>Lo que acabas de ver es solo el 40% de tu diagnóstico.</h3>
        <p style={{fontSize:14,color:"rgba(245,240,232,.5)",marginBottom:8,lineHeight:1.65,maxWidth:320}}>Lo que sigue es lo que nadie te ha dicho — los patrones que están definiendo cómo te perciben en este momento, aunque tú no los veas.</p>
        <p style={{fontSize:14,color:"rgba(245,240,232,.5)",marginBottom:8,lineHeight:1.65,maxWidth:320}}>Y hay algo más: una lectura de quién realmente eres. Y de cuánto lo estás desperdiciando.</p>
        <p style={{fontSize:15,fontWeight:600,color:"rgba(245,240,232,.72)",marginBottom:26}}>¿Prefieres no saberlo?</p>
        <button className="btn" style={{maxWidth:280}} onClick={()=>{window.location.href=CONFIG.ghl_order_form;}}>Quiero saber todo →</button>
      </div>
    </div>
    <div className="foot">@ileanamentora · Ingeniería de Identidad</div>
  </div>);}
