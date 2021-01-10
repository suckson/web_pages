'use strict'

var picture = document.querySelector('canvas#picture');
picture.width = 375;
picture.height = 375;

var videoplay = document.querySelector('video#player');

var buffer;
var mediaRecorder;

var btnConnect = document.querySelector('button#connect');
var btnLeave = document.querySelector('button#leave');
var inputRoom = document.querySelector('input#room');

var socket;
var room;

var canTake = true;

window.onload = () => {
  start();
  $(".snapshot").onclick = function () {
    let imgData = picture.toDataURL();
    console.log(imgData);
  }
}




