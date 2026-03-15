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
	doReset(pr) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[pr].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        for(i=1;i<6;i++){ //rows
            for(v=1;v<2;v++){ //columns
              if ((hasMilestone('limit', 6)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
	    for(v=2;v<3;v++){ //columns
                if ((hasMilestone('limit', 7)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
	    }
	    for(v=3;v<4;v++){ //columns
                if ((hasMilestone('limit', 8)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
	    }
	}
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
		if (hasMilestone('limit', 10)) keep.push("upgrades")
    
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },
	onPrestige(){
		if (!hasUpgrade('pr', 15)) {
			player.pr.upg4 = new Decimal(0)
		}
	},
	onPrestige(){
		let add = new Decimal(0)
		if (hasUpgrade('limit', 13)) add = add.add(1)
		if (hasUpgrade('limit', 24)) add = add.add(2)
		if (hasChallenge('limit', 13)) add = add.add(4)
		return player.pr.points = player.pr.points.add(add)
	},
	autoPrestige(){ return (hasUpgrade('pr', 15) || hasMilestone('limit', 2)) },
	resetsNothing(){ return (hasUpgrade('pr', 15) || hasMilestone('limit', 2)) },
	autoUpgrade(){ return hasMilestone('limit', 3) },
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
		if (hasUpgrade('pr', 35)) softcap = softcap.add(upgradeEffect('pr', 35))
		if (hasUpgrade('st', 11)) softcap = softcap.add(upgradeEffect('st', 11))
		if (hasUpgrade('en', 13)) softcap = softcap.times(1.02)
		if (hasUpgrade('st', 12)) softcap = softcap.times(1.075)
		if (hasUpgrade('st', 13)) softcap = softcap.times(1.1)
		if (hasUpgrade('st', 14)) softcap = softcap.times(1.125)
		if (hasUpgrade('limit', 33)) softcap = softcap.times(1.25)
		if (inChallenge('limit', 12)) softcap = softcap.div(2.3)
		if (hasChallenge('limit', 12)) softcap = softcap.times(1.15)
		if (hasUpgrade('limit', 51)) softcap = softcap.pow(upgradeEffect('limit', 51))
		softcap = softcap.times(layers.en.effect())
		softcap = softcap.times(tmp.limit.alo1)
		if (inChallenge('limit', 13)) softcap = new Decimal(0)
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
				let eff = player.pr.upg4.add(1).pow(pow);
				if (hasUpgrade('limit', 32)) {
					eff = softcap(eff, new Decimal("100"), 0.1)
				} else {
        		    eff = softcap(eff, new Decimal("100"), 0)
				}
       		 	return eff  
			},
			effectDisplay(){ 
				let s = ""
        		let upgEffect = upgradeEffect(this.layer, this.id)
				if (upgEffect.gte(new Decimal("100")) && !hasUpgrade('limit', 32) ) {
          		  s = " (Hardcapped)"
				}
        		if (upgEffect.gte(new Decimal("100")) && hasUpgrade('limit', 32) ) {
          		  s = " (Softcapped)"
				}
        		return "x" + format(upgradeEffect("pr", 14)) + s;
			}
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
		35: {
			title: "Delayer 5",
  	        description: "Delay the Power Rune softcap based on Power Runes and x10 Layer reset time. Unlock a new layer.",
    	    cost: new Decimal(111),
			unlocked(){ return hasUpgrade('pr', 34) },
			effect(){ return player.pr.points.div(16) },
			effectDisplay(){ return "+"+format(upgradeEffect('pr', 35)) },
  	  	},
	},
	update(diff){
		let upg4 = new Decimal(0)
        if (hasUpgrade('pr', 14)) upg4 = upg4.add(1)
		if (hasUpgrade('pr', 33)) upg4 = upg4.times(100)
		if (hasUpgrade('pr', 34)) upg4 = upg4.times(10)
		if (hasUpgrade('pr', 35)) upg4 = upg4.times(10)
		upg4 = upg4.times(layers.st.effect())
		upg4 = upg4.times(tmp.limit.limitBoost)
		if (hasUpgrade('limit', 23)) upg4 = upg4.times(upgradeEffect('limit', 23))
		if (hasUpgrade('limit', 25)) upg4 = upg4.times(upgradeEffect('limit', 25))
		if (hasUpgrade('limit', 31)) upg4 = upg4.times(upgradeEffect('limit', 31))
		
		upg4 = upg4.times(diff)
		player.pr.upg4 = player.pr.upg4.add(upg4)
		if (hasUpgrade('en', 102)) {
			player.pr.points = player.points.log10().div("1e348").div(new Decimal(10).pow(player.pr.points.pow(tmp.pr.exponent))).add(1)
		}
	},
})
