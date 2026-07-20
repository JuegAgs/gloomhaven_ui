$(document).ready(function() {
    
    // Función de ayuda para validar formato de email
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

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
