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
		if (hasMilestone('XP', 2)) mult = mult.times(tmp.XP.boost2)
		if (hasMilestone('XP', 4)) mult = mult.times(5)
        return mult
    },
    tabFormat: [
      "main-display",
      "prestige-button",
      "resource-display",
      ["display-text", function(){ return "You have " + format(player.XP.gen) + " XP Boosters, boosting XP by x" + format(layers.XP.effect()) }],
      "blank",
      "milestones"
      ],
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    gen(){
      let eff = player.XP.points.pow(2)
	  if (hasMilestone('XP', 1)) eff = eff.times(tmp.XP.boost1)
	  
	  return eff
    },
    effect(){
	  let pow = new Decimal(20)
	  if (hasMilestone('XP', 3)) pow = pow.times(tmp.XP.bigI2)
      return player.XP.gen.add(1).pow(pow)
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
	bigI(){
		return player.XP.gen.add(10).log(10).log(10).add(1).pow(0.4)
	},
	bigI2(){
		return player.XP.gen.add(10).log(10).log(10).add(1).pow(0.6)
	},
	boost1(){
		return new Decimal(1.00035).pow(player.l.level)
	},
	boost2(){
		return player.XP.gen.add(1).log(10).add(1)
	},
    update(diff) {
      let gain = tmp.XP.gen
		
      gain = gain.times(diff)
      player.XP.gen = player.XP.gen.add(gain)
    },
	milestones: {
    0: {
        requirementDescription: "5 XP Generators",
        effectDescription(){ return "Boost points based on XP Boosters. Currently: ^" + format(tmp.XP.bigI, 5) },
        done() { return player.XP.points.gte(5) }
    },
	1: {
        requirementDescription: "20 XP Generators",
        effectDescription(){ return "Boost XP Boosters based on Levels. Currently: x" + format(tmp.XP.boost1) },
        done() { return player.XP.points.gte(20) }
    },
	2: {
        requirementDescription: "40 XP Generators",
        effectDescription(){ return "Buy max Meta Runes and boost XP Generators based on XP Boosters. Currently: x" + format(tmp.XP.boost2) },
        done() { return player.XP.points.gte(40) }
    },
	3: {
        requirementDescription: "500 XP Generators",
        effectDescription(){ return "Boost XP Boosters power based on XP Boosters. Currently: x" + format(tmp.XP.bigI2, 5) },
        done() { return player.XP.points.gte(500) }
    },
	4: {
        requirementDescription: "1250 XP Generators",
        effectDescription(){ return "Boost XP Generators by x5." },
        done() { return player.XP.points.gte(1250) }
    },
	},
})
