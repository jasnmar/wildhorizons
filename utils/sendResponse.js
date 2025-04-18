export function sendResponse(
  res,
  data,
  code = 200,
  content = { type: "Content-Type", value: "application/json" }
) {
  res.setHeader(content.type, content.value);
  res.statusCode = code;
  res.end(JSON.stringify(data));
}
