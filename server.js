import http from "node:http"

import { getDataFromDB } from "./database/db.js"
import { sendResponse } from "./utils/sendResponse.js"
import { send } from "node:process"

const PORT = 8000
console.log("hello node")

const contPath = "/api/continent/"

const server = http.createServer(async (req, res) => {
  if (req.url === "/api" && req.method === "GET") {
    const destinations = await getDataFromDB()
    sendResponse(res, destinations)
  } else if (req.url.startsWith(contPath) && req.method === "GET") {
    const continent = req.url.replace(contPath, "")
    const destinations = await getDataFromDB()
    const filteredDesinatons = destinations.filter((destination) => {
      return (
        destination.continent.toLowerCase().replace(" ", "") ===
        continent.toLowerCase()
      )
    })
    sendResponse(res, filteredDesinatons)
  } else {
    sendResponse(res, {
      error: "not found",
      message: "The requested route does not exist"
    } , 404)

  }
})

server.listen(PORT, () => console.log(`server running on port ${PORT}`))
