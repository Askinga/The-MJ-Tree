addLayer("A", {
    name: "A", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "A", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if(hasUpgrade('A', 12)) mult = mult.times(2)
		if(hasUpgrade('A', 13)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for A", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	effect(){
		let pow = new Decimal(0.5)
		if (hasUpgrade('A', 14)) pow = pow.add(0.1)
		return player.A.points.add(1).pow(pow) 
	},
	effectDescription(){ return "boost points by x"+format(layers.A.effect()) },
	upgrades: {
		11: {
			title: "A1",
			description: "2x points.",
			cost: new Decimal(3),
		},
		12: {
			title: "A2",
			description: "2x A.",
			cost: new Decimal(20),
			unlocked(){ return hasUpgrade('A', 11) },
		},
		13: {
			title: "A3",
			description: "2x points and A.",
			cost: new Decimal(60),
			unlocked(){ return hasUpgrade('A', 12) },
		},
		14: {
			title: "A4",
			description: "A eff exponent +0.1.",
			cost: new Decimal(600),
			unlocked(){ return hasUpgrade('A', 13) },
		},
	},
})
