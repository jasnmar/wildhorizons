import { getDataFromDB } from "../database/db.js"

export async function filterData(searchParam, searchTerm) {
  const destinations = await getDataFromDB()

  const filteredData = destinations.filter((destination) => {
    const st = searchTerm.toLowerCase().replace(" ", "")
    return destination[searchParam].toLowerCase().replace(" ", "") === st
  })

  return filteredData
}
