document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const registrarButton = document.querySelector('button[type="submit"]');
    const consultarButton = document.querySelector('button.consultar');
    const actualizarButton = document.querySelector('button.actualizar');
    const eliminarButton = document.querySelector('button.eliminar');

    function limpiarFormulario() {
        form.reset();
    }

    function validarCampos(especialidad) {
        for (const key in especialidad) {
            if (especialidad[key].trim() === '' && key !== 'descripcion_especialidad') {
                alert(`El campo ${key} no puede estar vacío o contener solo espacios en blanco`);
                return false;
            }
        }
        return true;
    }

    function generarUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    registrarButton.addEventListener('click', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe

        const especialidad = {
            id_especialidad: generarUUID(), // Generar un ID único
            nombre_especialidad: document.getElementById('nombre_especialidad').value,
            descripcion_especialidad: document.getElementById('descripcion_especialidad').value,
            estado_especialidad: document.getElementById('estado_especialidad').value,
            fecha_creacion: new Date().toLocaleString() // Fecha y hora actual
        };

        if (!validarCampos(especialidad)) {
            return;
        }

        // Obtener todas las especialidades guardadas en Local Storage
        const especialidadesGuardadas = JSON.parse(localStorage.getItem('especialidades')) || [];
        
        // Validar si ya existe una especialidad con el mismo nombre
        const especialidadExistente = especialidadesGuardadas.find(e => e.nombre_especialidad === especialidad.nombre_especialidad);
        if (especialidadExistente) {
            alert('Ya existe una especialidad con el mismo nombre');
            return;
        }

        // Guardar la nueva especialidad en Local Storage
        especialidadesGuardadas.push(especialidad);
        localStorage.setItem('especialidades', JSON.stringify(especialidadesGuardadas));

        alert('Especialidad guardada');
        console.log(especialidad);

        // Limpiar el formulario
        limpiarFormulario();
    });

    consultarButton.addEventListener('click', function() {
        const nombre_especialidad = prompt('Ingrese el nombre de la especialidad a consultar:');
        const especialidadesGuardadas = JSON.parse(localStorage.getItem('especialidades')) || [];
        const especialidad = especialidadesGuardadas.find(e => e.nombre_especialidad === nombre_especialidad);

        if (especialidad) {
            document.getElementById('id_especialidad').value = especialidad.id_especialidad;
            document.getElementById('nombre_especialidad').value = especialidad.nombre_especialidad;
            document.getElementById('descripcion_especialidad').value = especialidad.descripcion_especialidad;
            document.getElementById('estado_especialidad').value = especialidad.estado_especialidad;
            document.getElementById('fecha_creacion').value = especialidad.fecha_creacion;
        } else {
            alert('Especialidad no encontrada');
        }
    });

    actualizarButton.addEventListener('click', function() {
        const id_especialidad = document.getElementById('id_especialidad').value;
        const especialidadesGuardadas = JSON.parse(localStorage.getItem('especialidades')) || [];
        const especialidadIndex = especialidadesGuardadas.findIndex(e => e.id_especialidad === id_especialidad);

        if (especialidadIndex !== -1) {
            const especialidad = {
                id_especialidad: document.getElementById('id_especialidad').value,
                nombre_especialidad: document.getElementById('nombre_especialidad').value,
                descripcion_especialidad: document.getElementById('descripcion_especialidad').value,
                estado_especialidad: document.getElementById('estado_especialidad').value,
                fecha_creacion: especialidadesGuardadas[especialidadIndex].fecha_creacion // Mantener la fecha de creación original
            };

            if (!validarCampos(especialidad)) {
                return;
            }

            especialidadesGuardadas[especialidadIndex] = especialidad;
            localStorage.setItem('especialidades', JSON.stringify(especialidadesGuardadas));

            alert('Especialidad actualizada');
            limpiarFormulario();
        } else {
            alert('Especialidad no encontrada');
        }
    });

    eliminarButton.addEventListener('click', function() {
        const id_especialidad = document.getElementById('id_especialidad').value;
        let especialidadesGuardadas = JSON.parse(localStorage.getItem('especialidades')) || [];
        const especialidadIndex = especialidadesGuardadas.findIndex(e => e.id_especialidad === id_especialidad);

        if (especialidadIndex !== -1) {
            especialidadesGuardadas.splice(especialidadIndex, 1);
            localStorage.setItem('especialidades', JSON.stringify(especialidadesGuardadas));

            alert('Especialidad eliminada');
            limpiarFormulario();
        } else {
            alert('Especialidad no encontrada');
        }
    });
});