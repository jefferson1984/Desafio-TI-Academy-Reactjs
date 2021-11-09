import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../../Config"

export const ListarItemPedido=()=>{

    const [data,setData]=useState([])
    const [status,setStatus]=useState({
        type:'',
        message:'',
        cor:''
    })


    const getItemPedido=async()=>{

        await axios.get(api+'/listar').then((response)=>{

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
        getItemPedido()
    },[])
    return(

        <div>
          <Container>
          <div className="p-2">
                {status.type==='error' ? <Alert color={status.cor}>{status.message}</Alert> : ""}
                
                </div>
               <div className="d-flex">
                   <div className="m-auto p-2">

                   <h1>Visualizar ItemPedido</h1>
                   </div>
                   <div className="p-2">

                      <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                      <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>
                      <Link to="/cadastrar-itempedidos" className="btn btn-outline-success btn btn-sm">Cadastrar</Link>
                   </div>
                  
                 
               </div>

               <Table striped>
  <thead>
    <tr>
      <th>
        PedidoId
      </th>
      <th>
        ServiçoId
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
       <Link to={"/pedidos-itempedido/"+dados.PedidoId} className="btn btn-outline-primary btn-sm">ItemPedidos</Link>
       

       
      </td>
    </tr>


      ))}
    
    
  </tbody>
</Table>


          </Container>

        </div>
    )
}