addLayer("a", {
    name: "Antimatter",
    symbol: "A",
    position: 1,
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(10),   
	antigain: new Decimal(0),
	dim1amo: new Decimal(0),// "points" is the internal name for the main resource of the layer.
	dim2amo: new Decimal(0),
	dim3amo: new Decimal(0),
	dim4amo: new Decimal(0),
	dim5amo: new Decimal(0),
	dim6amo: new Decimal(0),
	dim7amo: new Decimal(0),
	dim8amo: new Decimal(0),
	dim1gain: new Decimal(0),
	dim2gain: new Decimal(0),
	dim3gain: new Decimal(0),
	dim4gain: new Decimal(0),
	dim5gain: new Decimal(0),
	dim6gain: new Decimal(0),
	dim7gain: new Decimal(0),
	dim8gain: new Decimal(0),
	dim1mul: new Decimal(1),
	dim2mul: new Decimal(1),
	dim3mul: new Decimal(1),
	dim4mul: new Decimal(1),
	dim5mul: new Decimal(1),
	dim6mul: new Decimal(1),
	dim7mul: new Decimal(1),
	dim8mul: new Decimal(1),
    }},
    nodeStyle() {
      	return options.imageNode ? {
            'color': 'red',
            'background-image': 'url("resources/download.webp")',
            'background-position': 'center center',
            'background-size': '160%',
            'border': '1px solid white'
        } : {
            'background-image': 'radial-gradient(circle at center, #cc0000, #770000)'
        }
},
    color: "#cc0000",                       // The color for this layer, which affects many elements.
    resource: "antimatter",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).
    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.
    requires(){
	  let req = new Decimal(3.855433e101)
	  req = req.times(player.a.points.add(1).pow(10))
    return req
    },              // The amount of the base needed to gain 1 of the prestige currency.                                    // Also the amount required to unlock the layer
    type: "normal",   
    exponent(){
       let exp = new Decimal(0.0000000001)
       return exp
    }, // Determines the formula used for calculating prestige currency.                       // "normal" prestige gain is (currency^exponent).
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        mult = new Decimal(1)               // Factor in any bonuses multiplying gain here.
    	return mult
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    layerShown(){
        let visible = false
        if (hasChallenge('r', 22) || player.a.unlocked) visible = true
       return visible
},          // Returns a bool for if this layer's node should be visible in the tree.
    branches: ["g"],
    canReset(){return (player.points.gte(1e112) && (!player.a.points.gt(10)))},
    hotkeys: [
        {key: "", description: "Sorry, no hotkey for antimatter layer.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect(){
       let base = 0
	if(hasMilestone('a',0)) base = 0.25
	let eff = player.a.points.add(1).pow(base)
       return eff
       },
        effectDescription() {
            let desc = "which is boosting Point generation by x" + format(tmp[this.layer].effect);
            return desc;
        },
	tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
	"blank",
                ["display-text", function() {
                    return "You have "+ format(player.a.dim1amo) +" Dimension 1. (+" + format(player.a.dim1gain) + "/s)" 
                }], 
	"blank",
		["display-text", function() {
                    if (player.a.dim2amo.gte(1)) return "You have "+ format(player.a.dim2amo) +" Dimension 2. (+" + format(player.a.dim2gain) + "/s)" 
                }], 
	"blank",
		["display-text", function() {
                    if (player.a.dim3amo.gte(1)) return "You have "+ format(player.a.dim3amo) +" Dimension 3. (+" + format(player.a.dim3gain) + "/s)" 
                }],
        "blank",
		["display-text", function() {
                    if (player.a.dim4amo.gte(1)) return "You have "+ format(player.a.dim4amo) +" Dimension 4. (+" + format(player.a.dim4gain) + "/s)" 
                }],
        "blank",
		["display-text", function() {
                    if (player.a.dim5amo.gte(1)) return "You have "+ format(player.a.dim5amo) +" Dimension 5. (+" + format(player.a.dim5gain) + "/s)" 
                }],
	"blank",
        "buyables",
	"blank",
	"milestones",
	"blank",
	"upgrades"
    ],
    buyables: {
        11: {
            title: "Dimension 1",
            unlocked() { return (hasChallenge('r', 22)) },
            cost(x) {
                return new Decimal(11).mul(Decimal.pow(2, x)).floor()
            },
            display() {
                let dis = "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Antimatter." + "<br>You have bought " + getBuyableAmount(this.layer, this.id) + " Dimension 1."
                if (player.points.gte("1ee20")) dis = dis + " Dimension 1 amount multiplies Antimatter generation by " + format(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.a.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.a.points = player.a.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                gensqboost = new Decimal(1.0717734627)
                if (player.points.gte("1ee20")) {
                    eff = new Decimal(gensqboost).pow(x)
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Cost Formula: 11 x 2^Amt. Generation formula: Dimension 1 amt."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        12: {
            title: "Dimension 2",
            unlocked() { return (getBuyableAmount("a", 11).gte(3)) },
            cost(x) {
                return new Decimal(100).mul(Decimal.pow(2.5, x)).floor()
            },
            display() {
                let dis = "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Antimatter." + "<br>You have bought " + getBuyableAmount(this.layer, this.id) + " Dimension 2."
                if (player.points.gte("1ee20")) dis = dis + " Dimension 2 amount multiplies Dim 1 generation by " + format(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.a.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.a.points = player.a.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                gensqboost = new Decimal(1.0717734627)
                if (player.points.gte("1ee20")) {
                    eff = new Decimal(gensqboost).pow(x)
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Cost Formula: 100 x 2.5^Amt. Generation formula: Dimension 2 amt."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
    	21: {
            title: "Dimension 3",
            unlocked() { return (getBuyableAmount("a", 12).gte(3)) },
            cost(x) {
                return new Decimal(10000).mul(Decimal.pow(4, x)).floor()
            },
            display() {
                let dis = "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Antimatter." + "<br>You have bought " + getBuyableAmount(this.layer, this.id) + " Dimension 3."
                if (player.points.gte("1ee20")) dis = dis + " Dimension 3 amount multiplies Dim 2 generation by " + format(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.a.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.a.points = player.a.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                gensqboost = new Decimal(1.0717734627)
                if (player.points.gte("1ee20")) {
                    eff = new Decimal(gensqboost).pow(x)
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Cost Formula: 10,000 x 4^Amt. Generation formula: Dimension 3 amt."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
   	22: {
            title: "Dimension 4",
            unlocked() { return (getBuyableAmount("a", 21).gte(3)) },
            cost(x) {
                return new Decimal(1000000).mul(Decimal.pow(7, x)).floor()
            },
            display() {
                let dis = "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Antimatter." + "<br>You have bought " + getBuyableAmount(this.layer, this.id) + " Dimension 4."
                if (player.points.gte("1ee20")) dis = dis + " Dimension 4 amount multiplies Dim 3 generation by " + format(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.a.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.a.points = player.a.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                gensqboost = new Decimal(1.0717734627)
                if (player.points.gte("1ee20")) {
                    eff = new Decimal(gensqboost).pow(x)
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Cost Formula: 1M x 7^Amt. Generation formula: Dimension 4 amt."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
    	31: {
            title: "Dimension 5",
            unlocked() { return (getBuyableAmount("a", 22).gte(4)) },
            cost(x) {
                return new Decimal(1e10).mul(Decimal.pow(10, x)).floor()
            },
            display() {
                let dis = "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Antimatter." + "<br>You have bought " + getBuyableAmount(this.layer, this.id) + " Dimension 5."
                if (player.points.gte("1ee20")) dis = dis + " Dimension 5 amount multiplies Dim 4 generation by " + format(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.a.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.a.points = player.a.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                gensqboost = new Decimal(1.0717734627)
                if (player.points.gte("1ee20")) {
                    eff = new Decimal(gensqboost).pow(x)
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Cost Formula: 1B x 10^Amt. Generation formula: Dimension 5 amt."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
    },
    update(diff) {
	if(player.a.unlocked){
		
		player.a.dim5amo = getBuyableAmount("a", 31)
            // generation adding
            if (getBuyableAmount("a", 31).gte(1)) {
                player.a.dim4amo = player.a.dim4amo.sub(getBuyableAmount("a", 21))
                player.a.dim4gain = player.a.dim5amo.times(player.a.dim5mul)
                player.a.dim4amo = player.a.dim4amo.add(player.a.dim4gain.times(diff))
                player.a.dim4amo = player.a.dim4amo.add(getBuyableAmount("a", 21))
            } else {
                player.a.dim3amo = getBuyableAmount("a", 22)
	    }
	    if (getBuyableAmount("a", 22).gte(1)) {
                player.a.dim3amo = player.a.dim3amo.sub(getBuyableAmount("a", 21))
                player.a.dim3gain = player.a.dim4amo.times(player.a.dim4mul)
                player.a.dim3amo = player.a.dim3amo.add(player.a.dim3gain.times(diff))
                player.a.dim3amo = player.a.dim3amo.add(getBuyableAmount("a", 21))
            } else {
                player.a.dim3amo = getBuyableAmount("a", 21)
	    }
	    if (getBuyableAmount("a", 21).gte(1)) {
                player.a.dim2amo = player.a.dim2amo.sub(getBuyableAmount("a", 12))
                player.a.dim2gain = player.a.dim3amo.times(player.a.dim3mul)
                player.a.dim2amo = player.a.dim2amo.add(player.a.dim2gain.times(diff))
                player.a.dim2amo = player.a.dim2amo.add(getBuyableAmount("a", 12))
            } else {
                player.a.dim2amo = getBuyableAmount("a", 12)
	    }
	    if (getBuyableAmount("a", 12).gte(1)) {
                player.a.dim1amo = player.a.dim1amo.sub(getBuyableAmount("a", 11))
                player.a.dim1gain = player.a.dim2amo.times(player.a.dim2mul)
                player.a.dim1amo = player.a.dim1amo.add(player.a.dim1gain.times(diff))
                player.a.dim1amo = player.a.dim1amo.add(getBuyableAmount("a", 11))
            } else {
                player.a.dim1amo = getBuyableAmount("a", 11)
	    }
	    let gain = player.a.dim1amo.times(1).times(player.a.dim1mul)
	    player.a.antigain = gain
            gain = gain.times(diff)
            player.a.points = player.a.points.add(gain)
   	  }
    },
    milestones: {
    0: {
        requirementDescription: "1 Second Dimension",
        effectDescription: "Antimatter boosts points.",
        done() { return getBuyableAmount("a", 12).gte(1) }
        },
    },
})
