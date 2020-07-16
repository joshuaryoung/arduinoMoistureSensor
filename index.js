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
  const { method, body } = req
  const timeStamp = moment().format()
  const logName = "log.json"
  let log = []

  console.log(
    `${timeStamp} - ${method} Request Received. Writing to ${logName}`
  )
  console.log({ body })

  try {
    log = JSON.parse(await fsPromises.readFile(logName, "utf8"))
  } catch (error) {
    console.warn(error)
  }

  try {
    await fsPromises.writeFile(
      logName,
      JSON.stringify([
        ...log,
        {
          body,
          method,
          timeStamp,
        },
      ])
    )
  } catch (error) {
    console.warn(error)
  }

  res.status(200).send('<input type="text"></input>')
})
