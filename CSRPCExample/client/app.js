var readlineSync = require('readline-sync')
var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/expenses.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var expenses_proto = grpc.loadPackageDefinition (packageDefinition).expenses
var client = new expenses_proto.BookStore("0.0.0.0:40000", grpc.credentials.createInsecure());

var call = client.totalCartValue(function(error, response) {
  if(error) {
    console.log("An error occured")
  } else {
    console.log("You have entered " + response.books + " expenses items. \n The total cost is: " + response.price)
  }
})

while(true) {
  var book_name = readlineSync.question("What is the expenses item name? (q to Quit):")
  if(book_name.toLowerCase() === "q") {
    break
  }

  var author = readlineSync.question ("Who is the person claiming the expenses?")
  var price = readlineSync.question ("How much is being claimed in euro?")

  call.write({
    price: parseFloat(price),
    author: author,
    name: book_name
  })
}
call.end()
