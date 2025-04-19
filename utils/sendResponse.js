export function sendResponse(
  res,
  data,
  code = 200,
  content = { type: "Content-Type", value: "application/json" }
) {
  res.setHeader(content.type, content.value)
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET")
  res.statusCode = code
  res.end(JSON.stringify(data))
}
