addLayer("m", {
    name: "Multiplication",
    symbol: "✖️",
    position: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#a8a8a8",
    requires() {
        let req = new Decimal("2e5")
	return req
    }, // Can be a function that takes requirement increases into account
    resource: "Multiplication", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.65, // Prestige currency exponent
    effect(){
    let rpow = 1
	let eff = player.m.points.add(1).pow(rpow)
       return eff
        },
        effectDescription() {
            let desc = "multiplying points by " + format(tmp[this.layer].effect) + "x";
            return desc;
        },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    displayRow: 1,
    hotkeys: [
        {key: "m", description: "A: Reset for Multiplication", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetDescription: 'Reset points and Addition for ',
    layerShown(){
        let visible = false
        if (hasMilestone('c', 5) || player.m.unlocked) visible = true
       return visible
    },
    branches:["c"],
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Multiplication")
    },
    upgrades: {
        11: {
            title: "Multiply",
            description: "Why not a 2.25x point boost?.",
            cost: new Decimal(2),
	    unlocked() { return (hasMilestone('c', 5)) }
        },
        12: {
            title: "Cloning continues",
            description: "Double Addition gain, cloning the additions you get!",
            cost: new Decimal(3),
	    unlocked() { return (hasMilestone('c', 6)) }
        },
        13: {
            title: "Little mult",
            description: "A simple 1.5x point gain",
            cost: new Decimal(4),
	    unlocked() { return (hasMilestone('c', 6)) }
        },
    },
})
