import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, filterByActivity } from '../actions';
import styles from './styles/Filters.module.css';

export default function FilterByActivity() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    // Traemos el estado de redux con las actividades.
    const activities = useSelector(state => state.activities);
    console.log('Activities: ', activities);
    // Si hay activities las mapeamos
    const activitiesArr = activities?.map(ac => ac.name);

    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch]);

    // Handler
    function handleFilterActivity(e) {
        dispatch(filterByActivity(e.target.value))
        setCurrentPage(1);
        console.log('Valor e.target.value', e.target.value);
    };

    return (
        <div>
            <h5>Filtrar por Actividad</h5>
            
            <select onChange={e => handleFilterActivity(e)} className={styles.button}>
                <option>Seleccionar</option>
                {activitiesArr?.map(a => (
                    <option value={a} key={a}>
                        {a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()}
                    </option>
                ))
                }
            </select>
        </div>
    );
}