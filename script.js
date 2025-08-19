document.addEventListener("DOMContentLoaded", function () {
  // Creamos la logica para el menu deplegable
  const dropdownBoton = document.querySelector('.dropdown .btn_inicio');
  const dropdownMenu = document.querySelector('.dropdown_menu');

  const btnOpcionContador = document.getElementById('opc_contador');
  const btnOpcionFactElec = document.getElementById('opc_fact_electronica');
  const btnOpcionFactPos = document.getElementById('opc_fact_pos')
  const btnOpcionTienda = document.getElementById('opc_tienda')

  dropdownBoton.addEventListener("mouseenter", function () {
    dropdownMenu.style.display = "block";
  });

  dropdownMenu.addEventListener("mouseenter", function () {
    dropdownMenu.style.display = "block";
  });

  dropdownBoton.addEventListener("mouseleave", function () {
    setTimeout(function () {
      if (!dropdownMenu.matches(":hover")) {
        dropdownMenu.style.display = "none";
      }
    }, 100);
  });

  dropdownMenu.addEventListener("mouseleave", function () {
    dropdownMenu.style.display = "none";
  });

//   Damos opciones para pasar al Login para cada una de las opciones. 
  btnOpcionContador.addEventListener('click', function (e) {
    window.open('./pages/login.html', '_blanck')
  })

  btnOpcionFactElec.addEventListener('click', function () {
    window.open('./pages/login.html', '_blanck')
  })

  btnOpcionFactPos.addEventListener('click', function () {
    window.open('./pages/login.html', '_blanck')
  })

  btnOpcionTienda.addEventListener('click', function () {
    window.open('./pages/login.html', '_blank')
  })
});
