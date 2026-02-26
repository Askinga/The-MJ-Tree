addLayer("limit", {
    name: "how?", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#e841a0",
    autoPrestige(){ return true },
    requires: new Decimal("ee200000"), // Can be a function that takes requirement increases into account
    resource: "limit points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (player.limit.unlocked) && !(inChallenge('universes', 11))},
   	branches: ["uni"],
    tooltip(){
      return "THE LIMIT"
    },
	tabFormat: {
		"LIMIT": {
			content: [
				"main-display",
				"blank",
				["display-text", "<h1>e1e200000</h1>"],
				"blank",
				"upgrades",
			],
		},
	},
	upgrades: {
		11: {
			title: "Congrats.",
			description: "You've reached the limit, gain x10 bonus to every non-static currency.",
			cost: new Decimal(1)
		},
	},
})
