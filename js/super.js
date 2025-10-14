addLayer("s", {
    name: "super runes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		autoRuneCooldown: new Decimal(0),
    }},
    color: "#dea8ff",
    requires: new Decimal(2500), // Can be a function that takes requirement increases into account
    resource: "Super Runes", // Name of prestige currency
    baseResource: "Common Runes", // Name of resource prestige is based on
    baseAmount() {return player.p.common}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (player.d.difficulty.eq(0)) mult = mult.times(2)
        if (player.d.difficulty.eq(2)) mult = mult.times(0.5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "s: Reset for super runes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	tabFormat: {
		"Upgrades": {
			content: [
				"main-display",
				"prestige-button",
				"blank",
				"upgrades",
			],
		},
		"Milestones": {
			content: [
				"main-display",
				"prestige-button",
				"blank",
				"milestones",
			],
		},
	},
    layerShown(){return (hasUpgrade('p', 321) || player.s.unlocked)},
    branches: ["p"],
    effect(){ return player.s.points.add(1).pow(2) },
    effectDescription(){ return "which is boosting Points and Rune gain by x" + format(layers.s.effect()) },
	milestones: {
    0: {
        requirementDescription: "2 Super Runes",
        effectDescription: "Unlock Auto-Runes in Prestige Layer! Base cooldown: 2.5s",
        done() { return player.s.points.gte(2) }
	},
	},
	update(diff) {
		let cool = new Decimal(2.5)

		player.s.autoRuneCooldown = cool
	},
})
