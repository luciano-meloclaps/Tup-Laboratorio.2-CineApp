const mostrarAvisoCarga = () => {
    // Aquí puedes agregar el código para mostrar el aviso de carga en la pantalla
    // Por ejemplo, puedes crear un elemento HTML y agregarlo al DOM
    const avisoCarga = document.createElement("div");
    avisoCarga.id = "aviso-carga";
    avisoCarga.innerHTML = "Cargando...";
    document.body.appendChild(avisoCarga);
};

const ocultarAvisoCarga = () => {
    // Aquí puedes agregar el código para ocultar el aviso de carga
    // Por ejemplo, puedes buscar el elemento HTML y eliminarlo del DOM
    const avisoCarga = document.getElementById("aviso-carga");
    if (avisoCarga) {
        avisoCarga.remove();
    }
};