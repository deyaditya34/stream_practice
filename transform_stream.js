const stream = require("stream")

/**
 * Create a transformer stream.
 *
 * Its a Duplex Stream that writes back what it receives. But we can transform the data in between
 */
const transformer = new stream.Transform({
  /**
   * This method is called for every chunk of data it receives
   */
  transform(chunk, encoding, cb) {
    /**
     * transform the received chunk of data
     */
    const transformedChunk = chunk
      .toString()
      .replace(/{name}/, "John Doe")
      .replace(/{sender}/, "Xyz")

    /**
     * pass on the transformed chunk
     */
    cb(null, transformedChunk)
  },
})

/**
 * pipe the transform stream output to console
 */
transformer.pipe(process.stdout)

/**
 * Write something to the transform stream
 */
transformer.write(`
Dear {name},

How are you? Please give me a call when you see this

Regards,
{sender}
`)