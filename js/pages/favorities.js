// Definimos la función async obtenerPeliculasFavoritas
async function obtenerPeliculasFavoritas() {
    // Recuperamos las películas favoritas del localStorage
    let favoritas = localStorage.getItem("FAVORITOS");
  
    // Comprobamos si hay películas favoritas
    if (favoritas) {
      // Si hay, las convertimos a un array
      favoritas = JSON.parse(favoritas);
  
      // Creamos un array vacío para guardar las películas
      let peliculas = [];
  
      // Recorremos el array de favoritas
      for (let i = 0; i < favoritas.length; i++) {
        // Consultamos el detalle de la película en la API usando el método MOVIE
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${favoritas[i]}?api_key=eeecbf28b7798d68db98744052fd047a&language=es-MX`);
        
        // Convertimos la respuesta a un objeto JSON
        const pelicula = await respuesta.json();
  
        // Añadimos la película al array de películas
        peliculas.push(pelicula);
      }
  
      // Devolvemos el array de películas
      return peliculas;
    } else {
      // Si no hay, devolvemos null
      return null;
    }
  }
// Definimos la función mostrarPeliculasFavoritas
function mostrarPeliculasFavoritas(peliculas) {
    // Comprobamos si hay películas
    if (peliculas) {
      // Si hay, creamos una variable para guardar el HTML de las películas
      let listaPeliculas = "";
  
      // Recorremos el array de películas
      peliculas.forEach((pelicula) => {
        // Usamos templates para mostrar las películas con los datos que nos piden
        listaPeliculas += `
          <div class="contenedorPeliculas">
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
            <h3 class="titulo">${pelicula.title}</h3>
            <p><b>Código:</b> ${pelicula.id}<br>
            <b>Título original:</b> ${pelicula.original_title}<br>
            <b>Idioma original:</b> ${pelicula.original_language}<br>
            <b>Resumen:</b> ${pelicula.overview}</p>
            <button class="button" data-code="${pelicula.id}">Quitar de favoritas</button>
          </div>
          `;
      });
  
      // Capturamos el elemento donde vamos a mostrar las películas
      const sec_peliculas = document.getElementById("sec_peliculas");
  
      // Asignamos el HTML de las películas al elemento
      sec_peliculas.innerHTML = listaPeliculas;
    } else {
      // Si no hay, mostramos un mensaje al usuario que indique que no tiene películas seleccionadas
      alert("No tiene películas seleccionadas");
    }
  }
// Definimos la función quitarDeFavoritas
function quitarDeFavoritas(event) {
    // Obtenemos el código de la película que se quiere quitar de favoritos, que está guardado en el atributo data-code del botón
    const codigoPelicula = event.target.dataset.code;
  
    // Recuperamos las películas favoritas del localStorage y las convertimos a un array
    let favoritas = JSON.parse(localStorage.getItem("FAVORITOS"));
  
    // Comprobamos si el array contiene el código de la película
    if (favoritas.includes(codigoPelicula)) {
      // Si lo contiene, lo eliminamos del array usando el método filter
      favoritas = favoritas.filter((favorita) => favorita !== codigoPelicula);
  
      // Guardamos el array actualizado en el localStorage
      localStorage.setItem("FAVORITOS", JSON.stringify(favoritas));
  
      // Capturamos el elemento que contiene la película que se quiere quitar de favoritos, que es el padre del botón
      const contenedorPelicula = event.target.parentElement;
  
      // Eliminamos el elemento del HTML usando el método remove
      contenedorPelicula.remove();
    }
  }
// Añadimos un evento click a los botones de quitar de favoritos
const botonesQuitar = document.querySelectorAll(".button");
botonesQuitar.forEach((boton) => {
  boton.addEventListener("click", quitarDeFavoritas);
});
// Llamamos a la función obtenerPeliculasFavoritas y usamos su resultado para llamar a la función mostrarPeliculasFavoritas
obtenerPeliculasFavoritas()
  .then((peliculas) => mostrarPeliculasFavoritas(peliculas))
  .catch((error) => alert("Error: Se produjo un error al consultar las películas favoritas"));
      