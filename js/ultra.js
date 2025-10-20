addLayer("u", {
    name: "ultra runes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "UR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ff6f98",
    requires: new Decimal("e60"), // Can be a function that takes requirement increases into account
    resource: "Ultra Runes", // Name of prestige currency
    baseResource: "Super Runes", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.03, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for ultra runes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('l', 25) || player.u.unlocked)},
   	branches: ["s"],
    effect(){
      return player.u.points.add(1).pow(2.5)
    },
    effectDescription(){
      return "which is boosting XP by x" + format(layers.u.effect())
    },
	upgrades: {
	  11: {
		title: "The ultimate",
		description: "xe100 Points",
		cost: new Decimal(5),
		unlocked(){ return true },
	  },
	},
})
