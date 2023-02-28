import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountriesForLanding } from '../actions';
import Card from './Card';
import styles from './styles/LandingPage.module.css'

export default function LandingPage() {
    const allCountries = useSelector(state => state.filterCountriesForLanding);
    console.log('allCountries:::', allCountries);
    const dispatch = useDispatch();

    const randomCountry = Math.floor(Math.random() * allCountries.length);

    useEffect(() => {
        dispatch(getCountriesForLanding());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getCountriesForLanding());
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Países del Mundo</h2>
            </div>

            <div className={styles.containerMain}>
                <div className={styles.containerCountryText}>
                    <text>
                        Esta <strong>aplicación</strong> se creó como un <strong>proyecto individual</strong> desarrollado para el bootcamp de <strong>Henry</strong>. Podrás <strong>buscar</strong> información de cualquier país del mundo y <strong>crear</strong> actividades turísticas.
                    </text>
                    <br />
                    <text>
                        Además puedes <strong>ordenar</strong> o <strong>filtrar</strong> los países por nombre, continente y tipo de actividad si lo deseas.
                    </text>
                </div>

                {allCountries.length ?
                    <div className={styles.containerCountryFlag}>
                        <div className={styles.fodTitle}>
                            ¡Elige una Bandera!
                        </div>
                        <div key={allCountries[randomCountry].id}>
                            <Link to={`/detail/${allCountries[randomCountry].id}`} className={styles.link}>
                                <Card
                                    name={allCountries[randomCountry].name}
                                    continent={allCountries[randomCountry].continent}
                                    population={allCountries[randomCountry].population}
                                    img={allCountries[randomCountry].img}
                                />
                            </Link>
                        </div>
                        <Link to='/home'>
                            <button className={styles.button}>Ingresar</button>
                        </Link>
                    </div> : (<h2>Esperá un momento...</h2>)}
            </div>
            <div className={styles.footer}>
                <text className={styles.footerTxt}>
                    Developed by <a href="https://github.com/zm0x7b9/" className={styles.link}>@zm0x7b9</a> | v1.0 &copy; 2022.
                </text>
            </div>
        </div>
    )
}