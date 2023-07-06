llamarApiPelicula = async() =>{

    try {
        //llamada api
        respuestaConsulta = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=eeecbf28b7798d68db98744052fd047a&language=es-MX');
        console.log(respuestaConsulta);

        //guardamos la respuesta
        datosJson = await respuestaConsulta.json();
        console.log(datosJson.results);
        
        listaPeliculas = '';
        datosJson.results.forEach(pelicula => {
            listaPeliculas = listaPeliculas + 
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
            `
        });
        document.getElementById('sec_peliculas').innerHTML = listaPeliculas;
    } catch(error){
        console.log(error);
    };

}
    listaFavoritos = JSON.parse(localStorage.getItem("listaFavoritos"))

    btnFavoritos = document.querySelectorAll('.button');

llamarApiPelicula();