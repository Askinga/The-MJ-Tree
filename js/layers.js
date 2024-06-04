addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    passiveGeneration() {
	if (hasUpgrade('au', 11)) return 0.1
	return 0
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (layers.up.effect().gte(1)) mult = mult.times(layers.up.effect())
	if (hasUpgrade('p', 23)) mult = mult.times(3)
	if (hasUpgrade('p', 24)) mult = mult.times(upgradeEffect('p', 24))
	if (hasUpgrade('p', 33)) mult = mult.times(upgradeEffect('p', 33))
	if (hasMilestone('p', 1)) mult = mult.times(1.75)
	return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetDescription: 'Reset points for ',
    layerShown(){return true},
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                "resource-display",
                "prestige-button",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "milestones",
                "upgrades"
            ],
        },
        "Challenges": {
            content: [
                ["infobox", "challenge"],
                "main-display",
                "blank",
                "blank",
                "challenges"
            ],
        },
    },
    upgrades: {
        11: {
            title: "Start off",
            description: "Get 1 point every second.",
            cost: new Decimal(0),
        },
        12: {
            title: "More points",
            description: "+1 point gain per second.",
            cost: new Decimal(1),
            unlocked() { return (hasUpgrade('p', 11)) },
	},
        13: {
            title: "It's time for a exponent!",
            description: "^1.2 points.",
            cost: new Decimal(3),
            unlocked() { return (hasUpgrade('p', 12)) },
	},
        14: {
            title: "Point booster",
            description: "Multiply point gain based on points.",
            cost: new Decimal(5),
            effect(){
                let expu3 = 0.15
                let eff = player.points.add(1).pow(expu3)
                eff = softcap(eff, new Decimal("1000"), 0.5)
                return eff
	    },
            effectDisplay() { // Add formatting to the effect
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("1000")) ) {
                    softcapDescription = " (Softcapped)"
		}
	        return "This upgrade boosts points by x" + format(upgEffect) + softcapDescription
            },
	    unlocked() { return (hasUpgrade('p', 13)) },
	    tooltip: "points+1(^0.15) softcap when effect 1000",
	},
        15: {
            title: "Challenge time!",
            description: "Unlock a challenge. (only if you do not buy automation upgrade 3)",
            cost: new Decimal(8),
            unlocked() { return (hasUpgrade('p', 14)) },
	},
        21: {
            title: "Point raiser",
            description: "Raise point gain based on prestige points.",
            cost: new Decimal(20),
            effect(){
                let expu3 = 0.075
                let eff = player.p.points.add(1).pow(expu3)
                eff = softcap(eff, new Decimal("1.5"), 0.3)
                return eff
	    },
            effectDisplay() { // Add formatting to the effect
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("1.5")) ) {
                    softcapDescription = " (Softcapped)"
		}
	        return "This upgrade raises points by ^" + format(upgEffect) + softcapDescription
            },
	    unlocked() { return (hasChallenge('p', 11)) || hasUpgrade('au', 13) },
	    tooltip: "prestige points+1(^0.075) softcap when effect 1.5",
	},
        22: {
            title: "Point multiplier",
            description: "×1.5 points.",
            cost: new Decimal(25),
            unlocked() { return (hasUpgrade('p', 21)) },
	},
        23: {
            title: "Prestige multiplier",
            description: "×3 prestige points.",
            cost: new Decimal(42),
            unlocked() { return (hasUpgrade('p', 22)) },
	},
        24: {
            title: "Prestige booster",
            description: "Multiply prestige point gain based on points.",
            cost: new Decimal(160),
            effect(){
                return player.points.add(1).pow(0.06)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	    unlocked() { return (hasUpgrade('p', 23)) },
	    tooltip: "points+1^(0.06)",
	},
        25: {
            title: "MORE POINTS!!!",
            description: "^1.3 points.",
            cost: new Decimal(232),
            unlocked() { return (hasUpgrade('p', 24)) },
	},
        31: {
            title: "Point booster 2",
            description: "Multiply point gain based on prestige points.",
            cost: new Decimal(400),
            effect(){
                return player.p.points.add(1).pow(0.175)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	    unlocked() { return (hasUpgrade('p', 25)) },
	    tooltip: "prestige points+1(^0.175)",
	},
        32: {
            title: "Oh no",
            description: "Unlock another challenge. (only if you do not buy automation upgrade 3)",
            cost: new Decimal(1500),
            unlocked() { return (hasUpgrade('p', 31)) },
	},
        33: {
            title: "Self Prestige Boost",
            description: "Multiply prestige point gain based on prestige points.",
            cost: new Decimal(4000),
            effect(){
                return player.p.points.log(10).add(2).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	    unlocked() { return (hasChallenge('p', 12)) || hasUpgrade('au', 13) },
	    tooltip: "log10(prestige points+2(^0.2)",
	},
        34: {
            title: "Milestone time!",
            description: "Unlock a milestone.",
            cost: new Decimal(6500),      
            unlocked() { return (hasUpgrade('p', 33)) },
	},
        35: {
            title: "Lets unlock something new!!",
            description: "Unlock a new layer.",
            cost: new Decimal(15000),      
            unlocked() { return (hasMilestone('p', 1)) },
	},
    },
    challenges: {
        11: {
            name: "Prestige Challenge 1",
            challengeDescription: "^0.15 points.",
            canComplete: function() {return player.points.gte("40")},
            goalDescription: "Get 40 points.",
            rewardDescription: "×2 points and unlock upgrade 6",
	    unlocked() { return (hasUpgrade('p', 15)) && !hasUpgrade('au', 13) },
	},
        12: {
            name: "Prestige Challenge 2",
            challengeDescription: "^0.1 and /10 points.",
            canComplete: function() {return player.points.gte("50")},
            goalDescription: "Get 50 points.",
            rewardDescription: "×2 points again and unlock upgrade 13",
	    unlocked() { return (hasUpgrade('p', 32)) && !hasUpgrade('au', 13) },
	},
    },
    infoboxes: {
        challenge: {
            title: "Challenges",
            body() { return "Challenges give a set of nerfs to your progression, but when you finish them, you get a boost!" },
        },
    },
    milestones: {
        1: {
            requirementDescription: "First milestone! (PM1: 4000 PP)",
            effectDescription: "×1.75 prestige points and unlock a new upgrade",
            done() { return player["p"].points.gte("4000") && hasUpgrade('p', 34) },
            unlocked() {return hasUpgrade('p', 34)},
        },
    },
    automate() {
            if(hasUpgrade('au', 12)) {
                buyUpgrade('p', 11)
                buyUpgrade('p', 12)
                buyUpgrade('p', 13)
                buyUpgrade('p', 14)
                buyUpgrade('p', 15)
	}
    },
    effect(){
    let rpow = 0.075
    if (hasUpgrade('up', 11)) rpow = 0.1
	let eff = player.p.points.add(1).pow(rpow)
       return eff
        },
        effectDescription() {
            let desc = "which is boosting points by x" + format(tmp[this.layer].effect);
            return desc;
        },
})

