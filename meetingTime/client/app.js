var readlineSync = require('readline-sync')
var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/meetingTime.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var meetingTime_proto = grpc.loadPackageDefinition(packageDefinition).meetingTime
var client = new meetingTime_proto.CalcService("0.0.0.0:40000", grpc.credentials.createInsecure());

var action = readlineSync.question(
  "What would you like to do?\n"
  + "\t 1 to enter two meeting times and find the total meeting time\n"
  + "\t 2 to change the duration of a meeting\n"
  + "\t 3 to find the number of meetings required given the total time for a task\n"
  + "\t 4 to find the total meeting time for a recurring meeting\n"
)

action = parseInt(action)

if(action === 1) {
  var number1 = readlineSync.question("What is the first meeting duration?")
  var number2 = readlineSync.question("What is the second meeting duration?")
  try {
    client.add({number1: number1, number2: number2}, function(error, response) {
      try {
        if(response.message) {
          console.log(response.message)
        } else {
          console.log("The total meeting time is: " + response.result + " minutes")
        }
      } catch(e) {
        console.log("Could not connect to server")
      }
    })
  } catch(e) {
    console.log("An error occured")
  }


} else if(action === 2) {
  var number1 = readlineSync.question("What is the original meeting duration in minutes?")
  var number2 = readlineSync.question("How many minutes are you reducing the meeting by?")
  try {
    client.subtract({number1: number1, number2: number2}, function(error, response) {
      try {
        if(response.message) {
          console.log(response.message)
        } else {
          console.log(response.result)
        }
      } catch(e) {
        console.log("Could not connect to server")
      }
    })
  } catch(e) {
    console.log("An error occured")
  }

} else if(action === 3) {
  var number1 = readlineSync.question("What is the first number?")
  var number2 = readlineSync.question("What is the second number?")
  try {
    client.divide({number1: number1, number2: number2}, function(error, response) {
      try {
        if(response.message) {
          console.log(response.message)
        } else {
          console.log(response.result)
        }
      } catch(e) {
        console.log("Could not connect to server")
      }
    })
  } catch(e) {
    console.log("An error occured")
  }

} else if(action === 4) {
  var number1 = readlineSync.question("What is the first number?")
  var number2 = readlineSync.question("What is the second number?")
  try {
    client.multiply({number1: number1, number2: number2}, function(error, response) {
      try {
        if(response.message) {
          console.log(response.message)
        } else {
          console.log(response.result)
        }
      } catch(e) {
        console.log("Could not connect to server")
      }
    })
  } catch(e) {
    console.log("An error occured")
  }

} else {
  console.log("Error: Operation not recognized")
}
