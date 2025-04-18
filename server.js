import http from "node:http"

import { getDataFromDB } from "./database/db.js"

const PORT = 8000
console.log("hello node")

const server = http.createServer(async (req, res) => {
  if (req.url === "/api" && req.method === "GET") {
    const destinatinons = await getDataFromDB()
    res.setHeader("Content-Type", "application/json")
    res.statusCode = 200
    res.end(JSON.stringify(destinatinons), () =>
      console.log("response sent")
    )
  } else {
    res.statusCode = 404
    res.setHeader("Content-Type", "application/json")
    const notFoundMessage = {error: "not found", message: "The requested route does not exist"}
    res.end(JSON.stringify(notFoundMessage), () => console.log("404 sent"))
  }
})

server.listen(PORT, () => console.log(`server running on port ${PORT}`))
