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
		if (hasUpgrade('ice', 15)) mult = mult.times(3)
		if (hasUpgrade('ice', 22)) mult = mult.times(upgradeEffect('ice', 22))
		if (hasUpgrade('ice', 23)) mult = mult.times(upgradeEffect('ice', 23))
		if (hasUpgrade('ice', 25)) mult = mult.times(4)
		if (hasUpgrade('ice', 31)) mult = mult.times(7)
		if (hasUpgrade('ice', 32)) mult = mult.times(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
		if (hasUpgrade('ice', 24)) exp = exp.times(1.125)
		return exp
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for ice (Uni. 1)", onPress(){if (canReset(this.layer) && !(inChallenge('universes', 11))) doReset(this.layer)}},
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
				if (player.points.add(1).log10().log10().log10().sub(8).floor().gte(1)) {
				    return new Decimal(2).pow(player.points.add(1).log10().log10().log10().sub(8).floor()) 
				}
			    else {
					return new Decimal(1)
				}
			},
			effectDisplay(){ return "x"+format(upgradeEffect('ice', 13)) },
		},
		14: {
			title: "hollow ice",
			description: "+0.01 Limit Power exponent per Ice upgrade. (minimum: 10)",
			cost: new Decimal(15),
			unlocked(){ return hasUpgrade('ice', 13) },
			effect(){ return new Decimal(0).add(new Decimal(player.ice.upgrades.length).min(10).div(100)) },
			effectDisplay(){ return "+"+format(upgradeEffect('ice', 14)) },
		},
		15: {
			title: "ice cream sandwich",
			description: "^1.05 Limit Points and x3 Ice.",
			cost: new Decimal(20),
	    	unlocked(){ return hasUpgrade('ice', 14) },
		},
		21: {
			title: "thin ice",
			description: "Boost Limit Points based on Super Limit Points.",
			cost: new Decimal(100),
			unlocked(){ return hasUpgrade('ice', 15) },
			effect(){ return player.sl.points.add(1).pow(0.142857) },
			effectDisplay(){ return "x"+format(upgradeEffect('ice', 21)) },
		},
		22: {
			title: "thick ice",
			description: "Boost Ice based on Limit Points.",
			cost: new Decimal(120),
			unlocked(){ return hasUpgrade('ice', 21) },
			effect(){ return player.limit.points.add(1).pow(0.01) },
			effectDisplay(){ return "x"+format(upgradeEffect('ice', 22)) },
		},
        23: {
			title: "dangerous icicles",
			description: "x1.2 Ice per log10 Limit Points past 20.",
			cost: new Decimal(200),
			unlocked(){ return hasUpgrade('ice', 22) },
			effect(){
				if (player.limit.points.add(1).log10().sub(19).floor().gte(1)) {
				    return new Decimal(1.2).pow(player.limit.points.add(1).log10().sub(19).floor()) 
				}
			    else {
					return new Decimal(1)
				}
			},
			effectDisplay(){ return "x"+format(upgradeEffect('ice', 23)) },
		},
		24: {
			title: "flash freeze",
			description: "^1.125 Ice.",
			cost: new Decimal(700),
	    	unlocked(){ return hasUpgrade('ice', 23) },
		},
		25: {
			title: "hail",
			description: "x4 Ice.",
			cost: new Decimal(5000),
	    	unlocked(){ return hasUpgrade('ice', 24) },
		},
		31: {
			title: "hailstorm",
			description: "x7 Ice.",
			cost: new Decimal(100000),
	    	unlocked(){ return hasUpgrade('ice', 25) },
		},
		32: {
			title: "big hail",
			description: "x10 Ice.",
			cost: new Decimal(1000000),
	    	unlocked(){ return hasUpgrade('ice', 31) },
		},
	},
})
