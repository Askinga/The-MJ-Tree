let modInfo = {
	name: "The Prestige Layers Tree", // Name of the mod
	author: "Askinga", // Put your github username here
	pointsName: "points", // Name of "points"
	modFiles: ["prestige.js", "boosters.js", "generators.js", "tree.js"], // Use this if you have more than 1 layer file.

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "Prestiged",
}

let changelog = `<h1>Changelog:</h1><br/>
	<h2>v0.1: Prestiged</h3><br/>
		- Added Prestige layer.<br/>
  		- Added 10 new upgrades.<br/>
    		- Added Booster layer. (not finished)<br/>
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
