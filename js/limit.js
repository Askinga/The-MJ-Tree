addLayer("limit", {
    name: "how?", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
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
	passiveGeneration(){
		let p = new Decimal(0)
		if (hasUpgrade('sl', 22)) p = p.add(0.01)
		return p
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
		if (hasChallenge('limit', 13)) mult = mult.times(1.3)
		if (hasUpgrade('sl', 11)) mult = mult.times(1.5)
		if (hasUpgrade('sl', 15)) mult = mult.times(2)
		mult = mult.times(tmp.sl.power1)
		if (hasUpgrade('sl', 24)) mult = mult.times(5)
		if (hasUpgrade('sl', 31)) mult = mult.times(10)
		if (hasUpgrade('sl', 33)) mult = mult.times(20)
		if (hasUpgrade('sl', 34)) mult = mult.times(25)
		if (hasUpgrade('sl', 35)) mult = mult.times(5)
		if (hasUpgrade('ice', 21)) mult = mult.times(upgradeEffect('ice', 21))
		mult = mult.times(buyableEffect('ice', 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
		if (hasUpgrade('ice', 11)) exp = exp.times(1.1)
		if (hasUpgrade('ice', 12)) exp = exp.times(upgradeEffect('ice', 12))
		if (hasUpgrade('ice', 15)) exp = exp.times(1.05)
		return exp
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
		if (player.limit.power.gte(30)) {
		    return new Decimal("ee200000").pow(new Decimal(12).pow(player.limit.power.times(124.8731).pow(new Decimal(1.87921).add(player.limit.power.sub(29).div(94.2847)))))
		}
		else {
			return new Decimal("ee200000").pow(new Decimal(12).pow(player.limit.power.times(124.8731).pow(1.87921)))
		}
	},
	extra(){
		let extra = new Decimal(0)
		if (hasUpgrade('limit', 15)) extra = extra.add(1)
		if (hasUpgrade('limit', 53)) extra = extra.add(3)
		extra = extra.add(buyableEffect('limit', 11))
		return extra
	},
	alloCate(){
		let extra = new Decimal(0)
		if (hasUpgrade('limit', 35)) extra = extra.add(1)
		if (hasUpgrade('limit', 42)) extra = extra.add(1)
		if (hasUpgrade('limit', 45)) extra = extra.add(1)
		if (hasUpgrade('limit', 55)) extra = extra.add(1)
		if (hasUpgrade('sl', 25)) extra = extra.add(2)
		if (hasUpgrade('sl', 35)) extra = extra.add(1)
		extra = extra.sub(player.limit.allo1)
		extra = extra.sub(player.limit.allo2)
		extra = extra.sub(player.limit.allo3)
		return extra
	},
	total(){
		let t = new Decimal(0)
		if (hasUpgrade('limit', 35)) t = t.add(1)
		if (hasUpgrade('limit', 42)) t = t.add(1)
		if (hasUpgrade('limit', 45)) t = t.add(1)
		if (hasUpgrade('limit', 55)) t = t.add(1)
		if (hasUpgrade('sl', 25)) t = t.add(2)
		if (hasUpgrade('sl', 35)) t = t.add(1)
		return t
	},
	alo1(){
		return new Decimal(1).add(new Decimal(0.02).times(player.limit.allo1))
	},
	alo2(){
		return new Decimal(1.15).pow(player.limit.allo2)
	},
	alo3(){
		let extra = new Decimal(1)
		if (hasChallenge('limit', 13)) extra = extra.times(1.178)
		if (hasUpgrade('sl', 12)) extra = extra.times(2)
		return new Decimal(1.1).pow(player.limit.allo3).times(extra)
	},
	powerBoost(){
		let newPower = new Decimal(1.15)
		if (hasUpgrade('ice', 14)) newPower = newPower.add(upgradeEffect('ice', 14))
		if (hasUpgrade('sl', 32)) {
			return new Decimal(newPower).pow(player.limit.power)
		} else {
			return new Decimal(1.0751).pow(player.limit.power).times(player.limit.power.div(7).add(1))
		}
	},
	tabFormat: {
		"LIMIT": {
			content: [
				"main-display",
				"blank",
				["display-text", function(){ return "<h1>" + format(tmp.limit.LIMIT) + "</h1><br>You have reached the limit " + format(player.limit.l) + " times, boosting Log milestone 1 time and Power Rune reset time by x" + format(tmp.limit.limitBoost)}],
				"blank",
				["bar", "LIMIT"],
				"resource-display",
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
		"BUYABLES": {
			unlocked(){ return hasUpgrade('limit', 54) },
			content: [
				"main-display",
				"blank",
				"buyables"
			],
		},
		  "SUPER": {
			  embedLayer: "sl",
			  unlocked(){ return hasUpgrade('limit', 55) },
			  buttonStyle: {
			  "color": "#2d51e0",
			  "border": "2px solid #2d51e0"
         	  },
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
			title: "Use it wisely",
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
		45: {
			title: "Another allocation",
			description: "+1 Allocation per final row upgrade",
			cost: new Decimal(2000),
			unlocked(){ return hasUpgrade("limit", 44) },
		},
		51: {
			title: "Exponents, finally",
			description: "Delay Power Rune softcap based on Limit Points",
			cost: new Decimal(2500),
			unlocked(){ return hasUpgrade("limit", 45) },
			effect(){ return new Decimal(1).add(player.limit.points.slog().div(300)) },
			effectDisplay(){ return "^"+format(upgradeEffect('limit', 51)) },
		},
		52: {
			title: "Another one",
			description: "Unlock a challenge",
			cost: new Decimal(3250),
			unlocked(){ return hasUpgrade("limit", 51) },
		},
		53: {
			title: "Time to go BIG!",
			description: "Each completed challenge adds +1 max Limit Power",
			cost: new Decimal(5000),
			unlocked(){ return hasUpgrade("limit", 52) },
		},
		54: {
			title: "Power stacking",
			description: "Unlock a buyable",
			cost: new Decimal(10000),
			unlocked(){ return hasUpgrade("limit", 53) },
		},
		55: {
			title: "Now what?",
			description: "Unlock something new",
			cost: new Decimal(20000),
			unlocked(){ return hasUpgrade("limit", 54) },
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
	LIMIT: {
        direction: RIGHT,
        width: 400,
        height: 50,
        progress() { return player.points.log(10).log(tmp.limit.LIMIT.log10()) },
		fillStyle: { 'background-color': "#e841a0" },
		display(){ return format(player.points.log(10).log(tmp.limit.LIMIT.log10()).times(100)) + "% to the LIMIT" },
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
		13: {
    	    name: "Corrupt Powers",
      	    challengeDescription: "Gain only 1 Power Rune on reset and Power Rune softcap starts instantly.",
			goalDescription: "10^10^2^17 Points (e1e131,072)",
			rewardDescription: "x2 Power Runes on reset, x1.3 Limit Points, and x1.178 Limit resets. Also unlock more upgrades",
      	  	canComplete: function() {return player.points.gte("ee131072")},
			unlocked(){ return hasUpgrade('limit', 52) },
 	    },
	},
	buyables: {
	11: {
		unlocked(){ return hasUpgrade('limit', 54) },
		title: "Limit Power Increaser",
        cost(x) { return new Decimal(2500).times(new Decimal(2).pow(x)) },
        display() { return "+1 max Limit Power per purchase<br>Cost: " + format(this.cost()) + " Limit Points<br>Bought: " + format(getBuyableAmount('limit', 11)) + "<br>Effect: +" + format(buyableEffect('limit', 11)) + " max Limit Power" },
        canAfford() { return player.limit.points.gte(this.cost()) },
        buy() {
            player.limit.points = player.limit.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1)
			let base2 = x
			let expo = new Decimal(1)
			return base1.times(Decimal.times(base2, expo))
		},
    },
	},
		 })

 addLayer("sl", {
    name: "super limit?????!!", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SL?", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		power: new Decimal(0),
		gen1: new Decimal(0),
		gen2: new Decimal(0),
		gen3: new Decimal(0),
		gen4: new Decimal(0),
		powerg: new Decimal(0),
    }},
	onPrestige(){
		player.limit.points = new Decimal(0)
	},
    color: "#2d51e0",
    requires: new Decimal(20000), // Can be a function that takes requirement increases into account
    resource: "super limit points", // Name of prestige currency
    baseResource: "limit points", // Name of resource prestige is based on
    baseAmount() {return player.limit.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		mult = mult.times(tmp.sl.power2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "l", description: "L: Reset for super limit points (Uni. 1)", onPress(){if (canReset(this.layer) && !(inChallenge('universes', 11))) doReset(this.layer)}},
    ],
    layerShown(){return false},
	power1(){
		return player.sl.power.add(1).pow(0.2)
	},
	power2(){
		return player.sl.power.add(1).pow(0.1)
	},
	tabFormat: {
	 "MAIN": {
			content: [
				"main-display",
				"prestige-button",
				"resource-display",
				"blank",
				"upgrades",
			],
		},
		"GENERATORS": {
			unlocked(){ return hasUpgrade('sl', 15) },
			content: [
				"main-display",
				"blank",
				["display-text", function(){ return "You have " + format(player.sl.power) + " limit generator power, boosting Limit Points by x" + format(tmp.sl.power1) + " and Super Limit Points by x" + format(tmp.sl.power2) + " (" + format(player.sl.powerg) + "/sec)"}],
				"buyables",
			],
		},
    },
	upgrades: {
		11: {
			title: "Time to go super",
			description: "These upgrades will be way stronger than normal upgrades. x1.5 Limit Points.",
			cost: new Decimal(1)
		},
		12: {
			title: "Very limity",
			description: "x2 Limit Resets!",
			cost: new Decimal(2),
			unlocked(){ return hasUpgrade('sl', 11) },
		},
		13: {
			title: "The doubling won't stop",
			description: "x2 Power Runes",
			cost: new Decimal(3),
			unlocked(){ return hasUpgrade('sl', 12) },
		},
		14: {
			title: "Very softcappy",
			description: "x1.3 Power Rune softcap delay",
			cost: new Decimal(5),
			unlocked(){ return hasUpgrade('sl', 13) },
		},
		15: {
			title: "Generate v2",
			description: "Unlock a new tab and x2 Limit points!",
			cost: new Decimal(7),
			unlocked(){ return hasUpgrade('sl', 14) },
		},
		21: {
			title: "...",
			description: "x2 Power Runes. I should make a buyable soon...",
			cost: new Decimal(20),
			unlocked(){ return hasUpgrade('sl', 15) },
		},
		22: {
			title: "Well, new generator at least",
			description: "Unlock a new generator and gain 1% of Limit Points per second",
			cost: new Decimal(30),
			unlocked(){ return hasUpgrade('sl', 21) },
		},
		23: {
			title: "too big",
			description: "Unlock a new generator and x2 Power rune softcap delay",
			cost: new Decimal(50),
			unlocked(){ return hasUpgrade('sl', 22) },
		},
		24: {
			title: "A BIG one",
			description: "x5 Limit Points! :(",
			cost: new Decimal(100),
			unlocked(){ return hasUpgrade('sl', 23) },
		},
		25: {
			title: "too big 2",
			description: "Unlock a new generator. Limit Upgrade 20 is applied with these upgrades too.",
			cost: new Decimal(250),
			unlocked(){ return hasUpgrade('sl', 24) },
		},
		31: {
			title: "too big the third",
			description: "x10 Limit Points. Also, each Limit Power delays Power Rune softcap by x1.005.",
			cost: new Decimal(1000),
			unlocked(){ return hasUpgrade('sl', 25) },
			effect(){ return new Decimal(1.005).pow(player.limit.power) },
			effectDisplay(){ return "x"+format(upgradeEffect('sl', 31)) },
		},
		32: {
			title: "too big, 4?",
			description: "The Limit Power boost has a better formula. Use rot13 to translate the next upgrade. :)",
			cost: new Decimal(2000),
			unlocked(){ return hasUpgrade('sl', 31) },
		},
		33: {
			title: "gbb ovt gur svsgu",
			description: "x20 Yvzvg Cbvagf. >:D",
			cost: new Decimal(3500),
			unlocked(){ return hasUpgrade('sl', 32) },
		},
		34: {
			title: "cold...",
			description: "x25 Limit Points",
			cost: new Decimal(15000),
			unlocked(){ return hasUpgrade('sl', 33) },
		},
		35: {
			title: "ice time",
			description: "Unlock Ice, and x5 Limit Points",
			cost: new Decimal(50000),
			unlocked(){ return hasUpgrade('sl', 34) },
		},
	},
	buyables: {
	 11: {
            title: "Generator 1",
            unlocked() { return (hasUpgrade('sl', 15)) },
            cost(x) {
                return new Decimal(5).mul(Decimal.pow(2, x)).floor()
            },
            display() {
                let dis = "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " super limit points." + "<br>You have bought " + getBuyableAmount(this.layer, this.id) + " Generator 1.<br>You have " + format(player.sl.gen1) + " Generator 1."
                if (player.points.lte("-10")) dis = dis + " Dimension 1 amount multiplies Antimatter generation by " + format(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.sl.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.sl.points = player.sl.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
				player.sl.gen1 = player.sl.gen1.add(1)
            },
            tooltip() {
                return "Cost Formula: 5 x 2^Amt. Generation formula: Generator 1 amt."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
		12: {
            title: "Generator 2",
            unlocked() { return (hasUpgrade('sl', 22)) },
            cost(x) {
                return new Decimal(30).mul(Decimal.pow(3, x)).floor()
            },
            display() {
                let dis = "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " super limit points." + "<br>You have bought " + getBuyableAmount(this.layer, this.id) + " Generator 2.<br>You have " + format(player.sl.gen2) + " Generator 2."
                if (player.points.lte("-10")) dis = dis + " Dimension 1 amount multiplies Antimatter generation by " + format(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.sl.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.sl.points = player.sl.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
				player.sl.gen2 = player.sl.gen2.add(1)
            },
            tooltip() {
                return "Cost Formula: 30 x 3^Amt. Generation formula: Generator 2 amt."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
		21: {
            title: "Generator 3",
            unlocked() { return (hasUpgrade('sl', 23)) },
            cost(x) {
                return new Decimal(40).mul(Decimal.pow(4, x)).floor()
            },
            display() {
                let dis = "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " super limit points." + "<br>You have bought " + getBuyableAmount(this.layer, this.id) + " Generator 3.<br>You have " + format(player.sl.gen3) + " Generator 3."
                if (player.points.lte("-10")) dis = dis + " Dimension 1 amount multiplies Antimatter generation by " + format(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.sl.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.sl.points = player.sl.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
				player.sl.gen3 = player.sl.gen3.add(1)
            },
            tooltip() {
                return "Cost Formula: 40 x 4^Amt. Generation formula: Generator 3 amt."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
		22: {
            title: "Generator 4",
            unlocked() { return (hasUpgrade('sl', 25)) },
            cost(x) {
                return new Decimal(250).mul(Decimal.pow(7, x)).floor()
            },
            display() {
                let dis = "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " super limit points." + "<br>You have bought " + getBuyableAmount(this.layer, this.id) + " Generator 4.<br>You have " + format(player.sl.gen4) + " Generator 4."
                if (player.points.lte("-10")) dis = dis + " Dimension 1 amount multiplies Antimatter generation by " + format(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.sl.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.sl.points = player.sl.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
				player.sl.gen4 = player.sl.gen4.add(1)
            },
            tooltip() {
                return "Cost Formula: 250 x 7^Amt. Generation formula: Generator 4 amt."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
    },
	update(diff) {
		let gain = player.sl.gen1
		player.sl.gen1 = player.sl.gen1.add(player.sl.gen2.times(diff))
		player.sl.gen2 = player.sl.gen2.add(player.sl.gen3.times(diff))
		player.sl.gen3 = player.sl.gen3.add(player.sl.gen4.times(diff))
		player.sl.powerg = gain
		player.sl.power = player.sl.power.add(gain.times(diff))
	},
})
