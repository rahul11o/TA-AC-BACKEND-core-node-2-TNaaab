// var http = require("http");
// var fs = require("fs");
// var qs = require("querystring");
// var userDir = __dirname + "/users/";

// var server = http.createServer(handleRequest);

// function handleRequest(req, res) {
//   var storedData = "";
//   req.on("data", (chunk) => {
//     storedData += chunk;
//   });
//   req.on("end", () => {
//     if ((req.method === "POST", req.url === "/users")) {
//       parsedData = qs.parse(storedData);
//       var username = parsedData.username;
//       fs.open(userDir + username + ".json", "wx", (err, fd) => {
//         fs.writeFile(fd, storedData, (err) => {
//           fs.close(fd, (err) => {
//             res.end(`${username} succefully created`);
//           });
//         });
//       });
//     }
//   });
// }

// server.listen(5432, () => {
//   console.log("server listening on port 5432");
// });

var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var userDir = __dirname + "/users/";

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var storedData = "";
  req.on("data", (chunk) => {
    storedData += chunk;
  });
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/users") {
      // Corrected the if statement condition
      parsedData = qs.parse(storedData);
      var username = parsedData.username;
      fs.open(userDir + username + ".json", "wx", (err, fd) => {
        if (err) {
          if (err.code === "EEXIST") {
            res.end(`${username} already exists`); // Handle the case where the file already exists
          } else {
            console.error(err);
            res.end("Error creating the file");
          }
        } else {
          fs.writeFile(fd, storedData, (err) => {
            if (err) {
              console.error(err);
              res.end("Error writing to the file");
            } else {
              fs.close(fd, (err) => {
                if (err) {
                  console.error(err);
                  res.end("Error closing the file");
                } else {
                  res.end(`${username} successfully created`);
                }
              });
            }
          });
        }
      });
    }
  });
}

server.listen(5432, () => {
  console.log("Server listening on port 5432");
});
