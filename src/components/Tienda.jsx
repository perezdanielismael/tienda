import {React, useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { detalleProductoAccion, obtenerProductosAccion, categoriaAccion} from '../redux/tiendaDucks'
import './Tienda.css'


const Tienda = () => {
    const [valor, setValor] = useState('electronics')
    const dispatch = useDispatch()
    const productos = useSelector(store=>store.setProductos.array)
    const usuario = useSelector(store => store.usuario.user)
    
    useEffect(()=>{
        const fetchData = () =>{
            dispatch(obtenerProductosAccion())
        }
        fetchData()
    },[dispatch])


    return (
        <div className='container'>
            <h1 className='container mt-3 mb-5 text-center'>Bienvenid@! {usuario.displayName}</h1>
           
            <div className='d-flex container'>
                <select className="form-select mb-3" 
                        onChange={(e)=>setValor(e.target.value)}
                        aria-label="Default select example"
                        defaultValue='defecto'
                >
                    <option value='defecto'>Seleccione una Categoría</option>
                    <option value="men's clothing">Ropa de Hombre</option>
                    <option value="women's clothing">Ropa de Mujer</option>
                    <option value="jewelery">Joyas</option>
                    <option value="electronics">Electrónica</option>
                    
                </select>
                <button 
                onClick={()=>dispatch(categoriaAccion(valor))}
                className="btn btn-primary ms-2 mb-3">Buscar</button>
            </div>
        
        <div className='container d-flex flex-wrap justify-content-between'>
            {
                productos.map(item => (
                    <div className="card mt-2 tarjeta " key={item.id} >
                        
                        <img src={item.image} className="card-img-top image-card" alt="..."/>
                        
                      
                        <div className="card-body escritura ">
                        <h6 className="card-title">{item.title}</h6>
                        <p className="card-text">USD {item.price}</p>
                        <a href={`/${item.id}`}onClick={()=>dispatch(detalleProductoAccion(item.id))} className="btn btn-primary">Detalle del Producto</a>
                        </div>
                    </div>
                ))
            }


        </div>

            
        </div>
    )
}

export default Tienda
