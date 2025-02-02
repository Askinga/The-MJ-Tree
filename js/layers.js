addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P0", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    doReset(p) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[p].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
	if (hasUpgrade('sp', 12) && !inChallenge('sp', 11)) keep.push("upgrades");
    
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
                gens: new Decimal(0),
    }},
    color: "#FF0000",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    passiveGeneration() {
	 if (player.au.autoPrePoi && hasMilestone('au', 1) && !(player.p.gens.gte(500))) return 0.1
	 return player.p.gens.div(5000)
    },
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 11)) mult = mult.times(1.1)
	if (hasUpgrade('p', 12)) mult = mult.times(1.2)
	if (hasUpgrade('p', 13)) mult = mult.times(1.3)
	if (hasUpgrade('p', 14)) mult = mult.times(1.4)
	if (hasUpgrade('p', 15)) mult = mult.times(1.5)
        if (hasUpgrade('p', 23)) mult = mult.times(2.5)
	if (hasUpgrade('p', 31)) mult = mult.times(2)
	if (hasUpgrade('p', 33)) mult = mult.times(upgradeEffect('p', 33))
	if (hasMilestone('p', 1)) mult = mult.times(2.5)
	if (hasUpgrade('p', 34) && !hasUpgrade('up', 13)) mult = mult.times(3)
	if (hasUpgrade('p', 34) && hasUpgrade('up', 13)) mult = mult.times(10)
	if (hasUpgrade('p', 35)) mult = mult.times(5)
	if (hasUpgrade('p', 41)) mult = mult.times(upgradeEffect('p', 41))
	if (hasMilestone('p', 2)) mult = mult.times(3)
	if (hasUpgrade('p', 44)) mult = mult.pow(1.1)
	if (hasUpgrade('up', 11)) mult = mult.times(3)
	if (hasMilestone('p', 3)) mult = mult.times(2.5)
	if (hasUpgrade('up', 15)) mult = mult.times(3)
	if (hasUpgrade('sp', 11)) mult = mult.times(10)
	if (hasUpgrade('sp', 32)) mult = mult.times(upgradeEffect('sp', 32))
	mult = mult.times(tmp.up.powerEff)
	if (hasUpgrade('I', 12)) mult = mult.times(2)
        if (hasUpgrade('I', 22)) mult = mult.times(upgradeEffect('I', 22))
	return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
	if(hasUpgrade('I', 31)) exp = exp.times(1.01)
	return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    powerEff() {
    return player.p.gens.div(50);
    },
    autoUpgrade(){return player.au.autoPreUp && hasMilestone('au', 0)},
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "resource-display",
                "prestige-button",
                "blank",
                "upgrades",
                "blank",
	    ],
        },
        "Milestones": {
            content: [
                "main-display",
                "resource-display",
                "prestige-button",
                "blank",
                "milestones"
            ],
        },
	"Generators": {
          unlocked() { return (hasUpgrade('up', 15)) },
	    content: [
                ["display-text",
				function() {return 'You have ' + format(player.p.gens) + ' Prestige Generators, which are generating prestige points at the percentage '+'%'+format(tmp.p.powerEff)+(hasUpgrade('p', 46)?" (Your super points are also boosting Upgrade Points by "+format(tmp.p.powerEff)+")":"")},
					{}],
                "resource-display",
                "prestige-button",
                "blank",
                "clickables"
            ],
        },
    },
    upgrades: {
	11: {
            title: "The first upgrade",
	    description: function() {return `<br>×2 <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br> and ×1.1 <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span>`},
	    cost: new Decimal(1),
	},
        12: {
            title: "The second upgrade",
	    description: function() {return `<br>×1.5 <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br> and ×1.2 <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span>`},
	    cost: new Decimal(3),
	    unlocked() { return (hasUpgrade('p', 11)) }
	},
        13: {
            title: "The third upgrade",
	    description: function() {return `<br>×2 <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br> and ×1.3 <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span>`},
	    cost: new Decimal(5),
	    unlocked() { return (hasUpgrade('p', 12)) }
	},
        14: {
            title: "The forth upgrade",
	    description: function() {return `<br>×2.5 <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br> and ×1.4 <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span>`},
	    cost: new Decimal(12),
	    unlocked() { return (hasUpgrade('p', 13)) }
	},
  	15: {
            title: "The fifth upgrade",
	    description: function() {return `<br>×3 <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br> and ×1.5 <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span>`},
	    cost: new Decimal(30),
	    unlocked() { return (hasUpgrade('p', 14)) }
	},
        21: {
            title: "The Sixth Upgrade",
            description: function() {return `<br> Boost your <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\"><h3>points</h3></span><br> based on <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br>`},
            cost: new Decimal(100),
            effect(){
                let expu3 = 0.125
                let eff = player.points.add(1).pow(expu3)
                eff = softcap(eff, new Decimal("1e6"), 0.4)
                return eff
	    },
            effectDisplay() { // Add formatting to the effect
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("1e6")) ) {
                    softcapDescription = " (Softcapped)"
		}
	        return "This upgrade boosts Points by " + format(upgEffect)+"x" + softcapDescription
	    },
            tooltip: "(points+1)<sup>0.125</sup>",
	    unlocked() {return (hasUpgrade('p', 15))}
        },
        22: {
            title: "The Seventh Upgrade",
            description: function() {return `<br>Boost your <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\"><h3>points</h3></span><br> based on <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br> (weaker 1)`},
            cost: new Decimal(250),
            effect(){
                let expu3 = 0.110
                let eff = player.points.add(1).pow(expu3)
                eff = softcap(eff, new Decimal("5e6"), 0.4)
                return eff
	    },
            effectDisplay() { // Add formatting to the effect
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("5e6")) ) {
                    softcapDescription = " (Softcapped)"
		}
	        return "This upgrade boosts Points by " + format(upgEffect)+"x" + softcapDescription
	    },
            tooltip: "(points+1)<sup>0.110</sup>",
	    unlocked() {return (hasUpgrade('p', 21))}
        },
        23: {
            title: "The Eighth Upgrade",
            description: function() {return `<br>Boost your <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\"><h3>points</h3></span><br> based on <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br> (weaker 2)`},
            cost: new Decimal(400),
            effect() {
                return player.points.add(1).pow(0.095)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(points+1)<sup>0.095</sup>",
	    unlocked() {return (hasUpgrade('p', 22))}
        },
        24: {
            title: "The Ninth Upgrade",
            description: function() {return `<br> Boost your <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\"><h3>points</h3></span><br> based on <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br> (weaker 3)`},
            cost: new Decimal(750),
            effect() {
                return player.points.add(1).pow(0.08)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(points+1)<sup>0.08</sup>",
	    unlocked() {return (hasUpgrade('p', 23))}
        },
        25: {
            title: "The Tenth Upgrade",
            description: function() {return `<br> Boost your <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\"><h3>points</h3></span><br> based on <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br> (weaker 4)`},
            cost: new Decimal(1500),
            effect(){
    	    let rpow = 0.065
	     if(hasUpgrade('up', 12)) rpow = 0.085
		if(hasUpgrade('up', 14)) rpow = 0.1
		let eff = player.points.add(1).pow(rpow)
     		return eff
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(points+1)<sup>0.065</sup>",
	    unlocked() {return (hasUpgrade('p', 24))}
        },
        31: {
            title: "Upgrade 11",
	    description: function() {return `<br>×2 <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span><br>`},
	    cost: new Decimal(2500),
	    unlocked() { return (hasUpgrade('p', 25)) }
	},
        32: {
            title: "Upgrade 12",
	    description: function() {return `<br>Boost your <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\"><h3>points</h3></span><br> based on <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span>`},
	    cost: new Decimal(6500),
	    effect(){
                let expu3 = 0.2
                let eff = player.p.points.add(1).pow(expu3)
                eff = softcap(eff, new Decimal("1e25"), 0.5)
                return eff
	    },
            effectDisplay() { // Add formatting to the effect
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("1e25")) ) {
                    softcapDescription = " (Softcapped)"
		}
	        return "This upgrade boosts Points by " + format(upgEffect)+"x" + softcapDescription
	    },
            tooltip: "(prestigepoints+1)<sup>0.2</sup>",
	    unlocked() { return (hasUpgrade('p', 31)) }
	},
        33: {
            title: "Upgrade 13",
	    description: function() {return `<br>Boost your <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\"><h3>prestige points</h3></span><br> based on <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span>`},
	    cost: new Decimal(25000),
	    effect(){
                let expu3 = 0.05
                let eff = player.p.points.add(1).pow(expu3)
                eff = softcap(eff, new Decimal("1e10"), 0.5)
                return eff
	    },
            effectDisplay() { // Add formatting to the effect
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("1e25")) ) {
                    softcapDescription = " (Softcapped)"
		}
	        return "This upgrade boosts Prestige Points by " + format(upgEffect)+"x" + softcapDescription
	    },
            tooltip: "(prestigepoints+1)<sup>0.05</sup>",
	    unlocked() { return (hasUpgrade('p', 32)) }
	},
        34: {
            title: "Upgrade 14",
	    description: function() {return `<br>Boost your <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points.</span><br>`},
	    cost: new Decimal(200000),
	    effect(){
    	     let rpow = "×3 prestige points"
	      if(hasUpgrade('up', 13)) rpow = "×10 prestige points"
		 let eff = rpow
     		return eff
            },
            effectDisplay() {
                let softcapDescription = "×3 prestige points"
                if (hasUpgrade('up', 13) ) {
                    softcapDescription = "×10 prestige points"
                }
                return softcapDescription
            },
	    unlocked() { return (hasUpgrade('p', 33)) }
	},
        35: {
            title: "Upgrade 15",
	    description: function() {return `<br>×5 <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span><br>`},
	    cost: new Decimal(1000000),
	    unlocked() { return (hasUpgrade('p', 34)) }
	},
        41: {
            title: "Upgrade 16",
	    description: function() {return `<br>Boost <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\"><h3>prestige points</h3></span><br> based on <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br>`},
	    cost: new Decimal(1e7),
	    effect() {
                return player.points.add(1).pow(0.025)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(points+1)<sup>0.025</sup>",
	    unlocked() { return (hasUpgrade('p', 35)) }
	},
        42: {
            title: "Upgrade 17",
	    description: function() {return `<br>^1.05 <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br>`},
	    cost: new Decimal(2.5e7),
	    unlocked() { return (hasUpgrade('p', 41)) }
	},
        43: {
            title: "Upgrade 18",
	    description: function() {return `<br>Raise <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\"><h3>points</h3></span><br> based on <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span><br>`},
	    cost: new Decimal(1e8),
	    effect(){
                let expu3 = 0.004
                let eff = player.p.points.add(1).pow(expu3)
                eff = softcap(eff, new Decimal("1.2"), 0.3)
                eff = softcap(eff, new Decimal("1.5"), 0.25)
		return eff
	    },
            effectDisplay() { // Add formatting to the effect
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("1.2")) ) {
                    softcapDescription = " (Softcapped)"
		}
                if (upgEffect.gte(new Decimal("1.5")) ) {
                    softcapDescription = " (Supercapped)"
		}
		return "This upgrade boosts Points by " + format(upgEffect)+"^" + softcapDescription
            },
	    tooltip: "(prestigepoints+1)<sup>0.004</sup>",
	    unlocked() { return (hasUpgrade('p', 42)) },
        },
        44: {
            title: "Upgrade 19",
	    description: function() {return `<br>^1.1 <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span><br>`},
	    cost: new Decimal(1e9),
	    unlocked() { return (hasUpgrade('p', 43)) }
	},
   	45: {
            title: "Feature 1 (Upgrade 20)",
	    description: "Unlock a new layer",
	    cost: new Decimal(5e9),
	    unlocked() { return (hasUpgrade('p', 44)) }
	},
    },
    milestones: {
        1: {
            requirementDescription: "First milestone! (PM1: 50,000 PP)",
            effectDescription: "×2.5 prestige points",
            done() { return player["p"].points.gte("50000") && hasUpgrade('p', 33) },
            unlocked() {return hasUpgrade('p', 33)},
        },
        2: {
            requirementDescription: "Second milestone! (PM2: 5,000,000 PP)",
            effectDescription: "×3 prestige points",
            done() { return player["p"].points.gte("5000000") && hasUpgrade('p', 35) },
            unlocked() {return hasUpgrade('p', 35)},
        },
        3: {
            requirementDescription: "Unlock that new layer! (PM3: 500,000,000 PP)",
            effectDescription: "×2.5 prestige points",
            done() { return player["p"].points.gte("500000000") && hasUpgrade('p', 43) },
            unlocked() {return hasUpgrade('p', 43)},
        },
    },
    clickables: {
    	11: {
		title: "Generate!",
        	display() { return "Click to generate Prestige Generators which automate your prestige point gain!" },
		canClick() {return true},
		unlocked() {return (hasUpgrade('up', 15))},
		style: {
			transform: "translate(0px, -15px)"
		},
		onClick() { 
			let gain2 = 1;
			if(hasUpgrade('up', 21)) gain2 = 2.5;
			if(hasUpgrade('up', 22)) gain2 = 10;
			if(hasUpgrade('up', 34)) gain2 = 500
			player.p.gens = player.p.gens.plus(gain2) 
		},
	   	onHold() {
			gain2 = 1;
			if(hasUpgrade('up', 21)) gain2 = 2.5;
			if(hasUpgrade('up', 22)) gain2 = 10;
			if(hasUpgrade('up', 34)) gain2 = 500
			player.p.gens = player.p.gens.plus(gain2) 
		}
	} 
    },
})

