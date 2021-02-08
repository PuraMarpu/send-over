var canvas,title,play,back,state=0,ground,hero,castle,groundgr,plat1,plat2;
var invisi,pos,edge0,edge1,g1,g2,g3,g4,trophy,fat1,fat2,enemygr;
var p,p2,p3,p4,lose,victor,losebtn;


// Made by Pura Marpu(tets)
function preload(){
  back=loadImage("img/1915699.jpg");
  castle=loadImage("img/back2.jfif");

  lose=loadImage("img/lose.jpg");
  victor=loadImage("victor.jfif");
}
function setup(){
  canvas=createCanvas(displayWidth,500);

  //create elements for startups
  title=createElement("h1");
  title.html("Steel Story");
  title.position(540,200);

  play=createButton("Play");
  play.position(590,400);

  play.mousePressed(login);

  //groups for sprites
  groundgr=createGroup();
  enemygr=createGroup();
  
  //creating the sprites
  hero=createSprite(200,480,20,50);
  hero.visible=false;
  
  invisi=createSprite(600,130,3200,10);
  invisi.visible=false;

  plat1=createSprite(430,340,200,10);
  plat1.visible=false;

  plat2=createSprite(680,380,200,10);
  plat2.visible=false;
  groundgr.add(plat2);

  g1=createSprite(1000,300,200,10);
  g1.visible=false;
  groundgr.add(g1);

  g2=createSprite(1700,410,1000,150);
  g2.visible=false;
  groundgr.add(g2);

  g3=createSprite(2350,250,200,10);
  g3.visible=false;
  groundgr.add(g3);

  //enemy creation
  fat1=new enemy(1000,280);
  fat2=new enemy(1500,310);
  p=new enemy(700,360);
  p2=new enemy(1900,360);

  //other things creation
  trophy=createSprite(30,100,10,10);
  trophy.visible=false;

  ground=createSprite(1200,490,displayWidth+1200,10);
  ground.visible=false;

  edge0=createSprite(2450,0,1,1200);
  edge1=createSprite(0,0,1,1200);
}
//enemy class 
class enemy{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
  display(){
    this.haha=createSprite(this.x,this.y,10,30);
    enemygr.add(this.haha);

    this.haha.velocityY+=1.5;
  }
}

function draw(){
  background(back);
  var losetitle;

  move(hero);

  if(state===1){
    //the playing state
    background(castle);

    hero.velocityY+=1;

    if(hero.x>=700){
      camera.x=hero.x+50;
    }
    if(hero.x>=1800){
      camera.x=1800;
    }
    //collision with other objects
    hero.collide(ground);
    hero.collide(plat1);
    hero.collide(invisi);
    hero.collide(edge0);
    hero.collide(edge1);
    hero.collide(groundgr);
    enemygr.collide(groundgr);
    enemygr.collide(ground);

    //visibility
    hero.visible=true;
    invisi.visible=true;
    plat2.visible=true;
    trophy.visible=true;

    g1.visible=true;
    g2.visible=true;
    g3.visible=true;
    
    fat1.display();
    fat2.display();
    p.display();
    p2.display();

    //dead of hero
    if(hero.isTouching(enemygr)){
      state=2;
    }
    if(hero.isTouching(trophy)){
      state=3
    }
    drawSprites();
  }
  if(state===2){
    //lose of hero
    background(lose);

    losetitle=createElement("h1");
    losetitle.html("You Lose!!");
    losetitle.position(540,250);

    losebtn=createButton("restart");
    losebtn.position(590,400);
    losebtn.mousePressed(function(){
      state=1
    }
    )
  }
  if(state===3){
    background(victor);
  }
}
function move(x){
  if(keyWentDown(UP_ARROW)){
    x.velocityY-=19; 
  }
  if(keyWentDown(RIGHT_ARROW)){
    x.velocityX=5;
  }
  if(keyWentUp(RIGHT_ARROW)){
    x.velocityX=0;
  }
  if(keyWentDown(LEFT_ARROW)){
    x.velocityX=-5;
  }
  if(keyWentUp(LEFT_ARROW)){
    x.velocityX=0;
  }
}
function login(){
  play.hide();
  title.hide();
  state=1;
}

