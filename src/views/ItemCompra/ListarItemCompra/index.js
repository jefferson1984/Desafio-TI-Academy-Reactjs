import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../../Config"

export const ListarItemCompra =()=>{
 
    const [data,setData]=useState([])
    const [status,setStatus]=useState({
        type:'',
        message:'',
        
    })

    const getItemCompra=async()=>{

        await axios.get(api+'/listar/compra').then((response)=>{

            setData(response.data.dados)
        }).catch(()=>{

            setStatus({
                type:'error',
                message:'Não foi possível acessar Api.',
                cor:'danger'
            })
        })
    }

    useEffect(()=>{
        getItemCompra()
    },[])

    return(

        <div>
          <Container>
          <div className="p-2">
                {status.type==='error' ? <Alert color="danger">{status.message}</Alert> : ""}
                
                </div>
               <div className="d-flex">
                   <div className="m-auto p-2">

                   <h1>Listar ItemCompra</h1>
                   </div>
                   <div className="p-2">
                   <Link to="/cadastrar-itemcompras" className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                      <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                      <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>
                      <Link to="/listar-itempedidos" className="btn btn-outline-success btn btn-sm">ItemPedidos</Link>
                      <Link to="/listar-servicos" className="btn btn-outline-success btn btn-sm">Servicos</Link>
                      <Link to="/listar-compras" className="btn btn-outline-success btn btn-sm">Compras</Link>
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
       <Link to={"/compra-itemcompra/"+dados.CompraId} className="btn btn-outline-primary btn-sm">ItemPedidos</Link>
       

       
      </td>
    </tr>


      ))}
    
    
  </tbody>
</Table>



          </Container>

        </div>
    )
}