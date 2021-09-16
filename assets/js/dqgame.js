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

var background 	= document.createElement('background.js');
var characters 	= document.createElement('characters.js');
//var enemies 	= document.createElement('enemies.js');



// =============
//  Start - enemies.js
// =============

var enemies = {

	list: [],
	
	sprites: [],
	
	spawn: function(scene){
		//new Sprite(scene, x, y, texture [, frame])
		
		newEnemy = enemies.getEnemyTemplate();
		newEnemy.sprite = scene.physics.add.sprite(scene, 100, 450, game.textures.list["enemy"], null);
		
		enemies.list.push(newEnemy);
		
	},

	getEnemyTemplate: function(){
			
		enemyTemplate = {
			
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
	},
	
	debug: function() {
		console.log("ENEMIES DEBUG LOG::");
		console.log("");
		this.list.forEach(enmy => {
			enmy.debug();
		});
		console.log("==========");
		console.log("");
	},
	
	update: function(scene){
		if (enemies.list.length <= 5) {
			enemies.spawn(scene);
		}
	}

}


// =============
//  Enemies
// =============

{	/*Tankicus*/	let newEnemy = enemies.getEnemyTemplate();

	//Properties
	newEnemy.name = 'Tankicus'
	newEnemy.stats.hp = 100;
	newEnemy.stats.speed = 2;
	newEnemy.abilities.shoot = function() {
		console.log('click.');
		return true;
	}

	//Add to enemy array
	enemies.list.push(newEnemy);
}

enemies.debug();

// =============
//  EOF - enemies.js
// =============



// =============
// GAME
// =============

let game = new Phaser.Game(config);




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
		enemies.update(this);
		background.update(this);
		
	} else { preload() }
	
}


// =============
// Code currently being worked on and not yet organized
// =============
