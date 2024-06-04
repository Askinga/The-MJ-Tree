let modInfo = {
	name: "The Point Growing Tree",
	id: "abcd1234",
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
	num: "0.0",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
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
	if (hasUpgrade('p', 11)) return true
	return false
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (layers.up.effect().gte(1)) gain = gain.times(layers.up.effect())
	if (layers.p.effect().gte(1)) gain = gain.times(layers.p.effect())
	if (hasUpgrade('p', 12)) gain = gain.add(1)
	if (hasUpgrade('p', 13)) gain = gain.pow(1.2)
	if (hasUpgrade('p', 14)) gain = gain.times(upgradeEffect('p', 14))
	if (inChallenge('p', 11)) gain = gain.pow(0.15)
	if (hasChallenge('p', 11)) gain = gain.times(2)
	if (hasUpgrade('p', 21)) gain = gain.pow(upgradeEffect('p', 21))
	if (hasUpgrade('p', 22)) gain = gain.times(1.5)
	if (hasUpgrade('p', 25)) gain = gain.pow(1.3)
	if (hasUpgrade('p', 31)) gain = gain.times(upgradeEffect('p', 31))
	if (inChallenge('p', 12)) gain = gain.times(0.1)
	if (inChallenge('p', 12)) gain = gain.pow(0.1)
	if (hasChallenge('p', 12)) gain = gain.times(2)
	if (hasUpgrade('au', 13)) gain = gain.times(4)
	gain = gain.div(getPointDivider())
	return gain
}
function getPointDivider() {
	let base = player.points.max(1e9).log(10).max(1).pow(2)
	return base
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
       () => (player.points.gte(1e9)&&(canGenPoints())) ? "Your point gain is divided by "+format(getPointDivider())" : "",
	"<br>",
]

// Determines when the game "ends"
function isEndgame() {
	return player.up.points.gte("3")
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
