import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../../Config"

export const ItemPedidoId=(props)=>{

    const [data,setData]=useState([])

    const [id]=useState(props.match.params.id)
    const [status,setStatus]=useState({
      type:'',
      message:'',
      
  })

  const getItemPedidos=async()=>{

    await axios.get(api+'/itempedido/'+id).then((response)=>{

        setData(response.data.dados)
       
        
    }).catch(()=>{

       
        setStatus({
          type:'error',
          message:'Não foi possível acessar Api'
        })
    })
  }

    const excluirItemPedido=async(idItemPedido)=>{

        const headers={
           'Content-Type':'application/json'

        
        }
     await axios.delete(api+'/excluir/'+idItemPedido,{headers}).then(()=>{

        setStatus({
            type:'success',
            message:'ItemPedido excluído com sucesso.'
          })
          getItemPedidos()
     }).catch(()=>{

        setStatus({
            type:'error',
            message:'Não foi possível acessar Api.'
          })
         
     })
         
    }
     

  useEffect(()=>{

    const getItemPedidos=async()=>{

        await axios.get(api+'/itempedido/'+id).then((response)=>{
    
            setData(response.data.dados)
           
            
        }).catch(()=>{
    
           
            setStatus({
              type:'error',
              message:'Não foi possível acessar Api'
            })
        })
      }

    getItemPedidos()
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

                   <h1>ItemPedidoID</h1>
                   </div>
                   <div className="p-2">

                      <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                      <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>
                      <Link to="/listar-itempedidos" className="btn btn-outline-success btn btn-sm">ItemPedidos</Link>
                   </div>
                  
                 
               </div>
               <Table striped>
  <thead>
    <tr>
      <th>
        PedidoId
      </th>
      <th>
        ServicoId
      </th>
      <th>
       Quantidade
      </th>
      
      <th>
       Valor
      </th>

      <th>
       Ações
      </th>
    </tr>
  </thead>
  <tbody>
      {data.map(dados=>(
            
      <tr key={dados.PedidoId}>
      <th scope="row" >
        {dados.PedidoId}
      </th>
      <td>
       {dados.ServicoId}
      </td>
      <td>
        {dados.quantidade}
      </td>

      <td>
        {dados.valor}
      </td>
      
      <td>
       <Link to={"/editar-itempedido/"+dados.ServicoId} className="btn btn-outline-primary btn-sm">Editar</Link>
       <span className="btn btn-outline-danger btn-sm" onClick={()=>excluirItemPedido(dados.ServicoId)} >Excluir</span>
      </td>
      
    </tr>


      ))}
    
    
  </tbody>
</Table>

          </Container>

        </div>
    )
}