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
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('p', 15)) mult = mult.times(upgradeEffect('p', 15))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
	    title: "Start the generation of points",
  	    description: "Gain 1 point per second.",
    	    cost: new Decimal(0),
        },
        12: {
	    title: "That gain is kinda slow, Here is a boost.",
  	    description: "Double the point generation.",
    	    cost: new Decimal(1),
	    unlocked(){return (hasUpgrade('p',11))},
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
	    title: "Now we are getting somewhere",
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
	    title: "It is getting faster",
  	    description: "Boost prestige points gain based on points.",
    	    cost: new Decimal(30),
	    effect() {
       		return player.points.add(1).log(10).add(1)
    		},
  	    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	    tooltip(){return `log<sub>10</sub>(points+1)+1`},
	    unlocked(){return (hasUpgrade('p',14))},
        },
    },
})
