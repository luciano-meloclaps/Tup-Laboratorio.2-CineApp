const llamarApiPelicula = async() =>{
    const respuestaConsulta = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=eeecbf28b7798d68db98744052fd047a&language=en-US&page=1');

    console.log(respuestaConsulta);
}

llamarApiPelicula();