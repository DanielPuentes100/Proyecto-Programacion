document.addEventListener('DOMContentLoaded', function() {
    const usuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion'));

    if (!usuarioSesion) {
        alert('No se ha iniciado sesión.');
        window.location.href = 'login.html';
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar el usuario actual
    const usuario = usuarios.find(u => u.id === usuarioSesion.id);

    if (!usuario) {
        alert('Usuario no encontrado.');
        window.location.href = 'login.html';
        return;
    }

    // Cargar citas en la tabla del historial
    function renderHistorialCitas() {
        const historialTableBody = document.querySelector('#historialTable tbody');
        historialTableBody.innerHTML = '';

        const citasUsuario = usuario.citas || [];
        citasUsuario.forEach(cita => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cita.id_cita}</td>
                <td>${cita.fecha_hora || 'Fecha no definida'}</td>
                <td>${cita.motivo || ''}</td>
            `;
            historialTableBody.appendChild(row);
        });
    }

    // Llamar a la función para renderizar al cargar la página
    renderHistorialCitas();

    // Botón de logout
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('usuarioSesion');
        window.location.href = '../html/paginaprincipal.html';
    });

    // Detectar y actualizar cuando se guarde una nueva cita
    window.addEventListener('storage', function(event) {
        if (event.key === 'usuarios') {
            const usuariosActualizados = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuarioActualizado = usuariosActualizados.find(u => u.id === usuarioSesion.id);
            if (usuarioActualizado) {
                usuario.citas = usuarioActualizado.citas;
                renderHistorialCitas();
            }
        }
    });
});
