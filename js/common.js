//Validaciones
const FAVORITOS = [];

function agregarPeliculaFavoritos(codigo) {
  // Validar que el valor ingresado es numérico
  if (isNaN(codigo)) {
    console.log("Error: La pelicula seleccionada no se encientra en la API o se produjo un error al consultar");
    return;

  } else {
    // Validar que la película no haya sido ingresada
    if (FAVORITOS.includes(codigo)) {
      console.log("La Pelicula ingresada ya se encuentra almacenada");
      return;
    }


    FAVORITOS.push(codigo);
    console.log("Película agregada con éxito");
  }
}
