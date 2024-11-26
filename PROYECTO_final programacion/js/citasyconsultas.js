document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    const medicoSelect = document.getElementById('medico');
    const especialidadSelect = document.getElementById('especialidad');
    const fechaHoraInput = document.getElementById('fecha_hora');
    const estadoSelect = document.getElementById('estado');
    const motivoTextarea = document.getElementById('motivo');
    const diagnosticoTextarea = document.getElementById('diagnostico');
    const tratamientoTextarea = document.getElementById('tratamiento');
    const citasPacienteSelect = document.getElementById('consultasPaciente');

    const usuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion')) || {};
    const userRole = usuarioSesion.rol;

    // Configuración inicial según el rol del usuario
    if (userRole === 'paciente') {
        diagnosticoTextarea.disabled = true;
        tratamientoTextarea.disabled = true;
    } else if (userRole === 'medico') {
        const consultasPacienteGroup = document.getElementById('consultasPacienteGroup');
        consultasPacienteGroup.style.display = 'block';
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const cita = {
            id_cita: "CIT-" + Date.now(),
            fecha_hora: fechaHoraInput.value,
            especialidad: especialidadSelect.value,
            medico: medicoSelect.value,
            estado: estadoSelect.value,
            motivo: motivoTextarea.value,
            diagnostico: diagnosticoTextarea.value,
            tratamiento: tratamientoTextarea.value
        };

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion')) || {};

        if (userRole === 'paciente') {
            const index = usuarios.findIndex(user => user.id === usuarioSesion.id && user.rol === 'paciente');

            if (index !== -1) {
                if (!usuarios[index].citas) {
                    usuarios[index].citas = [];
                }
                usuarios[index].citas.push(cita);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                form.reset();
                alert('Cita guardada exitosamente');
            } else {
                alert('Paciente no encontrado');
            }
        } else if (userRole === 'medico') {
            const citaId = citasPacienteSelect.value;
            let citaActualizada = false;

            usuarios.forEach(user => {
                if (user.rol === 'paciente' && user.citas && Array.isArray(user.citas)) {
                    user.citas.forEach((citaExistente, index) => {
                        if (citaExistente.id_cita === citaId) {
                            user.citas[index] = cita;
                            citaActualizada = true;
                        }
                    });
                }
            });

            if (citaActualizada) {
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                form.reset();
                alert('Cita actualizada exitosamente');
            } else {
                alert('Cita no encontrada');
            }
        }
    });

    function cargarEspecialidades() {
        const especialidadesGuardadas = JSON.parse(localStorage.getItem('especialidades')) || [];
        especialidadSelect.innerHTML = '<option value="">Seleccione especialidad</option>';
        especialidadesGuardadas.forEach(especialidad => {
            const option = document.createElement('option');
            option.value = especialidad.nombre_especialidad;
            option.textContent = especialidad.nombre_especialidad;
            especialidadSelect.appendChild(option);
        });
    }

    function cargarMedicos() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const especialidadSeleccionada = especialidadSelect.value;
        medicoSelect.innerHTML = '<option value="">Seleccione médico</option>';
        usuarios.forEach(user => {
            if (user.rol === 'personal-medico' && (user.especialidad === especialidadSeleccionada || especialidadSeleccionada === '')) {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.nombreUsuario;
                medicoSelect.appendChild(option);
            }
        });
    }

    function cargarConsultasPendientes() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        citasPacienteSelect.innerHTML = '<option value="">Seleccione cita</option>';
        usuarios.forEach(user => {
            if (user.rol === 'paciente' && user.citas && Array.isArray(user.citas)) {
                user.citas.forEach(cita => {
                    if (cita.medico === usuarioSesion.id) {
                        const opcion = document.createElement("option");
                        opcion.value = cita.id_cita;
                        opcion.textContent = `${user.nombreUsuario} - ${cita.fecha_hora}`;
                        citasPacienteSelect.appendChild(opcion);
                    }
                });
            }
        });
    }

    citasPacienteSelect.addEventListener('change', function() {
        const citaId = citasPacienteSelect.value;
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let citaSeleccionada;

        usuarios.forEach(user => {
            if (user.rol === 'paciente' && user.citas && Array.isArray(user.citas)) {
                user.citas.forEach(cita => {
                    if (cita.id_cita === citaId) {
                        citaSeleccionada = cita;
                    }
                });
            }
        });

        if (citaSeleccionada) {
            fechaHoraInput.value = citaSeleccionada.fecha_hora;
            especialidadSelect.value = citaSeleccionada.especialidad;
            medicoSelect.value = citaSeleccionada.medico;
            estadoSelect.value = citaSeleccionada.estado;
            motivoTextarea.value = citaSeleccionada.motivo;
            diagnosticoTextarea.value = citaSeleccionada.diagnostico;
            tratamientoTextarea.value = citaSeleccionada.tratamiento;
        }
    });

    cargarEspecialidades();
    cargarMedicos();
    cargarConsultasPendientes();
});
