addLayer("l", {
    name: "levels", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		level: new Decimal(0),
		req: new Decimal(0),
    }},
	passiveGeneration(){
		let p = new Decimal(0)
		if (hasUpgrade('l', 22)) p = p.add(1)
		return p
	},
    color: "#4BDC13",
    requires: new Decimal("e12"), // Can be a function that takes requirement increases into account
    resource: "XP", // Name of prestige currency
    baseResource: "boost runes", // Name of resource prestige is based on
    baseAmount() {return player.b.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.15, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('l', 11)) mult = mult.times(upgradeEffect('l', 11))
		if (hasUpgrade('l', 12)) mult = mult.times(upgradeEffect('l', 12))
		if (hasUpgrade('l', 13)) mult = mult.times(upgradeEffect('l', 13))
		if (hasUpgrade('l', 14)) mult = mult.times(upgradeEffect('l', 14))
		if (hasUpgrade('l', 15)) mult = mult.times(5)
		if (hasUpgrade('l', 21)) mult = mult.times(10)
		if (hasUpgrade('l', 22)) mult = mult.times(15)
		if (hasUpgrade('l', 23)) mult = mult.times(20)
		if (hasUpgrade('l', 24)) mult = mult.times(25)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "x", description: "X: Reset for XP", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	tabFormat: [
		"main-display",
		"prestige-button",
		"resource-display",
		"blank",
		["display-text", function(){ return "<h3>" + format(player.l.req) + " XP required for next level.<br>You have " + format(player.l.level) + " Levels</h3>" }],
		["bar", "bigBar"],
		["display-text", function(){ return "<h3>Levels boost Boost Runes by x" + format(tmp.l.levelsEff) + " and Points by x" + format(tmp.l.lvlE2) + "</h3>" }],
		"blank",
		"milestones",
		"upgrades",
    ],
	levelsEff(){
		return new Decimal(1.75).pow(player.l.level)
	},
	lvlE2(){
		return new Decimal(250).pow(player.l.level)
	},
    layerShown(){return (hasMilestone('m', 3) || player.l.unlocked)},
	branches: ["b"],
	update(diff){
		let req = new Decimal(2)

	    req = new Decimal(2).pow(player.l.level)

		player.l.req = req
		if (player.l.points.gte(player.l.req)) {
			player.l.points = player.l.points.sub(req)
			player.l.level = player.l.level.add(1)
			levelUp()
		}
	},
	bars: {
    bigBar: {
        direction: RIGHT,
        width: 250,
        height: 50,
        progress() { return player.l.points.div(player.l.req) },
		display(){ return "" + format(player.l.points.div(player.l.req).times(100)) + "%" },
		fillStyle: { 'background-color': "#25aa25" },
	    baseStyle: { 'background-color': "#ff5555" },
    },
	},
	milestones: {
    0: {
        requirementDescription: "2 levels",
        effectDescription: "Keep Row 1 Upgrades and x3 BR",
        done() { return player.l.level.gte(2) }
    },
	1: {
        requirementDescription: "4 levels",
        effectDescription: "Keep Row 2 Milestones and x2 SR",
        done() { return player.l.level.gte(4) }
    },
	},
	upgrades: {
	  11: {
		title: "Leveling Up",
		description: "Each Meta Rune boosts XP by x1.06",
		cost: new Decimal(6),
		effect(){ return new Decimal(1.06).pow(player.m.points) },
		effectDisplay(){ return "x"+format(upgradeEffect('l', 11)) },
		currencyDisplayName: "Levels",
		currencyInternalName: "level",
		currencyLayer: "l",
	  },
	  12: {
		title: "Leveling Up 2",
		description: "Each Level boosts XP by x1.15",
		cost: new Decimal(8),
		unlocked(){ return hasUpgrade('l', 11) },
		effect(){ return new Decimal(1.15).pow(player.l.level) },
		effectDisplay(){ return "x"+format(upgradeEffect('l', 12)) },
		currencyDisplayName: "Levels",
		currencyInternalName: "level",
		currencyLayer: "l",
	  },
	  13: {
		title: "Leveling Up 3",
		description: "Each OOM of Prestige boosts XP by x1.0035",
		cost: new Decimal(10),
		unlocked(){ return hasUpgrade('l', 12) },
		effect(){ return new Decimal(1.0035).pow(player.p.points.add(1).log(10).add(1)) },
		effectDisplay(){ return "x"+format(upgradeEffect('l', 13)) },
		currencyDisplayName: "Levels",
		currencyInternalName: "level",
		currencyLayer: "l",
	  },
	  14: {
		title: "Leveling Up 4",
		description: "Each OOM of Points boost XP by x1.003",
		cost: new Decimal(12),
		unlocked(){ return hasUpgrade('l', 13) },
		effect(){ return new Decimal(1.003).pow(player.points.add(1).log(10).add(1)) },
		effectDisplay(){ return "x"+format(upgradeEffect('l', 14)) },
		currencyDisplayName: "Levels",
		currencyInternalName: "level",
		currencyLayer: "l",
	  },
	  15: {
		title: "Leveling Up 5",
		description: "x5 XP",
		cost: new Decimal(14),
		unlocked(){ return hasUpgrade('l', 14) },
		currencyDisplayName: "Levels",
		currencyInternalName: "level",
		currencyLayer: "l",
	  },
	  21: {
		title: "Leveling Up 6",
		description: "x10 XP",
		cost: new Decimal(19),
		unlocked(){ return hasUpgrade('l', 15) },
		currencyDisplayName: "Levels",
		currencyInternalName: "level",
		currencyLayer: "l",
	  },
	  22: {
		title: "Leveling Up 7",
		description: "x15 XP and 100% of XP per second",
		cost: new Decimal(22),
		unlocked(){ return hasUpgrade('l', 21) },
		currencyDisplayName: "Levels",
		currencyInternalName: "level",
		currencyLayer: "l",
	  },
	  23: {
		title: "Leveling Up 8",
		description: "x20 XP",
		cost: new Decimal(34),
		unlocked(){ return hasUpgrade('l', 22) },
		currencyDisplayName: "Levels",
		currencyInternalName: "level",
		currencyLayer: "l",
	  },
	  24: {
		title: "Leveling Up 9",
		description: "x25 XP",
		cost: new Decimal(42),
		unlocked(){ return hasUpgrade('l', 23) },
		currencyDisplayName: "Levels",
		currencyInternalName: "level",
		currencyLayer: "l",
	  },
	},
})
