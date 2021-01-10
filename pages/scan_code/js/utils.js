const $ = (str) => {
  return document.querySelector(str)
}
const size = {
  width: $('.content').offsetWidth,
  height:  $('.content').offsetHeight,
}
const constraints = {
  video: {
    width: size.width,
    height: size.height,
    frameRate: 15,
    facingMode: "user",
  },
  audio: false
}

const gotMediaStream = (stream) => {
  const videoTrack = stream.getVideoTracks()[0];
  var videoConstraints = videoTrack.getSettings();
  // divConstraints.textContent = JSON.stringify(videoConstraints, null, 2);
  window.stream = stream;
  $("#player").srcObject = stream;
  return navigator.mediaDevices.enumerateDevices();
}

const gotDevices = (deviceInfos) => {
  deviceInfos.forEach(function (deviceinfo) {
    const option = document.createElement('option');
    option.text = deviceinfo.label;
    option.value = deviceinfo.deviceId;
    if (deviceinfo.kind === 'audioinput') {
      audioSource.appendChild(option);
    } else if (deviceinfo.kind === 'audiooutput') {
      audioOutput.appendChild(option);
    } else if (deviceinfo.kind === 'videoinput') {
      videoSource.appendChild(option);
    }
  })
}

const  handleError = (err) => {
  console.log('getUserMedia error:', err);
}

const getUrlParam = (name) => {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  const r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return unescape(r[2]); return null; //返回参数值
}

const detect = () => {
  var equipmentType = "";
  var agent = navigator.userAgent.toLowerCase();
  var android = agent.indexOf("android");
  var iphone = agent.indexOf("iphone");
  var ipad = agent.indexOf("ipad");
  if(android != -1){
      equipmentType = "android";
  }
  if(iphone != -1 || ipad != -1){
      equipmentType = "ios";
  }
  return equipmentType;
}



const start = () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("getUserMedia is not supported!")
    console.log('getUserMedia is not supported!');
    return;
  } else {
    navigator.mediaDevices.getUserMedia(constraints)
      .then(gotMediaStream)
      .then(gotDevices)
      .catch(handleError);
  }
}

const startCountDown = () => {
  var sectiom = 3;
  var timer;
  $("#snapshot").html(sectiom)
  function CountDown() {
    sectiom = sectiom - 1
    $("#snapshot").html(sectiom)
    if (sectiom == 1) {
      clearInterval(timer);
      canTake = true;
      $("#snapshot").html("点我<br/>拍照")
    }
  }
  timer = setInterval(CountDown, 1000);
}