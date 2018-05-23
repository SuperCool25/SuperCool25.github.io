function collisionBox(x, y,width ,height,parent) {
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.width = width;
    this.height = height;

    this.setBounds = function (x1, y1, width1, height1) {
        this.x = x1;
        this.y = y1;
        this.width = width1;
        this.height = height1;
    };
    this.check = function (test) {
      //  console.log("CHECKING" + this.width + ":" + this.height);
        ctx.fillStyle = "red";
        ctx.fillRect(this.x1,this.y1,this.x2,this.y2);
        if (this.x < test.x + test.width &&
            this.x + this.width > test.x &&
            this.y < test.y + test.height &&
            this.height + this.y > test.y) {
            return true;
        }
        return false;
    };
    this.checkClick = function (x1, y1) {

        console.log(x1 + "-" + y1);
        console.log(x1 +">"+ this.x +"&&"+ x1 +"<"+ (this.x + this.width) +"&&"+ y1 + ">" + this.y +"&&" + y1 + "<"+ (this.y + this.height));
        if (x1 > this.x && x1 < this.x + this.width && y1 > this.y && y1 < this.y + this.height) {
            parent.clicked();
            console.log("inside");
        }
    };
}


function background(src, speed) {
    console.log("created");
    this.imageA = new Image();
    this.imageA.src = src;
    this.imageB = new Image();
    this.imageB.src = src;
    this.scroll = 0;
    this.xA = 0;
    this.yA = this.imageA.height - 1000;
    this.xB = this.xA;
    this.yB = -360;
    this.speed = speed;

    this.update = function () {
        this.yA += this.speed;
        this.yB += this.speed;
        //this.yB = this.yA + this.imageA.height;
        if (this.yB > 550) {
            this.yB = -973;
        }
        if (this.yA > 550) {
            this.yA = -973;
        }
    };

    this.paint = function (ctx) {
        ctx.drawImage(this.imageA, this.xA, this.yA);
        ctx.drawImage(this.imageB, this.xB, this.yB);
    };

}
function trashCan(x ,y) {
    this.x = x;
    this.y = y;
    this.start = y;
    
    this.image = new Image();
    this.image.src = "res/trashCan.png";
    this.box = new collisionBox(this.x, this.y, this.image.width, this.image.height,this);
    this.update = function(speed) {
        this.y += speed;
        this.box.setBounds(this.x, this.y, this.image.width, this.image.height,this);
        if (this.y > 550) {
            this.y = this.start + 200;
        }
    };
    this.paint = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    };
    this.hit = function () {
        ctx.fillStyle = "red";
        ctx.font = "100px Arial";
        ctx.fillText("HIT", 0, 0);
        dead = true;
    };
    colliders.push(this.box);
}
function Car(src, x, y) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = src;

    this.box = new collisionBox(this.x, this.y, this.image.width, this.image.height,this);
    this.update = function (speed) {
        this.box.setBounds(this.x, this.y, this.image.width, this.image.height,this);

    };
    this.paint = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    };
}
function Wall(x, y) {
    this.x = x;
    this.y = y;
    this.start = y;
    this.image = new Image();
    this.image.src = "res/wall.png";

    this.box = new collisionBox(this.x, this.y, 116, 143,this);
    this.box1 = new collisionBox(this.x + 380, this.y, 122, 143,this);

    this.update = function () {
        this.box.setBounds(this.x, this.y, 116, 143);
        this.box1.setBounds(this.x + 380, this.y, 122, 143);
        this.y += speed;
      
        if (this.y > 600) {
            this.y = this.start+100;
        }
        
    };
    this.paint = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    };
    this.hit = function () {
        dead = true;
    };
    colliders.push(this.box);
    colliders.push(this.box1);
}
function button(x, y,width,height, action) {
    this.box = new collisionBox(x, y, width, height, this);
    this.x = x;
    this.y = y;
    this.on = false;
    this.height = height;
    this.width = width;
    this.action = action;
    this.clicked = function () {
        action();
    };
    this.paint = function () {

            ctx.fillStyle = "rgba(100,100,100,.5)";
     
            ctx.fillRect(this.x, this.y, this.x + this.width, this.y + this.height);
        
    };
}