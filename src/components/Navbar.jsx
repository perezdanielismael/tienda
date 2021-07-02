import React from 'react'
import { NavLink } from 'react-router-dom'
import {cerrarSesion} from '../redux/usuariosDucks'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
const Navbar = (props) => {

    const dispatch = useDispatch()
    const ejecutar = ()=>{
        dispatch(cerrarSesion())
        props.history.push('/login')
    }
    const activo = useSelector(store => store.usuario.activo)
    return (
        <div className='navbar navbar-dark bg-dark'>
           <NavLink className='navbar-brand ms-5' to='/'>FakeStore</NavLink>
           <div className="d-flex">
            {
                activo === true ? (
                    <>
                    <NavLink className="btn btn-dark me-2" to='/' exact>Inicio</NavLink>
                    <NavLink className="btn btn-dark me-2" to='/perfil' exact>Perfil</NavLink>
                    <button 
                        onClick={()=>ejecutar()}
                        className='btn btn-danger me-5'>Cerrar Sesión
                    </button>
                    </>
                    
                ) : (
                    <NavLink className="btn btn-dark me-5" to='/login' exact>Login</NavLink>
                )
            }

           </div>
        </div>
    )
}

export default withRouter( Navbar)
