const fs = require("fs");

const write_file = "abcc.txt";

const fileWriteStream = fs.createWriteStream("abc.txt");

// for (let i = 0; i < 999; i++) {
//   fileWriteStream.write("Line " + i + "\n");
// }

// fileWriteStream.close();

// // const fs = require("fs");

const fileReadStream = fs.createReadStream("abcc.txt");

// fileReadStream.addListener("readable", () => {
//   while (true) {
//     const data = fileReadStream.read(1200);
//     if (!data) {
//       break;
//     }
//     console.log("readable - ");
//     fileWriteStream.write(data);
//   }
// });

fileReadStream.on("data", (data) => {
  console.log("dataa - received data. Forwarding...", data.toString());
  fileWriteStream.write("dataa" + "\n");
});


fileReadStream.on("end", () => {
  console.log("Closing output file");
  fileWriteStream.close()
})
