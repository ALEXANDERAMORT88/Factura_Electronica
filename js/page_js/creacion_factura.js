document.addEventListener("DOMContentLoaded", function () {
  const form_producto = document.getElementById("form_producto");
  const codigo_producto = document.getElementById("codigo_producto");
  const nombre_producto = document.getElementById("nombre_producto");
  const descripcion_producto = document.getElementById("descripcion_producto");
  const valor_unitario = document.getElementById("valor_unitario");

  const buscar_producto = document.getElementById("buscar_producto");
  const cantidad_producto = document.getElementById("cantidad_producto");
  const total_producto = document.getElementById("total_producto");

  form_producto.addEventListener("submit", function (event) {
    event.preventDefault();

    let saveCodigoProducto = codigo_producto.value;
    let saveNobreProducto = nombre_producto.value;
    let saveDescripcionProducto = descripcion_producto.value;
    let saveValorUnitario = valor_unitario.value;

    function marcarError(campo) {
      campo.style.border = "1px solid red";
      campo.style.borderRadius = "0.3125rem";
    }

    function limpiarError(campo) {
      campo.style.border = "";
    }

    [
      codigo_producto,
      nombre_producto,
      descripcion_producto,
      valor_unitario,
    ].forEach((campo) => limpiarError(campo));

    let hayError = false;

    // Validar los campos vacios
    if (!saveCodigoProducto) {
      marcarError(codigo_producto);
      hayError = true;
    }

    if (!saveNobreProducto) {
      marcarError(nombre_producto);
      hayError = true;
    }

    if (!saveDescripcionProducto) {
      marcarError(descripcion_producto);
      hayError = true;
    }

    if (!saveValorUnitario) {
      marcarError(valor_unitario);
      hayError = true;
    }

    if (hayError) {
      alert("Por favor completar todos los campos");
      return;
    }

    // // const datosAEnviar = {
    // //   codigo_producto: saveCodigoProducto,
    // //   nombre_producto: saveNobreProducto,
    // //   descripcion_producto: saveDescripcionProducto,
    // //   valor_unitario: saveValorUnitario,
    // // };
    // console.log(datosAEnviar); // Con esto podemos validar en herramientas de desarrollador lo que se enviamos desde el FrontEnd

    fetch("http://localhost:5000/producto",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo_producto: saveCodigoProducto,
          nombre_producto: saveNobreProducto,
          descripcion_producto: saveDescripcionProducto,
          valor_unitario: saveValorUnitario,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuseta del Backend: ",data);
        alert(data.message);        
      })
      .catch((error)=> {
        console.error("Error: ", error);
        alert("Error al registrar el producto")
      })
  });
});
