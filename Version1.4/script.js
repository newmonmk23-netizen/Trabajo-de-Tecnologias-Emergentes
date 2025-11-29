// Configuración de la API de Imagga
const IMAGGA_API_KEY = 'acc_740352f20e73bb4'; // Reemplaza con tu API key de Imagga
const IMAGGA_API_SECRET = '966f449359681fa302e8c8e43d0b1924'; // Reemplaza con tu API secret de Imagga

// Elementos del DOM
const imagenPalabra = document.getElementById('imagen-palabra');
const palabraActual = document.getElementById('palabra-actual');
const palabraReconocida = document.getElementById('palabra-reconocida');
const btnMicrofono = document.getElementById('btn-microfono');
const btnEscuchar = document.getElementById('btn-escuchar');
const btnSiguiente = document.getElementById('btn-siguiente');
const feedback = document.getElementById('feedback');
const progressFill = document.getElementById('progress-fill');
const contadorPalabras = document.getElementById('contador-palabras');
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const imageContainer = document.getElementById('image-container');
const contadorIntentos = document.getElementById('contador-intentos');

// Variables de estado
let reconocimientoVoz;
let sintesisVoz;
let grabando = false;
let intentosRestantes = 12;
let imagenActual = null;
let palabraDetectada = null;

// Mensajes de motivación para cuando aciertan
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
            // Redirigir al modo offline
            window.location.href = 'index-offline.html';
        });
    }
}

// Inicializar la aplicación
    function inicializarApp() {
    console.log("Inicializando aplicación...");
    
    // Configurar cambio de modo
    configurarCambioModo();
    
    // Verificar compatibilidad con reconocimiento de voz
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        feedback.innerHTML = '<p>Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.</p>';
        btnMicrofono.disabled = true;
        return;
    }
    
    // Verificar compatibilidad con síntesis de voz
    if (!('speechSynthesis' in window)) {
        feedback.innerHTML = '<p>Tu navegador no soporta síntesis de voz.</p>';
        btnEscuchar.disabled = true;
    } else {
        sintesisVoz = window.speechSynthesis;
    }
    
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
    
    // Configurar botones
    btnMicrofono.addEventListener('click', toggleGrabacion);
    btnEscuchar.addEventListener('click', pronunciarPalabra);
    btnSiguiente.addEventListener('click', reiniciarJuego);
    
    // Configurar zona de arrastrar y soltar
    configurarDropZone();
    
    // Actualizar contador de intentos
    actualizarContadorIntentos();
}

// Configurar la zona de arrastrar y soltar
function configurarDropZone() {
    // Evento para hacer clic en la zona
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Evento para cambiar el archivo seleccionado
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            procesarImagen(e.target.files[0]);
        }
    });
    
    // Eventos para arrastrar y soltar
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        
        if (e.dataTransfer.files.length > 0) {
            procesarImagen(e.dataTransfer.files[0]);
        }
    });
}

// Procesar la imagen subida
function procesarImagen(archivo) {
    // Verificar que sea una imagen
    if (!archivo.type.match('image.*')) {
        feedback.innerHTML = '<p>Por favor, sube solo archivos de imagen.</p>';
        return;
    }
    
    // Mostrar la imagen
    const reader = new FileReader();
    reader.onload = (e) => {
        imagenActual = e.target.result;
        imagenPalabra.src = imagenActual;
        
        // Ocultar zona de drop y mostrar imagen
        dropZone.style.display = 'none';
        imageContainer.style.display = 'block';
        
        // Procesar con Imagga
        analizarImagenConImagga(archivo);
    };
    reader.readAsDataURL(archivo);
}

