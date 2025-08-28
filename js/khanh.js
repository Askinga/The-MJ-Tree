addLayer("kh", {
    name: "Khanh", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Kh", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#57ffad",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "Khanh", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.01, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
	canReset(){ return false },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["r"],
    tooltip(){ return "Khanh" },
    layerShown(){return (getBuyableAmount('r', 11).gte(25))},
	tabFormat: [
		"buyables",
		"resource-display"
    ],
	buyables: {
    11: {
		title: "Khanh",
        cost(x) { return new Decimal(1.5).pow(x).times(1000) },
        display() { return "Boost point gain based on points. Gets stronger per level.<br>Cost: " + format(this.cost()) + " points<br>Bought: " + format(getBuyableAmount('kh', 11)) + "<br>Effect: x" + format(buyableEffect('kh', 11)) + " points" },
        canAfford() { return player.points.gte(this.cost()) },
        buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(0.01)
			let base2 = x
			let expo = new Decimal(1)
			return player.points.add(1).pow(base1.times(base2.pow(0.5)))
		},
    },
	},
})
