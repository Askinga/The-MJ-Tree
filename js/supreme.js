addLayer("su", {
    name: "Supreme Runes", 
    symbol: "SuR", 
    position: 0, 
    startData() { 
  return {
    unlocked: false,
    points: new Decimal(0),
    myColor: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
    timeSubtab: new Decimal(0),
    timeGain: new Decimal(0)
  }
},
    randomHex(){
        let randomColor = Math.floor(Math.random() * 16777215);
        let hexCode = randomColor.toString(16);
        let hexColor = hexCode.padStart(6, '0');
        return "#" + hexColor;
    },
    color() {
  return tmp.su.randomHex || "#FFFFFF"; // fallback to white
    },
	doReset(su) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[su].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
	    if (hasMilestone('uni', 0)) keep.push("milestones");
		if (hasMilestone('uni', 1)) keep.push("challenges");
    
        // Stage 4, do the actual data resetautomate() {
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },
    passiveGeneration() {
        let p = new Decimal(0)
        if (hasUpgrade('su', 14) || hasMilestone('uni', 2)) p = p.add(1)
        return p
    },
	autoUpgrade(){ return hasMilestone('uni', 2) },
    timeEffect(){
        return player.su.timeSubtab.add(1).pow(2)
    },
    timeEffect2(){
        return player.su.timeSubtab.add(1).log(10).div(12).add(1)
    },
    onPrestige(){
        player.su.timeSubtab = new Decimal(0)
    },
    requires: new Decimal("e1000000"), 
    resource: "Supreme Runes", 
    baseResource: "boost runes", 
    baseAmount() {return player.b.points}, 
    type: "normal", 
    exponent: 0, 
    gainMult() { 
        let mult = new Decimal(1); // Declare with let
        if (hasUpgrade('su', 11)) mult = mult.times(4)
        if (hasUpgrade('su', 12)) mult = mult.times(5)
        if (hasUpgrade('su', 13)) mult = mult.times(6)
        if (hasMilestone('su', 5)) mult = mult.times(6)
        if (hasUpgrade('su', 14)) mult = mult.times(5)
        if (hasUpgrade('su', 15)) mult = mult.times(2)
        if (hasUpgrade('su', 15)) mult = mult.times(upgradeEffect('su', 15))
        if (hasUpgrade('su', 23)) mult = mult.times(7)
		if (hasUpgrade('su', 31)) mult = mult.times(8)
		if (hasChallenge('su', 11)) mult = mult.times(15)
		if (hasUpgrade('su', 33)) mult = mult.times(11)
		if (hasUpgrade('su', 34)) mult = mult.times(12)
		if (hasUpgrade('su', 35)) mult = mult.times(20)
		mult = mult.times(layers.tb.effect())
		mult = mult.times(buyableEffect('money', 22))
		mult = mult.times(layers.uni.effect())
        return mult;
    },
    gainExp() { 
        return new Decimal(1);
    },
    eBillion(){
        return player.su.points.add(1).log(10).div(2)
    },
    row: 4,
    hotkeys: [
        {key: "S", description: "Shift+S: Reset for supreme runes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
        "Upgrades & Milestones": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "milestones",
                "upgrades",
            ],
        },
        "Time": {
            unlocked(){ return hasUpgrade('su', 25) },
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() { return "Time gets reset on row 5 (or higher) reset<br>You have " + format(player.su.timeSubtab) + " Time, boosting Firewood by x" + format(tmp.su.timeEffect) + " and it's effect by x" + format(tmp.su.timeEffect2) + "<br>(" + format(player.su.timeGain) + "/sec)" }]
            ],
            buttonStyle() {
                    return {
                        'background': 'linear-gradient(45deg, white, black)',
                        'border-color': '#ffffff',
                        'color': 'gray',
					}
		    },
        },
		"Challenges": {
            unlocked(){ return true },
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
				"challenges",
            ],
            buttonStyle() {
                    return {
                        'background': 'linear-gradient(45deg, #4aba36, black)',
                        'border-color': '#ffffff',
                        'color': 'white',
					}
		    },
        },
    },
    layerShown(){return (hasUpgrade('logs', 35) || player.su.unlocked && !(inChallenge('universes', 11)))},
    branches: ["logs"],
    effect(){
        return player.su.points.add(1).pow(3)
    },
    effectDescription(){
        return "which is boosting 4th row currencies by x" + format(layers.su.effect())
    },
    milestones: {
    0: {
        requirementDescription: "1 Supreme Rune",
        effectDescription: "Keep Extreme Rune Milestones",
        done() { return player.su.points.gte(1) }
    },
    1: {
        requirementDescription: "2 Supreme Runes",
        effectDescription: "xe1e6 points",
        done() { return player.su.points.gte(2) }
    },
    2: {
        requirementDescription: "3 Supreme Runes",
        effectDescription: "Autobuy Log Buyables",
        done() { return player.su.points.gte(3) }
    },
    3: {
        requirementDescription: "4 Supreme Runes",
        effectDescription: "Autobuy 4th row upgrades and keep their passive generation. +10% Logs per second",
        done() { return player.su.points.gte(4) }
    },
    4: {
        requirementDescription: "5 Supreme Runes",
        effectDescription: "Autobuy Extreme Rune Buyables and keep ER upgrade 1 third effect",
        done() { return player.su.points.gte(5) }
    },
    5: {
        requirementDescription: "e1.000e9 points",
        effectDescription(){ return "x4 Supreme Runes and boost Wood effect exponent based on Supreme Runes. Currently: +" + format(tmp.su.eBillion)},
        done() { return player.points.gte("ee9") }
    },
	6: {
        requirementDescription: "e2.000e13 points",
        effectDescription(){ return "Unlock a new layer."},
        done() { return player.points.gte("e2e13") }
    },
    },
    upgrades: {
        11: {
            title: "Thats a lot",
            description: "x4 Supreme Runes, x1000 Logs and Wood, boost Logs based on Supreme Runes",
            cost: new Decimal(5),
            effect(){ return player.su.points.add(1).pow(4) },
            effectDisplay(){ return "x"+format(upgradeEffect('su', 11)) },
        },
        12: {
            title: "STOP THE NOISE!!!",
            description: "x5 Supreme Runes, keep XP Generators milestones, +1 Wood effect exponent and boost Wood based on Supreme Runes",
            cost: new Decimal(30),
            effect(){ return player.su.points.add(1).pow(2) },
            effectDisplay(){ return "x"+format(upgradeEffect('su', 12)) },
            unlocked(){ return hasUpgrade('su', 11) },
        },
        13: {
            title: "Double e",
            description: "x10000 Wood and x6 Supreme Runes",
            cost: new Decimal(400),
            unlocked(){ return hasUpgrade('su', 12) },
        },
        14: {
            title: "Godly upgrade",
            description: "+1.25 Wood effect exponent, x5 Supreme Runes and 100% of Supreme Runes per second",
            cost: new Decimal(10000),
            unlocked(){ return hasUpgrade('su', 13) },
        },
        15: {
            title: "We are in the INFLATION phase of the game",
            description: "+1 Wood effect exponent, x2 SuR, boost Supreme Runes based on Points",
            cost: new Decimal(500000),
            effect(){ return player.points.add(10).log(10).log(10).add(1) },
            effectDisplay(){ return "x"+format(upgradeEffect('su', 15)) },
            unlocked(){ return hasUpgrade('su', 14) },
        },
        21: {
            title: "Godly upgrade 2",
            description: "x1.25 Wood effect exponent",
            cost: new Decimal(10000000),
            unlocked(){ return hasUpgrade('su', 15) },
        },
        22: {
            title: "Start a fire",
            description: "Unlock subtab 'Firewood' in log layer",
            cost: new Decimal(10000000),
            unlocked(){ return hasUpgrade('su', 21) },
        },
        23: {
            title: "Gather more",
            description: "Boost Firewood based on Points, x5 Firewood and x7 SuR",
            cost: new Decimal(10000000),
            unlocked(){ return hasUpgrade('su', 22) },
            effect(){ return player.points.add(10).log(10).log(10).add(1) },
            effectDisplay(){ return "x"+format(upgradeEffect('su', 23)) },
        },
        24: {
            title: "Blue firewood",
            description: "x1.5 Firewood effect, x1.3 Wood effect exponent",
            cost: new Decimal(100000000),
            unlocked(){ return hasUpgrade('su', 23) },
        },
        25: {
            title: "[Time]wall",
            description: "Unlock subtab 'Time'",
            cost: new Decimal(100000000),
            unlocked(){ return hasUpgrade('su', 24) },
        },
		31: {
            title: "Time warp",
            description: "Boost Time based on Time, x4 Time and x8 SuR",
            cost: new Decimal(1e8),
            unlocked(){ return hasUpgrade('su', 25) },
            effect(){ return player.su.timeSubtab.add(1).pow(0.2) },
            effectDisplay(){ return "x"+format(upgradeEffect(this.layer, this.id)) },
        },
		32: {
            title: "Time dilation",
            description: "Unlock a challenge",
            cost: new Decimal(7e8),
            unlocked(){ return hasUpgrade('su', 31) },
        },
		33: {
            title: "Supreme the Firewood",
            description: "Boost Firewood based on SuR, x10 Time and x11 SuR",
            cost: new Decimal(1e10),
            unlocked(){ return hasUpgrade('su', 32) },
            effect(){ return player.su.points.add(1).pow(0.2) },
            effectDisplay(){ return "x"+format(upgradeEffect(this.layer, this.id)) },
        },
		34: {
            title: "Wormhole",
            description: "Boost Time based on SuR, x100 Time and x12 SuR",
            cost: new Decimal(1e11),
            unlocked(){ return hasUpgrade('su', 33) },
            effect(){ return player.su.points.add(1).pow(0.075) },
            effectDisplay(){ return "x"+format(upgradeEffect(this.layer, this.id)) },
        },
		35: {
            title: "404 Error",
            description: "Boost Wood based on Firewood, x1000 Time and x20 SuR",
            cost: new Decimal(1e12),
            unlocked(){ return hasUpgrade('su', 34) },
            effect(){ return player.logs.firewood.add(1).pow(0.15) },
            effectDisplay(){ return "x"+format(upgradeEffect(this.layer, this.id)) },
        },
		41: {
            title: "Times",
            description: "x20 TB",
            cost: new Decimal(2.5e17),
            unlocked(){ return hasUpgrade('su', 35) },
        },
		42: {
            title: "Time freeze",
            description: "Unlock a challenge",
            cost: new Decimal(1e20),
            unlocked(){ return hasUpgrade('su', 41) },
        },
		43: {
            title: "Wood.exe",
            description: "Boost Wood effect exponent based on Time",
            cost: new Decimal(1e24),
            unlocked(){ return hasUpgrade('su', 42) },
            effect(){ return player.su.timeSubtab.add(1).log(10).div(20).add(1) },
            effectDisplay(){ return "x"+format(upgradeEffect(this.layer, this.id)) },
        },
		44: {
            title: "Times 2",
            description: "x1000000 Time",
            cost: new Decimal(1e24),
            unlocked(){ return hasUpgrade('su', 43) },
        },
		45: {
            title: "$",
            description: "Unlock a new layer",
            cost: new Decimal(1e24),
            unlocked(){ return hasUpgrade('su', 44) },
        },
    },
    update(diff) {
        let timeG = new Decimal(1)
		if (hasUpgrade('su', 31)) timeG = timeG.times(upgradeEffect('su', 31))
		if (hasUpgrade('su', 31)) timeG = timeG.times(4)
        if (hasChallenge('su', 11)) timeG = timeG.times(15)
		if (hasUpgrade('su', 33)) timeG = timeG.times(10)
		if (hasUpgrade('su', 34)) timeG = timeG.times(upgradeEffect('su', 34))
		if (hasUpgrade('su', 34)) timeG = timeG.times(100)
		if (hasUpgrade('su', 35)) timeG = timeG.times(1000)
		timeG = timeG.times(layers.tb.effect())
		if (hasUpgrade('su', 44)) timeG = timeG.times(1000000)
		timeG = timeG.times(layers.uni.effect())
		
        if (hasUpgrade('su', 25) && !(inChallenge('su', 11) || inChallenge('su', 12))) {
        player.su.timeGain = timeG
		timeG = timeG.times(diff)
		player.su.timeSubtab = player.su.timeSubtab.add(timeG)
        }
    },
	challenges: {
    11: {
		unlocked(){ return hasUpgrade('su', 32) },
        name: "Time dilation",
        challengeDescription: "^0.01 points, pause time gain and disable logs",
        canComplete: function() {return player.points.gte("e12000")},
		goalDescription: "Get e12K points.",
        rewardDescription: "x15 Time and SuR, ^1.2 points, x1000 Firewood, x1.3 Wood effect exponent"
    },
	12: {
		unlocked(){ return hasUpgrade('su', 42) },
        name: "No time",
        challengeDescription: "Pause time gain and sets time to 0 on enter. /100 Wood effect exponent",
        canComplete: function() {return player.points.gte("e4e9")},
		goalDescription: "Get e4.000e9 points.",
        rewardDescription: "x100 TB",
		onEnter() { return player.su.timeSubtab = new Decimal(0) },
    },
	},
})
