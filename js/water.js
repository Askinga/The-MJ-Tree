addLayer("water", {
    name: "Water", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "💧", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	onPrestige(){
		player.ice.points = new Decimal(0)
	},
    color: "#4053ff",
    requires: new Decimal("e15"), // Can be a function that takes requirement increases into account
    resource: "water", // Name of prestige currency
    baseResource: "ice", // Name of resource prestige is based on
    baseAmount() {return player.ice.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('water', 11)) mult = mult.times(2)
		if (hasUpgrade('water', 14)) mult = mult.times(3)
		if (hasUpgrade('water', 15)) mult = mult.times(upgradeEffect('water', 15))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Reset for water (Uni. 1)", onPress(){if (canReset(this.layer) && !(inChallenge('universes', 11))) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('ice', 45) || player.water.unlocked) && !(inChallenge('universes', 11))},
	  branches: ["st"],
    effect(){
      let pow = new Decimal(0.4)
      let eff = player.water.points.add(1).pow(pow)
      return eff
    },
    effectDescription(){
      return "which is boosting Limit Points by x" + format(layers.water.effect())
    },
	upgrades: {
		11: {
			title: "we get water",
			description: "x2 Water",
			cost: new Decimal(2)
		},
		12: {
			title: "auto-freeze",
			description: "100% Ice per second",
			cost: new Decimal(4),
			unlocked(){ return hasUpgrade("water", 11) },
		},
		13: {
			title: "waterlogged",
			description: "x3 Log milestone 1 effect exponent",
			cost: new Decimal(7),
			unlocked(){ return hasUpgrade("water", 12) },
		},
		14: {
			title: "create a puddle",
			description: "x3 water",
			cost: new Decimal(20),
			unlocked(){ return hasUpgrade("water", 13) },
		},
		15: {
			title: "water cycle",
			description: "Water boosts itself",
			cost: new Decimal(50),
			unlocked(){ return hasUpgrade("water", 14) },
			effect(){ return player.water.points.add(1).pow(0.2) },
			effectDisplay(){ return "x"+format(upgradeEffect('water', 15)) },
		},
		21: {
			title: "water freezing action",
			description: "Water boosts Ice",
			cost: new Decimal(200),
			unlocked(){ return hasUpgrade("water", 15) },
			effect(){ return player.water.points.add(1).pow(0.75) },
			effectDisplay(){ return "x"+format(upgradeEffect('water', 21)) },
		},
	},
})
