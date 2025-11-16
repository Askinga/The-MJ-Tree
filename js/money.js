addLayer("money", {
    name: "Money", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "$", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	passiveGeneration(){
		let p = new Decimal(0)
		if (hasUpgrade('money', 12)) p = p.add(1)
		return p
	},
    color: "#278013",
    requires: new Decimal(3000), // Can be a function that takes requirement increases into account
    resource: "$", // Name of prestige currency
    baseResource: "Wood effect exponent", // Name of resource prestige is based on
    baseAmount() {return player.logs.woodPower}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.125, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('money', 12)) mult = mult.times(6)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "M", description: "Shift+M: Reset for $", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('su', 45) || player.money.unlocked)},
	branches: ["logs"],
	upgrades: {
		11: {
			title: "We have money!",
			description: "Boost wood effect exponent based on $",
			cost: new Decimal(1),
			effect(){ return player.money.points.add(2).pow(0.18) },
			effectDisplay(){ return "x"+format(upgradeEffect(this.layer, this.id)) },
		},
		12: {
            title: "Passive money (OP)",
            description: "x6 $ and 100% of Money per second",
            cost: new Decimal(10),
            unlocked(){ return hasUpgrade('money', 11) },
        },
	},
})
