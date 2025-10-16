addLayer("b", {
    name: "boost runes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		terrible: new Decimal(0),
		super_bad: new Decimal(0),
		bad: new Decimal(0),
		mid: new Decimal(0),
		kinda_good: new Decimal(0),
		good: new Decimal(0),
		amazing: new Decimal(0),
		best: new Decimal(0),
    }},
    color: "#6f36eb",
    requires: new Decimal("e20"), // Can be a function that takes requirement increases into account
    resource: "Boost Runes", // Name of prestige currency
    baseResource: "Prestige Points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.02, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for boost runes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	terrible(){ // Boosts points
		return player.b.terrible.add(1).pow(2)
	},
	super_bad(){ // Boosts prestige points
		return player.b.super_bad.add(1).pow(1.5)
	},
	bad(){ // Boosts rune gain
		return player.b.bad.add(1).pow(1.25)
	},
	mid(){ // Boosts super runes
		return player.b.mid.add(1).pow(1)
	},
    layerShown(){return (hasUpgrade('s', 15) || player.b.unlocked)},
	branches: ["p"],
})
