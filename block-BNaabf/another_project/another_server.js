var http = require("http");
var fs = require("fs");
var qs = require("querystring");

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  if (req.method === "GET" && req.url === "/form") {
    res.setHeader("Content-Type", "text/html");
    fs.createReadStream("./form.html").pipe(res);
  } else if (req.method === "POST" && req.url === "/form") {
    var formData = "";
    req.on("data", (chunk) => {
      formData += chunk;
    });
    req.on("end", () => {
      var parsedData = qs.parse(formData);
      console.log(parsedData);
      res.setHeader("Content-Type", "text/html");
      res.end(
        `<h2>${parsedData.name}</h2><p>${parsedData.email}<p/p><p>${parsedData.age}<p/p>`
      );
    });
  }
}

server.listen(5678, () => {
  console.log("Server listening on port 5678");
});