addLayer( "up", {
    name: "Upgraded Prestige Points",
    symbol: "P1",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
  		boosters: new Decimal(0),
    }},
    nodeStyle: {
	"border-radius": "100%",
	"width": "100px",
	"height": "100px"
    },
    color: "#ff3c00",
    requires() {
        let req = new Decimal(1e10)
        return req
    }, // Can be a function that takes requirement increases into account
    resource: "upgraded prestige points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('up', 33)) mult = mult.times(upgradeEffect('up', 33))
	if (hasUpgrade('sp', 11)) mult = mult.times(10)
	if (hasUpgrade('sp', 33)) mult = mult.times(upgradeEffect('sp', 33))
	if (hasUpgrade('I', 13)) mult = mult.times(2)
	if (hasUpgrade('I', 23)) mult = mult.times(upgradeEffect('I', 23))
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    powerEff() {
    return player.up.boosters.add(1).pow(0.5);
    },
    hotkeys: [
        {key: "u", description: "U: Reset for upgraded prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetDescription: 'Reset prestige and points for ',
    layerShown(){
        let visible = false
        if (hasUpgrade('p', 45) || player.up.unlocked) visible = true
       return visible
    },
    branches:["p"],
    autoUpgrade(){return player.au.autoUpPreUp && hasMilestone('au', 2)},
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "resource-display",
                "prestige-button",
                "blank",
                "upgrades"
            ],
        },
        "Challenges": {
            content: [
                "main-display",
                "resource-display",
                "prestige-button",
                "blank",
                "challenges"
            ],
        },
	"Boosters": {
          unlocked() { return (hasUpgrade('up', 31)) },
	    content: [
                ["display-text",
				function() {return 'You have ' + format(player.up.boosters) + ' Prestige Boosters, which are boosting prestige points by '+'x'+format(tmp.up.powerEff)+(hasUpgrade('p', 46)?" (Your super points are also boosting Upgrade Points by "+format(tmp.p.powerEff)+")":"")},
					{}],
                "resource-display",
                "prestige-button",
                "blank",
                "clickables"
            ],
        },
    },
    
    upgrades: {
	11: {
            title: "Upgrade 21",
	    description: function() {return `<br>×5 <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br> and ×3 <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span>`},
	    cost: new Decimal(1),
	},
        12: {
            title: "Upgrade 22",
	    description: "Buff the effect of The Tenth Upgrade",
	    cost: new Decimal(5),
	    unlocked() {return hasChallenge('up', 11)},
	},
        13: {
            title: "Upgrade 23",
	    description: function() {return `<br>Upgrade 14 gives ×10 <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span><br> instead of ×3`},
	    cost: new Decimal(25),
	    unlocked() {return hasUpgrade('up', 12)},
	},
        14: {
            title: "Upgrade 24",
	    description: "Buff the tenth upgrade again",
	    cost: new Decimal(65),
	    unlocked() {return hasUpgrade('up', 13)},
	},
        15: {
            title: "Feature 2 (Upgrade 25)",
	    description: function() {return `<br>Unlock Prestige Generators and ×3 <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span>`},
	    cost: new Decimal(200),
	    unlocked() {return hasUpgrade('up', 14)},
	},
        21: {
            title: "Upgrade 26",
	    description: "Gain 2.5 prestige generators instead of 1 when you press the generate button",
	    cost: new Decimal(2000),
	    unlocked() {return hasUpgrade('up', 15)},
	},
        22: {
            title: "Upgrade 27",
	    description: "Gain 10 prestige generators instead of 2.5 when you press the generate button",
	    cost: new Decimal(5000),
	    unlocked() {return hasUpgrade('up', 21)},
	},
        23: {
            title: "Upgrade 28",
	    description: function() {return `<br>×2 <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span>`},
	    cost: new Decimal(10000),
	    unlocked() {return hasUpgrade('up', 22)},
	},
        24: {
            title: "Upgrade 29",
	    description: function() {return `<br>×100 <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span>`},
	    cost: new Decimal(20000),
	    unlocked() {return hasUpgrade('up', 23)},
	},
        25: {
            title: "Upgrade 30",
	    description: function() {return `<br>Boost <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\"><h3>points</h3></span><br> based on <span style=\"color: rgb(255, 60, 0); text-shadow: rgb(255, 60, 0) 0px 0px 10px;\">upgraded prestige points</span>`},
	    cost: new Decimal(250000),
	    effect() {
                return player.up.points.add(1).pow(0.35)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(UPP+1)<sup>0.35</sup>",
	    unlocked() { return (hasUpgrade('up', 24)) }
	},
  	31: {
            title: "Feature 3 (Upgrade 31)",
	    description: "Unlock Prestige Boosters",
	    cost: new Decimal(10000000),
	    unlocked() {return hasUpgrade('up', 25)},
	},
        32: {
            title: "Upgrade 32",
	    description: "×10 prestige booster gain",
	    cost: new Decimal(1e8),
	    unlocked() {return hasUpgrade('up', 31)},
	},
        33: {
            title: "Upgrade 33",
	    description: function() {return `<br>Boost <span style=\"color: rgb(255, 60, 0); text-shadow: rgb(255, 60, 0) 0px 0px 10px;\"><h3>upgraded prestige points</h3></span><br> based on <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span>`},
	    cost: new Decimal(5e8),
	    unlocked() {return hasUpgrade('up', 32)},
	    effect() {
                return player.points.add(1).pow(0.005)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
	    tooltip: "(points+1)<sup>0.005</sup>",
	},
   	34: {
            title: "Upgrade 34",
	    description: "×50 prestige generator gain",
	    cost: new Decimal(2.5e9),
	    unlocked() {return hasUpgrade('up', 33)},
	},
        35: {
            title: "Feature 4 (Upgrade 35)",
	    description: "Unlock a new layer",
	    cost: new Decimal(1e10),
	    unlocked() {return hasUpgrade('up', 34)},
	},
    },
    challenges: {
        11: {
            name: "Challenge P1",
            challengeDescription: "^0.5 points.",
            canComplete: function() {return hasUpgrade('p', 25)},
            goalDescription: "Buy Prestige Upgrade 10.",
            rewardDescription: "×10 points and unlock upgrade 22"
	},
    },
    clickables: {
    	11: {
		title: "Boost the gain!",
        	display() { return "Click to generate Prestige Boosters which boost your prestige point gain!" },
		canClick() {return true},
		style: {
			transform: "translate(0px, -15px)"
		},
		onClick() { 
			let gain2 = 1;
			if(hasUpgrade('up', 32)) gain2 = 10
			player.up.boosters = player.up.boosters.plus(gain2) 
		},
	} 
    },
})

