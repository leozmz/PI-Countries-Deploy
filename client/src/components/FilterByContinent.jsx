import React from "react";
import { useDispatch } from "react-redux";
import { filterByContinent } from "../actions";
import styles from './styles/Filters.module.css';

export default function FilterByContinent() {

    const dispatch = useDispatch();

    function handleFilterContinent(e) {
        e.preventDefault();
        dispatch(filterByContinent(e.target.value))
    };

    return (
        <div>
            <h5>Filtrar por Continente</h5>

            <select onChange={(e) => handleFilterContinent(e)} className={styles.button}>
                <option value="All">Todos</option>
                <option value="Africa">África</option>
                <option value="Asia">Ásia</option>
                <option value="Europe">Europa</option>
                <option value="Oceania">Oceanía</option>
                <option value="North America">América del Norte</option>
                <option value="South America">América del Sur</option>
                <option value="Antarctica">Antártida</option>
            </select>
        </div>
    );
}
