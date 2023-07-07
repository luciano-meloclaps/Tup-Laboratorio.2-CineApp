//Funcion llamar API
const obtenerDatosPeliculas = async () => {
    //Consulta
    const respuestaConsulta = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=eeecbf28b7798d68db98744052fd047a&language=es-MX");
    console.log(respuestaConsulta);

    //Pasamos a obj
    const datosJson = await respuestaConsulta.json();
    console.log(datosJson.results);

    return datosJson.results;
};

//Funcion imprimir peliculas en el HTML
const mostrarPeliculas = (peliculas) => {
    let listaPeliculas = "";

    // Recorremos el array
    peliculas.forEach((pelicula) => {
        //Usamos templates para mostrar las peliculas
        listaPeliculas += `
        <div class="contenedorPeliculas">
        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
        <h3 class="titulo">${pelicula.title}</h3>
        <p><b>Código:</b> ${pelicula.id}<br>
        <b>Título original:</b> ${pelicula.original_title}<br>
        <b>Idioma original:</b> ${pelicula.original_language}<br>
        <b>Año:</b> ${pelicula.release_date}<br>
        <button class="button" data-code="${pelicula.id}">Agregar a favoritas</button>
        </div>
        `;
    });

    const sec_peliculas = document.getElementById("sec_peliculas");
    sec_peliculas.innerHTML = listaPeliculas;
};

//Funcion eveto click
const agregarEventosFavoritos = () => {
    //Capturo los botones y recorro
    const btnFavoritos = document.querySelectorAll(".button");
    btnFavoritos.forEach((btn) => {
        btn.addEventListener("click", agregarAFavoritos);
    });
};

// Funcion agregar a favoritos
const agregarAFavoritos = (event) => {
    const listaFavoritos = JSON.parse(localStorage.getItem("listaFavoritos")) || [];
    const codigoPelicula = event.target.dataset.code;

    // Comprobamos si el array de favoritos contiene el código de la película
    if (listaFavoritos.includes(codigoPelicula)) {
        // Si es así, mostramos un mensaje al usuario
        alert("Esta película ya está en tus favoritos");
    } else {
        listaFavoritos.push(codigoPelicula)
        alert("Película agregada a favoritos con éxito");
        localStorage.setItem("listaFavoritos", JSON.stringify(listaFavoritos));
        console.log(listaFavoritos);
    }
};

// Funcion para llamar Api y mostrar pelicula
const llamarApiPelicula = async () => {
    try {
        const peliculas = await obtenerDatosPeliculas();
        mostrarPeliculas(peliculas);
        agregarEventosFavoritos();
    } catch (error) {
        console.log(error);
    }
};

// Llamamos a la función llamarApiPelicula para ejecutarla
setTimeout(llamarApiPelicula, 2000);
