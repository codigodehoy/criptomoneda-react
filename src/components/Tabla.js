import { useEffect, useState } from "react";
import axios from 'axios';
import { Formulario } from "./Formulario";

const Tabla = () => {

  const [listaCrypto, actualizarListaCrypto] = useState([]);
  const [cryto, actualizarCryto] = useState([]);

  useEffect(() => {
    cargarCriptomoneda();    
  }, [cryto]);


  const cargarCriptomoneda = async() => {
    const res = await axios.get("/crypto");
    actualizarListaCrypto(res.data.criptomonedas);
  }


  return (
    <div>
      <h1 className="text-center font-black text-4xl mt-5 text-[#E7B61C]">App <span className='text-[#007ACC]'>Criptomonedas</span></h1>
      <div className='flex mt-12'>
        <Formulario actualizarCryto={actualizarCryto} cryto={cryto}/>
        <div className="md:w-1/2 lg:w-3/5 text-center">
          {listaCrypto && listaCrypto.length ? 
          <>

            <h2 className="font-black text-2xl text-center mb-4">Listado Criptomonedas</h2>
            <table className="table-auto m-auto">
              <thead>
                <tr className="bg-gray-50 border-b-4 text-slate-400">
                  <td className="px-16 border-">Nombre</td>
                  <td className="px-16 mb-4">Valor</td>
                </tr>
              </thead>
              <tbody>
              {
                listaCrypto &&
                listaCrypto.map(crypto => 
                  <tr key={crypto.id} className="bg-gray-50 mb-2">
                    <td >{crypto.nombre}</td> 
                    <td>{crypto.usd}</td>        
                  </tr>
              )
              }
              </tbody>
            </table>
          </>
          : <h2 className="font-black text-2xl text-center mb-4">No hay datos previos</h2>
        }
        </div>
        
      </div>
    </div>
  );
};

export default Tabla