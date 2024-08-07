
// Tip: 11 means Column 1, Row 1 for upgrades, milestones, etc
addLayer("p", {
    name: "Clicks", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Clicks", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {
        let exp = 0.30
        return exp
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	mult = mult.times(buyableEffect('p', 12))
	if (hasUpgrade('p', 11)) mult = mult.times(2.5)
	if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
	return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    resetsNothing: true,
    hotkeys: [
        {key: "c", description: "C: Get Clicks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    buyables: {  
	11: {
        title: "Click Buyable 1",
        cost(x) {
            let mult2 = 1.01
            return new Decimal(100).mul(Decimal.pow(1.2, x)).mul(Decimal.pow(x , Decimal.pow(mult2 , x))).floor()
        },
        display() {
            return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Clicks" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Points are multiplied by x" + format(buyableEffect(this.layer, this.id))
        },
        canAfford() {
            return player[this.layer].points.gte(this.cost())
        },
        buy() {
            let cost = new Decimal (1)
            player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
            let base1 = new Decimal(1.5)
            let base2 = x
            
	    let expo = new Decimal(1.001)
            let eff = base1.pow(Decimal.pow(base2, expo))
            return eff
        },
    },
    12: {
        title: "Click Buyable 2",
        cost(x) {
            let mult2 = 1.02
            return new Decimal(200).mul(Decimal.pow(1.2, x)).mul(Decimal.pow(x , Decimal.pow(mult2 , x))).floor()
        },
        display() {
            return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Clicks" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Clicks are multiplied by x" + format(buyableEffect(this.layer, this.id))
        },
        canAfford() {
            return player[this.layer].points.gte(this.cost())
        },
        buy() {
            let cost = new Decimal (1)
            player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
            let base1 = new Decimal(1.2)
            let base2 = x
            
	    let expo = new Decimal(1.001)
            let eff = base1.pow(Decimal.pow(base2, expo))
            return eff
        },
    },
    },
    upgrades: {
        11: {
            title: "Get more Clicks",
            description: "x2.5 Clicks",
            cost: new Decimal(1000),
	},
        12: {
            title: "Get more Points",
            description: "x5 Points",
            cost: new Decimal(25000),
	    unlocked() { return (hasUpgrade('p', 11)) },
	},
        13: {
            title: "Click boost",
            description: "Multiply Click gain based on points.",
            cost: new Decimal(1000000),
            effect(){
                return player.points.add(1).pow(0.075)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() { return (hasUpgrade('p', 12)) },
	},
    },
})
