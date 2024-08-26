addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P0", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF0000",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 11)) mult = mult.times(1.1)
	if (hasUpgrade('p', 12)) mult = mult.times(1.2)
	if (hasUpgrade('p', 13)) mult = mult.times(1.3)
	if (hasUpgrade('p', 14)) mult = mult.times(1.4)
	if (hasUpgrade('p', 15)) mult = mult.times(1.5)
        if (hasUpgrade('p', 31)) mult = mult.times(2)
	if (hasUpgrade('p', 33)) mult = mult.times(upgradeEffect('p', 33))
	if (hasMilestone('p', 1)) mult = mult.times(2.5)
	if (hasUpgrade('p', 34)) mult = mult.times(3)
	if (hasUpgrade('p', 35)) mult = mult.times(5)
	if (hasUpgrade('p', 41)) mult = mult.times(upgradeEffect('p', 41))
	if (hasMilestone('p', 2)) mult = mult.times(3)
	if (hasUpgrade('p', 44)) mult = mult.pow(1.1)
	return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "resource-display",
                "prestige-button",
                "blank",
                "upgrades"
            ],
        },
        "Milestones": {
            content: [
                "main-display",
                "resource-display",
                "prestige-button",
                "blank",
                "milestones"
            ],
        },
    },
    upgrades: {
	11: {
            title: "The first upgrade",
	    description: "Double point gain and ×1.1 prestige points",
	    cost: new Decimal(1),
	},
        12: {
            title: "The second upgrade",
	    description: "×1.5 point gain and ×1.2 prestige points",
	    cost: new Decimal(3),
	    unlocked() { return (hasUpgrade('p', 11)) }
	},
        13: {
            title: "The third upgrade",
	    description: "×2 point gain and ×1.3 prestige points",
	    cost: new Decimal(5),
	    unlocked() { return (hasUpgrade('p', 12)) }
	},
        14: {
            title: "The forth upgrade",
	    description: "×2.5 point gain and ×1.4 prestige points",
	    cost: new Decimal(12),
	    unlocked() { return (hasUpgrade('p', 13)) }
	},
  	15: {
            title: "The fifth upgrade",
	    description: "×3 point gain and ×1.5 prestige points",
	    cost: new Decimal(30),
	    unlocked() { return (hasUpgrade('p', 14)) }
	},
        21: {
            title: "The Sixth Upgrade",
            description: "Multiplies point gain based on points",
            cost: new Decimal(100),
            effect() {
                return player.points.add(1).pow(0.125)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(points+1)<sup>0.125</sup>",
	    unlocked() {return (hasUpgrade('p', 15))}
        },
        22: {
            title: "The Seventh Upgrade",
            description: "Multiplies point gain based on points (again but weakened)",
            cost: new Decimal(250),
            effect() {
                return player.points.add(1).pow(0.110)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(points+1)<sup>0.110</sup>",
	    unlocked() {return (hasUpgrade('p', 21))}
        },
        23: {
            title: "The Eighth Upgrade",
            description: "Multiplies point gain based on points (again but weakened 2)",
            cost: new Decimal(400),
            effect() {
                return player.points.add(1).pow(0.095)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(points+1)<sup>0.095</sup>",
	    unlocked() {return (hasUpgrade('p', 22))}
        },
        24: {
            title: "The Ninth Upgrade",
            description: "Multiplies point gain based on points (again but weakened 3)",
            cost: new Decimal(750),
            effect() {
                return player.points.add(1).pow(0.08)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(points+1)<sup>0.08</sup>",
	    unlocked() {return (hasUpgrade('p', 23))}
        },
        25: {
            title: "The Tenth Upgrade",
            description: "Multiplies point gain based on points (again but weakened 4)",
            cost: new Decimal(1500),
            effect() {
                return player.points.add(1).pow(0.065)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(points+1)<sup>0.065</sup>",
	    unlocked() {return (hasUpgrade('p', 24))}
        },
        31: {
            title: "Upgrade 11",
	    description: "×2 prestige points",
	    cost: new Decimal(2500),
	    unlocked() { return (hasUpgrade('p', 25)) }
	},
        32: {
            title: "Upgrade 12",
	    description: "Boost point gain based on prestige points",
	    cost: new Decimal(6500),
	    effect() {
                return player.p.points.add(1).pow(0.2)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(prestigepoints+1)<sup>0.2</sup>",
	    unlocked() { return (hasUpgrade('p', 31)) }
	},
        33: {
            title: "Upgrade 13",
	    description: "Boost prestige point gain based on prestige points",
	    cost: new Decimal(25000),
	    effect() {
                return player.p.points.add(1).pow(0.05)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(prestigepoints+1)<sup>0.05</sup>",
	    unlocked() { return (hasUpgrade('p', 32)) }
	},
        34: {
            title: "Upgrade 14",
	    description: "×3 prestige points",
	    cost: new Decimal(200000),
	    unlocked() { return (hasUpgrade('p', 33)) }
	},
        35: {
            title: "Upgrade 15",
	    description: "×5 prestige points",
	    cost: new Decimal(1000000),
	    unlocked() { return (hasUpgrade('p', 34)) }
	},
        41: {
            title: "Upgrade 16",
	    description: "Boost prestige point gain based on points",
	    cost: new Decimal(1e7),
	    effect() {
                return player.points.add(1).pow(0.025)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(points+1)<sup>0.025</sup>",
	    unlocked() { return (hasUpgrade('p', 35)) }
	},
        42: {
            title: "Upgrade 17",
	    description: "^1.05 points",
	    cost: new Decimal(2.5e7),
	    unlocked() { return (hasUpgrade('p', 41)) }
	},
        43: {
            title: "Upgrade 18",
	    description: "Raise point gain based on prestige points",
	    cost: new Decimal(1e8),
	    effect() {
                return player.p.points.add(1).pow(0.004)
            },
            effectDisplay() {return '^' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(prestigepoints+1)<sup>0.004</sup>",
	    unlocked() { return (hasUpgrade('p', 42)) }
	},
        44: {
            title: "Upgrade 19",
	    description: "^1.1 prestige points",
	    cost: new Decimal(1e9),
	    unlocked() { return (hasUpgrade('p', 43)) }
	},
   	45: {
            title: "Upgrade 20",
	    description: "Unlock a new layer",
	    cost: new Decimal(5e9),
	    unlocked() { return (hasUpgrade('p', 44)) }
	},
    },
    milestones: {
        1: {
            requirementDescription: "First milestone! (PM1: 50,000 PP)",
            effectDescription: "×2.5 prestige points",
            done() { return player["p"].points.gte("50000") && hasUpgrade('p', 33) },
            unlocked() {return hasUpgrade('p', 33)},
        },
        2: {
            requirementDescription: "Second milestone! (PM1: 20,000,000 PP)",
            effectDescription: "×3 prestige points",
            done() { return player["p"].points.gte("20000000") && hasUpgrade('p', 41) },
            unlocked() {return hasUpgrade('p', 41)},
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
            done() { return (player.points.gte(1)) },
            tooltip: "Get your first point.",	   
        },
        12: {
            name: "Doubled",
            done() { return (hasUpgrade('p', 11)) },
            tooltip: "Buy your first prestige upgrade.",	   
        },
        13: {
            name: "Boosted",
            done() { return (hasUpgrade('p', 21)) },
            tooltip: "Buy your sixth prestige upgrade.",	   
        },
        14: {
            name: "Doubled again",
            done() { return (hasUpgrade('p', 31)) },
            tooltip: "Buy your eleventh prestige upgrade.",	   
        },
        15: {
            name: "Lots",
            done() { return (player.point.gte(1e9)) },
            tooltip: "1e9 points.",	   
        },
	16: {
            name: "Reversed",
            done() { return (hasUpgrade('p', 41)) },
            tooltip: "Buy your sixteenth prestige upgrade.",	   
        },
	21: {
            name: "Resetted",
            done() { return (player.up.points.gte(1)) },
            tooltip: "Get your first upgraded prestige point.",	   
        },
        22: {
            name: "Challenge P1 Complete",
            done() { return (hasChallenge('up', 11)) },
            tooltip: "Get Challenge P1 Complete.",	   
        },
    },
})
