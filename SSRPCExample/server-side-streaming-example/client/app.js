var readlineSync = require('readline-sync')
var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/random_numbers.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var random_numbers_proto = grpc.loadPackageDefinition(packageDefinition).random_numbers
var client = new random_numbers_proto.RandomService("0.0.0.0:40000", grpc.credentials.createInsecure());

var amount = parseInt(readlineSync.question("How many office lockers would you like to access?"))
var call = client.generateRandomNumbers({amount:amount})

call.on ('data', function(response) {
  console.log("Locker PIN is: " + response.value)
})

call.on ('end', function() {

})

call.on ('error', function(e) {
  console.log("An error occurred")
})
