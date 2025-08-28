addLayer("r", {
    name: "reily", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#6de1ff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Reily", // Name of prestige currency
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
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tooltip(){ return "Reily" },
    layerShown(){return true},
	tabFormat: [
		"buyables",
		"resource-display"
    ],
	buyables: {
    11: {
		title: "Reily",
        cost(x) { return new Decimal(1.2).pow(x).times(10) },
        display() { return "x1.125 points<br>Cost: " + format(this.cost()) + " points<br>Bought: " + format(getBuyableAmount('r', 11)) + "<br>Effect: x" + format(buyableEffect('r', 11)) + " points" },
        canAfford() { return player.points.gte(this.cost()) },
        buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1.125)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
    },
	},
})
