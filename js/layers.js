// Tip: 11 means Column 1, Row 1 for upgrades, milestones, etc
addLayer("c", {
    name: "Computing", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "💻", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#106b04",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Computions", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {
        let exp = 1.675
        return exp
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 99, // Row the layer is in on the tree (0 is the first row)
    displayRow: 0,
    hotkeys: [
        {key: "c", description: "C: Compute something new", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetDescription: 'Reset Everything for ', 
    layerShown(){return true},
    milestones: {
        0: {
            requirementDescription: "1 compution",
            effectDescription: "Compute a muliplier: 1.5x points",
            done() { return player.c.points >= (1) }
	},
        1: {
            requirementDescription: "2 computions",
            effectDescription: "Compute a addition: +3.5 point gain",
            done() { return player.c.points >= (2) },
            unlocked() { return (hasMilestone('c', 0)) }
	},
        2: {
            requirementDescription: "3 computions",
            effectDescription: "Compute a new layer: Add Addition layer",
            done() { return player.c.points >= (3) },
            unlocked() { return (hasMilestone('c', 1)) }
	},
        3: {
            requirementDescription: "4 computions",
            effectDescription: "Compute upgrades: +3 upgrades for addition layer",
            done() { return player.c.points >= (4) },
            unlocked() { return (hasMilestone('c', 2)) }
	},
    },
})

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
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for addition", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetDescription: 'Reset points for ',
    layerShown(){
        let visible = false
        if (hasMilestone('c', 2) || player.a.unlocked) visible = true
       return visible
    },
    branches:["c"],
    upgrades: {
        11: {
            title: "First upgrade?",
            description: "Grant yourself 2x points by speeding up time (before addition).",
            cost: new Decimal(5),
	    unlocked() { return (hasMilestone('c', 3)) }
        },
        12: {
            title: "addition reference",
            description: "Grant yourself +4 point gain.",
            cost: new Decimal(9),
	    unlocked() { return (hasMilestone('c', 3)) }
        },
        13: {
            title: "Upgrade repeat",
            description: "Grant yourself 2x points by speeding up time again (before addition).",
            cost: new Decimal(13),
	    unlocked() { return (hasMilestone('c', 3)) }
        },
    }, 
})
