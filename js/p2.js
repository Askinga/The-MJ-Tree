addLayer("p2", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#e8e8e8",                       // The color for this layer, which affects many elements.
    resource: "points^2",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).

    baseResource: "points^1",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p1.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(400),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.0000000001,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return player.p1.points.gte(100) },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
      hotkeys: [
        {key: "b", description: "B: Reset for points^2", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                "resource-display",
                "prestige-button",
                "blank",
                "blank",
                "blank",
                "upgrades"
            ],
        },
    },
    effect(){
    let enpow = 1
	let eff = player.p2.points.add(1).pow(enpow)
       return eff
       },
        effectDescription() {
            let desc = "generating " + format(tmp[this.layer].effect) + " points&^1 per second";
            return desc;
        },
	branches:["p1"],
})
