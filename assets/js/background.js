
background = {

	width: config.width,
	height: 800,

	contents: [],

	stars: {
		
		starList: [],
		
		speed: 3,
		frequency: 5,
	
		newStar (scene) {
			//new Star(scene [, x] [, y] [, points] [, innerRadius] [, outerRadius] [, fillColor] [, fillAlpha])
			
			let tempStar = scene.add.star(background.width + 20, this.randomY(), 4, this.randomInnerRadius(), this.randomOuterRadius(), 0xFFFFFF);		//Keep innerradius under 8
			
			tempStar.angle = this.randomRotation();
			tempStar.alpha *= Math.random() * 0.9;
			
			this.starList.push(tempStar);
			
		},
		
		//randomX () { return Math.floor(Math.random() * background.width); },
		randomY () { return (Math.floor(Math.random() * (background.height + 20)) - 10); },
		
		randomOuterRadius () { return Math.floor(Math.random() * 12) + 8; },
		randomInnerRadius () { return Math.floor(Math.random() * 4) + 2; },
		
		randomRotation () { return Math.floor(Math.random() * 89); },
		
	
		update (scene) {
			
			/* Make a star, maybe! */
			let randInd = Math.floor(Math.random() * 100);
			if (randInd <= this.frequency) {
				this.newStar(scene);
			}
			
			
			/* 	Move stars to the left based on their speed
				destroy star object and remove from from starList once they pass the left side*/
			this.starList.forEach(curStar => {
				curStar.x -= (this.speed * curStar.alpha);
				
				if(curStar.x <= -20) { 
					elementIndex = this.starList.indexOf(curStar);
					this.starList.splice(elementIndex, 1);
					curStar.destroy();
				};
			});
		}
	},
	planets: {},
	doodads: {},
	
	update (scene) {
		this.stars.update(scene);
	}
	
}
