let modInfo = {
	name: "The MJ Tree REWRITTEN",
	id: "mymod1",
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
	num: "0.1 Working hard",
	name: "Not Finished!",
}

let changelog = `<h1>Changelog:</h1><br>
                <h3>v0.1</h3><br>
		- Added 3 layers: MJs, MJ Buses and MJ Worlds.<br>
                - Added 25 upgrades.<br>
		- Endgame: MJ Worlds Upgrade 10.<br>

		
		<h3>v0.0</h3><br>
		- First version.<br>
                - Nothing special.`

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
	
	// add
	
	gain = gain.add(layers.p.effect())
	if (hasUpgrade('p', 12)) gain = gain.add(upgradeEffect('p', 12))
	
	// times
	
	if (hasUpgrade('p', 11)) gain = gain.times(1.5)
	if (hasUpgrade('p', 13)) gain = gain.times(upgradeEffect('p', 13))
	if (hasUpgrade('p', 15)) gain = gain.times(2)
	if (hasUpgrade('b', 12)) gain = gain.times(3.141592653)
	gain = gain.times(layers.b.effect())
	if (hasUpgrade('p', 23)) gain = gain.times(2.5)
	if (hasUpgrade('w', 11)) gain = gain.times(10)
	if (hasUpgrade('w', 34)) gain = gain.times(50)
	
	// power
	
	if (hasUpgrade('b', 24)) gain = gain.pow(1.03)
	if (hasUpgrade('w', 32)) gain = gain.pow(1.02)
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
	return (hasUpgrade('b', 25))
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
