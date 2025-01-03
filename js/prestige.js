addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    passiveGeneration(){
	gen = new Decimal(0)
	    if(hasUpgrade('g', 23)) gen = gen.add(0.25)
	    if(hasUpgrade('r', 12)) gen = gen.add(0.75)
	    if(hasUpgrade('r', 23)) gen = gen.add(1.5)
	    if(hasUpgrade('p', 32)) gen = gen.times(5)
	return gen
    },
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('p', 15)) mult = mult.times(upgradeEffect('p', 15))
	if(hasUpgrade('p',24)) mult = mult.times(2)
	if(hasUpgrade('b',11)) mult = mult.times(2)
	if(hasUpgrade('b',13)) mult = mult.times(1.5)
	if(hasUpgrade('b',15)) mult = mult.times(2.5)
	if(hasUpgrade('b',23)) mult = mult.times(3)
	if (hasUpgrade('g', 12)) mult = mult.times(upgradeEffect('g', 12))
	if(hasUpgrade('g',21)) mult = mult.times(5)
	if(hasUpgrade('r',11)) mult = mult.times(5)
	if(hasUpgrade('r',22)) mult = mult.times(3)
	if(hasUpgrade('p', 34)) mult = mult.times(3)
	if(hasUpgrade('r',25)) mult = mult.times(5)
	if(hasUpgrade('r',31)) mult = mult.times(5)
	if(hasUpgrade('r',32)) mult = mult.times(2.5)
	if(hasUpgrade('r',34)) mult = mult.times(10)
	if (hasUpgrade('b', 31)) mult = mult.times(upgradeEffect('b', 31))
	if(hasUpgrade('b',34)) mult = mult.times(10)
	if(hasUpgrade('r',41)) mult = mult.times(3)
	if (hasUpgrade('r', 52)) mult = mult.times(upgradeEffect('r', 52))
	if(hasChallenge('r',21)) mult = mult.times(10)
	if(hasUpgrade('r',55)) mult = mult.times(25)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
	if(hasUpgrade('b',14)) exp = exp.times(1.075)
	return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    autoUpgrade(){return (hasUpgrade('b', 23) || hasUpgrade('r',13))},
    layerShown(){return true},
    upgrades: {
        11: {
	    title: "Start the generation of points.",
  	    description: "Gain 1 point per second.",
    	    cost: new Decimal(0),
        },
        12: {
	    title: "That gain is kinda slow, Here is a boost.",
  	    description: "Double the point generation.",
    	    cost: new Decimal(1),
	    unlocked(){return (hasUpgrade('p',11) && !(inChallenge('r',12) || inChallenge('r',22)))},
        },
        13: {
	    title: "Here is another boost.",
  	    description: "Boost the point generation based on prestige points.",
    	    cost: new Decimal(4),
	    effect() {
       		return player[this.layer].points.add(1).pow(0.35)
    		},
  	    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	    tooltip(){return `(PP+1)<sup>0.35</sup>`},
	    unlocked(){return (hasUpgrade('p',12))},
        },
	14: {
	    title: "Now we are getting somewhere.",
  	    description: "Boost the point generation based on points.",
    	    cost: new Decimal(15),
	    effect() {
       		return player.points.add(1).pow(0.06)
    		},
  	    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	    tooltip(){return `(points+1)<sup>0.06</sup>`},
	    unlocked(){return (hasUpgrade('p',13))},
        },
        15: {
	    title: "It is getting faster.",
  	    description: "Boost prestige points gain based on points.",
    	    cost: new Decimal(30),
	    effect() {
       		return player.points.add(1).log(10).add(1)
    		},
  	    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	    tooltip(){return `log<sub>10</sub>(points+1)+1`},
	    unlocked(){return (hasUpgrade('p',14))},
        },
        21: {
	    title: "It is time for a triple.",
  	    description: "Triple the point generation.",
    	    cost: new Decimal(100),
	    unlocked(){return (hasUpgrade('p',15))},
        },
        22: {
	    title: "Exponent time.",
  	    description: "Point generation is raised to the power of 1.15.",
    	    cost: new Decimal(250),
	    unlocked(){return (hasUpgrade('p',21))},
        },
        23: {
	    title: "We need more doubles.",
  	    description: "Point generation is multiplied by 2.",
    	    cost: new Decimal(400),
	    unlocked(){return (hasUpgrade('p',22))},
        },
        24: {
	    title: "More prestige points.",
  	    description: "Prestige Point gain is multiplied by 2.",
    	    cost: new Decimal(1000),
	    unlocked(){return (hasUpgrade('p',23))},
        },
        25: {
	    title: "Yeah!",
  	    description: "Point generation is multiplied by 5. And unlock a new layer.",
    	    cost: new Decimal(2500),
	    unlocked(){return (hasUpgrade('p',24))},
        },
        31: {
	    title: "ExPrUp1",
  	    description: "First extended upgrade! Boosts point generation by 5x.",
    	    cost: new Decimal(2e27),
	    unlocked(){return (hasChallenge('r',11) && !inChallenge('r',12))},
        },
        32: {
	    title: "ExPrUp2",
  	    description: "Boosts prestige point generation by 5x.",
    	    cost: new Decimal(2e28),
	    unlocked(){return (hasUpgrade('p',31))},
        },
        33: {
	    title: "ExPrUp3",
  	    description: "Booster base is now 2.35.",
    	    cost: new Decimal(2e29),
	    unlocked(){return (hasUpgrade('p',32))},
        },
        34: {
	    title: "ExPrUp4",
  	    description: "3x prestige point gain.",
    	    cost: new Decimal(2e30),
	    unlocked(){return (hasUpgrade('p',33))},
        },
        35: {
	    title: "ExPrUp5",
  	    description: "2x rebirth point gain.",
    	    cost: new Decimal(1e32),
	    unlocked(){return (hasUpgrade('p',34))},
        },
    },
})
