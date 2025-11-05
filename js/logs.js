addLayer("logs", {
    name: "Logs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🪵", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#735245",
    requires: new Decimal("e1.8e6"), // Can be a function that takes requirement increases into account
    resource: "Logs", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000002, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    resetsNothing(){ return true },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasMilestone('XP', 12) || player.logs.unlocked)},
	branches: ["m"],
    effect(){
      return player.logs.points.add(1).pow(25000)
    },
    effectDescription(){
      return 'which is boosting Points by x' + format(layers.logs.effect())
    },
})
