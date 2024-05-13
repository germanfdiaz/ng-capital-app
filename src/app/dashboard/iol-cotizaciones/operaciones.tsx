import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { AlignHorizontalRight } from '@mui/icons-material';

interface Props {
    ventaProp: {};
    compraProp: {};
};


//export default function Operaciones( { rowVenta, rowCompra }) {
const Operaciones: React.FC<Props> = ({ ventaProp, compraProp }) => {

    var precioCompraUSD        : number = 0;
    var cantidadCompraUSD      : number = 0;
    var montoCompraUSD         : string = '';
    var cantidadPuntaCompraUSD : number = 0;
    var cantidadVentaARS       : number = 0;
    var precioVentaARS         : number = 0;
    var montoVentaARS          : string = '';
    var cantidadPuntaVentaARS  : number = 0;
    var precioCompraARS        : number = 0;     
    var cantidadCompraARS      : number = 0;
    var montoCompraARS         : string = '';
    var cantidadPuntaCompraARS : number = 0;
    var precioVentaUSD         : number = 0;
    var cantidadVentaUSD       : number = 0;
    var montoVentaUSD          : string = '';
    var cantidadPuntaVentaUSD  : number = 0;
    var saldoARS               : number = 0;
    var rentaUSD               : string = '';
    var rentaPorcentaje        : string = '';
    
    if (JSON.stringify(ventaProp) != '{}' && JSON.stringify(compraProp) != '{}') {

        precioCompraUSD         = ventaProp.ventaUSDcant.substring( ventaProp.ventaUSDcant.indexOf(') ') + 2, ventaProp.ventaUSDcant.length);
        cantidadCompraUSD       = Math.trunc( 1000 / precioCompraUSD);
        montoCompraUSD          = (cantidadCompraUSD * precioCompraUSD).toFixed(2);
        cantidadPuntaCompraUSD  = ventaProp.ventaUSDcant.substring( ventaProp.ventaUSDcant.indexOf('(') + 1, ventaProp.ventaUSDcant.indexOf(')'));
        
        cantidadVentaARS        = cantidadCompraUSD;
        precioVentaARS          = ventaProp.compraARScant.substring( ventaProp.compraARScant.indexOf(') ') + 2, ventaProp.compraARScant.length);
        montoVentaARS           = (cantidadVentaARS * precioVentaARS).toFixed(2);
        cantidadPuntaVentaARS   = ventaProp.compraARScant.substring( ventaProp.compraARScant.indexOf('(') + 1, ventaProp.compraARScant.indexOf(')'));
        

        precioCompraARS          = compraProp.ventaARScant.substring( compraProp.ventaARScant.indexOf(') ') + 2, compraProp.ventaARScant.length);
        cantidadCompraARS        = Math.trunc( montoVentaARS / precioCompraARS );
        montoCompraARS           = (cantidadCompraARS * precioCompraARS).toFixed(2);
        cantidadPuntaCompraARS   = compraProp.ventaARScant.substring( compraProp.ventaARScant.indexOf('(') + 1, compraProp.ventaARScant.indexOf(')'));
        
        precioVentaUSD          = compraProp.compraUSDcant.substring( compraProp.compraUSDcant.indexOf(') ') + 2, compraProp.compraUSDcant.length);
        cantidadVentaUSD        = cantidadCompraARS;
        montoVentaUSD           = (cantidadVentaUSD * precioVentaUSD).toFixed(2);
        cantidadPuntaVentaUSD   = compraProp.compraUSDcant.substring( compraProp.compraUSDcant.indexOf('(') + 1, compraProp.compraUSDcant.indexOf(')'));
        rentaUSD                = (Number(montoVentaUSD) - Number(montoCompraUSD)).toFixed(2);
        rentaPorcentaje         = (Number(rentaUSD) / Number(montoCompraUSD) * 100 ).toFixed(2);
        saldoARS                = Number(montoVentaARS) - Number(montoCompraARS);
    }

    return (
        <>
            { (JSON.stringify(ventaProp) != '{}' && JSON.stringify(compraProp) != '{}') && 
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
                             <th>Moneda</th>
                             <th>Cantidad</th>
                             <th>Precio</th>
                             <th>Monto Bruto</th>
                             <th>Cant. Punta</th>
                             </tr>
                         </thead>
                         <tbody>
                             <tr>
                                 <td>Compra</td>
                                 <td> { ventaProp.tickerUSD }</td>
                                 <td> { ventaProp.empresa }</td>
                                 <td> { ventaProp.instrumento }</td>
                                 <td>U$D</td> 
                                 <td> { cantidadCompraUSD }</td>
                                 <td> { precioCompraUSD } </td>
                                 <td> { montoCompraUSD } </td>
                                 <td> { cantidadPuntaCompraUSD }</td>
                             </tr>
                             <tr>
                                 <td>Venta</td>
                                 <td> { ventaProp.tickerARS }</td>
                                 <td> { ventaProp.empresa }</td>
                                 <td> { ventaProp.instrumento }</td>
                                 <td>AR$</td> 
                                 <td> { cantidadVentaARS }</td>
                                 <td> { precioVentaARS } </td>
                                 <td> { montoVentaARS } </td>
                                 <td> { cantidadPuntaVentaARS }</td>
                             </tr>
                             <tr>
                                 <td>Compra</td>
                                 <td> { compraProp.tickerUSD }</td>
                                 <td> { compraProp.empresa }</td>
                                 <td> { compraProp.instrumento }</td>
                                 <td>AR$</td> 
                                 <td> { cantidadCompraARS }</td>
                                 <td> { precioCompraARS } </td>
                                 <td> { montoCompraARS } </td>
                                 <td> { cantidadPuntaCompraARS }</td>
                             </tr>
                             <tr>
                                 <td>Venta</td>
                                 <td> { compraProp.tickerARS }</td>
                                 <td> { compraProp.empresa }</td>
                                 <td> { compraProp.instrumento }</td>
                                 <td>U$D</td> 
                                 <td> { cantidadVentaUSD }</td>
                                 <td> { precioVentaUSD } </td>
                                 <td> { montoVentaUSD } </td>
                                 <td> { cantidadPuntaVentaUSD }</td>
                             </tr> 
                         </tbody>
                     </table>
                     <br/>
                     <table style={{border: 'solid 1px'}}>
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
                                <td style={{ textAlign: 'right' }}>{ montoCompraUSD } </td>
                                <td style={{ textAlign: 'right' }}>{ montoVentaUSD } </td>
                                <td style={{ textAlign: 'right' }}>{ rentaUSD } </td>
                                <td style={{ textAlign: 'right' }}>{ rentaPorcentaje } </td>
                                <td style={{ textAlign: 'right' }}>{ saldoARS } </td>
                            </tr>
                        </tbody>
                     </table>
                 </CardContent>
             </Card>
            } 
        </>
     );
  }
  

  export default Operaciones;