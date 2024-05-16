import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import fn from '../../helper/formateadorNumero';

type GridData = {
    id                  : number;
    instrumento         : string;
    empresa             : string;
    tickerARS           : string;
    tickerUSD           : string;
    volumenARS          : number;
    volumenUSD          : number;
    compraARScant       : string; //compraARS       : number;
    ventaARScant        : string; //ventaARS        : number;
    compraUSDcant       : string; //compraUSD       : number;
    ventaUSDcant        : string; //ventaUSD        : number;
    tcCompra            : number;
    tcVenta             : number;
    tcCompraARS         : number;
    rentabilidad        : string; //rentabilidad     : number;
    rentabilidadMax     : string; //rentabilidadMax  : number;
};

interface Props {
    ventaProp:  GridData; //{};
    compraProp: GridData; //{};
};


//export default function Operaciones( { rowVenta, rowCompra }) {
const Operaciones: React.FC<Props> = ({ ventaProp, compraProp }) => {

    var precioCompraUSD        : number = 0;
    var cantidadCompraUSD      : number = 0;
    var montoCompraUSD         : number = 0;
    var cantidadPuntaCompraUSD : number = 0;
    var cantidadVentaARS       : number = 0;
    var precioVentaARS         : number = 0;
    var montoVentaARS          : number = 0;
    var cantidadPuntaVentaARS  : number = 0;
    var precioCompraARS        : number = 0;     
    var cantidadCompraARS      : number = 0;
    var montoCompraARS         : number = 0;
    var cantidadPuntaCompraARS : number = 0;
    var precioVentaUSD         : number = 0;
    var cantidadVentaUSD       : number = 0;
    var montoVentaUSD          : number = 0;
    var cantidadPuntaVentaUSD  : number = 0;
    var saldoARS               : number = 0;
    var rentaUSD               : number = 0;
    var rentaPorcentaje        : number = 0;
    
    console.log('1 - ' + ventaProp + ' - ' + compraProp);
    if (ventaProp && compraProp) {

        console.log('2 - ' + JSON.stringify(ventaProp) + ' - ' + JSON.stringify(compraProp));

        precioCompraUSD         =  Number(ventaProp.ventaUSDcant.substring( ventaProp.ventaUSDcant.indexOf(') ') + 2, ventaProp.ventaUSDcant.length));
        cantidadCompraUSD       =  Math.trunc( 1000 / precioCompraUSD);
        montoCompraUSD          =  Number((cantidadCompraUSD * precioCompraUSD).toFixed(2));
        cantidadPuntaCompraUSD  =  Number(ventaProp.ventaUSDcant.substring( ventaProp.ventaUSDcant.indexOf('(') + 1, ventaProp.ventaUSDcant.indexOf(')')));
        
        cantidadVentaARS        =  cantidadCompraUSD;
        precioVentaARS          =  Number(ventaProp.compraARScant.substring( ventaProp.compraARScant.indexOf(') ') + 2, ventaProp.compraARScant.length));
        montoVentaARS           =  Number((cantidadVentaARS * precioVentaARS).toFixed(2));
        cantidadPuntaVentaARS   =  Number(ventaProp.compraARScant.substring( ventaProp.compraARScant.indexOf('(') + 1, ventaProp.compraARScant.indexOf(')')));
        

        precioCompraARS         =  Number(compraProp.ventaARScant.substring( compraProp.ventaARScant.indexOf(') ') + 2, compraProp.ventaARScant.length));
        cantidadCompraARS       =  Math.trunc( montoVentaARS / precioCompraARS );
        montoCompraARS          =  Number((cantidadCompraARS * precioCompraARS).toFixed(2));
        cantidadPuntaCompraARS  =  Number(compraProp.ventaARScant.substring( compraProp.ventaARScant.indexOf('(') + 1, compraProp.ventaARScant.indexOf(')')));
        
        precioVentaUSD          =  Number(compraProp.compraUSDcant.substring( compraProp.compraUSDcant.indexOf(') ') + 2, compraProp.compraUSDcant.length));
        cantidadVentaUSD        =  cantidadCompraARS;
        montoVentaUSD           =  cantidadVentaUSD * precioVentaUSD;
        cantidadPuntaVentaUSD   =  Number(compraProp.compraUSDcant.substring( compraProp.compraUSDcant.indexOf('(') + 1, compraProp.compraUSDcant.indexOf(')')));
        rentaUSD                =  Number((Number(montoVentaUSD) - Number(montoCompraUSD)).toFixed(2));
        rentaPorcentaje         =  Number((Number(rentaUSD) / Number(montoCompraUSD) * 100 ).toFixed(2));
        saldoARS                =  Number(montoVentaARS) - Number(montoCompraARS);
    

        return (
            <>
                <Card 
                    elevation={3}
                    //variant="outlined"
                    //style={{ maxWidth: '1340px' }} 
                    sx={ { 
                        maxWidth: '1430px', 
                        borderRadius: '10px'
                    } }
                >
                    <CardHeader
                        //style={{ margin: '8px' }}
                        titleTypographyProps={{ variant: 'h4', fontSize: 16 }}
                        title = "OPERACION"
                        subheaderTypographyProps={{ variant: 'h6', fontSize: 12 }}
                        //subheader = "Mejores cotizaciones de compra"
                        sx= {{ 
                            paddingTop:'8px',
                            paddingLeft: '18px',
                            paddingBottom:'2px',
                    }}
                    />
                    <CardContent
                        sx={{
                            paddingTop: '2px',
                            height: '180px',
                        }}
                    >
                        <table>
                            <thead>
                                <tr>
                                <th>Operación</th>
                                <th>Ticker</th>
                                <th>Descripción</th>
                                <th>Tipo</th>
                                <th style={{ textAlign: 'right' }}>Moneda</th>
                                <th style={{ textAlign: 'right' }}>Cantidad</th>
                                <th style={{ textAlign: 'right' }}>Precio</th>
                                <th style={{ textAlign: 'right' }}>Monto Bruto</th>
                                <th style={{ textAlign: 'right' }}>Cant. Punta</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Compra</td>
                                    <td> { ventaProp.tickerUSD }</td>
                                    <td> { ventaProp.empresa }</td>
                                    <td> { ventaProp.instrumento }</td>
                                    <td style={{ textAlign: 'right' }}>U$D</td> 
                                    <td style={{ textAlign: 'right' }}> { cantidadCompraUSD }</td>
                                    <td style={{ textAlign: 'right' }}> { fn( precioCompraUSD ) } </td>
                                    <td style={{ textAlign: 'right' }}> { fn( montoCompraUSD ) } </td>
                                    <td style={{ textAlign: 'right' }}> { fn( cantidadPuntaCompraUSD ) }</td>
                                </tr>
                                <tr>
                                    <td>Venta</td>
                                    <td> { ventaProp.tickerARS }</td>
                                    <td> { ventaProp.empresa }</td>
                                    <td> { ventaProp.instrumento }</td>
                                    <td style={{ textAlign: 'right' }}>AR$</td> 
                                    <td style={{ textAlign: 'right' }}> { cantidadVentaARS }</td>
                                    <td style={{ textAlign: 'right' }}> { fn( precioVentaARS ) } </td>
                                    <td style={{ textAlign: 'right' }}> { fn( montoVentaARS ) } </td>
                                    <td style={{ textAlign: 'right' }}> { fn( cantidadPuntaVentaARS ) }</td>
                                </tr>
                                <tr>
                                    <td>Compra</td>
                                    <td> { compraProp.tickerUSD }</td>
                                    <td> { compraProp.empresa }</td>
                                    <td> { compraProp.instrumento }</td>
                                    <td style={{ textAlign: 'right' }}>AR$</td> 
                                    <td style={{ textAlign: 'right' }}> { cantidadCompraARS }</td>
                                    <td style={{ textAlign: 'right' }}> { fn( precioCompraARS ) } </td>
                                    <td style={{ textAlign: 'right' }}> { fn( montoCompraARS ) } </td>
                                    <td style={{ textAlign: 'right' }}> { fn( cantidadPuntaCompraARS ) }</td>
                                </tr>
                                <tr>
                                    <td>Venta</td>
                                    <td> { compraProp.tickerARS }</td>
                                    <td> { compraProp.empresa }</td>
                                    <td> { compraProp.instrumento }</td>
                                    <td style={{ textAlign: 'right' }}>U$D</td> 
                                    <td style={{ textAlign: 'right' }}> { cantidadVentaUSD }</td>
                                    <td style={{ textAlign: 'right' }}> { fn( precioVentaUSD ) } </td>
                                    <td style={{ textAlign: 'right' }}> { fn( montoVentaUSD ) } </td>
                                    <td style={{ textAlign: 'right' }}> { fn( cantidadPuntaVentaUSD ) }</td>
                                </tr> 
                            </tbody>
                        </table>
                        <br/>
                        <table>
                            <thead>
                            <tr>
                                    <th>MONTO INVERTIDO</th>
                                    <th>MONTO OBTENIDO</th>
                                    <th>RENTA FINAL U$D</th>
                                    <th>RENTA FINAL %</th>
                                    <th>SALDO AR$</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ textAlign: 'right' }}>{ fn( montoCompraUSD ) } </td>
                                    <td style={{ textAlign: 'right' }}>{ fn( montoVentaUSD ) } </td>
                                    <td style={{ textAlign: 'right' }}>{ fn( rentaUSD ) } </td>
                                    <td style={{ textAlign: 'right' }}>{ fn( rentaPorcentaje ) } </td>
                                    <td style={{ textAlign: 'right' }}>{ fn( saldoARS ) } </td>
                                </tr>
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </>
        );
    }
    else 
    {
        return null;
    };
};
  
export default Operaciones;