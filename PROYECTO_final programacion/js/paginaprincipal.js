function validateLogin(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario.

    // Obtener los valores del formulario
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message');

    // Limpiar mensaje de error previo
    errorMessage.textContent = '';

    // Obtener usuarios guardados en localStorage desde el módulo de Gestión Básica de Usuarios
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar el usuario que coincida con el nombre de usuario y contraseña
    const usuario = usuariosGuardados.find(
        user => user.nombreUsuario === username && user.contraseña === password
    );

    if (usuario) {
        // Verificar si la cuenta está activa
        if (usuario.estado !== 'activa') {
            errorMessage.textContent = "Tu cuenta está inactiva. Contacta al administrador.";
            errorMessage.style.color = "red";
            return;
        }

        // Guardar sesión del usuario
        localStorage.setItem('usuarioSesion', JSON.stringify({
            id: usuario.id,
            rol: usuario.rol
        }));

        // Redirigir según el rol del usuario
        if (usuario.rol === 'personal-medico') {
            window.location.href = "../html/seguimientocitasyconsultas.html"; // Página del personal médico
        } else if (usuario.rol === 'paciente') {
            window.location.href = "../html/seguimientocitasyconsultas.html"; // Página del paciente
        } else {
            errorMessage.textContent = "Rol desconocido. Contacta al administrador.";
            errorMessage.style.color = "red";
        }
    } else {
        // Mostrar mensaje de error si no se encuentra el usuario
        errorMessage.textContent = "Usuario o contraseña incorrectos.";
        errorMessage.style.color = "red";
    }
}

// Inicializar el evento de validación del formulario
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', validateLogin);
});
