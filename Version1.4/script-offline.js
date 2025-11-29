// Diccionario offline de palabras con imágenes locales
const palabras = [
    {
        palabra: "manzana",
        imagen: "imagenes/manzana.png",
        silabas: "man-za-na",
        categoria: "frutas"
    },
    {
        palabra: "perro",
        imagen: "imagenes/perro.png",
        silabas: "pe-rro",
        categoria: "animales"
    },
    {
        palabra: "gato",
        imagen: "imagenes/gato.png",
        silabas: "ga-to",
        categoria: "animales"
    },
    {
        palabra: "sol",
        imagen: "imagenes/sol.png",
        silabas: "sol",
        categoria: "naturaleza"
    },
    {
        palabra: "abeja",
        imagen: "imagenes/abeja.png",
        silabas: "a-be-ja",
        categoria: "insectos"
    },
    {
        palabra: "árbol",
        imagen: "imagenes/arbol.png",
        silabas: "ár-bol",
        categoria: "naturaleza"
    },
    {
        palabra: "pelota",
        imagen: "imagenes/pelota.png",
        silabas: "pe-lo-ta",
        categoria: "objetos"
    },
    {
        palabra: "auto",
        imagen: "imagenes/auto.png",
        silabas: "au-to",
        categoria: "objetos"
    },
    {
        palabra: "banana",
        imagen: "imagenes/banana.png",
        silabas: "ba-na-na",
        categoria: "frutas"
    },
    {
        palabra: "caballo",
        imagen: "imagenes/caballo.png",
        silabas: "ca-ba-llo",
        categoria: "animal"
    },
    {
        palabra: "conejo",
        imagen: "imagenes/conejo.png",
        silabas: "co-ne-jo",
        categoria: "animales"
    },
    {
        palabra: "estrella",
        imagen: "imagenes/estrella.png",
        silabas: "es-tre-lla",
        categoria: "naturaleza"
    },
    {
        palabra: "cerdo",
        imagen: "imagenes/cerdo.png",
        silabas: "cer-do",
        categoria: "animal"
    },
    {
        palabra: "frutilla",
        imagen: "imagenes/frutilla.png",
        silabas: "fru-ti-lla",
        categoria: "fruta"
    },
    {
        palabra: "galleta",
        imagen: "imagenes/galleta.png",
        silabas: "ga-lle-ta",
        categoria: "comida"
    },
    {
        palabra: "gallina",
        imagen: "imagenes/gallina.png",
        silabas: "ga-lli-na",
        categoria: "animal"
    },
    {
        palabra: "hueso",
        imagen: "imagenes/hueso.png",
        silabas: "hue-so",
        categoria: "objetos"
    },
    {
        palabra: "luna",
        imagen: "imagenes/luna.png",
        silabas: "lu-na",
        categoria: "naturaleza"
    },
    {
        palabra: "mariposa",
        imagen: "imagenes/mariposa.png",
        silabas: "ma-ri-po-sa",
        categoria: "animales"
    },
    {
        palabra: "lapiz",
        imagen: "imagenes/lapiz.png",
        silabas: "la-piz",
        categoria: "objeto"
    },
    {
        palabra: "leon",
        imagen: "imagenes/leon.png",
        silabas: "le-on",
        categoria: "animal"
    },
    {
        palabra: "loro",
        imagen: "imagenes/loro.png",
        silabas: "lo-ro",
        categoria: "animal"
    },
    {
        palabra: "mango",
        imagen: "imagenes/mango.png",
        silabas: "man-go",
        categoria: "fruta"
    },
    {
        palabra: "mesa",
        imagen: "imagenes/mesa.png",
        silabas: "me-sa",
        categoria: "objeto"
    },
    {
        palabra: "mono",
        imagen: "imagenes/mono.png",
        silabas: "mo-no",
        categoria: "animal"
    },
    {
        palabra: "naranja",
        imagen: "imagenes/naranja.png",
        silabas: "na-ran-ja",
        categoria: "fruta"
    },
    {
        palabra: "niña",
        imagen: "imagenes/niña.jpg",
        silabas: "ni-ña",
        categoria: "personas"
    },
    {
        palabra: "niño",
        imagen: "imagenes/niño.png",
        silabas: "ni-ño",
        categoria: "personas"
    },
    {
        palabra: "oveja",
        imagen: "imagenes/oveja.png",
        silabas: "o-ve-ja",
        categoria: "animal"
    },
    {
        palabra: "pajaro",
        imagen: "imagenes/pajaro.png",
        silabas: "pa-ja-ro",
        categoria: "animal"
    },
    {
        palabra: "pescado",
        imagen: "imagenes/pescado.png",
        silabas: "pes-ca-do",
        categoria: "objeto"
    },
    {
        palabra: "piña",
        imagen: "imagenes/piña.png",
        silabas: "pi-ña",
        categoria: "fruta"
    },
    {
        palabra: "pollito",
        imagen: "imagenes/pollito.png",
        silabas: "po-lli-to",
        categoria: "animal"
    },
    {
        palabra: "rana",
        imagen: "imagenes/rana.png",
        silabas: "ra-na",
        categoria: "animal"
    },
    {
        palabra: "sandia",
        imagen: "imagenes/sandia.png",
        silabas: "san-dia",
        categoria: "fruta"
    },
    {
        palabra: "serpiente",
        imagen: "imagenes/serpiente.png",
        silabas: "ser-pien-te",
        categoria: "animal"
    },
    {
        palabra: "silla",
        imagen: "imagenes/silla.png",
        silabas: "si-lla",
        categoria: "objeto"
    },
    {
        palabra: "television",
        imagen: "imagenes/television.png",
        silabas: "te-le-vi-sion",
        categoria: "objetos"
    },
    {
        palabra: "tigre",
        imagen: "imagenes/tigre.png",
        silabas: "ti-gre",
        categoria: "animal"
    },
    {
        palabra: "tortuga",
        imagen: "imagenes/tortuga.png",
        silabas: "tor-tu-ga",
        categoria: "animal"
    },
    {
        palabra: "vaca",
        imagen: "imagenes/vaca.png",
        silabas: "va-ca",
        categoria: "animal"
    },
    {
        palabra: "zapato",
        imagen: "imagenes/zapato.png",
        silabas: "za-pa-to",
        categoria: "objeto"
    }
];

