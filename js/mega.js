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
	if(hasUpgrade('m',15)) mult = mult.times(2)
	if(hasUpgrade('m',23)) mult = mult.times(3)
	if(hasUpgrade('m',24)) mult = mult.times(2)
	if(hasUpgrade('m',34)) mult = mult.times(upgradeEffect('m',34))
	if(hasUpgrade('u',11)) mult = mult.times(3)
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
    automate(){
	if (hasMilestone('u', 0)) {
		buyUpgrade('m', 11);
		buyUpgrade('m', 12);
		buyUpgrade('m', 13);
		buyUpgrade('m', 14);
		buyUpgrade('m', 15);
	}
	if (hasMilestone('u', 1)) {
		buyUpgrade('m', 21);
		buyUpgrade('m', 22);
		buyUpgrade('m', 23);
		buyUpgrade('m', 24);
		buyUpgrade('m', 25);
	}
	if (hasMilestone('u', 2) ) {
		buyUpgrade('m', 31);
		buyUpgrade('m', 32);
		buyUpgrade('m', 33);
		buyUpgrade('m', 34);
		buyUpgrade('m', 35);
	}
	if (hasMilestone('u', 3) ) {
		buyUpgrade('m', 41);
		buyUpgrade('m', 42);
		buyUpgrade('m', 43);
		buyUpgrade('m', 44);
		buyUpgrade('m', 45);
	}
    },
    milestones: {
        0: {
            requirementDescription: "1 Mega",
            effectDescription: "Automate the first row of super upgrades!",
            done() {return player.m.points.gte(1)}
        },
	1: {
            requirementDescription: "25 Mega",
            effectDescription: "Automate the second row of super upgrades!",
            done() {return player.m.points.gte(25)}
        },
	2: {
            requirementDescription: "250 Mega",
            effectDescription: "Automate the third row of super upgrades!",
            done() {return player.m.points.gte(250)}
        },
    },
    upgrades: {
      11: {
	title: "We reached mega!",
	description: "x5 Points and Prestige Points and x3 Super.",
	cost: new Decimal(1)
      },
      12: {
	title: "Mega Boosts",
	description: "x4 Super and 5% of Super per second.",
	cost: new Decimal(1),
	unlocked(){ return hasUpgrade('m', 11)}
      },
      13: {
	title: "Early speed up",
	description: "x7.5 prestige points",
	cost: new Decimal(2),
	unlocked(){ return hasUpgrade('m', 12)}
      },
      14: {
	title: "Mega Boosts 2",
	description: "x3.5 Super and x5 Super per second.",
	cost: new Decimal(5),
	unlocked(){ return hasUpgrade('m', 13)}
      },
      15: {
	title: "Self Mega Boost",
	description: "x2 Mega.",
	cost: new Decimal(10),
	unlocked(){ return hasUpgrade('m', 14)}
      },
      21: {
	title: "Big Point Boost",
	description: "x10 Points.",
	cost: new Decimal(25),
	unlocked(){ return hasUpgrade('m', 15)}
      },
      22: {
	title: "Effect Boost",
	description: "+^0.25 Mega effect.",
	cost: new Decimal(30),
	unlocked(){ return hasUpgrade('m', 21)}
      },
      23: {
	title: "More Mega!",
	description: "x3 Mega",
	cost: new Decimal(40),
	unlocked(){ return hasUpgrade('m', 22)}
      },
      24: {
	title: "Even More Mega!",
	description: "x2 Mega",
	cost: new Decimal(100),
	unlocked(){ return hasUpgrade('m', 23)}
      },
      25: {
	title: "Faster!",
	description: "x5 Super.",
	cost: new Decimal(250),
	unlocked(){ return hasUpgrade('m', 24)}
      },
      31: {
	title: "Effect Booster",
	description: "Boost the Mega Effect based on points.",
	cost: new Decimal(400),
	effect(){
	    return player.points.add(1).pow(0.001)
	},
	effectDisplay(){
	    return '^'+format(upgradeEffect(this.layer, this.id))
	},
	unlocked(){ return (hasUpgrade('m', 25))}
      },
      32: {
	title: "Mega Growing",
	description: "Boost prestige points based on Mega.",
	cost: new Decimal(500),
	effect(){
	    return player[this.layer].points.add(1).pow(0.75)
	},
	effectDisplay(){
	    return format(upgradeEffect(this.layer, this.id))+'x'
	},
	unlocked(){ return (hasUpgrade('m', 31))}
      },
      33: {
	title: "Mega Growing 2",
	description: "Boost Super based on Mega.",
	cost: new Decimal(600),
	effect(){
	    return player[this.layer].points.add(1).pow(0.4)
	},
	effectDisplay(){
	    return format(upgradeEffect(this.layer, this.id))+'x'
	},
	unlocked(){ return (hasUpgrade('m', 32))}
      },
      34: {
	title: "Mega Growing 3",
	description: "Boost Mega based on points.",
	cost: new Decimal(1000),
	effect(){
	    mult = new Decimal(1)
	    if(hasUpgrade('m',41)) mult = mult.times(upgradeEffect('m',41))
	    if(hasUpgrade('m',43)) mult = mult.times(upgradeEffect('m',43))
	    if(hasUpgrade('m',44)) mult = mult.times(2)
	    return player.points.add(1).pow(0.005).times(mult)
	},
	effectDisplay(){
	    return format(upgradeEffect(this.layer, this.id))+'x'
	},
	unlocked(){ return (hasUpgrade('m', 33))}
      },
      35: {
	title: "Mega Growing 4",
	description: "Boost Points based on points.",
	cost: new Decimal(1000),
	effect(){
	    return player.points.add(1).log(5).pow(2.5).add(1)
	},
	effectDisplay(){
	    return format(upgradeEffect(this.layer, this.id))+'x'
	},
	unlocked(){ return (hasUpgrade('m', 34))}
      },
      41: {
	title: "Mega Growing 5",
	description: "Boost Mega Growing 3 based on points.",
	cost: new Decimal(1250),
	effect(){
	    return player.points.add(1).log(10).pow(0.3).add(1)
	},
	effectDisplay(){
	    return format(upgradeEffect(this.layer, this.id))+'x'
	},
	unlocked(){ return (hasUpgrade('m', 35))}
      },
      42: {
	title: "More Points",
	description: "x10 points.",
	cost: new Decimal(3000),
	unlocked(){ return hasUpgrade('m', 41)}
      },
      43: {
	title: "Mega Growing 6",
	description: "Boost Mega Growing 3 based on prestige points.",
	cost: new Decimal(3500),
	effect(){
	    return player.p.points.add(1).pow(0.01)
	},
	effectDisplay(){
	    return format(upgradeEffect(this.layer, this.id))+'x'
	},
	unlocked(){ return (hasUpgrade('m', 42))}
      },
      44: {
	title: "More Mega",
	description: "x2 Mega Growing 3 effect.",
	cost: new Decimal(8000),
	unlocked(){ return hasUpgrade('m', 43)}
      },
      45: {
	title: "NEXT LAYER!",
	description: "Unlock a new layer.",
	cost: new Decimal(20000),
	unlocked(){ return hasUpgrade('m', 44)}
      },
	      },
      effect(){
	let effect = new Decimal(1.5)
	if(hasUpgrade('m', 22)) effect = effect.add(0.25)
	if(hasUpgrade('m', 31)) effect = effect.times(upgradeEffect('m', 31))
	return player.m.points.add(1).pow(effect)
      },
      effectDescription(){
	      return 'which is boosting points by x' + format(layers.m.effect())
      },
	
})
