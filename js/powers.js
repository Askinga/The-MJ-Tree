addLayer("pr", {
    name: "Power Runes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		upg4: new Decimal(0),
		soft: new Decimal(0),
    }},
	onPrestige(){
		if (!hasUpgrade('pr', 15)) {
			player.pr.upg4 = new Decimal(0)
		}
	},
	autoPrestige(){ return hasUpgrade('pr', 15) },
	resetsNothing(){ return hasUpgrade('pr', 15) },
    color: "#ffe042",
    requires: new Decimal("e348"), // Can be a function that takes requirement increases into account
    resource: "Power Runes", // Name of prestige currency
    baseResource: "OoMs of points", // Name of resource prestige is based on
    baseAmount() {return player.points.add(1).log(10)}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	base: 10,
    exponent() { 
		let softcap = new Decimal(50)
		if (hasUpgrade('pr', 24)) softcap = softcap.add(5)
		if (hasUpgrade('pr', 25)) softcap = softcap.add(5)
		if (hasUpgrade('pr', 31)) softcap = softcap.add(10)
		if (hasUpgrade('pr', 32)) softcap = softcap.add(8)
		if (hasUpgrade('pr', 33)) softcap = softcap.add(10)
		if (hasUpgrade('pr', 34)) softcap = softcap.add(upgradeEffect('pr', 34))
		player.pr.soft = softcap
		return new Decimal(1.5).add(player.pr.points.max(softcap).sub(softcap).div(100))
	}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('pr', 15)) mult = mult.div(upgradeEffect('pr', 15))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "O: Reset for power runes (Uni. 1)", onPress(){if (canReset(this.layer) && !(inChallenge('universes', 11))) doReset(this.layer)}},
    ],
	tabFormat: [
		"main-display",
		"prestige-button",
		"resource-display",
		["display-text", function(){ return "Softcap starts at " + format(player.pr.soft) + " Power Runes" }],
		"blank",
		"upgrades",
	],
    effect(){
		let base = new Decimal(4)
		if (hasUpgrade('pr', 22)) base = base.add(0.05)
		return new Decimal(base).pow(player.pr.points)
	},
    effectDescription(){ return "which is boosting Log milestone 1 time by x" + format(layers.pr.effect()) },
    layerShown(){return (hasUpgrade('uni', 35) || player.pr.unlocked) && !(inChallenge('universes', 11))},
	branches: ["su"],
	upgrades: {
	    11: {
			title: "Get more powerful",
  	        description: "+1 Log milestone 1 effect exponent",
    	    cost: new Decimal(2),
  	  	},
		12: {
			title: "Get even more powerful",
  	        description: "+0.5 Log milestone 1 effect exponent",
    	    cost: new Decimal(5),
			unlocked(){ return hasUpgrade('pr', 11) },
  	  	},
		13: {
			title: "Get even stronger",
  	        description: "Power Runes boost Log milestone 1 effect exponent.",
    	    cost: new Decimal(7),
			unlocked(){ return hasUpgrade('pr', 12) },
			effect(){ return player.pr.points.div(12).pow(0.9) },
			effectDisplay(){ return "+"+format(upgradeEffect('pr', 13)) }
  	  	},
		14: {
			title: "Timed Strength",
  	        description: "Time since last reset boosts Log milestone 1 effect exponent.",
    	    cost: new Decimal(10),
			unlocked(){ return hasUpgrade('pr', 13) },
			effect(){  
				let pow = new Decimal(0.05)
				if (hasUpgrade('pr', 21)) pow = pow.add(0.01)
				if (hasUpgrade('pr', 25)) pow = pow.add(0.01)
				return player.pr.upg4.add(1).pow(pow) 
			},
			effectDisplay(){ return "x"+format(upgradeEffect('pr', 14)) }
  	  	},
		15: {
			title: "Timed Strength 2",
  	        description: "Time since last reset divides Power Rune cost. Auto reset for Power Runes and they reset nothing.",
    	    cost: new Decimal(16),
			unlocked(){ return hasUpgrade('pr', 14) },
			effect(){ 
				let pow = new Decimal(0.5)
				if (hasUpgrade('pr', 21)) pow = pow.add(0.5)
				if (hasUpgrade('pr', 22)) pow = pow.add(0.5)
				if (hasUpgrade('pr', 23)) pow = pow.add(0.5)
				if (hasUpgrade('pr', 24)) pow = pow.add(1)
				if (hasUpgrade('pr', 25)) pow = pow.add(1.5)
				return player.pr.upg4.add(1).pow(pow) 
			},
			effectDisplay(){ return "x"+format(upgradeEffect('pr', 15)) }
  	  	},
		21: {
			title: "Booster 1",
  	        description: "Add +0.5 to the pervious upgrades exponent. Add +0.01 to 'Timed Strength' effect exponent.",
    	    cost: new Decimal(20),
			unlocked(){ return hasUpgrade('pr', 15) },
  	  	},
		22: {
			title: "Booster 2",
  	        description: "Add +0.5 to 'Timed Strength 2's effect exponent. Add +0.05 to this layer's effect base.",
    	    cost: new Decimal(30),
			unlocked(){ return hasUpgrade('pr', 21) },
  	  	},
		23: {
			title: "Booster 3",
  	        description: "Add +0.5 to 'Timed Strength 2's effect exponent. x1.2 Log milestone 1 effect exponent.",
    	    cost: new Decimal(40),
			unlocked(){ return hasUpgrade('pr', 22) },
  	  	},
		24: {
			title: "Booster 4",
  	        description: "Add +1 to 'Timed Strength 2's effect exponent. Delay the Power Rune softcap by +5.",
    	    cost: new Decimal(55),
			unlocked(){ return hasUpgrade('pr', 23) },
  	  	},
		25: {
			title: "Booster 5",
  	        description: "Add +1.5 to 'Timed Strength 2's effect exponent. Delay the Power Rune softcap by +5 and +0.01 'Timed Strength's effect exponent.",
    	    cost: new Decimal(60),
			unlocked(){ return hasUpgrade('pr', 24) },
  	  	},
		31: {
			title: "Delayer 1",
  	        description: "Delay the Power Rune softcap by +10. I don't like the cost.",
    	    cost: new Decimal(67),
			unlocked(){ return hasUpgrade('pr', 25) },
  	  	},
		32: {
			title: "Delayer 2",
  	        description: "Delay the Power Rune softcap by +8.",
    	    cost: new Decimal(77),
			unlocked(){ return hasUpgrade('pr', 31) },
  	  	},
		33: {
			title: "Delayer 3",
  	        description: "Delay the Power Rune softcap by +10 and x100 Layer reset time",
    	    cost: new Decimal(86),
			unlocked(){ return hasUpgrade('pr', 32) },
  	  	},
		34: {
			title: "Delayer 4",
  	        description: "Delay the Power Rune softcap based on layer reset time and x10 Layer reset time",
    	    cost: new Decimal(98),
			unlocked(){ return hasUpgrade('pr', 33) },
			effect(){ return player.pr.upg4.add(1).log(3) },
			effectDisplay(){ return "+"+format(upgradeEffect('pr', 34)) },
  	  	},
	},
	update(diff){
		let upg4 = new Decimal(0)
        if (hasUpgrade('pr', 14)) upg4 = upg4.add(1)
		if (hasUpgrade('pr', 33)) upg4 = upg4.times(100)
		if (hasUpgrade('pr', 34)) upg4 = upg4.times(10)
		
		upg4 = upg4.times(diff)
		player.pr.upg4 = player.pr.upg4.add(upg4)
	},
})
