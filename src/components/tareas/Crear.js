import axios from '../../api/axios';
import { useState } from 'react';
const TAREAS = '/tareas';
function Crear(props){
    const [asunto, setAsunto] = useState('');
    const [prioridad, setPrioridad] = useState('');
    const [comentario, setComentario] = useState('');
    const [asignado, setAsignado] = useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            let data={
                asunto:asunto,
                prioridad:prioridad,
                comentario:comentario,
                asignado:asignado
            }
            let config = {headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + props.tkn}}
            const response = await axios.post(TAREAS,data, config);                
        } catch (error) { console.error(error)}
    }
    return (
        <div className="field tareas">
            <form onSubmit={handleSubmit}>
            <div className="title">Creación de tareas</div>
            <label className="label">Asunto</label>
            <div className="control">
                <input id="asunto" name="asunto" className="input" type="text" placeholder="Ej. Soporte telefonía"
                    value={asunto} onChange={(e) => setAsunto(e.target.value)}
                /></div>            
            <label className="label">Prioridad</label>
            
            <div className="select is-primary">
                <select id="prioridad" name="prioridad" value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                    <option disabled selected value=""></option>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                </select>
            </div>
            <label className="label">Usuario</label>
            <div className="select is-primary">
                <select id="asignado" name="asignado" value={asignado} onChange={(e) => setAsignado(e.target.value)}>
                    <option disabled selected value=""></option>
                    <option value="User1">User1</option>
                    <option value="User2">User2</option>                    
                </select>
            </div>
                
            <label className="label">Comentario</label>
            <div className="control">
            <textarea id="comentario" name="comentario" value={comentario} onChange={(e) => setComentario(e.target.value)}
                className="textarea is-primary" placeholder="Comentarios"></textarea>
                </div>
                <div className="control">
                    <button className="button is-success is-light btn-l">ENVIAR TAREA</button>
                </div>
                </form>
        </div>
    )
}
export default Crear