// Elementos del DOM
const imagenPalabra = document.getElementById('imagen-palabra');
const palabraActual = document.getElementById('palabra-actual');
const silabasPalabra = document.getElementById('silabas-palabra');
const btnMicrofono = document.getElementById('btn-microfono');
const btnEscuchar = document.getElementById('btn-escuchar');
const btnSiguiente = document.getElementById('btn-siguiente');
const btnAnterior = document.getElementById('btn-anterior');
const feedback = document.getElementById('feedback');
const progressFill = document.getElementById('progress-fill');
const contadorPalabras = document.getElementById('contador-palabras');
const contadorIntentos = document.getElementById('contador-intentos');

// Variables de estado para modo aleatorio
let palabrasDisponibles = [];
let palabrasMostradas = [];
let palabraActualObj = null;
let reconocimientoVoz;
let sintesisVoz;
let grabando = false;
let intentosRestantes = 12;

// Mensajes de motivación
const mensajesMotivacion = [
    "¡Excelente trabajo! Eres muy inteligente",
    "¡Wow! Lo hiciste perfectamente",
    "¡Increíble! Pronunciaste muy bien",
    "¡Fenomenal! Sigue así",
    "¡Maravilloso! Eres un campeón",
    "¡Perfecto! Tu pronunciación es excelente",
    "¡Bravo! Lo hiciste muy bien",
    "¡Genial! Estás aprendiendo rápido",
    "¡Fantástico! Eres un super niño",
    "¡Impresionante! Tu esfuerzo vale la pena"
];

// Frases de ánimo durante el intento
const frasesAnimio = [
    "¡Tú puedes! Intenta decirlo claramente",
    "¡Vamos! Estás muy cerca",
    "¡Eres capaz! Concéntrate en la palabra",
    "¡No te rindas! La práctica hace al maestro",
    "¡Sigue intentando! Cada error te acerca al éxito",
    "¡Respira hondo y vuelve a intentarlo!",
    "¡Confía en ti mismo! Lo estás haciendo bien",
    "¡Muy bien! Sigue practicando",
    "¡Estás mejorando! Sigue así",
    "¡Qué bien lo intentas! Sigue practicando"
];

