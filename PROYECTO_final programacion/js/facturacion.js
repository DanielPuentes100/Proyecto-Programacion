document.addEventListener('DOMContentLoaded', function() {
    const invoiceForm = document.querySelector('.invoice-form');
    const usuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion')) || {}; // Obtener el usuario que inició sesión

    invoiceForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe

        const generateInvoiceId = () => {
            const datePart = new Date().toISOString().replace(/[-:.]/g, "");
            const randomPart = Math.floor(Math.random() * 10000);
            return `FAC-${datePart}-${randomPart}`;
        };

        const today = new Date();
        const dueDate = new Date();
        dueDate.setDate(today.getDate() + 30); // Establecer la fecha de vencimiento a 30 días a partir de hoy

        const factura = {
            id_factura: generateInvoiceId(),
            fecha_emision: today.toISOString().split('T')[0], // Fecha de emisión en formato YYYY-MM-DD
            monto: document.getElementById('monto').value,
            metodo_pago: document.getElementById('metodo_pago').value,
            estado_pago: document.getElementById('estado_pago').value,
            concepto: document.getElementById('concepto').value,
            descuento: document.getElementById('descuento').value,
            fecha_vencimiento: dueDate.toISOString().split('T')[0] // Fecha de vencimiento en formato YYYY-MM-DD
        };

        // Obtener el usuario que inició sesión y sus facturas
        const pacientesGuardados = JSON.parse(localStorage.getItem('pacientes')) || [];
        const paciente = pacientesGuardados.find(p => p.identificacion === usuarioSesion.id);

        if (paciente) {
            if (!paciente.facturas) {
                paciente.facturas = [];
            }
            paciente.facturas.push(factura);
            localStorage.setItem('pacientes', JSON.stringify(pacientesGuardados));
            showModal(factura);
            invoiceForm.reset();
        } else {
            alert('Usuario no encontrado');
        }
    });
});

function showModal(factura) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>Factura Generada</h2>
            <p><strong>ID Factura:</strong> ${factura.id_factura}</p>
            <p><strong>Monto:</strong> ${factura.monto}</p>
            <p><strong>Fecha de Emisión:</strong> ${factura.fecha_emision}</p>
            <p><strong>Método de Pago:</strong> ${factura.metodo_pago}</p>
            <p><strong>Estado de Pago:</strong> ${factura.estado_pago}</p>
            <p><strong>Concepto:</strong> ${factura.concepto}</p>
            <p><strong>Descuento:</strong> ${factura.descuento}</p>
            <p><strong>Fecha de Vencimiento:</strong> ${factura.fecha_vencimiento}</p>
        </div>
    `;
    document.body.appendChild(modal);

    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        modal.remove();
    });

    modal.style.display = 'block';
}