addLayer("p", {
    name: "Upgrade Tree", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "upgrade points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for upgrade points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
   tabFormat: {
        "Upgrade Tree 1": {
            content: [
                ["display-text", "Welcome to the Upgrade Tree! In this layer, there is going to be a upgrade tree to boost the production of layers!"],
                "main-display",
                "prestige-button",
                "blank",
				["upgrade-tree", [[11], [21, 22]]]
            ]
        },
    },
    tooltip() {
	return "The Upgrade Tree"
    },
    upgrades: {
        11: {
            title: "Double",
            description: "×2 points.",
            cost: new Decimal(1),
        },
        21: {
            title: "Booster",
            description: "Boost point gain based on upgrade points.",
            cost: new Decimal(2),
	    branches: [11],
	    unlocked() { return (hasUpgrade('p', 11)) },
	    effect(){
                return player.p.points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
        22: {
            title: "Point booster",
            description: "Boost point gain based on points.",
            cost: new Decimal(10),
	    branches: [11],
	    unlocked() { return (hasUpgrade('p', 21)) },
	    effect(){
                return player.points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	},
    },
})
