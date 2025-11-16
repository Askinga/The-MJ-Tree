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
    }},
	passiveGeneration(){
		let p = new Decimal(0)
		if (hasUpgrade('money', 12)) p = p.add(1)
		return p
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
            description: "Increase MB stock by +1 and unlock item 'Polished Wood' in shop",
            cost: new Decimal(300000),
            unlocked(){ return hasUpgrade('money', 15) },
        },
	},
	update(diff) {
		let stock = new Decimal(1)
		let aS = new Decimal(1)
		let bS = new Decimal(1)
		if (hasUpgrade('money', 15)) aS = aS.add(1) 

		player.money.MBStock = aS
		player.money.polishedStock = aS
		stock = stock.times(diff)
		player.money.stockTimer = player.money.stockTimer.sub(stock)
		if (player.money.stockTimer.lte(0)) {
			player.money.stockTimer = new Decimal(30)
			if (hasUpgrade('money', 14)) {
				player.money.moneyBoosterStock = new Decimal(player.money.MBStock)
			}
			if (hasUpgrade('money', 15)) {
				player.money.PWStock = new Decimal(player.money.polishedStock)
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
        cost(x) { return new Decimal(10).pow(x).add(1) },
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
	},
})
