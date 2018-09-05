var block = document.getElementsByClassName("block");
var blockName = document.getElementsByClassName("blockname");
var divs = document.getElementsByTagName("div");
var leftArrow = document.getElementById("leftArrow");
var rightArrow = document.getElementById("rightArrow");
var canvas = document.getElementById("canvas");
var elem2 = document.getElementById("elem2");
var chooseCars = document.getElementById("chooseCars");
var formName = document.getElementById("formName");
var chooseTrack = document.getElementById("chooseTrack");
var chooseSpeed = document.getElementById("chooseSpeed");
var main = document.getElementById("main");
var chosenCar;
var selection = false;
var animation = false;
var numeric = [];

var clientHeight = document.documentElement.clientHeight;
var res = clientHeight / 5;

var firstSyle = (function() {
  for (var i = 0; i < block.length; i++) {
    blockName[i].style.paddingTop = "12%";
    block[i].style.height = res + "px";
    main.style.position = "fixed";
  }
})();

// -----------Find the id of the element on which the event occurs---------
var findId = (function() {
  for (var i = 0; i < block.length; i++) {
    block[i].onclick = function() {
      var setId = this.getAttribute("id");
      sizing(setId);
    };
  }
})();

// ---------------------------Changing block sizes-------------------------
function sizing(setIds) {
  if (!selection) {
    for (var i = 0; i < block.length; i++) {
      numeric.push(i); // the number of 'div' is recalculated and this value is added each time
    }

    if (block[setIds - 1] == block[0]) {
      formName.style.visibility = "visible";
      formName.style.opacity = "1";
    }
    //block with a choice of cars
    if (block[setIds - 1] == block[1]) {
      chooseCars.style.visibility = "visible";
      chooseCars.style.opacity = "1";
      chooseCars.style.background =
        "linear-gradient(to top, #118AB2, #5aaec6, #118AB2)";
      choise();
    }

    //block with a game
    if (block[setIds - 1] == block[2]) {
      elem2.style.visibility = "visible";
      elem2.style.opacity = "1";
      animation = false;
      game();
    }

    //block with a choice of tracks
    if (block[setIds - 1] == block[3]) {
      chooseTrack.style.visibility = "visible";
      chooseTrack.style.opacity = "1";
      chooseTrack.style.background =
        "linear-gradient(to top, #FFD166, #ffdea0, #FFD166)";
      choiseRoad();
    }

    //block with a choice of speed
    if (block[setIds - 1] == block[4]) {
      chooseSpeed.style.visibility = "visible";
      chooseSpeed.style.opacity = "1";
      chooseSpeed.style.background =
        "linear-gradient(to top, #EF476F, #f57d9a, #EF476F)";
      selectionSpeed();
    }

    var delNum = numeric.splice(setIds - 1, 1); //from" numeric " is removed that value under the number 'id' which is 'div',
    //and which was clicked, and then apply styles
    block[delNum].style.height = "1480px";
    blockName[delNum].style.paddingTop = "10px";
    main.style.position = "absolute";
    // for the rest of the 'div' apply other styles
    for (var i = 0; i < block.length - 1; i++) {
      block[numeric[i]].style.height = "120px";
      blockName[numeric[i]].style.paddingTop = "0px";
      selection = true;
    }
  } else if (selection) {
    //when pressed again, all back
    numeric = [];
    for (var i = 0; i < block.length; i++) {
      numeric.push(i);
    }
    for (var i = 0; i < block.length; i++) {
      block[numeric[i]].style.height = res + "px";
      blockName[numeric[i]].style.paddingTop = "12%";
      chooseCars.style.opacity = "0";
      chooseCars.style.visibility = "hidden";
      chooseTrack.style.opacity = "0";
      chooseTrack.style.visibility = "hidden";
      chooseSpeed.style.opacity = "0";
      chooseSpeed.style.visibility = "hidden";
      elem2.style.opacity = "0";
      elem2.style.visibility = "hidden";
      formName.style.visibility = "hidden";
      formName.style.opacity = "0";
      main.style.position = "fixed";
      selection = false;
      animation = true;
      game();
    }
  }
}

