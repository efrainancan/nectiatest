import { useState } from 'react';
import './components.scss';
import axios from './../api/axios';
import Tareas from './tareas/Tareas';
import ListadoUsuarios from './usuarios/ListadoUsuarios';
const LOGIN_URL = '/auth/login';

const Login = () => {    
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');  
    const [token, setToken] = useState('');  
    const [verUsuario, setVerUsuario] = useState(false); 
    const verUsuarios=()=>{
        setVerUsuario(true)       
    }   
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let login = usuario;
            const response = await axios.post(LOGIN_URL,
            JSON.stringify({ login, password }),
            {headers: { 'Content-Type': 'application/json' }}            
        );
        
        setToken(response?.data?.token)        
        } catch (error) { console.error(error)}
    }    
    return (        
        <section>
            {token==='' &&  
            <div className='columns'>
            <div className='column'></div>
            <div className='column login'>
                <form onSubmit={handleSubmit}>
                    <div className='title'>LOGIN NECTIA</div>
                    <label>Usuario: </label>
                    <input type="text" id="username"
                        className='input'
                        required
                        onChange={(e) => setUsuario(e.target.value)}
                        value={usuario}
                    />
                    <label>Contraseña: </label>
                    <input type="password" id="pass"
                        className='input'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <button className='button is-success btn-l'>INGRESAR</button>
                    {token}
                </form>
            </div>
            <div className='column'></div>      
            </div>      
            }{token!=='' && verUsuario===false&& 
                <div>
                    <Tareas tkn={token}></Tareas>
                </div>
            }{
                token!==''&& verUsuario===false &&
                <button className='button is-success btn-l'
                        onClick={()=>verUsuarios()}
                        >VER LISTA DE USUARIOS</button>
            }
            {
                token!==''&& verUsuario===true &&
                <ListadoUsuarios tkn={token}></ListadoUsuarios>
            }
        </section>
    )
}

export default Login
