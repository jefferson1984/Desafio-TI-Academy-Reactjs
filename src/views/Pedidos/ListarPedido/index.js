import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../../Config"

export const ListarPedido=()=>{

 const [data,setData]=useState([])
 const [status,setStatus]=useState({
   type:'',
   message:''
 })

   const getPedidos=async()=>{

     await axios.get(api+'/listarpedidos').then((response)=>{

      setData(response.data.dados)
     }).catch(()=>{

         setStatus({
           type:'error',
           message:'Não foi possível acessar Api.'
         })
     })
   }

   

   useEffect(()=>{

     getPedidos()
   },[])
    return(

        <div>
          <Container>
          <div className="p-2">
                {status.type==='error' ? <Alert color={status.cor}>{status.message}</Alert> : ""}
                </div>
              
              <div className="d-flex">

                  <div className="m-auto p-2">
                   
                  <h1>Visualizar Pedidos</h1>
                      
                  </div>
                  <div className="p-2">

                  <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                  <Link to="/cadastrar-pedido" className="btn btn-outline-success btn-sm">Cadastrar</Link>
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