// Analizar imagen con Imagga API
// Analizar imagen con Imagga API
function analizarImagenConImagga(archivo) {
    feedback.innerHTML = '<p>Analizando imagen...</p>';
    
    // Crear FormData para enviar la imagen
    const formData = new FormData();
    formData.append('image', archivo);
    
    // Realizar la petición a Imagga
    fetch('https://api.imagga.com/v2/tags', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(IMAGGA_API_KEY + ':' + IMAGGA_API_SECRET)
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta de Imagga:', data);
        
        if (data.result && data.result.tags && data.result.tags.length > 0) {
            // Obtener las 3 etiquetas con mayor confianza
            const etiquetasTop = data.result.tags.slice(0, 3);
            console.log('Top 3 etiquetas:', etiquetasTop);
            
            // Intentar traducir cada etiqueta hasta encontrar una válida
            traducirEtiquetasSecuencialmente(etiquetasTop)
                .then(palabraTraducida => {
                    if (palabraTraducida) {
                        palabraDetectada = palabraTraducida;
                        
                        // Mostrar la palabra detectada
                        palabraReconocida.textContent = `¿Es un/una "${palabraDetectada}"?`;
                        palabraActual.textContent = palabraDetectada;
                        
                        // Habilitar funcionalidades
                        btnEscuchar.disabled = false;
                        btnMicrofono.disabled = false;
                        btnSiguiente.disabled = false;
                        
                        // Reiniciar contador de intentos
                        intentosRestantes = 12;
                        actualizarContadorIntentos();
                        
                        feedback.innerHTML = '<p>¡Ahora intenta pronunciar la palabra!</p>';
                        
                        // Pronunciar la palabra automáticamente
                        setTimeout(() => {
                            pronunciarPalabra();
                        }, 1000);
                    } else {
                        feedback.innerHTML = '<p>No se pudo reconocer la imagen en español. Intenta con otra imagen.</p>';
                        palabraReconocida.textContent = '';
                    }
                })
                .catch(error => {
                    console.error('Error en traducción:', error);
                    feedback.innerHTML = '<p>Error al traducir la palabra. Intenta con otra imagen.</p>';
                    palabraReconocida.textContent = '';
                });
        } else {
            feedback.innerHTML = '<p>No se pudo reconocer la imagen. Intenta con otra.</p>';
            palabraReconocida.textContent = '';
        }
    })
    .catch(error => {
        console.error('Error al analizar imagen:', error);
        feedback.innerHTML = '<p>Error al analizar la imagen. Intenta de nuevo.</p>';
        palabraReconocida.textContent = '';
    });
}

// Función para traducir etiquetas secuencialmente
async function traducirEtiquetasSecuencialmente(etiquetas) {
    for (let etiqueta of etiquetas) {
        try {
            const palabraIngles = etiqueta.tag.en.toLowerCase();
            console.log(`Intentando traducir: ${palabraIngles}`);
            
            // Primero buscar en diccionario local
            const traduccionLocal = buscarEnDiccionarioLocal(palabraIngles);
            if (traduccionLocal) {
                console.log(`✓ Traducción local encontrada: ${traduccionLocal}`);
                return traduccionLocal;
            }
            
            // Si no está en el diccionario, usar API de traducción
            const traduccionAPI = await traducirConAPI(palabraIngles);
            if (traduccionAPI && traduccionAPI !== palabraIngles) {
                console.log(`✓ Traducción API: ${traduccionAPI}`);
                return traduccionAPI;
            }
        } catch (error) {
            console.log(`✗ Error traduciendo: ${etiqueta.tag.en}`, error);
            // Continuar con la siguiente etiqueta
        }
    }
    
    // Si ninguna etiqueta pudo ser traducida, usar la primera en inglés
    return etiquetas[0].tag.en;
}

