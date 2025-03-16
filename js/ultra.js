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
	        ultraPoints: new Decimal(0)
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
	if(hasUpgrade('u',15)) mult = mult.times(2)
	if(hasUpgrade('u',24)) mult = mult.times(5)
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
    tabFormat: {
	main: {
	    content: [
		"main-display",
		"blank",
		"prestige-button",
		"resource-display",
		"blank",
		"milestones",
		"blank",
		"upgrades",
	    ]
	},
	UltraPoints: {
	    unlocked(){ return (hasUpgrade('u', 25))},
		content: [
		    "main-display",
		    "blank",
		    "prestige-button",
		    "resource-display",
		    "blank",
		    ["display-text", function(){ return 'You have ' + format(player.u.ultraPoints) + ' Ultra Points, which boost Points by x' + format(tmp.u.ultraPointsEffect)}],
		    "blank",
		]
	},
    },
    ultraPointsEffect(){
	let pow = 3   
	let eff = player.u.ultraPoints.add(1).pow(pow)
	return eff
    },
    automate(){
	if(hasUpgrade('u',25)) {
		player.u.ultraPoints = new Decimal(player.u.points.add(1).pow(0.1).times(player.points.add(1).log(10).add(1)).div(200))
	}
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
	cost: new Decimal(1),
	unlocked(){ return (hasUpgrade('u',11))}
      },
    13: {
	title: "Faster!",
	description: "x2 Mega and x5 Mega per second.",
	cost: new Decimal(2),
	unlocked(){ return (hasUpgrade('u',12))}
      },
    14: {
	title: "Big boost",
	description: "x100 Prestige Points.",
	cost: new Decimal(5),
	unlocked(){ return (hasUpgrade('u',13))}
      },
    15: {
	title: "Ultra is Slow.",
	description: "x2 Ultra, x3 Mega and x5 Super.",
	cost: new Decimal(10),
	unlocked(){ return (hasUpgrade('u',14))}
      },
    21: {
	title: "A new Buyable!",
	description: "Unlock a buyable.",
	cost: new Decimal(25),
	unlocked(){ return (hasUpgrade('u',15))}
      },
    22: {
	title: "Upgrade Boost",
	description: "+^2 Prestige Up 1 effect.",
	cost: new Decimal(25),
	unlocked(){ return (hasUpgrade('u',21))}
      },
    23: {
	title: "Xtra",
	description: "+^0.01 Prestige Points.",
	cost: new Decimal(30),
	unlocked(){ return (hasUpgrade('u',22))}
      },
    24: {
	title: "Xtra+",
	description: "x5 Ultra.",
	cost: new Decimal(35),
	unlocked(){ return (hasUpgrade('u',23))}
      },
    25: {
	title: "First Sub Currency!",
	description: "Unlock Ultra Points.",
	cost: new Decimal(200),
	unlocked(){ return (hasUpgrade('u',24))}
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
