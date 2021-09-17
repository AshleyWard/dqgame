// =============
//  ENEMIES
// =============

//Enemy.js
class Enemy extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'enemy');
        config.scene.add.existing(this);

        this.setInteractive();
        this.on('pointerdown',this.clickMe,this);
    }
    clickMe()
    {
    	this.alpha-=.1;
		console.log('i was clickyed');
    }
}
//Enemies.js
class Enemies {
	constructor(scene) {
		this.scene = scene;
		this.list = [];
		this.generateEnemies();
		this.debug();
	}
	
	spawn(x,y) {
		let newEnemy;
		newEnemy = this.getEnemyTemplate();
		newEnemy.sprite = new Enemy({scene:this.scene,x:200,y:200});
		enemies.list.push(newEnemy);
	}	
	
	patrol(enemy, startX, startY) {
		let enSprite = enemy.sprite
		
		let speed = enemy.stats.speed
		
		let minX = startX - 50;
		let maxX = startX + 50;
		let minY = startY - 50;
		let maxY = startY + 50;
		
		//We've just started moving - we'll not be on the outside of the bounding box yet!
		if (enSprite.x !== minX && enSprite.x !== maxX && enSprite.y !== minY && enSprite.y !== maxY ) {
			enSprite.x += espeed;
			
		//We're on the left wall
		} else if 	(enSprite.x <= minX) {
			enSprite.x = minX;
			//Start heading down
			if (enSprite.y <= maxY) {
				enSprite.y += speed;
			//We've hit the bottom
			} else if (enSprite.y >= maxY) {
				enSprite.y = maxY;
			}
		//We're on the right wall
		} else if 	(enSprite.x >= maxX) {
			enSprite.x = maxX;
			//Start heading up
			if (enSprite.y <= minY) {
				enSprite.y -= speed;
			//We've hit the top
			} else if (enSprite.y <= minY) {
				enSprite.y = minY;
			}
		} else {
			console.log ('not sure, chief. patrolling has stopped.');
		}
		
	}

	getEnemyTemplate() {
			
		var enemyTemplate = {
			
			name:  'Template Baddicus',
			
			sprite: {},
			
			stats: {
				hp: 10,
				speed: 5,
				debug(){
					console.log(this.hp); 
				}
			},
			
			phrases: {
				battlecry() {return 'Grrr!';},
				onDeath() {return 'Ouch!';},
				debug(){
					console.log(this.battlecry()); 
					console.log(this.onDeath()); 
				}
			},
			
			abilities: {
				
				shoot() {
					console.log('pew pew, but evil!');
					return true;
				},
				special() {
					console.log('shopping cart toss!');
					return true;
				},
				debug(){
					console.log(this.shoot()); 
					console.log(this.special());
				}
			},
			debug: function() {
								console.log(this.name);
								this.stats.debug();
								this.phrases.debug();
								this.abilities.debug();
								console.log('');
							}
		}
		
		return enemyTemplate;
	}
	generateEnemies() {
	
		/*Tankicus*/ {	
		let newEnemy = this.getEnemyTemplate();

		//Properties
		newEnemy.name = 'Tankicus'
		newEnemy.stats.hp = 100;
		newEnemy.stats.speed = 2;
		newEnemy.abilities.shoot = function() {
			console.log('click.');
			return true;
		}
		
		//Sprite
		newEnemy.sprite = new Enemy({scene:this.scene,x:200,y:200});

		//Add to enemy array
		this.list.push(newEnemy);
		}
		/*Tankicus 2*/ {	
		let newEnemy = this.getEnemyTemplate();

		//Properties
		newEnemy.name = 'Tankicus 2'
		newEnemy.stats.hp = 200;
		newEnemy.stats.speed = 2;
		newEnemy.abilities.shoot = function() {
			console.log('click.');
			return true;
		}
		
		//Sprite
		newEnemy.sprite = new Enemy({scene:this.scene,x:400,y:200});

		//Add to enemy array
		this.list.push(newEnemy);
		}

	}
	update (){
		if (this.list.length <= 0) {
			this.spawn(100, 200);
		}
		if (this.list.length > 0) {
			this.patrol(this.list[0], 250, 250);
			this.patrol(this.list[1], 350, 350);
		}
	}
	debug () {
		console.log("ENEMIES DEBUG LOG::");
		console.log("");
		this.list.forEach(enmy => {
			enmy.debug();
		});
		console.log("==========");
		console.log("");
	}
}

// =============
// Main // Setup
// =============


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 650,
	backgroundColor: 0x200A4C,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update

    }
};


let game = new Phaser.Game(config);

// =============
//Declare Variables
// =============

var ip;		//142.31.117.86 off cisco -- 142.35.171.147 on cisco -- 2021/08/31
/*ip fetch*/ {  
	function text(url) {
	  return fetch(url).then(res => res.text());
	}

	text('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
	  let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
	  ip = data.match(ipRegex)[0];
	  console.log(ip);
	});
}


let gameState = {					//Currently unused
    player: {},
    board: {},
    palette: [0xa7f66c, 0x844cc5],
    selectedColor: 0x844cc5
}

var cursors;
var player;
var enemies;

var background 	= document.createElement('background.js');
var characters 	= document.createElement('characters.js');
//var enemies 	= document.createElement('enemies.js');



// =============
//  Start - enemies.js
// =============

// =============
//  EOF - enemies.js
// =============



// =============
// GAME
// =============




// =============
// Preload
// =============

let loaded = false;
let backgroundLoaded = false;
let imgLoad = false;

function preload ()
{	
	//Only attempt to load images on the first run of preload
	if (!imgLoad) {
		this.load.image('friend', './assets/img/friend.png');
		this.load.image('enemy', './assets/img/enemy.png');
		imgLoad = true;
	}
	
	if (background.update !== undefined) {	backgroundLoaded = true; }
	if (backgroundLoaded) { loaded = true; }

}




// =============
// Create
// =============


function create ()
{	
    player = this.physics.add.sprite(100, 450, 'friend');	// The player and its settings	
    cursors = this.input.keyboard.createCursorKeys(); //  Input Events	
	
	enemies = new Enemies(this);
	
}



// =============
// Update
// =============

function update ()
{
	if (loaded) {
	

		if (cursors.left.isDown)
		{
			characters.list[1].abilities.shoot();
			player.x -= 5;
			//player.anims.play('left', true);
		}
		if (cursors.right.isDown)
		{			
			characters.list[2].abilities.shoot();
			player.x += 5;
		}
		if (cursors.down.isDown)
		{
			characters.list[3].abilities.shoot();
			player.y += 5;
		}
		if (cursors.up.isDown)
		{
			characters.list[4].abilities.shoot();
			player.y -= 5;
		}	
		enemies.update();
		background.update(this);
		
	} else { preload() }
	
}


// =============
// Code currently being worked on and not yet organized
// =============
