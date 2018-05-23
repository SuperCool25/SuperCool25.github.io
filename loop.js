
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var game = setInterval(loop, 50);
var scroll = 0;
var speed = 5;
var maxSpeed = 18;
var score = 0;
var keys = [];
var colliders = [];
var trashCans = [];
var buttons = [];
var on = false;
var dead = false;
var clickedY = 0;
var clickedX = 0;
var car = new Car("res/car.png", 250 - 71 / 2,380);
var road = new background("res/road.png", speed);
trashCans[0] = new trashCan(180, -1000);
trashCans[1] = new trashCan(310, -2000);
trashCans[2] = new trashCan(250, -3000);
trashCans[3] = new trashCan(150, -4000);
var wall = new Wall(0, -2000);
window.addEventListener('keydown', function (e) {
    keys[e.keyCode] = true;
});
window.addEventListener('keyup', function (e) {
    keys[e.keyCode] = false;
});

canvas.addEventListener('touchstart', function (e) {
    console.log(e.touches[0].clientX);
    console.log(e.touches[0].clientY);

    clickedY = e.touches[0].clientX;
    clickedX = e.touches[0].clientY;
});
canvas.addEventListener("touchend", function (e) {
    clickedY = 0;
    clickedX = 0;
});


function left() {
    car.x -= speed / 5 + .5;
}
function right() {
    car.x += speed / 5 + .5;
}
function up() {
    speed -= 1.5;
}
function down() {
    speed += 1;
}

function pollEvents() {
  if (keys[68]) {//d
        car.x += speed/5 + .5;
    }
    if (keys[65]) {//a
        car.x -= speed/5 + .5;
    }
    if (keys[83]) {//w
        //cary += 5;
        speed -= 1.5;
    }
    if (keys[87]) {//s
        //cary -= 5;
        speed += 1;
    }
  
}
initButtons();
function loop() {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 500, 700);

   // on = document.getElementById("mobile").checked;
    
    if (car.x < 74) {
        speed -= 1.2;
    }
    if (car.x > 370) {
        speed -= 1.2;
    }
    if (car.x > 440) {
        carx = 440;
    }
    if (car.x < -4) {
        carx = -4;
    }
    if (speed < 0) {
        speed = 0;
    }
    pollEvents();
 
    if (speed < 0) {
       // speed = 0;
    }
    if (speed > maxSpeed) {
        speed = maxSpeed;
    }


    scroll += speed;
    road.speed = speed;
    road.update();
    car.update();
    wall.update();
    trashCans[0].update(speed);
    trashCans[1].update(speed);
    trashCans[2].update(speed);
    trashCans[3].update(speed);

    score += speed;
    checkCollisions();

    
    
    road.paint(ctx);
    wall.paint(ctx);
    trashCans[0].paint(ctx);
    trashCans[1].paint(ctx);
    trashCans[2].paint(ctx);
    trashCans[3].paint(ctx);
    car.paint(ctx);

    if (on) {
        for (i = 0; i < buttons.length; i++) {
            buttons[i].on = on;
        }
        for (i = 0; i < buttons.length; i++) {
            buttons[i].paint();
        }
    } else {
        for (i = 0; i < buttons.length; i++) {
            buttons[i].on = on;
          
        }
    }

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Score:" + score, 10, 50);
    if (dead) {
        ctx.fillStyle = "red";
        ctx.font = "100px Arial";
        speed = 0;
        ctx.fillText("DEAD!!", 10, 200);

        clearInterval(game);
    }

}
function checkCollisions() {
    for (var i = 0; i < colliders.length; i++) {
        if (colliders[i].check(car.box)) {
            colliders[i].parent.hit();
        }
    }
    for (i = 0; i < buttons.length; i++) {
        buttons[i].box.checkClick(clickedX,clickedY);
    }

}
function initButtons() {
    buttons.push(new button(50, 250, 50, 100, left()));
}
