addLayer("su", {
    name: "Supreme Runes", 
    symbol: "SR", 
    position: 0, 
    startData() { 
  return {
    unlocked: false,
    points: new Decimal(0),
    myColor: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
  }
},
    randomHex(){
        let randomColor = Math.floor(Math.random() * 16777215);
        let hexCode = randomColor.toString(16);
        let hexColor = hexCode.padStart(6, '0');
        return "#" + hexColor;
    },
    color() {
  return tmp.su.randomHex || "#FFFFFF"; // fallback to white
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
    branches: ["logs"],
    effect(){
        return player.su.points.add(1).pow(3)
    },
    effectDescription(){
        return "which is boosting 4th row currencies by x" + format(layers.su.effect())
    },
    milestones: {
    0: {
        requirementDescription: "1 Supreme Rune",
        effectDescription: "Keep Extreme Rune Milestones",
        done() { return player.su.points.gte(1) }
    },
    1: {
        requirementDescription: "2 Supreme Runes",
        effectDescription: "xe1e6 points",
        done() { return player.su.points.gte(2) }
    },
    },
})
