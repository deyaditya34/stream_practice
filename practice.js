const fs = require("fs");

const csvReadStream = fs.createReadStream("input.csv", { encoding: "utf-8" });

let arrow = "-->";
let result = "";
let dataTempStore = "";

csvReadStream.on("data", (data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === ":" || data[i] === ",") {
      result = result + dataTempStore + ",";
      dataTempStore = "";
    } else {
      dataTempStore = dataTempStore + data[i];
    }
  }

  result = result + dataTempStore;
  dataTempStore = "";

  for (let i = 0; i < result.length; i++) {
    if (result[i] !== " ") {
      dataTempStore = dataTempStore + result[i];
    }
  }
  result = dataTempStore;
  dataTempStore = "";
  let array = [];
  let count = 0;

  for (let i = 0; i < result.length; i++) {
    if (result[i] === '"' || result[i] === ",") {
      if (result[i] === '"') {
        count++;
        if (count === 2) {
          array.push(dataTempStore);
          dataTempStore = "";
          count = 0;
        }
      }
    } else {
      dataTempStore = dataTempStore + result[i];
    }
  }
  result = "";
  let obj = {};
  for (let i = 0; i < array.length; i = i + 2) {
    obj[array[i]] = array[i + 1];
  }

  console.log(obj);

  // for (let i = 0; i < array.length; i = i + 2) {
  //   result = result + `${array[i]} ` + arrow + ` ${array[i + 1]}\n`;
  // }
  // console.log(result);
});
