addLayer("su", {
    name: "Supreme Runes", 
    symbol: "SR", 
    position: 0, 
    startData() { 
  return {
    unlocked: true,
    points: new Decimal(0),
    myColor: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
  }
},
    color() {
  return player.su.myColor || "#FFFFFF"; // fallback to white
},
    requires: new Decimal("e1000000"), 
    resource: "Supreme Runes", 
    baseResource: "boost runes", 
    baseAmount() {return player.b.points}, 
    type: "normal", 
    exponent: 0, 
    gainMult() { 
        let mult = new Decimal(1); // Declare with let
        return mult;
    },
    gainExp() { 
        return new Decimal(1);
    },
    row: 4,
    hotkeys: [
        {key: "S", description: "Shift+S: Reset for supreme runes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('logs', 35) || player.su.unlocked)},
    branches: ["logs"]
})
