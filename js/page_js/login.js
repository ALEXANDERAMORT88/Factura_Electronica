document.addEventListener("DOMContentLoaded", function () {
  
  const formulario_ingreso = document.getElementById("formulario_ingreso");
  const usuarioFormulario = document.getElementById("usuarioFormulario");
  const password_ingreso = document.getElementById("password_ingreso");

  formulario_ingreso.addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = usuarioFormulario.value;
    const password = password_ingreso.value;

    fetch("http://localhost:5000/clientes/login", {
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
        return response.json(); // <- aquí regresas el JSON ya resuelto
      })
      .then((data) => {
        alert("Inicio de sesión exitoso");
        window.location.href = "../../pages/panel _de_gestion.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
});
