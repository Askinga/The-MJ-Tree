addLayer("a", {
    name: "Addition",
    symbol: "➕",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#a8a8a8",
    requires() {
        let req = new Decimal(125)
	return req
    }, // Can be a function that takes requirement increases into account
    resource: "Addition", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.15, // Prestige currency exponent
    effect(){
    let rpow = 1
	let eff = player.a.points.pow(rpow)
       return eff
        },
        effectDescription() {
            let desc = "adding " + format(tmp[this.layer].effect) + " to point gain.";
            return desc;
        },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if(hasUpgrade('a', 14)) mult = mult.times(2)
        if(hasUpgrade('a', 15)) mult = mult.times(2)
	if(hasUpgrade('m', 12)) mult = mult.times(2)
	if(hasUpgrade('m', 13)) mult = mult.times(1.5)
	if(hasUpgrade('m', 15)) mult = mult.times(5)
	if(hasMilestone('c', 7)) mult = mult.times(2)
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for Addition", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetDescription: 'Reset points for ',
    layerShown(){
        let visible = false
        if (hasMilestone('c', 2) || player.a.unlocked) visible = true
       return visible
    },
    branches:["c"],
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Addition")
    },
    upgrades: {
        11: {
            title: "First upgrade?",
            description: "Grant yourself 2x points by speeding up time (before addition).",
            cost: new Decimal(5),
	    unlocked() { return (hasMilestone('c', 3)) }
        },
        12: {
            title: "addition reference",
            description: "Grant yourself +10 point gain.",
            cost: new Decimal(9),
	    unlocked() { return (hasMilestone('c', 3)) }
        },
        13: {
            title: "Upgrade repeat",
            description: "Grant yourself 4x points by speeding up time again (before addition).",
            cost: new Decimal(13),
	    unlocked() { return (hasMilestone('c', 3)) }
        },
        14: {
            title: "More Addition",
            description: "Grant yourself 2x Addition by cloning the additions you gain.",
            cost: new Decimal(30),
	    unlocked() { return (hasMilestone('c', 4)) }
        },
        15: {
            title: "Even more Addition",
            description: "Grant yourself 2x Addition by cloning the additions you gain again.",
            cost: new Decimal(100),
	    unlocked() { return (hasMilestone('c', 4)) }
        },
    }, 
})
