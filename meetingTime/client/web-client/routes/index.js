var express = require('express');
var router = express.Router();
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

var PROTO_PATH = __dirname + '/../protos/meetingTime.proto';
var packageDefinition = protoLoader.loadSync(PROTO_PATH);
var meetingTime_proto = grpc.loadPackageDefinition(packageDefinition).meetingTime;
var client = new meetingTime_proto.CalcService('0.0.0.0:40000', grpc.credentials.createInsecure());

/* GET home page. */
router.get('/', function(req, res, next) {
  var number1 = req.query.number1
  var number2 = req.query.number2
  var result

  if(!isNaN(number1) && !isNaN(number2)) {
    try {
      client.add({ number1: number1, number2: number2 }, function (error, response) {
        try {
          res.render('index', { title: 'Meeting Duration Calculator', error: error, result: response.result });
        } catch (error) {
          console.log(error)
          res.render('index', { title: 'Meeting Duration Calculator', error: "Meeting Duration Calculator is not available at the moment please try again later", result: null });
        }
      });

    } catch (error) {
      console.log(error)
      res.render('index', { title: 'Meeting Duration Calculator', error: "Meeting Duration Calculator is not available at the moment please try again later", result: null });
    }
  } else {
    res.render('index', { title: 'Meeting Duration Calculator', error: null, result: result })
  }
});

router.get('/subtract', function(req, res, next) {
  var number1 = req.query.number1
  var number2 = req.query.number2
  var result

  if(!isNaN(number1) && !isNaN(number2)) {
    try {
      client.subtract({ number1: number1, number2: number2 }, function (error, response) {
        try {
          res.render('subtract', { title: 'Meeting Duration Calculator', error: error, result: response.result });
        } catch (error) {
          console.log(error)
          res.render('subtract', { title: 'Meeting Duration Calculator', error: "Meeting Duration Calculator is not available at the moment please try again later", result: null });
        }
      });

    } catch (error) {
      console.log(error)
      res.render('subtract', { title: 'Meeting Duration Calculator', error: "Meeting Duration Calculator is not available at the moment please try again later", result: null });
    }
  } else {
    res.render('subtract', { title: 'Meeting Duration Calculator', error: null, result: result })
  }
});

router.get('/divide', function(req, res, next) {
  var number1 = req.query.number1
  var number2 = req.query.number2
  var result

  if(!isNaN(number1) && !isNaN(number2)) {
    try {
      client.divide({ number1: number1, number2: number2 }, function (error, response) {
        try {
          res.render('divide', { title: 'Meeting Duration Calculator', error: error, result: response.result });
        } catch (error) {
          console.log(error)
          res.render('divide', { title: 'Meeting Duration Calculator', error: "Meeting Duration Calculator is not available at the moment please try again later", result: null });
        }
      });

    } catch (error) {
      console.log(error)
      res.render('divide', { title: 'Meeting Duration Calculator', error: "Meeting Duration Calculator is not available at the moment please try again later", result: null });
    }
  } else {
    res.render('divide', { title: 'Meeting Duration Calculator', error: null, result: result })
  }
});

router.get('/multiply', function(req, res, next) {
  var number1 = req.query.number1
  var number2 = req.query.number2
  var result

  if(!isNaN(number1) && !isNaN(number2)) {
    try {
      client.multiply({ number1: number1, number2: number2 }, function (error, response) {
        try {
          res.render('multiply', { title: 'Meeting Duration Calculator', error: error, result: response.result });
        } catch (error) {
          console.log(error)
          res.render('multiply', { title: 'Meeting Duration Calculator', error: "Meeting Duration Calculator is not available at the moment please try again later", result: null });
        }
      });

    } catch (error) {
      console.log(error)
      res.render('multiply', { title: 'Meeting Duration Calculator', error: "Meeting Duration Calculator is not available at the moment please try again later", result: null });
    }
  } else {
    res.render('multiply', { title: 'Meeting Duration Calculator', error: null, result: result })
  }
});

module.exports = router;
