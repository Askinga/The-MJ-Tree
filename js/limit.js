addLayer("limit", {
    name: "how?", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		l: new Decimal(0),
		power: new Decimal(0),
		limitOff: new Decimal(0),
		allocate: new Decimal(0),
		allo1: new Decimal(0),
		allo2: new Decimal(0),
		allo3: new Decimal(0),
    }},
	onPrestige(){
		player.limit.l = player.limit.l.add(tmp.limit.alo3)
	},
    color: "#e841a0",
    autoPrestige(){ return player.limit.limitOff.eq(0) },
    requires(){
		let req = tmp.limit.LIMIT
		return req
	}, // Can be a function that takes requirement increases into account
    resource: "limit points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
		mult = mult.times(tmp.limit.powerBoost)
		if (hasUpgrade('limit', 22)) mult = mult.times(1.4)
		if (hasUpgrade('limit', 34)) mult = mult.times(1.33)
		mult = mult.times(tmp.limit.alo2)
		if (hasUpgrade('limit', 41)) mult = mult.times(upgradeEffect('limit', 41))
		mult = mult.times(new Decimal(1.1).pow(challengeCompletions("limit", 11), 2));
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
			return new Decimal(1e6).times(player.limit.l.sub(5).pow(3))
		}
	},
	LIMIT(){
		return new Decimal("ee200000").pow(new Decimal(12).pow(player.limit.power.times(124.8731).pow(1.87921)))
	},
	extra(){
		let extra = new Decimal(0)
		if (hasUpgrade('limit', 15)) extra = extra.add(1)
		return extra
	},
	alloCate(){
		let extra = new Decimal(0)
		if (hasUpgrade('limit', 35)) extra = extra.add(1)
		if (hasUpgrade('limit', 42)) extra = extra.add(1)
		extra = extra.sub(player.limit.allo1)
		extra = extra.sub(player.limit.allo2)
		extra = extra.sub(player.limit.allo3)
		return extra
	},
	total(){
		let t = new Decimal(0)
		if (hasUpgrade('limit', 35)) t = t.add(1)
		if (hasUpgrade('limit', 42)) t = t.add(1)
		return t
	},
	alo1(){
		return new Decimal(1).add(new Decimal(0.02).times(player.limit.allo1))
	},
	alo2(){
		return new Decimal(1.15).pow(player.limit.allo2)
	},
	alo3(){
		return new Decimal(1.1).pow(player.limit.allo3)
	},
	powerBoost(){
		return new Decimal(1.0751).pow(player.limit.power).times(player.limit.power.div(7).add(1))
	},
	tabFormat: {
		"LIMIT": {
			content: [
				"main-display",
				"blank",
				["display-text", function(){ return "<h1>" + format(tmp.limit.LIMIT) + "</h1><br>You have reached the limit " + format(player.limit.l) + " times, boosting Log milestone 1 time and Power Rune reset time by x" + format(tmp.limit.limitBoost)}],
				"blank",
				"upgrades",
			],
		},
		"QOL": {
			content: [
				"main-display",
				"blank",
				["display-text", function(){ return "You have reached the limit " + format(player.limit.l) + " times."}],
				"milestones",
			],
		},
		"POWER": {
			unlocked(){ return hasUpgrade('limit', 14) },
			content: [
				"main-display",
				"blank",
				["display-text", function(){ return "You have " + format(player.limit.power) + " Limit Power, increasing the Limit to " + format(tmp.limit.LIMIT) + ", but giving x" + format(tmp.limit.powerBoost) + " Limit Points"}],
				["clickables", ["1"]],
			],
		},
		"CONTROL PANEL": {
			unlocked(){ return hasUpgrade('limit', 15) },
			content: [
				"main-display",
				"blank",
				["clickables", ["20"]],
			],
		},
		"ALLOCATIONS": {
			unlocked(){ return hasUpgrade('limit', 35) },
			content: [
				"main-display",
				"blank",
				["display-text", function(){ return "<h3>You have " + format(player.limit.allocate) + " Allocations left to spend</h3>" }],
				"blank",
				["bar", "ao1"],
			    ["display-text", function(){ return "Softcap Delayers delay Power Rune softcap by x" + format(tmp.limit.alo1)}],																  
				["clickables", ["30"]],
				"blank",
				["bar", "ao2"],
				["display-text", function(){ return "Limit Point Boosters boost Limit Points by x" + format(tmp.limit.alo2)}],
				["clickables", ["31"]],
				"blank",
				["bar", "ao3"],
				["display-text", function(){ return "Limit Boosters boost Limit resets by x" + format(tmp.limit.alo3)}],
				["clickables", ["32"]],
			],
		},
		"CHALLENGES": {
			unlocked(){ return hasUpgrade('limit', 43) },
			content: [
				"main-display",
				"blank",
				"challenges"
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
		13: {
			title: "Double",
			description: "Power Runes are doubled",
			cost: new Decimal(8),
			unlocked(){ return hasUpgrade("limit", 12) },
		},
		14: {
			title: "Power it up",
			description: "Unlock Limit Power (max amount is based on upgrades)",
			cost: new Decimal(10),
			unlocked(){ return hasUpgrade("limit", 13) },
		},
		15: {
			title: "Take control",
			description: "Unlock the CONTROL PANEL. Also this upgrade gives 2 extra Limit Power instead of 1!",
			cost: new Decimal(20),
			unlocked(){ return hasUpgrade("limit", 14) },
		},
		21: {
			title: "umm?",
			description: "This upgrade is useless, its only purpose is the +1 power thing...",
			cost: new Decimal(20),
			unlocked(){ return hasUpgrade("limit", 15) },
		},
		22: {
			title: "A little boost",
			description: "x1.4 Limit Points",
			cost: new Decimal(30),
			unlocked(){ return hasUpgrade("limit", 21) },
		},
		23: {
			title: "Someone is coming...",
			description: "Boost Power Rune reset time based on Limit Points!",
			cost: new Decimal(30),
			unlocked(){ return hasUpgrade("limit", 22) },
			effect(){ return player.limit.points.add(1).pow(2.67) },
			effectDisplay(){ return "x"+format(upgradeEffect('limit', 23)) },
		},
		24: {
			title: "Double 2",
			description: "Power Runes are doubled again",
			cost: new Decimal(40),
			unlocked(){ return hasUpgrade("limit", 23) },
		},
		25: {
			title: "Exponential Boost",
			description: "x1.025 Power Rune reset time for each Limit reset until 1000",
			cost: new Decimal(60),
			unlocked(){ return hasUpgrade("limit", 24) },
			effect(){ return new Decimal(1.025).pow(player.limit.l.min(1000)) },
			effectDisplay(){ return "x"+format(upgradeEffect('limit', 25)) },
		},
		31: {
			title: "Exponential Boost 2",
			description: "x2 Power Rune reset time for each Limit Power until 30",
			cost: new Decimal(60),
			unlocked(){ return hasUpgrade("limit", 25) },
			effect(){ return new Decimal(2).pow(player.limit.power.min(30)) },
			effectDisplay(){ return "x"+format(upgradeEffect('limit', 31)) },
		},
		32: {
			title: "Unhardcap",
			description: "Power Rune Upgrade 4's hardcap is now a softcap",
			cost: new Decimal(66),
			unlocked(){ return hasUpgrade("limit", 31) },
		},
		33: {
			title: "Unsoftcap",
			description: "Delay Power Rune softcap by x1.25",
			cost: new Decimal(80),
			unlocked(){ return hasUpgrade("limit", 32) },
		},
		34: {
			title: "Limit Boost",
			description: "x1.33 Limit Points",
			cost: new Decimal(125),
			unlocked(){ return hasUpgrade("limit", 33) },
		},
		35: {
			title: "Management becomes important",
			description: "Unlock Allocations",
			cost: new Decimal(200),
			unlocked(){ return hasUpgrade("limit", 34) },
		},
		41: {
			title: "The grind begins",
			description: "+x1 Limit Points per 1000 Limit Resets",
			cost: new Decimal(355),
			unlocked(){ return hasUpgrade("limit", 35) },
			effect(){ return new Decimal(1).add(player.limit.l.div(1000)) },
			effectDisplay(){ return "x"+format(upgradeEffect('limit', 41)) },
		},
		42: {
			title: "Use is wisely",
			description: "+1 Allocation",
			cost: new Decimal(500),
			unlocked(){ return hasUpgrade("limit", 41) },
		},
		43: {
			title: "New types of challenges await",
			description: "Unlock a repeating challenge",
			cost: new Decimal(750),
			unlocked(){ return hasUpgrade("limit", 42) },
		},
		44: {
			title: "One time only",
			description: "Unlock a challenge",
			cost: new Decimal(1000),
			unlocked(){ return hasUpgrade("limit", 43) },
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
	4: {
        requirementDescription: "Limit reached 10 times",
        effectDescription: "Autobuy Strength Runes",
        done() { return player.limit.l.gte(10) }
    },
	5: {
        requirementDescription: "Limit reached 20 times",
        effectDescription: "Autobuy Strength Rune upgrades",
        done() { return player.limit.l.gte(20) }
    },
	6: {
        requirementDescription: "Limit reached 30 times",
        effectDescription: "Keep the first row of Power Rune upgrades!",
        done() { return player.limit.l.gte(30) }
    },
	7: {
        requirementDescription: "Limit reached 40 times",
        effectDescription: "Keep the second row of Power Rune upgrades!",
        done() { return player.limit.l.gte(40) }
    },
	8: {
        requirementDescription: "Limit reached 50 times",
        effectDescription: "Keep the third row of Power Rune upgrades!",
        done() { return player.limit.l.gte(50) }
    },
	9: {
        requirementDescription: "Limit reached 100 times",
        effectDescription: "Strength Runes don't reset anymore",
        done() { return player.limit.l.gte(100) }
    },
	10: {
        requirementDescription: "Limit reached 150 times",
        effectDescription: "Keep Power Rune upgrades, for good now",
        done() { return player.limit.l.gte(150) }
    },
	},
	clickables: {
    11: {
        title: "-1 Limit Power",
        canClick(){ return player.limit.power.gt(0) },
		onClick(){ 
		   player.limit.power = player.limit.power.sub(1) 
		},
    },
	12: {
        title: "+1 Limit Power",
        canClick(){ return player.limit.power.lt(new Decimal(player.limit.upgrades.length).add(tmp.limit.extra)) },
		onClick(){ 
		   player.limit.power = player.limit.power.add(1) 
		},
    },
	201: {
        title: "Turn the Limit OFF",
        canClick(){ return player.limit.limitOff.eq(0) },
		onClick(){ 
		   player.limit.limitOff = player.limit.limitOff.add(1)
		},
    },
	202: {
        title: "Turn the Limit ON",
        canClick(){ return player.limit.limitOff.eq(1) },
		onClick(){ 
		   player.limit.limitOff = player.limit.limitOff.sub(1)
		},
    },
	301: {
        title: "-1 Softcap Delayer",
        canClick(){ return player.limit.allo1.gt(new Decimal(0)) },
		onClick(){ 
		   player.limit.allo1 = player.limit.allo1.sub(1) 
		},
    },
	302: {
        title: "+1 Softcap Delayer",
        canClick(){ return player.limit.allocate.gt(new Decimal(0)) },
		onClick(){ 
		   player.limit.allo1 = player.limit.allo1.add(1) 
		},
    },
	311: {
        title: "-1 Limit Point Booster",
        canClick(){ return player.limit.allo2.gt(new Decimal(0)) },
		onClick(){ 
		   player.limit.allo2 = player.limit.allo2.sub(1) 
		},
    },
	312: {
        title: "+1 Limit Point Booster",
        canClick(){ return player.limit.allocate.gt(new Decimal(0)) },
		onClick(){ 
		   player.limit.allo2 = player.limit.allo2.add(1) 
		},
    },
	321: {
        title: "-1 Limit Booster",
        canClick(){ return player.limit.allo3.gt(new Decimal(0)) },
		onClick(){ 
		   player.limit.allo3 = player.limit.allo3.sub(1) 
		},
    },
	322: {
        title: "+1 Limit Booster",
        canClick(){ return player.limit.allocate.gt(new Decimal(0)) },
		onClick(){ 
		   player.limit.allo3 = player.limit.allo3.add(1) 
		},
    },
    },
	update(diff) {
		if (player.points.gte(tmp.limit.LIMIT)) {
			player.points = tmp.limit.LIMIT
		}
	    player.limit.allocate = tmp.limit.alloCate
		
		if (player.limit.allocate.lt(0)) {
		    alert("No cheating, player!")
			player.limit.allo1 = new Decimal(0)
			player.limit.allo2 = new Decimal(0)
			player.limit.allo3 = new Decimal(0)
		}
	},
	bars: {
    ao1: {
        direction: RIGHT,
        width: 250,
        height: 50,
        progress() { return player.limit.allo1.div(tmp.limit.total) },
		fillStyle: { 'background-color': "#cc2525" },
		display(){ return format(player.limit.allo1) + " Softcap Delayers" },
    },
	ao2: {
        direction: RIGHT,
        width: 250,
        height: 50,
        progress() { return player.limit.allo2.div(tmp.limit.total) },
		fillStyle: { 'background-color': "#cc2525" },
		display(){ return format(player.limit.allo2) + " Limit Point Boosters" },
    },
	ao3: {
        direction: RIGHT,
        width: 250,
        height: 50,
        progress() { return player.limit.allo3.div(tmp.limit.total) },
		fillStyle: { 'background-color': "#cc2525" },
		display(){ return format(player.limit.allo3) + " Limit Boosters" },
    },
	},
	challenges: {
    11: {
      name: "Deceased Points",
      challengeDescription: function () {
        return (
          "Point gain is now log<sub>10</sub>(point gain).<br>" +
          challengeCompletions(this.layer, this.id) +
          "/" +
          this.completionLimit +
          " completions"
        );
      },
      rewardDescription: function () {
        return (
          "x" +
          format(new Decimal(1.1).pow(challengeCompletions("limit", 11), 2)) +
          " to Limit Points."
        );
      },
      goalDescription: function () {
        return (
          format(
            new Decimal(10).pow(new Decimal(1.3).pow(new Decimal(challengeCompletions("limit", 11)).add(27)).add(6056.46670749))
          ) + " Points"
        );
      },
      completionLimit: 10,
      canComplete: function () {
        return player.points.gte(
          new Decimal(10).pow(new Decimal(1.3).pow(new Decimal(challengeCompletions("limit", 11)).add(27)).add(6056.46670749))
        );
      },
      unlocked() {
        return hasUpgrade("limit", 43);
      },
    },
		12: {
    	    name: "Deceased Powers",
      	    challengeDescription: "Power Rune softcap starts x2.3 earlier.",
			goalDescription: "e1e610,000 Points",
			rewardDescription: "Power Rune softcap starts x1.15 later.",
      	  	canComplete: function() {return player.points.gte("ee610000")},
			unlocked(){ return hasUpgrade('limit', 44) },
   		 },
	},
})
