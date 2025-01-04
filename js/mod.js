let modInfo = {
	name: "The Prestige Layers Tree", // Name of the mod
	author: "Askinga", // Put your github username here
	pointsName: "points", // Name of "points"
	modFiles: ["prestige.js", "boosters.js", "generators.js", "rebirth.js", "antimatter.js", "tree.js"], // Use this if you have more than 1 layer file.

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2.1",
	name: "Balancing 1",
}

let changelog = `<h1>Changelog:</h1><br/>
	<h2>va.b.c</h2><br/>
 	a is a major update,<br/>
  	b is a smaller update,<br/>
   	c is a bug fix or a balancing change.<br/>
 	<br/>
 	<h3>v0.2.1: Balancing 1</h3><br/>
  		- Balanced the game.<br/>
    		- Changed some upgrades, automation is earlier, some bases are a bit higher due to timewalls.<br/>
      		- Small balancing update to remove some timewalls.<br/>
		<br/>
  	<h2>v0.2: Row 1</h3><br/>
		- Added Booster layer. Its formula is base^boosters<br/>
  		- Added Generator layer and Generator Power. It shares the same formula with boosters, but it is subtracted by 1.<br/>
    		- Added 20 new upgrades. 2 unlocking new layers.<br/>
      		- Added Rebirth layer (not finished)<br/>
 		<br/>
 	<h2>v0.1: Prestiged</h3><br/>
		- Added Prestige layer.<br/>
  		- Added 10 new upgrades.<br/>
 		<br/>
 	<h2>v0.0: Literally nothing</h3><br/>
		- Added things.<br/>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade('p', 11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if(hasUpgrade('p',12)) gain = gain.times(2)
	if (hasUpgrade('p', 13)) gain = gain.times(upgradeEffect('p', 13))
	if (hasUpgrade('p', 14)) gain = gain.times(upgradeEffect('p', 14))
	if(hasUpgrade('p',21)) gain = gain.times(3)
	if(hasUpgrade('p',22)) gain = gain.pow(1.15)
	if(hasUpgrade('p',23)) gain = gain.times(2)
	if(hasUpgrade('p',25)) gain = gain.times(5)
	gain = gain.times(layers.b.effect())
	if(hasUpgrade('b',12)) gain = gain.times(2.5)
	if(hasUpgrade('b',24)) gain = gain.times(10)
	gain = gain.times(tmp.g.genPowerEffect)
	if(hasUpgrade('g',11)) gain = gain.times(5)
	if (hasUpgrade('g', 13)) gain = gain.times(upgradeEffect('g', 13))
	if(hasUpgrade('g',22)) gain = gain.pow(1.025)
	if(hasUpgrade('r',11)) gain = gain.times(5)
	if(hasUpgrade('r',12)) gain = gain.times(2)
	if(hasUpgrade('r',14)) gain = gain.times(2)
	if(hasUpgrade('r',22)) gain = gain.times(3)
	if(hasUpgrade('r',23)) gain = gain.times(2.5)
	if(hasUpgrade('p',31)) gain = gain.times(5)
	if(hasUpgrade('r',24)) gain = gain.times(10)
	if(hasUpgrade('r',25)) gain = gain.times(5)
	if(hasUpgrade('r',31)) gain = gain.times(5)
	if (hasUpgrade('r', 33)) gain = gain.times(upgradeEffect('r', 33))
	if(hasUpgrade('r',34)) gain = gain.times(10)
	if(hasUpgrade('r',35)) gain = gain.times(20)
	if(hasUpgrade('b',33)) gain = gain.times(20)
	if(hasUpgrade('r',41)) gain = gain.times(3)
	if(hasUpgrade('r',42)) gain = gain.times(10)
	if(hasUpgrade('r',44)) gain = gain.times(100)
	if (hasUpgrade('r', 53)) gain = gain.times(upgradeEffect('r', 53))
	if(inChallenge('r',11) || inChallenge('r',22)) gain = gain.div(1000)
	if(hasUpgrade('r',55)) gain = gain.times(250)
	gain = gain.times(layers.a.effect())
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
