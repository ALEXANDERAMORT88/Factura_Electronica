document.addEventListener("DOMContentLoaded", function () {
  const formulario_ingreso = document.getElementById("formulario_ingreso");
  const usuarioFormulario = document.getElementById("usuarioFormulario");
  const password_ingreso = document.getElementById("password_ingreso");

  formulario_ingreso.addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = usuarioFormulario.value;
    const password = password_ingreso.value;

    fetch("http://localhost:5000/empresa/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario: usuario, password: password }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error en login");
        }
        return response.json(); // Aquí regresamos el JSON ya resuelto
      })
      .then((data) => {
        console.log("Respuesta del backend (login):", data);

        if (data.success && data.usuario) {
          alert("Inicio de sesión exitoso");
          // Guardamos el nombre de la empresa  en localStorage
          localStorage.setItem("empresaNombre", data.usuario.nombre_usuario);
          console.log("Guardadno en localStorage", localStorage.getItem("empresaNombre")
          );
          // Redirigimos a Panel de gestion
          window.location.href = "../../pages/panel_de_gestion.html";
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  });
});
