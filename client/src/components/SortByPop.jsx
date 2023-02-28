import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { orderCountryByPop } from "../actions";
import styles from './SortByPop.module.css';

export default function SortByPop() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [order, setOrder] = useState('');

    function handleCountrySortByPop(e) {
        e.preventDefault();
        dispatch(orderCountryByPop(e.target.value));
        setCurrentPage(1); // Cuando se configure esta página
        setOrder(`Ordenado ${e.target.value}`) // modifique el estado local y se renderice.
    };

    return (
        <div className={styles.containerButtons}>
            <h5>Ordenar por población</h5>
            <select onChange={(e) => handleCountrySortByPop(e)}>
                <option>Seleccionar</option>
                <option value="asc">Menor a Mayor</option>
                <option value="desc">Mayor a Menor</option>
            </select>
        </div>
    );
}