addLayer("up", {
    name: "Upgraded Prestige Points",
    symbol: "U",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    nodeStyle: {
	"border-radius": "100%",
	"width": "110px",
	"height": "100px"
    },
    color: "#7ecfc4",
    requires() {
        let req = new Decimal(6000000)
        if (hasUpgrade('up', 12)) req = req.div(upgradeEffect('up', 12))
        return req
    }, // Can be a function that takes requirement increases into account
    resource: "upgraded prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for upgraded prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetDescription: 'Reset prestige and points for ',
    layerShown(){
        let visible = false
        if (hasUpgrade('p', 35) || player.up.unlocked) visible = true
       return visible
    },
    branches:["p"],
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                "resource-display",
                "prestige-button",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "upgrades"
            ],
        },
    },
    upgrades: {
        11: {
            title: "Effect increase",
            description: "Improve prestige effect.",
            cost: new Decimal(2),
            tooltip: "^0.1 instead of ^0.075",
	},
        12: {
            title: "Layer divider",
            description: "Divide layer requirement based on points.",
            cost: new Decimal(3),
            effect(){
                return player.points.log(10).add(2).pow(0.5)
            },
            effectDisplay() { return "÷"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
	    unlocked() { return (hasUpgrade('up', 11)) },
	    tooltip: "log10(points+2(^0.5))",
	},
        13: {
            title: "Unlock",
            description: "Unlock something new!.",
            cost: new Decimal(4),
            tooltip: "A new layer",
	},
    },
    effect(){
    let rapow = 0.625
	let eff = player.up.points.add(1).pow(rapow)
       return eff
        },
        effectDescription() {
            let desc = "which is boosting points and prestige points by x" + format(tmp[this.layer].effect);
            return desc;
        },
})

