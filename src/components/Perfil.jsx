import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {actualizarNombre, cambiarImagen} from '../redux/usuariosDucks'
const Perfil = () => {

    const usuario = useSelector(store => store.usuario.user)
    const loading = useSelector(store => store.usuario.loading)

    const [nombreUsuario, setNombreUsuario] = React.useState(usuario.displayName)
    const [formulario, setFormulario] = React.useState(false)
    const [error, setError] = React.useState(false)
    const dispatch = useDispatch()
    
    const actualizarUsuario = ()=>{
        if(!nombreUsuario.trim()){
            console.log('El usuario está vacío')
        }
        if(nombreUsuario.length <= 5){
            console.log('El nombre debe tener al menos 6 carácteres')
        }
       dispatch(actualizarNombre(nombreUsuario))
       setFormulario(false)
    }

    const seleccionarArchivo = (imagen) =>{
        const imagenCliente = imagen.target.files[0]
        if(imagenCliente === undefined){
            console.log('No selecciono ninguna imagen')
            return
        }
        if(imagenCliente.type === 'image/png' || imagenCliente.type === 'image/jpg' ){
            dispatch(cambiarImagen(imagenCliente))
            setError(false)
        }else{
            setError(true)
        }
    }

    return (
        <div className='mt-5 text-center'>
            <div className="card">
                <div className="card-body">
                    <img className='mb-2 img-fluid' src={usuario.photoURL} alt="" style= {{width:'100px', borderRadius: '50px'}}/>
                    <h5 className="card-title">Nombre: {usuario.displayName}</h5>
                    <p className="card-text">Email: {usuario.email}</p>
                    <button 
                    className="btn btn-dark"
                    onClick={()=>setFormulario(true)}
                    >Editar Nombre</button>

                    <div className='d-flex justify-content-center'>
                       {
                            error &&
                            <div className="alert alert-warning mt-4 "  style={{width:'300px'}}>
                                Sólo se permiten formato png o jpg.
                            </div>
                        }
                    </div> 
                    <div className="input-group mb-3 justify-content-center">
                        <input 
                            type="file" 
                            className="form-control" 
                            id="inputGroupFile02"
                            style={{display:'none'}}
                            onChange={(e)=>seleccionarArchivo(e)}
                            disabled={loading}
                        />
                        
                        <label 
                            className={loading ? "btn btn-dark rounded-start mt-2 disabled" : "btn btn-dark rounded-start mt-2"} 
                            htmlFor="inputGroupFile02"
                        >
                            Actualizar Imagen
                        </label>
                    </div>
                
                </div>
                
                {
                    loading && 
                    <div className="card-body">
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Actualizando...</span>
                            </div>
                        </div>
                    </div>
                }

                {
                    formulario && 
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <div className="col-md-5">
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={nombreUsuario}
                                        onChange={(e) => setNombreUsuario(e.target.value)}
                                    />
                                    <button 
                                    className="btn btn-dark" 
                                    type="button" 
                                    onClick={()=>actualizarUsuario()}
                                    >
                                        Actualizar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                
            </div>
        </div>
    )
}

export default Perfil
