
function exponentialFormat(num, precision, mantissa = true) {
    let e = num.log10().floor()
    let m = num.div(Decimal.pow(10, e))
    if (m.toStringWithDecimalPlaces(precision) == 10) {
        m = decimalOne
        e = e.add(1)
    }
    e = (e.gte(1e9) ? format(e, 5) : (e.gte(10000) ? commaFormat(e, 0) : e.toStringWithDecimalPlaces(0)))
    if (mantissa)
        return m.toStringWithDecimalPlaces(precision) + "e" + e
    else return "e" + e
}

function commaFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.001) return (0).toFixed(precision)
    let init = num.toStringWithDecimalPlaces(precision)
    let portions = init.split(".")
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    if (portions.length == 1) return portions[0]
    return portions[0] + "." + portions[1]
}


function regularFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.0001) return (0).toFixed(precision)
    if (num.mag < 0.1 && precision !==0) precision = Math.max(precision, 4)
    return num.toStringWithDecimalPlaces(precision)
}

function infFormat(decimal) {
    decimal = new Decimal(decimal)
    if (decimal.lt(new Decimal(2).pow(1024))) {
        return defaultFormat(decimal)
    }
    if (decimal.lt(new Decimal(2).pow(1024).pow(1e6))) {
        return defaultFormat(decimal.div(new Decimal(2).pow(1024).pow(decimal.log(new Decimal(2).pow(1024)).floor()))) + "+(" + defaultFormat(decimal.log(new Decimal(2).pow(1024)).floor()) + ")∞"
    }
    if (decimal.lt(new Decimal(2).pow(1024).tetrate(10))) {
        return infFormat(decimal.log(new Decimal(2).pow(1024)).floor()) + "∞"
    }
    return "∞^(" + decimal.slog(new Decimal(2).pow(1024)) + ")"
}

function eFormat(decimal) {
    decimal = new Decimal(decimal)
    if (decimal.lt("1e1000")) return exponentialFormat(decimal, 2)
    return "e"+eFormat(decimal.log10().floor())
 }

function fixValue(x, y = 0) {
    return x || new Decimal(y)
}

function sumValues(x) {
    x = Object.values(x)
    if (!x[0]) return decimalZero
    return x.reduce((a, b) => Decimal.add(a, b))
}

function defaultFormat(decimal, precision = 2, small) {
    small = small || modInfo.allowSmall
    decimal = new Decimal(decimal)
    if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
        player.hasNaN = true;
        return "NaN"
    }
    if (decimal.sign < 0) return "-" + format(decimal.neg(), precision, small)
    if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity"
    if (decimal.gte("eeee1000")) {
        var slog = decimal.slog()
        if (slog.gte(1e6)) return "F" + format(slog.floor())
        else return Decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(3) + "F" + commaFormat(slog.floor(), 0)
    }
    else if (decimal.gte("1e1000000")) return exponentialFormat(decimal, 0, false)
    else if (decimal.gte("1e10000")) return exponentialFormat(decimal, 0)
    else if (decimal.gte(1e9)) return exponentialFormat(decimal, precision)
    else if (decimal.gte(1e3)) return commaFormat(decimal, 0)
    else if (decimal.gte(0.0001) || !small) return regularFormat(decimal, precision)
    else if (decimal.eq(0)) return (0).toFixed(precision)

    decimal = invertOOM(decimal)
    let val = ""
    if (decimal.lt("1e1000")){
        val = exponentialFormat(decimal, precision)
        return val.replace(/([^(?:e|F)]*)$/, '-$1')
    }
    else   
        return defaultformat(decimal, precision) + "⁻¹"

}

function formatWhole(decimal) {
    decimal = new Decimal(decimal)
    if (decimal.gte(1e9)) return format(decimal, 2)
    if (decimal.lte(0.99) && !decimal.eq(0)) return format(decimal, 2)
    return format(decimal, 0)
}

