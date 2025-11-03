addLayer("XP", {
    name: "generators", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    gen: new Decimal(0),
    }},
    color: "#24e0d1",
    requires: new Decimal("e458"), // Can be a function that takes requirement increases into account
    resource: "XP Generators", // Name of prestige currency
    baseResource: "Ultra Runes", // Name of resource prestige is based on
    baseAmount() {return player.u.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.005, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    tabFormat: [
      "main-display",
      "prestige-button",
      "resource-display",
      ["display-text", function(){ return "You have " + format(player.XP.gen) + " XP Boosters, boosting XP by x" + format(layers.XP.effect()) }],
      "blank",
      "upgrades"
      ],
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    gen(){
      return player.XP.points.pow(2)
    },
    effect(){
      return player.XP.gen.add(1).pow(20)
    },
    effectDescription(){
      return "which is generating " + format(tmp.XP.gen) + " XP Boosters per second"
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for XP Generators", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('e', 35) || player.XP.unlocked)},
	  branches: ["u"],
	power(){
		let eff = player.XP.gen.add(10).log(10).log(10).add(1).pow(0.4)
		return eff
	},
    update(diff) {
      let gain = tmp.XP.gen

      gain = gain.times(diff)
      player.XP.gen = player.XP.gen.add(gain)
    },
	milestones: {
    0: {
        requirementDescription: "5 XP Generators",
        effectDescription(){ return "Boost points based on XP Boosters. Currently: ^" + format(tmp.XP.power) },
        done() { return player.XP.points.gte(5) }
    },
	},
})