// -------------------- Transport selection --- slide 2 ------------------------
var photos = ["BlueCar.png", "GreyCar.png", "RedCar.png"];
var selectedCar = photos[0];

function choise() {
  var slide_left = document.getElementById("strelka_vpravo");
  var slide_right = document.getElementById("strelka_vlevo");

  function nextPhoto() {
    index++;

    if (index >= photos.length) {
      index = 0;
    }
    selectedCar = photos[index];
    var img = document.getElementById("photoCar");
    img.src = "img/" + selectedCar;
  }

  function prewPhoto() {
    index--;

    if (index < 0) {
      index = photos.length - 1;
    }
    selectedCar = photos[index];
    var img = document.getElementById("photoCar");
    img.src = "img/" + selectedCar;
  }

  var index = 0;
  window.onload = (function() {
    var img = document.getElementById("photoCar");
    img.src = "img/" + photos[index];
    slide_right.onclick = nextPhoto;
    slide_left.onclick = prewPhoto;
  })();
}

// -------------------- Track selection --- slide 4 ----------------------------
var photoTrack = ["Gravel.png", "Road.png"];
var selectedRoad = photoTrack[0];

function choiseRoad() {
  var slide_left = document.getElementById("strelka_pravo");
  var slide_right = document.getElementById("strelka_levo");

  function nextPhoto() {
    index++;
    if (index >= photoTrack.length) {
      index = 0;
    }
    selectedRoad = photoTrack[index];
    var imgs = document.getElementById("photoTrack");
    imgs.src = "img/" + photoTrack[index];
  }

  function prewPhoto() {
    index--;

    if (index < 0) {
      index = photoTrack.length - 1;
    }
    selectedRoad = photoTrack[index];
    var imgs = document.getElementById("photoTrack");
    imgs.src = "img/" + photoTrack[index];
  }

  var index = 0;
  window.onload = (function() {
    var imgs = document.getElementById("photoTrack");
    imgs.src = "img/" + photoTrack[index];
    slide_right.onclick = nextPhoto;
    slide_left.onclick = prewPhoto;
  })();
}

// ------------------------- Speed selection -----------------------------------

var buttonSp = document.getElementById("buttonSp");
var speedRoad = { 30: 0, 50: -10, 90: -30 };
var speedTraffic = { 10: 30, 30: 270, 60: 210 };
var counter = [1000, 1020, 1050];
var speed = ["normal", "fast", "wow-wow-wow"];
var selectedSpeed = speed[0];
var countScore = counter[0];
var firstSpeedRoad = 30;
var secondSpeedRoad = 0;
var firstSpeedTraffic = 10;
var secondSpeedTraffic = 30;

var body = document.getElementById("selectSpeed");
var index = 0;
body.innerHTML = speed[0];

var keys = Object.keys(speedRoad);
var keys2 = Object.keys(speedTraffic);

function selectionSpeed() {
  // reset the transition by...
  buttonSp.addEventListener(
    "click",
    function(e) {
      e.preventDefault;

      index++;

      if (index >= speed.length) {
        index = 0;
      }

      countScore = counter[index];
      selectedSpeed = speed[index];
      body.innerHTML = selectedSpeed;
      body.style.marginLeft = "20px";
      var key = keys[index];
      firstSpeedRoad = Number.parseInt(key);
      secondSpeedRoad = Number.parseInt(speedRoad[key]);
      var key2 = keys2[index];
      firstSpeedTraffic = Number.parseInt(key2);
      secondSpeedTraffic = Number.parseInt(speedTraffic[key2]);

      // removing the class
      body.classList.remove("run-animation");

      void body.offsetWidth;

      body.classList.add("run-animation");
    },
    false
  );
}

// ----------------------- The game --- slide 3 --------------------------------

