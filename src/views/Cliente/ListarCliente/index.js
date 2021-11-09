import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import {api} from '../../../Config/index'
export const ListarCliente=()=>{

 const [data,setData]=useState([])
 const [status,setStatus]=useState({
     type:'',
     message:'',
     cor:''
 })

 const getClientes=async()=>{

    await axios.get(api+'/clientes').then((response)=>{

         console.log(response.data.dados)
         setData(response.data.dados)
    }).catch(()=>{
          setStatus({
              type:'error',
              message:'Não foi possível acessar Api.',
              cor:'danger'
          })
        
    })

    
 }

 const excluirCliente=async(idCliente)=>{

    const headers={
        'Content-Type':'application/json'
    }

    await axios.delete(api+'/excluircliente/'+idCliente,{headers}).then(()=>{

        setStatus({
            type:'success',
            message:'cliente excluído com sucesso.'
        })
        getClientes()
    }).catch(()=>{

        setStatus({
            type:'error',
            message:'Não foi possível acessar Api.'
        })
    })
 }

 useEffect(()=>{
    getClientes()
},[])
    return(

        <div>
            <Container>
                <div className="p-2">
                {status.type==='error' ? <Alert color={status.cor}>{status.message}</Alert> : ""}
                
                </div>
               <div className="d-flex">
               
                    <div className="m-auto p-2">
                    <h1>Visualizar Clientes</h1>
                    </div>
                    <div className="p-2">
                    <Link to={"/cadastrar-cliente"} className="btn btn-outline-success btn-sm">Cadastrar</Link>
                    </div>
               </div>
               <Table striped>
  <thead>
    <tr>
      <th>
        ID
      </th>
      <th>
        Nome
      </th>
      <th>
       Data de Nascimento
      </th>
      <th>
       Cliente Desde
      </th>
      <th>
        Ações
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
       {dados.nome}
      </td>
      <td>
        {dados.nascimento}
      </td>
      <td>
        {dados.clienteDesde}
      </td>
      <td>
       <Link to={"/pedidos-cliente/"+dados.id} className="btn btn-outline-primary btn-sm">Pedidos</Link>
       <Link to={"/editar-cliente/"+dados.id} className="btn btn-outline-primary btn-sm">Editar</Link>
       <Link to={"/compras-cliente/"+dados.id} className="btn btn-outline-primary btn-sm">Compras</Link>

       <span  className="btn btn-outline-danger btn-sm" onClick={()=>excluirCliente(dados.id)}  >Excluir</span>
      </td>
    </tr>


      ))}
    
    
  </tbody>
</Table>

            </Container>
         

        </div>
    )
}