addLayer("en", {
    name: "more HP I guess?", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EnR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    onPrestige(){
      player.pr.points = new Decimal(0)
    },
    color: "#18ab00",
    requires: new Decimal(322), // Can be a function that takes requirement increases into account
    resource: "Endurance Runes", // Name of prestige currency
    baseResource: "Power Runes", // Name of resource prestige is based on
    baseAmount() {return player.pr.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('en', 11)) mult = mult.times(upgradeEffect('en', 11))
		mult = mult.times(buyableEffect('en', 11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "E", description: "Shift+E: Reset for endurance runes (Uni. 1)", onPress(){if (canReset(this.layer) && !(inChallenge('universes', 11))) doReset(this.layer)}},
    ],
    effect(){
		return new Decimal(1.08613).pow(player.en.points.add(1).log10())
	  },
    effectDescription(){ return "which is delaying Power Rune softcap by x" + format(layers.en.effect()) },
    layerShown(){return ((hasUpgrade('st', 15) || player.en.unlocked) && !(inChallenge('universes', 11)))},
	branches: ["su"],
	upgrades: {
		11: {
			title: "The HP grind is here",
			description: "x2 Endurance Runes per OoM of Endurance Runes.",
			cost: new Decimal(5),
			effect(){ return new Decimal(2).pow(player.en.points.add(1).log10()) },
			effectDisplay(){ return "x"+format(upgradeEffect('en', 11)) },
		},
		12: {
			title: "Bring out the buyables",
			description: "Unlock a buyable.",
			cost: new Decimal(7),
			unlocked(){ return hasUpgrade('en', 11) },
		},
	},
	buyables: {
	11: {
		unlocked(){ return hasUpgrade('en', 12) },
		title: "Endurance 1",
        cost(x) { return new Decimal(2).pow(x) },
        display() { return "x1.25 Endurance Runes per purchase<br>Cost: " + format(this.cost()) + " Endurance Runes<br>Bought: " + format(getBuyableAmount('en', 11)) + "<br>Effect: x" + format(buyableEffect('en', 11)) + " Endurance Runes" },
        canAfford() { return player.en.points.gte(this.cost()) },
        buy() {
            player.en.points = player.en.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1.25)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
    },
	},
})
