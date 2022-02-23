import { read } from "./httpService";

async function apiGetAllCities() {
  const allCities = await read("/cities");

  // https://www.w3schools.com/jsref/jsref_localecompare.asp
  // Compara e Ordena os Nomes das Cidades em Ordem Alfabetica
  return allCities.sort((a, b) => a.name.localeCompare(b.name));
}

async function apiGetAllCandidates() {
  const allCandidates = await read("/candidates");
  return allCandidates;
}

async function apiGetAllElections(cityId) {
  const allElections = await read(`/election?cityId=${cityId}`);
  //Ordena votos em Ordem Crescente
  return allElections.sort((a, b) => b.votes - a.votes);
}

export { apiGetAllCities, apiGetAllCandidates, apiGetAllElections };
