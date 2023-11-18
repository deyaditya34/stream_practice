const fs = require("fs");

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.toString());
      }
    });
  });
}
async function result() {
  const result = await readFile("input.txt");
  return result
}

result().then((data) => {
  console.log(data)
}).catch((error) => {
  console.log(error)
})
