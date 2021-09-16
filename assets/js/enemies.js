// =============
//  Object Definition
// =============


enemies = {

	list: [],
	
	sprites: [],
	
	spawn: function(scene){
		//new Sprite(scene, x, y, texture [, frame])
		
		newEnemy = enemies.getEnemyTemplate();
		newEnemy.sprite = Object.assign(newEnemy.sprite, enemies.sprites[0]);
		newEnemy.sprite.visible = true;
		
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
//  Initialize Enemy List
// =============

enemies.list.push(enemies.getEnemyTemplate());

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
//EOF