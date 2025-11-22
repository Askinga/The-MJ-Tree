addLayer("money", {
    name: "Money", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "$", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		stockTimer: new Decimal(0),
        moneyBoosterStock: new Decimal(0),
		MBStock: new Decimal(1),
		PWStock: new Decimal(0),
		polishedStock: new Decimal(1),
		ffStock: new Decimal(0),
		fFStock: new Decimal(0),
		SLStock: new Decimal(0),
		slStock: new Decimal(0),
		SRStock: new Decimal(0),
		srStock: new Decimal(0),
		PoWStock: new Decimal(0),
		pwStock: new Decimal(0),
    }},
	passiveGeneration(){
		let p = new Decimal(0)
		if (hasUpgrade('money', 12)) p = p.add(1)
		return p
	},
	onPrestige(){
        player.su.timeSubtab = new Decimal(0)
    },
    color: "#278013",
    requires: new Decimal(3000), // Can be a function that takes requirement increases into account
    resource: "$", // Name of prestige currency
    baseResource: "Wood effect exponent", // Name of resource prestige is based on
    baseAmount() {return player.logs.woodPower}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.125, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('money', 12)) mult = mult.times(6)
		if (hasUpgrade('money', 13)) mult = mult.times(10)
		if (hasUpgrade('money', 14)) mult = mult.times(5)
		mult = mult.times(buyableEffect('money', 11))
		if (hasUpgrade('money', 21)) mult = mult.times(10)
		if (hasUpgrade('money', 22)) mult = mult.times(25)
		if (hasUpgrade('money', 23)) mult = mult.times(25)
		if (hasUpgrade('money', 24)) mult = mult.times(30)
		if (hasUpgrade('money', 25)) mult = mult.times(50)
		if (hasUpgrade('money', 31)) mult = mult.times(100)
		if (hasUpgrade('money', 32)) mult = mult.times(upgradeEffect('money', 32))
		if (hasUpgrade('money', 33)) mult = mult.times(1000)
		if (hasUpgrade('money', 34)) mult = mult.times(500)
		if (hasUpgrade('money', 35)) mult = mult.times(2500)
		if (hasUpgrade('money', 41)) mult = mult.times(10000)
		if (hasUpgrade('money', 42)) mult = mult.times(upgradeEffect('money', 42))
		if (hasUpgrade('money', 43)) mult = mult.times(100000)
		if (hasUpgrade('money', 44)) mult = mult.times(1000000)
		mult = mult.times(layers.uni.effect())
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "M", description: "Shift+M: Reset for $", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades",
            ],
        },
        "The Shop": {
            unlocked(){ return hasUpgrade('money', 14) },
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() { return "Here are the items on stock! (30s cooldown) and items get more expensive the more you buy them!<br>Stock resets in " + format(player.money.stockTimer) + 's' }],
				"buyables",
            ],
            buttonStyle() {
                    return {
                        'background': 'linear-gradient(45deg, #4287f5, black)',
                        'border-color': '#278013',
                        'color': 'white',
					}
		    },
        },
	},
    layerShown(){return (hasUpgrade('su', 45) || player.money.unlocked)},
	branches: ["logs"],
	upgrades: {
		11: {
			title: "We have money!",
			description: "Boost wood effect exponent based on $",
			cost: new Decimal(1),
			effect(){ return player.money.points.add(2).pow(0.18) },
			effectDisplay(){ return "x"+format(upgradeEffect(this.layer, this.id)) },
		},
		12: {
            title: "Passive money (OP)",
            description: "x6 $ and 100% of Money per second",
            cost: new Decimal(10),
            unlocked(){ return hasUpgrade('money', 11) },
        },
		13: {
            title: "Money incremental",
            description: "x10 $",
            cost: new Decimal(500),
            unlocked(){ return hasUpgrade('money', 12) },
        },
		14: {
            title: "Buy stuff",
            description: "Unlock subtab 'The Shop' and x5 $. Also unlock Money Booster in Shop (Base stock: 1)",
            cost: new Decimal(6000),
            unlocked(){ return hasUpgrade('money', 13) },
        },
		15: {
            title: "More shop items!",
            description: "Increase MB stock by +1 and unlock item 'Polished Wood' in shop. (Base stock: 1)",
            cost: new Decimal(300000),
            unlocked(){ return hasUpgrade('money', 14) },
        },
		21: {
            title: "$$$",
            description: "x10 $, x1.4 Wood effect exponent, +2 MB stock and unlock item 'Firefirewood' in shop (Base stock: 2)",
            cost: new Decimal(1000000),
            unlocked(){ return hasUpgrade('money', 15) },
        },
		22: {
            title: "I love $!",
            description: "x25 $",
            cost: new Decimal(20000000),
            unlocked(){ return hasUpgrade('money', 21) },
        },
		23: {
			title: "Logged",
            description: "x25 $, unlock item 'Super Logs' in shop (Base stock: 1)",
            cost: new Decimal(5e8),
            unlocked(){ return hasUpgrade('money', 22) },
		},
		24: {
			title: "Supreme Booster",
            description: "x30 $, unlock item 'Supreme Rune^2' in shop (Base stock: 1)",
            cost: new Decimal(2.5e10),
            unlocked(){ return hasUpgrade('money', 23) },
		},
		25: {
			title: "Wood Booster",
            description: "x50 $, unlock item 'Powered Wood' in shop (Base stock: 2)",
            cost: new Decimal(1e12),
            unlocked(){ return hasUpgrade('money', 24) },
		},
		31: {
			title: "GaG stock is way worse than this",
            description: "x100 $, /2 Stock cooldown",
            cost: new Decimal(5e13),
            unlocked(){ return hasUpgrade('money', 25) },
		},
		32: {
			title: "Make them useful",
            description: "For every 10 Money Boosters, x2 Money.",
            cost: new Decimal(6e15),
            unlocked(){ return hasUpgrade('money', 31) },
			effect(){ return new Decimal(2).pow(getBuyableAmount(this.layer, 11).div(10).floor()) },
			effectDisplay(){ return "x"+format(upgradeEffect('money', 32)) },
		},
		33: {
			title: "The money",
            description: "x1000 $",
            cost: new Decimal(1e19),
            unlocked(){ return hasUpgrade('money', 32) },
		},
		34: {
			title: "The money 2",
            description: "x500 $",
            cost: new Decimal(1e23),
            unlocked(){ return hasUpgrade('money', 33) },
		},
		35: {
			title: "The money 3",
            description: "x2500 $",
            cost: new Decimal(2e26),
            unlocked(){ return hasUpgrade('money', 34) },
		},
		41: {
			title: "The money 4",
            description: "x10000 $",
            cost: new Decimal(5e30),
            unlocked(){ return hasUpgrade('money', 35) },
		},
		42: {
			title: "Pointy Money",
			description: "Boost $ based on OoM^2 of points",
			cost: new Decimal(5e35),
			unlocked(){ return hasUpgrade('money', 41) },
			effect(){ return player.points.add(10).log(10).log(10).add(1).pow(2) },
			effectDisplay(){ return "x"+format(upgradeEffect(this.layer, this.id)) },
		},
		43: {
			title: "The money 5",
            description: "x100000 $",
            cost: new Decimal(1e40),
            unlocked(){ return hasUpgrade('money', 42) },
		},
		44: {
			title: "OMG",
            description: "x1e10 TB and x1e6 $",
            cost: new Decimal(1e46),
            unlocked(){ return hasUpgrade('money', 43) },
		},
		45: {
			title: "The universe",
            description: "Free upgrade! Unlock a new layer at e1.000e60 points",
            cost: new Decimal(0),
            unlocked(){ return hasUpgrade('money', 44) },
		},
	},
	update(diff) {
		let stock = new Decimal(1)
		let aS = new Decimal(1)
		let bS = new Decimal(1)
		let cS = new Decimal(2)
		let dS = new Decimal(1)
		let eS = new Decimal(1)
		let fS = new Decimal(2)
		let cool = new Decimal(30)
		if (hasUpgrade('money', 15)) aS = aS.add(1) 
		if (hasUpgrade('money', 21)) aS = aS.add(2) 
		if (hasUpgrade('money', 31)) cool = cool.div(2)

		player.money.MBStock = aS
		player.money.polishedStock = bS
		player.money.fFStock = cS
		player.money.slStock = dS
		player.money.srStock = eS
		player.money.pwStock = fS
		stock = stock.times(diff)
		player.money.stockTimer = player.money.stockTimer.sub(stock)
		if (player.money.stockTimer.lte(0)) {
			player.money.stockTimer = cool
			if (hasUpgrade('money', 14)) {
				player.money.moneyBoosterStock = new Decimal(player.money.MBStock)
			}
			if (hasUpgrade('money', 15)) {
				player.money.PWStock = new Decimal(player.money.polishedStock)
			}
			if (hasUpgrade('money', 21)) {
				player.money.ffStock = new Decimal(player.money.fFStock)
			}
			if (hasUpgrade('money', 23)) {
				player.money.SLStock = new Decimal(player.money.slStock)
			}
			if (hasUpgrade('money', 24)) {
				player.money.SRStock = new Decimal(player.money.srStock)
			}
			if (hasUpgrade('money', 25)) {
				player.money.PoWStock = new Decimal(player.money.pwStock)
			}
		}
	},
	buyables: {
	11: {
		title: "Money Booster",
        cost(x) { return new Decimal(1.5).pow(x) },
        display() { return "+x1 Money.<br>Cost: " + format(this.cost()) + " Money<br>Bought: " + format(getBuyableAmount('money', 11)) + "<br>Effect: x" + format(buyableEffect('money', 11)) + " Money<br>" + format(player.money.moneyBoosterStock) + " in stock" },
        canAfford() { return ((player.money.points.gte(this.cost())) && player.money.moneyBoosterStock.gt(0) ) },
        buy() {
            player.money.points = player.money.points.sub(this.cost())
			player.money.moneyBoosterStock = player.money.moneyBoosterStock.sub(1)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1)
			let base2 = x
			let expo = new Decimal(1)
			return base1.times(Decimal.times(base2, expo)).add(1)
		},
    },
	12: {
		unlocked(){ return hasUpgrade('money', 15) },
		title: "Polished Wood",
        cost(x) { return new Decimal(10).pow(x).times(100) },
        display() { return "x1.1 Wood effect exponent.<br>Cost: " + format(this.cost()) + " Money<br>Bought: " + format(getBuyableAmount('money', 12)) + "<br>Effect: x" + format(buyableEffect('money', 12)) + " Wood effect exponent<br>" + format(player.money.PWStock) + " in stock" },
        canAfford() { return ((player.money.points.gte(this.cost())) && player.money.PWStock.gt(0) ) },
        buy() {
            player.money.points = player.money.points.sub(this.cost())
			player.money.PWStock = player.money.PWStock.sub(1)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1.1)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
    },
	13: {
		unlocked(){ return hasUpgrade('money', 21) },
		title: "Firefirewood",
        cost(x) { return new Decimal(20).pow(x) },
        display() { return "xe10 Firewood.<br>Cost: " + format(this.cost()) + " Money<br>Bought: " + format(getBuyableAmount('money', 13)) + "<br>Effect: x" + format(buyableEffect('money', 13)) + " Firewood<br>" + format(player.money.ffStock) + " in stock" },
        canAfford() { return ((player.money.points.gte(this.cost())) && player.money.ffStock.gt(0) ) },
        buy() {
            player.money.points = player.money.points.sub(this.cost())
			player.money.ffStock = player.money.ffStock.sub(1)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1e10)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
    },
	21: {
		unlocked(){ return hasUpgrade('money', 23) },
		title: "Super Logs",
        cost(x) { return new Decimal(100).pow(x) },
        display() { return "x1.05 Log effect exponent.<br>Cost: " + format(this.cost()) + " Money<br>Bought: " + format(getBuyableAmount('money', 21)) + "<br>Effect: x" + format(buyableEffect('money', 21)) + " Log effect exponent<br>" + format(player.money.SLStock) + " in stock" },
        canAfford() { return ((player.money.points.gte(this.cost())) && player.money.SLStock.gt(0) ) },
        buy() {
            player.money.points = player.money.points.sub(this.cost())
			player.money.SLStock = player.money.SLStock.sub(1)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1.05)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
    },
	22: {
		unlocked(){ return hasUpgrade('money', 24) },
		title: "Supreme Rune^2",
        cost(x) { return new Decimal(1000).pow(x) },
        display() { return "x1000 Supreme Runes.<br>Cost: " + format(this.cost()) + " Money<br>Bought: " + format(getBuyableAmount('money', 22)) + "<br>Effect: x" + format(buyableEffect('money', 22)) + " Supreme Runes<br>" + format(player.money.SRStock) + " in stock" },
        canAfford() { return ((player.money.points.gte(this.cost())) && player.money.SRStock.gt(0) ) },
        buy() {
            player.money.points = player.money.points.sub(this.cost())
			player.money.SRStock = player.money.SRStock.sub(1)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1000)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
    },
	23: {
		unlocked(){ return hasUpgrade('money', 25) },
		title: "Powered Wood",
        cost(x) { return new Decimal(2).pow(x) },
        display() { return "^1.01 Wood.<br>Cost: " + format(this.cost()) + " Money<br>Bought: " + format(getBuyableAmount('money', 23)) + "<br>Effect: ^" + format(buyableEffect('money', 23)) + " Wood<br>" + format(player.money.PoWStock) + " in stock" },
        canAfford() { return ((player.money.points.gte(this.cost())) && player.money.PoWStock.gt(0) ) },
        buy() {
            player.money.points = player.money.points.sub(this.cost())
			player.money.PoWStock = player.money.PoWStock.sub(1)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1.01)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
    },
	},
})
