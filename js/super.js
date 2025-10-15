addLayer("s", {
    name: "super runes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
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
		if (hasUpgrade('s', 11)) mult = mult.times(4)
		if (hasUpgrade('s', 12)) mult = mult.times(2)
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
	1: {
        requirementDescription: "4 Super Runes",
        effectDescription: "You can buy both RST-12 and RST-13 and Auto Rune Cooldown -0.5s.",
        done() { return player.s.points.gte(4) }
	},
	2: {
        requirementDescription: "5 Super Runes",
        effectDescription: "RST-15s effect is kept on Super Rune resets.",
        done() { return player.s.points.gte(5) }
	},
	3: {
        requirementDescription: "7 Super Runes",
        effectDescription: "-0.5s Auto Rune Cooldown and unlock 1st Super Rune Upgrade.",
        done() { return player.s.points.gte(7) }
	},
	},
	upgrades: {
		11: {
			title: "A super rune always comes in handy",
			description: "x4 Super Runes, x6 Points, x3 Prestige Points and x4 Rune Gain.",
			cost: new Decimal(8),
			unlocked(){ return hasMilestone('s', 3) },
		},
		12: {
			title: "The runes will help you",
			description: "x2 Super Runes, x5 Rune Gain",
			cost: new Decimal(10),
			unlocked(){ return hasUpgrade('s', 11) },
		},
	},
})
