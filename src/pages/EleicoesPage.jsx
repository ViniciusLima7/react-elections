import { useEffect, useState } from "react";
import Eleicoes from "../components/Eleicoes";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Main from "../components/Main";
import Select from "../components/Select";
import { apiGetAllCandidates, apiGetAllCities, apiGetAllElections } from "../services/apiService";

export default function EleicoesPage() {

    const [cities, setCities] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [currentElection, setCurrentElection] = useState([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingCity, setLoadingCity] = useState(true);


    //Monitorar Candidadtos e Cidades e guardar valores
    useEffect(() => {

        async function getBackEndData() {
            const apiCandidates = await apiGetAllCandidates();

            const apiCities = (await apiGetAllCities())
                .map(city => ({ ...city, description: city.name }));

            // console.log("apiCandidates", apiCandidates);
            // console.log("apiCities", apiCities);

            setCities(apiCities);
            setCandidates(apiCandidates);
            setInitialLoading(false);
        }

        getBackEndData();

    }, []);


    // Pega o primeiro Indice do Array e Traz como Default
    useEffect(() => {
        if (cities.length > 0) {
            setSelectedCity(cities[0]);
        }
    }, [cities]);

    //Pegar Dados de Eleição de Acordo com o Id da Cidade
    useEffect(() => {
        async function getCurrentElection() {
            if (selectedCity) {
                setLoadingCity(true);
                const apiElection = await apiGetAllElections(selectedCity.id);
                // console.log("selectedCity.id", selectedCity);
                // console.log("apiElection", apiElection);
                setCurrentElection(apiElection);
            }
            setLoadingCity(false);
        }

        getCurrentElection();
    }, [selectedCity]);

    //Verificar Id do Select se é igual ao Id da Cidade no BackEnd e trazer dados sobre isso
    function handleCityChange(newSelectedCityId) {
        console.log("newSelectedCityId", newSelectedCityId)
        console.log("cities", cities)
        setSelectedCity(cities.find(city => city.id === newSelectedCityId));
    }

    let mainJsx = (
        <div className="flex flex-row justify-center">
            <Loading />
        </div>
    );

    if (!initialLoading) {
        const fullElection = {
            election: currentElection
                .map(election => ({
                    ...election,
                    candidate: candidates.find(
                        candidate => candidate.id === election.candidateId
                    ),
                })),
            city: selectedCity,
        };

        mainJsx = (
            <>
                <Select
                    labelDescription="Escolha o município de Votação"
                    onChangeValue={handleCityChange}
                    selectedValue={selectedCity}
                >
                    {cities}
                </Select>

                {loadingCity ? (
                    <div className="flex flex-row justify-center">
                        <Loading />
                    </div>
                ) : (
                    <Eleicoes>{fullElection}</Eleicoes>
                )}
            </>
        );
    }

    return (

        <>
            <Header>Eleições com React</Header>
            <Main>{mainJsx}</Main>
        </>
    );
}
