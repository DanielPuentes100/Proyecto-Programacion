document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pacienteForm');
    const nombreInput = document.getElementById('Nombre');
    const identificacionInput = document.getElementById('Identificacion');
    const nacimientoInput = document.getElementById('Nacimiento');
    const direccionInput = document.getElementById('Direccion');
    const telefonoInput = document.getElementById('Telefono');
    const correoInput = document.getElementById('Correo');
    const estadoSelect = document.getElementById('Estado');
    const usuarioInput = document.getElementById('Usuario');
    const contrasenaInput = document.getElementById('Contrasena');
    const confirmarContrasenaInput = document.getElementById('ConfirmarContrasena');
    const btnConsultar = document.getElementById('consultarBtn');
    const btnActualizar = document.getElementById('actualizarBtn');
    const btnEliminar = document.getElementById('eliminarBtn');

    // Registrar un paciente
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (contrasenaInput.value !== confirmarContrasenaInput.value) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const nuevoPaciente = {
            id_paciente: "PAC-" + Date.now(),  // Se genera una ID única
            nombre: nombreInput.value,
            identificacion: identificacionInput.value,
            nacimiento: nacimientoInput.value,
            direccion: direccionInput.value,
            telefono: telefonoInput.value,
            correo: correoInput.value,
            estado: estadoSelect.value,
            usuario: usuarioInput.value,
            contrasena: contrasenaInput.value
        };

        let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
        pacientes.push(nuevoPaciente);
        localStorage.setItem('pacientes', JSON.stringify(pacientes));

        alert("Paciente registrado con éxito.");
        form.reset();
    });

    // Consultar un paciente
    btnConsultar.addEventListener('click', function() {
        const pacienteUsuario = usuarioInput.value.trim();
        const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
        const paciente = pacientes.find(p => p.usuario === pacienteUsuario);

        if (paciente) {
            // Mostrar los datos del paciente en el formulario
            nombreInput.value = paciente.nombre;
            identificacionInput.value = paciente.identificacion;
            nacimientoInput.value = paciente.nacimiento;
            direccionInput.value = paciente.direccion;
            telefonoInput.value = paciente.telefono;
            correoInput.value = paciente.correo;
            estadoSelect.value = paciente.estado;
            contrasenaInput.value = paciente.contrasena;
            confirmarContrasenaInput.value = paciente.contrasena;
        } else {
            alert('Paciente no encontrado.');
        }
    });

    // Actualizar un paciente
    btnActualizar.addEventListener('click', function() {
        const pacienteUsuario = usuarioInput.value.trim();
        let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
        const pacienteIndex = pacientes.findIndex(p => p.usuario === pacienteUsuario);

        if (pacienteIndex !== -1) {
            pacientes[pacienteIndex] = {
                ...pacientes[pacienteIndex],
                nombre: nombreInput.value,
                identificacion: identificacionInput.value,
                nacimiento: nacimientoInput.value,
                direccion: direccionInput.value,
                telefono: telefonoInput.value,
                correo: correoInput.value,
                estado: estadoSelect.value,
                contrasena: contrasenaInput.value
            };
            localStorage.setItem('pacientes', JSON.stringify(pacientes));
            alert('Paciente actualizado exitosamente.');
        } else {
            alert('Paciente no encontrado.');
        }
    });

    // Eliminar un paciente
    btnEliminar.addEventListener('click', function() {
        const pacienteUsuario = usuarioInput.value.trim();
        let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
        const pacienteIndex = pacientes.findIndex(p => p.usuario === pacienteUsuario);

        if (pacienteIndex !== -1) {
            pacientes.splice(pacienteIndex, 1);
            localStorage.setItem('pacientes', JSON.stringify(pacientes));
            alert('Paciente eliminado exitosamente.');
            form.reset();
        } else {
            alert('Paciente no encontrado.');
        }
    });
});
