var socket = io();
var chunks = [];

var constraints = {audio: false, video: {width: 1280, height: 720}};

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {

  var liveVideo = document.getElementById("liveVideo");
  liveVideo.srcObject = mediaStream;
  liveVideo.onloadedmetadata = function(e) {
    liveVideo.play();
  }

  var mediaRecorder = new MediaRecorder(mediaStream);

  document.getElementById("start").onclick = function() {

    function delay(callback) {
      var i = 3;
      var interval = window.setInterval(function() {
        callback(i);
        i--;
        if (i === -1) {
          window.clearInterval(interval);
          mediaRecorder.start();
          console.log("recording started");
        }
      }, 1000);
    }

    delay(function(val) {
      document.querySelector("p").innerHTML =  val > 0 ? val : "";
      console.log(val);
    });
  };

  document.getElementById("stop").onclick = function() {
    mediaRecorder.stop();
    console.log("recording stopped");
  };

  mediaRecorder.onstop = function(e) {
    var video = document.createElement("video");
    video.width = 360;
    video.height = 240;
    video.autoplay = true;
    video.loop = true;
    document.body.appendChild(video);

    var blob = new Blob(chunks, {'type': 'video\/mp4'});
    chunks = [];
    var videoURL = URL.createObjectURL(blob);
    video.src = videoURL;
    console.log("done");
  }

  mediaRecorder.ondataavailable = function(e) {
    chunks.push(e.data);
  }
})
.catch(function(err){ console.log(err.name + " " + err.message); });
