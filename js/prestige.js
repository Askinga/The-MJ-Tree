addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		common: new Decimal(0),
		uncommon: new Decimal(0),
		rare: new Decimal(0),
		epic: new Decimal(0),
		legendary: new Decimal(0),
		mythic: new Decimal(0),
		godly: new Decimal(0),
		secret: new Decimal(0),
		randomValue: new Decimal(0),
		runeCooldown: new Decimal(5),
    }},
    color: "#00aadd",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (player.d.difficulty.eq(0)) mult = mult.times(2)
        if (player.d.difficulty.eq(2)) mult = mult.times(0.5)
		if (hasUpgrade('p', 12)) mult = mult.times(2)
        return mult
    },
	tabFormat: {
	  "Main tab": {
		content: [
			"main-display",
			"prestige-button",
			"resource-display"
			"blank",
			"upgrades",
		],
	  },
	  "Runes": {
		content: [
			"main-display",
			"prestige-button",
			"resource-display"
			"blank",
			"clickables",
		],
	  },
	},
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.d.started.eq(1)},
	tooltip() {
		return "Runes & Prestige"
	},
	upgrades: {
    11: {
		title: "Generic first upgrade",
        description: "Boosts points by x2. As always.",
        cost: new Decimal(1),
    },
    12: {
		title: "It's prestige now",
        description: "Boosts prestige points by x2.",
        cost: new Decimal(3),
		unlocked(){ return hasUpgrade(this.layer, 11) },
    },
	13: {
		title: "New feature",
        description: "Unlock Runes.",
        cost: new Decimal(6),
		unlocked(){ return hasUpgrade(this.layer, 12) },
    },
	},
})
