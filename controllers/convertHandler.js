function ConvertHandler() {
  
  this.getNum = function(input) {
    if (!input.trim()) return 1;
    let num = input.match(/(\d+\.?\d*|\.\d+)(\/(\d+\.?\d*|\.\d+))?/g) || null;
    
    
    if (!num) {
      // Überprüfe, ob nur eine Einheit vorhanden ist
      let unit = this.getUnit(input);
      if (unit) {
          return 1; // Standardwert 1 zurückgeben
      }
      return null; // Ungültige Eingabe
  }

    let result;
    try {
      if (!num.includes('/') && num.length === 1  ) {
        result = eval(num[0]);
        console.log(num,'<--nummer Eingabe11')
      } else if (num.length === 2 && num[1].includes('/')) {
        // Berechne nur Brüche, wie "3/4"
        const [numerator, denominator] = num[1].split('/');
        result = parseFloat(numerator) / parseFloat(denominator);
        console.log(num,'<--nummer Eingabe')
      } else {
        throw new Error('Invalid number format'); // Ungültiges Format
      }
    } catch (e) {
      return null; // Fehlerhafte Auswertung zurückgeben
    }

    return result || 1; // Standardwert 1, wenn das Ergebnis 0 ist
};
  
  this.getUnit = function(input) {
    let result = input.match(/(gal|km|lbs|kg|l|mi)$/i)
    
    if (!result) {
     
      return null;
  }
    console.log('get unit',result)
    let unit = result[0].toLowerCase();

    return unit === 'l' ? 'L' : unit;
  }
  
  this.getReturnUnit = function(initUnit) {
    const units = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    console.log('umrechnung', units[initUnit])
    return  units[initUnit] || null;
  };

  this.spellOutUnit = function(unit) {
    const spellOutUnit = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms' 
    };
   
    return spellOutUnit[unit] || null;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result

    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break
      case 'L':
        result = initNum / galToL;
        break
      case 'mi':
        result = initNum * miToKm;
        break
      case 'km':
        result = initNum / miToKm;
        break
      case 'lbs':
        result = initNum * lbsToKg;
        break
      case 'kg':
        result = initNum / lbsToKg;
        break
      default:
        result =null;
        break

    }
   
    return result !== null ? result.toFixed(5) : "invalid unit";
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result
    result = initNum.toString() + ' ' + this.spellOutUnit(initUnit) 
    + ' converts to ' 
    + returnNum.toString() + ' ' + this.spellOutUnit(returnUnit);
    return result
  };
  
}

module.exports = ConvertHandler;
