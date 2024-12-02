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
	num: "0.4.0",
	name: "Infinite... Part 1",
}

let changelog = `<h1>Changelog:</h1><br>
            	<h3>v0.4.0</h3><br>
		- Added 12 upgrades<br>
  		- Added 1 progression layer.<br>
      		- Added 6 achievements.<br>
  		- Added 3 buyables.<br>
                - Added 2 milestones.<br>
		- Added 2 side layers.<br>
  	        - Added 4 formats.<br>
	        - Added 3 options.<br>
	     
      
      		<h3>v0.3.0</h3><br>
		- Added 16 upgrades<br>
  		- Added 1 layer.<br>
      		- Added 5 achievements.<br>
		- Added Super Points.<br>
  		- Added 1 buyable.<br>
                - Changed the font.<br>
	     
      
		<h3>v0.2.0</h3><br>
		- Added 16 upgrades<br>
		- Added 1 milestones.<br>
  		- Added 1 layer.<br>
    		- Added the achievements layer.<br>
      		- Added 13 achievements.<br>
		- Added Prestige Generators and Boosters.<br>
	     
      
      		<h3>v0.1.1</h3><br>
		- Fixed a bug where the game is partially frozen<br>
    		- Changed the font to original<br>
	     
      
      		<h3>v0.1.0</h3><br>
		- Added 21 upgrades<br>
		- Added 2 milestones.<br>
  		- Added 1 layer.<br>
    		- Changed the font.<br>
	
	     
		<h3>v0.0.0</h3><br>
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
	if (hasUpgrade('up', 24)) gain = gain.times(100)
	if (hasUpgrade('up', 25)) gain = gain.times(upgradeEffect('up', 25))
	if (hasUpgrade('sp', 11)) gain = gain.times(10)
	if (hasUpgrade('sp', 13)) gain = gain.times(1000)
	if (hasUpgrade('sp', 14)) gain = gain.times(250)
	if (hasUpgrade('sp', 15)) gain = gain.times(10)
	gain = gain.times(tmp.sp.powerEff)
	if (hasUpgrade('sp', 21)) gain = gain.times(10)
	if (hasUpgrade('sp', 22)) gain = gain.times(10)
	if (hasUpgrade('sp', 23)) gain = gain.times(1000)
	if (hasUpgrade('sp', 24)) gain = gain.times(10)
	if (hasUpgrade('sp', 25)) gain = gain.times(10)
	if (hasUpgrade('sp', 31)) gain = gain.times(10)
	if (hasUpgrade('sp', 32)) gain = gain.times(10)
	if (hasUpgrade('sp', 33)) gain = gain.times(10)
	if (hasUpgrade('sp', 34)) gain = gain.pow(1.005)
	if (hasUpgrade('sp', 34)) gain = gain.times(10)
	if (hasUpgrade('sp', 35)) gain = gain.times(200)
	if (hasUpgrade('I', 11)) gain = gain.times(2)
	if (hasUpgrade('I', 21)) gain = gain.times(upgradeEffect('I', 21))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"Reach Infinity and get Infinity upgrade 10 to beat the game!"
]

// Determines when the game "ends"
function isEndgame() {
	return (player.points.gte(new Decimal("1.79e308")) && hasUpgrade('I', 25))
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
