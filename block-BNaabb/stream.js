var http = require("http");

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var storedData = "";
  req.on("data", (chunk) => {
    storedData = storedData + chunk;
  });
  req.on("end", () => {
    res.write(storedData);
    res.end();
  });
}

server.listen(4567, () => {
  console.log("server listening on port 4567");
});
