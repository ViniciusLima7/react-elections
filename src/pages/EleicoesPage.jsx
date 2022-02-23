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

    useEffect(() => {
        async function getCities() {
            const apiCities = (await apiGetAllCities())
                .map(city => ({ ...city, description: city.name }));

            setCities(apiCities);
        }

        async function getCandidates() {
            const apiCandidates = await apiGetAllCandidates();
            setCandidates(apiCandidates);
        }

        getCities().then(() => {
            getCandidates().then(() => {
                setTimeout(() => {
                    setInitialLoading(false);
                }, 500);
            });
        });
    }, []);

    useEffect(() => {
        if (cities.length > 0) {
            setSelectedCity(cities[0]);
        }
    }, [cities]);

    useEffect(() => {
        async function getCurrentElection() {
            if (selectedCity) {
                setLoadingCity(true);
                const election = await apiGetAllElections(selectedCity.id);
                setCurrentElection(election);

                setTimeout(() => {
                    setLoadingCity(false);
                }, 500);
            }
        }

        getCurrentElection();
    }, [selectedCity]);

    function handleCityChange(newSelectedCityId) {
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
                }))
                .sort((a, b) => b.votes - a.votes),
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
    console.log(apiGetAllCandidates());
    console.log(apiGetAllCities());
    console.log(apiGetAllElections());
    return (
        // <div>
        //   <Header>React Eleições</Header>

        //   <Main>
        //     <div className="text-center">
        //       <label>Escolha o Municipio</label>
        //       <br />
        //       <Select />
        //     </div>

        //     <br />
        //     <Eleicoes></Eleicoes>
        //   </Main>
        // </div>


        <>
            <Header>react-elections</Header>
            <Main>{mainJsx}</Main>
        </>
    );
}
