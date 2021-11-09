import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../../Config"

export const ListarCompras=()=>{

    const [data,setData]=useState([])
    const [status,setStatus]=useState({
      type:'',
      message:''
    })
   
    const getCompras=async()=>{

        await axios.get(api+'/listarcompras').then((response)=>{
   
         setData(response.data.dados)
        }).catch(()=>{
   
            setStatus({
              type:'error',
              message:'Não foi possível acessar Api.'
            })
        })
      }

      useEffect(()=>{

        getCompras()
      },[])


    return(

        <div>
          <Container>
          <div className="p-2">
                {status.type==='error' ? <Alert color="danger">{status.message}</Alert> : ""}
                </div>

               <div className="d-flex">
                   <div className="m-auto p-2">

                   <h1>Listar Compras</h1>
                   </div>
                   <div className="p-2">

                      <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                      <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>
                      <Link to="/listar-itempedidos" className="btn btn-outline-success btn btn-sm">ItemPedidos</Link>
                      <Link to="/listar-servicos" className="btn btn-outline-success btn btn-sm">Servicos</Link>
                   </div>
                  
                 
               </div>

               <Table striped>
  <thead>
    <tr>
      <th>
        ID
      </th>
      <th>
        Data
      </th>
      <th>
     ClienteId
      </th>
     
     
    </tr>
  </thead>
  <tbody>
      {data.map(dados=>(
            
      <tr key={dados.id}>
      <th scope="row" >
        {dados.id}
      </th>
      <td>
       {dados.data}
      </td>
      <td>
        {dados.ClienteId}
      </td>
     
      
    </tr>


      ))}
    
    
  </tbody>
</Table>


          </Container>

        </div>
    )
}