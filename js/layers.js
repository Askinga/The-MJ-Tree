addLayer("pr", {
    name: "Power Rank", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
	        total: new Decimal(0),
	        best: new Decimal(0),
	    	resets: new Decimal(0),
    }},
    color: "#d17c36",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Power Rank", // Name of prestige currency
    baseResource: "Strength", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for Power Rank", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    effect(){
	let base = 1.1
	let eff = new Decimal(base).pow(player.pr.points)
       return eff
       },
        effectDescription() {
            let desc = "which is boosting Strength generation by x" + format(tmp[this.layer].effect);
            return desc;
        },
        tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
	"blank",
	["display-text",
			function() {return ''+(hasMilestone('pr', 1)?"<h1>Strength Upgrades</h1>":"")},
				{}],
	"blank",
	"upgrades",
	"blank",
	["display-text",
			function() {return ''+(hasMilestone('pr', 2)?"<h1>Strength Buyables</h1>":"")},
				{}],
	"blank",
	"buyables",
	"blank",
	["display-text",
			function() {return ''+(player.points.gte(0)?"<h1>Milestones</h1>":"")},
				{}],
	"blank",
	"milestones"
    ],
    milestones: {
    	0: {
        requirementDescription: "2 Power Rank",
        effectDescription: "Power Rank Milestone 1: 2x strength.",
        done() { return player.pr.points.gte(2) }
    	},
    	1: {
        requirementDescription: "4 Power Rank",
        effectDescription: "Power Rank Milestone 2: Unlock Strength Upgrades and 2x Strength.",
        done() { return player.pr.points.gte(4) },
	unlocked(){ return (hasMilestone('pr',0))}
    	},
        2: {
        requirementDescription: "10 Power Rank",
        effectDescription: "Power Rank Milestone 3: Unlock Strength Buyables.",
        done() { return player.pr.points.gte(10) },
	unlocked(){ return (hasMilestone('pr',1))}
    	},
	3: {
        requirementDescription: "2 Strength Buyable 1",
        effectDescription: "Power Rank Milestone 4: 1.5x Strength and unlock more Strength Upgrades",
        done() { return getBuyableAmount('pr', 11).gte(2) },
	unlocked(){ return (hasMilestone('pr',2))}
    	},
    },
    upgrades:{
	11:{
	    title: "#1",
	    description: "1.25x Strength",
	    cost: new Decimal(200),
	    currencyDisplayName: "Strength",
            currencyInternalName: "points",
	    unlocked(){ return (hasMilestone('pr',1))}
	},
    	12:{
	    title: "#2",
	    description: "1.5x Strength",
	    cost: new Decimal(500),
	    currencyDisplayName: "Strength",
            currencyInternalName: "points",
	    unlocked(){ return (hasUpgrade('pr',11))}
	},
   	13:{
	    title: "#3",
	    description: "1.75x Strength",
	    cost: new Decimal(1000),
	    currencyDisplayName: "Strength",
            currencyInternalName: "points",
	    unlocked(){ return (hasUpgrade('pr',12))}
	},
    	14:{
	    title: "#4",
	    description: "2x Strength",
	    cost: new Decimal(2000),
	    currencyDisplayName: "Strength",
            currencyInternalName: "points",
	    unlocked(){ return (hasUpgrade('pr',13))}
	},
    	15:{
	    title: "#5",
	    description: "2.25x Strength",
	    cost: new Decimal(4000),
	    currencyDisplayName: "Strength",
            currencyInternalName: "points",
	    unlocked(){ return (hasUpgrade('pr',14))}
	},
    	21:{
	    title: "#6",
	    description: "2x Strength",
	    cost: new Decimal(100000),
	    currencyDisplayName: "Strength",
            currencyInternalName: "points",
	    unlocked(){ return (hasMilestone('pr',3))}
	},
   	22:{
	    title: "#7",
	    description: "1.75x Strength",
	    cost: new Decimal(200000),
	    currencyDisplayName: "Strength",
            currencyInternalName: "points",
	    unlocked(){ return (hasUpgrade('pr',21))}
	},
   	23:{
	    title: "#8",
	    description: "1.5x Strength",
	    cost: new Decimal(400000),
	    currencyDisplayName: "Strength",
            currencyInternalName: "points",
	    unlocked(){ return (hasUpgrade('pr',22))}
	},
    	24:{
	    title: "#9",
	    description: "1.25x Strength",
	    cost: new Decimal(750000),
	    currencyDisplayName: "Strength",
            currencyInternalName: "points",
	    unlocked(){ return (hasUpgrade('pr',23))}
	},
    	25:{
	    title: "#10",
	    description: "Strength Buyable 1 gives 1.3x per bought instead of 1.25x.",
	    cost: new Decimal(1200000),
	    currencyDisplayName: "Strength",
            currencyInternalName: "points",
	    unlocked(){ return (hasUpgrade('pr',24))}
	},
    },
    buyables: {
    11: {
	title: "Strength Buyable 1",
        cost(x) { return new Decimal(10000).pow(x.mul(0.25).add(1)) },
        display() {
            return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Strength." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Strength gain by x" + format(buyableEffect(this.layer, this.id))
        },
	canAfford() { return player.points.gte(this.cost()) },
        buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked() { return (hasMilestone('pr', 2)) },
	effect(x) {
            let base1 = new Decimal(1.25)
	    if(hasUpgrade('pr',25)) base1 = 1.3
            let base2 = x
	    let expo = new Decimal(1)
            let eff = base1.pow(Decimal.pow(base2, expo))
            return eff
        },
    },
    },
})
