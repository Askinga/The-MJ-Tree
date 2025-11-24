addLayer("uni", {
    name: "Universal Runes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Uni", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	passiveGeneration(){
		let p = new Decimal(0)
		if (hasUpgrade('uni', 12)) p = p.add(1)
		return p
	},
    color: "#7a49d6",
    requires: new Decimal("ee60"), // Can be a function that takes requirement increases into account
    resource: "Universal Runes", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('uni', 11)) mult = mult.times(8)
		if (hasUpgrade('uni', 12)) mult = mult.times(4)
		if (hasUpgrade('uni', 13)) mult = mult.times(10)
		if (hasUpgrade('uni', 13)) mult = mult.times(upgradeEffect('uni', 13))
		if (hasUpgrade('uni', 14)) mult = mult.times(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "n", description: "N: Reset for universal runes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect(){
      return player.uni.points.add(1).pow(4)
    },
    effectDescription(){
      return "which is boosting 5th row currencies and wood effect exponent by x"+format(layers.uni.effect())
    },
    layerShown(){return ((player.points.gte("e1e60") && hasUpgrade('money', 45)) || player.uni.unlocked)},
	branches: ["money"],
  milestones: {
    0: {
        requirementDescription: "1 Universal Rune",
        effectDescription: "Keep Supreme Rune Milestones and xe2500 Logs",
        done() { return player.uni.points.gte(1) }
    },
	1: {
        requirementDescription: "2 Universal Runes",
        effectDescription: "/30 Stock cooldown (OP)",
        done() { return player.uni.points.gte(2) }
    },
	2: {
        requirementDescription: "3 Universal Runes",
        effectDescription: "Autobuy 5th row upgrades, keep Supreme Rune Challenges and keep their passive generation, 100% Time Boosters per second",
        done() { return player.uni.points.gte(3) }
    },
	3: {
        requirementDescription: "4 Universal Runes",
        effectDescription: "Autobuy Money Buyables (regardless of stock)",
        done() { return player.uni.points.gte(4) }
    },
  },
  upgrades: {
    11: {
		title: "Create a new universe (OP)",
        description: "x8 UnR (universal runes), x1e20 $ ",
        cost: new Decimal(5),
    },
	12: {
		title: "Celestial stuff (VERY OP)",
        description: "x4 UnR, boost $ based on UnR, 100% UnR per second",
        cost: new Decimal(100),
		unlocked(){ return hasUpgrade('uni', 11) },
		effect(){ return player.uni.points.add(10).log(10).log(10).pow(0.3).div(5).add(1) },
		effectDisplay(){ return "^"+format(upgradeEffect('uni', 12)) },
    },
	13: {
		title: "Infuse points into your universe",
        description: "x10 UnR, boost UnR based on Points",
        cost: new Decimal(3000),
		unlocked(){ return hasUpgrade('uni', 12) },
		effect(){ return player.points.add(10).log(10).log(10).pow(0.7).add(1) },
		effectDisplay(){ return "x"+format(upgradeEffect('uni', 13)) },
    },
	14: {
		title: "Universe creator",
        description: "x10 UnR, unlock subtab 'Universes'",
        cost: new Decimal(1000000),
		unlocked(){ return hasUpgrade('uni', 13) },
    },
  },
})
