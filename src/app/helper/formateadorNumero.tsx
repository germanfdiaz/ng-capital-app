
const fn = ( numero: number, decimales : number = 2 ) : string => {
    const opciones = {
        minimumFractionDigits: decimales,
        maximumFractionDigits: decimales
    };

    return numero.toLocaleString( 'es-AR', opciones );
}

export default fn;