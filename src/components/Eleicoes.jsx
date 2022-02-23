// import React, { useEffect, useState } from 'react'
// import { apiGetAllCandidates, apiGetAllCities } from '../services/apiService';
import Candidato from './Candidato';
import NumberFormatter from './NumberFormatter';

export default function Eleicoes({ children: fullElection }) {
    const { city, election } = fullElection;

    return (
        <>
            <div className="mt-8 p-2 border border-black">
                <h2 className="text-center font-bold text-xl mb-4">
                    Eleição em {city.name}
                </h2>

                <h3 className="flex flex-row items-center justify-center flex-wrap space-x-4">
                    <span>
                        <strong>Total de eleitores: </strong>
                        <NumberFormatter>{city.votingPopulation}</NumberFormatter>
                    </span>

                    <span>
                        <strong>Abstenção: </strong>
                        <NumberFormatter>{city.absence}</NumberFormatter>
                    </span>

                    <span>
                        <strong>Comparecimento: </strong>
                        <NumberFormatter>{city.presence}</NumberFormatter>
                    </span>
                </h3>

                <h4 className="text-center my-4 font-semibold">
                    {election.length} candidatos
                </h4>

                <div className="mt-8 p-2 flex flex-row items-center justify-center flex-wrap">
                    {election.map((candidate, index) => {
                        return (
                            <Candidato
                                key={candidate.id}
                                presence={city.presence}
                                elected={index === 0}
                            >
                                {candidate}
                            </Candidato>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
