addLayer("b", {
    name: "Boosters",
    symbol: "B",
    position: 0,
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0), 
        baseeffect: new Decimal(2)          // "points" is the internal name for the main resource of the layer.
    }},
    color: "#0000FF",                       // The color for this layer, which affects many elements.
    resource: "boosters",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    baseResource: "prestige points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p.points },  // A function to return the current amount of baseResource.
    requires(){
	let req = new Decimal(20000)
	if(hasUpgrade('b',21)) req = req.div(3.5)
	if(hasUpgrade('b',32)) req = req.div(upgradeEffect('b',32))
	if(hasUpgrade('b',35)) req = req.div(10000)
	return req
    },              // The amount of the base needed to gain 1 of the prestige currency.                                    // Also the amount required to unlock the layer
    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 1.425,                          // "normal" prestige gain is (currency^exponent).
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        mult = new Decimal(1)               // Factor in any bonuses multiplying gain here.
    	return mult
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    layerShown(){
        let visible = false
        if (hasUpgrade('p', 25) || player.b.unlocked) visible = true
       return visible
},          // Returns a bool for if this layer's node should be visible in the tree.
    branches: ["p"],
    hotkeys: [
        {key: "b", description: "B: Reset for boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    autoPrestige(){ return (hasUpgrade('r', 13))},
    autoUpgrade(){ return (hasUpgrade('r', 14))},
    resetsNothing(){ return (hasUpgrade('r', 14))},
    upgrades: {
        11: {
	    title: "First booster upgrade.",
	    description: "Prestige point gain is multiplied by 2.",
	    cost: new Decimal(2),
	},
        12: {
	    title: "More points",
	    description: "Point generation is multiplied by 2.5.",
	    cost: new Decimal(4),
	    unlocked(){return (hasUpgrade('b',11))}
	},
        13: {
	    title: "More prestige",
	    description: "Prestige Point gain is multiplied by 1.5",
	    cost: new Decimal(4),
	    unlocked(){return (hasUpgrade('b',12))}
	},
        14: {
	    title: "More Exponents",
	    description: "Prestige Point gain is raised to the power of 1.075.",
	    cost: new Decimal(5),
	    unlocked(){return (hasUpgrade('b',13))}
	},
        15: {
	    title: "Even more prestige",
	    description: "Prestige Point gain is multiplied by 2.5.",
	    cost: new Decimal(5),
	    unlocked(){return (hasUpgrade('b',14))}
	},
        21: {
	    title: "Easier boosters",
	    description: "Booster requirement is divided by 3.5.",
	    cost: new Decimal(6),
	    unlocked(){return (hasUpgrade('b',15))}
	},
        22: {
	    title: "Booster+",
	    description: "Adds 0.25 to the booster base.",
	    cost: new Decimal(7),
	    unlocked(){return (hasUpgrade('b',21))}
	},
        23: {
	    title: "Prestige+",
	    description: "Prestige point gain is multiplied by 3. And autobuy prestige upgrades.",
	    cost: new Decimal(7),
	    unlocked(){return (hasUpgrade('b',22))}
	},
        24: {
	    title: "Point+",
	    description: "Point generation is multiplied by 10.",
	    cost: new Decimal(8),
	    unlocked(){return (hasUpgrade('b',23))}
	},
        25: {
	    title: "Time for generators",
	    description: "Unlock a new layer.",
	    cost: new Decimal(9),
	    unlocked(){return (hasUpgrade('b',24))}
	},
        31: {
	    title: "ExBoUp1",
	    description: "Boost prestige point gain based on boosters.",
	    cost: new Decimal(30),
	    effect() {
     	   	return new Decimal(1.1).pow(player.b.points)
   	    },
   	    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	    unlocked(){return (hasChallenge('r',12))}
	},
    	32: {
	    title: "ExBoUp2",
	    description: "Divide booster requirement based on points.",
	    cost: new Decimal(32),
	    effect() {
     	   	return player.points.add(1).log(3).add(1).pow(2)
   	    },
   	    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	    tooltip(){
		return `log<sub>3</sub>((points+1)+1)<sup>2</sup>`
	    },
	    unlocked(){return (hasUpgrade('b',31))}
	},
    	33: {
	    title: "ExBoUp3",
	    description: "Point generation is multiplied by 20.",
	    cost: new Decimal(35),
	    unlocked(){return (hasUpgrade('b',32))}
	},
    	34: {
	    title: "ExBoUp4",
	    description: "Prestige Point gain is multiplied by 10.",
	    cost: new Decimal(36),
	    unlocked(){return (hasUpgrade('b',33))}
	},
        35: {
	    title: "ExBoUp5",
	    description: "Booster cost is divided by 10000.",
	    cost: new Decimal(37),
	    unlocked(){return (hasUpgrade('b',34))}
	},
    },
    effect(){
       let base = 2
	if(hasUpgrade('b',22)) base = 2.25
	if(hasUpgrade('p',33)) base = 2.35
	if(hasChallenge('r',12)) base = 2.5
	if(inChallenge('r',21)) base = 1.025
	let eff = new Decimal(base).pow(player.b.points)
       return eff
       },
        effectDescription() {
            let desc = "which is boosting Point generation by x" + format(tmp[this.layer].effect);
            return desc;
        },
})
