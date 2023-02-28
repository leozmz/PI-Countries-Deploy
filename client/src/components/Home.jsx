import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, orderCountryByName, orderCountryByPop } from '../actions';
import Card from './Card';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import FilterByContinent from './FilterByContinent';
import FilterByActivity from './FilterByActivity';
import styles from './styles/Home.module.css';

// Inicia el componete.
export default function Home() {
    const dispatch = useDispatch();
    // Traer desde el reducer el estado filterCountries que tiene todos los países.
    const allCountries = useSelector(state => state.filterCountries);

    /////////////////////////////////////////////
    // Orden *
    const [order, setOrder] = useState('');
    /////////////////////////////////////////////

    // Hook para que al cambiar el contenido de allCountries se configure la página actual en 1.
    useEffect(() => {
        setCurrentPage(1);
    }, [allCountries]);
    // Hook para traer desde el estado el país cuando el componente se monta.
    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    /////////////////////////////////////////////
    // Paginado
    // Creamos estados locales, uno con la página actual y otro que la configure.
    const [currentPage, setCurrentPage] = useState(1); // Siempre comienza desde la primer página.
    // Definimos la cantidad de países que queremos ver en la primera página.
    const initialStateCountriesPerPage = 9;
    // Estado inicial de la cantidad de países mostrados en la 1ra. pág.
    const [countriesPerPage, setCountriesPerPage] = useState(initialStateCountriesPerPage);
    const indexOfLastCountry = currentPage * countriesPerPage; // 9
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // 0
    const currentCountries = allCountries?.slice(indexOfFirstCountry, indexOfLastCountry);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
        // En el siguiente bloque se decide que a partir de la segunda página listar 10 países por página.
        console.log(currentPage);
        if (pageNumber === 1) {
            setCurrentPage(1);
            setCountriesPerPage(initialStateCountriesPerPage);
        } else if (pageNumber > 1) {
            setCountriesPerPage(initialStateCountriesPerPage + 1);
        }
    };

    /////////////////////////////////////////////
    // Handlers
    /////////////////////////////////////////////
    function handleClick(e) {
        e.preventDefault();
        setCurrentPage(1);
        setCountriesPerPage(9)
        dispatch(getCountries());
    };

    function handleCountrySortByName(e) {
        e.preventDefault();
        setOrder(e.target.value) // modifique el estado local y se renderice.
        dispatch(orderCountryByName(e.target.value));
    };
    
    function handleCountrySortByPop(e) {
        e.preventDefault();
        setOrder(e.target.value) // modifique el estado local y se renderice.
        dispatch(orderCountryByPop(e.target.value));
    };

    /////////////////////////////////////////////
    // Renderizado
    /////////////////////////////////////////////
    return (
        <div>
            <div className={styles.navBar}>
                <h3>Países del Mundo</h3>
                <div className={styles.searchBar}><SearchBar /></div>
            </div>

            {/*Ordenamiento y filtrado.*/}
            <div>
                <div className={styles.container}>

                    <div className={styles.containerButtons}>
                        <h5>Ordenar alfabéticamente</h5>
                        <select onChange={(e) => handleCountrySortByName(e)} className={styles.button}>
                            <option>Seleccionar</option>
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option>
                        </select>
                    </div>

                    <div className={styles.containerButtons}>
                        <h5>Ordenar por población</h5>
                        <select onChange={(e) => handleCountrySortByPop(e)} className={styles.button}>
                            <option>Seleccionar</option>
                            <option value="asc">Menor a Mayor</option>
                            <option value="desc">Mayor a Menor</option>
                        </select>
                    </div>

                    <div className={styles.containerButtons}>
                        <FilterByContinent />
                    </div>

                    <div className={styles.containerButtons}>
                        <FilterByActivity />
                    </div>
                </div>

                <Link to={'/post_activity'}>
                    <button className={styles.button}>
                        Crear Actividad Turística
                    </button>
                </Link>

                <button onClick={(e) => { handleClick(e) }} className={styles.button}>
                    Volver a cargar todos los Países
                </button>

                {currentCountries.length ? (
                    <div className={styles.containerCountries}>
                        {
                            currentCountries.map((d) => {
                                console.log('currentCountries', currentCountries);
                                return (
                                    <div key={d.id}>
                                        <Link to={`/detail/${d.id}`} className={styles.link}>
                                            <Card
                                                name={d.name}
                                                continent={d.continent}
                                                population={d.population}
                                                img={d.img}
                                            />
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>) : (<div>Cargando...</div>)}

                <Pagination
                    countriesPerPage={countriesPerPage}
                    allCountries={allCountries.length}
                    pagination={pagination}
                    currentPage={currentPage}
                />

            </div>

        </div>
    )
}