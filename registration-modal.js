$(document).ready(function() {
    // Función centralizada para mostrar el modal
    window.showModal = function(message) {
        $('#modalMessage').text(message);
        $('#confirmModal').css('display', 'flex');
    };

    // Confirmación de Registro
    $('.btn-confirm').click(function() {
        var container = $(this).closest('.form-registro');
        var name = container.find('.inv-name').val();
        
        if (name.trim() === "") {
            showModal("Por favor ingresa tu nombre para completar el registro.");
            return;
        }

        showModal("¡Muchas gracias, " + name + "! Tu registro ha sido enviado con éxito. Recuerda tener listo tu comprobante de aportación de $50 al ingresar al evento.");
        
        container.slideUp(300);
        container.find('input').val('');
    });

    // Cerrar el Modal al hacer clic en el botón o fuera de la tarjeta
    $('#closeModal').click(function() {
        $('#confirmModal').hide();
    });

    $('#confirmModal').click(function(e) {
        if ($(e.target).is('#confirmModal')) {
            $('#confirmModal').hide();
        }
    });
});
