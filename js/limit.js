addLayer("limit", {
    name: "how?", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		l: new Decimal(0)
    }},
	onPrestige(){
		player.limit.l = player.limit.l.add(1)
	},
    color: "#e841a0",
    autoPrestige(){ return true },
    requires: new Decimal("ee200000"), // Can be a function that takes requirement increases into account
    resource: "limit points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (player.limit.unlocked) && !(inChallenge('universes', 11))},
   	branches: ["uni"],
    tooltip(){
      return "THE LIMIT"
    },
	limitBoost(){
		if (player.limit.l.lte(6)) {
		    return new Decimal(10).pow(player.limit.l)
		}
		else {
			return new Decimal(1e6).times(player.limit.l.sub(6).pow(3))
		}
	},
	tabFormat: {
		"LIMIT": {
			content: [
				"main-display",
				"blank",
				["display-text", function(){ return "<h1>e1e200000</h1><br>You have reached the limit " + format(player.limit.l) + " times, boosting Log milestone 1 time and Power Rune reset time by x" + format(tmp.limit.limitBoost)}],
				"blank",
				"upgrades",
			],
		},
		"QoL": {
			content: [
				"main-display",
				"blank",
				["display-text", function(){ return "You have reached the limit " + format(player.limit.l) + " times."}],
				"milestones",
			],
		},
	},
	upgrades: {
		11: {
			title: "Congrats.",
			description: "You've reached the limit, gain x10 bonus to every non-static currency. (Row 5 & 6)",
			cost: new Decimal(1)
		},
		12: {
			title: "Lets get to boosting",
			description: "x200 Universal Runes",
			cost: new Decimal(1),
			unlocked(){ return hasUpgrade("limit", 11) },
		},
	},
	milestones: {
    0: {
        requirementDescription: "Limit reached 1 time",
        effectDescription: "Keep Supreme Rune milestones",
        done() { return player.limit.l.gte(1) }
    },
	1: {
        requirementDescription: "Limit reached 2 times",
        effectDescription: "Keep Universal Rune milestones",
        done() { return player.limit.l.gte(2) }
    },
	2: {
        requirementDescription: "Limit reached 4 times",
        effectDescription: "Power Rune Upgrade 5's QoL is kept",
        done() { return player.limit.l.gte(4) }
    },
	3: {
        requirementDescription: "Limit reached 6 times",
        effectDescription: "Autobuy Power Rune upgrades",
        done() { return player.limit.l.gte(6) }
    },
	},
})
