//=======================TARIFAS=======================

//Inicialización
document.addEventListener('DOMContentLoaded', () => {
    actualizarTablaTarifas();
});

//Referencias
const btnAgregarTarifa = document.getElementById('btn-agregar-tarifa');
const modalTarifaForm = document.getElementById('modal-tarifa-form');
const btnSaveTarifa = document.querySelector('#form-tarifa .btn-save');
const btnCancelTarifa = document.getElementById('btnn-cancel');
const formTarifa = document.getElementById('form-tarifa');
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

//Abrir formulario de registro de tarifa
formTarifa.addEventListener('submit', (e) => {
    e.preventDefault();
    const nuevaTarifa = {
        codigo: document.getElementById('tarifa-codigo').value.toUpperCase(),
        tipo: document.getElementById('tarifa-tipo').value,
        monto: parseFloat(document.getElementById('tarifa-monto').value)
    };
    tarifas.push(nuevaTarifa);
    guardarYActualizar();
    modalTarifaForm.style.display = 'none';
    formTarifa.reset();
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
btnCancelTarifa.addEventListener("click", () => {
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
const contenedorGrid = document.getElementById('contenedor-grid');
const modalParkingForm = document.getElementById('modal-registro-parking');
const formParking = document.getElementById('form-parking');
const selectTipo = document.getElementById('select-tipo');
const prefijoPlaca = document.getElementById('prefijo-placa');
const btnCancelParking = document.getElementById('btn-cancel-parking');
let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
const TOTAL_SLOTS = 20;

//Mostrar slots disponibles
btnRegistrarEntrada.addEventListener('click', () => {
    contenedorGrid.innerHTML = '';
    const slotsOcupados = servicios.map(s => parseInt(s.slot));
    for(let i = 1; i <= TOTAL_SLOTS; i++) {
        const estaOcupado = slotsOcupados.includes(i);
        const div = document.createElement('div');
        div.className = `slot ${estaOcupado ? 'ocupado' : 'libre'}`;
        div.innerText = i;
        if(!estaOcupado) {
            div.onclick = () => abrirRegistro(i);
        }
        contenedorGrid.appendChild(div);
    }
    modalSlots.style.display = 'flex';
});

// Control dinámico de prefijos en la placa según el vehículo elegido
selectTipo.addEventListener('change', (e) => {
    const vehiculoSeleccionado = tarifas.find(t => t.tipo === e.target.value);
    prefijoPlaca.innerText = vehiculoSeleccionado ? vehiculoSeleccionado.codigo : '?';
});

// Abrir formulario de registro de entrada
function abrirRegistro(numSlot) {
    modalSlots.style.display = 'none';
    modalParkingForm.style.display = 'flex';
    document.getElementById('input-slot').value = numSlot;
    document.getElementById('titulo-registro').innerText = `Registro Slot #${numSlot}`;
    prefijoPlaca.innerText = '?';
}

//Cancelar registro de parking
btnCancelParking.addEventListener('click', () => {
    modalParkingForm.style.display = 'none';
    formParking.reset();
});

//Cerrar modal de slots
btnCerrarModalSlots.addEventListener('click', () => {
    modalSlots.style.display = 'none';
});

