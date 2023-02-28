import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCountryDetails, clean } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles/Detail.module.css';

export default function Detail() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const countryDetails = useSelector(state => state.countryDetails);
    console.log('countryDetails: ', countryDetails);

    useEffect(() => {
        dispatch(getCountryDetails(id));
        return dispatch(clean());
    }, [id]);

    return (
        <div className={styles.container}>
            <div className={styles.containerMain}>
                <div className={styles.containerDetail}>
                    <h3>Información acerca del País</h3>
                    <img src={countryDetails.img} alt="img no encontrada" />
                    <p>Nombre: {countryDetails.name}</p>
                    <p>Capital: {countryDetails.capital}</p>
                    <p>Código de País: {countryDetails.id}</p>
                    <p>Continente: {countryDetails.continent}</p>
                    <p>Subregión: {countryDetails.subregion}</p>
                    <p>Área: {countryDetails.area} Km2</p>
                    <p>Población: {countryDetails.population}</p>
                </div>

                <div className={styles.containerActivities}>
                    <h3>Actividades Turísticas</h3>
                    {countryDetails.activities?.length ? countryDetails.activities.map((activity) => (
                        <div>
                            <div>
                                <h4>
                                    {" "}
                                    {activity.name.charAt(0).toUpperCase() +
                                        activity.name.slice(1).toLowerCase()}
                                </h4>
                                <p>Dificultad: {activity.difficulty}</p>
                                <p>Duración: {activity.duration} horas</p>
                                <p>Temporada: {activity.season}</p>
                            </div>
                            <Link to={'/post_activity'}>
                                <button className={styles.button}>
                                    Crear Actividad Turística
                                </button>
                            </Link>
                        </div>
                    )) :
                        <div>
                            <p>Este País aún no tiene actividades turísticas asignadas</p>
                            <Link to={'/post_activity'}>
                                <button className={styles.button}>
                                    Crear Actividad Turística
                                </button>
                            </Link>
                        </div>}
                </div>
            </div>

            <div>
                <Link to='/home'>
                    <button className={styles.button}>HOME</button>
                </Link>
            </div>
        </div>
    )
}