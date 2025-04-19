import http from "node:http"

import { sendResponse } from "./utils/sendResponse.js"
import { filterData } from "./utils/filterData.js"
import { filterQueryParams } from "./utils/filterQueryParams.js"

const PORT = 8000
console.log("hello node")

const basePath = "/api"
const contPath = "/continent/"
const countryPath = "/country/"

const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`)
  const queryObject = Object.fromEntries(urlObj.searchParams)

  if (urlObj.pathname == basePath && req.method === "GET") {
    const destinations = await filterQueryParams(queryObject)
    sendResponse(res, destinations)
  } else if (req.url.startsWith(basePath + contPath) && req.method === "GET") {
    const fullPath = basePath + contPath
    console.log(fullPath)
    const continent = req.url.replace(fullPath, "")
    const filteredDestinatons = await filterData(
      contPath.replaceAll("/", ""),
      continent
    )
    sendResponse(res, filteredDestinatons)
  } else if (
    req.url.startsWith(basePath + countryPath) &&
    req.method === "GET"
  ) {
    const fullPath = basePath + countryPath
    const country = req.url.replace(fullPath, "")
    const filteredDesinatons = await filterData(
      countryPath.replaceAll("/", ""),
      country
    )
    sendResponse(res, filteredDesinatons)
  } else {
    sendResponse(
      res,
      {
        error: "not found",
        message: "The requested route does not exist"
      },
      404
    )
  }
})

server.listen(PORT, () => console.log(`server running on port ${PORT}`))
