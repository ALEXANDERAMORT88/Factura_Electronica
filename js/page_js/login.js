document.addEventListener("DOMContentLoaded", function () {

    const formulario_ingreso = document.getElementById('formulario_ingreso');
    const nombreUsuarioFormulario = document.getElementById('nombreUsuarioFormulario');
    const contraseña_ingreso = document.getElementById('contraseña_ingreso');

    formulario_ingreso.addEventListener('submit', function (event) {
        event.preventDefault()

        const guardarUsuario = localStorage.getItem('nombreUsuario');
        const guardarContraseña = localStorage.getItem('contraseñaUsuario');

        let nombreUsuario = nombreUsuarioFormulario.value;
        let contraseñaUsuario = contraseña_ingreso.value;

        if (guardarUsuario !== null && guardarContraseña !== null) {

            if ((guardarUsuario === nombreUsuario) && (guardarContraseña === contraseñaUsuario)) {
                window.location.href = '../../index.html'
            } else {
                alert('El nombre o la contraseña no coinciden');
            }
        } else {
            alert('El usuario no esra registrado, por favor registase primero');

        }
    })
})