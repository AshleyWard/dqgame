// =============
//  Object Definition
// =============

characters = {

	list: [],

	getCharacterTemplate: function(){
			
		characterTemplate = {
			
			name:  'Mr. Template',
			
			stats: {
				b: 1,
				r: 1,
				g: 1,
				y: 1,
				debug(){
					console.log(this.b); 
					console.log(this.r); 
					console.log(this.g); 
					console.log(this.y);
				}
			},
			
			phrases: {
				damaged() {return 'Ow!';},
				onHit() {return 'Gotcha!';},
				onPickup() {return 'Mine!';},
				debug(){
					console.log(this.damaged()); 
					console.log(this.onHit()); 
					console.log(this.onPickup());
				}
			},
			
			abilities: {
				shoot() {
					console.log('pew pew');
					return true;
				},
				special() {
					console.log('lightning bolt!!');
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
		
		return characterTemplate;
	},
	
	debug: function() {
		console.log("CHARACTER DEBUG LOG::");
		console.log("");
		this.list.forEach(chrctr => {
			chrctr.debug();
		});
		console.log("====================");
		console.log("");
	}
	
}

// =============
//  Initialize Character List
// =============

characters.list.push(characters.getCharacterTemplate());

// =============
//  Characters
// =============

{	/* Maeby */			let newChar = characters.getCharacterTemplate();

	//Properties
	newChar.name = 'Maeby'
	newChar.abilities.shoot = function() {
		console.log('Seriously?');
		return true;
	}
	
	//Add to character array
	characters.list.push(newChar);
}

{	/* Toby */			let newChar = characters.getCharacterTemplate();

	//Properties
	newChar.name = 'Toby'
	newChar.abilities.shoot = function() {
		console.log('Wham, pow, kerboppeth!');
		return true;
	}
	
	//Add to character array
	characters.list.push(newChar);
}

{	/* Mother */		let newChar = characters.getCharacterTemplate();

	//Properties
	newChar.name = 'Mother'
	newChar.abilities.shoot = function() {
		console.log('Is that what you plan on wearing?');
		return true;
	}
	
	//Add to character array
	characters.list.push(newChar);
}

{	/* Gob */			let newChar = characters.getCharacterTemplate();

	//Properties
	newChar.name = 'Gob'
	newChar.abilities.shoot = function() {
		console.log('BLAMMO!!!');
		return true;
	}
	
	//Add to character array
	characters.list.push(newChar);
}

characters.debug();
//EOF