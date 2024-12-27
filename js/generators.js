addLayer("g", {
    name: "Generators",
    symbol: "G",
    position: 1,
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0), 
        gp: new Decimal(0), 
        gpg: new Decimal(0)// "points" is the internal name for the main resource of the layer.
    }},
    color: "#009900",                       // The color for this layer, which affects many elements.
    resource: "generators",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    baseResource: "prestige points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p.points },  // A function to return the current amount of baseResource.
    onPrestige(){
	player.g.gp = player.g.gp.sub(player.g.gp)
    },
    requires(){
	let req = new Decimal("e10")
	return req
    },              // The amount of the base needed to gain 1 of the prestige currency.                                    // Also the amount required to unlock the layer
    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 1.5,                          // "normal" prestige gain is (currency^exponent).
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        mult = new Decimal(1)               // Factor in any bonuses multiplying gain here.
    	return mult
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    layerShown(){
        let visible = false
        if (hasUpgrade('b', 25) || player.g.unlocked) visible = true
       return visible
},          // Returns a bool for if this layer's node should be visible in the tree.
    branches: ["p"],
    hotkeys: [
        {key: "g", description: "G: Reset for generators", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    genPowerEffect() {
	return (player.g.gp.add(1).pow(0.5))
		},
    effect(){
       let base = 2
	let eff = new Decimal(base).pow(player.g.points).sub(1)
       return eff
       },
        effectDescription() {
            let desc = "which is generating " + format(tmp[this.layer].effect) + " Generator Power per second.";
            return desc;
        },
    update(diff) {
            player.g.gp = player.g.gp.add(tmp.g.effect.mul(diff))
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "blank",
        ["display-text", () => "You have " + format(player.g.gp) + " generator power, which is multiplying point generation by " + format(tmp.g.genPowerEffect)],
        "blank",
	"upgrades"
    ],
})
