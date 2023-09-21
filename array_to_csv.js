const fs = require("fs");

const csvWriteStream = fs.createWriteStream("output.csv");

const inputFileStr = fs.readFileSync("input.json").toString();
const inputFileStrParse = JSON.parse(inputFileStr);
const headers = Object.keys(inputFileStrParse[0]);
let result = "";

csvWriteStream.write(`${headers.join(",")}\n`)

for (let i = 0; i < inputFileStrParse.length; i++) {
  fileWriteStream.write(`${Object.values(inputFileStrParse[i]).join(",")}\n`);
}

csvWriteStream.write(result);






























// fileReadStream.on("data", (arr) => {
//   let parsedJSON = JSON.parse(arr.toString());
//   console.log(parsedJSON);
//   let result = "";

//   for (let i = 0; i < parsedJSON.length; i++) {
//     if (i === 0) {
//       result =
//         result +
//         `${Object.keys(parsedJSON[i]).join()}\n` +
//         `${Object.values(parsedJSON[i]).join()}\n`;
//     } else {
//       result = result + `${Object.values(parsedJSON[i]).join()}\n`;
//     }
//   }
//   console.log(result);
//   fileWriteStream.write(result);
// });

// fileReadStream.on("end", () => {
//   fileReadStream.close();
//   fileWriteStream.close();

// });