addLayer("au", {
    name: "Automation",
    symbol: "Au",
    position: 3,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#800000",
    requires() {
        let req = new Decimal(10000000)
        return req
    }, // Can be a function that takes requirement increases into account
    resource: "automation points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.6, // Prestige currency exponent
    resetsNothing: return true,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    autoPrestige() {return true},
    layerShown(){
        let visible = true
       return visible
    },
    tabFormat: {
        Difficulty:{
            unlocked() {return false},
        content:[
            ["display-text", function() { return '<h2>Automation</h2>' }],
            ["display-text", "Here is automation. In this layer, there is going to be automation 😊"],
	    "main-display",
            "resource-display",
            "prestige-button",
	    "blank",
	    "upgrades",
	],
        },
    },
    upgrades: {
        11: {
            title: "Passive generation",
            description: "Get 10% of prestige points every second.",
            cost: new Decimal(1),
        },
        12: {
            title: "Automation",
            description: "Automate the first 5 prestige upgrades",
            cost: new Decimal(2),
            unlocked() { return (hasUpgrade('au', 11)) },
	},
        13: {
            title: "No more grinding",
            description: "Prestige challenges are removed, but you gain their rewards",
            cost: new Decimal(4),
	    unlocked() { return (hasUpgrade('au', 12)) },
	},
    },
})

addLayer("🏆", {
    startData() { return {
        unlocked: true,
    }},
    color: "yellow",
    position: 1,
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    tabFormat: {
        "Achievements": {
            content: [
                "achievements",
                "blank",
                ],
        },
    },
    achievements: {
        rows: 25,
        cols: 6,
        11: {
            name: "Start off",
            done() { return (hasUpgrade('p', 11)) },
            tooltip: "Get prestige upgrade 1.",	   
        },
        12: {
            name: "Exponent",
            done() { return (hasUpgrade('p', 13)) },
            tooltip: "Get prestige upgrade 3.",	   
        },
        13: {
            name: "Challenges",
            done() { return (hasUpgrade('p', 15)) },
            tooltip: "Get prestige upgrade 5.",	   
        },
        14: {
            name: "Exponential boost",
            done() { return (hasUpgrade('p', 21)) },
            tooltip: "Get prestige upgrade 6.",	   
        },
        15: {
            name: "Prestige booster",
            done() { return (hasUpgrade('p', 24)) },
            tooltip: "Get prestige upgrade 9.",	   
        },
        16: {
            name: "Big point booster",
            done() { return (hasUpgrade('p', 25)) },
            tooltip: "Get prestige upgrade 10.",	   
        },
        21: {
            name: "Big requirement",
            done() { return player.points.gte(1e10) },
            tooltip: "Get 10B points.",	   
        },
    },
})

addLayer("s", {
    name: "Super Points",
    symbol: "S",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#83f7a2",
    requires() {
        let req = new Decimal(1e10)
        return req
    }, // Can be a function that takes requirement increases into account
    resource: "super points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    canReset: return false,
    exponent: 1.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	return mult
    },



    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){
        let visible = false
        if (hasUpgrade('up', 13) || player.s.unlocked) visible = true
       return visible
    },
    clickables: {
    11: {
        display() {return "Click for a super point!"},
        onClick() { return player.s.points.add(1) }
    },
    },
})
