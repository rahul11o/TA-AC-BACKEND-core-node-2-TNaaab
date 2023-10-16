var path = require("path");
var http = require("http");
var qs = require("querystring");

//           #### Path

//__filename
//path.resolve(__dirname, "app.js")
//path.join(__dirname, "..", "index.html")
//path.resolve(__dirname,"index.html")

//         #### Capture data on server

var server = http.createServer(handleRequest);
function handleRequest(req, res) {
  var dataFormat = req.headers["content-type"];
  var storedData = "";

  req.on("data", (chunk) => {
    storedData += chunk;
  });
  req.on("end", () => {
    if (
      req.method === "POST" &&
      req.url === "/" &&
      dataFormat === "application/json"
    ) {
      res.statusCode = 201;
      res.setHeader("content-Type", "application/json");
      res.end(storedData);
    } else if (
      req.method === "POST" &&
      req.url === "/" &&
      req.headers["content-type"] === "application/x-www-form-urlencoded"
    ) {
      parsedData = qs.parse(storedData);
      var resData = parsedData.captain;
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/x-www-form-urlencoded");
      res.end(JSON.stringify(resData)); // Send parsed data as the response
    }
  });
}

server.listen(2222, () => {
  console.log("server listening on port 2222");
});

//                       the next one

var server2 = http.createServer(handleRequest2);

function handleRequest2(req, res) {
  var dataFormat = req.headers["content-type"];
  var storedData = "";
  req.on("data", (chunk) => {
    storedData += chunk;
  });
  req.on("end", () => {
    if (req.method === "POST" && dataFormat === "application/json") {
      res.setHeader("Content-Type", "application/json");
      res.end(storedData);
    } else if (
      req.method === "POST" &&
      dataFormat === "application/x-www-form-urlencoded"
    ) {
      var parsedData = qs.parse(storedData);
      res.setHeader("Content-Type", "application/x-www-form-urlencoded");
      res.end(JSON.stringify(parsedData));
    }
  });
}
server2.listen(9000, () => {
  console.log("server listening on port 9000");
});

//                      onto the next one

// let server3 = http.createServer(handleRequest3);
// function handleRequest3(req, res) {
//   var storedData = "";
//   var dataFormat = req.headers["content-type"];
//   req.on("data", (chunk) => {
//     storedData += chunk;
//   });
//   req.on("end", () => {

//   });
// }

// server3.listen(6543, () => {
//   console.log("server listening on port 6543");
// });