addLayer("A", {
    startData() { return {
        unlocked: true,
    }},
    color: "yellow",
    position: 1,
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    tabFormat: {
        "Achievements": {
            content: [
		"clickables",
                "achievements",
                "blank",
                ],
        },
    },
    achievements: {
        rows: 25,
        cols: 6,
        11: {
            name: "Start off",
            done() { return (player.points.gte(1)) },
            tooltip: "Get your first point.",	   
        },
        12: {
            name: "Doubled",
            done() { return (hasUpgrade('p', 11)) },
            tooltip: "Buy your first prestige upgrade.",	   
        },
        13: {
            name: "Boosted",
            done() { return (hasUpgrade('p', 21)) },
            tooltip: "Buy your sixth prestige upgrade.",	   
        },
        14: {
            name: "Doubled again",
            done() { return (hasUpgrade('p', 31)) },
            tooltip: "Buy your eleventh prestige upgrade.",	   
        },
        15: {
            name: "Lots",
            done() { return (player.points.gte(1e9)) },
            tooltip: "1e9 points.",	   
        },
	16: {
            name: "Reversed",
            done() { return (hasUpgrade('p', 41)) },
            tooltip: "Buy your sixteenth prestige upgrade.",	   
        },
	21: {
            name: "Resetted",
            done() { return (player.up.points.gte(1)) },
            tooltip: "Get your first upgraded prestige point.",	   
        },
        22: {
            name: "Challenge P1 Complete",
            done() { return (hasChallenge('up', 11)) },
            tooltip: "Get Challenge P1 Complete.",	   
        },
        23: {
            name: "Buffed",
            done() { return (hasUpgrade('up', 12)) },
            tooltip: "Buy your second upgraded prestige upgrade.",	   
        },
        24: {
            name: "The Automation Era",
            done() { return (player.p.gens.gte(1)) },
            tooltip: "Get a Prestige Generator.",	   
        },
        25: {
            name: "Reset ❌ Wait ✅",
            done() { return (player.p.gens.gte(5000)) },
            tooltip: "Get 5000 Prestige Generators.",	   
        },
        26: {
            name: "Click = More",
            done() { return (player.up.boosters.gte(1)) },
            tooltip: "Get a Prestige Booster.",	   
        },
        31: {
            name: "Resetted... again",
            done() { return (player.sp.points.gte(1)) },
            tooltip: "Get your first super prestige point.",	   
        },
        32: {
            name: "Polynomial Points",
            done() { return (player.sp.superpoints.gte(1)) },
            tooltip: "Get your first super point.",	   
        },
        33: {
            name: "The grind...",
            done() { return (player.sp.superpoints.gte(5000)) },
            tooltip: "Get 5,000 super points.",	
        },
        34: {
            name: "Grind to Infinity",
            done() { return (hasUpgrade('sp', 35)) },
            tooltip: "Get Super Prestige Upgrade 15. (Upgrade 50)",	   
        },
        35: {
            name: "Timewalled",
            done() { return (player.sp.superpoints.gte(1e7)) },
            tooltip: "Get 10,000,000 Super Points.",	   
        },
        36: {
            name: "Almost there!",
            done() { return (player.points.gte(1e308)) },
            tooltip: "Get 1e308 points.",	   
        },
        41: {
            name: "Finally!",
            done() { return (player.I.infinity.gte(1)) },
            tooltip: "Do your first infinity.",	   
        },
        42: {
            name: "🕓",
            done() { return (player.I.infinity.gte(3)) },
            tooltip: "Do your third infinity.",	   
        }, 
        43: {
            name: "It's getting faster",
            done() { return (hasUpgrade('I', 15)) },
            tooltip: "Buy the fifth Infinity upgrade.",	   
        },
        44: {
            name: "Fast Infinity",
            done() { return (player.I.infinity.gte(10)) },
            tooltip: "Do your tenth infinity.",	   
        },
        45: {
            name: "End of v0.4.0",
            done() { return (hasUpgrade('I', 25)) },
            tooltip: "Buy the 10th Infinity Upgrade.",	   
        },
        46: {
            name: "Why are you still going?",
            done() { return (player.I.infinity.gte(20)) },
            tooltip: "Do your 20th infinity.",	   
        }, 
    },
    clickables:{
        11:{
            display(){return `Prestige`},
            style:{"height":"150px","width":"150px","border-radius":"0%","border":"6px solid","border-color":"#ff0000","color":"#ff0000","font-size":"15px","background-color":"#00000000"},
            unlocked(){return player.p.unlocked},
            onClick(){
                player.tab='up'
            },
            canClick(){return true}
        },
    	12:{
            display(){return `Upgraded Prestige`},
            style:{"height":"150px","width":"150px","border-radius":"0%","border":"6px solid","border-color":"#ff3c00","color":"#ff3c00","font-size":"15px","background-color":"#00000000"},
            unlocked(){return player.up.unlocked},
            onClick(){
                player.tab='up'
            },
            canClick(){return true}
        },
   	13:{
            display(){return `Super Prestige`},
            style:{"height":"150px","width":"150px","border-radius":"0%","border":"6px solid","border-color":"#ff5400","color":"#ff5400","font-size":"15px","background-color":"#00000000"},
            unlocked(){return player.sp.unlocked},
            onClick(){
                player.tab='sp'
            },
            canClick(){return true}
        },
    	14:{
            display(){return `Infinity`},
            style:{"height":"150px","width":"150px","border-radius":"0%","border":"6px solid","border-color":"#bb00ff","color":"#bb00ff","font-size":"15px","background-color":"#00000000"},
            unlocked(){return player.I.unlocked},
            onClick(){
                player.tab='I'
            },
            canClick(){return true}
        },
    },
})