// Diccionario local mejorado
const diccionarioImagga = {
    // Animales
    'dog': 'perro',
    'cat': 'gato',
    'bird': 'pájaro',
    'fish': 'pez',
    'horse': 'caballo',
    'cow': 'vaca',
    'pig': 'cerdo',
    'sheep': 'oveja',
    'goat': 'cabra',
    'chicken': 'gallina',
    'duck': 'pato',
    'rabbit': 'conejo',
    'lion': 'león',
    'tiger': 'tigre',
    'bear': 'oso',
    'elephant': 'elefante',
    'giraffe': 'jirafa',
    'zebra': 'cebra',
    'monkey': 'mono',
    'kangaroo': 'canguro',
    'penguin': 'pingüino',
    'dolphin': 'delfín',
    'whale': 'ballena',
    'shark': 'tiburón',
    'butterfly': 'mariposa',
    'bee': 'abeja',
    'spider': 'araña',
    'snake': 'serpiente',
    'frog': 'rana',
    'turtle': 'tortuga',
    
    // Frutas y vegetales
    'apple': 'manzana',
    'banana': 'plátano',
    'orange': 'naranja',
    'grape': 'uva',
    'strawberry': 'fresa',
    'watermelon': 'sandía',
    'pineapple': 'piña',
    'mango': 'mango',
    'pear': 'pera',
    'peach': 'durazno',
    'cherry': 'cereza',
    'lemon': 'limón',
    'carrot': 'zanahoria',
    'tomato': 'tomate',
    'potato': 'papa',
    'onion': 'cebolla',
    'broccoli': 'brócoli',
    'lettuce': 'lechuga',
    'corn': 'maíz',
    
    // Objetos comunes
    'car': 'carro',
    'house': 'casa',
    'tree': 'árbol',
    'flower': 'flor',
    'ball': 'pelota',
    'book': 'libro',
    'chair': 'silla',
    'table': 'mesa',
    'bed': 'cama',
    'door': 'puerta',
    'window': 'ventana',
    'computer': 'computadora',
    'phone': 'teléfono',
    'clock': 'reloj',
    'key': 'llave',
    'shoe': 'zapato',
    'shirt': 'camisa',
    'hat': 'sombrero',
    'glass': 'vaso',
    'bottle': 'botella',
    'cup': 'taza',
    'plate': 'plato',
    'spoon': 'cuchara',
    'fork': 'tenedor',
    'knife': 'cuchillo',
    'toy': 'juguete',
    'doll': 'muñeca',
    'balloon': 'globo',
    'kite': 'cometa',
    
    // Naturaleza
    'sun': 'sol',
    'moon': 'luna',
    'star': 'estrella',
    'cloud': 'nube',
    'sky': 'cielo',
    'water': 'agua',
    'fire': 'fuego',
    'mountain': 'montaña',
    'river': 'río',
    'sea': 'mar',
    'beach': 'playa',
    'forest': 'bosque',
    'grass': 'pasto',
    'leaf': 'hoja',
    'rock': 'roca',
    'sand': 'arena',
    
    // Colores
    'red': 'rojo',
    'blue': 'azul',
    'green': 'verde',
    'yellow': 'amarillo',
    'orange': 'naranja',
    'purple': 'morado',
    'pink': 'rosado',
    'brown': 'marrón',
    'black': 'negro',
    'white': 'blanco',
    'gray': 'gris',
    
    // Partes del cuerpo
    'head': 'cabeza',
    'eye': 'ojo',
    'nose': 'nariz',
    'mouth': 'boca',
    'ear': 'oreja',
    'hand': 'mano',
    'foot': 'pie',
    'arm': 'brazo',
    'leg': 'pierna',
    'finger': 'dedo',
    'toe': 'dedo del pie',
    'hair': 'pelo',
    'face': 'cara',
    
    // Comida
    'bread': 'pan',
    'cheese': 'queso',
    'milk': 'leche',
    'egg': 'huevo',
    'rice': 'arroz',
    'pasta': 'pasta',
    'pizza': 'pizza',
    'hamburger': 'hamburguesa',
    'ice cream': 'helado',
    'cake': 'pastel',
    'cookie': 'galleta',
    'chocolate': 'chocolate',
    
    // Lugares
    'school': 'escuela',
    'park': 'parque',
    'store': 'tienda',
    'hospital': 'hospital',
    'restaurant': 'restaurante',
    'beach': 'playa',
    'pool': 'piscina',
    
    // Transporte
    'bicycle': 'bicicleta',
    'bus': 'autobús',
    'train': 'tren',
    'airplane': 'avión',
    'boat': 'barco',
    'motorcycle': 'motocicleta',
    'truck': 'camión'
};

// Buscar en diccionario local
function buscarEnDiccionarioLocal(palabraIngles) {
    // Buscar coincidencia exacta
    if (diccionarioImagga[palabraIngles]) {
        return diccionarioImagga[palabraIngles];
    }
    
    // Buscar coincidencias parciales (para plurales, etc.)
    const palabraSingular = palabraIngles.replace(/s$/, '');
    if (diccionarioImagga[palabraSingular]) {
        return diccionarioImagga[palabraSingular];
    }
    
    return null;
}

