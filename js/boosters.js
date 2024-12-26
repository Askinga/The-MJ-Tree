addLayer("b", {
    name: "Boosters",
    symbol: "B",
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
    requires: new Decimal(25000),              // The amount of the base needed to gain 1 of the prestige currency.                                    // Also the amount required to unlock the layer
    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 1.45,                          // "normal" prestige gain is (currency^exponent).
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
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
	},
        13: {
	    title: "More prestige",
	    description: "Prestige Point gain is multiplied by 1.5",
	    cost: new Decimal(4),
	},
        14: {
	    title: "More Exponents",
	    description: "Prestige Point gain is raised to the power of 1.075.",
	    cost: new Decimal(5),
	},
    },
    effect(){
	let eff = new Decimal(2).pow(player.b.points)
       return eff
       },
        effectDescription() {
            let desc = "which is boosting Point generation by x" + format(tmp[this.layer].effect);
            return desc;
        },
})
