const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const { init } = require('../server.js');

let convertHandler = new ConvertHandler();


suite('Unit Tests', function () {
    test('1. convertHandler should correctly read a whole number input.', function () {
        let input = '10km';
        let initNum = convertHandler.getNum(input);
        assert.isNumber(initNum, 'initNum is not a number');
        assert.strictEqual(initNum, 10, 'initNum should be 10');
    })

    test('2. convertHandler should correctly read a decimal number input.', function () {
        let input = '2.2km';
        let initNum = convertHandler.getNum(input);
        assert.isNumber(initNum, 'initNum');
        assert.strictEqual(initNum, 2.2, 'initNum should be 2.2')
    })
    test('3. convertHandler should correctly read a fractional input.', function () {
        let input = '1/2km';
        let initNum = convertHandler.getNum(input);
        assert.isNumber(initNum, 'initNum is not a number');
        assert.strictEqual(initNum, 0.5, 'initNum should be 0.5');
    })

    test('4. convertHandler should correctly read a fractional input with a decimal.', function () {
        let input = '1.5/3.0km';
        let initNum = convertHandler.getNum(input);
        assert.isNumber(initNum, 'initNumb is number');
        assert.strictEqual(initNum, 0.5, 'initNum should be 0.5')
    })

    test('5. convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
        let input = '3/2/3km';
        let initNum = convertHandler.getNum(input);
        assert.isNull(initNum, null, 'initNumb is null');
    })

    test('6. convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
        let input = 'km';
        let initNum = convertHandler.getNum(input);
        assert.strictEqual(initNum, 1, 'initNumb is number 1');
    })

    test('7. convertHandler should correctly read each valid input unit.', function () {
        let input = 'km';
        let initUnit = convertHandler.getUnit(input);
        assert.strictEqual(initUnit, 'km', 'initUnit is km');
    })

    test('8. convertHandler should correctly return an error for an invalid input unit.', function () {
        let input = 'kmm';
        let initUnit = convertHandler.getUnit(input);
        assert.isNull(initUnit, null, 'initUnit is null');
    })

    test('9. convertHandler should return the correct return unit for each valid input unit.', function () {
        let input = 'kmm';
        let initUnit = convertHandler.getUnit(input);
        assert.isNull(initUnit, null, 'initUnit is null');
    })

    test('10. convertHandler should return the correct return unit for each valid input unit.', function () {
        let input = 'km';
        let returnUnit = convertHandler.getReturnUnit(input);
        assert.strictEqual(returnUnit, 'mi', 'initUnit is null');
    })

    test('11. convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
        let input = 'km';
        let returnUnit = convertHandler.spellOutUnit(input);
        assert.strictEqual(returnUnit, 'kilometers', 'initUnit is null');
    })

    test('12. convertHandler should correctly convert gal to L', function () {
        let initUnit = 'gal';
        let convert = convertHandler.getReturnUnit(initUnit);
        assert.strictEqual(convert, 'L', 'initUnit is null');
    })

    test('13. convertHandler should correctly convert L to gal', function () {
        let initUnit = 'L';
        let convert = convertHandler.getReturnUnit(initUnit);
        assert.strictEqual(convert, 'gal', 'initUnit is null');
    })

    test('14. convertHandler should correctly convert mi to km', function () {
        let initUnit = 'mi';
        let convert = convertHandler.getReturnUnit(initUnit);
        assert.strictEqual(convert, 'km', 'initUnit is null');
    })

    test('15. convertHandler should correctly convert km to mi', function () {
        let initUnit = 'km';
        let convert = convertHandler.getReturnUnit(initUnit);
        assert.strictEqual(convert, 'mi', 'initUnit is null');
    })

    test('16. convertHandler should correctly convert lbs to kg', function () {
        let initUnit = 'lbs';
        let convert = convertHandler.getReturnUnit(initUnit);
        assert.strictEqual(convert, 'kg', 'initUnit is null');
    })

    test('17. convertHandler should correctly convert kg to lbs', function () {
        let initUnit = 'kg';
        let convert = convertHandler.getReturnUnit(initUnit);
        assert.strictEqual(convert, 'lbs', 'initUnit is null');
    })

});