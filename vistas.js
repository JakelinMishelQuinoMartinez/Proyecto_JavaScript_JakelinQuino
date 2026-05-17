//=======================TARIFAS=======================

//Referencias
const btnAgregarTarifa = document.getElementById('btn-agregar-tarifa');
const modalTarifaForm = document.getElementById('modal-tarifa-form');
const btnSubmitTarifa = document.getElementById('form-tarifa');
const btnCancel = document.getElementById('btnn-cancel');

//Mostrar modal para agregar tipo y tarifa
btnAgregarTarifa.addEventListener('click', () => {
    modalTarifaForm.style.display = 'flex';
});

//Cerrar modal de tarifas
btnCancel.addEventListener("click", () => {
    modalTarifaForm.style.display = "none";
    btnSubmitTarifa.reset();
});