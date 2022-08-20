if (localStorage.getItem("nombre-usuario") === null && sessionStorage.getItem("nombre-usuario") === null) {

    let formularioUsuario = document.getElementById("formulario-usuario");
    formularioUsuario.addEventListener("submit", validarFormulario);
    console.log("hey")


} else {
    quitarBloqueo();
    mostrarNombreEnDOM();
}

function validarFormulario(evento) {
    console.log(evento);
    evento.preventDefault();
    let formulario = evento.target;
    nombre = formulario.children[2].children[1].value;
    email = formulario.children[3].children[1].value;
    recordar = formulario.children[4].children[0].checked;

    if (recordar) {
        localStorage.setItem("nombre-usuario", nombre);
        localStorage.setItem("email-usuario", email);
    } else {
        sessionStorage.setItem("nombre-usuario", nombre);
        sessionStorage.setItem("email-usuario", email);
    }
    quitarBloqueo();
    mostrarNombreEnDOM();

}
function quitarBloqueo() {
    const DOMBloqueo = document.getElementById("bloqueo");
    DOMBloqueo.innerHTML = '';
}

function mostrarNombreEnDOM() {
    const DOMUsuario = document.getElementById("user");
    const usuario = localStorage.getItem("nombre-usuario") || sessionStorage.getItem("nombre-usuario")
    DOMUsuario.innerHTML = `<h4>Bienvenido, ${usuario}</h4>`;

    const btnLogout = document.createElement('button');
    btnLogout.classList.add('btn', 'btn-secondary');
    btnLogout.innerText = '¿No eres tu?';
    btnLogout.addEventListener("click", cerrarSesion);

    DOMUsuario.appendChild(btnLogout);

}

function cerrarSesion(){
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
}
