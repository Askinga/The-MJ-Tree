addLayer("ice", {
    name: "Ice!!", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🧊", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#7debff",
    requires: new Decimal("eee9"), // Can be a function that takes requirement increases into account
    resource: "ice", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('ice', 13)) mult = mult.times(upgradeEffect('ice', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for ice", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('sl', 35) || player.ice.unlocked) && !(inChallenge('universes', 11))},
	  branches: ["pr"],
    effect(){
      let pow = new Decimal(0.5)
      let eff = player.ice.points.add(1).pow(pow)
      return eff
    },
    effectDescription(){
      return "which is boosting Log milestone 1 effect exponent by x" + format(layers.ice.effect())
    },
	upgrades: {
		11: {
			title: "ice cream",
			description: "^1.1 Limit Points. Yeah, exponent time.",
			cost: new Decimal(3)
		},
		12: {
			title: "slippery ice",
			description: "^1.02 Limit Points per Ice upgrade.",
			cost: new Decimal(5),
			unlocked(){ return hasUpgrade('ice', 11) },
			effect(){ return new Decimal(1).add(new Decimal(player.ice.upgrades.length).div(50)) },
			effectDisplay(){ return "^"+format(upgradeEffect('ice', 12)) },
		},
		13: {
			title: "icicles",
			description: "x2 Ice per triple log10 of Points past 8.",
			cost: new Decimal(7),
			unlocked(){ return hasUpgrade('ice', 12) },
			effect(){
				if (player.points.log10().log10().log10().sub(8).floor().gte(1)) {
				    return new Decimal(2).pow(player.points.log10().log10().log10().sub(8).floor()) 
				}
			    else {
					return new Decimal(1)
				}
			},
			effectDisplay(){ return "x"+format(upgradeEffect('ice', 13)) },
		},
		14: {
			title: "hollow ice",
			description: "+0.01 Limit Power exponent per Ice upgrade.",
			cost: new Decimal(15),
			unlocked(){ return hasUpgrade('ice', 13) },
			effect(){ return new Decimal(0).add(new Decimal(player.ice.upgrades.length).div(100)) },
			effectDisplay(){ return "+"+format(upgradeEffect('ice', 14)) },
		},
	},
})
