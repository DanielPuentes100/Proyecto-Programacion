class GestionUsuarios {
    constructor() {
        // Inicializar usuarios desde localStorage o crear lista nueva
        this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        this.inicializarEventos();
    }

    inicializarEventos() {
        const formulario = document.querySelector('form');
        formulario.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita el comportamiento predeterminado del formulario
            this.registrarUsuario();
        });

        // Generar valores predeterminados
        document.getElementById('user-id').value = this.generarIdUsuario();
        document.getElementById('creation-date').value = this.obtenerFechaHoraActual();
    }

    generarIdUsuario() {
        const timestamp = new Date().getTime();
        return `USR-${new Date().getFullYear()}-${timestamp.toString().slice(-3)}`;
    }

    obtenerFechaHoraActual() {
        const ahora = new Date();
        return ahora.toISOString().slice(0, 16); // Formato compatible con datetime-local
    }

    registrarUsuario() {
        // Recopilar datos del formulario
        const idUsuario = document.getElementById('user-id').value;
        const nombreUsuario = document.getElementById('username').value.trim();
        const contraseña = document.getElementById('password').value;
        const confirmarContraseña = document.getElementById('confirm-password').value;
        const rol = document.getElementById('role').value;
        const estado = document.getElementById('status').value;
        const fechaCreacion = document.getElementById('creation-date').value;

        // Validar que las contraseñas coincidan
        if (contraseña !== confirmarContraseña) {
            alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return;
        }

        // Validar longitud de contraseña
        if (contraseña.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        // Verificar si el nombre de usuario ya existe
        const usuarioExistente = this.usuarios.find(user => user.nombreUsuario === nombreUsuario);
        if (usuarioExistente) {
            alert('El nombre de usuario ya está registrado. Elige otro.');
            return;
        }

        // Crear objeto usuario
        const usuario = {
            id: idUsuario,
            nombreUsuario,
            contraseña,
            rol,
            estado,
            fechaCreacion
        };

        // Guardar usuario en la lista y en localStorage
        this.usuarios.push(usuario);
        this.guardarUsuarios();

        // Mostrar confirmación y reiniciar el formulario
        alert(`Usuario registrado exitosamente:\n\nID: ${idUsuario}\nNombre: ${nombreUsuario}\nRol: ${rol}\nEstado: ${estado}`);
        this.reiniciarFormulario();
    }

    guardarUsuarios() {
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }

    reiniciarFormulario() {
        document.querySelector('form').reset();
        document.getElementById('user-id').value = this.generarIdUsuario();
        document.getElementById('creation-date').value = this.obtenerFechaHoraActual();
    }

    listarUsuarios() {
        // Opcional: Mostrar usuarios en la consola o en un elemento de la página
        console.table(this.usuarios);
    }

    eliminarUsuario(idUsuario) {
        // Eliminar un usuario por ID
        this.usuarios = this.usuarios.filter(user => user.id !== idUsuario);
        this.guardarUsuarios();
        alert(`Usuario con ID ${idUsuario} eliminado.`);
    }
}

// Inicializar la gestión de usuarios cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    new GestionUsuarios();
});
