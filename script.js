


var canvas = document.getElementById("flash");
var ctx = canvas.getContext("2d");

ctx.fillRect(0,0,canvas.width,canvas.height);

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
    img.onload=loadUpdate();
    imgs[name] = img;
    
}

function loadAudioRes(name,src){
    
    var audio = new Audio();
    
    audios[name]=audio;
    
     var r = new XMLHttpRequest();
r.onload = function() {
    console.log("yeet")
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
    percentage.innerHTML=imgsLoaded+"/"+imgsTotal
    
    if(imgsLoaded===imgsTotal){
       
        loaded();
       
       }
    
}

function loaded(){
    
}
loadAudioRes("music","https://comic-quest.github.io/chess/bye-home2.mp3")

       
       imgsTotal+=Object.keys(imgs).length;
    
    