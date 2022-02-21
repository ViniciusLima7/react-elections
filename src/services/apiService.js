import { read } from "./httpService";

export async function apiGetAllCities() {
  const allCities = await read("/cities");
  return allCities;
}
