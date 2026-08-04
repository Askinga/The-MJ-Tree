addLayer("u", {
    name: "ultra runes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "UR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	passiveGeneration(){
		let p = new Decimal(0)
		if (hasUpgrade('u', 21) || hasMilestone('e', 2)) p = p.add(1)
		return p
	},
	autoUpgrade(){ return hasMilestone('e', 3) },
    color: "#ff6f98",
    requires: new Decimal("e60"), // Can be a function that takes requirement increases into account
    resource: "Ultra Runes", // Name of prestige currency
    baseResource: "Super Runes", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.03, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('u', 12)) mult = mult.times(5)
		if (hasUpgrade('u', 13)) mult = mult.times(upgradeEffect('u', 13))
		if (hasUpgrade('u', 14)) mult = mult.times(upgradeEffect('u', 14))
		if (hasUpgrade('u', 15)) mult = mult.times(upgradeEffect('u', 15))
		if (hasUpgrade('u', 15)) mult = mult.times(5)
		if (hasUpgrade('u', 21)) mult = mult.times(10)
		if (hasUpgrade('u', 22)) mult = mult.times(20)
		if (hasUpgrade('u', 23)) mult = mult.times(50)
		if (hasUpgrade('u', 24)) mult = mult.times(100)
		if (hasUpgrade('u', 25)) mult = mult.times(1000)
		if (hasMilestone('e', 0)) mult = mult.times(2.5)
		if (hasMilestone('e', 1)) mult = mult.times(10)
		if (hasUpgrade('e', 21)) mult = mult.times(upgradeEffect('e', 21))
		mult = mult.times(layers.tm.effect())
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for ultra runes (Uni. 1)", onPress(){if (canReset(this.layer) && !(inChallenge('universes', 11))) doReset(this.layer)}},
    ],
    layerShown(){return ((hasUpgrade('l', 25) || player.u.unlocked) && !(inChallenge('universes', 11)))},
   	branches: ["s"],
    effect(){
      return player.u.points.add(1).pow(2.5)
    },
    effectDescription(){
      return "which is boosting XP by x" + format(layers.u.effect())
    },
	upgrades: {
	  11: {
		title: "The ultimate",
		description: "xe100 Points",
		cost: new Decimal(5),
		unlocked(){ return true },
	  },
	  12: {
		title: "Unlimited xp",
		description: "xe50 Points and x5 Ultra Runes",
		cost: new Decimal(15),
		unlocked(){ return hasUpgrade('u', 11) },
	  },
	  13: {
		title: "Ultrafy",
		description: "Each OoM of Points boosts Ultra Runes by x1.0015",
		cost: new Decimal(100),
		unlocked(){ return hasUpgrade('u', 12) },
		effect(){ return new Decimal(1.0015).pow(player.points.add(1).log(10).add(1)) },
		effectDisplay(){ return "x"+format(upgradeEffect('u', 13)) },
	  },
	  14: {
		title: "Ultrafy 2",
		description: "Each Level boosts Ultra Runes by x1.01",
		cost: new Decimal(300),
		unlocked(){ return hasUpgrade('u', 13) },
		effect(){ return new Decimal(1.01).pow(player.l.level) },
		effectDisplay(){ return "x"+format(upgradeEffect('u', 14)) },
	  },
	  15: {
		title: "Ultimate Ultrafy",
		description: "Each Level boosts Ultra Runes by x1.005. Also, x5 Ultra Runes and xe75 points",
		cost: new Decimal(1000),
		unlocked(){ return hasUpgrade('u', 14) },
		effect(){ return new Decimal(1.005).pow(player.l.level) },
		effectDisplay(){ return "x"+format(upgradeEffect('u', 15)) },
	  },
	  21: {
		title: "The ultimate^2",
		description: "xe200 Points, x10 Ultra Runes and 100% of Ultra Runes per second.",
		cost: new Decimal(15000),
		unlocked(){ return hasUpgrade('u', 15) },
	  },
	  22: {
		title: "We are going too far",
		description: "xe250 Points and x20 Ultra Runes",
		cost: new Decimal(10000000),
		unlocked(){ return hasUpgrade('u', 21) },
	  },
	  23: {
		title: "Point overflow",
		description: "xe500 Points and x50 Ultra Runes",
		cost: new Decimal("e9"),
		unlocked(){ return hasUpgrade('u', 22) },
	  },
	  24: {
		title: "Inflation",
		description: "xe750 Points and x100 Ultra Runes",
		cost: new Decimal("5e11"),
		unlocked(){ return hasUpgrade('u', 23) },
	  },
	  25: {
		title: "This is too insane.",
		description: "xe1000 Points and x1000 Ultra Runes. Unlock a new layer.",
		cost: new Decimal("3e15"),
		unlocked(){ return hasUpgrade('u', 24) },
	  },
	},
})
