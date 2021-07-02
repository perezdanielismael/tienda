import Tienda from './components/Tienda';
import ProductoDetalle from './components/ProductoDetalle';
import React from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import {auth} from './firebase'
import Perfil from './components/Perfil';

function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
          if(user){
              setFirebaseUser(user)
          }else{
              setFirebaseUser(null)
          }
      })
    } 
    fetchUser()
}, [])

  const RutaPrivada = ({component, path, ...rest}) =>{
    if(localStorage.getItem('usuario')){
      const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
      if(usuarioStorage.uid === firebaseUser.uid){
        return <Route component={component} path={path} {...rest}/>
      }else{
        return <Redirect to='/login' {...rest}/>
      }
    } else {
      return <Redirect to='/login' {...rest}/>
    }
  }
 
  return firebaseUser !== false ? (  
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route component={Login} path='/login' />
            <RutaPrivada component={Perfil} path='/perfil' exact/>
            <RutaPrivada component={ProductoDetalle} path='/:id' exact/>
            <RutaPrivada component={Tienda} path='/' exact/>
          </Switch>
        </div>
        
      </Router>
  ) : (<div>Cargando...</div>)
}

export default App;
