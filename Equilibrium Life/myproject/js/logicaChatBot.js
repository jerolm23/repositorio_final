let emocionActual = '';

        function toggleChat() {
            var ventanaChat = document.getElementById('ventana-chat');
            ventanaChat.classList.toggle('mostrar');
        }

        function enviarMensaje() {
            var entradaUsuario = document.getElementById('entrada-usuario').value.trim();
            var contenidoChat = document.getElementById('contenido-chat');

            if (entradaUsuario === '') {
                return; // No enviar mensajes vacíos
            }

            // Mostrar mensaje del usuario
            const divMensajeUsuario = document.createElement('div');
            divMensajeUsuario.className = 'mensaje mensaje-usuario';
            divMensajeUsuario.innerHTML = 'Tú: ' + entradaUsuario;
            contenidoChat.appendChild(divMensajeUsuario);
            fadeIn(divMensajeUsuario);

            // Respuestas del chatbot
            let respuestaBot = '';
            const entradaNormalizada = entradaUsuario.toLowerCase();

            // Patrón de búsqueda para manejar preguntas específicas
            const patronesRespuestas = {
                hola: /hola|¿cómo estás?|buenas|buenas tardes|buenos días|Hola|como estas|Como Estas/,
                bien: /bien|bueno|estoy bien|todo bien|¿bien y tu?|bien y tu/,
                felicidad: /feliz|alegría|alegre|Alegria|Alegre/,
                tristeza: /triste|Triste|Tristeza/,
                depresion: /depresion|depresivo|Depresion|Depresivo|deprimido|Deprimido/,
                ansiedad: /ansiedad|ansioso|Ansiedad|Ansioso/,
                desesperacion: /desespero|desesperado|desesperada|Desespero|Desesperado|Desesperada/,
                nostalgia: /nostalgia|nostalgico|Nostalgia|Nostalgico/,
                impulsividad: /impulsividad|impulsivo|Impulsividad|Impulsivo/,
                gracias: /gracias|te agradezco|muchas gracias|adios|chao/,
                afirmativo: /si|sí|claro|por supuesto|por favor|porfa/,
                negativo: /no|no quiero|no quiero más información|no gracias|no es necesario|no esta bien|no quiero ya/
            };

            const respuestas = {
                hola: 'Hola ¿Como estas?',
                bien: 'Me alegra saber que estás bien. ¿En qué puedo ayudarte?',
                felicidad: 'La felicidad es un estado emocional positivo que se caracteriza por sentimientos de alegría, satisfacción y bienestar.<br> Es importante cultivar momentos de felicidad en nuestra vida diaria. ¿Te gustaría obtener más información sobre la felicidad?<br> <a href="https://ejemplo.com/felicidad" target="_blank">Más Información</a>',
                tristeza: 'La tristeza es una emoción normal que todos experimentamos. Puede ser causada por pérdidas, decepciones o situaciones difíciles. <br> Es esencial permitirnos sentir y procesar esta emoción. ¿Te gustaría obtener más información sobre la tristeza? <br> <a href="https://ejemplo.com/tristeza" target="_blank">Más Información</a>',
                depresion: 'La depresión es un trastorno del estado de ánimo que afecta a la forma en que te sientes, piensas y manejas las actividades diarias. Puede llevar a una profunda tristeza y pérdida de interés en actividades que antes disfrutabas. ¿Te gustaría obtener más información sobre este estado de ánimo? <br> <a href="https://revintsociologia.revistas.csic.es/index.php/revintsociologia/article/view/328" target="_blank">Más Información</a>',
                ansiedad: 'La ansiedad es una respuesta natural al estrés, pero puede convertirse en un problema si es persistente. Puede manifestarse como preocupación excesiva, tensión muscular y problemas para concentrarse. ¿Te gustaría obtener más información sobre este estado de ánimo? <br> <a href="https://www.medigraphic.com/cgi-bin/new/resumen.cgi?IDARTICULO=37576" target="_blank">Más Información</a>',
                desesperacion: 'La desesperación puede ser abrumadora y a menudo requiere apoyo. Es importante buscar ayuda si te sientes atrapado en un ciclo de desesperanza. ¿Te gustaría obtener más información sobre este estado de ánimo? <br> <a href="https://ejemplo.com desesperacion">Más Información</a>',
                nostalgia: 'La nostalgia es un sentimiento agridulce que puede hacernos reflexionar sobre el pasado, recordando momentos felices o tristes. <br> Puede ser una forma de conexión emocional con nuestras experiencias. ¿Te gustaría obtener más información sobre este estado de ánimo? <br> <a href="https://www.nationalgeographic.es/ciencia/2023/07/como-funciona-la-nostalgia-y-por-que-somos-propensos-a-ella" target="_blank">Más Información</a>',
                impulsividad: 'La impulsividad puede llevar a decisiones precipitadas que a menudo quizas nos arrepentimos a futuro, por ende es importante aprender a pausar y reflexionar antes de actuar. ¿Te gustaría obtener más información sobre este estado de ánimo? <br> <a href="http://scielo.org.co/scielo.php?script=sci_arttext&pid=S1794-47242013000100019" target="_blank">Más Información</a>',
                gracias: 'De nada. Si necesitas más ayuda, ¡estoy aquí para ti!',
                predeterminado: '¿Cómo puedo ayudarte hoy?'
            };

            // Determinar la respuesta del bot
            if (patronesRespuestas.hola.test(entradaNormalizada)) {
                respuestaBot = respuestas.hola;
            } else if (patronesRespuestas.bien.test(entradaNormalizada)) {
                respuestaBot = respuestas.bien;
            } else if (patronesRespuestas.felicidad.test(entradaNormalizada)) {
                respuestaBot = respuestas.felicidad;
                emocionActual = 'felicidad';
            } else if (patronesRespuestas.tristeza.test(entradaNormalizada)) {
                respuestaBot = respuestas.tristeza;
                emocionActual = 'tristeza';
            } else if (patronesRespuestas.depresion.test(entradaNormalizada)) {
                respuestaBot = respuestas.depresion;
                emocionActual = 'depresión';
            } else if (patronesRespuestas.ansiedad.test(entradaNormalizada)) {
                respuestaBot = respuestas.ansiedad;
                emocionActual = 'ansiedad';
            } else if (patronesRespuestas.desesperacion.test(entradaNormalizada)) {
                respuestaBot = respuestas.desesperacion;
                emocionActual = 'desesperación';
            } else if (patronesRespuestas.nostalgia.test(entradaNormalizada)) {
                respuestaBot = respuestas.nostalgia;
                emocionActual = 'nostalgia';
            } else if (patronesRespuestas.impulsividad.test(entradaNormalizada)) {
                respuestaBot = respuestas.impulsividad;
                emocionActual = 'impulsividad';
            } else if (patronesRespuestas.gracias.test(entradaNormalizada)) {
                respuestaBot = respuestas.gracias;
            } else {
                respuestaBot = respuestas.predeterminado;
            }

            const divMensajeBot = crearMensajeBot(respuestaBot);
            contenidoChat.appendChild(divMensajeBot);

            document.getElementById('entrada-usuario').value = ''; // Limpiar el campo de entrada
            contenidoChat.scrollTop = contenidoChat.scrollHeight; // Desplazarse hacia abajo
        }

        function limpiarChat() {
            const contenidoChat = document.getElementById('contenido-chat');
            contenidoChat.innerHTML = ''; // Limpiar el contenido del chat
            const mensajePredeterminado = document.createElement('div');
            mensajePredeterminado.className = 'mensaje-predeterminado respuesta-bot';
            mensajePredeterminado.innerHTML = 'Green: ¡Hola! Soy Green, tu asistente virtual. <br><br> ¿Cuál es tu estado de ánimo? <br> 1. Depresivo <br> 2. Ansioso <br> 3. Desesperado <br> 4. Nostálgico <br> 5. Impulsivo';
            contenidoChat.appendChild(mensajePredeterminado);
            fadeIn(mensajePredeterminado);
        }

        function crearMensajeBot(respuesta) {
            const divMensajeBot = document.createElement('div');
            divMensajeBot.className = 'mensaje respuesta-bot';
            divMensajeBot.innerHTML = 'Green: ' + respuesta;
            fadeIn(divMensajeBot);
            return divMensajeBot;
        }

        function fadeIn(elemento) {
            elemento.style.opacity = 0; // Inicialmente oculto
            elemento.style.transform = 'translateY(10px)'; // Desplazado hacia abajo
            setTimeout(() => {
                elemento.style.opacity = 1; // Hacer visible
                elemento.style.transform = 'translateY(0)'; // Regresar a la posición original
            }, 50); // Pequeña demora para permitir la transición
        }

        function comprobarEnter(evento) {
            if (evento.key === 'Enter') {
                enviarMensaje(); // Enviar mensaje al presionar Enter
            }
        }