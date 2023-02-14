var images = ['img/1.png', 'img/2.png', 'img/3.png', 'img/4.png', 
              'img/5.png', 'img/6.png', 'img/7.png', 'img/8.png', 
              'img/9.png', 'img/10.png', 'img/11.png', 'img/12.png', 
              'img/13.png'];
var songs = ['songs/song1.mp3', 'songs/song2.mp3']
let spotifyUrl = "https://www.spotify.com/br/premium/";
let audioElement = new Audio('audio/Anitta â€“ Boys Donâ€™t Cry .mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var nxt = document.getElementById("nxt");
var prev = document.getElementById("prev");
var home = document.getElementById("home");
var loc = document.getElementById("loc");
var audioplayer = document.getElementById("audio-player");


function sessionId() {
  var chars = "aA0", mask = '', result = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('0') > -1) mask += '0123456789';
  for (var i = 20; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
  result = result.slice(0, 4) +"-"+result.slice(4,8)+"-"+result.slice(8,20) 
  return result;
}
var orgID = 3;
var campaignID = 41;
var connectorID = 35;
var sessionid = sessionId();
var typeads = "responsiveads";
var version = 1.0;
var Headers = {
    'Content-type':  'application/json; charset=UTF-8',
    'Accept':'application/json',
    'access-control-allow-origin': '*',
    'access-control-allow-headers' : '*',
    'access-control-allow-methods' : 'POST',
    'requestUserAgent':navigator.userAgent,
    'requestReferer': document.referrer,
    'requestURI': document.baseURI,
    'serverIP': 'https://oneasia.uc.r.appspot.com',
    'requestIP': ''
  };
  
const clientip = fetch("https://api.ipify.org/?format=json")
.then((response) => response.json())
.then((user) => {return user.ip;});
const printip = async () => {
const a = await clientip;
Headers.requestIP = a.toString();};
printip();

// click count but it refreshes again as per page loads
function APICall(n){
var x =JSON.stringify({
  session:sessionid,
  type:typeads,
  ver:version,
  schema:{"id":campaignID.toString(), "impKey":n},
  org:orgID,
  connector_id:connectorID,
  campaign_id:campaignID 
});
console.log(x, Headers);
fetch("https://insights.infuseads.com/", {method: 'POST', mode:'cors', body: x, headers: Headers}).then(function (response) {
  if (response.ok) {return response.json();}
  return Promise.reject(response);
})
.then((data) => console.log(data))
.catch((error) => console.log('Something went wrong.', error));
};
setTimeout(function(){APICall("impression");}, 1000);

var output = document.getElementById('output');
openfile(images[0]);
pg1func(output);

// adding Event Listener
document.getElementById("output").addEventListener('click', function() {
  //console.log('Click');
  clickpattern();});

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
  if(audioElement.paused || audioElement.currentTime<=0){
      audioElement.play();
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');
  }
  else{
      audioElement.pause();
      masterPlay.classList.remove('fa-pause-circle');
      masterPlay.classList.add('fa-play-circle');
  }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
  // Update Seekbar
  progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
  myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
  audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})




// Opening a  file
function openfile(filepath){
    output.src = filepath;
    //console.log("Current Img URL = ", output.src);
};


function pg1func(op){
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    myProgressBar.value = 0;
    prev.style="display:none !important; border:none;";
    home.style="display:none !important; border:none;";
    loc.style="display:none !important; border:none;";
    audioplayer.style = "position: absolute; height: 100px; width: 300px; top: 140px; overflow: hidden; background-color: black; color: white; display: flex; justify-content: center; align-items: center; flex-direction: column; -webkit-user-select: none; -moz-user-select: none; -khtml-user-select: none; -ms-user-select: none;";
    opt1.style = "position: absolute;top: 340px;left: 17px;height: 64px;background: transparent;width: 280px; border: 1px solid transparent;";
    opt2.style = "position: absolute;top: 412px;left: 17px;height: 64px;background: transparent;width: 280px; border: 1px solid transparent;";
    opt3.style = "position: absolute;top: 484px;left: 17px;height: 64px;background: transparent;width: 280px; border: 1px solid transparent;";
    nxt.style = "position: absolute;top: 554px;left: 234px;height: 46px;background: transparent;width: 60px;border: 1px solid transparent;";
    audioElement.src = songs[0];
    opt1.onclick = function(){
      op.src = images[1];
      APICall('page1');
      setTimeout(function(){ op.src = images[4]; pg2func(op); },1000);
    }

    opt2.onclick = function(){
      op.src = images[2];
      APICall('page2');
      setTimeout(function(){ op.src = images[4]; pg2func(op); },1000);
    }

    opt3.onclick = function(){
      op.src = images[3];
      APICall('page2leftkey1');
      setTimeout(function(){ op.src = images[4]; pg2func(op); },1000);
    }

    nxt.onclick = function(){ op.src =images[4]; APICall('page2leftkey2'); pg2func(op)}
}

