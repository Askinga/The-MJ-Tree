addLayer("su", {
    name: "Supreme Runes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    randomHex(){
      let randomColor = Math.floor(Math.random() * 16777215)
      let hexCode = randomColorNumber.toString(16)
      hexColor = hexColor.padStart(6, '0')
      return "#"+hexCode
    },
    color(){
      return tmp.su.randomHex
    },
    requires: new Decimal("e1000000"), // Can be a function that takes requirement increases into account
    resource: "Supreme Runes", // Name of prestige currency
    baseResource: "boost runes", // Name of resource prestige is based on
    baseAmount() {return player.b.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "Shift+S: Reset for supreme runes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('logs', 35) || player.su.unlocked)},
  	branches: ["logs"]
})
