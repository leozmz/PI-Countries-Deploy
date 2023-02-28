import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderCountryByName, getCountries } from "../actions";
import styles from './SortByName.module.css';

export default function SortByName() {
    const dispatch = useDispatch();
    
    const [order, setOrder] = useState('');

    function handleCountrySortByName(e) {
        e.preventDefault();
        dispatch(orderCountryByName(e.target.value));
        setOrder(`Ordenado ${e.target.value}`) // modifique el estado local y se renderice.
    };

    return (
        <div className={styles.containerButtons}>
            <h5>Ordenar alfabéticamente</h5>
            <select onChange={(e) => handleCountrySortByName(e)} className={styles.select}>
                <option>Seleccionar</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
            </select>
        </div>
    )
}
