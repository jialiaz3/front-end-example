
重置分享到微信
HTML
CSS
JavaScript

1
var confetti = {
2
  maxCount: 150,    //set max confetti count
3
  speed: 2,     //set the particle animation speed
4
  frameInterval: 15,  //the confetti animation frame interval in milliseconds
5
  alpha: 1.0,     //the alpha opacity of the confetti (between 0 and 1, where 1 is opaque and 0 is invisible)
6
  gradient: false,  //whether to use gradients for the confetti particles
7
  start: null,    //call to start confetti animation (with optional timeout in milliseconds, and optional min and max random confetti count)
8
  stop: null,     //call to stop adding confetti
9
  toggle: null,   //call to start or stop the confetti animation depending on whether it's already running
10
  pause: null,    //call to freeze confetti animation
11
  resume: null,   //call to unfreeze confetti animation
12
  togglePause: null,  //call to toggle whether the confetti animation is paused
13
  remove: null,   //call to stop the confetti animation and remove all confetti immediately
14
  isPaused: null,   //call and returns true or false depending on whether the confetti animation is paused
15
  isRunning: null   //call and returns true or false depending on whether the animation is running
16
};
17
​
18
(function() {
19
  confetti.start = startConfetti;
20
  confetti.stop = stopConfetti;
21
  confetti.toggle = toggleConfetti;
22
  confetti.pause = pauseConfetti;
23
  confetti.resume = resumeConfetti;
24
  confetti.togglePause = toggleConfettiPause;
25
  confetti.isPaused = isConfettiPaused;
26
  confetti.remove = removeConfetti;
27
  confetti.isRunning = isConfettiRunning;
28
  var supportsAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
29
  var colors = ["rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,", "rgba(255,192,203,", "rgba(106,90,205,", "rgba(173,216,230,", "rgba(238,130,238,", "rgba(152,251,152,", "rgba(70,130,180,", "rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"];
30
  var streamingConfetti = false;
31
  var animationTimer = null;
32
  var pause = false;
33
  var lastFrameTime = Date.now();
34
  var particles = [];
35
  var waveAngle = 0;
36
  var context = null;
37
​
38
  function resetParticle(particle, width, height) {
39
    particle.color = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
40
    particle.color2 = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
41
    particle.x = Math.random() * width;
42
    particle.y = Math.random() * height - height;
43
    particle.diameter = Math.random() * 10 + 5;
44
    particle.tilt = Math.random() * 10 - 10;
45
    particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
46
    particle.tiltAngle = Math.random() * Math.PI;
47
    return particle;
48
  }
49
​
50
  function toggleConfettiPause() {
51
    if (pause)
52
      resumeConfetti();
53
    else
54
      pauseConfetti();
55
  }
56
​
57
  function isConfettiPaused() {
58
    return pause;
59
  }
60
​
61
  function pauseConfetti() {
62
    pause = true;
63
  }
64
​
65
  function resumeConfetti() {
66
    pause = false;

请填写以下信息，提交作业后其他学员将看到你的作业
作品名称

作品说明

取消
确认