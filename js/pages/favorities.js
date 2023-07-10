// Función obtene películas del localStorage
const obtenerPeliculasFavoritas = async () => {

  const favoritos = JSON.parse(localStorage.getItem("listaFavoritos")) || [];
  let peliculas = [];

  for (let i = 0; i < favoritos.length; i++) {
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/${favoritos[i]}?api_key=eeecbf28b7798d68db98744052fd047a&language=es-MX`
    );
    // Si la respuesta es exitosa, la convertimos a JSON y la añadimos al array de películas
    if (respuesta.ok) {
      const pelicula = await respuesta.json();
      peliculas.push(pelicula);
    } else {
      console.error(
        "Error al obtener el detalle de la película:",
        respuesta.status
      );
    }
  }
  return peliculas;
};

// Función mostrar películas favoritas
const mostrarPeliculasFavoritas = (peliculas) => {
  // Obtenemos el contenedor de las películas favoritas
  const contenedorPeliculasFavoritas = document.getElementById("sec-favorities-list");
  // Si hay películas, creo una variable para guardar el HTML
  if (peliculas.length > 0) {
    let listaPeliculasFavoritas = ""; 
    peliculas.forEach((pelicula) => {
      listaPeliculasFavoritas += `
        <div class="contenedorPeliculasFavoritas">
          <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
          <h3 class="titulo">${pelicula.title}</h3>
          <p><b>Código:</b> ${pelicula.id}<br>
          <b>Título original:</b> ${pelicula.original_title}<br>
          <b>Idioma original:</b> ${pelicula.original_language}<br>
          <b>Resumen:</b> ${pelicula.overview}</p>
          <button class="btn-quitar" data-code="${pelicula.id}">Quitar de favoritas</button>
        </div>
      `;
    });
    contenedorPeliculasFavoritas.innerHTML = listaPeliculasFavoritas;
    agregarEventosQuitar();
  } else {
    contenedorPeliculasFavoritas.innerHTML = `
      <div class="mensaje">
        <p>No tienes películas seleccionadas como favoritas.</p>
      </div>
    `;
  }
};

// Función capturar boton
const agregarEventosQuitar = () => {
  // Capturamos los botones y los recorremos
  const btnQuitar = document.querySelectorAll(".btn-quitar");
  btnQuitar.forEach((btn) => {
    btn.addEventListener("click", quitarDeFavoritos);
  });

  console.log("Eventos de quitar agregados"); // Agrega este console.log
};

// Función quitar película del listado de favoritos
const quitarDeFavoritos = async (event) => {
  console.log("Botón 'Quitar de favoritas' presionado");
  // Código de la película a quitar
  const codigoPeliculaQuitar = String(event.target.dataset.code);
  let favoritos = JSON.parse(localStorage.getItem("listaFavoritos")) || [];
  // Filter favoritos
  favoritos = favoritos.filter((codigo) => codigo !== codigoPeliculaQuitar);
  localStorage.setItem("listaFavoritos", JSON.stringify(favoritos));

  mostrarPeliculas();
};

// Función mostrar películas
const mostrarPeliculas = async () => {
  const peliculas = await obtenerPeliculasFavoritas();
  mostrarPeliculasFavoritas(peliculas);
};

// Llamamos a la función
mostrarPeliculas();