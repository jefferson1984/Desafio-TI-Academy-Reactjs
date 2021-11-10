import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../../Config"

export const ItemCompraId=(props)=>{


    const [data,setData]=useState([])

    const [id]=useState(props.match.params.id)
    const [status,setStatus]=useState({
      type:'',
      message:'',
      
  })

  const getItemCompra=async()=>{

    await axios.get(api+'/itemcompra/'+id).then((response)=>{

        setData(response.data.dados)
       
        
    }).catch(()=>{

       
        setStatus({
          type:'error',
          message:'Não foi possível acessar Api'
        })
    })
  }


  const excluirItemCompra=async(idItemCompra)=>{

    const headers={
       'Content-Type':'application/json'

    
    }
 await axios.delete(api+'/excluircompra/'+idItemCompra,{headers}).then(()=>{

    setStatus({
        type:'success',
        message:'ItemCompra excluído com sucesso.'
      })
      getItemCompra()
 }).catch(()=>{

    setStatus({
        type:'error',
        message:'Não foi possível acessar Api.'
      })
     
 })
     
}


  useEffect(()=>{

    const getItemCompra=async()=>{

        await axios.get(api+'/itemcompra/'+id).then((response)=>{
    
            setData(response.data.dados)
           
            
        }).catch(()=>{
    
           
            setStatus({
              type:'error',
              message:'Não foi possível acessar Api'
            })
        })
      }

    getItemCompra()
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

                   <h1> ID ItemCompra </h1>
                   </div>
                   <div className="p-2">

                      <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                      <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>
                      <Link to="/listar-itempedidos" className="btn btn-outline-success btn btn-sm">ItemPedidos</Link>
                      <Link to="/listar-servicos" className="btn btn-outline-success btn btn-sm">Servicos</Link>
                      <Link to="/listar-compras" className="btn btn-outline-success btn btn-sm">Compras</Link>
                      <Link to="/listar-itemcompras" className="btn btn-outline-success btn btn-sm">ItemCompras</Link>
                   </div>
                  
                 
               </div>

               <Table striped>
  <thead>
    <tr>
      <th>
        CompraId
      </th>
      <th>
        ProdutoId
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
            
      <tr key={dados.CompraId}>
      <th scope="row" >
        {dados.CompraId}
      </th>
      <td>
       {dados.ProdutoId}
      </td>
      <td>
        {dados.quantidade}
      </td>

      <td>
        {dados.valor}
      </td>
      
      <td>
       <Link to={"/editar-itemcompra/"+dados.ProdutoId} className="btn btn-outline-primary btn-sm">Editar</Link>
       <span className="btn btn-outline-danger btn-sm" onClick={()=>excluirItemCompra(dados.ProdutoId)}  >Excluir</span>
      </td>
      
    </tr>


      ))}
    
    
  </tbody>
</Table>


          </Container>

        </div>
    )
}