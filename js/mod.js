let modInfo = {
	name: "The Upgrade Tree TMT",
	id: "mymod2",
	author: "Askinga",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "Work",
}

let changelog = `<h1>Changelog:</h1><br>
             <h3>v0.1</h3><br>
		- Added 22 upgrades.<br>
		- More stuff.<br>

 
             <h3>v0.0</h3><br>
		- Added things.<br>
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
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (player.s.points.gte(1)) gain = gain.times(layers.s.effect())
	if (hasUpgrade('p', 11)) gain = gain.times(2)
	if (hasUpgrade('p', 12)) gain = gain.times(3)
	if (hasUpgrade('p', 13)) gain = gain.times(4)
	if (hasUpgrade('r', 11)) gain = gain.times(3)
        if (hasUpgrade('p', 21)) gain = gain.times(upgradeEffect('p', 21))
	if (hasUpgrade('p', 22)) gain = gain.times(upgradeEffect('p', 22))
	if (hasUpgrade('p', 23)) gain = gain.times(upgradeEffect('p', 23))
	if (hasUpgrade('r', 21)) gain = gain.times(upgradeEffect('r', 21))
	if (hasUpgrade('r', 23)) gain = gain.times(upgradeEffect('r', 23))
	gain = gain.div(getPointDivider())
	if (hasUpgrade('r', 12)) gain = gain.times(10)
	if (inChallenge('r', 11)) gain = gain.div(20)
	if (hasUpgrade('s', 11)) gain = gain.times(1000)
 if (hasUpgrade('s', 12)) gain = gain.times(1000)
 return gain
}
function getPointDivider() {
	let base = player.points.max(1e15).log(1e15).max(1).pow(50)
	if (inChallenge('r', 11)) base = base.pow(2)
	return base
}
function getUpgradePointDivider() {
	let base = player.p.points.max(1e26).log(1e26).max(1).pow(100)
	return base
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	
	() => (player.points.gte(1e15)&&(canGenPoints())) ? "After 1e15 points, your point gain is divided by "+format(getPointDivider())+" due to softcap!" : "",

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
