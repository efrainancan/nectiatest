import { useEffect, useState } from 'react';
import axios from '../../api/axios';
const USUARIOS='auth'
const ListadoUsuarios=(props)=>{
    const [items, setListItems] = useState([]); 
    const salir=()=>{
        window.location.reload()
    }
    const handleSubmit = async ()=>{
        
       try {
            let config = {headers: {'Authorization': 'Bearer ' + props.tkn}}
            const response = await axios.get(USUARIOS, config);
            setListItems(response?.data.sort(
                function(a,b){ return a.id - b.id; }
            ));             
       } catch (error) { console.error(error)
           
       }
    }
    useEffect(()=>{
        handleSubmit();        
    }, [])
return(
    <div className='listado'>
        <div>
        <button className='button is-danger is-light' onClick={()=>salir()}>
            SALIR</button>
            </div>
            <div className="border btn-l"></div>
            <div className="">
            <div className="table-container lista">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                                <th>Login</th>
                                <th>Nombre</th>
                                <th>Estado</th>
                               
                            </tr>
                        
                    </thead>
                    <tbody>
                    {
                        
                           Object.keys(items).map(key => {
                            return (
                            <tr >                                
                              <td> {items[key].id}</td>
                              <td> {items[key].login}</td>
                              <td> {items[key].nombre}</td>
                              <td> {items[key].estado.toString()}</td>                             
                            </tr>                            
                            )})
                        } 
                    </tbody>
                    </table>
                    </div>
            </div>
    </div>
)
}
export default ListadoUsuarios;