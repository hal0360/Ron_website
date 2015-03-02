var board = document.getElementById("MyCan"); 
var c2 = board.getContext('2d');
var titleimage;
var player;
var player_bullets = [];
var enemy_bullets = [];
var tanks = [];
var defenders = [];
var explosions = [];
var smokes = [];
var wracks = [];
var houses = [];
var items = [];
var tankdata = [];
var defenderdata = [];
var turretdata = [];
var housedata = [];
var bulletdata = [];
var paused = false;
var mainy = true;
var action = 0;
var intervalId;
var deathcount = 0;
var dead = false;
var waiting = false;
var currentlevel;
c2.imageSmoothingEnabled = false;
// global databases
tankdata.push([2.5,0.06,18,30,10]);			
tankdata.push([2.5,0.06,18,30,7]);			
tankdata.push([1.8,0.04,26,46,21]);
turretdata.push([0.04,20,450]);
turretdata.push([0.04,20,450]);
turretdata.push([0.03,28,880]);
turretdata.push([0.04,16,450]);
turretdata.push([0.04,9,450]);
turretdata.push([0.03,31,1000]);
housedata.push([39,40]);
housedata.push([45,72]);	
housedata.push([57,89]);
bulletdata.push([6,67,1,1,10]);
bulletdata.push([8,100,2,87,99]);
bulletdata.push([10,120,3,152,168]);
defenderdata.push([28,11,3]);
defenderdata.push([49,33,5]);
/*
event function to handle keyboard pressing event
key "w": move tank forward
key "S": move tank backward
key "A": turn tank to the left
key "D": turn tank to the right
key "Esc": pause the game and bring up menu
*/
window.addEventListener("keydown", function(ev){ 
	"use strict";
	if (mainy || waiting){
	    return;
	}
    action = ev.keyCode;
	if (ev.keyCode == 27)
	{
	    paused = !paused;
	    if (paused){
		    window.clearInterval(intervalId);
			c2.font="80px Verdana";
			c2.fillStyle="cyan";
			c2.fillText("Game Paused",750,200);
			c2.font="50px Verdana";
			c2.fillStyle="red";
			c2.fillText("Resume",800,300);
			c2.fillText("Quit",800,400);
		}
		else {
		    intervalId = setInterval(drawing, 40);
		}		
	}
}, true);
/*
player stop moving when key up
*/
window.addEventListener("keyup", function(ev){
    "use strict";
    action = 0;
}, true);
/*
event function to handle mouse cruising on the webpage
get the coordination of the mouse each time it moves
*/
board.addEventListener("mousemove", function(event){
	"use strict";
    if (waiting){
		return;
	}
	if (dead) {
	    c2.font="50px Verdana";
		if (event.x - board.offsetLeft > 800 && event.x - board.offsetLeft < 1000 && event.y - board.offsetTop > 250 && event.y - board.offsetTop < 310){		    
			c2.fillStyle="yellow";
		}
		else{
			c2.fillStyle="red";	
		}
		c2.fillText("Restart",800,300);
		if (event.x - board.offsetLeft > 800 && event.x - board.offsetLeft < 920 && event.y - board.offsetTop > 350 && event.y - board.offsetTop < 410){
			c2.fillStyle="yellow";
		}
		else{
			c2.fillStyle="red";	
		}
		c2.fillText("Quit",800,400); 
		return;		
	}
    if (!paused && !mainy) {
		player.turret.targetAngle = Math.atan2(event.x - board.offsetLeft - player.posX/2, player.posY/2 + board.offsetTop - event.y);	
	}
	else if (mainy) {
		c2.font="70px Verdana";
	    if (event.x - board.offsetLeft > 650/2 && event.x - board.offsetLeft < 1050/2 && event.y - board.offsetTop > 350/2 && event.y - board.offsetTop < 410/2){
			c2.fillStyle="yellow";
		}
		else{	    
			c2.fillStyle="red";			
		}
		c2.fillText("Start Level 1",650,400);
		if (event.x - board.offsetLeft > 650/2 && event.x - board.offsetLeft < 1050/2 && event.y - board.offsetTop > 500/2 && event.y - board.offsetTop < 560/2){
			c2.fillStyle="yellow";
		}
		else{	    
			c2.fillStyle="red";			
		}
		c2.fillText("Start Level 2",650,550);
		if (event.x - board.offsetLeft > 650/2 && event.x - board.offsetLeft < 1050/2 && event.y - board.offsetTop > 650/2 && event.y - board.offsetTop < 710/2){
			c2.fillStyle="yellow";
		}
		else{	    
			c2.fillStyle="red";			
		}
		c2.fillText("Start Level 3",650,700);
		if (event.x - board.offsetLeft > 650/2 && event.x - board.offsetLeft < 1050/2 && event.y - board.offsetTop > 800/2 && event.y - board.offsetTop < 860/2){
			c2.fillStyle="yellow";
		}
		else{	    
			c2.fillStyle="red";			
		}
		c2.fillText("Start Level 4",650,850);	
	}
	else {
		c2.font="50px Verdana";
	    if (event.x - board.offsetLeft > 800/2 && event.x - board.offsetLeft < 1000/2 && event.y - board.offsetTop > 250/2 && event.y - board.offsetTop < 310/2){		    
			c2.fillStyle="yellow";
		}
		else{
			c2.fillStyle="red";	
		}
		c2.fillText("Resume",800,300);
		if (event.x - board.offsetLeft > 800/2 && event.x - board.offsetLeft < 920/2 && event.y - board.offsetTop > 350/2 && event.y - board.offsetTop < 410/2){
			c2.fillStyle="yellow";
		}
		else{
			c2.fillStyle="red";	
		}
		c2.fillText("Quit",800,400);
	}
}, true);
/*
enevt function to handle the mouse clicking
fire the tank bullet or select options on the main menu
*/
board.addEventListener("mousedown", function(event){
	"use strict";
    if (waiting){
		return;
	}
	if (dead) {
	    if (event.x - board.offsetLeft > 800/2 && event.x - board.offsetLeft < 1000/2 && event.y - board.offsetTop > 250/2 && event.y - board.offsetTop < 310/2){		    
			clear();
			if (currentlevel == 1) {
				level1();
			}
			else if (currentlevel == 2) {
				level2();
			}
			else if (currentlevel == 3){
			    level3();
			}
			else {
			    level4();
			}
			intervalId = setInterval(drawing, 40);
		}
		if (event.x - board.offsetLeft > 800/2 && event.x - board.offsetLeft < 920/2 && event.y - board.offsetTop > 350/2 && event.y - board.offsetTop < 410/2){
		    mainy = true;
			clear();
			menu();
		}
		return;
	}
    if (!paused && !mainy) {
		player.turret.fire();
	}
	else if (mainy) {
	    if (event.x - board.offsetLeft > 650/2 && event.x - board.offsetLeft < 1050/2 && event.y - board.offsetTop > 350/2 && event.y - board.offsetTop < 410/2){
		    mainy = !mainy;
			level1();
			intervalId = setInterval(drawing, 40);
		}
		if (event.x - board.offsetLeft > 650/2 && event.x - board.offsetLeft < 1050/2 && event.y - board.offsetTop > 500/2 && event.y - board.offsetTop < 560/2){
			mainy = !mainy;
			level2();
			intervalId = setInterval(drawing, 40);
		}
		if (event.x - board.offsetLeft > 650/2 && event.x - board.offsetLeft < 1050/2 && event.y - board.offsetTop > 650/2 && event.y - board.offsetTop < 710/2){
			mainy = !mainy;
			level3();
			intervalId = setInterval(drawing, 40);
		}
		if (event.x - board.offsetLeft > 650/2 && event.x - board.offsetLeft < 1050/2 && event.y - board.offsetTop > 800/2 && event.y - board.offsetTop < 860/2){
			mainy = !mainy;
			level4();
			intervalId = setInterval(drawing, 40);
		}
	}
	else {
	    if (event.x - board.offsetLeft > 800/2 && event.x - board.offsetLeft < 1000/2 && event.y - board.offsetTop > 250/2 && event.y - board.offsetTop < 310/2){		    
			paused = !paused;
			intervalId = setInterval(drawing, 40);
		}
		if (event.x - board.offsetLeft > 800/2 && event.x - board.offsetLeft < 920/2 && event.y - board.offsetTop > 350/2 && event.y - board.offsetTop < 410/2){
		    mainy = true;
			clear();
			menu();
		}
	}
}, true);
/*
check to check two points (x,y) and (X,Y) is within distance r
*/
var detect_radius = function (x, y, X, Y, r) {
	"use strict";
	return Math.sqrt(Math.pow(x - X,2) + Math.pow(y - Y,2)) <= r;
};
/*
check to check points (x,y) is within rectangle with centre position (X,Y) and dimension W, H
*/
var detect_square = function(x,y,X,Y,kx,ky,W,H){ 
    "use strict";
	var ux, uy, vx, vy, px, py, w, h;
	ux = kx*H;
	uy = ky*H;
	vx = -1*uy*W;
	vy = ux*W;
	px = x - X;
	py = y - Y;
	w = Math.abs(px*vx+py*vy)/Math.sqrt(Math.pow(vx,2) + Math.pow(vy,2));
	h = Math.abs(px*ux+py*uy)/Math.sqrt(Math.pow(ux,2) + Math.pow(uy,2));
	if(w <= W && h <= H){
	    return true;
	}
    else {
	    return false;
    }	
};
/*
wrack class, create a wrack object from this class
usage: wrack(  x position,  y position, type of wrack from 0 to 4 )
*/
var Wrack = function(x, y, a, Num){
    "use strict";
    // private properties of wrack
    this.posX = x;
	this.posY = y;
	this.angle = a
	this.image = new Image();
	this.image.src = "view/Graphics/wrack" + Num + ".png";
	this.set = function() {
	    c2.translate(Math.round(this.posX), Math.round(this.posY));
		c2.rotate(this.angle);
	    c2.drawImage(this.image, Math.round(this.image.width/-2), Math.round(this.image.height/-2));
		c2.setTransform(1,0,0,1,0,0);
	}
};
/*
item class, create a item object from this class
usage: turret(  x position,  y position, type of item from 0 to 1 )
*/
var Item = function(x, y, Num) {
	"use strict";
    // private properties of item
	this.posX = x;
	this.posY = y;
    this.type = Num;
	this.image = new Image();
	this.image.src = "view/Graphics/item" + Num + ".png";
	// method to detect if player reach this item
	this.detect = function () {
	    return Math.sqrt(Math.pow(this.posX - player.posX,2) + Math.pow(this.posY - player.posY,2)) <= player.h;
	};
	// setup this item
	this.set = function () {    
        c2.drawImage(this.image, Math.round(this.posX - this.image.width/2), Math.round(this.posY - this.image.height/2));
	};
}
/*
bullet class, create a bullet object from this class
usage: bullet( starting x position, starting y position, x direction, y direction, bullet type 1-2 )
*/
var Bullet = function(x, y, xx, yy, Num) {
	"use strict";	
	// private properties of bullet
    this.type = Num;
	this.speed = bulletdata[Num][0];
    this.duration = bulletdata[Num][1];
	this.dmg = bulletdata[Num][2];
	this.start = bulletdata[Num][3];
	this.end = bulletdata[Num][4];
	this.posX = x;
	this.posY = y;
	this.dirX = xx;
	this.dirY = yy;
	this.count = 0;
	this.image = new Image();
	this.image.src = "view/Graphics/bullet" + Num + ".png";
	// method to detect building collision
	this.detect_house = function () {
	    var i;
	    for (i = 0; i < houses.length; i += 1) {
		    if(detect_radius(this.posX, this.posY, houses[i].posX, houses[i].posY, houses[i].radius)) {
				if (detect_square(this.posX, this.posY, houses[i].posX, houses[i].posY, houses[i].dirX, houses[i].dirY, houses[i].w, houses[i].h)){				    
					this.count = this.duration;
					explosions.push(new Explosion(this.posX, this.posY, this.start, this.end, 0,0));
					return true;	
				}      
		    }
	    }
	};
	// method to detect player collision
	this.detect_player = function () {
	    if (this.detect_house()) {
		    return;
		}
	    if(detect_radius(this.posX, this.posY, player.posX, player.posY, player.radius)) {
		    if(detect_square(this.posX, this.posY, player.posX, player.posY, player.dirX, player.dirY, player.w, player.h)) {
				this.count = this.duration;
				explosions.push(new Explosion(this.posX, this.posY, this.start, this.end, 0,0));
				player.live = player.live - this.dmg;
            }			
		}	
	};
	// method to detect enemy collision
	this.detect_enemy = function () {
		var i;
	    if (this.detect_house()) {
		    return;
		}
	    for (i = 0; i < defenders.length; i += 1) {
		    if(detect_radius(this.posX, this.posY, defenders[i].posX, defenders[i].posY, defenders[i].radius)) {
                this.count = this.duration;
				explosions.push(new Explosion(this.posX, this.posY, this.start, this.end, 0,0));
				defenders[i].live = defenders[i].live - this.dmg;
				return;		
		    }
	    }
		for (i = 0; i < tanks.length; i += 1) {
		    if(detect_radius(this.posX, this.posY, tanks[i].posX, tanks[i].posY, tanks[i].radius)) {
				if (detect_square(this.posX, this.posY, tanks[i].posX, tanks[i].posY, tanks[i].dirX, tanks[i].dirY, tanks[i].w, tanks[i].h)){
					this.count = this.duration;
					explosions.push(new Explosion(this.posX, this.posY, this.start, this.end, 0,0));
					tanks[i].live = tanks[i].live - this.dmg;
					return;  	
				}  			
		    }
	    }
	};
	//setup this bullet
	this.set = function () {    
        c2.drawImage(this.image, Math.round(this.posX - this.image.width/2), Math.round(this.posY - this.image.height/2));
		this.posX = this.posX + this.speed*this.dirX;
		this.posY = this.posY + this.speed*this.dirY;
		this.count = this.count + 1;
	};
};
/*
explosion class, create a explosion object from this class
usage: explosion( x position, y position, starting frame, end frame, angle )
*/
var Explosion = function(x, y, i, e, p, angle) {
	"use strict";
    // private properties of explosion
    this.angle = angle;
    this.p = p;
    this.posX = x;
	this.posY = y;
	this.image = new Image();
	this.index = i;
	this.ending = e;
	this.image.src = "view/Graphics/" + this.index + ".png";
	//setup this explosion
	this.set = function () { 
        if(this.p == 0) {
	        c2.drawImage(this.image, Math.round(this.posX - this.image.width/2), Math.round(this.posY - this.image.height/2));
		}
		else if (this.p == 1) {
		    c2.translate(this.posX, this.posY);
		    c2.rotate(this.angle);
		    c2.drawImage(this.image, Math.round(this.image.width/-2), Math.round(-1*this.image.height));
			c2.setTransform(1,0,0,1,0,0);
		}
		else {
		    c2.drawImage(this.image, Math.round(this.posX - this.image.width/2), Math.round(this.posY - this.image.height));
		}
		this.index = this.index + 1;
		this.image.src = "view/Graphics/" + this.index + ".png";		
	}
};
/*
house class, create a house object from this class
usage: house( starting x position, starting y position, starting angle, type from 0 to 2 )
*/
var House = function(x, y, angle, Num) {
	"use strict";
    // private properties of house
    this.posX = x;
	this.posY = y;
	this.angle = angle;
	this.dirX = Math.sin(angle);
	this.dirY = -1*Math.cos(angle);
	this.image = new Image();
	this.image.src = "view/Graphics/house" + Num + ".png";
	this.w = housedata[Num][0];
	this.h = housedata[Num][1];
	this.x1 = this.posX + this.h*this.dirX + this.w*this.dirY;
	this.y1 = this.posY + this.h*this.dirY - this.w*this.dirX;
	this.x2 = this.posX + this.h*this.dirX - this.w*this.dirY;
	this.y2 = this.posY + this.h*this.dirY + this.w*this.dirX;
	this.x3 = this.posX - this.h*this.dirX + this.w*this.dirY;
	this.y3 = this.posY - this.h*this.dirY - this.w*this.dirX;
	this.x4 = this.posX - this.h*this.dirX - this.w*this.dirY;
	this.y4 = this.posY - this.h*this.dirY + this.w*this.dirX;
	this.radius = Math.sqrt(Math.pow(this.w,2) + Math.pow(this.h,2));
	//setup this house
	this.set = function (){
	    c2.translate(this.posX, this.posY);
		c2.rotate(this.angle);
	    c2.drawImage(this.image, Math.round(this.image.width/-2), Math.round(this.image.height/-2));
		c2.setTransform(1,0,0,1,0,0);
	};
};
/*
turret class, create a turret object from this class
usage: turret( starting x position, starting y position, type of turret from 0 to 4 )
*/
var Turret = function (x, y, Num) {
	"use strict";
    // private properties of turret
	this.type = Num;
    this.image = new Image();
	this.image.src = "view/Graphics/turret" + this.type + ".png";
    this.dirX = 0.0;
	this.dirY = -1.0;
	this.PosX = x;
	this.PosY = y;
	this.angle = 0.0;
	this.targetAngle = 0.0;
	this.speed = turretdata[this.type][0];
	this.fireRate = turretdata[this.type][1];
	this.range = turretdata[this.type][2];	
	this.count = 0;
	this.randcount = 0;
	// this method create a bullet object with types depend on type of this turret and push it on bullet array
	this.fire = function () {
        if (this.count <= 0) {	
	        this.dirX = Math.sin(this.angle);
		    this.dirY = -1*Math.cos(this.angle);
			if (this.type == 0) {
				player_bullets.push(new Bullet(this.PosX + 30*this.dirX, this.PosY + 30*this.dirY, this.dirX, this.dirY, 0));
				explosions.push(new Explosion(this.PosX + 30*this.dirX, this.PosY + 30*this.dirY, 54, 57,1, this.angle));
			}
			else if (this.type == 4){
			    player_bullets.push(new Bullet(this.PosX + 50*this.dirX, this.PosY + 50*this.dirY, this.dirX, this.dirY, 0));
				explosions.push(new Explosion(this.PosX + 50*this.dirX, this.PosY + 50*this.dirY, 54, 57,1, this.angle));
			}
			else if (this.type == 5){
				enemy_bullets.push(new Bullet(this.PosX + 77*this.dirX, this.PosY + 77*this.dirY, this.dirX, this.dirY, 2));
				explosions.push(new Explosion(this.PosX + 77*this.dirX, this.PosY + 77*this.dirY, 168, 174,1, this.angle));
			}
			else {
			    if (this.type == 2){
					enemy_bullets.push(new Bullet(this.PosX + 70*this.dirX, this.PosY + 70*this.dirY, this.dirX, this.dirY, 1));
					explosions.push(new Explosion(this.PosX + 70*this.dirX, this.PosY + 70*this.dirY, 47, 53,1, this.angle));
				}
				else {
					enemy_bullets.push(new Bullet(this.PosX + 30*this.dirX, this.PosY + 30*this.dirY, this.dirX, this.dirY, 0));
					explosions.push(new Explosion(this.PosX + 30*this.dirX, this.PosY + 30*this.dirY, 53, 57, 1, this.angle));
				}
			}
		    this.count = this.fireRate;
		}
	};
	// this method detect player within this turrets detection radius (enemy use only)
	this.detect = function () {
	    if (Math.sqrt(Math.pow(this.PosX - player.posX,2) + Math.pow(this.PosY - player.posY,2)) <= this.range) {
		    this.targetAngle = Math.atan2(player.posX - this.PosX, this.PosY - player.posY);
			if (this.aim()){
			    this.fire();
			}
		}
		else {
		    if (this.randcount > 100){
		        this.targetAngle = Math.PI*(2*Math.random() - 1);
				this.randcount = 0;
			}	
		    this.aim();
		}
	};
	// this method direct this turret angle to its target
	this.aim = function () {
	    if (this.targetAngle - this.angle  > 0.04){
	        if (this.targetAngle - this.angle < Math.PI){
	            this.angle = this.angle + this.speed;
			    if (this.angle > Math.PI){
		            this.angle = this.angle - 2*Math.PI;
		        }		
		    }
            else {
		        this.angle = this.angle - this.speed;
		        if (this.angle < -1*Math.PI){
		            this.angle = 2*Math.PI + this.angle;
		        }
		    }
			return false;
	    }
        else if(this.angle - this.targetAngle > 0.04){
         	if (this.angle - this.targetAngle <= Math.PI){
	            this.angle = this.angle - this.speed;
	    		if (this.angle < -1*Math.PI){
	    	        this.angle = 2*Math.PI + this.angle;
	    	    }		
	    	}
            else {
				this.angle = this.angle + this.speed;
				if (this.angle > Math.PI){
					this.angle = this.angle - 2*Math.PI;
				}
			}
            return false; 			
		}
		else {
		    return true;
		}
	};
	// this method setup this turret on canvas
	this.set = function () {
	    c2.translate(Math.round(this.PosX),Math.round(this.PosY));
		c2.rotate(this.angle);
		if (this.type == 2){
		    c2.drawImage(this.image, -22, -67);
		}
		else if (this.type == 4) {
			c2.drawImage(this.image, -16, -47);
		}
		else if (this.type == 5) {
			c2.drawImage(this.image, -23, -75);
		}
		else {
		    c2.drawImage(this.image, -14, -30);
		}
		this.count = this.count - 1;
		this.randcount = this.randcount + 1;
		c2.setTransform(1,0,0,1,0,0);
	};
};
/*
defender class, create a defender object from this class
usage: defender( starting x position, starting y position, type of defender from 0 to 1 )
*/
var Defender = function (x, y, Num){
	"use strict";	
    // private properties of defender
	this.type = Num;
    this.posX = x;
	this.posY = y;
	this.smokecount = 100;
	this.image = new Image();	
	this.image.src = "view/Graphics/bunker" + Num + ".png";	
	this.image2 = new Image();	
    this.image2.src = "view/Graphics/" + this.smokecount + ".png";	
	this.radius = defenderdata[Num][0];
	this.live = defenderdata[Num][1];
	this.maxlive = this.live;
	this.turret = new Turret(x - 1, y, defenderdata[Num][2]);
	// this method setup this defender on canvas
	this.set = function () {
		if(this.type == 0){
			c2.drawImage(this.image, this.posX - 30, this.posY - 30);
		}
		else{
			c2.drawImage(this.image, this.posX - 52, this.posY - 52);
		}
		this.turret.set();
		if (this.live <= this.maxlive/2) {
			c2.translate(Math.round(this.posX),Math.round(this.posY));
			c2.drawImage(this.image2, Math.round(this.image2.width/-2), Math.round(-1*this.image2.height));
			c2.setTransform(1,0,0,1,0,0);  	
			this.smokecount = this.smokecount + 1;
			this.image2.src = "view/Graphics/" + this.smokecount + ".png";	
			if (this.smokecount == 115) {
				this.smokecount = 99;
			}	
		}
	};
};
/*
tank class, create a tank object from this class
usage: tank( starting x position, starting y position, type of tank from 0 to 2 )
*/
var Tank = function (posX, posY, Num, d) {
	"use strict";
    // private properties of defender
	this.drop = d;
	this.type = Num;
	this.smokecount = 100;
    this.image = new Image();	
    this.image.src = "view/Graphics/tank" + Num + ".png";	
    this.image2 = new Image();	
    this.image2.src = "view/Graphics/" + this.smokecount + ".png";	
	this.posX = posX;
	this.posY = posY;
	this.dirX = 0.0;
	this.dirY = -1.0;
	this.angle = 0.0;
	this.moveSpeed = tankdata[Num][0];
	this.turnSpeed = tankdata[Num][1];
	this.turret = new Turret(posX, posY, Num);
	this.w = tankdata[Num][2];
	this.h = tankdata[Num][3]; 
	this.live =	tankdata[Num][4]; 
	this.maxlive = this.live;
	this.radius = Math.sqrt(Math.pow(this.w,2) + Math.pow(this.h,2));
	this.rand = 21;
	this.mode = 0;
	this.flag = true;
	// AI driving for this tank (enemy use only)
	this.autodrive = function() {	
	    if (this.rand > 20) {
		    if (this.flag) {
				this.mode = Math.floor((Math.random() * 7) + 1);		
			}
			else {
			    this.mode = Math.floor((Math.random() * 2) + 1);
				this.flag = true;
			}
			this.rand = 0;
		}		
		if (this.mode == 1){
           if(this.turnLeft() == 1) {
		       this.mode = 2;
		   }
		}
		else if (this.mode == 2){
		
		    if(this.turnRight() == 1) {
			    this.mode = 1;
			}	
		}
		else if (this.mode == 3){	
			var H = this.moveDown();
            if(H > 0) {
			    
				if (H == 1 || H == 3) {
				this.mode = 5;
				    this.flag = false;
				}
				else {
				    this.mode = Math.floor((Math.random() * 2) + 1);
				}
				
			}
		}
		else {
		    var H = this.moveUp();
            if(H > 0) {
			    
				if (H == 1 || H == 3) {
				this.mode = 3;
				    this.flag = false;
				}
				else {
					this.mode = Math.floor((Math.random() * 2) + 1);
				}
			}	
		}
	};
	//method for enemy and player collision
	this.detect_object = function () {
        var i;
		if (this.type != 0) {
		    if (detect_radius(this.posX, this.posY, player.posX, player.posY, this.w + player.h)) {
                return true;
            } 
		}
        for (i = 0; i < tanks.length; i = i + 1) {
		    if (this !== tanks[i] && detect_radius(this.posX, this.posY, tanks[i].posX, tanks[i].posY, (this.h + tanks[i].h + this.w + tanks[i].w)/2)) {
                return true;
            }                       
        }
        for (i = 0; i < defenders.length; i = i + 1) {
            if (detect_radius(this.posX, this.posY, defenders[i].posX, defenders[i].posY, this.h + defenders[i].radius)) {
                return true;
            }                       
        } 	
    };
	// method for border collision
	this.colli_border = function () {
	    if (this.posX < 0 || this.posX > 1880 || this.posY < 0 || this.posY > 1040){
		    return true;
        }
        else {
		    return false;
        }	
	}
	// method for building collision
	this.colli_building = function () {	
		var i ,x1, y1, y2, x2, y2, x3, y3, x4, y4;
	    for (var i = 0; i < houses.length; i = i + 1) {
		    if (detect_radius(this.posX, this.posY, houses[i].posX, houses[i].posY, this.radius + houses[i].radius)) {
			    x1 = this.posX + this.h*this.dirX + this.w*this.dirY;
				y1 = this.posY + this.h*this.dirY - this.w*this.dirX;
				x2 = this.posX + this.h*this.dirX - this.w*this.dirY;
				y2 = this.posY + this.h*this.dirY + this.w*this.dirX;	
				x3 = this.posX - this.h*this.dirX + this.w*this.dirY;
				y3 = this.posY - this.h*this.dirY - this.w*this.dirX;
				x4 = this.posX - this.h*this.dirX - this.w*this.dirY;
				y4 = this.posY - this.h*this.dirY + this.w*this.dirX;
				if(detect_square(x1, y1, houses[i].posX, houses[i].posY, houses[i].dirX, houses[i].dirY, houses[i].w, houses[i].h) || 
				   detect_square(x2, y2, houses[i].posX, houses[i].posY, houses[i].dirX, houses[i].dirY, houses[i].w, houses[i].h) ||
				   detect_square(x3, y3, houses[i].posX, houses[i].posY, houses[i].dirX, houses[i].dirY, houses[i].w, houses[i].h) ||
				   detect_square(x4, y4, houses[i].posX, houses[i].posY, houses[i].dirX, houses[i].dirY, houses[i].w, houses[i].h) ||
				   detect_square(houses[i].x1, houses[i].y1, this.posX, this.posY, this.dirX, this.dirY, this.w, this.h) ||
				   detect_square(houses[i].x2, houses[i].y2, this.posX, this.posY, this.dirX, this.dirY, this.w, this.h) ||
				   detect_square(houses[i].x3, houses[i].y3, this.posX, this.posY, this.dirX, this.dirY, this.w, this.h) ||
				   detect_square(houses[i].x4, houses[i].y4, this.posX, this.posY, this.dirX, this.dirY, this.w, this.h)) {
				    return true;
				}
			}
		}
		return false;
	};
	//move forward
	this.moveUp = function () {    		
		this.posX = this.posX + this.moveSpeed*this.dirX; 
		this.posY = this.posY + this.moveSpeed*this.dirY;
		this.turret.PosX = this.posX;
		this.turret.PosY = this.posY;	
        var A = this.colli_building();
		var B = this.detect_object();
		var C = this.colli_border();
		if (A || B || C) {
		    this.posX = this.posX - this.moveSpeed*this.dirX; 
			this.posY = this.posY - this.moveSpeed*this.dirY;
			this.turret.PosX = this.posX;
			this.turret.PosY = this.posY;
			if (C) {
				return 3;
			}
			else if (B){
			    return 2;
			}
			else {
			    return 1;
			}
		}
		return 0;
	};
	//move backward
	this.moveDown = function () {		
		this.posX = this.posX - this.moveSpeed*this.dirX; 
		this.posY = this.posY - this.moveSpeed*this.dirY;
		this.turret.PosX = this.posX;
		this.turret.PosY = this.posY;	
        var A = this.colli_building();
		var B = this.detect_object();
        var C = this.colli_border();	
		if (A || B || C) {
		    this.posX = this.posX + this.moveSpeed*this.dirX; 
			this.posY = this.posY + this.moveSpeed*this.dirY;
			this.turret.PosX = this.posX;
			this.turret.PosY = this.posY;
			if (C) {
				return 3;
			}
			else if (B){
			    return 2;
			}
			else {
			    return 1;
			}
		}
		return 0;
	};
	//rotate left
	this.turnLeft = function () {		
		this.angle = this.angle - this.turnSpeed;
		this.dirX = Math.sin(this.angle);
		this.dirY = -1*Math.cos(this.angle);		
		if (this.colli_building()) {
		    this.angle = this.angle + this.turnSpeed;
			this.dirX = Math.sin(this.angle);
			this.dirY = -1*Math.cos(this.angle);
		    return 1;
		}
		return 0;
	};
	//rotate right
	this.turnRight = function () {		
		this.angle = this.angle + this.turnSpeed;
		this.dirX = Math.sin(this.angle);
		this.dirY = -1*Math.cos(this.angle);		
		if (this.colli_building()) {
		    this.angle = this.angle - this.turnSpeed;
			this.dirX = Math.sin(this.angle);
			this.dirY = -1*Math.cos(this.angle);
			return 1;
		}
		return 0;
	};
	// setup this tank
	this.set = function () {
		c2.translate(Math.round(this.posX),Math.round(this.posY));
		c2.rotate(this.angle);
		c2.drawImage(this.image, Math.round(this.image.width/-2), Math.round(this.image.height/-2));	
		c2.setTransform(1,0,0,1,0,0);      
		this.turret.set();	
		if (this.live <= this.maxlive/2) {
			c2.translate(Math.round(this.posX),Math.round(this.posY));
			c2.drawImage(this.image2, Math.round(this.image2.width/-2), Math.round(-1*this.image2.height));
			c2.setTransform(1,0,0,1,0,0);  	
			this.smokecount = this.smokecount + 1;
			this.image2.src = "view/Graphics/" + this.smokecount + ".png";	
			if (this.smokecount == 115) {
				this.smokecount = 99;
			}	
		}
		this.rand = this.rand + 1;
	};
};
/*
main canvas drawing function
*/
var drawing = function () {
	"use strict";
    var i, tempA;
	//clear and redraw canvas for each frame
    c2.clearRect(0,0,board.width,board.height);	
	//draw all the wracks
	for (i = 0; i < wracks.length; i += 1) {
		wracks[i].set();
	}
	//draw all the items
	for (i = 0; i < items.length; i += 1) {
		items[i].set();
		if (items[i].detect()) {
		    if (items[i].type == 0) {
			    player.live = player.maxlive;
			}
			else {
			    tempA = player.turret.angle;
			    player.turret = new Turret(player.posX, player.posY, 4);
				player.turret.angle = tempA;
			}
			items.splice(i,1);
			i = i - 1;
		}	
	}
	// player key input actions
	if (action == 68)
	{
		player.turnRight();
	}
	else if (action == 65)
	{	
		player.turnLeft();
	}    
	else if (action == 87)
	{
		player.moveUp();
	}
	else if (action == 83)
	{
		player.moveDown();
	}
	//draw the player 
	if (!dead) {
		player.turret.aim();
		player.set();
		if (player.live <= 0) {
			explosions.push(new Explosion(player.posX, player.posY, 10, 31, 0,0));
			smokes.push(new Explosion(player.posX, player.posY, 32, 47, 2,0));
			wracks.push(new Wrack(player.posX, player.posY, player.angle, 0));
			dead = true;
			player = 0;
			action = 0;
			waiting = true;
		}
	}
	//draw all the defenders
	for (i = 0; i < defenders.length; i += 1) {	
		defenders[i].turret.detect();
		defenders[i].set();
		if (defenders[i].live <= 0) {
		    if (defenders[i].type == 0) {
				explosions.push(new Explosion(defenders[i].posX, defenders[i].posY, 10, 31, 0,0));				
				wracks.push(new Wrack(defenders[i].posX, defenders[i].posY, 0, 3));
			}
			else {
				explosions.push(new Explosion(defenders[i].posX, defenders[i].posY, 115, 152, 0,0));
				wracks.push(new Wrack(defenders[i].posX, defenders[i].posY, 0, 4));
			}	
  			smokes.push(new Explosion(defenders[i].posX, defenders[i].posY, 32, 47, 2,0));
			defenders.splice(i,1);
			i = i - 1;
		}
	}
	//draw all the tanks
	for (i = 0; i < tanks.length; i += 1) {    	
		tanks[i].autodrive();
		tanks[i].turret.detect();
		tanks[i].set();
		if (tanks[i].live <= 0) {
		    if (tanks[i].type == 1) {
				explosions.push(new Explosion(tanks[i].posX, tanks[i].posY, 10, 31, 0,0));		
			}
			else {
			    explosions.push(new Explosion(tanks[i].posX, tanks[i].posY, 115, 152, 0,0));
				smokes.push(new Explosion(tanks[i].posX, tanks[i].posY, 32, 47, 2,0));
				smokes.push(new Explosion(tanks[i].posX + 30*tanks[i].dirX, tanks[i].posY + 30*tanks[i].dirY, 32, 47, 2,0));
				smokes.push(new Explosion(tanks[i].posX - 30*tanks[i].dirX - 20*tanks[i].dirY, tanks[i].posY - 30*tanks[i].dirY + 20*tanks[i].dirX, 32, 47, 2,0));						
			}
			if (tanks[i].drop == 1) {
				items.push(new Item(tanks[i].posX - + 20*tanks[i].dirX, tanks[i].posY - 20*tanks[i].dirY, 0));
			}
			else if (tanks[i].drop == 2){
				items.push(new Item(tanks[i].posX - + 20*tanks[i].dirX, tanks[i].posY - 20*tanks[i].dirY, 1));
			}
			smokes.push(new Explosion(tanks[i].posX, tanks[i].posY, 32, 47, 2,0));
			wracks.push(new Wrack(tanks[i].posX, tanks[i].posY, tanks[i].angle, tanks[i].type));
			tanks.splice(i,1);
			i = i - 1;
		}	
	}
	//draw all the buildings
	for (i = 0; i < houses.length; i += 1) {
		houses[i].set();
	}
	//draw all the smokes
	for (i = 0; i < smokes.length; i += 1) {
		smokes[i].set();
		if (smokes[i].index == smokes[i].ending) {
		    smokes[i].index = smokes[i].index - 16;
		}
	}
	//draw all bullets fired by player
	for (i = 0; i < player_bullets.length; i += 1) {
	    player_bullets[i].detect_enemy();
	    player_bullets[i].set();
		if (player_bullets[i].count > player_bullets[i].duration){
		    player_bullets.splice(i,1);
			i = i - 1;
		}
	}
	//draw all bullets fired by enemy
	for (i = 0; i < enemy_bullets.length; i += 1) {
	    enemy_bullets[i].detect_player();
	    enemy_bullets[i].set();
		if (enemy_bullets[i].count > enemy_bullets[i].duration){
		    enemy_bullets.splice(i,1);
			i = i - 1;
		}
	}
	//draw all explosions every frames
	for (i = 0; i < explosions.length; i += 1) {
	    explosions[i].set();
		if (explosions[i].index > explosions[i].ending){
		    explosions.splice(i,1);
			i = i - 1;
		}
	}
	//if player killed starting counting and bring up game over menu
	if (dead) {
	    deathcount = deathcount + 1;
		if (deathcount > 100) {	
			waiting = false;		
			window.clearInterval(intervalId);
			c2.font="80px Verdana";
			c2.fillStyle="cyan";
			c2.fillText("Game Over",750,200);
			c2.font="50px Verdana";
			c2.fillStyle="red";
			c2.fillText("Restart",800,300);
			c2.fillText("Quit",800,400);		
		}
	}
};
//function to clear and reset all variables
var clear = function () {
	"use strict";
	c2.clearRect(0,0,board.width,board.height);
	player_bullets = [];
	enemy_bullets = [];
	tanks = [];
	defenders = [];
	explosions = [];
	smokes = [];
	wracks = [];
	houses = [];
	items = [];
	paused = false;
	action = 0;
	deathcount = 0;
	dead = false;
};
// Level 1 designing function
var level1 = function () {
	"use strict";
	currentlevel = 1;
	board.style.background = "url('view/Graphics/grass3.jpg') repeat";
	player = new Tank(50,800,0,0);
	houses.push(new House(300, 230, Math.PI/2, 2));
	houses.push(new House(700, 230, Math.PI/-2 + 0.05, 2));
	houses.push(new House(1580, 230, Math.PI/-2, 2));
	houses.push(new House(1180, 230, Math.PI/2 - 0.05, 2));
	houses.push(new House(80, 510, Math.PI/2 + 0.1, 1));
	defenders.push(new Defender(500, 510,0));
	houses.push(new House(940, 510, 0, 1));
	defenders.push(new Defender(1380, 510,0));
	houses.push(new House(1800, 510, Math.PI/2, 1));
	houses.push(new House(300, 810, Math.PI/-2 - 0.05, 2));
	houses.push(new House(700, 810, Math.PI/2, 2));
	houses.push(new House(1580, 810, Math.PI/-2 - 0.05, 2));
	houses.push(new House(1180, 810, Math.PI/-2 + 0.05, 2));
	tanks.push(new Tank(100, 100, 1, 2));
	tanks.push(new Tank(1600, 400, 1, 0));
	tanks.push(new Tank(1600, 640, 1, 0));
	tanks.push(new Tank(410, 200, 1, 1));
};
// Level 2 designing function
var level2 = function () {
	"use strict";
	currentlevel = 2;
	board.style.background = "url('view/Graphics/grass3.jpg') repeat";
	player = new Tank(50,800,0,0);
	houses.push(new House(300, 230, Math.PI/2, 1));
	houses.push(new House(700, 230, Math.PI/-2 + 0.05, 1));
	houses.push(new House(1580, 230, Math.PI/-2, 1));
	houses.push(new House(1180, 230, Math.PI/2 - 0.05, 1));
	houses.push(new House(60, 510, Math.PI/2 + 0.1, 2));
	defenders.push(new Defender(500, 510,0));
	houses.push(new House(940, 510, 0, 1));
	defenders.push(new Defender(1380, 510,0));
	houses.push(new House(1820, 510, Math.PI/2, 2));
	houses.push(new House(300, 810, Math.PI/-2 - 0.05, 1));
	houses.push(new House(700, 810, Math.PI/2, 1));
	houses.push(new House(1580, 810, Math.PI/-2 - 0.05, 1));
	houses.push(new House(1180, 810, Math.PI/-2 + 0.05, 1));
	tanks.push(new Tank(100, 100, 1, 2));
	tanks.push(new Tank(900, 400, 1, 0));
	tanks.push(new Tank(1600, 400, 2, 0));
	tanks.push(new Tank(1800, 640, 2, 0));
	tanks.push(new Tank(1800, 940, 1, 1));
};
// Level 3 designing function
var level3 = function () {
	"use strict";
	currentlevel = 3;
	board.style.background = "url('view/Graphics/dirt.jpg') repeat";
	player = new Tank(900,500,0,0);
	houses.push(new House(800, 430, Math.PI/4, 1));
	houses.push(new House(1100, 630, Math.PI/4, 1));
	houses.push(new House(1050, 400, Math.PI/-4, 1));
	houses.push(new House(850, 650, Math.PI/-4, 1));
	tanks.push(new Tank(200, 200, 2, 1));
	tanks.push(new Tank(1700, 200, 2, 1));
	tanks.push(new Tank(1700, 800, 2, 0));
	tanks.push(new Tank(200, 800, 2, 0));
	tanks.push(new Tank(600, 600, 1, 2));
};
// Level 3 designing function
var level4 = function () {
	"use strict";
	currentlevel = 4;
	board.style.background = "url('view/Graphics/dirt.jpg') repeat";
	player = new Tank(900,500,0,0);
	houses.push(new House(800, 430, Math.PI/4, 1));
	houses.push(new House(1100, 630, Math.PI/4, 1));
	houses.push(new House(1050, 400, Math.PI/-4, 1));
	houses.push(new House(850, 650, Math.PI/-4, 1));
	defenders.push(new Defender(200, 200, 1));
	tanks.push(new Tank(1700, 200, 2, 2));
	defenders.push(new Defender(1700, 800, 1));
	tanks.push(new Tank(200, 800, 2, 1));
};


// Main menu function
var menu = function() {
	"use strict";
    board.style.background = "url('view/Graphics/military2.jpg')";
	c2.drawImage(titleimage, 600, 100);
	c2.font="30px Verdana";
	c2.fillStyle="cyan";
	c2.fillText("Beta version #0.9411",620,260);
	c2.font="70px Verdana";
	c2.fillStyle="red";
	c2.fillText("Start Level 1",650,400);
	c2.fillText("Start Level 2",650,550);
	c2.fillText("Start Level 3",650,700); 
	c2.fillText("Start Level 4",650,850);
};
titleimage = new Image();
titleimage.onload = menu;
titleimage.src = "view/Graphics/title.png";