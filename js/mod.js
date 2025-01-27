let modInfo = {
	name: "The Math Tree",
	id: "mymod1MATH",
	author: "Askinga",
	pointsName: "points",
	modFiles: ["layers/computing.js", "layers/addition.js", "layers/multiplication.js", "layers/division.js", "layers/subtraction.js", "layers/achievements.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0.08333333333,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.3",
	name: "Not Finished!",
}

let changelog = `<h1>Changelog:</h1><br/>
              <h2>v0.3</h2><br/>
	       - Added MUSIC!!! 🎶 (currently has 2 songs, but will be adding more soon!)<br/>
	       - Added the Achevements layer and added 10 achevements (one being a special one)<br/>
	       - Added 1 layers: <spoiler>Division.</spoiler><br/>
	       - Added 5 milestones<br/>
	       - Added 1 upgrades<br/>
	       - Added 3 challenges<br/>
	       - Added 3 automaters<br/>
	       - Added the tree of math (tab)<br/>
	       - Made the Next Compution bar working!<br/>
	       - Added 1 option.<br/>
	       <br/>
	       <h2>v0.2</h2><br/>
	       - Added 4 milestones.<br/>
	       - Added 1 layers: <spoiler>Multiplication.</spoiler><br/>
	       - Added 7 upgrades.<br/>
	       - Some other things.<br/>
	       <br/>
	       <h2>v0.1</h2><br/>
	       - Added 6 milestones.<br/>
	       - Added 2 layers: <spoiler>Computing</spoiler> and <spoiler>Addition.</spoiler><br/>
	       - Added 5 upgrades.<br/>
  	       <br/>
    		<h2>v0.0</h2><br/>
                - Nothing!`

let winText = `Congratulations! You have computed the endgame and the game is beaten, for now...`

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
	if(hasMilestone('c', 0)) gain = gain.times(1.5)
	if(hasMilestone('c', 1)) gain = gain.add(3.5)
	if(hasUpgrade('a', 11)) gain = gain.times(2)
	if(hasUpgrade('a', 13)) gain = gain.times(4)
	if(hasMilestone('c', 4)) gain = gain.times(1.4)
	gain = gain.add(layers.a.effect())
	if(hasUpgrade('a', 12)) gain = gain.add(10)
	if(hasMilestone('c', 4)) gain = gain.add(10)
	gain = gain.times(layers.m.effect())
	if(hasUpgrade('m', 11)) gain = gain.times(2.25)
	if(hasMilestone('c', 6)) gain = gain.times(2.5)
	if(hasUpgrade('m', 13)) gain = gain.times(1.5)
	if(hasMilestone('c', 7)) gain = gain.times(2)
	if(hasUpgrade('m', 14)) gain = gain.times(5)
	if(hasMilestone('c', 8)) gain = gain.times(2)
	if(hasMilestone('c', 5)) gain = gain.times(2)
	if(hasUpgrade('a', 16)) gain = gain.times(2)
	if(hasUpgrade('a', 17)) gain = gain.times(2)
	if(hasMilestone('c', 9)) gain = gain.times(1.5)
	gain = gain.div(layers.d.effect())
	if(hasAchievement('c', 11) && inChallenge('c', 11)) gain = gain.times(100)
	if(hasUpgrade('d', 11)) gain = gain.div(0.1)
	if(inChallenge('c', 11)) gain = gain.pow(0.8)
	if(inChallenge('c', 12)) gain = gain.div(player.points.max(1).pow(0.3))
	if(hasChallenge('c', 12)) gain = gain.times(100)
	if(hasAchievement('c', 11) && inChallenge('c', 12)) gain = gain.times(20)
	if(hasMilestone('c', 12)) gain = gain.times(7.5)
	if(hasChallenge('c', 13)) gain = gain.times(100)
	if(hasChallenge('c', 11)) gain = gain.pow(1.05)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	startedGame: false,
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return (player.c.points.gte(15))
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
