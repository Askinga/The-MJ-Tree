let modInfo = {
	name: "Rune Tree",
	author: "Askinga/Sanas",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js", "prestige.js", "super.js", "boost.js", "meta.js", "levels.js",
	"ultra.js", "extreme.js", "generators.js"
	],

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
	return player.d.started.gte(1)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (player.d.difficulty.eq(0)) gain = gain.times(2)
	if (player.d.difficulty.eq(2)) gain = gain.times(0.33)
	if (hasUpgrade('p', 11)) gain = gain.times(2)
	if (hasUpgrade('p', 201)) gain = gain.times(2)
	if (hasUpgrade('p', 231)) gain = gain.times(upgradeEffect('p', 231))
	if (hasUpgrade('p', 241)) gain = gain.times(2)
	if (hasUpgrade('p', 272)) gain = gain.times(upgradeEffect('p', 272))
	gain = gain.times(layers.s.effect())
	if (hasUpgrade('s', 11)) gain = gain.times(6)
	gain = gain.times(tmp.b.terrible)
	gain = gain.times(tmp.b.kinda_good)
	gain = gain.times(layers.m.effect())
	gain = gain.times(tmp.l.lvlE2)
	if (hasUpgrade('u', 11)) gain = gain.times("e100")
	if (hasUpgrade('u', 12)) gain = gain.times("e50")
	if (hasUpgrade('u', 15)) gain = gain.times("e75")
	if (hasUpgrade('u', 21)) gain = gain.times("e200")
	if (hasUpgrade('u', 22)) gain = gain.times("e250")
	if (hasUpgrade('u', 23)) gain = gain.times("e500")
	if (hasUpgrade('u', 24)) gain = gain.times("e750")
	if (hasUpgrade('u', 25)) gain = gain.times("e1000")
	gain = gain.times(layers.e.effect())
	if (hasUpgrade('e', 11)) gain = gain.times("e1500")
	if (hasUpgrade('e', 12)) gain = gain.times("e1000")
	if (hasUpgrade('e', 13)) gain = gain.times("e2000")
	if (hasUpgrade('e', 15)) gain = gain.times("e2500")
	if (hasUpgrade('e', 21)) gain = gain.times("e3000")
	if (hasUpgrade('e', 23)) gain = gain.times("e4000")
	if (hasUpgrade('e', 24)) gain = gain.times("e5000")
	if (hasUpgrade('e', 25)) gain = gain.times("e7500")
	if (hasUpgrade('e', 31)) gain = gain.times("e10000")
	if (hasUpgrade('e', 32)) gain = gain.times("e12000")
	if (hasUpgrade('e', 34)) gain = gain.times(upgradeEffect('e', 34))
	if (hasUpgrade('e', 35)) gain = gain.times("e12500")
	gain = gain.times(buyableEffect('e', 12))
	if (hasMilestone('XP', 0)) gain = gain.pow(tmp.XP.bigI)
	if (player.d.difficulty.eq(0)) gain = gain.pow(1.01)
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
