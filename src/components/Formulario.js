import React, {useState} from 'react';
import axios from 'axios';

// import Tabla from './Tabla';
export const Formulario = ({actualizarCryto, cryto}) => {

  const id = Date.now();

  const [criptomoneda, actulizarCriptomoneda] = useState({
    nombre: "",
    usd: ""
  });
 
  const [error, actualizarError] = useState(false);

  const actualizarState = (e) => {
    const {name, value} = e.target;
    actulizarCriptomoneda({
      ...criptomoneda,
      [name]: value
    });
  }

  const clear = () => {
    actulizarCriptomoneda({
      nombre: "",
      usd: ""
    });
  }
  
  const {nombre, usd} = criptomoneda;


  const handleSubmit = (e) => {
    e.preventDefault();
    if(nombre.trim() == "" || usd.trim() == "") {
      actualizarError(true)
      return
    }
    // Eliminar el mensaje previo
    actualizarError(false)

    // insertar id a la criptomoneda
    criptomoneda.id = id.toString();

    actualizarCryto([...cryto, criptomoneda])

    axios.post('/crypto', {      
      data: criptomoneda
    }).then(console.log);   
    
    // Reiniciar el form
    actulizarCriptomoneda({
      nombre: "",
      usd: ""
    });

  }

  return (
    
        <div className='md:w-1/2 lg:w-2/5'>
          <h2 className='font-black text-2xl text-center mb-4'>Registro Criptomonedas</h2>
          <form className='bg-white shadow-md mx-5 rounded-lg py-14 px-5 text-center'>
          
            <input type="text" 
              name="nombre" 
              value={nombre} 
              onChange={actualizarState}
              placeholder='Nombre Criptomoneda'
              className='border-2 w-full py-1 mb-5 outline-slate-300  bg-slate-200 placeholder-gray-400 rounded-md pl-2'
              />
            <input type="number" 
              name="usd" 
              min={1}
              value={usd} 
              onChange={actualizarState}
              placeholder='Valor Criptomoneda $'
              className='border-2 w-full py-1 mb-5 focus:outline-slate-300 bg-slate-200 placeholder-gray-400 rounded-md pl-2'
              />
             
            <button type="submit" 
              onClick={handleSubmit}
              className='bg-[#007ACC] text-white px-8 py-2 hover:bg-[#0027C3]'
              >
                Enviar
            </button>
            <button type="reset" 
              onClick={clear}
              className='bg-[#909090] text-white px-8 py-2 mx-4 hover:bg-[#B6B6B6]'
              >
                Borrar
            </button>
              {error ? <p className="text-red-500 text-xl mt-6">Los campos son obligatorios</p>: ""}    
          </form>
        </div>
       
  )
};
