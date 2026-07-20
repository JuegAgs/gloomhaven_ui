$(document).ready(function() {
    // Navegación interactiva entre Pestañas
    $('.nav-link').click(function() {
        var target = $(this).data('target');
        
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        
        $('.section-panel').removeClass('active');
        $('#' + target).addClass('active');
    });

    // Motor de Búsqueda para la Ludoteca
    $('#searchGame').on('keyup', function() {
        var value = $(this).val().toLowerCase();
        $('#ludotecaContainer .game-card').filter(function() {
            var matchName = $(this).data('name').toLowerCase().indexOf(value) > -1;
            var matchMech = $(this).data('mechanic').toLowerCase().indexOf(value) > -1;
            $(this).toggle(matchName || matchMech);
        });
    });

    // Acordeón para la sección Q/A
    $('.qa-question').click(function() {
        $(this).next('.qa-answer').slideToggle(300);
    });

    // Desplegar Formulario de Registro a Eventos
    $('.btn-register').click(function() {
        $(this).next('.form-registro').slideToggle(300);
    });

    // Confirmación Simulada de Registro
    $('.btn-confirm').click(function() {
        var container = $(this).closest('.form-registro');
        var name = container.find('.inv-name').val();
        if(name.trim() === "") {
            alert("Por favor ingresa tu nombre.");
            return;
        }
        alert("¡Registro enviado con éxito para: " + name + "! Recuerda tener listo tu comprobante de aportación de $50.");
        container.slideUp(300);
        container.find('input').val('');
    });
});
