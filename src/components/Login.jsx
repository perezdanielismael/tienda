import React from 'react'
import {ingresoUsuario} from '../redux/usuariosDucks'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import g from '../assets/g.png'
import logo from '../assets/logo.png'
import './Login.css'
const Login = (props) => {
    
    const dispatch = useDispatch()
    const loading = useSelector(store => store.usuario.loading)
    const activo = useSelector(store => store.usuario.activo)

    React.useEffect(()=>{
        if(activo){
            props.history.push('/')
        }
    },[activo, props.history])

    return (
        <div className='text-center'>
            <img className='logo' src={logo} alt="Logo de Fake Store" />
            <h3 className='mt-3'>Ingresar a FakeStore</h3>
            
            <button 
            onClick={()=>dispatch(ingresoUsuario())}
            disabled={loading}
            className="btn btn-dark mt-4 botonIngreso"
            >
                <img className='g float-start' src={g} alt="" />
               <p className='texto'>Ingresar con Google</p> 
            </button>
        </div>
    )
}

export default withRouter(Login) 
