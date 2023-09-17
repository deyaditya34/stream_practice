const fs = require("fs");
const express = require("express");

const app = express();

app.use((req, res) => {
  const inputStream = fs.createReadStream("in.zip");

  inputStream.pipe(res);
})

app.listen(3090, ()=> {
  console.log("server starting at port 3090")
})