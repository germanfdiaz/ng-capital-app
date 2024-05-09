import axios from "axios";
import { useEffect } from "react";

import jsonDataFixed from './cotizaciones2.json';

export default function iolServicios() {

    // Funcion para obtener las cotizaciones de los cedears, bonos y ON de la API de IOL ya procesadas en el backend
        //useEffect(() => {
            const fetchData = async () => {
                try {
                    const urlCotizaciones = 'http://ng-capital.vercel.app/iol/getCotizaciones';
                    const respuesta = await axios.get( urlCotizaciones ) ;
                    
                    if ( respuesta.status === 200) {
                        return respuesta.data;
                    } else {
                        return null;
                    }
                    
                } catch (error) {
                    return jsonDataFixed;
                }
            };
            
            return fetchData();

           // fetchData();
        //}, []);
    //}   
};