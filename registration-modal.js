$(document).ready(function() {
    
    // Validar de forma estricta un ÚNICO correo electrónico (sin comas ni punto y coma)
    function isSingleValidEmail(email) {
        if (email.includes(',') || email.includes(';')) {
            return false;
        }
        var singleEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return singleEmailRegex.test(email);
    }

    // Función centralizada para mostrar el modal dinámicamente
    window.showModal = function(title, htmlMessage, isError = false) {
        var $modalCard = $('#confirmModal .modal-card');
        
        // Actualizamos explícitamente el título y el mensaje
        $('#modalTitle').text(title);
        $('#modalMessage').html(htmlMessage);

        // Cambiamos el estilo del borde o tarjeta según el estado de error
        if (isError) {
            $modalCard.addClass('modal-error');
        } else {
            $modalCard.removeClass('modal-error');
        }

        $('#confirmModal').css('display', 'flex');
    };

    // Desplegar / Ocultar formulario al dar clic en "Registrarse"
    $('.btn-register').click(function() {
        var $container = $(this).closest('.event-item').find('.form-registro');
        $container.slideToggle(300);
    });

    // Confirmación y Validación del Formulario de Registro
    $('.btn-confirm').click(function() {
        var $btn = $(this);
        var $container = $btn.closest('.form-registro');
        var $eventItem = $btn.closest('.event-item');

        var $nameInput = $container.find('.inv-name');
        var $emailInput = $container.find('.inv-email');

        var name = $nameInput.val().trim();
        var rawEmail = $emailInput.val().trim();

        // Extracción exacta usando las clases del HTML (.event-date y .event-time)
        var eventName = $eventItem.find('h3').text().trim();
        var eventDate = $eventItem.find('.event-date').text().replace('Fecha:', '').trim(); 
        var eventTime = $eventItem.find('.event-time').text().replace('Horario:', '').trim();

        // Limpiar estados de error previos en los inputs
        $nameInput.removeClass('input-error');
        $emailInput.removeClass('input-error');

        // 1. Validar Nombre (entre 3 y 50 caracteres)
        if (name.length < 3 || name.length > 50) {
            $nameInput.addClass('input-error');
            showModal(
                "¡Error en el registro! ⚠️", 
                "Por favor ingresa un nombre válido (entre 3 y 50 caracteres).", 
                true
            );
            return;
        }

        // 2. Validar Correo Electrónico (un solo correo válido y sin comas)
        if (rawEmail === "" || !isSingleValidEmail(rawEmail) || rawEmail.length > 80) {
            $emailInput.addClass('input-error');
            showModal(
                "¡Correo no válido! ⚠️", 
                "Por favor ingresa una sola dirección de correo electrónico válida.", 
                true
            );
            return;
        }

        var cleanEmail = rawEmail.toLowerCase();

        // Deshabilitar botón temporalmente para evitar peticiones duplicadas
        $btn.prop('disabled', true).text('Enviando...');

        // Enviamos los datos al servicio de correo (email-service.js)
        sendConfirmationEmail({ 
            name: name, 
            email: cleanEmail,
            eventName: eventName,
            eventDate: eventDate,
            eventTime: eventTime
        })
        .then(function(response) {
            showModal(
                "¡Registro Exitoso! 🎉", 
                "¡Muchas gracias, <strong>" + name + "</strong>! Quedaste registrado para <strong>" + eventName + "</strong> (" + eventDate + " a las " + eventTime + "). Te enviamos la confirmación a <strong>" + cleanEmail + "</strong>. Recuerda tener listo tu comprobante de aportación de $50 al ingresar.", 
                false
            );

            // Limpiar inputs y ocultar formulario desplegable tras el registro exitoso
            $container.find('input').val('');
            $container.slideUp(300);
        })
        .catch(function(error) {
            console.error("EmailJS Error:", error);
            showModal(
                "¡Error al enviar correo! ⚠️", 
                "Tu registro fue procesado pero hubo un detalle al enviar el correo de confirmación. De todos modos te esperamos en el evento.", 
                true
            );
        })
        .always(function() {
            // Restaurar estado del botón
            $btn.prop('disabled', false).text('Confirmar y Enviar Registro');
        });
    });

    // Cerrar el Modal al hacer clic en el botón de cerrar
    $('#closeModal').click(function() {
        $('#confirmModal').hide();
    });

    // Cerrar el Modal al hacer clic en el fondo oscuro
    $('#confirmModal').click(function(e) {
        if ($(e.target).is('#confirmModal')) {
            $('#confirmModal').hide();
        }
    });
});
