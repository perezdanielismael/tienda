import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import productosReducer from './tiendaDucks'
import usuarioReducer, {leerUsuario} from './usuariosDucks'

const rootReducer = combineReducers({
    setProductos: productosReducer,
    usuario: usuarioReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    leerUsuario()(store.dispatch)
    return store
}