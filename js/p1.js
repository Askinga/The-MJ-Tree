addLayer("p1", {
    name: "p1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffffff",
        requires() {
        let req = new Decimal(10)
	return req
    },

    
    resource: "points^1", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
     passiveGeneration() {   // Also the amount required to unlock the layer.
    	return player.p2.points
    },
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.000000001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for points^1", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
	let eff = player.p.points.add(1).pow(enpow)
       return eff
       },
        effectDescription() {
            let desc = "adding to point gain by " + format(tmp[this.layer].effect);
            return desc;
        },
})
