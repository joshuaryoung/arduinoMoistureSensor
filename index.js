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
  const timeStamp = moment().format()
  const logName = "log.json"
  let log = []

  console.log(
    `${timeStamp} - ${method} Request Received. Writing to ${logName}`
  )
  console.log({ analogReadValue })

  try {
    // const openRes = await fsPromises.open(logName)
    // console.log({ openRes })
    await fsPromises.appendFile(
      logName,
      JSON.stringify(
        {
          analogReadValue,
          method,
          timeStamp,
        },
        undefined,
        2
      ) + ","
    )
  } catch (error) {
    console.trace(error)
  }

  res.status(200).send(JSON.stringify({ analogReadValue }, undefined, 2))
})
