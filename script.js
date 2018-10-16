

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



var audioTotal = 0;

var audioLoaded = 0;

var imgsLoaded = 0;

var imgsTotal=0;

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
    console.log("all loaded")
    
    loadingState.innerHTML="Haz click para empezar."
    
    percentage.innerHTML="";
    
    container.onclick=function(e){
        loadingState.innerHTML="";
        ctx.drawImage(imgs.nightstuck,0,0);
        ctx.drawImage(imgs.fuego1,0,0);
        ctx.drawImage(imgs.fondo2,0,0);
        ctx.drawImage(imgs.fondo1,0,0);
        
        audios.music.play();
    }
    
    
    
}

imgs.blur=new Image();
imgs.blur.onload=function(){
    
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

imgs.blur.src="nightstuckblur.png"

    
    