// Función de traducción con API mejorada
async function traducirConAPI(palabraIngles) {
    try {
        // Intentar con MyMemory API
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(palabraIngles)}&langpair=en|es`);
        const data = await response.json();
        
        if (data.responseData && data.responseData.translatedText) {
            let traduccion = data.responseData.translatedText.toLowerCase();
            
            // Limpiar la traducción (a veces viene con caracteres extraños)
            traduccion = traduccion.replace(/[^\wáéíóúñü\s]/g, '');
            
            // Verificar que la traducción sea diferente al original
            if (traduccion !== palabraIngles && traduccion.length > 1) {
                return traduccion;
            }
        }
        
        // Si MyMemory falla, intentar con LibreTranslate (alternativa)
        return await traducirConLibreTranslate(palabraIngles);
    } catch (error) {
        console.error('Error con MyMemory API:', error);
        // Intentar con alternativa
        return await traducirConLibreTranslate(palabraIngles);
    }
}

// Función alternativa de traducción
async function traducirConLibreTranslate(palabraIngles) {
    try {
        const response = await fetch('https://libretranslate.com/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: palabraIngles,
                source: 'en',
                target: 'es',
                format: 'text'
            })
        });
        
        const data = await response.json();
        if (data.translatedText) {
            return data.translatedText.toLowerCase();
        }
    } catch (error) {
        console.error('Error con LibreTranslate:', error);
    }
    
    return palabraIngles; // Devolver original si todo falla
}

// Función para traducir palabras usando API gratuita
async function traducirPalabra(palabraIngles) {
    // Usar MyMemory Translation API (gratuita)
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(palabraIngles)}&langpair=en|es`);
    const data = await response.json();
    
    if (data.responseData && data.responseData.translatedText) {
        return data.responseData.translatedText.toLowerCase();
    } else {
        throw new Error('No se pudo traducir la palabra');
    }
}

// Pronunciar la palabra actual usando síntesis de voz
function pronunciarPalabra() {
    if (!sintesisVoz || !palabraDetectada) {
        feedback.innerHTML = '<p>La síntesis de voz no está disponible.</p>';
        return;
    }
    
    // Detener cualquier síntesis en curso
    sintesisVoz.cancel();
    
    // Crear utterance
    const utterance = new SpeechSynthesisUtterance(palabraDetectada);
    utterance.lang = 'es-ES';
    utterance.rate = 0.8; // Un poco más lento para niños
    utterance.pitch = 1.2; // Tono más agradable
    
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
    if (!palabraDetectada) {
        feedback.innerHTML = '<p>Primero sube una imagen para comenzar.</p>';
        return;
    }
    
    if (intentosRestantes <= 0) {
        feedback.innerHTML = '<p>¡Se acabaron los intentos! Prueba con otra imagen.</p>';
        return;
    }
    
    if (grabando) {
        reconocimientoVoz.stop();
    } else {
        reconocimientoVoz.start();
    }
}

