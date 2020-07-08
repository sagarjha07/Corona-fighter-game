function load_images(){
    //player,virus,gem
    enemy_image=new Image;
    enemy_image.src="Assets/v1.png";
    
    player_img=new Image;
    player_img.src="Assets/superhero.png";
    
    gem_img=new Image;
    gem_img.src="Assets/gemm.png";
}

function init(){
    //defining objects that we wiil have int game
    canvas=document.getElementById("mycanvas");
    W=700;
    H=400;
    
    canvas.width=W;
    canvas.height=H;
    
    //create a context
    pen=canvas.getContext('2d');
    console.log(pen);
    
    // enemy object
    e1={
        x:150,
        y:50,
        w:60,
        h:60,
        speed:20
    };
    e2={
        x:300,
        y:150,
        w:60,
        h:60,
        speed:30
    };
    e3={
        x:450,
        y:20,
        w:60,
        h:60,
        speed:40
    };
    
    enemy=[e1,e2,e3];
    
    //player object
    
    player={
        x:20,
        y:H/2,
        w:60,
        h:60,
        speed:20,
        moving:false,
        health:100
    };
    
    //gem object
    
    gem={
        x:W-100,
        y:H/2,
        w:60,
        h:60,
    };
    
    //event listener to canvas
    //mousedown respond to mousepressed
    canvas.addEventListener('mousedown',function(){
        player.moving=true;
    });
    
    canvas.addEventListener('mouseup',function(){
        player.moving=false;
    });
    
    game_over=false;
}

function isoverlap(rect1,rect2){
    if (rect1.x < rect2.x + rect2.w &&
   rect1.x + rect1.w > rect2.x &&
   rect1.y < rect2.y + rect2.h &&
   rect1.y + rect1.h > rect2.y){
        return true;
    }
    return false;
}


function draw(){
    // clear the canvas area for the old frame
    pen.clearRect(0,0,W,H)
    
    pen.fillStyle="red";
    //pen.fillRect(box.x,box.y,box.w,box.h);
    //pen.drawImage(enemy_image,box.x,box.y,box.w,box.h);
    
    //darw the player
    pen.drawImage(player_img,player.x,player.y,player.h,player.w);
    
    //draw the gem
    pen.drawImage(gem_img,gem.x,gem.y,gem.w,gem.h);
    
    for(let i=0;i<enemy.length;i++){
        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
    pen.fillStyle="white";
    pen.font="15px Georgia";
    pen.fillText("Score : "+player.health,10,10);
    
}


function update(){
    //if the palyer is moving 
    if(player.moving==true){
        player.x+=player.speed;
        player.health+=20;
    }
    
    //checking overlap b/w player and enemies
    for(let i=0;i<enemy.length;i++){
        if(isoverlap(enemy[i],player)){
            player.health-=50;
            if(player.health<0){
                console.log("player.health");
                game_over=true;
                alert("Game over "+player.health);
            }
        }
    }
    
    //checking overlap b/w player and gem
    if(isoverlap(player,gem)){
        console.log("win");
        alert("you won");
        game_over=true;
    }
    
    //move the box down
    // upadte each enemy with same logic
    for(let i=0;i<enemy.length;i++){
       enemy[i].y+=enemy[i].speed;
    
        if(enemy[i].y>=H-enemy[i].h){
            enemy[i].speed*=-1;
        }
        if(enemy[i].y<0){
            enemy[i].speed*=-1;
        } 
    }
    
      
}


function gameloop(){
    if(game_over==true){
        clearInterval(f);
    }
    draw();
    update(); 
}

load_images();
init();
var f=setInterval(gameloop,100);