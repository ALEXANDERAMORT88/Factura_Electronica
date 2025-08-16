document.addEventListener('DOMContentLoaded', function () {
    
    // Accedemos a los elementos del DOM usando su ID y los guardamos en variables.

    // Elementos del formulario para capturar y almacenar los datos ingresados por el usuario
    const formulario_registro = document.getElementById('formulario_registro');
    const numero_identificacion = document.getElementById('numero_identificacion');
    const nombre_usuario = document.getElementById('nombre_usuario');
    const numero_celular = document.getElementById('numero_celular');
    const email_usuario = document.getElementById('email_usuario');
    const confirmacion_email = document.getElementById('confirmacion_email');
    const contraseña_usuario = document.getElementById('contraseña_usuario');
    const confirmacion_contraseña = document.getElementById('confirmacion_contraseña');

    const contenedor_registro = document.getElementById('contenedor_registro');
    const contendor_de_seleccion = document.getElementById('contendor_de_seleccion');
    const boton_compra = document.getElementById('boton_compra');
    const boton_regresar = document.getElementById('boton_regresar');

    // Logica para poder ocultar el formulario.
    boton_compra.addEventListener('click', function () {
        contendor_de_seleccion.classList.add('d-none');
        contenedor_registro.classList.remove('d-none')
    });

    boton_regresar.addEventListener('click', function () {
        contendor_de_seleccion.classList.remove('d-none');
        contenedor_registro.classList.add('d-none');
    });

    // Creamos una funcion el cual no va ayudar a manejar el evento para manejar el envio de la informacion del formulario y guardarlo en MongoDB.
  formulario_registro.addEventListener("submit", function (event) {
    event.preventDefault();

    let saveNumeroIdentificacion = numero_identificacion.value;
    let nombreUsuario = nombre_usuario.value;
    let saveNumeroCelular = numero_celular.value;
    let saveEmailUsuario = email_usuario.value;
    let saveConfirmacionEmail = confirmacion_email.value;
    let contraseñaUsuario = contraseña_usuario.value;
    let saveConfirmacionContraseña = confirmacion_contraseña.value;

// función para marcar el error
    function marcarError(campo) {
        campo.style.border = '1px solid red';
        campo.style.borderRadius = '5px';
    }

    function limpiarError(campo) {
        campo.style.border = '';
    }

    // limpiar errores antes de validar 
    [numero_identificacion, nombre_usuario, numero_celular, email_usuario, confirmacion_email, contraseña_usuario, confirmacion_contraseña].forEach(campo => limpiarError(campo));

    let hayError = false;

// Validar campos vacíos
    if (!saveNumeroIdentificacion) { marcarError(numero_identificacion); hayError = true; }
    if (!nombreUsuario) { marcarError(nombre_usuario); hayError = true; }
    if (!saveNumeroCelular) { marcarError(numero_celular); hayError = true; }
    if (!saveEmailUsuario) { marcarError(email_usuario); hayError = true; }
    if (!saveConfirmacionEmail) { marcarError(confirmacion_email); hayError = true; }
    if (!contraseñaUsuario) { marcarError(contraseña_usuario); hayError = true; }
    if (!saveConfirmacionContraseña) { marcarError(confirmacion_contraseña); hayError = true; }

    if (hayError) {
      alert("Por favor completa todos los campos");
      return;
    }
// Valicdar correos 
    if (saveEmailUsuario !== saveConfirmacionEmail) {
        marcarError(email_usuario);
        marcarError(confirmacion_email)
      alert("Los correos electronicos no coinciden");
      return;
    }
// Validar contraseña
    if (contraseñaUsuario !== saveConfirmacionContraseña) {
        marcarError(contraseña_usuario);
        marcarError(confirmacion_contraseña)
      alert("las contraseñas no coiciden");
      return;
    }

    

    localStorage.setItem("saveNumeroIdentificaion", saveNumeroIdentificaion);
    localStorage.setItem("nombreUsuario", nombreUsuario);
    localStorage.setItem("saveNumeroCelular", saveNumeroCelular);
    localStorage.setItem("contraseñaUsuario", contraseñaUsuario);
    localStorage.setItem("saveEmailUsuario", saveEmailUsuario);

    window.location.href = "../../pages/generar_factura.html";
  });
})