// Verificar pronunciación
// Verificar pronunciación mejorada
function verificarPronunciacion(transcript) {
    if (!palabraDetectada) return;
    
    const palabraCorrecta = palabraDetectada.toLowerCase();
    console.log(`Palabra dicha: "${transcript}", Correcta: "${palabraCorrecta}"`);
    
    // Reducir intentos
    intentosRestantes--;
    actualizarContadorIntentos();
    
    // Algoritmo mejorado de comparación
    const esCorrecto = compararPalabrasMejorado(transcript, palabraCorrecta);
    
    if (esCorrecto) {
        const mensajeAleatorio = mensajesMotivacion[Math.floor(Math.random() * mensajesMotivacion.length)];
        feedback.innerHTML = `<p>${mensajeAleatorio}</p>`;
        feedback.className = 'feedback correcto';
        
        // Celebrar y animar al niño
        celebrar();
        animarConVoz(mensajeAleatorio);
        
        // Deshabilitar micrófono hasta que cambie de imagen
        btnMicrofono.disabled = true;
    } else {
        // Mostrar mensaje de ánimo aleatorio
        const fraseAnimio = frasesAnimio[Math.floor(Math.random() * frasesAnimio.length)];
        feedback.innerHTML = `<p>Intenta de nuevo. Dijiste: "${transcript}"</p><p class="mensaje-animo">${fraseAnimio}</p>`;
        feedback.className = 'feedback incorrecto';
        
        // Si se acabaron los intentos
        if (intentosRestantes <= 0) {
            feedback.innerHTML = `<p>¡Se acabaron los intentos! La palabra era "${palabraDetectada}".</p>`;
            btnMicrofono.disabled = true;
            
            // Dar retroalimentación de voz
            if (sintesisVoz) {
                const utterance = new SpeechSynthesisUtterance(`No te preocupes, la palabra era ${palabraDetectada}. ¡Sigue practicando!`);
                utterance.lang = 'es-ES';
                utterance.rate = 0.9;
                sintesisVoz.speak(utterance);
            }
        } else {
            // Dar retroalimentación de voz amigable
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

// Comparación de palabras mejorada
function compararPalabrasMejorado(dicha, correcta) {
    // Eliminar acentos y normalizar
    const normalizar = (str) => {
        return str.normalize("NFD")
                 .replace(/[\u0300-\u036f]/g, "")
                 .toLowerCase()
                 .trim();
    };
    
    const dichaNormalizada = normalizar(dicha);
    const correctaNormalizada = normalizar(correcta);
    
    // Comparación directa
    if (dichaNormalizada === correctaNormalizada) {
        return true;
    }
    
    // Permitir pequeñas variaciones comunes en niños
    const variacionesPermitidas = [
        correctaNormalizada,
        correctaNormalizada + 's', // Plural
        correctaNormalizada + 'a', // Femenino
        correctaNormalizada + 'o', // Masculino
        correctaNormalizada.replace('rr', 'r'), // Menos énfasis en la RR
        correctaNormalizada.replace('ll', 'y'), // Yeísmo
        correctaNormalizada.replace('v', 'b'), // Confusión B/V
        correctaNormalizada.replace('z', 's'), // Seseo
        correctaNormalizada.replace('c', 's'), // Seseo
        correctaNormalizada.replace('g', 'j'), // Confusión G/J
    ];
    
    // También verificar si contiene la palabra correcta
    if (dichaNormalizada.includes(correctaNormalizada) || 
        correctaNormalizada.includes(dichaNormalizada)) {
        return true;
    }
    
    return variacionesPermitidas.includes(dichaNormalizada);
}

// Actualizar contador de intentos
function actualizarContadorIntentos() {
    contadorIntentos.textContent = intentosRestantes;
    
    // Cambiar color según los intentos restantes
    contadorIntentos.classList.remove('bajo', 'critico');
    
    if (intentosRestantes <= 3) {
        contadorIntentos.classList.add('critico');
    } else if (intentosRestantes <= 6) {
        contadorIntentos.classList.add('bajo');
    }
}

// Animación con voz IA
function animarConVoz(mensaje) {
    if (!sintesisVoz) return;
    
    // Detener cualquier síntesis en curso
    sintesisVoz.cancel();
    
    const utterance = new SpeechSynthesisUtterance(mensaje);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9; // Velocidad adecuada para niños
    utterance.pitch = 1.3; // Tono más alegre y amigable
    utterance.volume = 1.0;
    
    // Reproducir mensaje motivacional
    sintesisVoz.speak(utterance);
}

// Comparación simple de palabras
function compararPalabras(dicha, correcta) {
    // Eliminar acentos y normalizar
    const normalizar = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
    const dichaNormalizada = normalizar(dicha);
    const correctaNormalizada = normalizar(correcta);
    
    // Comparación directa
    if (dichaNormalizada === correctaNormalizada) {
        return true;
    }
    
    // Permitir pequeñas variaciones
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

// Efecto de celebración
function celebrar() {
    const card = document.querySelector('.card');
    
    // Animación de la tarjeta
    card.classList.add('celebration');
    setTimeout(() => {
        card.classList.remove('celebration');
    }, 500);
    
    // Crear confetti
    crearConfetti();
    
    console.log("¡Palabra pronunciada correctamente!");
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
        
        // Remover después de la animación
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Reiniciar para probar con otra imagen
function reiniciarJuego() {
    // Restablecer elementos visuales
    dropZone.style.display = 'flex';
    imageContainer.style.display = 'none';
    imagenPalabra.src = '';
    palabraActual.textContent = 'Palabra';
    palabraReconocida.textContent = '';
    
    // Restablecer estado
    imagenActual = null;
    palabraDetectada = null;
    intentosRestantes = 12;
    actualizarContadorIntentos();
    
    // Deshabilitar botones
    btnEscuchar.disabled = true;
    btnMicrofono.disabled = true;
    btnSiguiente.disabled = true;
    
    // Restablecer feedback
    feedback.innerHTML = '<p>¡Sube una imagen para comenzar!</p>';
    feedback.className = 'feedback';
    
    // Limpiar input de archivo
    fileInput.value = '';
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', inicializarApp);