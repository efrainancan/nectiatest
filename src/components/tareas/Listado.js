import axios from '../../api/axios';
import { useEffect, useState } from 'react';

const TAREAS = '/tareas';

const Listado=(props)=>{
    const [items, setListItems] = useState([]); 
    const [editar,setEditar] = useState(false);
    const [keyItem,setKeyItem] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault();
       try {
            let config = {headers: {'Authorization': 'Bearer ' + props.tkens}}
            const response = await axios.get(TAREAS, config);
            setListItems(response?.data.sort(
                function(a,b){ return a.id - b.id; }
            ));             
       } catch (error) { console.error(error)
           
       }
    }
    const updateList= async ()=>{        
        try {
            let config = {headers: {'Authorization': 'Bearer ' + props.tkens}};
            const response = await axios.get(TAREAS,config);
            setListItems(response?.data.sort(
                function(a,b){ return a.id - b.id;}
            ));            
           } catch (error) { console.error(error)}              
    }
    const eliminarItem= async (item)=>{
        try {
            let config = {headers: {'Authorization': 'Bearer ' + props.tkens}};
            const response = await axios.delete(TAREAS+'/'+item, config);
            if(response?.data){updateList();}                  
        } catch (error) { console.error(error)
            
        }
    }
    const editarItem= (key)=>{
        try {  
            setKeyItem(key)          
            if(editar){setEditar(false)}
            else{setEditar(true)}
        } catch (error) { console.error(error)}
    }
    const enviarItem= async (data) =>{
        let req=data;
        let config = {headers: {'Authorization': 'Bearer ' + props.tkens}};
        await axios.put(TAREAS+'/'+req.id, req, config);        
        setEditar(false);
        updateList();         
    }
    useEffect(()=>{
        updateList();        
    }, [])
    
    return (
        <div>
            <div className='columns'>
                <div className='column'>
            <form onSubmit={handleSubmit}>
                <button className="button is-success is-light">ACTUALIZAR LISTADO DE TAREAS</button>
            
            </form>
            </div>
            </div>
            <div className="table-container lista">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                                <th>ASUNTO</th>
                                <th>PRIORIDAD</th>
                                <th>ASIGNADO</th>
                                <th>COMENTARIO</th>                            
                                <th>EDITAR</th>  
                                {editar===true &&
                                    <th>CANCELAR</th>
                                }                          
                                <th>ELIMINAR</th>
                            </tr>
                        
                    </thead>
                    <tbody>
                        {
                        editar===false &&  
                           Object.keys(items).map(key => {
                            return (
                            <tr >                                
                              <td> {items[key].id}</td>
                              <td> {items[key].asunto}</td>
                              <td> {items[key].prioridad}</td>
                              <td> {items[key].asignado}</td>
                              <td> {items[key].comentario}</td>   
                              <td>
                              <button className='button is-info is-light'
                                       onClick={() => editarItem(key)}>EDITAR</button>
                              </td>
                              <td><button className='button is-danger is-light' onClick={() => eliminarItem(items[key].id)}>ELIMINAR</button></td>
                            </tr>                            
                            )})
                        } 
                        {editar===true &&  
                              Object.keys(items).map(key => {
                                if(keyItem===key){
                                return (                        
                                <tr >                                
                                    <td> <input type="text" className='input' disabled value={items[key].id}/></td>
                                    <td><input type="text" className='input'
                                        onChange={(e) => {
                                            items[key].asunto= e.target.value;
                                            setListItems([...items]);
                                        }}
                                        value={items[key].asunto}/></td>
                                    <td>
                                        <div className="select is-primary">
                                            <select 
                                            onChange={(e) => {
                                                items[key].prioridad= e.target.value;
                                                setListItems([...items]);
                                            }}
                                            value={items[key].prioridad}>
                                                <option disabled selected value=""></option>
                                                <option value="Baja">Baja</option>
                                                <option value="Media">Media</option>
                                                <option value="Alta">Alta</option>
                                            </select>
                                        </div>
                                        </td>
                                    <td><input type="text" className='input' 
                                    onChange={(e) => {
                                        items[key].asignado= e.target.value;
                                        setListItems([...items]);
                                    }}
                                        value={items[key].asignado}/> </td>
                                    <td><input type="text" className='input' 
                                        onChange={(e) => {
                                            items[key].comentario= e.target.value;
                                            setListItems([...items]);
                                        }}
                                        value={items[key].comentario}/></td>                                   
                                    <td><button className='button is-primary'
                                        onClick={() => enviarItem(items[key])}>ENVIAR CAMBIOS</button></td>
                                    <td>
                                    <button className='button is-light' 
                                        onClick={() => editarItem(0)}>CANCELAR</button>
                                    </td>
                                    <td>
                                        <button className='button is-danger is-light' 
                                        onClick={() => eliminarItem(items[key].id)}>ELIMINAR</button></td>
                                </tr>                               
                                )
                              }
                            })

                        }
                    </tbody>                    
                </table>
                
            </div>
        </div>
    )
}
export default Listado