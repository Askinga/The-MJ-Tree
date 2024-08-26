let modInfo = {
	name: "The TMT Game About Points",
	id: "mymod55",
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
	name: "1 Layer Finished",
}

let changelog = `<h1>Changelog:</h1><br>
            	<h3>v0.1</h3><br>
		- Added 21 upgrades<br>
		- Added 2 milestones.<br>
  		- Added 1 layer.<br>
    		- Changed the font.<br>
	
	     
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
        if (hasUpgrade('p', 11)) gain = gain.times(2)
	if (hasUpgrade('p', 12)) gain = gain.times(1.5)
	if (hasUpgrade('p', 13)) gain = gain.times(2)
	if (hasUpgrade('p', 14)) gain = gain.times(2.5)
	if (hasUpgrade('p', 15)) gain = gain.times(3)
	if (hasUpgrade('p', 21)) gain = gain.times(upgradeEffect('p', 21))
	if (hasUpgrade('p', 22)) gain = gain.times(upgradeEffect('p', 22))
	if (hasUpgrade('p', 23)) gain = gain.times(upgradeEffect('p', 23))
	if (hasUpgrade('p', 24)) gain = gain.times(upgradeEffect('p', 24))
	if (hasUpgrade('p', 25)) gain = gain.times(upgradeEffect('p', 25))
	if (hasUpgrade('p', 32)) gain = gain.times(upgradeEffect('p', 32))
	if (hasUpgrade('p', 42)) gain = gain.pow(1.05)
	if (hasUpgrade('p', 43)) gain = gain.pow(upgradeEffect('p', 43))
	if (hasUpgrade('up', 11)) gain = gain.times(5)
        if (hasChallenge('up', 11)) gain = gain.times(10)
	if (inChallenge('up', 11)) gain = gain.pow(0.5)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"Reach 1ee30 points to beat the game!"
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("ee30"))
}



// Less important things beyond this point!
function colored(layer, text, tag='h2') { return `<${tag} style='color:${temp[layer].color};text-shadow:${temp[layer].color} 0px 0px 10px;'>${text}</${tag}>` }
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
