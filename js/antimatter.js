addLayer("a", {
    name: "Antimatter",
    symbol: "A",
    position: 1,
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(10),         // "points" is the internal name for the main resource of the layer.
    }},
    nodeStyle() {
      	{
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
	  let req = new Decimal("eeeeeeeeee2000")
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
        if (hasUpgrade('r', 52) || player.a.unlocked) visible = true
       return visible
},          // Returns a bool for if this layer's node should be visible in the tree.
    branches: ["g"],
    canReset(){return true},
    hotkeys: [
        {key: "a", description: "Sorry, no hotkey for antimatter layer.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect(){
       let base = 0
	let eff = player.a.points.add(1).pow(base)
       return eff
       },
        effectDescription() {
            let desc = "which is boosting Point generation by x" + format(tmp[this.layer].effect);
            return desc;
        },
})
