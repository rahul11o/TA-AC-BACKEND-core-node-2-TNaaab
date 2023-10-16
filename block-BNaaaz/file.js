var http = require("http");
var fs = require("fs");

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  res.setHeader("content-Type", "text/plain");
  fs.createReadStream("./readme.txt").pipe(res);
}
server.listen(2345, () => {
  console.log("server listening on port 2345");
});
