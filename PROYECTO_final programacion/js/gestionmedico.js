document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('medicoForm');
    const idMedicoInput = document.getElementById('id_medico');
    const nombreMedicoInput = document.getElementById('nombre_medico');
    const licenciaInput = document.getElementById('licencia');
    const especialidadSelect = document.getElementById('especialidad');
    const telefonoInput = document.getElementById('telefono_medico');
    const usuarioInput = document.getElementById('usuario');
    const contrasenaInput = document.getElementById('contrasena');
    const confirmarContrasenaInput = document.getElementById('confirmar_contrasena');
    const btnConsultar = document.querySelector('.consultar');
    const btnActualizar = document.querySelector('.actualizar');
    const btnEliminar = document.querySelector('.eliminar');

    // Cargar especialidades
    function cargarEspecialidades() {
        const especialidadesGuardadas = JSON.parse(localStorage.getItem('especialidades')) || [];
        especialidadSelect.innerHTML = '<option value="" disabled selected>Seleccione especialidad</option>';
        especialidadesGuardadas.forEach(especialidad => {
            const option = document.createElement('option');
            option.value = especialidad.nombre_especialidad;
            option.textContent = especialidad.nombre_especialidad;
            especialidadSelect.appendChild(option);
        });
    }
    
    // Registrar un médico
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (contrasenaInput.value !== confirmarContrasenaInput.value) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const nuevoMedico = {
            id_medico: "MED-" + Date.now(),
            nombre_medico: nombreMedicoInput.value,
            licencia: licenciaInput.value,
            especialidad: especialidadSelect.value,
            telefono_medico: telefonoInput.value,
            usuario: usuarioInput.value,
            contrasena: contrasenaInput.value
        };

        let medicos = JSON.parse(localStorage.getItem('medicos')) || [];
        medicos.push(nuevoMedico);
        localStorage.setItem('medicos', JSON.stringify(medicos));

        alert("Médico registrado con éxito.");
        form.reset();
    });

    // Consultar un médico
    btnConsultar.addEventListener('click', function() {
        const medicoUsuario = usuarioInput.value.trim();
        const medicos = JSON.parse(localStorage.getItem('medicos')) || [];
        const medico = medicos.find(m => m.usuario === medicoUsuario);

        if (medico) {
            // Mostrar los datos del médico en el formulario
            idMedicoInput.value = medico.id_medico;
            nombreMedicoInput.value = medico.nombre_medico;
            licenciaInput.value = medico.licencia;
            especialidadSelect.value = medico.especialidad;
            telefonoInput.value = medico.telefono_medico;
            contrasenaInput.value = medico.contrasena;
            confirmarContrasenaInput.value = medico.contrasena;
        } else {
            alert('Médico no encontrado.');
        }
    });

    // Actualizar un médico
    btnActualizar.addEventListener('click', function() {
        const medicoUsuario = usuarioInput.value.trim();
        let medicos = JSON.parse(localStorage.getItem('medicos')) || [];
        const medicoIndex = medicos.findIndex(m => m.usuario === medicoUsuario);

        if (medicoIndex !== -1) {
            medicos[medicoIndex] = {
                ...medicos[medicoIndex],
                nombre_medico: nombreMedicoInput.value,
                licencia: licenciaInput.value,
                especialidad: especialidadSelect.value,
                telefono_medico: telefonoInput.value,
                contrasena: contrasenaInput.value
            };
            localStorage.setItem('medicos', JSON.stringify(medicos));
            alert('Médico actualizado exitosamente.');
        } else {
            alert('Médico no encontrado.');
        }
    });

    // Eliminar un médico
    btnEliminar.addEventListener('click', function() {
        const medicoUsuario = usuarioInput.value.trim();
        let medicos = JSON.parse(localStorage.getItem('medicos')) || [];
        const medicoIndex = medicos.findIndex(m => m.usuario === medicoUsuario);

        if (medicoIndex !== -1) {
            medicos.splice(medicoIndex, 1);
            localStorage.setItem('medicos', JSON.stringify(medicos));
            alert('Médico eliminado exitosamente.');
            form.reset();
        } else {
            alert('Médico no encontrado.');
        }
    });

    cargarEspecialidades();
});
