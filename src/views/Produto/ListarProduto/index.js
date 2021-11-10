import axios from "axios"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react/cjs/react.development"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../../Config"

export const ListarProduto=()=>{
   

    const [data,setData]=useState([])
    const [status,setStatus]=useState({
      type:'',
      message:''
    })

    const getProduto=async()=>{

        await axios.get(api+'/listarprodutos').then((response)=>{
   
         setData(response.data.dados)
        }).catch(()=>{
   
            setStatus({
              type:'error',
              message:'Não foi possível acessar Api.'
            })
        })
      }

      const excluirProduto=async(idProduto)=>{

        const headers={
            'Content-Type':'application/json'
        }

        await axios.delete(api+'/excluirproduto/'+idProduto,{headers}).then(()=>{

            setStatus({
                type:'success',
                message:'Produto excluido com sucesso.'
              })
              getProduto()
        }).catch(()=>{
                  
            setStatus({
                type:'error',
                message:'Não foi possivel acessar Api.'
              })

        })
      }

      useEffect(()=>{

        getProduto()
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

                   <h1>Visualizar Produtos</h1>
                   </div>
                   <div className="p-2">
                   <Link to="/cadastrar-produto" className="btn btn-outline-primary btn-sm">Cadastrar</Link>
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
      <Link to={"/editar-produto/"+dados.id} className="btn btn-outline-success btn-sm">Editar</Link>
      <span   className="btn btn-outline-danger btn-sm" onClick={()=>excluirProduto(dados.id)}    >Excluir</span>
      </td>
      
    </tr>


      ))}
    
    
  </tbody>
</Table>
          


          </Container>

        </div>
    )
}