addLayer( "sp", {
    name: "Super Prestige Points",
    symbol: "P2",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
  		superpoints: new Decimal(0),
                superpointsgain: new Decimal(0),
    }},
    nodeStyle: {
	"border-radius": "100%",
	"width": "100px",
	"height": "100px"
    },
    color: "#ff5400",
    requires() {
        let req = new Decimal(1e10)
        return req
    }, // Can be a function that takes requirement increases into account
    resource: "super prestige points", // Name of prestige currency
    baseResource: "upgraded prestige points", // Name of resource prestige is based on
    baseAmount() {return player.up.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.15, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('I', 14)) mult = mult.times(2)
	if (hasUpgrade('I', 24)) mult = mult.times(upgradeEffect('I', 24))
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    powerEff() {
    return player.sp.superpoints.add(1).pow(0.75);
    },
    hotkeys: [
        {key: "s", description: "S: Reset for super prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetDescription: 'Reset previous progress for ',
    layerShown(){
        let visible = false
        if (hasUpgrade('up', 35) || player.sp.unlocked) visible = true
       return visible
    },
    branches:["up"],
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "resource-display",
                "prestige-button",
                "blank",
                "upgrades"
            ],
        },
	"Super Points": {
          unlocked() { return (hasUpgrade('sp', 15)) },
	    content: [
                "main-display",
		"blank",
		["display-text",
				function() {return 'You have ' + format(player.sp.superpoints) + ' Super Points, gaining ' + format(player.sp.superpointsgain) + ' super points per second and are boosting points by '+'x'+format(tmp.sp.powerEff)+(hasUpgrade('p', 46)?" (Your super points are also boosting Upgrade Points by "+format(tmp.p.powerEff)+")":"")},
					{}],
		"resource-display",
		"blank",
		"prestige-button",
                "blank",
                "buyables"
            ],
        },
    },
    upgrades: {
	11: {
            title: "Upgrade 36",
	    description: function() {return `<br>×10 <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br>, <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span><br> and <span style=\"color: rgb(255, 60, 0); text-shadow: rgb(255, 60, 0) 0px 0px 10px;\">upgraded prestige points</span>`},
	    cost: new Decimal(1),
	},
        12: {
            title: "Upgrade 37",
	    description: "Keep your Prestige Upgrades!",
	    cost: new Decimal(2),
	    unlocked() {return hasUpgrade('sp', 11)},
	},
        13: {
            title: "Upgrade 38",
	    description: function() {return `<br>×10 <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br> every upgrade starting from this upgrade! And ×100 <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span>`},
	    cost: new Decimal(3),
	    unlocked() {return hasUpgrade('sp', 12)},
	},
        14: {
            title: "Upgrade 39",
	    description: function() {return `<br>25 × 10 <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br>`},
	    cost: new Decimal(5),
	    unlocked() {return hasUpgrade('sp', 13)},
	},
        15: {
            title: "Feature 5 (Upgrade 40)",
	    description: "Unlock Super Points",
	    cost: new Decimal(10),
	    unlocked() {return hasUpgrade('sp', 14)},
	},
        21: {
            title: "Upgrade 41",
            description: "×2 super point gain",
            cost: new Decimal(15),
	    currencyDisplayName: "Super Points",
            currencyInternalName: "superpoints",
            currencyLayer: "sp",
            unlocked() {return hasUpgrade("sp", 15)}
	},
        22: {
            title: "Upgrade 42",
            description: function() {return `<br>Boost super points based on <span style=\"color: rgb(255, 60, 0); text-shadow: rgb(255, 60, 0) 0px 0px 10px;\"><h3>upgraded prestige points</h3></span><br>`},
            cost: new Decimal(35),
	    currencyDisplayName: "Super Points",
            currencyInternalName: "superpoints",
            currencyLayer: "sp",
            effect() {
                return player.up.points.add(1).pow(0.025)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
	    tooltip: "(UPP+1)<sup>0.025</sup>",
	    unlocked() {return hasUpgrade("sp", 21)}
	},
        23: {
            title: "Upgrade 43",
            description: function() {return `<br>100 × 10 <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br>`},
            cost: new Decimal(100),
	    currencyDisplayName: "Super Points",
            currencyInternalName: "superpoints",
            currencyLayer: "sp",
            unlocked() {return hasUpgrade("sp", 22)}
	},
        24: {
            title: "Upgrade 44",
            description: function() {return `<br><span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\"><h3>points</h3></span> boost super points<br>`},
            cost: new Decimal(200),
            currencyDisplayName: "Super Points",
            currencyInternalName: "superpoints",
            currencyLayer: "sp",
	    effect() {
                return player.points.add(1).pow(0.0025)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
	    tooltip: "(points+1)<sup>0.0025</sup>",
            unlocked() {return hasUpgrade('sp', 23)},
        },
        25: {
            title: "Feature 6 (Upgrade 45)",
            description: "Unlock a buyable.",
            cost: new Decimal(500),
	    currencyDisplayName: "Super Points",
            currencyInternalName: "superpoints",
            currencyLayer: "sp",
            unlocked() {return hasUpgrade("sp", 24)}
	},
       	31: {
            title: "Upgrade 46",
            description: "Super points boost super points",
            cost: new Decimal(5000),
            currencyDisplayName: "Super Points",
            currencyInternalName: "superpoints",
            currencyLayer: "sp",
	    effect() {
                return player.sp.superpoints.add(1).pow(0.15)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
	    tooltip: "(SP+1)<sup>0.15</sup>",
            unlocked() {return hasUpgrade('sp', 25)},
        },
        32: {
            title: "Upgrade 47",
            description: function() {return `<br>Super points boost <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span><br>`},
            cost: new Decimal(25000),
            currencyDisplayName: "Super Points",
            currencyInternalName: "superpoints",
            currencyLayer: "sp",
	    effect() {
                return player.sp.superpoints.add(1).pow(0.5)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
	    tooltip: "(SP+1)<sup>0.5</sup>",
            unlocked() {return hasUpgrade('sp', 31)},
        },
        33: {
            title: "Upgrade 48",
            description: function() {return `<br>Super points boost <span style=\"color: rgb(255, 60, 0); text-shadow: rgb(255, 60, 0) 0px 0px 10px;\">upgraded prestige points</span><br>`},
            cost: new Decimal(40000),
            currencyDisplayName: "Super Points",
            currencyInternalName: "superpoints",
            currencyLayer: "sp",
	    effect() {
                return player.sp.superpoints.add(1).pow(0.2)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
	    tooltip: "(SP+1)<sup>0.2</sup>",
            unlocked() {return hasUpgrade('sp', 32)},
        },
        34: {
            title: "Upgrade 49",
            description: function() {return `<br>^1.005 <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br>`},
            cost: new Decimal(50000),
            currencyDisplayName: "Super Points",
            currencyInternalName: "superpoints",
            currencyLayer: "sp",
            unlocked() {return hasUpgrade('sp', 33)},
        },
        35: {
            title: "Final upgrade before the grind. (Upgrade 50)",
            description: function() {return `<br>20 × 10 <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span><br>`},
            cost: new Decimal(200000),
            currencyDisplayName: "Super Points",
            currencyInternalName: "superpoints",
            currencyLayer: "sp",
            unlocked() {return hasUpgrade('sp', 34)},
        },
    },
    buyables: {
        11: {
            title: "First buyable!",
            unlocked() { return (hasUpgrade('sp', 25)) },
            cost(x) {
                let exp2 = new Decimal(1.075)
                return new Decimal(1000).mul(Decimal.pow(1.15, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Super Points." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Super Points gain by x" + format(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                return player.sp.superpoints.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.sp.superpoints = player.sp.superpoints.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(1.3)
                let base2 = x
                let expo = new Decimal(1)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
        },
    },
    update(diff) {
        if (hasUpgrade("sp", 15)) {
            let gain = new Decimal(1)
	    gain = gain.times(buyableEffect('sp', 11))
	    if (hasUpgrade('sp', 21)) gain = gain.times(2)
	    if (hasUpgrade('sp', 22)) gain = gain.times(upgradeEffect('sp', 22))
	    if (hasUpgrade('sp', 24)) gain = gain.times(upgradeEffect('sp', 24))
     	    if (hasUpgrade('sp', 31)) gain = gain.times(upgradeEffect('sp', 31))
	    if (hasUpgrade('I', 15)) gain = gain.times(2)
	    if (hasUpgrade('I', 25)) gain = gain.times(upgradeEffect('I', 25))
            
	    // statements above this line
            player.sp.superpointsgain = gain
            gain = gain.times(diff)
            player.sp.superpoints = player.sp.superpoints.add(gain)
        }
    },
})

addLayer("S", {
    startData() { return {
        unlocked: true,
    }},
    color: "white",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Stats")
    },
    tabFormat: {
        "Statistics": {
            content: [
	        ["blank", "15px"],
	        ["display-text", function() {
                        return 'You have ' + format(player.points) + ' points'
                    }],
		"blank", 
	        ["display-text", function() {
                        if (tmp.p.layerShown)
                        return 'You have ' + format(player.p.points) + ' prestige points'
                    }],
		"blank", 
	        ["display-text", function() {
                        if (tmp.up.layerShown)
                        return 'You have ' + format(player.up.points) + ' upgraded prestige points'
                    }],
		"blank", 
	        ["display-text", function() {
                        if (tmp.sp.layerShown)
                        return 'You have ' + format(player.sp.points) + ' super prestige points'
                    }],
		"blank", 
		["display-text", function() {
                        if (tmp.I.layerShown)
			return 'You have ' + format(player.I.points) + ' Infinity Points'
                    }],
		"blank",
	    ],
	},
    },      
})

addLayer( "I", {
    name: "Infinity",
    symbol: "∞",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
  		infinity: new Decimal(0),
    }},
    nodeStyle: {
	"border-radius": "100%",
	"width": "100px",
	"height": "100px"
    },
    color: "#bb00ff",
    requires() {
        let req = new Decimal("1.79e308")
        return req
    }, // Can be a function that takes requirement increases into account
    resource: "Infinity Points (IP)", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.005, // Prestige currency exponent
    onPrestige() {
	infGain = new Decimal(1)
	player.I.infinity = player.I.infinity.add(infGain)
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('I', 25)) mult = mult.times(2)
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for IP", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetDescription: 'Reset EVERYTHING for ',
    tooltip() {
	return ("Infinity")
    },
    layerShown(){
        let visible = false
        if (player.points.gte("1.79e308") || player.I.unlocked) visible = true
       return visible
    },
    branches:["sp"],
    powerEff() {
    return player.I.infinity.add(1).pow(1.5);
    },
    autoPrestige(){return true},
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "resource-display",
                "prestige-button",
                "blank",
		["display-text",
				function() {return format(player.I.infinity) + '∞,'+ ' which boosts Points by ' +'x'+format(tmp.I.powerEff)+(hasUpgrade('p', 46)?" (Your super points are also boosting Upgrade Points by "+format(tmp.p.powerEff)+")":"")},
					{}],
		"blank",
                "upgrades"
            ],
        },
    },
    upgrades: {
	11: {
            title: "Upgrade 51",
	    description: function() {return `<br>×2 <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span> and unlock Automation`},
	    cost: new Decimal(1),
	},
        12: {
            title: "Upgrade 52",
	    description: function() {return `<br>×2 <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span>`},
	    cost: new Decimal(1),
	    unlocked() {return hasUpgrade('I', 11)},
	},
        13: {
            title: "Upgrade 53",
	    description: function() {return `<br>×2 <span style=\"color: rgb(255, 60, 0); text-shadow: rgb(255, 60, 0) 0px 0px 10px;\">upgraded prestige points</span>`},
	    cost: new Decimal(1),
	    unlocked() {return hasUpgrade('I', 12)},
	},
        14: {
            title: "Upgrade 54",
	    description: function() {return `<br>×2 <span style=\"color: rgb(255, 105, 31); text-shadow: rgb(255, 105, 31) 0px 0px 10px;\">super prestige points</span>`},
	    cost: new Decimal(1),
	    unlocked() {return hasUpgrade('I', 13)},
	},
        15: {
            title: "Upgrade 55",
	    description: function() {return `<br>×2 super points`},
	    cost: new Decimal(1),
	    unlocked() {return hasUpgrade('I', 14)},
	},
        21: {
	    title: "Upgrade 56",
            description: function() {return `<br> Boost your <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\"><h3>points</h3></span><br> based on Infinities<br>`},
            cost: new Decimal(2),
            effect(){
                let expu3 = 0.5
                let eff = player.I.infinity.add(1).pow(expu3)
                eff = softcap(eff, new Decimal("1e10"), 0.5)
                return eff
	    },
            effectDisplay() { // Add formatting to the effect
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("1e10")) ) {
                    softcapDescription = " (Softcapped)"
		}
	        return "This upgrade boosts Points by " + format(upgEffect)+"x" + softcapDescription
	    },
            tooltip: "(Infinities+1)<sup>0.5</sup>",
	    unlocked() {return (hasUpgrade('I', 15))}
        },
        22: { 
	    title: "Upgrade 57",
            description: function() {return `<br> Boost your <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\"><h3>prestige points</h3></span><br> based on Infinities<br>`},
            cost: new Decimal(2),
            effect(){
                let expu3 = 0.5
                let eff = player.I.infinity.add(1).pow(expu3)
                eff = softcap(eff, new Decimal("1e10"), 0.5)
                return eff
	    },
            effectDisplay() { // Add formatting to the effect
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("1e10")) ) {
                    softcapDescription = " (Softcapped)"
		}
	        return "This upgrade boosts Prestige Points by " + format(upgEffect)+"x" + softcapDescription
	    },
            tooltip: "(Infinities+1)<sup>0.5</sup>",
	    unlocked() {return (hasUpgrade('I', 21))}
        },
        23: { 
	    title: "Upgrade 58",
            description: function() {return `<br> Boost your <span style=\"color: rgb(255, 60, 0); text-shadow: rgb(255, 60, 0) 0px 0px 10px;\"><h3>upgraded prestige points</h3></span><br> based on Infinities<br>`},
            cost: new Decimal(2),
            effect(){
                let expu3 = 0.5
                let eff = player.I.infinity.add(1).pow(expu3)
                eff = softcap(eff, new Decimal("1e10"), 0.5)
                return eff
	    },
            effectDisplay() { // Add formatting to the effect
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("1e10")) ) {
                    softcapDescription = " (Softcapped)"
		}
	        return "This upgrade boosts Upgraded Prestige Points by " + format(upgEffect)+"x" + softcapDescription
	    },
            tooltip: "(Infinities+1)<sup>0.5</sup>",
	    unlocked() {return (hasUpgrade('I', 22))}
        },
        24: { 
	    title: "Upgrade 59",
            description: function() {return `<br> Boost your <span style=\"color: rgb(255, 105, 31); text-shadow: rgb(255, 105, 31) 0px 0px 10px;\"><h3>super prestige points</h3></span><br> based on Infinities<br>`},
            cost: new Decimal(2),
            effect(){
                let expu3 = 0.5
                let eff = player.I.infinity.add(1).pow(expu3)
                eff = softcap(eff, new Decimal("1e10"), 0.5)
                return eff
	    },
            effectDisplay() { // Add formatting to the effect
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("1e10")) ) {
                    softcapDescription = " (Softcapped)"
		}
	        return "This upgrade boosts Super Prestige Points by " + format(upgEffect)+"x" + softcapDescription
	    },
            tooltip: "(Infinities+1)<sup>0.5</sup>",
	    unlocked() {return (hasUpgrade('I', 23))}
        },
        25: { 
	    title: "Upgrade 60",
            description: function() {return `<br> Boost your super points based on Infinities<br> and ×2 IP`},
            cost: new Decimal(2),
            effect(){
                let expu3 = 0.5
                let eff = player.I.infinity.add(1).pow(expu3)
                eff = softcap(eff, new Decimal("1e10"), 0.5)
                return eff
	    },
            effectDisplay() { // Add formatting to the effect
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("1e10")) ) {
                    softcapDescription = " (Softcapped)"
		}
	        return "This upgrade boosts Super Points by " + format(upgEffect)+"x" + softcapDescription
	    },
            tooltip: "(Infinities+1)<sup>0.5</sup>",
	    unlocked() {return (hasUpgrade('I', 24))}
        },
        31: {
            title: "Upgrade 61",
	    description: function() {return `<br>Exponential, Raise <span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">prestige points</span> to the power of 1.01.`},
	    cost: new Decimal(5),
	    unlocked() {return (hasUpgrade('I', 25))}
	},
        32: {
            title: "Upgrade 62",
	    description: function() {return `<br>Total AP boosts <span style=\"color: rgb(255, 255, 255); text-shadow: rgb(255, 255, 255) 0px 0px 10px;\">points</span>`},
	    cost: new Decimal(5),
	    effect(){
                let expu3 = 0.5
                let eff = player.au.total.add(1).pow(expu3)
                eff = softcap(eff, new Decimal("1e10"), 0.5)
                return eff
	    },
            effectDisplay() { // Add formatting to the effect
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("1e10")) ) {
                    softcapDescription = " (Softcapped)"
		}
	        return "This upgrade boosts Points by " + format(upgEffect)+"x" + softcapDescription
	    },
            tooltip: "(Total AP+1)<sup>2</sup>",
	    unlocked() {return (hasUpgrade('I', 31))}
	},
    },
})

