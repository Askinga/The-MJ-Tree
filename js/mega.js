addLayer("m", {
    name: "mega", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol(){ 
	if (options.layerEmojis == true) sym = "✴️"
	else sym = "M"
	return sym
    }, // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
                points: new Decimal(0),
    }},
    color: "#ffad00",
    requires: new Decimal(2.5e6), // Can be a function that takes requirement increases into account
    resource: "Mega", // Name of prestige currency
    baseResource: "Super", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.075, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Mega.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tooltip() {
      return 'Mega'
    },
    resetDescription(){
	return 'Mega for '
    },
    branches: ["s"], 
    layerShown(){return (hasUpgrade('s', 35) || player.m.unlocked)},
})
