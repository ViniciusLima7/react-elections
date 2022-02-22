import React, { useEffect, useState } from 'react'
import { apiGetAllCandidates, apiGetAllCities } from '../services/apiService';

export default function Eleicoes() {


    const [allCities, setAllCities] = useState([]);
    const [allCandidates, setAllCandidates] = useState([]);


    useEffect(() => {

        async function getDadosBackEnd() {
            try {
                const backEndAllCities = await apiGetAllCities();
                const backEndAllCandidates = await apiGetAllCandidates();
                setAllCities(backEndAllCities);
                setAllCandidates(backEndAllCandidates);

            } catch (error) {
                return error.message
            }
        }

        getDadosBackEnd();
    }, []);




    return (
        <>
            <h2 className=" text-center text-xl font-semibold  pb-7">Eleições em Asgard</h2>
            <div className=" flex-row text-center ">
                {/* inline-flex */}
                {
                    allCities.map((city) => {
                        const { id, name, absence, presence, votingPopulation } = city;
                        return (
                            <>
                                <p className="text-sm font-semibold ">Total de Eleitores de {name}:  {votingPopulation}</p>
                                <p className="text-sm font-semibold ">Abstenções de {name}: {absence}</p>
                                <p className="text-sm font-semibold ">Comparecimento de {name}: {presence} </p>
                                <br />
                            </>
                        );

                    })
                }
                {/* <p className="text-sm font-semibold">Total de Eleitores: {votingPopulation}</p> */}
            </div>
        </>
    );
}
