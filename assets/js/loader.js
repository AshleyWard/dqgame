/* Loader script
   Based on @stoyanstefanov's solution @ 'http://www.jspatterns.com/the-ridiculous-case-of-adding-a-script-element/'
*/

let loaderComplete = false;

var first = document.getElementsByTagName('script')[0];
var scripts = [];

let jsLoc = 'assets/js/';


/* Add all scripts to be loaded below:
	scripts.push(SCRIPTNAME = document.createElement('script'));
	SCRIPTNAME.src = 'FILELOCATION.js';
*/

scripts.push(dqGame = document.createElement('script'));
scripts.push(characters = document.createElement('script'));
scripts.push(enemies = document.createElement('script'));
scripts.push(background = document.createElement('script'));

dqGame.src = jsLoc + 'dqgame.js';
characters.src = jsLoc + 'characters.js';
enemies.src = jsLoc + 'enemies.js';
background.src = jsLoc + 'background.js';


/* Load all defined scripts into page:
*/

scripts.forEach(srpt => {
	first.parentNode.insertBefore(srpt, first);
	srpt.defer = true

});

loaderComplete = true;