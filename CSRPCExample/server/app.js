var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/expenses.proto"
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH
)

var expenses_proto= grpc.loadPackageDefinition (packageDefinition).expenses

function totalCartValue(call, callback) {
  var books = 0
  var price = 0

  call.on('data', function(request) {
    price += request.price
    books += 1
  })

  call.on("end", function() {
      callback(null, {
        price: price,
        books: books
      })
  })

  call.on('error', function(e) {
      console.log("An error occured")
  })

}

var server = new grpc.Server()
server.addService(expenses_proto.BookStore.service, { totalCartValue: totalCartValue })
server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), function() {
server.start()
})
