var socket = io();

let channel = '#mrklus';
// DOM
const marcoListaReproduccion = document.getElementById("marcoListaReproduccion");

socket.on('newVideo', msg => {
    if(msg.channel == channel){
        let contenedorLink = document.createElement('div');
        contenedorLink.setAttribute("class", "linkReproduccion");
        contenedorLink.innerHTML = `<p>${msg.url}</p>
        <img src="./assets/equis.png" alt="cruz" id="boton-link-cruz" class="cruz">
        <img src="./assets/alert.png" alt="alerta" id="boton-link-alerta" class="alert">`;
        marcoListaReproduccion.appendChild(contenedorLink);
    }
});