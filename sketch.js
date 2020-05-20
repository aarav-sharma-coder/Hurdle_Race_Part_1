var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var player1 , player2 , player3 , player4;
var player1Img, player2Img ,  player3Img , player4Img;
var runnerCount;
var players;
var allPlayers;
var track;
var hurdleImg;
function preload(){
  track = loadImage("../images/track.jpg");
  player1Img = loadImage("../images/player1.png");
  player2Img = loadImage("../images/player2.png");
  player3Img = loadImage("../images/player3.png");
  player4Img = loadImage("../images/player4.png");
  hurdleImg = loadImage("../images/hurdle.png");
}
function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight*2);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  
}

function draw() {
  background("white");

  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    //spawnObstacles1();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
