// Tip: 11 means Column 1, Row 1 for upgrades, milestones, etc
addLayer("c", {
    name: "Computing", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "💻", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    nodeStyle() {return {
        "background": "radial-gradient(#1aad07, #106b04)",
        "width": "100px",
        "height": "100px",
    }
},
componentStyles: {
    "prestige-button"() {return { "background": "radial-gradient(#1aad07, #106b04)",
        "width": "200px",
        "height": "150px",
    }},
},
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
        let exp = 1.625
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
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Computing")
    },
    milestones: {
        0: {
            requirementDescription: "1 compution",
            effectDescription: "Compute a muliplier: 1.5x points",
            done() { return player.c.points >= (1) }
	},
        1: {
            requirementDescription: "2 computions",
            effectDescription: "Compute a addition: +3.5 point gain (before mults)",
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
        4: {
            requirementDescription: "5 computions",
            effectDescription: "Compute things: +2 upgrades for addition layer, ×1.4 points and +10 point gain",
            done() { return player.c.points >= (5) },
            unlocked() { return (hasMilestone('c', 3)) }
	},
        5: {
            requirementDescription: "6 computions",
            effectDescription: "Compute a new layer: Add Multiplication layer (SOON!)",
            done() { return player.c.points >= (6) },
            unlocked() { return (hasMilestone('c', 4)) }
	},
    },
})
