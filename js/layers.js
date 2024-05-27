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
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 23)) mult = mult.times(3)
	if (hasUpgrade('p', 24)) mult = mult.times(upgradeEffect('p', 24))
	return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

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
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
	    unlocked() { return (hasUpgrade('p', 13)) },
	},
        15: {
            title: "Challenge time!",
            description: "Unlock a challenge.",
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
                eff = softcap(eff, new Decimal("3"), 0.5)
                return eff
	    },
            effectDisplay() { // Add formatting to the effect
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("3")) ) {
                    softcapDescription = " (Softcapped)"
		}
	        return "This upgrade raises points by " "^" + format(upgEffect) + softcapDescription
            },
	    unlocked() { return (hasChallenge('p', 11)) },
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
	},
    },
    challenges: {
        11: {
            name: "Prestige Challenge 1",
            challengeDescription: "^0.15 points.",
            canComplete: function() {return player.points.gte("40")},
            goalDescription: "Get 40 points.",
            rewardDescription: "×2 points and unlock upgrade 6",
	    unlocked() { return (hasUpgrade('p', 15)) },
	},
    },
})
