addLayer("logs", {
    name: "Logs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🪵", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		wood: new Decimal(0),
		woodGain: new Decimal(0),
		firewood: new Decimal(0),
		FiWS: new Decimal(0),
		woodPower: new Decimal(0),
    }},
	automate(){
		if (hasMilestone('su', 2)) {
		    if (canBuyBuyable("logs", 11)) setBuyableAmount("logs", 11, player.logs.points.max(100).log(10).sub(2).root(1).floor().add(1))
			if (canBuyBuyable("logs", 12)) setBuyableAmount("logs", 12, player.logs.points.max(10).log(1.125).sub(1).root(1).floor().add(1))
			if (canBuyBuyable("logs", 13)) setBuyableAmount("logs", 13, player.logs.points.max(100).log(1.2).sub(2).root(1).floor().add(1))
			if (hasUpgrade('logs', 15)) {
			    if (canBuyBuyable("logs", 21)) setBuyableAmount("logs", 21, player.logs.points.max(1000000).log(10).sub(6).root(1.1).floor().add(1))
				if (canBuyBuyable("logs", 22)) setBuyableAmount("logs", 22, player.logs.points.max(1000000).log(1.3).sub(6).root(1).floor().add(1))
				if (canBuyBuyable("logs", 23)) setBuyableAmount("logs", 23, player.logs.points.max(1000000).log(1.4).sub(6).root(1.2).floor().add(1))
			}
		}
	},
	passiveGeneration(){
		let p = new Decimal(0)
		p = p.add(buyableEffect('logs', 13).div(100))
		p = p.times(buyableEffect('logs', 23).add(1))
		if (hasMilestone('su', 3)) p = p.add(0.1)
		return p
	},
	autoUpgrade(){ return hasMilestone('su', 3) },
    color: "#735245",
    requires: new Decimal("e1.8e6"), // Can be a function that takes requirement increases into account
    resource: "Logs", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		mult = mult.times(buyableEffect('logs', 11))
		mult = mult.times(buyableEffect('logs', 21))
		if (hasUpgrade('logs', 11)) mult = mult.times(3)
		if (hasUpgrade('logs', 12)) mult = mult.times(2)
		if (hasUpgrade('logs', 13)) mult = mult.times(3)
		if (hasUpgrade('logs', 14)) mult = mult.times(4)
		if (hasUpgrade('logs', 15)) mult = mult.times(5)
		if (hasUpgrade('logs', 21)) mult = mult.times(6)
		if (hasUpgrade('logs', 22)) mult = mult.times(7)
		if (hasUpgrade('logs', 23)) mult = mult.times(8)
		if (hasUpgrade('logs', 24)) mult = mult.times(9)
		if (hasUpgrade('logs', 25)) mult = mult.times(10)
		mult = mult.times(tmp.logs.woodEffect)
		if (hasUpgrade('logs', 31)) mult = mult.times(15)
		mult = mult.times(layers.su.effect())
		if (hasUpgrade('su', 11)) mult = mult.times(1000)
		if (hasUpgrade('su', 11)) mult = mult.times(upgradeEffect('su', 11))
		mult = mult.times(layers.uni.effect())
		if (inChallenge('su', 11)) mult = mult.times(0)
        return mult
    },
	woodEffect(){
		let pow = new Decimal(1)
		if (hasUpgrade('logs', 33)) pow = pow.add(0.5)
		if (hasUpgrade('logs', 34)) pow = pow.add(0.5)
		if (hasUpgrade('su', 12)) pow = pow.add(1)
		if (hasMilestone('su', 5)) pow = pow.add(tmp.su.eBillion)
		if (hasUpgrade('su', 14)) pow = pow.add(1.25)
		if (hasUpgrade('su', 15)) pow = pow.add(1)
		pow = pow.add(tmp.logs.fireWoodEffect)
		if (hasUpgrade('su', 21)) pow = pow.times(1.25)
		if (hasUpgrade('su', 24)) pow = pow.times(1.3)
		if (hasChallenge('su', 11)) pow = pow.times(1.3)
		if (inChallenge('su', 12)) pow = pow.div(100)
		if (hasUpgrade('su', 43)) pow = pow.times(upgradeEffect('su', 43))
		if (hasUpgrade('money', 11)) pow = pow.times(upgradeEffect('money', 11))
		pow = pow.times(buyableEffect('money', 12))
		if (hasUpgrade('money', 21)) pow = pow.times(1.4)
		pow = pow.times(layers.uni.effect())
		player.logs.woodPower = pow
		return player.logs.wood.add(1).pow(pow)
	},
	fireWoodEffect(){
		let pow = new Decimal(1)
		let mult = new Decimal(1)
		if (hasUpgrade('su', 24)) mult = mult.times(1.5)
		if (hasUpgrade('su', 25)) mult = mult.times(tmp.su.timeEffect2)
		return player.logs.firewood.add(1).log(10).pow(pow).times(mult)
	},
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    resetsNothing(){ return true },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasMilestone('XP', 12) || player.logs.unlocked)},
	branches: ["m"],
    effect(){
	  let pow = new Decimal(25000)
	  pow = pow.add(buyableEffect('logs', 12))
	  pow = pow.add(buyableEffect('logs', 22))
	  pow = pow.times(buyableEffect('money', 21))
      return player.logs.points.add(1).pow(pow)
    },
    effectDescription(){
      return 'which is boosting Points by x' + format(layers.logs.effect())
    },
	tabFormat: {
		"Upgrades & Buyables": {
			content: [
				"main-display",
				"prestige-button",
				"resource-display",
				"blank",
				"buyables",
				"upgrades",
			],
		},
		"Wood": {
			unlocked(){ return hasUpgrade('logs', 25) },
			content: [
			"main-display",
				"prestige-button",
				"resource-display",
				"blank",
				["display-text", function () { return (
                'You have <span style=" color: rgb(255,193,140); text-shadow: rgb(255,193,140) 0px 0px 10px"><h2>' +
                format(player.logs.wood) +
                '</h2></span> Wood, raised by <span style=" color: rgb(200,150,100); text-shadow: rgb(200,150,100) 0px 0px 10px"><h1>^' + format(player.logs.woodPower) + '</h1></span> for a x' + format(tmp.logs.woodEffect) + ' Logs multiplier'
                );
                },
                ],
				"blank",
				"clickables",
			],
		buttonStyle() {
                    return {
                        'background': '#ffc18c',
                        'border-color': '#735245',
                        'color': 'white',
					}
		    },
		},
		"Firewood": {
			unlocked(){ return hasUpgrade('su', 22) },
			content: [
			"main-display",
				"prestige-button",
				"resource-display",
				"blank",
				["display-text", "Firewood generation is based on Wood" ],
				["display-text", function () { return (
                'You have <span style=" color: rgb(153,92,26); text-shadow: rgb(153,92,26) 0px 0px 10px"><h2>' +
                format(player.logs.firewood) +
                '</h2></span> Firewood, boosting Wood effect exponent by +' + format(tmp.logs.fireWoodEffect) + ' (before multipliers)'
                );
                },
                ],
				["display-text", function(){ return "(" + format(player.logs.FiWS) + "/sec)" }],
			],
		buttonStyle() {
                    return {
                        'background': 'linear-gradient(45deg, #995c1a, black)',
                        'border-color': '#735245',
                        'color': 'white',
					}
		    },
	},
			},
	buyables: {
	11: {
		title: "Stronger Axe",
        cost(x) { return new Decimal(10).pow(x).times(100) },
        display() { return "x2 Logs.<br>Cost: " + format(this.cost()) + " Logs<br>Bought: " + format(getBuyableAmount('logs', 11)) + "<br>Effect: x" + format(buyableEffect('logs', 11)) + " Logs" },
        canAfford() { return player.logs.points.gte(this.cost()) },
        buy() {
            player.logs.points = player.logs.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(2)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
    },
	12: {
		title: "Pointy Logs",
        cost(x) { return new Decimal(1.125).pow(x).times(10) },
        display() { return "+100 Log effect exponent.<br>Cost: " + format(this.cost()) + " Logs<br>Bought: " + format(getBuyableAmount('logs', 12)) + "<br>Effect: +" + format(buyableEffect('logs', 12)) + " Log effect exponent" },
        canAfford() { return player.logs.points.gte(this.cost()) },
        buy() {
            player.logs.points = player.logs.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(100)
			let base2 = x
			let expo = new Decimal(1)
			return base1.times(Decimal.times(base2, expo))
		},
    },
	13: {
		title: "Auto Cutting Robot",
        cost(x) { return new Decimal(1.2).pow(x).times(100) },
        display() { return "+10% Logs per second.<br>Cost: " + format(this.cost()) + " Logs<br>Bought: " + format(getBuyableAmount('logs', 13)) + "<br>Effect: +" + format(buyableEffect('logs', 13)) + "% Log passive gain" },
        canAfford() { return player.logs.points.gte(this.cost()) },
        buy() {
            player.logs.points = player.logs.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(10)
			let base2 = x
			let expo = new Decimal(1)
			return base1.times(Decimal.times(base2, expo))
		},
    },
	21: {
		unlocked(){ return hasUpgrade('logs', 15) },
		title: "Swing faster",
        cost(x) { return new Decimal(10).pow(x.pow(1.1)).times(1000000) },
        display() { return "x2.5 Logs.<br>Cost: " + format(this.cost()) + " Logs<br>Bought: " + format(getBuyableAmount('logs', 21)) + "<br>Effect: x" + format(buyableEffect('logs', 21)) + " Logs" },
        canAfford() { return player.logs.points.gte(this.cost()) },
        buy() {
            player.logs.points = player.logs.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(2.5)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
    },
	22: {
		unlocked(){ return hasUpgrade('logs', 15) },
		title: "Pointer Logs",
        cost(x) { return new Decimal(1.3).pow(x).times(1000000) },
        display() { return "+250 Log effect exponent.<br>Cost: " + format(this.cost()) + " Logs<br>Bought: " + format(getBuyableAmount('logs', 22)) + "<br>Effect: +" + format(buyableEffect('logs', 22)) + " Log effect exponent" },
        canAfford() { return player.logs.points.gte(this.cost()) },
        buy() {
            player.logs.points = player.logs.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(250)
			let base2 = x
			let expo = new Decimal(1)
			return base1.times(Decimal.times(base2, expo))
		},
    },
	23: {
		unlocked(){ return hasUpgrade('logs', 15) },
		title: "Send out more robots",
        cost(x) { return new Decimal(1.4).pow(x.pow(1.2)).times(1000000) },
        display() { return "+x1 Logs per second.<br>Cost: " + format(this.cost()) + " Logs<br>Bought: " + format(getBuyableAmount('logs', 23)) + "<br>Effect: +x" + format(buyableEffect('logs', 23)) + " Log passive gain" },
        canAfford() { return player.logs.points.gte(this.cost()) },
        buy() {
            player.logs.points = player.logs.points.sub(this.cost())
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
	upgrades: {
		11: {
			title: "Efficient Axe",
			description: "x3 Logs",
			cost: new Decimal(300)
		},
		12: {
			title: "2-Headed Axe",
			description: "x2 Logs",
			cost: new Decimal(1000),
			unlocked(){ return hasUpgrade('logs', 11) },
		},
		13: {
			title: "3-Headed Axe",
			description: "x3 Logs",
			cost: new Decimal(5000),
			unlocked(){ return hasUpgrade('logs', 12) },
		},
		14: {
			title: "Fire Axe",
			description: "x4 Logs",
			cost: new Decimal(100000),
			unlocked(){ return hasUpgrade('logs', 13) },
		},
		15: {
			title: "Upgrade your axe",
			description: "x5 Logs and unlock 3 new buyables",
			cost: new Decimal(1000000),
			unlocked(){ return hasUpgrade('logs', 14) },
		},
	    21: {
			title: "Efficiency 1",
			description: "x6 Logs",
			cost: new Decimal("1e12"),
			unlocked(){ return hasUpgrade('logs', 15) },
		},
		22: {
			title: "Efficiency 2",
			description: "x7 Logs",
			cost: new Decimal("1e15"),
			unlocked(){ return hasUpgrade('logs', 21) },
		},
		23: {
			title: "Efficiency 3",
			description: "x8 Logs",
			cost: new Decimal("1e18"),
			unlocked(){ return hasUpgrade('logs', 22) },
		},
		24: {
			title: "Efficiency 4",
			description: "x9 Logs",
			cost: new Decimal("5e19"),
			unlocked(){ return hasUpgrade('logs', 23) },
		},
		25: {
			title: "Efficiency 5",
			description: "x10 Logs. Unlock subtab 'Wood'",
			cost: new Decimal("1e21"),
			unlocked(){ return hasUpgrade('logs', 24) },
		},
		31: {
			title: "Blue Fire Axe",
			description: "x5 Wood and x15 Logs.",
			cost: new Decimal("2e31"),
			unlocked(){ return hasUpgrade('logs', 25) },
		},
		32: {
			title: "Supreme Wood",
			description: "1000% of Wood per second and x5 Wood",
			cost: new Decimal("1e36"),
			unlocked(){ return hasUpgrade('logs', 31) },
		},
		33: {
			title: "Compact Wood",
			description: "+0.5 Wood effect exponent",
			cost: new Decimal("1e39"),
			unlocked(){ return hasUpgrade('logs', 32) },
		},
		34: {
			title: "Super Compacted Wood",
			description: "+0.5 Wood effect exponent",
			cost: new Decimal("1e46"),
			unlocked(){ return hasUpgrade('logs', 33) },
		},
		35: {
			title: "Are U ready for supreme??",
			description: "Unlock a new layer",
			cost: new Decimal("1e52"),
			unlocked(){ return hasUpgrade('logs', 34) },
		},
	},
	clickables: {
		11: {
            display() {
                return `Gain ${formatWhole(this.prestigeGain())} Wood`
            },
            unlocked() {
                return hasUpgrade("logs", 25)
            },
            canClick() {
                return hasUpgrade("logs", 25)
            },
            prestigeGain() {
                let mult = new Decimal(1)
				if (hasUpgrade('logs', 31)) mult = mult.times(5)
				if (hasUpgrade('logs', 32)) mult = mult.times(5)
				mult = mult.times(layers.su.effect())
				if (hasUpgrade('su', 11)) mult = mult.times(1000)
				if (hasUpgrade('su', 12)) mult = mult.times(upgradeEffect('su', 12))
				if (hasUpgrade('su', 13)) mult = mult.times(10000)
				if (hasUpgrade('su', 35)) mult = mult.times(upgradeEffect('su', 35))
				mult = mult.pow(buyableEffect('money', 23))
				player.logs.woodGain = mult
	         	return mult
            },
            onClick() {
                player.logs.wood = player.logs.wood.add(this.prestigeGain())
            },
            onHold() {
				player.logs.wood = player.logs.wood.add(this.prestigeGain())
            },
        },
	},
	update(diff) {
		if (!inChallenge('su', 11)) {
		let passive = new Decimal(0)
		let ire = new Decimal(player.logs.wood.add(1).log(10).div(50))
		if (hasUpgrade('logs', 32)) passive = passive.add(10)
		if (hasUpgrade('su', 23)) ire = ire.times(5)
		if (hasUpgrade('su', 23)) ire = ire.times(upgradeEffect('su', 23))
		if (hasUpgrade('su', 25)) ire = ire.times(tmp.su.timeEffect)
		if (hasChallenge('su', 11)) ire = ire.times(1000)
		if (hasUpgrade('su', 33)) ire = ire.times(upgradeEffect('su', 33))
		ire = ire.times(buyableEffect('money', 13))

		passive = passive.times(diff)
		if (hasUpgrade('logs', 32)) {
			player.logs.wood = player.logs.wood.add(player.logs.woodGain.times(passive))
		}

		if (hasUpgrade('su', 22)) {	
        player.logs.FiWS = ire
		ire = ire.times(diff)
		player.logs.firewood = player.logs.firewood.add(ire)
		}
		}
	},
})
