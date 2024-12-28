addLayer("r", {
    name: "Rebirth",
    symbol: "R",
    position: 0,
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),         // "points" is the internal name for the main resource of the layer.
    }},
    color: "#007bff",                       // The color for this layer, which affects many elements.
    resource: "rebirth points",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).
    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.
    requires(){
	let req = new Decimal(1e24)
	return req
    },              // The amount of the base needed to gain 1 of the prestige currency.                                    // Also the amount required to unlock the layer
    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.1,                          // "normal" prestige gain is (currency^exponent).
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        mult = new Decimal(1)               // Factor in any bonuses multiplying gain here.
    	return mult
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    layerShown(){
        let visible = false
        if (hasUpgrade('g', 25) || player.r.unlocked) visible = true
       return visible
},          // Returns a bool for if this layer's node should be visible in the tree.
    branches: ["g"],
    hotkeys: [
        {key: "r", description: "R: Reset for rebirth points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    challenges: {
        11: {
            name: "Rebirth Challenge 1",
            challengeDescription: "Point generation is divided by 1e3.",
            canComplete: function() {return player.points.gte(1e24)},
            goalDescription: "Reach Rebirth.",
            rewardDescription: "Unlock more prestige upgrades"
	},
    },
    upgrades: {
	11: {
	    title: "You Rebirthed!",
	    description: "5x points and prestige points.",
	    cost: new Decimal(1)
	},
        12: {
	    title: "Game needs more automation.",
	    description: "Generator upgrade 8 effect is kept and generates 50% of prestige points per second.",
	    cost: new Decimal(1),
	    unlocked(){ return(hasUpgrade('r',11))}
	},
        13: {
	    title: "Still needs more automation.",
	    description: "Automatically buys boosters.",
	    cost: new Decimal(2),
	    unlocked(){ return(hasUpgrade('r',12))}
	},
    },
})
