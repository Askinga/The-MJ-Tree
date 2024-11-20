var tree = [["a", "m"], ["s", "d"]]

// Tip: 11 means Column 1, Row 1 for upgrades, milestones, etc
addLayer("c", {
    name: "Computing", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "💻", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    nodeStyle() {return {
        "background": "radial-gradient(#1aad07, #106b04)",
        "width": "100px",
        "height": "100px",
    }
},
componentStyles: {
    "prestige-button"() {return { "background": "radial-gradient(#1aad07, #106b04)",
        "width": "200px",
        "height": "150px",
    }},
},
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#106b04",
    requires() {
        let req = tmp.s.effect
        return req
    }, // Can be a function that takes requirement increases into account
    resource: "Computions", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.startedGame == false && player.points.gte(1))
        {
            player.startedGame = true
	}
        if (player.startedGame && options.musicToggle && !(inChallenge('c', 11) || inChallenge('c', 12) || inChallenge('c', 13)) )
        {
            playAndLoopAudio("music/pointuni.mp3", options.musicVolume/10);
	} else if (player.startedGame && options.musicToggle && (inChallenge("c", 11) || inChallenge("c", 12) || inChallenge("c", 13)) )
        {
            playAndLoopAudio("music/challenge.mp3", options.musicVolume/10);
	} else
        {
            stopAudio();
   	}
    },
    exponent() {
        let exp = 1.625
        return exp
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 99, // Row the layer is in on the tree (0 is the first row)
    displayRow: 0,
    hotkeys: [
        {key: "c", description: "C: Compute something new", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetDescription: 'Reset Everything for ', 
    layerShown(){return true},
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Computing")
    },
    milestones: {
        0: {
            requirementDescription: "1 compution",
            effectDescription: "Compute a muliplier: 1.5x points",
            done() { return player.c.points >= (1) }
	},
        1: {
            requirementDescription: "2 computions",
            effectDescription: "Compute a addition: +3.5 point gain (before mults)",
            done() { return player.c.points >= (2) },
            unlocked() { return (hasMilestone('c', 0)) }
	},
        2: {
            requirementDescription: "3 computions",
            effectDescription: "Compute a new layer: Add Addition layer",
            done() { return player.c.points >= (3) },
            unlocked() { return (hasMilestone('c', 1)) }
	},
        3: {
            requirementDescription: "4 computions",
            effectDescription: "Compute upgrades: +3 upgrades for addition layer",
            done() { return player.c.points >= (4) },
            unlocked() { return (hasMilestone('c', 2)) }
	},
        4: {
            requirementDescription: "5 computions",
            effectDescription: "Compute things: +2 upgrades for addition layer, 1.4x points and +10 point gain",
            done() { return player.c.points >= (5) },
            unlocked() { return (hasMilestone('c', 3)) }
	},
        5: {
            requirementDescription: "6 computions",
            effectDescription: "Compute a new layer: Add Multiplication layer, 1 upgrade for it and 2x points",
            done() { return player.c.points >= (6) },
            unlocked() { return (hasMilestone('c', 4)) }
	},
        6: {
            requirementDescription: "7 computions",
            effectDescription: "Compute things: +2 upgrades for Multiplication layer, 2.5x points",
            done() { return player.c.points >= (7) },
            unlocked() { return (hasMilestone('c', 5)) }
	},
        6: {
            requirementDescription: "7 computions",
            effectDescription: "Compute things: +2 upgrades for Multiplication layer, 2.5x points",
            done() { return player.c.points >= (7) },
            unlocked() { return (hasMilestone('c', 5)) }
	},
        7: {
            requirementDescription: "8 computions",
            effectDescription: "Compute things: +2 upgrades for Multiplication layer, 2x points and Addition",
            done() { return player.c.points >= (8) },
            unlocked() { return (hasMilestone('c', 6)) }
	},
        8: {
            requirementDescription: "9 computions",
            effectDescription: "Compute things: +2 upgrades for Addition layer, 2x points and Addition",
            done() { return player.c.points >= (9) },
            unlocked() { return (hasMilestone('c', 7)) }
	},
        9: {
            requirementDescription: "10 computions",
            effectDescription: "Compute a new layer: Add Division layer and 1.5x points",
            done() { return player.c.points >= (10) },
            unlocked() { return (hasMilestone('c', 8)) }
	},
        10: {
            requirementDescription: "11 computions",
            effectDescription: "Compute a challenge: Add Challenge 1",
            done() { return player.c.points >= (11) },
            unlocked() { return (hasMilestone('c', 9)) }
	},
        11: {
            requirementDescription: "12 computions",
            effectDescription: "Compute a challenge: Add Challenge 2 and also unlock Auto Multiplication!",
            done() { return player.c.points >= (12) },
            unlocked() { return (hasMilestone('c', 10)) },
	    toggles: [["c", "autoMult"]],
	},
        12: {
            requirementDescription: "13 computions",
            effectDescription: "Compute mults: 7.5x points and 4x Addition and also unlock Auto Addition Upgrades!",
            done() { return player.c.points >= (13) },
            unlocked() { return (hasMilestone('c', 11)) },
	    toggles: [["c", "autoAddUp"]],
	},
        13: {
            requirementDescription: "14 computions",
            effectDescription: "Compute a challenge: Add Challenge 3 and 10 times 10x points if you have completed Challenge 3",
            done() { return player.c.points >= (14) },
            unlocked() { return (hasMilestone('c', 12)) }
	},
        14: {
            requirementDescription: "Challenge 3 Complete",
            effectDescription: "Look at the reward for challenge 3",
            done() { return hasChallenge('c', 13) },
            unlocked() { return (hasChallenge('c', 13)) },
	    toggles: [["c", "autoAdd"]],
	},
        15: {
            requirementDescription: "15 computions",
            effectDescription: "Compute a new layer: Add Subtraction layer (SOON)",
            done() { return player.c.points >= (15) },
            unlocked() { return (hasMilestone('c', 14)) }
	},
    },
    bars: {
        bar1: {
            direction: RIGHT,
            width: 300,
            height: 25,
            instant: false,
            fillStyle: { 'background-color': "#106b04" },
	    progress() {
                let prog = player.points.log(getNextAt('c'))
                return prog
	    },
            display() {
                    return "Progress to next Compution"
            },
        },
    },
    tabFormat: {
        "Computing": {
            content: [
                "blank",
                ["bar", "bar1"],
		"blank",
		"main-display",
		"blank",
		"prestige-button",
		"resource-display",
		"blank",
		"challenges",
		"blank",
		"achievements",
		"blank",
		"milestones",
	   ],
	},
        "The Tree Of Math": {
            content: [
                ["blank", "25px"],
		["tree", tree],
            ],
	},	
    },
    challenges: {
        11: {
            name: "Challenge 1: Time Dilation",
            challengeDescription: "Points are raised to the power of 0.80, and add 1 achevement to this layer.",
            canComplete: function() {return player.d.points.gte("1")},
            goalDescription: "Get 1 Division.",
            rewardDescription: "^1.05 points and add 1 upgrade to Division layer",
            unlocked() { return (hasMilestone('c', 10)) },
	},
        12: {
            name: "Challenge 2: Slowdown",
            challengeDescription() {return `Points divide point gain. and SA1 effect is applied, but is 20x instead of 100x!<br>Currently: /${format(player.points.pow(0.3))}`},
            canComplete: function() {return player.d.points.gte("1")},
            goalDescription: "Get 1 Division.",
            rewardDescription: "100x points",
            unlocked() { return (hasMilestone('c', 11)) },
	},
        13: {
            name: "Challenge 3: Malfunctioning",
            challengeDescription() {return `Automation is disabled.`},
            canComplete: function() {return player.points.gte("2.5e20")},
            goalDescription: "Get 2.5e20 Points",
            rewardDescription: "Unlock Auto Addition",
	    unlocked() { return (hasMilestone('c', 13)) },
	},
    },
    achievements: {
        11: {
            name: "Special Ach 1",
            done() { return (player.points.gte(1e9) && inChallenge('c', 11)) },
            tooltip: "Get 1e9 points. Reward: 100x points (only if you are in challenge 1)",	   
            unlocked() { return (inChallenge('c', 11)) },
	},
    },
})
