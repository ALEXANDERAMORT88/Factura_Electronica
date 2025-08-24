document.addEventListener("DOMContentLoaded", function () {

  // Creamos una constante que nos permita guardar la infomación
  // de una etiqueta que tiene una class llamada nombre_usuario
  const nombre_usuario = document.querySelector(".nombre_usuario");

  // Creamos una constante de nombre empresaNombre que nos permita 
  // obtener el valor de almacenamiento en localStorage bajo un nombre de clave "empresaNombre"
  const empresaNombre = localStorage.getItem("empresaNombre");

  // Si existe un valor en localStorage, lo mostramos en el <h2>
  // De lo contrario, mostramos un mensaje de empresa desconocida
  if (empresaNombre) {
    nombre_usuario.textContent = empresaNombre;
  } else {
    nombre_usuario.textContent = "Empresa desconocida ❌";
  }
});