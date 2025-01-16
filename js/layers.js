addLayer("pr", {
    name: "Power Rank", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
	        total: new Decimal(0),
	        best: new Decimal(0),
	    	resets: new Decimal(0),
    }},
    color: "#d17c36",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Power Rank", // Name of prestige currency
    baseResource: "Strength", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for Power Rank", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    effect(){
	let base = 1.1
	let eff = new Decimal(base).pow(player.pr.points)
       return eff
       },
        effectDescription() {
            let desc = "which is boosting Strength generation by x" + format(tmp[this.layer].effect);
            return desc;
        },
        tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
	"blank",
	["display-text",
			function() {return ''+(hasMilestone('pr', 1)?"<h1>Strength Upgrades</h1>":"")},
				{}],
	"blank",
	"upgrades",
	"blank",
	["display-text",
			function() {return "<h1>Milestones</h1>":""},
				{}],
	"blank",
	"milestones"
    ],
    milestones: {
    	0: {
        requirementDescription: "2 Power Rank",
        effectDescription: "Power Rank Milestone 1: 2x strength.",
        done() { return player.pr.points.gte(2) }
    	},
    	1: {
        requirementDescription: "4 Power Rank",
        effectDescription: "Power Rank Milestone 2: Unlock Strength Upgrades and 2x Strength.",
        done() { return player.pr.points.gte(4) },
	unlocked(){ return (hasMilestone('pr',0))}
    	},
    },
})