function formatTime(s) {
    if (s < 60) return format(s) + "s"
    else if (s < 3600) return formatWhole(Math.floor(s / 60)) + "m " + format(s % 60) + "s"
    else if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else return formatWhole(Math.floor(s / 31536000)) + "y " + formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
}

function toPlaces(x, precision, maxAccepted) {
    x = new Decimal(x)
    let result = x.toStringWithDecimalPlaces(precision)
    if (new Decimal(result).gte(maxAccepted)) {
        result = new Decimal(maxAccepted - Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision)
    }
    return result
}

// Will also display very small numbers
function formatSmall(x, precision=2) { 
    return format(x, precision, true)    
}

function invertOOM(x){
    let e = x.log10().ceil()
    let m = x.div(Decimal.pow(10, e))
    e = e.neg()
    x = new Decimal(10).pow(e).times(m)

    return x
}

function standardFormat(decimal) {
    first = ["", "k", "M", "B"]
    symbols = [
        [
            "", "U", "D", "T", "Q", "q", "S", "s", "O", "N"
        ],
        [
            "", "Dc", "Vg", "Tg", "Qg", "qg", "Sg", "sg", "Og", "Ng"
        ],
        [
            "", "C", "Du", "Tc", "Qc", "qc", "Sc", "sc", "Oc", "Nc"
        ],
    ]
    decimal = new Decimal(decimal)
    if (decimal.eq(0)) return "0"
    e = decimal.log10().div(3).floor().clampMin(0)
    prefix = ""
    if (first[e] != undefined) { prefix = first[e] } else {
        decimal = decimal.div(1000)
        e = decimal.log10().div(3).floor().clampMin(0)
        prefix += symbols[0][e.div(10000).floor().mod(10)]
        prefix += symbols[1][e.div(100000).floor().mod(10)]
        prefix += symbols[2][e.div(1000000).floor().mod(10)]
        prefix += e.div(1000).floor().mod(10).neq(0) ? "Mi" : ""
        prefix += symbols[0][e.mod(10)]
        prefix += symbols[1][e.div(10).floor().mod(10)]
        prefix += symbols[2][e.div(100).floor().mod(10)]
    }
    if (e.div(1000000).floor().gt(10)) return defaultFormat(decimal)
    return (e.lt(3000) ? defaultFormat(decimal.div(new Decimal(10).pow(e.times(3)))) : "1") + prefix
}

function altStandardFormat(decimal) {
    first = ["", "k", "M", "B"]
    symbols = [
        [
            "", "U", "D", "T", "q", "Q", "s", "S", "O", "N"
        ],
        [
            "", "Dc", "Vg", "Tg", "qg", "Qg", "sg", "Sg", "Og", "Ng"
        ],
        [
            "", "C", "Du", "Tc", "qc", "Qc", "sc", "Sc", "Oc", "Nc"
        ],
    ]
    decimal = new Decimal(decimal)
    if (decimal.eq(0)) return "0"
    e = decimal.log10().div(3).floor().clampMin(0)
    prefix = ""
    if (first[e] != undefined) { prefix = first[e] } else {
        decimal = decimal.div(1000)
        e = decimal.log10().div(3).floor().clampMin(0)
        prefix += symbols[0][e.div(10000).floor().mod(10)]
        prefix += symbols[1][e.div(100000).floor().mod(10)]
        prefix += symbols[2][e.div(1000000).floor().mod(10)]
        prefix += e.div(1000).floor().mod(10).neq(0) ? "Mi" : ""
        prefix += symbols[0][e.mod(10)]
        prefix += symbols[1][e.div(10).floor().mod(10)]
        prefix += symbols[2][e.div(100).floor().mod(10)]
    }
    if (e.div(1000000).floor().gt(10)) return standardFormat(decimal)
    return (e.lt(3000) ? defaultFormat(decimal.div(new Decimal(10).pow(e.times(3)))) : "1") + prefix
}
