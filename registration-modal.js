$(document).ready(function() {
    // Validar de forma estricta un ÚNICO correo electrónico
    function isSingleValidEmail(email) {
        // Rechazar si contiene comas o punto y coma (evita concatenación)
        if (email.includes(',') || email.includes(';')) {
            return false;
        }

        // Regex estricto para una sola dirección estándar
        var singleEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return singleEmailRegex.test(email);
    }

    // Confirmación y Validación del Formulario
    $('.btn-confirm').click(function() {
        var $btn = $(this);
        var $container = $btn.closest('.form-registro');
        var $eventItem = $btn.closest('.event-item');

        var $nameInput = $container.find('.inv-name');
        var $emailInput = $container.find('.inv-email');

        var name = $nameInput.val().trim();
        var rawEmail = $emailInput.val().trim();

        // Extraer nombre y fecha del evento
        var eventName = $eventItem.find('h3').text().trim();
        var eventDate = $eventItem.find('p').first().text().trim(); 

        $nameInput.removeClass('input-error');
        $emailInput.removeClass('input-error');

        // 1. Validar Nombre (mínimo 3 caracteres, máximo 50)
        if (name.length < 3 || name.length > 50) {
            $nameInput.addClass('input-error');
            showModal("¡Error en el registro! ⚠️", "Por favor ingresa un nombre válido (entre 3 y 50 caracteres).", true);
            return;
        }

        // 2. Validar que sea EXACTAMENTE un solo correo válido
        if (rawEmail === "" || !isSingleValidEmail(rawEmail) || rawEmail.length > 80) {
            $emailInput.addClass('input-error');
            showModal(
                "¡Correo no válido! ⚠️", 
                "Por favor ingresa una sola dirección de correo electrónico válida (sin comas ni correos múltiples).", 
                true
            );
            return;
        }

        // Sanitización final: aseguramos enviar la cadena limpia
        var cleanEmail = rawEmail.toLowerCase();

        $btn.prop('disabled', true).text('Enviando...');

        // Enviamos los datos garantizando 1 solo destinatario
        sendConfirmationEmail({ 
            name: name, 
            email: cleanEmail,
            eventName: eventName,
            eventDate: eventDate
        })
        .then(function(response) {
            showModal(
                "¡Registro Exitoso! 🎉", 
                "¡Muchas gracias, <strong>" + name + "</strong>! Quedaste registrado para <strong>" + eventName + "</strong>. Te enviamos la confirmación a <strong>" + cleanEmail + "</strong>. Recuerda tener listo tu comprobante de aportación de $50 al ingresar.", 
                false
            );
            $container.slideUp(300);
            $container.find('input').val('');
        })
        .catch(function(error) {
            console.error("EmailJS Error:", error);
            showModal(
                "¡Error al enviar correo! ⚠️", 
                "Tu registro fue procesado pero hubo un detalle al enviar el correo. De todos modos te esperamos en el evento.", 
                true
            );
        })
        .always(function() {
            $btn.prop('disabled', false).text('Confirmar y Enviar Registro');
        });
    });

    // Función centralizada para mostrar el modal dinámicamente
    window.showModal = function(title, htmlMessage, isError = false) {
        var $modalCard = $('#confirmModal .modal-card');
        
        // Asignación explícita del título y mensaje (usando .html() para permitir negritas)
        $('#modalTitle').text(title);
        $('#modalMessage').html(htmlMessage);

        if (isError) {
            $modalCard.addClass('modal-error');
        } else {
            $modalCard.removeClass('modal-error');
        }

        $('#confirmModal').css('display', 'flex');
    };

    // Confirmación y Validación del Formulario
    $('.btn-confirm').click(function() {
        var $container = $(this).closest('.form-registro');
        var $nameInput = $container.find('.inv-name');
        var $emailInput = $container.find('.inv-email');

        var name = $nameInput.val().trim();
        var email = $emailInput.val().trim();

        // Limpiar errores visuales previos
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

        // 2. Validar Correo Electrónico
        if (email === "" || !isValidEmail(email) || email.length > 80) {
            $emailInput.addClass('input-error');
            showModal(
                "¡Error en el correo! ⚠️", 
                "Por favor ingresa una dirección de correo electrónico válida.", 
                true
            );
            return;
        }

        // 3. Éxito si pasa todas las validaciones (Nombre resaltado y sin mención de envío de email)
        showModal(
            "¡Registro Exitoso! 🎉", 
            "¡Muchas gracias, <strong>" + name + "</strong>! Tu registro ha sido enviado con éxito. Te enviamos la confirmación a " + email + ". Recuerda tener listo tu comprobante de aportación de $50.", 
            false
        );
        
        // Limpiar y ocultar formulario
        $container.slideUp(300);
        $container.find('input').val('');
    });

    // Cerrar el Modal
    $('#closeModal').click(function() {
        $('#confirmModal').hide();
    });

    $('#confirmModal').click(function(e) {
        if ($(e.target).is('#confirmModal')) {
            $('#confirmModal').hide();
        }
    });
});
