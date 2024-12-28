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
        12: {
            name: "Rebirth Challenge 2",
            challengeDescription: "You can only buy the first prestige upgrade.",
            canComplete: function() {return player.points.gte(1e24)},
            goalDescription: "Reach Rebirth.",
            rewardDescription: "2x points."
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
        14: {
	    title: "Too long.",
	    description: "Automatically buys booster upgrades, boosters reset nothing and 2x point generation.",
	    cost: new Decimal(2),
	    unlocked(){ return(hasUpgrade('r',13))}
	},
        15: {
	    title: "Super op",
	    description: "Generator base is now 3.",
	    cost: new Decimal(3),
	    unlocked(){ return(hasUpgrade('r',14))}
	},
        21: {
	    title: "Really needs automation.",
	    description: "Automatically buy generator, it's upgrades and generators reset nothing.",
	    cost: new Decimal(10),
	    unlocked(){ return(hasUpgrade('r',15))}
	},
        22: {
	    title: "Make rebirth faster",
	    description: "3x points and prestige points.",
	    cost: new Decimal(15),
	    unlocked(){ return(hasUpgrade('r',21))}
	},
        23: {
	    title: "Still too slow",
	    description: "2.5x points and +150% prestige point generation.",
	    cost: new Decimal(30),
	    unlocked(){ return(hasUpgrade('r',22))}
	},
        24: {
	    title: "ExPrUp1 is taking forever to reach.",
	    description: "10x point generation.",
	    cost: new Decimal(70),
	    unlocked(){ return(hasUpgrade('r',23))}
	},
    },
})
