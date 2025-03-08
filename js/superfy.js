addLayer("s", {
    name: "superfy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol(){ 
	if (options.layerEmojis == "true") sym = "❇️"
	else sym = "S"
	return sym
    }, // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
                points: new Decimal(0),
    }},
    color: "#36ad56",
    requires: new Decimal(5e7), // Can be a function that takes requirement increases into account
    resource: "Super", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.15, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Superfy.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tooltip() {
      return 'Superfy'
    },
    resetDescription(){
	return 'Superfy for '
    },
    branches: ["p"], 
    layerShown(){return (hasUpgrade('p', 35) || player.s.unlocked)},
    upgrades: {
	11: {
	title: "Start The Prestige Zen... again?",
	description: "x2 Points and Prestige Points",
	cost: new Decimal(1)
      },
    },
})
