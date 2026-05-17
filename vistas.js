//=======================TARIFAS=======================

// --- INICIALIZACIÓN AL CARGAR LA APP ---
document.addEventListener('DOMContentLoaded', () => {
    actualizarTablaTarifas();
});

// --- FUNCIONES GLOBAL DE PERSISTENCIA ---
function guardarYActualizar() {
    localStorage.setItem('tarifas', JSON.stringify(tarifas));
    localStorage.setItem('servicios', JSON.stringify(servicios));
    actualizarTablaTarifas();
    actualizarTablaServicios();
    poblarSelectTipos();
}

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

// Enviar Registro del Formulario
formParking.addEventListener('submit', (e) => {
    e.preventDefault();
    const tipo = selectTipo.value;
    const tarifaObj = tarifas.find(t => t.tipo === tipo); 
    const nuevoServicio = {
        slot: document.getElementById('input-slot').value,
        tipo: tipo,
        codigo: tarifaObj.codigo,
        tarifa: tarifaObj.monto,
        placa: tarifaObj.codigo + document.getElementById('input-placa').value.toUpperCase(),
        propietario: document.getElementById('input-propietario').value,
        entrada: new Date().toISOString()
    };
    servicios.push(nuevoServicio);
    guardarYActualizar();
    modalParkingForm.style.display = 'none';
    formParking.reset();
});

//Actualizar tabla de servicios activos
function actualizarTablaServicios() {
    const tbody = document.querySelector('#tabla-servicios tbody');
    tbody.innerHTML = '';
    servicios.forEach((s, index) => {
        const horaEntrada = new Date(s.entrada).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        tbody.innerHTML += `
            <tr>
                <td>${s.slot}</td>
                <td>${s.tipo}</td>
                <td>${s.placa}</td>
                <td>${s.propietario}</td>
                <td>${horaEntrada}</td>
                <td id="tiempo-${index}">0 min</td>
                <td>
                    <button onclick="finalizarServicio(${index})" class="btnRegistrar" style="background:var(--verde-opaco); padding: 5px 10px;">Salida</button>
                    <button onclick="eliminarServicio(${index})" class="btn-nuevo" style="background:#333; padding: 5px 10px;">X</button>
                </td>
            </tr>
        `;
    });
    calcularTiemposActivos();
}

// Calcular tiempo activo de cada servicio
function calcularTiemposActivos() {
    servicios.forEach((s, index) => {
        const el = document.getElementById(`tiempo-${index}`);
        if(el) {
            const minutos = Math.floor((new Date() - new Date(s.entrada)) / 60000);
            el.innerText = `${minutos} min`;
        }
    });
}

// Intervalo que corre en segundo plano recalculando el tiempo en la tabla cada 10 segundos
setInterval(calcularTiemposActivos, 10000);

//Cerrar modal de slots
btnCerrarModalSlots.addEventListener('click', () => {
    modalSlots.style.display = 'none';
});

//Finalizar servicio y calcular cobro
function finalizarServicio(index) {
    const s = servicios[index];
    const salida = new Date();
    const entrada = new Date(s.entrada);
    const diffMs = salida - entrada;
    const diffHoras = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60))); 
    const total = diffHoras * s.tarifa;
    if(confirm(`Salida de Placa: ${s.placa}\nTiempo aproximado: ${Math.floor(diffMs/60000)} min.\nTotal a Cobrar: Q${total}`)) {
        historialSalidas.push({
            placa: s.placa,
            entrada: entrada.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            salida: salida.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            total: `Q${total}`
        });
        servicios.splice(index, 1);
        guardarYActualizar();
    }
}

//=====================HISTORIAL DE SALIDAS=====================

//Refencias
let historialSalidas = JSON.parse(localStorage.getItem('historialSalidas')) || [];

