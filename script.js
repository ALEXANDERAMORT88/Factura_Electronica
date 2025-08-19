document.addEventListener('DOMContentLoaded', function () {

    // Creamos la logica para el menu deplegable
    const dropdownBoton = document.querySelector('.dropdown .btn_inicio');
    const dropdownMenu = document.querySelector('.dropdown_menu');

    dropdownBoton.addEventListener('mouseenter', function () {
        dropdownMenu.style.display ='block';
    })

    dropdownMenu.addEventListener('mouseenter', function () {
        dropdownMenu.style.display = 'block'
    })

    dropdownBoton.addEventListener('mouseleave', function () {
        setTimeout(function() {
            if (!dropdownMenu.matches(':hover')) {
                dropdownMenu.style.display = 'none';
            }
        },100)
    })

    dropdownMenu.addEventListener('mouseleave', function () {
        dropdownMenu.style.display = 'none'
    })
})