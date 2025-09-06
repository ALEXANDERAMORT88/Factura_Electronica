document.addEventListener("DOMContentLoaded", function () {
  const formulario_ingreso = document.getElementById("formulario_ingreso");
  const usuarioFormulario = document.getElementById("usuarioFormulario");
  const password_ingreso = document.getElementById("password_ingreso");
  const link_vista_registro = document.getElementById("link_vista_registro");

  formulario_ingreso.addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = usuarioFormulario.value;
    const password = password_ingreso.value;
    // Con fetch nos va apermitir hacer peticiones HTTP  a nuestro BackEnd 
    fetch("http://localhost:5000/empresa/login", {
      method: "POST",
      // Indicamoms el tipo de contenido que enviamos (JSON)
      headers: {
        "Content-Type": "application/json",
      },
      // Convertimos el objeto JS a JSON antes de enviarlo
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

        if (data.success && data.data) {
          alert("Inicio de sesión exitoso");
          // Guardamos el nombre de la empresa  en localStorage
          localStorage.setItem("empresaNombre", data.data.nombre);
          console.log(
            "Guardadno en localStorage",
            localStorage.getItem("empresaNombre")
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

  // Nos permite redirigir a la vista de Register
  link_vista_registro.addEventListener("click", function () {
    window.open("../../pages/register.html", "_blank");
  });
});