// SVG de imagen por defecto
const imagenPorDefecto = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2YzcyN2QiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW4gbm8gZW5jb250cmFkYTwvdGV4dD48L3N2Zz4=';

// Función para cambiar entre modos
function configurarCambioModo() {
    const btnCambiarModo = document.getElementById('btn-cambiar-modo');
    
    if (btnCambiarModo) {
        btnCambiarModo.addEventListener('click', function() {
            // Redirigir al modo reconocimiento (Imagga)
            window.location.href = 'index.html';
        });
    }
}

// Inicializar la aplicación
function inicializarApp() {
    console.log("Inicializando aplicación offline...");
    
    // Configurar cambio de modo
    configurarCambioModo();
    
    // Inicializar arrays para modo aleatorio
    palabrasDisponibles = [...palabras];
    palabrasMostradas = [];
    
    // Mezclar palabras disponibles
    mezclarPalabras();
    
    // Verificar compatibilidad con reconocimiento de voz
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        feedback.innerHTML = '<p>Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.</p>';
        btnMicrofono.disabled = true;
    } else {
        // Configurar reconocimiento de voz
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        reconocimientoVoz = new SpeechRecognition();
        reconocimientoVoz.continuous = false;
        reconocimientoVoz.interimResults = false;
        reconocimientoVoz.lang = 'es-ES';
        
        // Eventos del reconocimiento de voz
        reconocimientoVoz.onstart = function() {
            grabando = true;
            btnMicrofono.classList.add('recording');
            btnMicrofono.querySelector('.text').textContent = 'Escuchando...';
            feedback.innerHTML = '<p>Escuchando... Di la palabra</p>';
        };
        
        reconocimientoVoz.onend = function() {
            grabando = false;
            btnMicrofono.classList.remove('recording');
            btnMicrofono.querySelector('.text').textContent = 'Presiona para hablar';
        };
        
        reconocimientoVoz.onresult = function(event) {
            const transcript = event.results[0][0].transcript.toLowerCase().trim();
            verificarPronunciacion(transcript);
        };
        
        reconocimientoVoz.onerror = function(event) {
            console.error('Error en reconocimiento de voz:', event.error);
            feedback.innerHTML = '<p>Error al escuchar. Intenta de nuevo.</p>';
            grabando = false;
            btnMicrofono.classList.remove('recording');
            btnMicrofono.querySelector('.text').textContent = 'Presiona para hablar';
        };
    }
    
    // Verificar compatibilidad con síntesis de voz
    if (!('speechSynthesis' in window)) {
        feedback.innerHTML = '<p>Tu navegador no soporta síntesis de voz.</p>';
        btnEscuchar.disabled = true;
    } else {
        sintesisVoz = window.speechSynthesis;
    }
    
    // Configurar botones
    btnMicrofono.addEventListener('click', toggleGrabacion);
    btnEscuchar.addEventListener('click', pronunciarPalabra);
    btnSiguiente.addEventListener('click', siguientePalabra);
    btnAnterior.addEventListener('click', anteriorPalabra);
    
    // Mostrar primera palabra aleatoria
    mostrarPalabraAleatoria();
}

// Mezclar array de palabras
function mezclarPalabras() {
    for (let i = palabrasDisponibles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [palabrasDisponibles[i], palabrasDisponibles[j]] = [palabrasDisponibles[j], palabrasDisponibles[i]];
    }
}

// Obtener palabra aleatoria
function obtenerPalabraAleatoria() {
    // Si ya mostramos todas las palabras, reiniciamos
    if (palabrasMostradas.length >= palabrasDisponibles.length) {
        palabrasMostradas = [];
        mezclarPalabras();
    }
    
    // Buscar una palabra que no se haya mostrado
    for (let i = 0; i < palabrasDisponibles.length; i++) {
        const palabra = palabrasDisponibles[i];
        if (!palabrasMostradas.includes(palabra.palabra)) {
            palabrasMostradas.push(palabra.palabra);
            return palabra;
        }
    }
    
    // Si no encuentra, reiniciar
    palabrasMostradas = [];
    mezclarPalabras();
    return obtenerPalabraAleatoria();
}

