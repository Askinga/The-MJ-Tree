addLayer("uni", {
    name: "Universal Runes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Uni", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		galaxies: new Decimal(0),
		stars: new Decimal(0),
		planets: new Decimal(0),
		CR: new Decimal(0),
		CRg: new Decimal(0),
		Sg: new Decimal(0),
		Pg: new Decimal(0),
    }},
	passiveGeneration(){
		let p = new Decimal(0)
		if (hasUpgrade('uni', 12) && !(inChallenge('universes', 11))) p = p.add(1)
		return p
	},
    color: "#7a49d6",
    requires: new Decimal("ee60"), // Can be a function that takes requirement increases into account
    resource: "Universal Runes", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
	Pb() {
		return player.uni.planets.add(1).pow(0.3)
	},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('uni', 11)) mult = mult.times(8)
		if (hasUpgrade('uni', 12)) mult = mult.times(4)
		if (hasUpgrade('uni', 13)) mult = mult.times(10)
		if (hasUpgrade('uni', 13)) mult = mult.times(upgradeEffect('uni', 13))
		if (hasUpgrade('uni', 14)) mult = mult.times(10)
		if (hasUpgrade('uni', 15)) mult = mult.times(upgradeEffect('uni', 15))
		if (hasUpgrade('uni', 21)) mult = mult.times(upgradeEffect('uni', 21))
		if (hasUpgrade('uni', 22)) mult = mult.times(upgradeEffect('uni', 22))
		if (hasUpgrade('uni', 24)) mult = mult.times(5)
		mult = mult.times(tmp.uni.Pb)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "n", description: "N: Reset for universal runes (Uni. 1)", onPress(){if (canReset(this.layer) && !(inChallenge('universes', 11))) doReset(this.layer)}},
    ],
    effect(){
      return player.uni.points.add(1).pow(4)
    },
    effectDescription(){
      return "which is boosting 5th row currencies and wood effect exponent by x"+format(layers.uni.effect())
    },
	tabFormat: {
		"Upgrades & Milestones": {
			content: [
				"main-display",
				"prestige-button",
				"resource-display",
				"blank",
				"milestones",
				"upgrades",
			],
		},
		"The Universe": {
			unlocked(){ return hasUpgrade('uni', 25) },
			content: [
				"main-display",
				["display-text", function() { return 'You have <span style=" color: rgb(22, 222, 222); text-shadow: rgb(22, 222, 222) 0px 0px 10px"><h2>' +
                format(player.uni.CR) +
                '</h2></span> Celestial Runes.<br>(' + format(player.uni.CRg) + '/sec)' }],
				"blank",
				["display-text", function () { return (
                'The universe currently has <span style=" color: rgb(87, 23, 156); text-shadow: rgb(87, 23, 156) 0px 0px 10px"><h2>' +
                format(player.uni.galaxies) +
                '</h2></span> Galaxies, <span style=" color: rgb(233, 226, 20); text-shadow: rgb(233, 226, 20) 0px 0px 10px"><h2>' +
                format(player.uni.stars) +
                '</h2></span> Stars and <span style=" color: rgb(166, 98, 27); text-shadow: rgb(166, 98, 27) 0px 0px 10px"><h2>' +
                format(player.uni.planets) +
                '</h2></span> Planets.'
                );
                },
                ],
				"blank",
				"buyables",
				"blank",
				["display-text", function(){ return "Galaxies generate " + format(player.uni.Sg) + " Stars per second<br>Stars generate " + format(player.uni.Pg) + " Planets per second<br>Planets boost Celestial Runes and Universal Runes by x" + format(tmp.uni.Pb) }],
			],
		buttonStyle() {
                    return {
                        'background': 'linear-gradient(45deg, #c016de, black)',
                        'border-color': '#7a49d6',
                        'color': 'white',
					}
		    },
	},
	},
    layerShown(){return (((player.points.gte("e1e60") && hasUpgrade('money', 45)) || player.uni.unlocked)) && !(inChallenge('universes', 11))},
	branches: ["money"],
  milestones: {
    0: {
        requirementDescription: "1 Universal Rune",
        effectDescription: "Keep Supreme Rune Milestones and xe2500 Logs",
        done() { return player.uni.points.gte(1) }
    },
	1: {
        requirementDescription: "2 Universal Runes",
        effectDescription: "/30 Stock cooldown (OP)",
        done() { return player.uni.points.gte(2) }
    },
	2: {
        requirementDescription: "3 Universal Runes",
        effectDescription: "Autobuy 5th row upgrades, keep Supreme Rune Challenges and keep their passive generation, 100% Time Boosters per second",
        done() { return player.uni.points.gte(3) }
    },
	3: {
        requirementDescription: "4 Universal Runes",
        effectDescription: "Autobuy Money Buyables (regardless of stock)",
        done() { return player.uni.points.gte(4) }
    },
  },
  upgrades: {
    11: {
		title: "Create a new universe (OP)",
        description: "x8 UnR (universal runes), x1e20 $ ",
        cost: new Decimal(5),
    },
	12: {
		title: "Celestial stuff (VERY OP)",
        description: "x4 UnR, boost $ based on UnR, 100% UnR per second",
        cost: new Decimal(100),
		unlocked(){ return hasUpgrade('uni', 11) },
		effect(){ return player.uni.points.add(10).log(10).log(10).pow(0.3).div(5).add(1) },
		effectDisplay(){ return "^"+format(upgradeEffect('uni', 12)) },
    },
	13: {
		title: "Infuse points into your universe",
        description: "x10 UnR, boost UnR based on Points",
        cost: new Decimal(3000),
		unlocked(){ return hasUpgrade('uni', 12) },
		effect(){ return player.points.add(10).log(10).log(10).pow(0.7).add(1) },
		effectDisplay(){ return "x"+format(upgradeEffect('uni', 13)) },
    },
	14: {
		title: "Enter different universes",
        description: "x10 UnR, unlock side layer 'Universes'",
        cost: new Decimal(1000000),
		unlocked(){ return hasUpgrade('uni', 13) },
    },
	15: {
		title: "Woodverse",
        description: "Boost UnR based on Wood effect exponent",
        cost: new Decimal(15000000),
		unlocked(){ return hasUpgrade('dr', 13) },
		effect(){ return player.logs.woodPower.add(1).log(10).div(6.7).add(1) },
		effectDisplay(){ return "x"+format(upgradeEffect('uni', 15)) },
    },
	21: {
		title: "Firewoodverse",
        description: "Boost UnR based on Firewood",
        cost: new Decimal(150000000),
		unlocked(){ return hasUpgrade('uni', 15) },
		effect(){ return player.logs.firewood.add(1).log(10).div(400).add(1) },
		effectDisplay(){ return "x"+format(upgradeEffect('uni', 21)) },
    },
	22: {
		title: "Levelverse",
        description: "Boost UnR based on Levels",
        cost: new Decimal(1e9),
		unlocked(){ return hasUpgrade('uni', 21) },
		effect(){ return player.l.level.add(1).log(10).div(10).add(1) },
		effectDisplay(){ return "x"+format(upgradeEffect('uni', 22)) },
    },
	23: {
		title: "Lets go back in there",
        description: "Unlock more Different Rune upgrades",
        cost: new Decimal(2e10),
		unlocked(){ return hasUpgrade('uni', 22) },
    },
	24: {
		title: "Were back",
        description: "x5 UnR",
        cost: new Decimal(2e10),
		unlocked(){ return hasUpgrade('dr', 15) },
    },
	25: {
		title: "Please like Universe #1967",
        description: "Unlock subtab 'The Universe'",
        cost: new Decimal(1e11),
		unlocked(){ return hasUpgrade('uni', 24) },
    },
  },
  update(diff){
	  let gain = new Decimal(0)
	  let Stg = new Decimal(0)
	  let Plg = new Decimal(0)
	  if (hasUpgrade('uni', 25)) gain = gain.add(1)
	  gain = gain.times(tmp.uni.Pb)

	  player.uni.CRg = gain
	  Stg = player.uni.galaxies
	  Plg = player.uni.stars
	  player.uni.Sg = Stg
	  player.uni.Pg = Plg
	  gain = gain.times(diff)
	  Stg = Stg.times(diff)
	  Plg = Plg.times(diff)
	  player.uni.CR = player.uni.CR.add(gain)
	  player.uni.stars = player.uni.stars.add(Stg)
	  player.uni.planets = player.uni.planets.add(Plg)
  },
  buyables: {
	11: {
		title: "Buy a Galaxy",
        cost(x) { return new Decimal(2).pow(x) },
        display() { return "Cost: " + format(this.cost()) + " Celestial Runes" },
        canAfford() { return player.uni.CR.gte(this.cost()) },
        buy() {
            player.uni.CR = player.uni.CR.sub(this.cost())
			player.uni.galaxies = player.uni.galaxies.add(1)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
    },
  },
})
