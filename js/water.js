addLayer("water", {
    name: "Water", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "💧", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		tankWater: new Decimal(0),
		tankGain: new Decimal(0),
		tankX: new Decimal(0),
		tankY: new Decimal(0),
		tankZ: new Decimal(0),
		tankCapacity: new Decimal(0),
		total: new Decimal(0),
    }},
	onPrestige(){
		player.ice.points = new Decimal(0)
	},
	softcap(){ 
		return new Decimal("e125") 
	},
	softcapPower(){
        return new Decimal(0.375)
	},
    color: "#4053ff",
    requires: new Decimal("e15"), // Can be a function that takes requirement increases into account
    resource: "water", // Name of prestige currency
    baseResource: "ice", // Name of resource prestige is based on
    baseAmount() {return player.ice.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade('water', 11)) mult = mult.times(2)
		if (hasUpgrade('water', 14)) mult = mult.times(3)
		if (hasUpgrade('water', 15)) mult = mult.times(upgradeEffect('water', 15))
		if (hasUpgrade('water', 23)) mult = mult.times(3)
		mult = mult.times(buyableEffect('water', 11))
		if (hasUpgrade('water', 31)) mult = mult.times(3)
		mult = mult.times(tmp.water.tankBoost)
		if (hasUpgrade('water', 53)) mult = mult.times(upgradeEffect('water', 53))
		if (hasUpgrade('water', 65)) mult = mult.times(4)
		if (hasUpgrade('water', 73)) mult = mult.times(upgradeEffect('water', 73))
		if (hasUpgrade('water', 75)) mult = mult.times(3)
		if (hasMilestone('bo', 2)) mult = mult.times(layers.senur.effect()) 
		if (hasUpgrade('water', 85)) mult = mult.times(1000)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
		exp = exp.times(buyableEffect('water', 14))
		if (hasUpgrade('water', 64)) exp = exp.times(1.025)
		if (hasUpgrade('water', 82)) exp = exp.times(1.05)
		exp = exp.times(tmp.water.ocean4)
		return exp
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Reset for water (Uni. 1)", onPress(){if (canReset(this.layer) && !(inChallenge('universes', 11))) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('ice', 45) || player.water.unlocked) && !(inChallenge('universes', 11))},
	branches: ["st"],
    effect(){
      let pow = new Decimal(0.4)
	  if (hasUpgrade('water', 22)) pow = pow.add(0.2)
	  if (hasUpgrade('water', 24)) pow = pow.add(0.1)
	  if (hasUpgrade('water', 32)) pow = pow.add(0.1)
	  if (hasUpgrade('water', 34)) pow = pow.add(0.075)
	  if (hasUpgrade('water', 45)) pow = pow.add(0.125)
	  if (hasUpgrade('water', 51)) pow = pow.add(upgradeEffect('water', 51))
	  if (hasUpgrade('water', 55)) pow = pow.add(tmp.water.ocean1)
      let eff = player.water.points.add(1).pow(pow)
      return eff
    },
    effectDescription(){
      return "which is boosting Limit Points by x" + format(layers.water.effect())
    },
	tankBoost(){
		let power = new Decimal(0.25)
		if (hasUpgrade('water', 62)) power = power.add(tmp.water.ocean1)
		return player.water.tankWater.add(1).pow(power)
	},
	ocean1(){
		let add = new Decimal(0)
		if (hasUpgrade('water', 72)) add = add.add(tmp.water.ocean2)
		return player.water.total.add(1).log10().pow(0.5).div(50).times(add)
	},
	ocean2(){
		if (getBuyableAmount('water', 101).gte(1)) {
			return player.water.total.add(1).log10().pow(0.4).div(67).add(1)
		} else {
			return new Decimal(1)
		}
	},
	ocean3(){
		if (getBuyableAmount('water', 101).gte(2)) {
			return player.water.total.div("1e52").pow(0.13).add(1)
		} else {
			return new Decimal(1)
		}
	},
	ocean4(){
		if (getBuyableAmount('water', 101).gte(3)) {
			return player.water.total.add(1).log10().pow(0.35).div(100).add(1)
		} else {
			return new Decimal(1)
		}
	},
	tabFormat: {
		"Main": {
		  content: [
			"main-display",
			"prestige-button",
			"resource-display",
			["display-text", "Water containers start overfilling at 1e125 water, causing a softcap of ^0.375!"],
			["buyables", ["1", "2", "3"]],
			"blank",
			"upgrades",
		  ],
		},
		"The Water Tank": {
		  unlocked(){ return hasUpgrade('water', 35) },
		  content: [
			"main-display",
			["display-text", function(){ return "You have " + format(player.water.tankWater) + " ml of Water in the Tank (" + format(player.water.tankGain) + "/sec), boosting Water by x" + format(tmp.water.tankBoost) + "<br>There can be a maximum of " + format(player.water.tankCapacity) + " ml of Water in the Tank<br>Tank X: " + format(player.water.tankX) + "<br>Tank Y: " + format(player.water.tankY) + "<br>Tank Z: " + format(player.water.tankZ) }],
			"blank",
			"clickables",
		  ],
		},
		"The Ocean": {
		  unlocked(){ return hasUpgrade('water', 55) },
		  content: [
			"main-display",
			["display-text", function(){ return "Ocean boosts are based on total water<br><br><h3>Ocean Booster 1: +" + format(tmp.water.ocean1) + " Water effect exponent</h3>" }],
			["display-text", function(){ if (getBuyableAmount('water', 101).gte(1)) return "<h3>Ocean Booster 2: ^" + format(tmp.water.ocean2) + " Ice</h3>" }],
		    ["display-text", function(){ if (getBuyableAmount('water', 101).gte(2)) return "<h3>Ocean Booster 3: x" + format(tmp.water.ocean3) + " Different Runes, and keep Universes layer unlocked</h3>" }],
			["display-text", function(){ if (getBuyableAmount('water', 101).gte(3)) return "<h3>Ocean Booster 4: ^" + format(tmp.water.ocean4) + " Water</h3>" }],
			"blank",
			["buyables", ["10"]],
		  ],
		},
	},
	upgrades: {
		11: {
			title: "we get water",
			description: "x2 Water",
			cost: new Decimal(2)
		},
		12: {
			title: "auto-freeze",
			description: "100% Ice per second",
			cost: new Decimal(4),
			unlocked(){ return hasUpgrade("water", 11) },
		},
		13: {
			title: "waterlogged",
			description: "x3 Log milestone 1 effect exponent",
			cost: new Decimal(7),
			unlocked(){ return hasUpgrade("water", 12) },
		},
		14: {
			title: "create a puddle",
			description: "x3 water",
			cost: new Decimal(20),
			unlocked(){ return hasUpgrade("water", 13) },
		},
		15: {
			title: "water cycle",
			description: "Water boosts itself",
			cost: new Decimal(50),
			unlocked(){ return hasUpgrade("water", 14) },
			effect(){ 
				let eff = player.water.points.add(1).pow(0.2);
        		eff = softcap(eff, new Decimal("1000"), 0.4)
       		 	return eff 
			},
			effectDisplay(){
				let s = ""
        		let upgEffect = upgradeEffect(this.layer, this.id)
        		if (upgEffect.gte(new Decimal("1000")) ) {
          		  s = " (Softcapped)"
        		}
        		return "x" + format(upgradeEffect("water", 15)) + s;
			},
		},
		21: {
			title: "water freezing action",
			description: "Water boosts Ice",
			cost: new Decimal(200),
			unlocked(){ return hasUpgrade("water", 15) },
			effect(){ 
				let eff = player.water.points.add(1).pow(0.75);
        		eff = softcap(eff, new Decimal("1e10"), 0.35)
       		 	return eff 
			},
			effectDisplay(){
				let s = ""
        		let upgEffect = upgradeEffect(this.layer, this.id)
        		if (upgEffect.gte(new Decimal("1e10")) ) {
          		  s = " (Softcapped)"
        		}
        		return "x" + format(upgradeEffect("water", 21)) + s;
			},
		},
		22: {
			title: "create a pond",
			description: "Water effect is better",
			cost: new Decimal(1000),
			unlocked(){ return hasUpgrade("water", 21) },
		},
		23: {
			title: "more rain",
			description: "x3 water",
			cost: new Decimal(1250),
			unlocked(){ return hasUpgrade("water", 22) },
		},
		24: {
			title: "create a big pond",
			description: "Water effect is better",
			cost: new Decimal(10000),
			unlocked(){ return hasUpgrade("water", 23) },
		},
		25: {
			title: "create more water",
			description: "Unlock a buyable",
			cost: new Decimal(15000),
			unlocked(){ return hasUpgrade("water", 24) },
		},
		31: {
			title: "limits' glamour",
			description: "100% Super Limit Points and Limit Points per second and x3 Water.",
			cost: new Decimal(100000),
			unlocked(){ return hasUpgrade("water", 25) },
		},
		32: {
			title: "create a bigger pond",
			description: "Water effect is better",
			cost: new Decimal(7500000),
			unlocked(){ return hasUpgrade("water", 31) },
		},
		33: {
			title: "more freezing action",
			description: "Unlock a buyable",
			cost: new Decimal("5e8"),
			unlocked(){ return hasUpgrade("water", 32) },
		},
		34: {
			title: "create a even bigger pond",
			description: "Water effect is better",
			cost: new Decimal("3e9"),
			unlocked(){ return hasUpgrade("water", 33) },
		},
		35: {
			title: "fill a container",
			description: "Unlock the Water Tank",
			cost: new Decimal("1e10"),
			unlocked(){ return hasUpgrade("water", 34) },
		},
		41: {
			title: "fill it faster",
			description: "Unlock a buyable",
			cost: new Decimal("1e12"),
			unlocked(){ return hasUpgrade("water", 35) },
		},
		42: {
			title: "tanky limits",
			description: "ml of Water boosts Limit Points",
			cost: new Decimal(2744),
			unlocked(){ return hasUpgrade("water", 41) },
	        currencyDisplayName: "ml of Water in Tank",
			currencyInternalName: "tankWater",
			currencyLayer: "water",
			effect(){ 
				let eff = player.water.tankWater.add(1).pow(0.5);
        		eff = softcap(eff, new Decimal("1e10"), 0.5)
       		 	return eff 
			},
			effectDisplay(){
				let s = ""
        		let upgEffect = upgradeEffect(this.layer, this.id)
        		if (upgEffect.gte(new Decimal("1e10")) ) {
          		  s = " (Softcapped)"
        		}
        		return "x" + format(upgradeEffect("water", 42)) + s;
			},
		},
		43: {
			title: "Faster power runes (I'm back!)",
			description: "Set Power Rune amount to it's softcap. But disable Power Rune upgrade 'Delayer 5'.",
			cost: new Decimal("1e16"),
			unlocked(){ return hasUpgrade("water", 42) },
		},
		44: {
			title: "Even more limits",
			description: "^1.03 Limit Points.",
			cost: new Decimal("3e17"),
			unlocked(){ return hasUpgrade("water", 43) },
		},
		45: {
			title: "A lake",
			description: "Water effect is better yet again.",
			cost: new Decimal("5e18"),
			unlocked(){ return hasUpgrade("water", 44) },
		},
		51: {
			title: "Tanky booster",
			description: "ml of Water boosts Water effect exponent",
			cost: new Decimal(29791),
			unlocked(){ return hasUpgrade("water", 45) },
	        currencyDisplayName: "ml of Water in Tank",
			currencyInternalName: "tankWater",
			currencyLayer: "water",
			effect(){ 
				let eff = player.water.tankWater.add(1).log10().div(100)
        		eff = softcap(eff, new Decimal("100"), 0.5)
       		 	return eff 
			},
			effectDisplay(){
				let s = ""
        		let upgEffect = upgradeEffect(this.layer, this.id)
        		if (upgEffect.gte(new Decimal("100")) ) {
          		  s = " (Softcapped)"
        		}
        		return "+" + format(upgradeEffect("water", 51)) + s;
			},
		},
		52: {
			title: "Exponential growth",
			description: "Unlock a buyable",
			cost: new Decimal("5e20"),
			unlocked(){ return hasUpgrade("water", 51) },
		},
		53: {
			title: "Water synergy",
			description: "Limit Points boosts Water",
			cost: new Decimal("7.5e21"),
			unlocked(){ return hasUpgrade("water", 52) },
			effect(){ 
				let eff = player.limit.points.add(1).pow(0.003);
        		eff = softcap(eff, new Decimal("1000000"), 0.5)
       		 	return eff 
			},
			effectDisplay(){
				let s = ""
        		let upgEffect = upgradeEffect(this.layer, this.id)
        		if (upgEffect.gte(new Decimal("1000000")) ) {
          		  s = " (Softcapped)"
        		}
        		return "x" + format(upgradeEffect("water", 53)) + s;
			},
		},
		54: {
			title: "Stronger fields",
			description: "cm² Ice effect is better and x10 W.I.T.",
			cost: new Decimal("2e24"),
			unlocked(){ return hasUpgrade("water", 53) },
		},
		55: {
			title: "The ocean",
			description: "Unlock a new subtab",
			cost: new Decimal("1e30"),
			unlocked(){ return hasUpgrade("water", 54) },
		},
		61: {
			title: "Oceanic freeze",
			description: "Ocean Booster 1 boosts Ice at a better rate",
			cost: new Decimal("2.5e31"),
			unlocked(){ return hasUpgrade("water", 55) },
			effect(){ 
				let power = new Decimal(40)
				if (hasUpgrade('water', 63)) power = power.add(upgradeEffect('water', 63))
				let eff = (new Decimal(1).add(tmp.water.ocean1)).pow(power);
       		 	return eff 
			},
			effectDisplay(){
        		return "x" + format(upgradeEffect("water", 61))
			},
		},
		62: {
			title: "Tanky ocean",
			description: "Ocean Booster 1 affects W.I.T effect.",
			cost: new Decimal("1e33"),
			unlocked(){ return hasUpgrade("water", 61) },
		},
		63: {
			title: "Oceanic froster",
			description: "Water adds to 'Oceanic freeze' exponent.",
			cost: new Decimal("1e35"),
			unlocked(){ return hasUpgrade("water", 62) },
			effect(){ 
				let eff = player.water.points.add(1).log10().pow(0.75)
       		 	return eff 
			},
			effectDisplay(){
        		return "+" + format(upgradeEffect("water", 63))
			},
		},
		64: {
			title: "Exponents",
			description: "^1.025 Water.",
			cost: new Decimal("7.5e35"),
			unlocked(){ return hasUpgrade("water", 63) },
		},
		65: {
			title: "To the next boost",
			description: "x4 Water.",
			cost: new Decimal("1e39"),
			unlocked(){ return hasUpgrade("water", 64) },
		},
		71: {
			title: "Oceanic limits",
			description: "Ocean Booster 2 affects Limit Points.",
			cost: new Decimal("1e45"),
			unlocked(){ return hasUpgrade("water", 65) },
		},
		72: {
			title: "Oceanic oceans",
			description: "Ocean Booster 2 multiplies Ocean Booster 1.",
			cost: new Decimal("1e46"),
			unlocked(){ return hasUpgrade("water", 71) },
		},
		73: {
			title: "Multiversal boost",
			description: "Different Runes boost Water.",
			cost: new Decimal("1e48"),
			unlocked(){ return hasUpgrade("water", 72) },
			effect(){ 
				let eff = player.dr.points.add(1).pow(0.75)
       		 	return eff 
			},
			effectDisplay(){
        		return "x" + format(upgradeEffect("water", 73))
			},
		},
		73: {
			title: "Multiversal boost",
			description: "Different Runes boost Water.",
			cost: new Decimal("1e48"),
			unlocked(){ return hasUpgrade("water", 72) },
			effect(){ 
				let eff = player.dr.points.add(1).pow(0.75)
       		 	return eff 
			},
			effectDisplay(){
        		return "x" + format(upgradeEffect("water", 73))
			},
		},
		74: {
			title: "Multiversal boost 2",
			description: "Limit Power boosts Different Runes.",
			cost: new Decimal("1e56"),
			unlocked(){ return hasUpgrade("water", 73) },
			effect(){ 
				let eff = new Decimal(1.002).pow(player.limit.power)
       		 	return eff 
			},
			effectDisplay(){
        		return "x" + format(upgradeEffect("water", 74))
			},
		},
		75: {
			title: "Alternate spam",
			description: "x3 Water and unlock new Different Rune upgrades.",
			cost: new Decimal("1e59"),
			unlocked(){ return hasUpgrade("water", 74) },
		},
		81: {
			title: "Oceanic glaciers",
			description: "Ocean Booster 3 affects Ice as well.",
			cost: new Decimal("1e70"),
			unlocked(){ return hasUpgrade("dr", 21) },
		},
		82: {
			title: "I can smell INFLATION!",
			description: "An extra ^1.05 water just for you.",
			cost: new Decimal("1e80"),
			unlocked(){ return hasUpgrade("dr", 22) },
		},
		83: {
			title: "Multiversal buyable",
			description: "Unlock a buyable.",
			cost: new Decimal("1e140"),
			unlocked(){ return hasUpgrade("dr", 23) },
		},
		84: {
			title: "Multiversal buyable upgrade",
			description: "'Gift to another universe' also boosts Яυnɘƨ.",
			cost: new Decimal("1e150"),
			unlocked(){ return hasUpgrade("dr", 24) },
		},
		85: {
			title: "The final booster!",
			description: "Congrats on getting Ocean Booster 4! As a reward, x1000 Water!",
			cost: new Decimal("1e170"),
			unlocked(){ return getBuyableAmount('water', 101).gte(3) },
		},
	},
	buyables: {
	11: {
		unlocked(){ return hasUpgrade('water', 25) },
		title: "water spread",
        cost(x) { return new Decimal(10).pow(x).times(10000) },
        display() { return "x2 Water per purchase<br>Cost: " + format(this.cost()) + " Water<br>Bought: " + format(getBuyableAmount('water', 11)) + "<br>Effect: x" + format(buyableEffect('water', 11)) + " Water" },
        canAfford() { return player.water.points.gte(this.cost()) },
        buy() {
            player.water.points = player.water.points.sub(this.cost())
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
		unlocked(){ return hasUpgrade('water', 33) },
		title: "freeze water",
        cost(x) { return new Decimal(6).pow(x).times("e8") },
        display() { return "x1.25 cm² Ice per purchase<br>Cost: " + format(this.cost()) + " Water<br>Bought: " + format(getBuyableAmount('water', 12)) + "<br>Effect: x" + format(buyableEffect('water', 12)) + " cm² Ice" },
        canAfford() { return player.water.points.gte(this.cost()) },
        buy() {
            player.water.points = player.water.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1.25)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
	},
	13: {
		unlocked(){ return hasUpgrade('water', 41) },
		title: "faster water",
        cost(x) { return new Decimal(1.5).pow(x).times(10) },
        display() { return "x1.3 ml Water in Tank per purchase<br>Cost: " + format(this.cost()) + " ml Water<br>Bought: " + format(getBuyableAmount('water', 13)) + "<br>Effect: x" + format(buyableEffect('water', 13)) + " ml Water" },
        canAfford() { return player.water.tankWater.gte(this.cost()) },
        buy() {
            player.water.tankWater = player.water.tankWater.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1.3)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
	},
	14: {
		unlocked(){ return hasUpgrade('water', 52) },
		title: "water cycle extreme",
        cost(x) { return new Decimal(12).pow(x.pow(x.div(17).add(1))).times("1e20") },
        display() { return "^1.01 Water per purchase<br>Cost: " + format(this.cost()) + " Water<br>Bought: " + format(getBuyableAmount('water', 14)) + "<br>Effect: ^" + format(buyableEffect('water', 14)) + " Water" },
        canAfford() { return player.water.points.gte(this.cost()) },
        buy() {
            player.water.points = player.water.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1.01)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
	},
	21: {
		unlocked(){ return hasUpgrade('water', 35) },
		title: "Tank X",
        cost(x) { return new Decimal(2).pow(x).times("e10") },
        display() { return "Add 1 to Tank X per purchase<br>Cost: " + format(this.cost()) + " Water<br>Bought: " + format(getBuyableAmount('water', 21)) + "<br>Effect: +" + format(buyableEffect('water', 21)) + " Tank X" },
        canAfford() { return player.water.points.gte(this.cost()) },
        buy() {
            player.water.points = player.water.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1)
			let base2 = x
			let expo = new Decimal(1)
			return base1.times(Decimal.times(base2, expo))
		},
	},
	22: {
		unlocked(){ return hasUpgrade('water', 35) },
		title: "Tank Y",
        cost(x) { return new Decimal(2).pow(x).times("e10") },
        display() { return "Add 1 to Tank Y per purchase<br>Cost: " + format(this.cost()) + " Water<br>Bought: " + format(getBuyableAmount('water', 22)) + "<br>Effect: +" + format(buyableEffect('water', 22)) + " Tank Y" },
        canAfford() { return player.water.points.gte(this.cost()) },
        buy() {
            player.water.points = player.water.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1)
			let base2 = x
			let expo = new Decimal(1)
			return base1.times(Decimal.times(base2, expo))
		},
	},
	23: {
		unlocked(){ return hasUpgrade('water', 35) },
		title: "Tank Z",
        cost(x) { return new Decimal(2).pow(x).times("e10") },
        display() { return "Add 1 to Tank Z per purchase<br>Cost: " + format(this.cost()) + " Water<br>Bought: " + format(getBuyableAmount('water', 23)) + "<br>Effect: +" + format(buyableEffect('water', 23)) + " Tank Z" },
        canAfford() { return player.water.points.gte(this.cost()) },
        buy() {
            player.water.points = player.water.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1)
			let base2 = x
			let expo = new Decimal(1)
			return base1.times(Decimal.times(base2, expo))
		},
	},
	31: {
		unlocked(){ return hasUpgrade('water', 83) },
		title: "Gift to another universe",
        cost(x) { return new Decimal(2).pow(x.pow(1.25)).times("1e140") },
        display() { return "x1.2 Different Runes per purchase<br>Cost: " + format(this.cost()) + " Water<br>Bought: " + format(getBuyableAmount('water', 31)) + "<br>Effect: x" + format(buyableEffect('water', 31)) + " Different Runes" },
        canAfford() { return player.water.points.gte(this.cost()) },
        buy() {
            player.water.points = player.water.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1.2)
			let base2 = x
			let expo = new Decimal(1)
			return base1.pow(Decimal.pow(base2, expo))
		},
	},
	101: {
		unlocked(){ return hasUpgrade('water', 55) },
		title: "Unlock a new Ocean Booster",
        cost(x) { return new Decimal("1e10").pow(x.add(1).pow(x.add(1).div(1.25))).times("1e30") },
        display() { return "Unlock a new Ocean Booster.<br>Cost: " + format(this.cost()) + " Water<br>Bought: " + format(getBuyableAmount('water', 101)) + "<br>Effect: Unlocks " + format(buyableEffect('water', 101)) + " Ocean Boosters" },
        canAfford() { return player.water.points.gte(this.cost()) },
        buy() {
            player.water.points = player.water.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x){
			let base1 = new Decimal(1)
			let base2 = x
			let expo = new Decimal(1)
			return base1.times(Decimal.times(base2, expo))
		},
		style() {return { "background": "linear-gradient(90deg, #2021dd, #4053ff)",
        "width": "225px",
        "height": "150px",
	    "border-radius": "10%",
        }},
	},
	},
    update(diff){
		let gain = new Decimal(0)
		if (hasUpgrade('water', 35)) gain = gain.add(1)
		if (hasUpgrade('water', 41)) gain = gain.times(buyableEffect('water', 13))
		if (hasUpgrade('water', 54)) gain = gain.times(10)
		
        player.water.tankGain = gain
		gain = gain.times(diff)
		if (player.water.tankWater.lt(player.water.tankCapacity)) {
		    player.water.tankWater = player.water.tankWater.add(gain)
		}
		if (player.water.tankWater.gt(player.water.tankCapacity)) {
		    player.water.tankWater = player.water.tankCapacity
		}
		player.water.tankX = getBuyableAmount('water', 21).add(1)
		player.water.tankY = getBuyableAmount('water', 22).add(1)
		player.water.tankZ = getBuyableAmount('water', 23).add(1)
		player.water.tankCapacity = player.water.tankX.times(player.water.tankY.times(player.water.tankZ))
	},
})
