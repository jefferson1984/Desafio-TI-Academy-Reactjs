import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../../Config"

export const PedidosId=(props)=>{

    const [data,setData]=useState([])

    const [id]=useState(props.match.params.id)
    const [status,setStatus]=useState({
      type:'',
      message:'',
      
  })


  const getPedidos=async()=>{

    await axios.get(api+'/cliente/'+id+'/pedidos').then((response)=>{

        setData(response.data.ped)
       
        
    }).catch(()=>{

       
        setStatus({
          type:'error',
          message:'Não foi possível acessar Api'
        })
    })
  }
  
  

  const excluirPedido=async(idPedido)=>{

    const headers={

     'Content-Type':'application/json'
    }

    await axios.delete(api+'/excluir/pedido/'+idPedido,{headers}).then(()=>{

     setStatus({
       type:'success',
       message:'Pedido excluído com sucesso.'
     })
     getPedidos()
    }).catch(()=>{

     setStatus({
       type:'error',
       message:'Não foi possível acessar Api.'
     })
    })
 }
   
    
 useEffect(()=>{

  const getPedidos=async()=>{

    await axios.get(api+'/cliente/'+id+'/pedidos').then((response)=>{

        setData(response.data.ped)
       
        
    }).catch(()=>{

       
        setStatus({
          type:'error',
          message:'Não foi possível acessar Api'
        })
    })
  }
       
     getPedidos()
         
         
  },[id])


   
    

    
    return(

        <div>
            <Container>
            <div className="p-2">
          {status.type==='error' ? <Alert color="danger">{status.message}</Alert> : ""}
          {status.type==='success' ? <Alert color="success">{status.message}</Alert> : ""} 

          </div>
               <div className="d-flex">

                    <div className="m-auto p-2">
                    <h1>Visualizar Pedidos do Cliente</h1>
                    </div>
                    <div className="p-2">
                       
                    <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                    </div>
                    <div className="p-2">
                       
                    <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>
                    </div>

               </div>
               <Table striped>
  <thead>
    <tr>
      <th>
        ID
      </th>
      <th>
        Data do Pedido
      </th>
      <th>
       ClienteId
      </th>
      
      <th>
        Ações
      </th>
    </tr>
  </thead>
  <tbody>
      {data.map(ped=>(
            
      <tr key={ped.id}>
      <th scope="row" >
        {ped.id}
      </th>
      <td>
       {ped.data}
      </td>
      <td>
        {ped.ClienteId}
      </td>
      
      <td>
       <Link to={"/editar-pedido/"+ped.id} className="btn btn-outline-primary btn-sm">Editar</Link>
       <span className="btn btn-outline-danger btn-sm"  onClick={()=>excluirPedido(ped.id)}>Excluir</span>
      </td>
      
    </tr>


      ))}
    
    
  </tbody>
</Table>


          


          </Container>
        </div>
    )
}