import { getDataFromDB } from "../database/db.js"

export async function filterQueryParams(params) {
  let newData = await getDataFromDB()
  const country = params.country
  const continent = params.continent
  const is_open_to_public = params.is_open_to_public

  if (country) {
    newData = newData.filter((item) => item.country === country)
  }

  if (continent) {
    newData = newData.filter(
      (item) =>
        item.continent.toLocaleLowerCase().replaceAll(" ", "") ===
        continent.toLowerCase()
    )
  }

  if (is_open_to_public) {
    newData = newData.filter(
      (item) => item.is_open_to_public.toString() === is_open_to_public
    )
  }

  return newData
}
