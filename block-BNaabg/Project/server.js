var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var url = require("url");
var path = require("path");
var userDir = __dirname + "/users/";

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var parsedUrl = url.parse(req.url, true);
  var userFileName = parsedUrl.query.username + ".json";
  var storedData = "";
  console.log(req.method, parsedUrl.pathname);
  req.on("data", (chunk) => {
    storedData += chunk;
  });
  req.on("end", () => {
    parsedData = qs.parse(storedData);
    var username = parsedData.username;
    if (req.method === "POST" && req.url === "/users") {
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
              console.log(err);
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
    } else if (req.method === "GET" && parsedUrl.pathname === "/users") {
      fs.readFile(path.join("./users", userFileName), (err, user) => {
        if (err) {
          console.log("error reading file");
        } else {
          res.setHeader("Content-Type", "text/palin");
          res.end(user);
        }
      });
    } else if (req.method === "DELETE" && parsedUrl.pathname === "/users") {
      fs.unlink(path.join("./users", userFileName), (err) => {
        if (err) {
          res.setHeader("Content-Type", "text/palin");
          res.write("Error deleting the file ");
          res.end();
        } else {
          res.setHeader("Content-Type", "text/palin");
          res.end(`${userFileName} deleted succefully`);
        }
      });
    } else if (req.method === "PUT" && parsedUrl.pathname === "/users") {
      fs.open(userDir + userFileName, "r+", (err, fd) => {
        if (err) {
          console.log("error opening the file");
        } else {
          fs.ftruncate(fd, (err) => {
            if (err) {
              console.log("error truncating the file ");
            } else {
              fs.writeFile(fd, storedData, (err) => {
                if (err) {
                  console.log("Error writing to the file");
                } else {
                  fs.close(fd, (err) => {
                    if (err) {
                      console.log("error closing the file");
                    } else {
                      res.end(`${username} successfully updated`);
                    }
                  });
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