addLayer( "au", {
    name: "Automation Points",
    symbol: "Au",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
  		total: new Decimal(0)
    }},
    color: "#a0a0a0",
    requires() {
        let req = new Decimal("ee100")
        return req
    }, // Can be a function that takes requirement increases into account
    resource: "Automation Points (AP)", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.15, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){
        let visible = false
        if (hasUpgrade('I', 11) || player.au.unlocked) visible = true
       return visible
    },
    buyables: {
    11: {
        cost(x) { return new Decimal(1e100).pow(x) },
        display() { return "+1 Automation Point." + "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Points." + "<br>Bought: " + getBuyableAmount(this.layer, this.id)},
        canAfford() { return player.points.gte(this.cost()) },
        buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
	    player[this.layer].points = player[this.layer].points.add(1)
	    player[this.layer].total = player[this.layer].total.add(1)
        },
        unlocked() { return (hasUpgrade('I', 11)) },
    },
    12: {
        cost(x) { return new Decimal(1e50).pow(x) },
        display() { return "+1 Automation Point." + "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points." + "<br>Bought: " + getBuyableAmount(this.layer, this.id)},
        canAfford() { return player.p.points.gte(this.cost()) },
        buy() {
            player.p.points = player.p.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
	    player[this.layer].points = player[this.layer].points.add(1)
	    player[this.layer].total = player[this.layer].total.add(1)
        },
        unlocked() { return (hasUpgrade('I', 11)) },
    },
    13: {
        cost(x) { return new Decimal(2).pow(x) },
        display() { return "+1 Automation Point." + "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP." + "<br>Bought: " + getBuyableAmount(this.layer, this.id)},
        canAfford() { return player.I.points.gte(this.cost()) },
        buy() {
            player.I.points = player.I.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
	    player[this.layer].points = player[this.layer].points.add(1)
	    player[this.layer].total = player[this.layer].total.add(1)
        },
        unlocked() { return (hasUpgrade('I', 11)) },
    },
    },
    upgrades: {
	11: {
            title: "A1",
	    description: function() {return `<br>Unlock Auto Prestige Upgrades`},
	    cost: new Decimal(0),
	    unlocked() { return (hasUpgrade('I', 11)) },
	},
        12: {
            title: "A2",
	    description: function() {return `<br>Unlock Passive 1`},
	    cost: new Decimal(6),
	    unlocked() { return (hasUpgrade('au', 11)) },
	},
        13: {
            title: "A3",
	    description: function() {return `<br>Unlock Auto Upgraded Prestige Upgrades`},
	    cost: new Decimal(6),
	    unlocked() { return (hasUpgrade('au', 12)) },
	},
    },
    milestones: {
        0: {
            requirementDescription: "Auto Prestige Upgrades",
            effectDescription: "Automatically buys Prestige Upgrades!",
            done() { return hasUpgrade('au', 11) },
            unlocked() { return (hasUpgrade('au', 11)) },
	    toggles: [["au", "autoPreUp"]],
   	},
        1: {
            requirementDescription: "Passive 1",
            effectDescription: "10% Prestige Points per second",
            done() { return hasUpgrade('au', 12) },
            unlocked() { return (hasUpgrade('au', 12)) },
	    toggles: [["au", "autoPrePoi"]],
   	},
        2: {
            requirementDescription: "Auto Upgraded Prestige Upgrades",
            effectDescription: "Automatically buys Upgraded Prestige Upgrades!",
            done() { return hasUpgrade('au', 13) },
            unlocked() { return (hasUpgrade('au', 13)) },
	    toggles: [["au", "autoUpPreUp"]],
   	},
    },
})
