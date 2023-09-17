const fs = require("fs");

// const fileWriteStream = fs.createWriteStream('./abcc.txt');

// for (let i = 0; i < 100; i++) {
//   fileWriteStream.write("Line " + i + "\n");
// }

const fileReadStream = fs.createReadStream("abcc.txt");

fileReadStream.on("end", () => {
  console.log("closing output file");
  fs.createWriteStream("abc.txt").close();
});

fileReadStream.on("data", (data) => {
  console.log("data - received data. Forwarding...", data.toString().length);
  fs.createWriteStream("abc.txt").write(data);
});
