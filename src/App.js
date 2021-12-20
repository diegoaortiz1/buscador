import './App.css';
import {useEffect, useState} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {    
   const [usuarios, setUsuarios]= useState([]);
   const [tablausarios, setTablausarios]= useState([]);
   const [busqueda, setBusqueda]= useState([]);

  const peticionesGet=async()=>{
    await axios.get("https://jsonplaceholder.typicode.com/todos/")
    .then(response=>{
      setUsuarios(response.data);
      setTablausarios(response.data);
    }).catch(error=>{
      console.log(error)
    })
  }
  
  const handleChange=e=>{
    setBusqueda(e.target.value); 
    filtrar(e.target.value)
  }

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusquedad=tablausarios.filter((elemento)=>{
      if(elemento.id.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
      || elemento.title.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
      ){
        return elemento;
      }
    });
    setUsuarios(resultadosBusquedad);
  }
 
  useEffect(()=>{
    peticionesGet();
  },[])

   return(
     <div className="App">
       <div className="containerInput">
         <input 
            className="form-control inputBuscar"
            value={busqueda}
            placeholder="busqueda por id o title"
            onChange={handleChange}
         />
        <button className="btn btn-success">
          <FontAwesomeIcon icon={faSearch}/>
        </button>
       </div>
       <div className="table-responsive">
         <table className="table table-sm table-bordered">
            <thead>
              <tr>
                <th>id</th>
                <th>title</th>
              </tr>
            </thead>

            <tbody>
              {usuarios &&
              usuarios.map((usuario)=>(
                 <tr key={usuario.id}>
                   <td>{usuario.id}</td>
                   <td>{usuario.title}</td>

                 </tr>
              ))}
            </tbody>
         </table>
       </div>
     </div>
   )

}

export default App;
