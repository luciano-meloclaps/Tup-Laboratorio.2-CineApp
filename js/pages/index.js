llamarApiPelicula = async () => {
    try {
        //llamada api
        respuestaConsulta = await fetch(
            "https://api.themoviedb.org/3/movie/popular?api_key=eeecbf28b7798d68db98744052fd047a&language=es-MX"
        );
        console.log(respuestaConsulta);

        //guardamos la respuesta
        datosJson = await respuestaConsulta.json();
        console.log(datosJson.results);

        listaPeliculas = "";
        datosJson.results.forEach((pelicula) => {
            listaPeliculas =
                listaPeliculas +
                `
            <div class="contenedorPeliculas">
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
            <h3 class="titulo">${pelicula.title}</h3>
            <p><b>Código:</b> ${pelicula.id}<br>
            <b>Título original:</b> ${pelicula.original_title}<br>
            <b>Idioma original:</b> ${pelicula.original_language}<br>
            <b>Año:</b> ${pelicula.release_date}<br>
            <button class="button">Agregar a favoritas</button>
            </div>
            `;
        });
        //sec_peliculas
        const sec_peliculas = document.getElementById("sec_peliculas");
        //insertamos el html con las películas
        sec_peliculas.innerHTML = listaPeliculas;
        //boton Agregar a Favoritos
        const btnFavoritos = sec_peliculas.querySelectorAll(".button");
        //asignamos el evento click a cada botón
        btnFavoritos.forEach((btn) => {
            btn.addEventListener("click", agregarAFavoritos);
        });
    } catch (error) {
        console.log(error);
    }
};

const listaFavoritos = JSON.parse(localStorage.getItem("listaFavoritos")) || [];

const agregarAFavoritos = (event) => {
    //capturamos el botón
    const codigoPelicula = event.target.dataset.code;
    if (listaFavoritos.includes(codigoPelicula)) {
        alert("Esta película ya está en tus favoritos");
    } else {
        listaFavoritos.push(codigoPelicula);
        alert("Película agregada a favoritos con éxito");
        //guardamos localStorage
        localStorage.setItem("listaFavoritos", JSON.stringify(listaFavoritos));
        console.log(listaFavoritos);
    }
};

llamarApiPelicula();
