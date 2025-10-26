addLayer("e", {
    name: "extreme runes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ER", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ff5252",
    requires: new Decimal(390), // Can be a function that takes requirement increases into account
    resource: "Extreme Runes", // Name of prestige currency
    baseResource: "Levels", // Name of resource prestige is based on
    baseAmount() {return player.l.level}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for extreme runes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('u', 25)},
	  branches: ["l"],
    effect(){ return player.e.points.add(1).pow(20) },
    effectDescription(){ return "which is boosting XP and points by x" + format(layer.e.effect()) },
	milestones: {
    0: {
        requirementDescription: "1 extreme rune",
        effectDescription: "Keep Level Milestones",
        done() { return player.e.points.gte(1) }
    },
	},
})
