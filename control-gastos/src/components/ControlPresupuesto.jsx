import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({ presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto }) => {

    const[porcentaje, setPorcentaje] = useState(0)
    const[disponible, setDisponible] = useState(0)
    const[gastado, setGastado] = useState(0)
    
    useEffect(()=>{
        const totalGastado = gastos.reduce((total, gasto)=> gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado

        //Calcular porcentaje gastado
        const porcentaje = (( presupuesto - totalDisponible ) / presupuesto ) * 100;

        setGastado(totalGastado)
        setDisponible(totalDisponible)

        setTimeout(()=> {
            setPorcentaje(porcentaje)
        }, 1500)
    },[gastos])
    
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString(
            'en-US', {
                style: 'currency',
                currency: 'USD'
            }
        )
    }

    const handleResetApp = ()=>{
        const resultado = confirm('¿Deseas reiniciar la aplicación?')

        if(resultado) {
            setGastos([])
            setPresupuesto([])
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar 
                    value={porcentaje}
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    text={`${porcentaje.toFixed(2)}% Gastado`}
                />
            </div>
            <div>
                <div className='contenido-presupuesto'>
                    <button
                        className='reset-app'
                        type='button'
                        onClick={handleResetApp}
                    >
                        Resetear App
                    </button>
                    <p>
                        <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                    </p>
                    <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                        <span>Disponible: </span> {formatearCantidad(disponible)}
                    </p>
                    <p>
                        <span>Gastado: </span> {formatearCantidad(gastado)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ControlPresupuesto
