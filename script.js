var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var container=document.getElementById("flash-container")
var canvas = document.getElementById("flash");
var ctx = canvas.getContext("2d");





var percentage = document.getElementById("percentage")

var loadingState = document.getElementById("loadState");

showLoading = true;

showPercent = true;

var loadingstr = "";

var imgs = {};

var audios = {};

var fuegoFrames;

var audioTotal = 0;

var audioLoaded = 0;

var imgsLoaded = 0;

var imgsTotal=0;

var fondo1;

var fondo2;

var nightstuck;

var fondo1;

var fondo2;

var fuego;

var fuego;

function loadImageRes(name,src){

    var img = new Image();
    img.tempsrc=src;
    img.onload=loadUpdate
    imgs[name] = img;
    
}

function loadAudioRes(name,src){
    
    var audio = new Audio();
    
    audios[name]=audio;
    
     var r = new XMLHttpRequest();
r.onload = function() {
  
    audio.src = URL.createObjectURL(r.response);
    loadImages();
   
};
    r.open("GET",src);
    r.responseType = "blob";


r.onloadstart = function(){
    loadingState.innerHTML="Cargando musica"
    
    
    percentage.innerHTML="0%"
    
    
}
r.onprogress = function(e){
    var str = Math.floor((e.loaded/e.total)*100)+"%"
    if(str!=="NaN%"){
        percentage.innerHTML = str;
       
       }

    
}
    r.send();
    
}

function loadImages(){
loadingState.innerHTML="Cargando imágenes"
    for(key in imgs){
        var img =  imgs[key];
        img.src = img.tempsrc;
        
    }
    
}

function loadUpdate(){
    
    imgsLoaded++
    percentage.innerHTML=imgsLoaded+"/"+imgsTotal;
    
    if(imgsLoaded===imgsTotal){
       
        setTimeout(function(){
            
            loaded();
            
        },1000);
        
        
       
       }
    
}

function loaded(){
    
    
    loadingState.innerHTML="Haz click para empezar."
    
    percentage.innerHTML="";
    
    container.onclick=function(e){
        container.onclick=function(){}
        fuegoFrames=[imgs.fuego1,imgs.fuego2]
        
        loadingState.innerHTML="";

        
        audios.music.play();
        
        fondo1= new Sprite(imgs.fondo1,-400,0);
        fondo2= new Sprite(imgs.fondo2,0,0);
        nightstuck= new Sprite(imgs.nightstuck,0,0);
        fuego =new Sprite(imgs.fuego1,0,0);
        
        requestAnimationFrame(main);
        
        setInterval(function(){
            fuego.img=fuegoFrames[Math.floor((Math.random()*2))]
            
        },1000);
        
        fondo1.tween= TweenLite.to(fondo1, 20, { ease: Power3.easeOut, x: 0 });
        fondo2.tween= TweenLite.to(fondo2, 20, { ease: Power3.easeOut, x: 25 });
        fuego.tween= TweenLite.to(fuego, 20, { ease: Power3.easeOut, x: 10 });
        
        
    }
    
    
    
}

function main(){
    
    requestAnimationFrame(main);
   
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    ctx.drawImage(nightstuck.img,nightstuck.x,nightstuck.y);
    ctx.drawImage(fuego.img,fuego.x,fuego.y);
    ctx.drawImage(fondo2.img,fondo2.x,fondo2.y);
    ctx.drawImage(fondo1.img,fondo1.x,fondo1.y);
    
    
}

imgs.blur=new Image();
imgs.blur.onload=function(){
    ctx.fillStyle="#00002d";
    ctx.fillRect(0,0,canvas.width,canvas.height);
   ctx.drawImage(imgs.blur,0,0);
    
imgsLoaded++



loadImageRes("fondo1","fondo1.png");

loadImageRes("fondo2","fondo2.png")

loadImageRes("fuego1","fuego1.png");

loadImageRes("fuego2","fuego2.png");

loadImageRes("nightstuck","nightstuck.png");

loadAudioRes("music","https://comic-quest.github.io/chess/bye-home2.mp3")





       
       imgsTotal+=Object.keys(imgs).length;
    
}

function Sprite(img,x,y){
    
    this.img = img;
    this.x=x;
    this.y=y;
    
}


imgs.blur.src="nightstuckload.png"

    
    