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

    // Validar la existencia del código y no repetir el mismo en el array
    // Aquí debería ir una consulta a la base de datos para verificar si la película existe
    // Por simplicidad, asumiremos que la película existe y se puede agregar a favoritos
    FAVORITOS.push(codigo);
    console.log("Película agregada con éxito");
  }
}
