// email-service.js
// Servicio encargado exclusivamente del envío de correos.

// Configuración de EmailJS
const EMAILJS_PUBLIC_KEY = "Ir6sHbNEpGUAQiphK";
const EMAILJS_SERVICE_ID = "service_jbyso5g";
const EMAILJS_TEMPLATE_ID = "template_wz8e3e8";

// Inicializar EmailJS
(function() {
    if (window.emailjs) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

/**
 * Función genérica para enviar correos de confirmación.
 * Si en el futuro cambias de proveedor, solo modificas el interior de esta función.
 * @param {Object} data - Datos del registro { name, email }
 * @returns {Promise} - Promesa que resuelve si el envío fue exitoso
 */
function sendConfirmationEmail(data) {
    var templateParams = {
        user_name: data.name,
        user_email: data.email,
        event_name: data.eventName,
        event_date: data.eventDate,
        reply_to: data.email
    };

    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
}
