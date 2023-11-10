const fs = require("fs");

const csvReadStream = fs.createReadStream("./input.csv", {encoding: "utf-8"});

csvReadStream.on("data", (data)=> {
  console.log(data)
})