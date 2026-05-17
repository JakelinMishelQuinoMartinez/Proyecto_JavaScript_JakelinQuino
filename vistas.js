//=======================TARIFAS=======================

//Inicialización
document.addEventListener('DOMContentLoaded', () => {
    actualizarTablaTarifas();
});

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
    formTarifa.reset(); 
});

//Eliminar tarifa
function eliminarTarifa(index) {
    if(confirm("¿Seguro que desea eliminar esta tarifa?")) {
        tarifas.splice(index, 1);
        guardarYActualizar();
    }
}

//Seleccionar tipos de tarifa para el formulario de registro
function poblarSelectTipos() {
    selectTipo.innerHTML = '<option value="">Seleccione...</option>';
    tarifas.forEach(t => {
        selectTipo.innerHTML += `<option value="${t.tipo}">${t.tipo}</option>`;
    });
}

//======================SERVICIOS=====================

//Referencias
const btnRegistrarEntrada = document.getElementById('btn-registrar-entrada');
const btnCerrarModalSlots = document.getElementById('btn-cancel-slots');
const modalSlots = document.getElementById('modal-slots');
let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
const TOTAL_SLOTS = 20;

//Mostrar slots disponibles
btnRegistrarEntrada.addEventListener('click', () => {
    const contenedor = document.getElementById('contenedor-grid');
    contenedor.innerHTML = '';
    const slotsOcupados = servicios.map(s => parseInt(s.slot));
    for(let i = 1; i <= TOTAL_SLOTS; i++) {
        const estaOcupado = slotsOcupados.includes(i);
        const div = document.createElement('div');
        div.className = `slot ${estaOcupado ? 'ocupado' : 'libre'}`;
        div.innerText = i;
        if(!estaOcupado) div.onclick = () => abrirRegistro(i);   
        contenedor.appendChild(div);
    }
    modalSlots.style.display = 'flex';
});

//Cerrar modal de slots
btnCerrarModalSlots.addEventListener('click', () => {
    modalSlots.style.display = 'none';
});

