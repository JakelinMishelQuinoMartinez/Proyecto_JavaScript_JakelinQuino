//====================INICIAR SESIÓN===================

//Referencias
const iniciarSecion = document.getElementById("log_in")
const formulario = document.getElementById("loginForm")
const header = document.querySelector(".header");
const mainContent = document.querySelector(".main");
const userTextHeader = document.querySelector("#perfil .text_hide");

//Credenciales
let nombreDefault = "Admin"
const correo = "admin@campusparking.com"
let contraseñaDefault = "Admin123"

//Credenciales del LocalStorage
let nombreActual = JSON.parse(localStorage.getItem("nuevoNombre")) || nombreDefault;
let contraseñaActual = JSON.parse(localStorage.getItem("newPassword")) || contraseñaDefault;

//Colocar el nombre del Usuario en el header
userTextHeader.textContent = nombreActual;

//Verificar Credenciales
formulario.addEventListener("submit", (e) =>{
    e.preventDefault();
    const pasword = document.getElementById("password").value;
    const email = document.getElementById("email").value.trim();
    if (contraseñaActual == pasword && correo == email){
        iniciarSecion.style.display = "none";
        formulario.reset();
    } else {
        alert("Correo o contraseña incorrectos\n      ¡Intente de nuevo!")
    }
})

//====================CERRAR SESIÓN===================

//Referencias
const cerrarSesion = document.getElementById("log_out")

//Mostrar la card de iniciar sesión
cerrarSesion.addEventListener("click", (e) => {
    if (confirm("¿Está seguro de que quiere cerrar sesión?")) {
        iniciarSecion.style.display = "flex";
      }
})

//====================EDITAR PERFIL===================

// Referencias
const perfilBtn = document.getElementById("perfil");
const editarPerfil = document.getElementById("edit_profile");
const btnCancelar = document.getElementById("btn-cancel");
const profileForm = document.getElementById("profileForm");

// Abrir la sección para editar perfil
perfilBtn.addEventListener("click", () => {
    editarPerfil.style.display = "flex";
    document.getElementById("edit_username").value = nombreActual;
    document.getElementById("edit_password").value = ""; 
    document.getElementById("confirm_password").value = "";
});

//Cerrar la sección de perfil (Botón de Cancelar)
btnCancelar.addEventListener("click", () => {
    editarPerfil.style.display = "none";
    profileForm.reset();
});

//Validar y guardar cambios (Botón Submit)
profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nuevoNombre = document.getElementById("edit_username").value;
    const nuevaContrasena = document.getElementById("edit_password").value.trim();
    const confirmarPasword = document.getElementById("confirm_password").value.trim();
    if (nuevaContrasena !== "" || confirmarPasword !== nuevaContrasena) {
        if (nuevaContrasena !== confirmarPasword) {
            alert("Las contraseñas no coinciden. Por favor, verifica.");
            return;
        }
    }
    const decision = confirm("¿Está seguro de que desea guardar estos cambios?");
    if (decision) {
        localStorage.setItem("nuevoNombre", JSON.stringify(nuevoNombre));
        nombreActual = nuevoNombre;
        if (nuevaContrasena !== "") {
            localStorage.setItem("newPassword", JSON.stringify(nuevaContrasena));
            contraseñaActual = nuevaContrasena;
        }
        userTextHeader.textContent = nuevoNombre;
        alert("Perfil actualizado con éxito.");
        editarPerfil.style.display = "none";
        profileForm.reset();
    }
});

//====================MODALS===================

// Referencias
const btnServicios = document.getElementById("servicescontainer");
const btnTipos = document.getElementById("types_container");
const btnEstados = document.getElementById("status_container");
const todasLasVistas = document.querySelectorAll(".contenido-blanco");

//Ocultar o mostrar modals
function cambiarVista(idSeleccionado) {
    todasLasVistas.forEach(vista => vista.classList.remove("active"));    
    document.getElementById(idSeleccionado).classList.add("active");
}

// Eventos
btnServicios.addEventListener("click", () => cambiarVista("modal-servicios"));
btnTipos.addEventListener("click", () => cambiarVista("modal-tipos"));
btnEstados.addEventListener("click", () => cambiarVista("modal-estados"));