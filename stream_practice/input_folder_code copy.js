const fs = require("fs")
const events = require("events")
const path = require("path")

const eventBridge = new events.EventEmitter()
const APP_EVENTS = {
  NEW_FILE: "NEW_FILE",
  PROCESSING_COMPLETE: "PROCESSING_COMPLETE",
}
const SRC_DIR = "input"
const DEST_DIR = "output"
const DIR_POLL_INTERVAL = 3000

const checkFilesInDir = () => {
  const availableFiles = fs.readdirSync(SRC_DIR)
  
  availableFiles.forEach((filename) => {
    eventBridge.emit(APP_EVENTS.NEW_FILE, filename)
  })
}

const copyFile = (srcPath, destPath) =>
  new Promise((resolve) => {
    const srcStream = fs.createReadStream(srcPath)
    const destStream = fs.createWriteStream(destPath)

    srcStream.pipe(destStream)

    srcStream.on("end", resolve);
  })

const deleteSrcFile = (filename) => {
  const filePath = path.join(SRC_DIR, filename)
  fs.unlinkSync(filePath)
}

/**
 * Open the log file with `append` flag
 */
const logStream = fs.createWriteStream("output.log", { flags: "a" })
const log = (data) => {
  logStream.write(`${new Date()} - ${data.toString()}\n`)
}

setInterval(checkFilesInDir, DIR_POLL_INTERVAL)
console.log(`Watching ${SRC_DIR} for new files...`)

eventBridge.on(APP_EVENTS.NEW_FILE, async (filename) => {
  const srcPath = path.join(SRC_DIR, filename)
  const destPath = path.join(DEST_DIR, filename)

  await copyFile(srcPath, destPath)
  eventBridge.emit(APP_EVENTS.PROCESSING_COMPLETE, filename)
})

eventBridge.on(APP_EVENTS.NEW_FILE, async (filename) => {
  log(`found file ${filename} in ${SRC_DIR}`)
})

eventBridge.on(APP_EVENTS.PROCESSING_COMPLETE, (filename) => {
  log(`copied ${filename} from ${SRC_DIR} to ${DEST_DIR}`)
})

eventBridge.on(APP_EVENTS.PROCESSING_COMPLETE, (filename) => {
  deleteSrcFile(filename)
  log(`deleted ${filename} from ${SRC_DIR}`)
})