var http = require("http");
var qs = require("querystring");

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var dataFormat = req.headers["content-type"];
  var storedData = "";
  req.on("data", (chunk) => {
    storedData = storedData + chunk;
  });
  req.on("end", () => {
    if (
      dataFormat === "application/json" &&
      req.url === "/json" &&
      req.method === "POST"
    ) {
      res.setHeader("content-type", "application/json");
      res.write(storedData);
      res.end();
    } else if (
      dataFormat === "application/x-www-form-urlencoded" &&
      req.url === "/form" &&
      req.method === "POST"
    ) {
      var parsedData = qs.parse(storedData);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(parsedData));
    }
  });
}

server.listen(7002, () => {
  console.log("server listening on port 7002");
});
