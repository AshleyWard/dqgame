// =============
// Main // Setup
// =============


var config = {
    type: Phaser.AUTO,
    width: 850,
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



let gameState = {
    player: {},
    board: {},
    palette: [0xa7f66c, 0x844cc5],
    selectedColor: 0x844cc5
}




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

var cursors;
var player;
var board;
var shape;
var pickup;

var background 	= document.createElement('background.js');					//These should probably be moved to preload but I'm actively working on something else at the moment.
var characters 	= document.createElement('characters.js');					//If anyone reads this comment, I didn't get back to fixing this yet. Sorry!
var enemies 	= document.createElement('enemies.js');



// =============
// Build Objects
// =============

/* Board Game 
pickup = {
	type: 	[coin = {},	pickup = {}],
	coin() {
		let coin = {
						value: 1,
						img: 'coin',
						draw(scene, cell) {
							let r1 = scene.add.rectangle(cell.x, cell.y, 10, 20, 0xFFFF66);
							r1.isStroked = true;
							r1.strokeColor = 0x000000;
						}
		}
		return coin;
	},
	spawn(scene, cell = board.getRandomCell()) {
		cell.content = this.coin();
		cell.content.draw(scene, cell);
		console.log(cell);
	}
}

board = {
        left: 225,
        top: 25,
        cellSize: 50,
        cells: [],
        generateCells() {						// Assigns a filled starting array of cells to cells[]
            for (let i = 0; i<13; i++){
                for (let j = 0; j<13; j++){
                    let tempCell = this.generateCell(this.left+i*this.cellSize,this.top+j*this.cellSize);
                    i+j
                    board.cells.push(tempCell);
                }
            }
			board.cells.forEach(cell => {				
				if(board.cells.indexOf(cell)%2 === 1){
					cell.backgroundColor = 0xBB99CC;
				}
			});
        },
        generateCell(x = 0, y = 0) {			// Returns a cell
            let cell = {
                x: x,
                y: y,
                backgroundColor: 0xDDAADD,
				content: ''
            }
            return cell;    // Returns a cell
        },
		getRandomCell() {
			let cellCount = this.cells.length;
			let randID = Math.floor(Math.random() * cellCount);
			return this.cells[randID];
		}
}
*/



// =============
// GAME
// =============

let game = new Phaser.Game(config);




// =============
// Preload
// =============


function preload ()
{	
    cursors = this.input.keyboard.createCursorKeys(); //  Input Events	
	
	/* Board Game
	
    board.generateCells();										//Populate the board

    //draw cells in cells
	function drawCell(scene, cell) {
		// requires updating to board.cellSize
		let r1 = scene.add.rectangle(cell.x, cell.y, 50, 50, cell.backgroundColor);
		r1.isStroked = true;
		r1.strokeColor = 0x000000;		
		return r1;
	}		
    board.cells.forEach( x => {
		//console.log(`this: ${this} | board.cellSize: ${board.cellSize} | x.x: ${x.x}, | y.y: ${x.y}`);
        drawCell(this, x);
    });
	pickup.spawn(this);
	
	*/

    player = this.physics.add.sprite(100, 450, 'mrheart');	// The player and its settings	

}




// =============
// Create
// =============


function create ()
{	
    //cursors = this.input.keyboard.createCursorKeys(); //  Input Events	

	/* Board Game

    board.generateCells();										//Populate the board


    //draw cells in cells
	function drawCell(scene, cell) {
		// requires updating to board.cellSize
		let r1 = scene.add.rectangle(cell.x, cell.y, 50, 50, cell.backgroundColor);
		r1.isStroked = true;
		r1.strokeColor = 0x000000;		
		return r1;
	}		
    board.cells.forEach( x => {
		//console.log(`this: ${this} | board.cellSize: ${board.cellSize} | x.x: ${x.x}, | y.y: ${x.y}`);
        drawCell(this, x);
    });
	pickup.spawn(this);
	*/

	

}




// =============
// Update
// =============

var lazyPreloadSolution = false;
function update ()
{
	{	// Temporary fix to test. This solution addresses the comments in the 'declare variables' section, re: I haven't made subfiles properly preload yet.
	
		if (!lazyPreloadSolution && cursors.up.isDown)
		{
			lazyPreloadSolution = true;
		}	
	
	}
	
	if (lazyPreloadSolution) {
	
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
			lazyPreloadSolution = true;
		}	
		background.update(this);
	}
	
}


// =============
// Code currently being worked on and not yet organized
// =============

