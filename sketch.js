//variáveis da bola
let xBola = 300;
let yBola = 200;
let diametro = 23;
let raio = diametro / 2 ;

//velosidade da bola
let velocidadeXBola = 6;
let velocidadeYBola = 6;


//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 80;

//variáveis da oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

let colidiu = false;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//oponenteRaqueteErro
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBola();
  movimentaBola();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimemtaRaquete();
  //verificaColisaoRaquete();
  colisaoRaqueteBiloteca(xRaquete, yRaquete);
  colisaoRaqueteBiloteca(xRaqueteOponente,         yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimemtaRaqueteOponente();
  incluiPlacar();
  marcaPontosr();
  calculaChanceDeErrar()
  bolaNaoFicaPresa()
}

function mostraBola(){
  circle(xBola, yBola, diametro);
}

function movimentaBola (){
  xBola += velocidadeXBola;
  yBola += velocidadeYBola;
}

function verificaColisaoBorda (){

  if (xBola + raio > width || xBola - raio < 0){
    velocidadeXBola *= -1;
    raquetada.play();
  }
  if (yBola  + raio > height || yBola - raio < 0){
    velocidadeYBola *= -1;
    raquetada.play();
  }
}

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento,
       raqueteAltura); 
}

function movimemtaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBola - raio < xRaquete + raqueteComprimento && yBola - raio < yRaquete + raqueteAltura && yBola + yBola > yRaquete ){
    velocidadeXBola *= -1;
    raquetada.play();
  }
}

function colisaoRaqueteBiloteca(x, y){
  colidu =
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBola, yBola, raio);
  if (colidu){
    velocidadeXBola *= -1;
    raquetada.play();
  }
}

function movimemtaRaqueteOponente(){
  velocidadeYOponente = yBola -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
  
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150,10, 40, 20);
  fill(255);
  text(meusPontos, 170 , 26);
  fill(color(255, 140, 0));
  rect(450,10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPontosr(){
  if (xBola > 592){
    meusPontos += 1;
    ponto.play();
    //xBola = 300;
    //yBola = 200;
    
  }
  if (xBola < 12){
    pontosDoOponente += 1;
    ponto.play();
    //xBola = 300;
    //yBola = 200;
  }
}


function bolaNaoFicaPresa(){
    if (xBola - raio < 0){
    xBola = 23;

    }
}

