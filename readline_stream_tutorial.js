const fs = require("fs")
const readline = require("readline")
const stream = require("stream")

parse("Book1.csv").on("data", (chunk) => {
  console.log("Item:", chunk)
})

function parse(filepath) {
  const fileLineFeed = readline.createInterface(fs.createReadStream(filepath))

  const readable = new stream.Readable({
    read() {
      /**
       * An empty read method since we are not asking it to read from a source.
       * Instead, we will supply chunks manually by pushing to this stream later
       */
    },
    objectMode: true,
  })

  let headers = null
  fileLineFeed.on("line", (line) => {
    const row = line.split(",")

    if (!headers) {
      headers = row
    } else {
      const item = headers.reduce((acc, columnName, i) => {
        const columnVal = row.at(i)
        Reflect.set(acc, columnName, columnVal)

        return acc
      }, {})

      readable.push(item)
    }
  })
  return readable
}