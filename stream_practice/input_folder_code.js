const events = require("events");
const fs = require("fs");

const eventEmitter = new events.EventEmitter();

setInterval(readDirectory, 1000);

function readDirectory() {
  let inputDirectory = "input";
  try {
    let data = fs.readdirSync(inputDirectory);
    if (data.length > 0) {
      eventEmitter.emit("new files found", data);
    }
  } catch (err) {
    console.log("The error is -", err);
  }
}

eventEmitter.on("new files found", (data) => {
  writeFileStream(data);
  eventEmitter.emit("files written successfully", new Date(), Date.now(), data)
});

function writeFileStream(data) {
  let inputFileArr = data;

  for (let i = 0; i < inputFileArr.length; i++) {
    const fileReadStream = fs.createReadStream(`input\\${inputFileArr[i]}`);

    fileReadStream.on("data", (fileData) => {
      fs.createWriteStream(`output\\${inputFileArr[i]}`).write(fileData);
      eventEmitter.emit("files ready to delete", inputFileArr[i]);
    });
  }
}

eventEmitter.on("files ready to delete", (fileName) => {
  deleteFileFromInput(fileName);
});

function deleteFileFromInput(fileName) {
  fs.unlink(`input\\${fileName}`, (err) => {
    if (err) {
      console.log(`Unable to delete file - input\\${fileName}`);
    }
  });
}

eventEmitter.on("files written successfully", (date, time, fileNameArr) => {
  let fileNameList = fileNameArr;

  let logWriteStream = fs.createWriteStream("log.txt");

  for (let i = 0; i < fileNameList.length; i++) {
    logWriteStream.write("File Name - " + fileNameList[i] + " logged in date - " + date + " and time - " + time + "." + "\n")
  }
});