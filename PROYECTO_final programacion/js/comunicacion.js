class SistemaDeComunicacion {
    constructor() {
        // Inicializar el array de mensajes desde el almacenamiento local o crear uno nuevo
        this.mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
        this.inicializarEventos();
    }

    inicializarEventos() {
        const formulario = document.querySelector('form');
        formulario.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
            this.enviarMensaje();
        });

        // Establecer valores predeterminados para los campos
        document.getElementById('datetime').value = this.obtenerFechaHoraActual();
        document.getElementById('message-id').value = this.generarIdMensaje();
    }

    generarIdMensaje() {
        const timestamp = new Date().getTime();
        return `MSG-${new Date().getFullYear()}-${timestamp.toString().slice(-3)}`;
    }

    obtenerFechaHoraActual() {
        const ahora = new Date();
        return ahora.toISOString().slice(0, 16); // Formato compatible con datetime-local
    }

    enviarMensaje() {
        // Recopilar datos del formulario
        const idMensaje = document.getElementById('message-id').value;
        const remitente = document.getElementById('sender').value;
        const destinatario = document.getElementById('receiver').value;
        const fechaHora = document.getElementById('datetime').value;
        const contenido = document.getElementById('message-content').value;
        const estado = document.getElementById('status').value;

        if (!remitente || !destinatario || !fechaHora || !contenido) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        // Crear objeto mensaje
        const mensaje = {
            id: idMensaje,
            remitente,
            destinatario,
            fechaHora,
            contenido,
            estado
        };

        // Agregar mensaje al array y guardar en localStorage
        this.mensajes.push(mensaje);
        this.guardarMensajes();

        // Mostrar confirmación y reiniciar el formulario
        this.mostrarConfirmacion(mensaje);
        this.reiniciarFormulario();
    }

    guardarMensajes() {
        localStorage.setItem('mensajes', JSON.stringify(this.mensajes));
    }

    mostrarConfirmacion(mensaje) {
        alert(`Mensaje enviado:\n
ID: ${mensaje.id}
De: ${mensaje.remitente}
Para: ${mensaje.destinatario}
Fecha y Hora: ${mensaje.fechaHora}
Estado: ${mensaje.estado}`);
    }

    reiniciarFormulario() {
        document.querySelector('form').reset();
        // Regenerar ID de mensaje y fecha/hora
        document.getElementById('message-id').value = this.generarIdMensaje();
        document.getElementById('datetime').value = this.obtenerFechaHoraActual();
    }
}

// Inicializar el sistema de comunicación al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    new SistemaDeComunicacion();
});
