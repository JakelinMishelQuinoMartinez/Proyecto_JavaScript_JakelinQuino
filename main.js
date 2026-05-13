//====================INICIAR SESIÓN===================

//Referencias
const iniciarSecion = document.getElementById("log_in")
const formulario = document.getElementById("loginForm")
const header = document.querySelector(".header");
const mainContent = document.querySelector(".main");

//Credenciales
const correo = "admin@campusparking.com"
const contraseña = "Admin123"

//Verificar Credenciales
formulario.addEventListener("submit", (e) =>{
    e.preventDefault();
    const pasword = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    if (contraseña == pasword && correo == email){
        iniciarSecion.style.display = "none";
        formulario.reset();
    } else {
        alert("Correo o contraseña incorrectos\n      ¡Intente de nuevo!")
    }
})
