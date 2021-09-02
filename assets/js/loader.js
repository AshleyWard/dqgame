/* Loader script
   Based on @stoyanstefanov's solution @ 'http://www.jspatterns.com/the-ridiculous-case-of-adding-a-script-element/'
*/

var first = document.getElementsByTagName('script')[0];
var scripts = [];


/* Add all scripts to be loaded below:
	scripts.push(SCRIPTNAME = document.createElement('script'));
	SCRIPTNAME.src = 'FILELOCATION.js';
*/

scripts.push(dqGame = document.createElement('script'));
scripts.push(characters = document.createElement('script'));
scripts.push(enemies = document.createElement('script'));
scripts.push(background = document.createElement('script'));

dqGame.src = 'dqgame.js';
characters.src = 'characters.js';
enemies.src = 'enemies.js';
background.src = 'background.js';


/* Load all defined scripts into page:
*/

scripts.forEach(srpt => {
	first.parentNode.insertBefore(srpt, first);
	srpt.defer = true

});
