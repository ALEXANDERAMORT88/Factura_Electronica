document.addEventListener("DOMContentLoaded", function () {

  const nombre_usuario = document.querySelector(".nombre_usuario");

  const empresaNombre = localStorage.getItem("empresaNombre");
  if (empresaNombre) {
    nombre_usuario.textContent = empresaNombre;
  } else {
    nombre_usuario.textContent = "Empresa desconocida ❌";
  }
});