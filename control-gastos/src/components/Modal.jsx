import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({ 
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGastos, 
    gastoEditar,
    setGastoEditar
}) => {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    const [mensaje, setmensaje] = useState('')

    useEffect(()=>{
        if ( Object.keys(gastoEditar).length > 0 ) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [])

    const handleOcultarModal = () => {
        setGastoEditar({})
        
        setAnimarModal(false)

        setTimeout(()=>{
            setModal(false)
        }, 500)
    }

    const handleSubmit = e => {
        e.preventDefault()

        if([ nombre, cantidad, categoria].includes('')) {
            setmensaje('Todos los campos son obligatorios.')

            setTimeout(()=>{
                setmensaje('')
            }, 3000)

            return
        }
        guardarGastos({ nombre, cantidad, categoria, id, fecha })
    }

    

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarBtn} 
                    alt="Cerrar" 
                    onClick={handleOcultarModal}
                />
            </div>
            <form 
                className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
                onSubmit={handleSubmit}
            >
                <legend>{ gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input 
                        type="text"
                        placeholder='Añade el nombre del gasto'
                        id="nombre"
                        value={nombre}
                        onChange={ e => setNombre(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                        type="number"
                        placeholder='Añade la cantidad del gasto'
                        id="cantidad"
                        value={cantidad}
                        onChange={ e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="categoria">Categoría</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={ e => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione una categoría</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input 
                    type="submit"
                    value={ gastoEditar.nombre ? 'Guardar cambios' : 'Añadir Gasto'}
                 />
            </form>
        </div>
    )
}

export default Modal