function pg2func(op){
  audioElement.pause();
  masterPlay.classList.remove('fa-pause-circle');
  masterPlay.classList.add('fa-play-circle');
  myProgressBar.value = 0;
  home.style="display:none !important; border:none;";
  loc.style="display:none !important; border:none;";
  audioplayer.style = "position: absolute; height: 100px; width: 300px; top: 140px; overflow: hidden; background-color: black; color: white; display: flex; justify-content: center; align-items: center; flex-direction: column; -webkit-user-select: none; -moz-user-select: none; -khtml-user-select: none; -ms-user-select: none;";
  opt1.style = "position: absolute;top: 340px;left: 17px;height: 64px;background: transparent;width: 280px; border: 1px solid transparent;";
  opt2.style = "position: absolute;top: 412px;left: 17px;height: 64px;background: transparent;width: 280px; border: 1px solid transparent;";
  opt3.style = "position: absolute;top: 484px;left: 17px;height: 64px;background: transparent;width: 280px; border: 1px solid transparent;";
  nxt.style = "position: absolute;top: 558px;left: 239px;height: 46px;background: transparent;width: 60px;border: 1px solid transparent;";
  prev.style = "position: absolute;top: 558px;left: 19px;height: 46px;background: transparent;width: 60px;border: 1px solid transparent;";
  audioElement.src = songs[1];

  opt1.onclick = function(){
    op.src = images[5];
    APICall('page2leftkey3');
    setTimeout(function(){ op.src = images[8]; pg3func(op); },1000);
  }

  opt2.onclick = function(){
    op.src = images[6];
    APICall('page2rightkey1');
    setTimeout(function(){ op.src = images[8]; pg3func(op); },1000);
  }

  opt3.onclick = function(){
    op.src = images[7];
    APICall('page2rightkey2');
    setTimeout(function(){ op.src = images[8]; pg3func(op); },1000);
  }

  nxt.onclick = function(){ op.src =images[8]; APICall('page2rightkey3'); pg3func(op); }
  prev.onclick = function(){ op.src =images[0]; APICall('page3'); pg1func(op); }
}

function pg3func(op){
  audioElement.pause();
  masterPlay.classList.remove('fa-pause-circle');
  masterPlay.classList.add('fa-play-circle');
  myProgressBar.value = 0;
  home.style="display:none !important; border:none;";
  loc.style="display:none !important; border:none;";
  audioplayer.style = "display:none !important; border:none;";

  opt1.style = "position: absolute;top: 340px;left: 17px;height: 64px;background: transparent;width: 280px; border: 1px solid transparent;";
  opt2.style = "position: absolute;top: 412px;left: 17px;height: 64px;background: transparent;width: 280px; border: 1px solid transparent;";
  opt3.style = "position: absolute;top: 484px;left: 17px;height: 64px;background: transparent;width: 280px; border: 1px solid transparent;";
  nxt.style = "position: absolute;top: 555px;left: 241px;height: 46px;background: transparent;width: 60px;border: 1px solid transparent;";
  prev.style = "position: absolute;top: 554px;left: 19px;height: 46px;background: transparent;width: 60px;border: 1px solid transparent;";

  opt1.onclick = function(){
    op.src = images[9];
    APICall('page3leftkey1');
    setTimeout(function(){ op.src = images[12]; pg4func(op); },1000);
  }

  opt2.onclick = function(){
    op.src = images[10];
    APICall('page3leftkey2');
    setTimeout(function(){ op.src = images[12]; pg4func(op); },1000);
  }

  opt3.onclick = function(){
    op.src = images[11];
    APICall('page3leftkey3');
    setTimeout(function(){ op.src = images[12]; pg4func(op); },1000);
  }

  nxt.onclick = function(){ op.src =images[12]; APICall('page3rightkey1'); pg4func(op);}
  prev.onclick = function(){ op.src =images[4]; APICall('page3rightkey2'); pg2func(op);}
}

function pg4func(op){
    opt1.style = "display:none !important; border:none;";
    opt2.style = "display:none !important; border:none;";
    opt3.style = "display:none !important; border:none;";
    nxt.style = "display:none !important; border:none;";
    prev.style="display:none !important; border:none;";
    audioplayer.style = "display:none !important; border:none;";
    home.style="position: absolute;top: 515px;left: 40px;height: 49px;background: transparent;width: 238px;border: 1px solid transparent;";
    loc.style="position: absolute;top: 310px;left: 94px;height: 119px;background: transparent;width: 117px;border: 1px solid transparent;";

    home.onclick = function(){op.src = images[0]; APICall('page3rightkey3'); pg1func(op);}
    loc.onclick = function(){window.open(spotifyUrl); APICall('page4');}
}


// Clicking of Images
function clickpattern(){
  var op = document.getElementById('output');

  if (op.src.search('1.png') > -1)
  {
      pg1func(op);
  }
};
