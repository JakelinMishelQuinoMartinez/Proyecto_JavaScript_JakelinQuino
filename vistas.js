//=======================TARIFAS=======================

//Referencias
const btnAgregarTarifa = document.getElementById('btn-agregar-tarifa');
const modalTarifaForm = document.getElementById('modal-tarifa-form');
const btnSaveTarifa = document.querySelector('#form-tarifa .btn-save');
const btnCancel = document.getElementById('btnn-cancel');
const tarifaCodigoInput = document.getElementById('tarifa-codigo');
const tarifaTipoInput = document.getElementById('tarifa-tipo');
const tarifaMontoInput = document.getElementById('tarifa-monto');
let tarifas = JSON.parse(localStorage.getItem('tarifas')) || [
    { codigo: 'M', tipo: 'Moto', monto: 10 },
    { codigo: 'P', tipo: 'Particular', monto: 20 }
];

//Mostrar modal para agregar tipo y tarifa
btnAgregarTarifa.addEventListener('click', () => {
    modalTarifaForm.style.display = 'flex';
});

document.addEventListener('DOMContentLoaded', () => {
    actualizarTablaTarifas();
});

//Agregar nueva tarifa
btnSaveTarifa.addEventListener('click', (e) => {
    e.preventDefault();
    const nuevaTarifa = {
        codigo: tarifaCodigoInput.value.toUpperCase(),
        tipo: tarifaTipoInput.value,
        monto: parseFloat(tarifaMontoInput.value)
    };
    tarifas.push(nuevaTarifa);
    guardarYActualizar();
    cerrarModalsFlotantes();
    e.target.reset();
});

//Actualizar tabla de tarifas
function actualizarTablaTarifas() {
    const tbody = document.querySelector('#tabla-tarifas tbody');
    tbody.innerHTML = '';
    tarifas.forEach((t, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${t.codigo}</td>
                <td>${t.tipo}</td>
                <td>Q${t.monto}</td>
                <td>
                    <button onclick="eliminarTarifa(${index})" class="btn-signin" style="background:#333">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

//Cerrar modal de tarifas
btnCancel.addEventListener("click", () => {
    modalTarifaForm.style.display = "none";
    btnSaveTarifa.reset();
});

