// email-service.js
// Servicio encargado exclusivamente del envío de correos.

// Configuración de EmailJS
const EMAILJS_PUBLIC_KEY = "Ir6sHbNEpGUAQiphK";
const EMAILJS_SERVICE_ID = "service_jbyso5g";
const EMAILJS_TEMPLATE_ID = "template_wz8e3e8";

// Inicializar EmailJS de forma segura
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

/**
 * Función genérica para enviar correos de confirmación.
 * Si en el futuro cambias de proveedor, solo modificas el interior de esta función.
 * @param {Object} data - Datos del registro { name, email }
 */
function sendConfirmationEmail(data) {
    return new Promise(function(resolve, reject) {
        // Verificar si la librería emailjs está disponible en el navegador
        if (typeof emailjs === 'undefined') {
            reject(new Error("La librería EmailJS no está cargada."));
            return;
        }

        var templateParams = {
            user_name: data.name,
            user_email: data.email,
            event_name: data.eventName,
            event_date: data.eventDate,
            event_time: data.eventTime,
            reply_to: data.email
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function(response) {
                resolve(response);
            })
            .catch(function(error) {
                reject(error);
            });
    });
}
