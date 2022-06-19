import { useState } from 'react';
import Crear from './Crear';
import Listado from './Listado'

function Tareas(props){
    

    
    return (
        <section>
            
            <div className='columns ingreso-tareas'>
                <div className='column is-one-quarter-tablet'>
                    <Crear tkn={props.tkn}></Crear>
                    </div>        
                <div className='column listado'><Listado tkens={props.tkn}></Listado></div>                    
            </div>
            
        </section>
    )
}
export default Tareas
