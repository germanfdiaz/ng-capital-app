import { useEffect, useState } from "react";

// Material UI imports
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { CircularProgress } from '@mui/material';
import iolServicios from "./iol-servicios";




export default function CardCotizaciones() {

    type CompanyData = {
        simbolo: string;
        puntas: {
                    cantidadCompra: number,
                    precioCompra: number,
                    precioVenta: number,
                    cantidadVenta: number
                },
        ultimoPrecio: number,
        variacionPorcentual: number,
        apertura: number,
        maximo: number,
        minimo: number,
        ultimoCierre: number,
        volumen: number,
        cantidadOperaciones: number,
        fecha: any,
        tipoOpcion: any,
        precioEjercicio: any,
        fechaVencimiento: any,
        mercado: string,
        moneda: string,
        descripcion: string,
        plazo: string,
        laminaMinima: number,
        lote: number,
        tipo: string
    };
        
    type GridData = {
    id: number;
    instrumento: string;
    empresa: string;
    tickerARS: string;
    tickerUSD: string;
    volumenARS: number;
    volumenUSD: number;
    compraARS: number;
    ventaARS: number;
    compraUSD: number;
    ventaUSD: number;
    tcCompra: number;
    tcVenta: number;
    tcCompraARS: number;
    rentabilidad: number;
    };

    // Definicion de la columnas
    const [columns, setColumns] = useState<GridColDef[]>([
        { field: 'instrumento'  ,headerName: 'Instrumento'     ,width: 100  ,align: 'center' },
        { field: 'empresa'      ,headerName: 'Empresa'         ,width: 220 ,align: 'left'   },
        { field: 'tickerARS'    ,headerName: 'Ticker ARS'      ,width: 100 ,align: 'center' },
        { field: 'tickerUSD'    ,headerName: 'Ticker USD'      ,width: 100 ,align: 'center' },
        { field: 'volumenARS'   ,headerName: 'Volumen ARS'     ,width: 110 ,align: 'right'  },
        { field: 'volumenUSD'   ,headerName: 'Volumen USD'     ,width: 110 ,align: 'right'  },
        { field: 'compraARS'    ,headerName: 'Compra ARS'      ,width: 100 ,align: 'right'  },
        { field: 'ventaARS'     ,headerName: 'Venta ARS'       ,width: 100 ,align: 'right'  },
        { field: 'compraUSD'    ,headerName: 'Compra USD'      ,width: 100 ,align: 'right'  },
        { field: 'ventaUSD'     ,headerName: 'Venta USD'       ,width: 100 ,align: 'right'  },
        { field: 'tcCompra'     ,headerName: 'T.C. Compra'     ,width: 125 ,align: 'right'  },
        { field: 'tcVenta'      ,headerName: 'T.C. Venta'      ,width: 160 ,align: 'right'  },
        { field: 'tcCompraARS'  ,headerName: 'T.C. Compra AR$' ,width: 150 ,align: 'right'  },
        { field: 'rentabilidad' ,headerName: 'Rentabilidad'    ,width: 150 ,align: 'right'  },
    ]);

    const [ isLoading,  setIsLoading ]   = useState( true );
    const [ rows,       setRows ]        = useState<GridData[]>([]);
    const [ maxTCVenta, setMaxTCVenta ]  = useState<number>(0);
    const [ jsonData,   setjsonData ]    = useState({});

    const resData = iolServicios();
    
    setjsonData( resData );

    // Calculo datos para la grilla
    useEffect(() => {
        const newRows: GridData[] = Object.entries( jsonData )
            .filter( ( [ company, data ] ) => {
                // Filtramos primero para excluir registros con compraARS, ventaARS, compraUSD, ventaUSD, volumenNominalARS y volumenNominalUSD igual a 0
                const companyData = data as CompanyData[];
                if (companyData.find((d) => d.moneda === '1')?.puntas === null || companyData.find((d) => d.moneda === '2')?.puntas === null) {
                    return (companyData.find((d) => d.moneda === '1')?.puntas !== null && companyData.find((d) => d.moneda === '2')?.puntas !== null);
                } else{
                const volumenNominalARS   = companyData.find((d) => d.moneda === '1')?.volumen || 0;
                const volumenNominalUSD   = companyData.find((d) => d.moneda === '2')?.volumen || 0;
                const compraARS           = companyData.find((d) => d.moneda === '1')?.puntas.precioCompra || 0;
                const ventaARS            = companyData.find((d) => d.moneda === '1')?.puntas.precioVenta  || 0;
                const compraUSD           = companyData.find((d) => d.moneda === '2')?.puntas.precioCompra || 0;
                const ventaUSD            = companyData.find((d) => d.moneda === '2')?.puntas.precioVenta  || 0;
                return (compraARS !== 0 && ventaARS !== 0 && compraUSD !== 0 && ventaUSD !== 0 && volumenNominalARS !== 0 && volumenNominalUSD !== 0);
                }
            })
            .map( ( [ company, data ], index ) => {
                const companyData         = data as CompanyData[];
                const tickerARS           = companyData.find((d) => d.moneda === '1')?.simbolo || '';
                const tickerUSD           = companyData.find((d) => d.moneda === '2')?.simbolo || '';
                const volumenNominalARS   = companyData.find((d) => d.moneda === '1')?.volumen || 0;
                const volumenNominalUSD   = companyData.find((d) => d.moneda === '2')?.volumen || 0;
                const ultimoPrecioARS     = companyData.find((d) => d.moneda === '1')?.ultimoPrecio || 0;
                const ultimoPrecioUSD     = companyData.find((d) => d.moneda === '2')?.ultimoPrecio || 0;
                const volumenARS          = Math.trunc(volumenNominalARS * ultimoPrecioARS);
                const volumenUSD          = Math.trunc(volumenNominalUSD * ultimoPrecioUSD);
                const compraARS           = companyData.find((d) => d.moneda === '1')?.puntas.precioCompra || 0;
                const ventaARS            = companyData.find((d) => d.moneda === '1')?.puntas.precioVenta  || 0;
                const compraUSD           = companyData.find((d) => d.moneda === '2')?.puntas.precioCompra || 0;
                const ventaUSD            = companyData.find((d) => d.moneda === '2')?.puntas.precioVenta  || 0;
                const tcCompra            = +(ventaARS / compraUSD).toFixed(2);
                const tcVenta             = +(compraARS / ventaUSD).toFixed(2);
                const tcCompraARS         = +(compraARS / compraUSD).toFixed(2);
                var rentabilidad        = 0;

                if (tcVenta > maxTCVenta) {
                    setMaxTCVenta(tcVenta);
                }
      
                return {
                    id: index,
                    instrumento: companyData[0].tipo,
                    empresa: company,
                    tickerARS,
                    tickerUSD,
                    volumenARS,
                    volumenUSD,
                    compraARS,
                    ventaARS,
                    compraUSD,
                    ventaUSD,
                    tcCompra,
                    tcVenta,
                    tcCompraARS,
                    rentabilidad
                };
            });
        
            setRows(newRows);

            for (const elemento of newRows) {
                //console.log('maxTCVenta: ' + maxTCVenta + ' - ' + elemento.empresa);
                elemento.rentabilidad = +(( ( maxTCVenta / elemento.tcCompra) - 1 ) * 100).toFixed(2);
            }
            console.log(maxTCVenta);
            if (maxTCVenta !== 0) {
                setIsLoading( false );
            }
    }, [
        jsonData, maxTCVenta
    ]);

    return (
        <>
            <Card 
                elevation={3}
                //variant="outlined"
                //style={{ maxWidth: '1340px' }} 
                sx={ { 
                    maxWidth: '1340px', 
                    borderRadius: '20px'
                } }
            >
                <CardHeader
                    //style={{ margin: '8px' }}
                    titleTypographyProps={{ variant: 'h4', fontSize: 16 }}
                    title = "COMPRA RÁPIDA"
                    subheaderTypographyProps={{ variant: 'h6', fontSize: 12 }}
                    subheader = "Mejores cotizaciones de compra"
                    sx= {{ 
                        paddingTop:'8px',
                        paddingLeft: '18px',
                        paddingBottom:'2px',
                }}
                    
                />
                <CardContent
                    sx={{
                        paddingTop: '2px',
                        height: '300px',
                    }}
                >
                <div style={{ width: '1300px', height:'300px' }}>
                    { isLoading ? (
                        <div style={{ textAlign: 'center', height:'100%', position: 'relative' }}>
                            <CircularProgress /> 
                        </div>
                    ) : (
                    <DataGrid
                        rows = { rows }
                        columns = { columns }
                        rowHeight = { 30 }
                        //padding = { 10 }
                        columnVisibilityModel={{
                            //tcVenta: false,
                            tcCompraARS: false, // Esto ocultará la columna 'tcComprasARS'
                        }}
                    /* sortModel = { [
                            {
                            field: 'tcCompra',
                            sort: 'asc', // Orden descendente
                            },
                        ] }*/
                        /*sx = { {
                            '& .MuiDataGrid-cell': {
                            fontSize: '0.875rem', // Tamaño de fuente más pequeño
                            padding: '0px', // Padding más pequeño
                            },
                            '& .MuiDataGrid-columnHeader': {
                            fontSize: '0.875rem', // Tamaño de fuente más pequeño
                            padding: '0px', // Padding más pequeño
                            },
                        } }*/
                        //pageSize={5}
                        //rowsPerPageOptions={[5]}
                        checkboxSelection = { false }
                        getRowClassName={(params) =>
                            params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd'
                        }
                        sx={{
                            /*'& .MuiDataGrid-rowHeaders': {
                                height: '5px', // Reduce el tamaño de la fuente de las cabeceras
                            },*/
                            '& .MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 'bold', // Pone en negrita los títulos de las cabeceras
                            },
                            '& .MuiDataGrid-columnHeader': {
                                //fontWeight: 'bold', // Pone en negrita los títulos de las cabeceras
                                maxHeight: '30px',
                            },
                            '& .MuiDataGrid-footerContainer': {
                                //fontWeight: 'bold', // Pone en negrita los títulos de las cabeceras
                                minHeight: '30px',
                            },
                        }}  
                    />
                )}
                    </div>
                </CardContent>
            </Card>
        </>
    );
};