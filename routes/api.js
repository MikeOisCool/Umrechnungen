'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const { init } = require('../server.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();


  app.get('/api/convert', (req, res) => {
    let input = req.query.input;

    let initNum = convertHandler.getNum(input)
    let initUnit = convertHandler.getUnit(input)
    console.log(initNum,'----', initUnit)
    try {
      if (initNum === null && initUnit === null) {
        return res.json('invalid number and unit')
      }
      if (initNum === null) {
        return res.json('invalid number');
      }

      if (initUnit === null) {
        return res.json('invalid unit');
      }


       let returnNum = convertHandler.convert(initNum, initUnit)

      if (returnNum === "invalid unit") {
        return res.status(400).json({ error: 'invalid unit' });
      }

     
      let returnUnit = convertHandler.getReturnUnit(initUnit)
      console.log(initNum, returnNum)
      let returnStr = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
      let result = {
        initNum: initNum,
        initUnit: initUnit,
        returnNum: parseFloat(returnNum),
        returnUnit: returnUnit,
        string: returnStr
      }
      res.json(result);

    } catch (error) {
      res.status(400).send({ error: error.message });
    }

  })

};
