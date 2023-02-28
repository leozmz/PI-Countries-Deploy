import React from "react";
import styles from './styles/Pagination.module.css';

// Con la siguiente función declaramos el paginado.
export default function Pagination({ allCountries, pagination, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allCountries / 10); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className={styles.pagination}>

            {/*Botón Prev*/}
            {
                pageNumbers &&
                    currentPage > 1 ?
                    (
                        <button onClick={() => pagination(currentPage - 1)} className={styles.button}>
                            {'<<'}
                        </button>
                    ) : null
            }

            {/*Numeros de página*/}
            {
                pageNumbers &&
                pageNumbers.map((number) => (
                    <li className="number">
                        <button onClick={() => pagination(number)} className={styles.button}>{number}</button>
                    </li>
                ))
            }

            {/*Botón Sig*/}
            {
                pageNumbers &&
                    currentPage <= pageNumbers.length - 1 ?
                    (
                        <button onClick={() => pagination(currentPage + 1)} className={styles.button}>
                            {'>>'}
                        </button>
                    ) : null
            }

        </ul>
    )
};