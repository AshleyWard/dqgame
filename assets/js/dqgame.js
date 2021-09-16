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
var enemies 	= document.createElement('enemies.js');


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
