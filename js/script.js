function embaralhar(lista) {
  let valor_temporario;
  let indice_aleatorio;

  for (let i = lista.length - 1; i !== 0; i--) {
    indice_aleatorio = Math.floor(Math.random() * i);

    valor_temporario = lista[i];
    lista[i] = lista[indice_aleatorio];
    lista[indice_aleatorio] = valor_temporario;
  }
  return lista;
}

function travarCliques(){
  for(let carta of cartas){
      carta.onclick = null;
  }
}

function fechar(carta){
  carta.style.backgroundImage = "url('imagens/skull.jpg')"
  carta.onclick = processarClique;
}

function abrir(carta){
  carta.style.backgroundImage = `url('imagens/${imagens[Number(carta.id)]}')`;
  carta.onclick = null;
}

function destravarCliques(){
  for(let carta of cartas){
      if(!carta.classList.contains("correto")){
        fechar(carta);
      }
  }
}

function processarClique(event) {
  abrir(event.target);
  if (cartaUm) {
    cartaDois = event.target;
    travarCliques();
    verificarIguais();
  }
  else {
    cartaUm = event.target;
  }
}

function verificarIguais(){
  if (cartaUm.style.backgroundImage !== cartaDois.style.backgroundImage) {
    setTimeout(function(){
      fechar(cartaUm);
      fechar(cartaDois);
      iniciarJogada();
    }, 1000);
  }
  else{
    cartaUm.classList.add("correto");
    cartaDois.classList.add("correto");
    iniciarJogada();
  }
}

function iniciarJogada(){
  cartaUm = null;
  cartaDois = null;
  destravarCliques();
}

let cartas = document.querySelectorAll(".carta");

let cartaUm;
let cartaDois;

let imagensSalvas = ["bretta.png", "cornifer.png", "hornet.png", "king.png", "knight.png", "quirrel.png", "vessel.png", "zote.jpg"];

let imagens = imagensSalvas.concat(imagensSalvas);

imagens = embaralhar(imagens);

for (carta of cartas){
  abrir(carta);
}

setTimeout(function () {
  iniciarJogada();
}, 3000);
