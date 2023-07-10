let page = 1;

const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    page = page + 1;
    mostrarPeliculas();
});

btnAnterior.addEventListener('click', () => {
    page = page - 1;
    mostrarPeliculas();
});

// Funcion llamar API
const obtenerDatosPeliculas = async () => {
    try {
        // Consulta
        const respuestaConsulta = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=eeecbf28b7798d68db98744052fd047a&language=es-MX&page=${page}`);
        console.log(respuestaConsulta);

        // Pasamos a obj
        const datosJson = await respuestaConsulta.json();
        console.log(datosJson.results);

        return datosJson.results;
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Funcion imprimir peliculas en el HTML
const mostrarPeliculas = async () => {
    try {
        const peliculas = await obtenerDatosPeliculas();
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

        agregarEventosFavoritos();
    } catch (error) {
        console.error(error);
    }
};

// Funcion agregar a favoritos
const agregarAFavoritos = (event) => {
    const listaFavoritos = JSON.parse(localStorage.getItem("listaFavoritos")) || [];
    const codigoPeliculaFavoritos = event.target.dataset.code;

    //Capturo msj
    const msgWarning = document.querySelector(".msgWarning");
    const msgSuccess = document.querySelector(".msgSuccess");
    const msgError = document.querySelector(".msgError");

    // Comprobamos si esta en el array
    if (listaFavoritos.includes(codigoPeliculaFavoritos)) {
        msgWarning.style.display = "block";
    } else {
        try {
            listaFavoritos.push(codigoPeliculaFavoritos)
            localStorage.setItem("listaFavoritos", JSON.stringify(listaFavoritos));
            console.log(listaFavoritos);
            msgSuccess.style.display = "block";
        } catch {
            msgError.style.display = "block";
        }
    }
    setTimeout(() => {
        msgWarning.style.display = "none";
        msgSuccess.style.display = "none";
        msgError.style.display = "none";
    }, 2000);
};

// Funcion para agregar los eventos de favoritos a los botones
const agregarEventosFavoritos = () => {
    const botonesFavoritos = document.querySelectorAll(".button");
    botonesFavoritos.forEach((boton) => {
        boton.addEventListener("click", agregarAFavoritos);
    });
};

// Funcion llamar Api y mostrar pelicula
const llamarApiPelicula = async () => {
    const peliculas = await obtenerDatosPeliculas();
    mostrarPeliculas();
};

// Llamamos a la función
llamarApiPelicula();
