$(document).ready(function() {
    // Navegación interactiva entre Pestañas
    $('.nav-link').click(function() {
        var target = $(this).data('target');
        
        $('.nav-link').removeClass('active');$(this).addClass('active');
        
        $('.section-panel').removeClass('active');$('#' + target).addClass('active');
    });

    // Motor de Búsqueda para la Ludoteca
    $('#searchGame').on('keyup', function() {
        var value = $(this).val().toLowerCase();$('#ludotecaContainer .game-card').filter(function() {
            var matchName = $(this).data('name').toLowerCase().indexOf(value) > -1;
            var matchMech = $(this).data('mechanic').toLowerCase().indexOf(value) > -1;
            $(this).toggle(matchName || matchMech);
        });
    });

    // Acordeón para la sección Q/A
    $('.qa-question').click(function() {$(this).next('.qa-answer').slideToggle(300);
    });

    // --- CARGADOR DINÁMICO DE CUMPLEAÑOS DESDE ARCHIVO EXTERNO ---
    const bannerCumple = $('.birthday-ticker');

    if (bannerCumple.length) {
        // Obtenemos la fecha actual en formato MM-DD
        const hoy = new Date();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');
        const fechaActual = `${mes}-${dia}`;

        // Leemos el archivo JSON por separado
        $.getJSON('./cumpleanos.json')
            .done(function(cumpleanosComunidad) {
                if (cumpleanosComunidad[fechaActual]) {
                    const festejados = cumpleanosComunidad[fechaActual].join(" y ");
                    bannerCumple.html(`🎉 ¡Muchas felicidades a ${festejados} de la comunidad por su cumpleaños! 🎂`);
                    bannerCumple.show();
                } else {
                    bannerCumple.html(`🎂 Hoy no tenemos cumpleañeros en la comunidad, ¡pero ven a pasar un gran rato! 🎲`);
                    // bannerCumple.hide(); // Descomenta si prefieres ocultarlo cuando no haya cumples
                }
            })
            .fail(function() {
                console.log("No se pudo cargar el archivo de cumpleaños.");
                bannerCumple.hide(); // Oculta el banner si hay algún error leyendo el archivo
            });
    }
});