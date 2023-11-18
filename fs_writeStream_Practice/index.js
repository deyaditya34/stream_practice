const fs = require("fs");


fs.access("../stream_practice", 1, (error) => {
  console.log(error)
})