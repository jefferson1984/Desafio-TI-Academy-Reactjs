import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../../Config"

export const ListarServico=()=>{

    const [data,setData]=useState([])
    const [status,setStatus]=useState({
      type:'',
      message:''
    })

    const getServico=async()=>{

        await axios.get(api+'/listarservicos').then((response)=>{
   
         setData(response.data.dados)
        }).catch(()=>{
   
            setStatus({
              type:'error',
              message:'Não foi possível acessar Api.'
            })
        })
      }

      const excluirServico=async(idServico)=>{

        const headers={
            'Content-Type':'application/json'
        }

        await axios.delete(api+'/excluirservico/'+idServico,{headers}).then(()=>{

            setStatus({
                type:'success',
                message:'Serviço excluido com sucesso.'
              })
              getServico()
        }).catch(()=>{
                  
            setStatus({
                type:'error',
                message:'Não foi possivel acessar Api.'
              })

        })
      }

      useEffect(()=>{

        getServico()
      },[])

    return(

        <div>
          <Container>
          <div className="p-2">
                {status.type==='error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type==='success' ? <Alert color="success">{status.message}</Alert> : ""}
                </div>

               <div className="d-flex">
                   <div className="m-auto p-2">

                   <h1>Visualizar Servicos</h1>
                   </div>
                   <div className="p-2">
                   <Link to="/cadastrar-servico" className="btn btn-outline-primary btn btn-sm">Cadastrar</Link>
                      <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                      <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>
                      <Link to="/listar-itempedidos" className="btn btn-outline-success btn btn-sm">ItemPedidos</Link>
                      
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
     Descrição
      </th>
      <th>
    Açôes
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
       {dados.descricao}
      </td>
      
      <td>
      <Link to={"/editar-servico"+dados.id} className="btn btn-outline-success btn-sm">Editar</Link>
      <span   className="btn btn-outline-danger btn-sm"    onClick={()=>excluirServico(dados.id)}>Excluir</span>
      </td>
      
    </tr>


      ))}
    
    
  </tbody>
</Table>
          

          </Container>

        </div>
    )
}