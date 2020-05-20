class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }

      form = new Form();
      form.display();
    }

    player1 = createSprite(900,60);
    player1.addImage("player1",player1Img);
    player1.debug = true;
    player1.scale = 0.5;

    player2 = createSprite(900,230);
    player2.addImage("player2", player2Img);
    player2.scale = 0.5;

    player3 = createSprite(900,430);
    player3.addImage("player3", player3Img);
    player3.scale = 0.5;

    player4 = createSprite(900,630);
    player4.addImage("player4",player4Img);
    player4.scale = 0.5;

    players = [player1, player2, player3, player4];

    
    
  }


  play(){
    form.hide();

    Player.getPlayerInfo();
    
    
    if(allPlayers !== undefined){
      var display_position = 100;
      background("seaGreen");
     image(track,-displayWidth*4,0,displayWidth*5,displayHeight + 300);
      //index of the array
      var index = 0;

     
      var y = -175;
      var x;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 300;
        //use data form the database to display the cars in y direction
        x = displayWidth - allPlayers[plr].distance;

        players[index-1].x = x;
        players[index-1].y = y;

        if (index === player.index){
          players[index - 1].shapeColor = red;
          camera.position.y = displayHeight/2;
          camera.position.x = players[index-1].x;
        }
        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, camera.position.x,display_position);
       
      }

    }

    if(keyIsDown(LEFT_ARROW)){
      player.distance +=25
      player.update();
    }
   /* if(keyCode==32 ) 
  {
    
   
  player1.y= 80 ;
  
  }else{
    player1.y = 180;
  }*/
      
    if(player.distance > 7640){
      gameState = 2;
    }
    drawSprites();
  }
  end(){
    console.log("Game Ended");
    game.update(2);
  }
}
