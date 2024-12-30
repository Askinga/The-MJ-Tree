addLayer("g", {
    name: "Generators",
    symbol: "G",
    position: 1,
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0), 
        gp: new Decimal(0), 
        gpg: new Decimal(0)// "points" is the internal name for the main resource of the layer.
    }},
    color: "#009900",                       // The color for this layer, which affects many elements.
    resource: "generators",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    baseResource: "prestige points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p.points },  // A function to return the current amount of baseResource.
    onPrestige() {
	if(!hasUpgrade('r',21)) {
		player.g.gp = player.g.gp.sub(player.g.gp)
    }},
    requires(){
	let req = new Decimal("e10")
	return req
    },              // The amount of the base needed to gain 1 of the prestige currency.                                    // Also the amount required to unlock the layer
    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 1.5,                          // "normal" prestige gain is (currency^exponent).
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        mult = new Decimal(1)               // Factor in any bonuses multiplying gain here.
    	return mult
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    layerShown(){
        let visible = false
        if (hasUpgrade('b', 25) || player.g.unlocked) visible = true
       return visible
},          // Returns a bool for if this layer's node should be visible in the tree.
    branches: ["p"],
    hotkeys: [
        {key: "g", description: "G: Reset for generators", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    genPowerEffect() {
	return (player.g.gp.add(1).pow(0.5))
		},
    effect(){
       let base = 2
	if(hasUpgrade('g',14)) base = 2.1
	if(hasUpgrade('r',15)) base = 3
	if(inChallenge('r',21)) base = 1.025
	let eff = new Decimal(base).pow(player.g.points).sub(1)
       return eff
       },
        effectDescription() {
            let desc = "which is generating " + format(tmp[this.layer].effect) + " Generator Power per second.";
            return desc;
        },
    update(diff) {
            player.g.gp = player.g.gp.add(tmp.g.effect.mul(diff))
    },
    autoPrestige(){return(hasUpgrade('r',21))},
    autoUpgrade(){return(hasUpgrade('r',21))},
    resetsNothing(){return(hasUpgrade('r',21))},
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "blank",
        ["display-text", () => "You have " + format(player.g.gp) + " generator power, which is multiplying point generation by " + format(tmp.g.genPowerEffect)],
        "blank",
	"upgrades"
    ],
    upgrades: {
	11: {
	    title: "Point++",
	    description: "Point generation is multiplied by 5.",
	    cost: new Decimal(4)
	},
        12: {
	    title: "GP -> Prestige",
	    description: "Boost prestige points based on generator power",
	    cost: new Decimal(5),
	    effect() {
		return player[this.layer].gp.add(1).pow(0.1)
	    },
	    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
	    tooltip(){
		return "(GP+1)<sup>0.1</sup>"
	    },
	    unlocked(){return (hasUpgrade('g', 11))}
	},
        13: {
	    title: "Generators -> Points",
	    description: "Boost point generation based on generators",
	    cost: new Decimal(6),
	    effect() {
		let base = 1.2
		if(hasUpgrade('g',15)) base = 1.3
		if(hasUpgrade('g',24)) base = 1.35
		return new Decimal(base).pow(player.g.points)
	    },
	    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
	    tooltip(){
		return "base<sup>generators</sup>"
	    },
	    unlocked(){return (hasUpgrade('g', 12))}
	},
        14: {
	    title: "Generator+",
	    description: "Generator base is now 2.1 instead of 2.",
	    cost: new Decimal(16125),
	    currencyDisplayName: "Generator Power",
            currencyInternalName: "gp",
            currencyLayer: "g",
	    unlocked(){return (hasUpgrade('g', 13))}
	},
        15: {
	    title: "Upgraded Upgrade",
	    description: "Generator upgrade 3 is better.",
	    cost: new Decimal(50000),
	    currencyDisplayName: "Generator Power",
            currencyInternalName: "gp",
            currencyLayer: "g",
	    tooltip(){
		return "1.2x per generator -> 1.3x per generator"
	    },
	    unlocked(){return (hasUpgrade('g', 14))}
	},
        21: {
	    title: "Prestige++",
	    description: "Prestige point gain is multiplied by 5",
	    cost: new Decimal(52530),
	    currencyDisplayName: "Generator Power",
            currencyInternalName: "gp",
            currencyLayer: "g",
	    unlocked(){return (hasUpgrade('g', 15))}
	},
        22: {
	    title: "Powered Points",
	    description: "Point generation is raised to the power of 1.025",
	    cost: new Decimal(8),
	    unlocked(){return (hasUpgrade('g', 21))}
	},
        23: {
	    title: "I don't like buying all the prestige upgrade every reset.",
	    description: "Automate buying prestige upgrades!",
	    cost: new Decimal(9),
	    unlocked(){return (hasUpgrade('g', 22))}
	},
        24: {
	    title: "Upgraded Upgrade 2",
	    description: "Generator upgrade 3 is better again.",
	    cost: new Decimal(500000),
	    currencyDisplayName: "Generator Power",
            currencyInternalName: "gp",
            currencyLayer: "g",
	    tooltip(){
		return "1.3x per generator -> 1.35x per generator"
	    },
	    unlocked(){return (hasUpgrade('g', 23))}
	},
        25: {
	    title: "Finished with generators",
	    description: "Unlock a new layer.",
	    cost: new Decimal(10),
	    unlocked(){return (hasUpgrade('g', 24))}
	},
    },
})