// Mostrar palabra aleatoria
function mostrarPalabraAleatoria() {
    palabraActualObj = obtenerPalabraAleatoria();
    
    if (!palabraActualObj) {
        feedback.innerHTML = '<p>No hay más palabras disponibles.</p>';
        return;
    }
    
    console.log(`Mostrando palabra: ${palabraActualObj.palabra}`);
    
    // Cargar imagen local
    imagenPalabra.src = palabraActualObj.imagen;
    imagenPalabra.alt = palabraActualObj.palabra;
    
    // Manejar errores de carga
    imagenPalabra.onerror = function() {
        console.error(`No se pudo cargar la imagen: ${palabraActualObj.imagen}`);
        this.src = imagenPorDefecto;
        feedback.innerHTML = `<p>Imagen no encontrada: ${palabraActualObj.palabra}</p>`;
    };
    
    imagenPalabra.onload = function() {
        console.log(`✓ Imagen cargada correctamente: ${palabraActualObj.palabra}`);
    };
    
    palabraActual.textContent = palabraActualObj.palabra;
    silabasPalabra.textContent = palabraActualObj.silabas;
    
    // Actualizar progreso
    const progreso = (palabrasMostradas.length / palabrasDisponibles.length) * 100;
    progressFill.style.width = `${progreso}%`;
    contadorPalabras.textContent = `${palabrasMostradas.length}/${palabrasDisponibles.length}`;
    
    // En modo aleatorio, deshabilitar botón anterior
    btnAnterior.disabled = true;
    
    // Reiniciar estado
    reiniciarIntento();
}

// Reiniciar intento para nueva palabra
function reiniciarIntento() {
    intentosRestantes = 12;
    actualizarContadorIntentos();
    feedback.innerHTML = '<p>¡Di la palabra que ves en la imagen!</p>';
    feedback.className = 'feedback';
    btnMicrofono.disabled = false;
    btnSiguiente.disabled = false;
}

// Pronunciar la palabra actual
function pronunciarPalabra() {
    if (!sintesisVoz || !palabraActualObj) {
        feedback.innerHTML = '<p>La síntesis de voz no está disponible.</p>';
        return;
    }
    
    // Detener cualquier síntesis en curso
    sintesisVoz.cancel();
    
    // Crear utterance
    const utterance = new SpeechSynthesisUtterance(palabraActualObj.palabra);
    utterance.lang = 'es-ES';
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    
    // Efecto visual mientras se reproduce
    btnEscuchar.classList.add('playing');
    feedback.innerHTML = '<p>Escuchando pronunciación...</p>';
    
    utterance.onend = function() {
        btnEscuchar.classList.remove('playing');
        feedback.innerHTML = '<p>¡Ahora intenta tú! Presiona el micrófono.</p>';
    };
    
    utterance.onerror = function(event) {
        console.error('Error en síntesis de voz:', event);
        btnEscuchar.classList.remove('playing');
        feedback.innerHTML = '<p>Error al reproducir el audio.</p>';
    };
    
    // Reproducir
    sintesisVoz.speak(utterance);
}

// Alternar grabación
function toggleGrabacion() {
    if (!reconocimientoVoz) {
        feedback.innerHTML = '<p>El reconocimiento de voz no está disponible.</p>';
        return;
    }
    
    if (intentosRestantes <= 0) {
        feedback.innerHTML = '<p>¡Se acabaron los intentos! Pasa a la siguiente palabra.</p>';
        return;
    }
    
    if (grabando) {
        reconocimientoVoz.stop();
    } else {
        reconocimientoVoz.start();
    }
}