function game() {
  if (animation) return;
  var cvs = document.getElementById("canvas");
  var leftArrow = document.getElementById("leftArrow");
  var rightArrow = document.getElementById("rightArrow");
  var ctx = cvs.getContext("2d");
  var block = document.getElementsByClassName("block");

  var car = new Image();
  var bg = new Image();
  var leftFg = new Image();
  var rightFg = new Image();
  var carLeft = new Image();
  var carRight = new Image();
  var roadLine = new Image();
  var chosenArea = new Image();

  car.src = "img/" + selectedCar;
  carLeft.src = "img/GreenCar.png";
  carRight.src = "img/RedCar.png";
  chosenArea.src = "img/" + selectedRoad;
  bg.src = "img/Background.png";
  leftFg.src = "img/LeftSide.png";
  rightFg.src = "img/RightSide.png";
  roadLine.src = "img/shortLane.png";

  var score = 0;
  var bestScore = 0;

  var xPosLine = 400;
  var yPosLine = 0;
  var move = 50;

  // the road
  var xPosGrav = 0;
  var yPosGrav = 0;
  var move = 50;

  // the position of the car
  var xPos = 450;
  var yPos = 750;
  var drift = 2;

  // control
  leftArrow.onclick = moveLeft;
  rightArrow.onclick = moveRight;

  function moveLeft() {
    xPos -= 250;
  }
  function moveRight() {
    xPos += 250;
  }

  // creating blocks
  var traffic = []; // creates an array
  //creates one object in an array
  traffic[0] = {
    x: 220,
    y: -cvs.height
  };

  // ------------------------------------------------
  var moveRoad = [];
  moveRoad[0] = {
    xi: 0,
    yi: -cvs.height
  };
  // ------------------------------------------------

  // rows for passing cars
  var lane = [490, 240, 0];

  function draw() {
    if (animation) return;
    ctx.drawImage(bg, 0, 0);

    // ----------------------------------------------

    for (var i = 0; i < moveRoad.length; i++) {
      ctx.drawImage(chosenArea, xPosGrav, moveRoad[i].yi);

      //the choice of speed road
      moveRoad[i].yi += firstSpeedRoad;

      if (moveRoad[i].yi == secondSpeedRoad) {
        moveRoad.push({
          xi: 0,
          yi: -cvs.height
        });
        if (moveRoad.length > 1) {
          moveRoad.shift();
        }
      }
    }
    // -------------------------------------------------------------------------

    for (var i = 0; i < traffic.length; i++) {
      ctx.drawImage(carRight, leftFg.width + traffic[i].x, traffic[i].y);
      //speed traffic
      traffic[i].y += firstSpeedTraffic;
      //traffic density
      if (traffic[i].y == secondSpeedTraffic) {
        traffic.push({
          x: lane[Math.floor(Math.random() * 3) - 0], //select a number from the array 'lane'
          y: -cvs.height
        });
      }

      //check for collision
      if (traffic.length > 2) {
        traffic.shift();
      }
      if (
        (((traffic[i].x + carRight.width >= xPos - 200 &&
          xPos >= traffic[i].x) ||
          (traffic[i].x <= xPos - 200 + car.width &&
            xPos + car.width < traffic[i].x + carRight.width)) &&
          ((traffic[i].y + carRight.height >= yPos && yPos >= traffic[i].y) ||
            (traffic[i].y <= yPos + car.heigiht &&
              yPos + car.height <= traffic[i].y + carRight.height))) ||
        (199 >= xPos || xPos >= cvs.width - rightFg.width)
      ) {
        score = 0;
        xPos = 450;
        traffic.shift();
      }
      if (traffic[i].y == countScore) {
        score++;
      }
    }

    ctx.drawImage(car, xPos, yPos);
    // -------------------------------------------------------------------------

    //score
    ctx.font = "48px Verdana";
    ctx.fillStyle = "#fff";
    ctx.fillText("Счет: ", 16, 200);
    ctx.fillText("_____", 10, 210);
    ctx.fillText(score, 60, 280);

    // xPos += drift; // the action car (constantly blows right)
    yPosLine += move;
    requestAnimationFrame(draw); // for animation
  }

  carRight.onload = draw; // when the last picture is loaded, is called the method 'draw'
}
