const express = require("express")
const app = express()
const _ = require("lodash")
const fs = require("fs")
const fsPromises = fs.promises
const moment = require("moment")

const EXPRESS_PORT = _.get(process, "env.EXPRESS_PORT")

app.use(express.json()) // for parsing application/json

app.listen(EXPRESS_PORT, () => {
  console.log(`App listening on port ${EXPRESS_PORT}!`)
})

app.post("/", async (req, res) => {
  const {
    method,
    body: { analogReadValue },
  } = req
  const timeStamp = moment().format("l LTS")
  const logPath = "log.json"
  let log = []

  console.log(
    `${timeStamp} - ${method} Request Received. Writing to ${logPath}`
  )
  console.log({ analogReadValue })
  let logAlreadyExists

  try {
    logAlreadyExists = await fsPromises.stat(logPath)
  } catch (error) {
    console.error(error)
    logAlreadyExists = false
  }
  console.log({ logAlreadyExists })
  try {
    const logString = logAlreadyExists
      ? await fsPromises.readFile(logPath, "utf-8")
      : "[]"
    const logContents = JSON.parse(logString)

    const appendedLogContents = [
      ...logContents,
      {
        analogReadValue,
        method,
        timeStamp,
      },
    ]
    const appendedContentsString = JSON.stringify(
      appendedLogContents,
      undefined,
      2
    )

    await fsPromises.writeFile(logPath, appendedContentsString)
  } catch (error) {
    console.trace(error)
  }

  res.status(200).send(JSON.stringify({ analogReadValue }, undefined, 2))
})
