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
		if (hasMilestone('XP', 5)) mult = mult.times(10)
		if (hasMilestone('XP', 8)) mult = mult.times(20)
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
	  let pow = new Decimal(2)
	  if (hasMilestone('XP', 8)) pow = pow.add(1)
      let eff = player.XP.points.pow(pow)
	  if (hasMilestone('XP', 1)) eff = eff.times(tmp.XP.boost1)
	  if (hasMilestone('XP', 6)) eff = eff.times(tmp.XP.boost3)
	  return eff
    },
    effect(){
	  let pow = new Decimal(20)
	  if (hasMilestone('XP', 3)) pow = pow.times(tmp.XP.bigI2)
	  if (hasMilestone('XP', 6)) pow = pow.add(10)
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
	boost3(){
		return player.points.add(1).log(10).add(1)
	},
	boost4(){
		return player.XP.gen.add(1).log(10).div(20).add(1)
	},
	boost5(){
		return player.XP.gen.add(1).pow(0.5)
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
        requirementDescription: "1,250 XP Generators",
        effectDescription(){ return "Boost XP Generators by x5." },
        done() { return player.XP.points.gte(1250) }
    },
	5: {
        requirementDescription: "10,000 XP Generators",
        effectDescription(){ return "Boost XP Generators by x10 and Points by xe35000." },
        done() { return player.XP.points.gte(10000) }
    },
	6: {
        requirementDescription: "e400k points",
        effectDescription(){ return "Boost XP Boosters based on Points and +10 XP Booster base. Currently: x" + format(tmp.XP.boost3) },
        done() { return player.points.gte("e400000") }
    },
	7: {
        requirementDescription: "1,000,000 XP Boosters",
        effectDescription(){ return "Boost 2nd Level Effect Base based on XP Boosters. Currently: x" + format(tmp.XP.boost4) },
        done() { return player.XP.points.gte("1e6") }
    },
	8: {
        requirementDescription: "2,500,000 XP Generators",
        effectDescription(){ return "Boost XP Generators by x20 and +1 XP Generator effect power base." },
        done() { return player.XP.points.gte("2.5e6") }
    },
	9: {
        requirementDescription: "100,000,000 XP Boosters",
        effectDescription(){ return "Boost Extreme Runes based on XP Boosters. Currently: x" + format(tmp.XP.boost5) },
        done() { return player.XP.points.gte("1e8") }
    },
	},
})
