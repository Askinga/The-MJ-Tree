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
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Compute something new", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    milestones: {
        0: {
            requirementDescription: "1 compution",
            effectDescription: "Compute a muliplier: 1.5x points",
            done() { return player.c.points >= (1) }
	},
        1: {
            requirementDescription: "2 computions",
            effectDescription: "Compute a addition: +1.5 point gain",
            done() { return player.c.points >= (2) },
            unlocked() { return (hasMilestone('c', 0)) }
	},
        3: {
            requirementDescription: "3 computions",
            effectDescription: "Compute a new layer: Add Addition layer",
            done() { return player.c.points >= (3) },
            unlocked() { return (hasMilestone('c', 1)) }
	},
    },
})
