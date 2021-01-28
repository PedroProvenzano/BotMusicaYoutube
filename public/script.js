
var socket = io();

let channel = '#mrklus';
let arrayQueue = [];
// DOM
const marcoListaReproduccion = document.getElementById("marcoListaReproduccion");

socket.on('newVideo', msg => {
    if(msg.channel == channel){
        let contenedorLink = document.createElement('div');
        contenedorLink.setAttribute("class", "linkReproduccion");
        contenedorLink.innerHTML = `<p>${msg.url}</p>
        <img src="./assets/equis.png" alt="cruz" id="boton-link-cruz" class="cruz">
        <img src="./assets/alert.png" alt="alerta" id="boton-link-alerta" class="alert">`;
        contenedorLink.addEventListener('click', () => {
          getAndPostVideo(msg.url);
        });
        arrayQueue.push(msg.url);
        marcoListaReproduccion.appendChild(contenedorLink);
    }
});


var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '450',
          width: '700',
          videoId: 'l-XJcV_70DY',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      function onPlayerStateChange(event) {
        if(event.data == YT.PlayerState.ENDED)
        {
          if(arrayQueue.length == 0)
          {
            return;
          }
          else
          {
            let nextVideo = getNextOne(arrayQueue);
            getAndPostVideo(nextVideo);
          }
        }
      }


function getAndPostVideo(link)
{
  let urlID = link.slice(32,43);
  console.log("Ejecutando video agregado");
  player.loadVideoByUrl(urlID, 0, "default");
}

function getNextOne(array)
{
  let newArray = [];
  let nextOne = array[0];
  for(let i of array)
  {
    if(i != nextOne)
    {
      newArray.push(i);
    }
  }
  let DomList = document.getElementsByClassName("linkReproduccion");
  DomList[0].remove();
  return nextOne;
}