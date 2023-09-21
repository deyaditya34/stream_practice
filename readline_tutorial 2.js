// const { createReadStream } = require("fs")
// const { createInterface } = require("readline")

// const INPUT_FILE_PATH = "styles.css"
// /**
//  * `encoding` set to UNICODE, so we will receive text directly instead of Buffer objects
//  */
// const inputStream = createReadStream(INPUT_FILE_PATH)

// const lineFeed = createInterface(inputStream, { encoding: "utf-8"} )

// lineFeed.on("line", (line) => {
//   console.log("LINE: ", line)
// })

// inputStream.on("end", () => {
//   inputStream.close()
//   lineFeed.close()
// })

// const fs = require("fs");

const readline = require("readline");
const fs = require("fs");

const INPUT_FILE_PATH = "Book1.csv";

const fileReadStream = fs.createReadStream(INPUT_FILE_PATH, {
  encoding: "utf-8",
});

const rows = [];

const lineFeed = readline.createInterface(fileReadStream);

lineFeed.on("line", (line) => {
  let data = line.split(",");
  rows.push(data);
});

fileReadStream.on("end", () => {
  fileReadStream.close();
  lineFeed.close();

  let result = [];
  let headers = rows.shift();

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let rowData = {};

    for (let j = 0; j < headers.length; j++) {
      rowData[headers[j]] = row[j];
    }
    result.push(rowData);
  }

  console.log(result);
});
