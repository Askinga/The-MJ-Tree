addLayer("l", {
    name: "levels", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
	        total: new Decimal(0),
	        best: new Decimal(0),
	    	xp: new Decimal(0),
        xpg: new Decimal(0)
    }},
    color: "#8aff8a",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "Levels", // Name of prestige currency
    baseResource: "XP", // Name of resource prestige is based on
    baseAmount() {return player.l.xp}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasMilestone('pr',4)},
    effect(){
	let base = 1.2
	let eff = new Decimal(base).pow(player.l.points)
       return eff
       },
        effectDescription() {
            let desc = "which is boosting Strength generation by x" + format(tmp[this.layer].effect);
            return desc;
        },
        tabFormat: [
        "main-display",
	"blank",
	["bar", "bar1"],
	"blank",
	"prestige-button",
	"blank",
	["display-text", function() { return 'You have ' + format(player.l.xp) + ' XP (' + format(player.l.xpg) + '/s)'}],
    ],
    resetsNothing(){return true},
  branches: ["pr"],
	update(diff) {
        if (hasMilestone("pr", 4)) {
            let gain = new Decimal(1)
	    gain = gain.times(player.points.add(1).log(10).add(1))
	    
            
	    // statements above this line
            player.l.xpg = gain
            gain = gain.times(diff)
            player.l.xp = player.l.xp.add(gain)
        }
    },
    bars: {
        bar1: {
            direction: RIGHT,
            width: 300,
            height: 25,
            instant: false,
            fillStyle: { 'background-color': "#8aff8a" },
	    textStyle: { 'background-color': "#000000" },
	    progress() {
                let prog = player.l.xp.log(getNextAt('l'))
                return prog
	    },
            display() {
                    return 'Progress to next Level: ' + format(player.l.xp.log(getNextAt('l')).times(100)) + '%'
            },
        },
    },
})
