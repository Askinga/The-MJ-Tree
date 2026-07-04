addLayer("ice", {
    name: "Ice!!", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🧊", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		squareIce: new Decimal(0),
    }},
	passiveGeneration(){
		let p = new Decimal(0)
		if (hasUpgrade('water', 12)) p = p.add(1)
		return p
	},
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
		if (hasUpgrade('ice', 33)) mult = mult.times(4)
		if (hasUpgrade('ice', 34)) mult = mult.times(15)
		mult = mult.times(tmp.ice.squareBoost)
		if (hasUpgrade('water', 21)) mult = mult.times(upgradeEffect('water', 21))
		if (hasUpgrade('water', 61)) mult = mult.times(upgradeEffect('water', 61))
		if (hasUpgrade('water', 81)) mult = mult.times(tmp.water.ocean3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
		if (hasUpgrade('ice', 24)) exp = exp.times(1.125)
		exp = exp.times(tmp.water.ocean2)
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
	squareBoost(){
		let pow = new Decimal(0.3)
		if (hasUpgrade('water', 54)) pow = pow.add(0.2)
		return player.ice.squareIce.add(1).pow(pow)
	},
	tabFormat: {
		"Main": {
		  content: [
			"main-display",
			"prestige-button",
			"resource-display",
			"blank",
			"upgrades",
		  ],
		},
		"Ice Field": {
		  unlocked(){ return hasUpgrade('ice', 35) },
		  content: [
			"main-display",
			["display-text", function(){ return "You have " + format(player.ice.squareIce) + " cm² of Ice, boosting Ice by x" + format(tmp.ice.squareBoost) }],
			"blank",
			"clickables",
			"blank",
			"buyables",
		  ],
		},
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
		33: {
			title: "faster hail",
			description: "x4 Ice.",
			cost: new Decimal("e8"),
	    	unlocked(){ return hasUpgrade('ice', 32) },
		},
		34: {
			title: "dangerous hail",
			description: "x15 Ice.",
			cost: new Decimal("5e8"),
	    	unlocked(){ return hasUpgrade('ice', 33) },
		},
		35: {
			title: "ice age",
			description: "Unlock a new tab (Time to click again!)",
			cost: new Decimal("e10"),
	    	unlocked(){ return hasUpgrade('ice', 34) },
		},
		41: {
			title: "ice covers",
			description: "Unlock a buyable",
			cost: new Decimal("2.5e11"),
	    	unlocked(){ return hasUpgrade('ice', 35) },
		},
		42: {
			title: "ice synergy",
			description: "Ice boosts cm² Ice.",
			cost: new Decimal("5e12"),
	    	unlocked(){ return hasUpgrade('ice', 41) },
			effect(){ return player.ice.points.add(1).pow(0.06) },
			effectDisplay(){ return "x"+format(upgradeEffect('ice', 42)) },
		},
		43: {
			title: "ice layers",
			description: "Unlock a buyable",
			cost: new Decimal("5e13"),
	    	unlocked(){ return hasUpgrade('ice', 42) },
		},
		44: {
			title: "increasing ice limits",
			description: "Ice boosts Limit Points.",
			cost: new Decimal("4e14"),
	    	unlocked(){ return hasUpgrade('ice', 43) },
			effect(){ return player.ice.points.add(1).pow(0.1) },
			effectDisplay(){ return "x"+format(upgradeEffect('ice', 44)) },
		},
		45: {
			title: "melt the ice",
			description: "Unlock the final layer before TRUE META",
			cost: new Decimal("1e15"),
	    	unlocked(){ return hasUpgrade('ice', 44) },
		},
	},
	clickables: {
	    11: {
            display() {
                return `Click for ${formatWhole(this.prestigeGain())} cm² of Ice.`
            },
            unlocked() {
                return hasUpgrade("ice", 35)
            },
            canClick() {
                return true
            },
            prestigeGain() {
                let mul = new Decimal(1)
				mul = mul.times(buyableEffect('ice', 11))
				if (hasUpgrade('ice', 42)) mul = mul.times(upgradeEffect('ice', 42))
				mul = mul.times(buyableEffect('water', 12))
		        return mul
            },
            onClick() {
                player.ice.squareIce = player.ice.squareIce.add(this.prestigeGain())
            },
            onHold() {
            },
        },
    }, 
	buyables: {
	11: {
		unlocked(){ return hasUpgrade('ice', 41) },
		title: "freeze nearby land",
        cost(x) { return new Decimal(1.2).pow(x) },
        display() { return "x1.125 cm² Ice per purchase<br>Cost: " + format(this.cost()) + " cm² Ice<br>Bought: " + format(getBuyableAmount('ice', 11)) + "<br>Effect: x" + format(buyableEffect('ice', 11)) + " cm² Ice" },
        canAfford() { return player.ice.squareIce.gte(this.cost()) },
        buy() {
            player.ice.squareIce = player.ice.squareIce.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1.125)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
	},
	12: {
		unlocked(){ return hasUpgrade('ice', 43) },
		title: "increase the limit of ice",
        cost(x) { return new Decimal(1.5).pow(x).times(1000000) },
        display() { return "x1.2 Limit Points per purchase<br>Cost: " + format(this.cost()) + " cm² Ice<br>Bought: " + format(getBuyableAmount('ice', 12)) + "<br>Effect: x" + format(buyableEffect('ice', 12)) + " Limit Points" },
        canAfford() { return player.ice.squareIce.gte(this.cost()) },
        buy() {
            player.ice.squareIce = player.ice.squareIce.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1.2)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
    },
	},
})
