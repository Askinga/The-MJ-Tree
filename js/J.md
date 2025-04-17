addLayer("g", {
  name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      genPoints: new Decimal(0),
      genPointGen: new Decimal(0),
      dim1: new Decimal(0),
      dim1gen: new Decimal(0),
      dim1mul: new Decimal(0),
    };
  },
  color: "#4BDCFF",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "generation boosters", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 1.5, // Prestige currency exponent
  base: 2.5,
  tabFormat: [
    "main-display",
    "blank",
    "prestige-button",
    "resource-display",
    "blank",
    [
      "display-text",
      function () {
        return (
          "You have " +
          format(player.g.genPoints) +
          " generated points, which is boosting points by x" +
          format(tmp.g.genPointEff)
        );
      },
    ],
    [
      "display-text",
      function () {
        return "(" + format(player.g.genPointGen) + "/sec)";
      },
    ],
    "blank",
    [
      "display-text",
      function () {
        return "Your generation booster base is " + format(tmp.g.boosterBase);
      },
    ],
    "buyables",
  ],
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    return mult;
  },
  onPrestige() {
    player.g.genPoints = new Decimal(0);
    setBuyableAmount('g', 11, new Decimal(0))
  },
  genPointEff() {
    return player.g.genPoints.add(1).pow(0.5);
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  row: 0, // Row the layer is in on the tree (0 is the first row)
  boosterBase() {
    let base = new Decimal(2);
    return base;
  },
  effect() {
    return new Decimal(tmp.g.boosterBase).pow(player.g.points);
  },
  effectDescription() {
    return "which boosts Generated Points by x" + format(layers.g.effect());
  },
  hotkeys: [
    {
      key: "g",
      description: "G: Reset for generation boosters",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],
  layerShown() {
    return true;
  },
  update(diff) {
    let gain = new Decimal(1);
    gain = gain.times(layers.g.effect());
    gain = gain.times(player.g.dim1.add(1));
    
    if(getBuyableAmount('g', 12).gte(1)) {
      let D1G = new Decimal(getBuyableAmount('g', 12))
    }

    player.g.genPointGen = gain;
    gain = gain.times(diff);
    player.g.genPoints = player.g.genPoints.add(gain);
  },
  buyables: {
    11: {
        title: "Dimension 1",
        cost() { return new Decimal(100).pow(player.g.dim1.add(2.5).times(0.4)) },
        display() { return "Boosts Generated Points by x" + format(buyableEffect('g', 11)) + "<br>Cost: " + format(this.cost()) + " Generated Points" + "<br>You have " + format(player.g.dim1) + " Dimension 1s" + "<br>(" + format(player.g.dim1gen) + "/sec)"},
        canAfford() { return player[this.layer].genPoints.gte(this.cost()) },
        buy() {
            player[this.layer].genPoints = player[this.layer].genPoints.sub(this.cost())
            player.g.dim1 = player.g.dim1.add(1)
        },
        effect(x) {
          let base1 = new Decimal(1)
          let base2 = new Decimal(player.g.dim1)
          let exp = new Decimal(1)
          return base1.times(base2.pow(exp)).add(1)
        },
    },
    
  },
});