// Verificar pronunciación
function verificarPronunciacion(transcript) {
    if (!palabraActualObj) return;
    
    const palabraCorrecta = palabraActualObj.palabra.toLowerCase();
    console.log(`Palabra dicha: "${transcript}", Correcta: "${palabraCorrecta}"`);
    
    // Reducir intentos
    intentosRestantes--;
    actualizarContadorIntentos();
    
    // Algoritmo de comparación
    const esCorrecto = compararPalabras(transcript, palabraCorrecta);
    
    if (esCorrecto) {
        const mensajeAleatorio = mensajesMotivacion[Math.floor(Math.random() * mensajesMotivacion.length)];
        feedback.innerHTML = `<p>${mensajeAleatorio}</p>`;
        feedback.className = 'feedback correcto';
        
        // Celebrar
        celebrar();
        animarConVoz(mensajeAleatorio);
        
        // Deshabilitar micrófono hasta cambiar de palabra
        btnMicrofono.disabled = true;
    } else {
        const fraseAnimio = frasesAnimio[Math.floor(Math.random() * frasesAnimio.length)];
        feedback.innerHTML = `<p>Intenta de nuevo. Dijiste: "${transcript}"</p><p class="mensaje-animo">${fraseAnimio}</p>`;
        feedback.className = 'feedback incorrecto';
        
        if (intentosRestantes <= 0) {
            feedback.innerHTML = `<p>¡Se acabaron los intentos! La palabra era "${palabraCorrecta}".</p>`;
            btnMicrofono.disabled = true;
            
            if (sintesisVoz) {
                const utterance = new SpeechSynthesisUtterance(`No te preocupes, la palabra era ${palabraCorrecta}. ¡Sigue practicando!`);
                utterance.lang = 'es-ES';
                utterance.rate = 0.9;
                sintesisVoz.speak(utterance);
            }
        } else {
            setTimeout(() => {
                if (sintesisVoz) {
                    const utterance = new SpeechSynthesisUtterance("Intenta de nuevo, tú puedes");
                    utterance.lang = 'es-ES';
                    utterance.rate = 0.9;
                    sintesisVoz.speak(utterance);
                }
            }, 1000);
        }
    }
}

// Actualizar contador de intentos
function actualizarContadorIntentos() {
    contadorIntentos.textContent = intentosRestantes;
    
    contadorIntentos.classList.remove('bajo', 'critico');
    
    if (intentosRestantes <= 3) {
        contadorIntentos.classList.add('critico');
    } else if (intentosRestantes <= 6) {
        contadorIntentos.classList.add('bajo');
    }
}

// Animación con voz
function animarConVoz(mensaje) {
    if (!sintesisVoz) return;
    
    sintesisVoz.cancel();
    
    const utterance = new SpeechSynthesisUtterance(mensaje);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    utterance.pitch = 1.3;
    
    sintesisVoz.speak(utterance);
}

// Comparación de palabras
function compararPalabras(dicha, correcta) {
    const normalizar = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
    const dichaNormalizada = normalizar(dicha);
    const correctaNormalizada = normalizar(correcta);
    
    if (dichaNormalizada === correctaNormalizada) {
        return true;
    }
    
    const variacionesPermitidas = [
        correctaNormalizada,
        correctaNormalizada + 's',
        correctaNormalizada.replace('rr', 'r'),
        correctaNormalizada.replace('ll', 'y'),
        correctaNormalizada + 'a',
        correctaNormalizada + 'o'
    ];
    
    return variacionesPermitidas.includes(dichaNormalizada);
}

// Navegación - Siguiente palabra aleatoria
function siguientePalabra() {
    if (palabrasMostradas.length < palabrasDisponibles.length) {
        mostrarPalabraAleatoria();
    } else {
        // Todas las palabras mostradas
        feedback.innerHTML = '<p>¡Felicidades! Completaste todas las palabras.</p>';
        palabraActual.textContent = '¡Completado!';
        silabasPalabra.textContent = '';
        btnMicrofono.disabled = true;
        btnEscuchar.disabled = true;
        btnSiguiente.disabled = true;
        
        // Mensaje final de felicitación
        if (sintesisVoz) {
            const utterance = new SpeechSynthesisUtterance("¡Felicidades! Has completado todas las palabras. Eres un campeón.");
            utterance.lang = 'es-ES';
            utterance.rate = 0.9;
            sintesisVoz.speak(utterance);
        }
    }
}

// En modo aleatorio, el botón anterior no funciona
function anteriorPalabra() {
    feedback.innerHTML = '<p>¡Estamos en modo aleatorio! Disfruta la sorpresa de cada palabra.</p>';
}

// Efecto de celebración
function celebrar() {
    const card = document.querySelector('.card');
    
    card.classList.add('celebration');
    setTimeout(() => {
        card.classList.remove('celebration');
    }, 500);
    
    crearConfetti();
}

// Crear efecto confetti
function crearConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffd166', '#6ecbf5', '#ff9e6b'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', inicializarApp);