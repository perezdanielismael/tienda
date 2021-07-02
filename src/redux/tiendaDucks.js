import axios from 'axios'

//Constantes
    const dataInicial = {
        array:[]
    }
//Types
   const OBTENER_PRODUCTOS = 'OBTENER_PRODUCTOS'
   const DETALLE_PRODUCTO = 'DETALLE_PRODUCTO'
   const CATEGORIA_PRODUCTO = 'CATEGORIA_PRODUCTO'
//Reducer
    export default function productosReducer(state = dataInicial, action){
        switch (action.type) {
            case OBTENER_PRODUCTOS:
                
                return {...state, array: action.payload};
            
            case DETALLE_PRODUCTO:

                return {...state, detalle: action.payload};

            case CATEGORIA_PRODUCTO:
                return {...state, array: action.payload}    
            default:
                return state;
        }
    }
//Accciones
export const categoriaAccion = (value = 'electronics') => async(dispatch, getState) =>{
    if(localStorage.getItem('categoria')){
        dispatch({
            type: CATEGORIA_PRODUCTO,
            payload: JSON.parse(localStorage.getItem('categoria'))
        })
    }
    const res = await axios.get(`https://fakestoreapi.com/products/category/${value}`)
    localStorage.setItem('categoria', JSON.stringify(res.data))
    dispatch({
        type: CATEGORIA_PRODUCTO,
        payload: res.data
    })
}

export const detalleProductoAccion = (id = 1) => async (dispatch)=>{
        if(localStorage.getItem(id)){
            dispatch({
                type: DETALLE_PRODUCTO,
                payload: JSON.parse(localStorage.getItem(id))
            })
            return
        }
    try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
        console.log(res)
        dispatch({
            type: DETALLE_PRODUCTO,
            payload: {
                imagen: res.data.image,
                categoria: res.data.category,
                titulo: res.data.title,
                descripcion: res.data.description,
                precio: res.data.price
            }
        })
        localStorage.setItem(id, JSON.stringify(
            {
                imagen: res.data.image,
                categoria: res.data.category,
                titulo: res.data.title,
                descripcion: res.data.description,
                precio: res.data.price
            }
        ))
    } catch (error) {
        console.log(error)
    }
}


export const obtenerProductosAccion = ()=>async(dispatch)=>{
    
    if(localStorage.getItem('products')){
        dispatch({
            type: OBTENER_PRODUCTOS,
            payload: JSON.parse(localStorage.getItem('products'))
        })  
        return
    } 

    try {
    const res = await axios.get('https://fakestoreapi.com/products')
    dispatch({
        type: OBTENER_PRODUCTOS,
        payload: res.data
    }) 
    localStorage.setItem('products', JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
    
}