import React, { useEffect, useState } from 'react'
import { apiGetAllCities } from '../services/apiService';


export default function Select() {

    const [allCities, setAllCities] = useState([]);


    useEffect(() => {

        async function getAllCities() {
            try {
                const backEndAllCities = await apiGetAllCities();

                setAllCities(backEndAllCities);

            } catch (error) {
                return error.message
            }
        }

        getAllCities();
    }, []);




    return (
        <select>
            {allCities.map((city) => {
                //desestrurando colunas para facilitar
                const { id, name } = city;
                return (
                    <option key={id} value={id}>{name}</option>
                );
            })}
        </select>
    );
}
