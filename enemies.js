// =============
//  Object Definition
// =============

enemies = {

	list: [],

	getEnemyTemplate: function(){
			
		enemyTemplate = {
			
			name:  'Template Baddicus',
			
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