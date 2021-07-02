import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detalleProductoAccion } from '../redux/tiendaDucks'
import { useParams } from 'react-router'
const ProductoDetalle = () => {
    console.log(useParams())
    const parametro = useParams().id
    console.log(parametro)
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchData = () =>{
            dispatch(detalleProductoAccion(parametro))
        }
        fetchData()
    },[dispatch, parametro])
        const detalle = useSelector(store => store.setProductos.detalle)
        console.log(detalle)
    return detalle ? (
        <div className='text-center'>
            <h3 className='mt-3 mb-3'>Detalle del Producto</h3>

            <div className="card mt-2 text-center container" >           
                <img src={detalle.imagen} className="card-img-top image-card" alt="..."/>
                <div className="card-body ">
                    <h5 className="card-title">{detalle.titulo}</h5>
                    <p className='container'>{detalle.descripcion}</p>
                    <p className="card-text">USD {detalle.precio}</p>
                   
                    <button className="btn btn-primary" style={{width: '200px'}}>Comprar</button>
                  
                   
                </div>
            </div>
        </div>
    ) : null
}  
export default ProductoDetalle
