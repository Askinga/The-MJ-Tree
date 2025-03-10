addLayer("u", {
    name: "Ultra", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol(){
        if (options.layerEmojis == true) symbol = "⚛️"
        else symbol = "U"
        return symbol
    }, // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#6a00ff",
    requires: new Decimal(20000), // Can be a function that takes requirement increases into account
    resource: "Ultra", // Name of prestige currency
    baseResource: "Mega", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    resetDescription(){
          return 'Ultrafy for '
    },
		tooltip(){
      return 'Ultrafy'
    },
    milestones: {
        0: {
            requirementDescription: "1 Ultra",
            effectDescription: "Automate the first row of mega upgrades!",
            done() {return player.u.points.gte(1)}
        },
	1: {
            requirementDescription: "25 Ultra",
            effectDescription: "Automate the second row of mega upgrades!",
            done() {return player.u.points.gte(25)}
        },
	2: {
            requirementDescription: "250 Ultra",
            effectDescription: "Automate the third row of mega upgrades!",
            done() {return player.u.points.gte(250)}
        },
	3: {
            requirementDescription: "1000 Ultra",
            effectDescription: "Automate the fourth row of mega upgrades!",
            done() {return player.u.points.gte(1000)}
        },
    },
    hotkeys: [
        {key: "u", description: "U: Ultrafy.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('m', 45) || player.u.unlocked)},
    branches: ["m"],
    upgrades: {
    11: {
	title: "Recover",
	description: "x10 Points and Super and x3 Mega.",
	cost: new Decimal(1)
      },
    12: {
	title: "Faster.",
	description: "x4 Mega and 5% of Mega per second.",
	cost: new Decimal(1)
      },
    13: {
	title: "Faster!",
	description: "x2 Mega and x5 Mega per second.",
	cost: new Decimal(2)
      },
    14: {
	title: "Big boost",
	description: "x100 Prestige Points.",
	cost: new Decimal(5)
      },
    },
    effect(){
	let effect = new Decimal(1.25)
	return player.u.points.add(1).pow(effect)
      },
      effectDescription(){
	      return 'which is boosting Super by x' + format(layers.u.effect())
      },
})
