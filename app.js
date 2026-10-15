$(document).ready(function() {
    // 1. Navegación interactiva entre Pestañas
    $('.nav-link').click(function() {
        var target = $(this).data('target');
        
        $('.nav-link').removeClass('active');$(this).addClass('active');
        
        $('.section-panel').removeClass('active');$('#' + target).addClass('active');
    });

    // 2. Motor de Búsqueda para la Ludoteca
    $('#searchGame').on('keyup', function() {
        var value = $(this).val().toLowerCase();$('#ludotecaContainer .game-card').filter(function() {
            var matchName = $(this).data('name').toLowerCase().indexOf(value) > -1;
            var matchMech = $(this).data('mechanic').toLowerCase().indexOf(value) > -1;
            $(this).toggle(matchName || matchMech);
        });
    });

    // 3. Acordeón para la sección Q/A
    $('.qa-question').click(function() {$(this).next('.qa-answer').slideToggle(300);
    });

    // 4. Verificador dinámico de cumpleaños desde "cumpleanos.json"
    const bannerCumple = $('.birthday-ticker');

    if (bannerCumple.length) {
        // Obtener la fecha actual del dispositivo en formato MM-DD (Ej. "10-15")
        const hoy = new Date();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');
        const fechaActual = `${mes}-${dia}`;

        // Leer el archivo JSON externo
        $.getJSON('./cumpleanos.json')
            .done(function(cumpleanosComunidad) {
                if (cumpleanosComunidad[fechaActual]) {
                    const festejados = cumpleanosComunidad[fechaActual].join(" y ");
                    bannerCumple.html(`🎉 ¡Muchas felicidades a ${festejados} de la comunidad por su cumpleaños! 🎂`);
                    bannerCumple.show();
                } else {
                    bannerCumple.html(`🎂 Hoy no tenemos cumpleañeros en la comunidad, ¡pero ven a pasar un gran rato! 🎲`);
                }
            })
            .fail(function() {
                console.log("No se pudo cargar el archivo de cumpleaños.");
            });
    }
});