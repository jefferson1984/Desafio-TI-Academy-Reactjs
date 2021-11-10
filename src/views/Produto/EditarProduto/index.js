import axios from "axios"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react/cjs/react.development"
import { Alert, Button, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { api } from "../../../Config"

export const EditarProduto=(props)=>{

    const [id,setId]=useState(props.match.params.id)
    const [nome,setNome]=useState('')
    const [descricao,setDescricao]=useState('')

    const [status,setStatus]=useState({
        type:'',
        message:''
    })

    const editProduto=async(e)=>{
        e.preventDefault()

        const headers={

            'Content-Type':'application/json'
        }

        await axios.put(api+'/atualizarproduto/'+id,{id,nome,descricao},{headers}).then(()=>{
          
            setStatus({
                type:'success',
                message:'Produto atualizado com sucesso.'
            })

        }).catch(()=>{
          
            setStatus({
                type:'error',
                message:'Não foi possível acessar Api.'
            })

        })
    }

    useEffect(()=>{

        const getProduto=async()=>{
  
          await axios.get(api+'/listarprodutos/'+id).then((response)=>{
  
              setId(response.data.dados.id)
              setNome(response.data.dados.nome)
              setDescricao(response.data.dados.descricao)
          }).catch(()=>{
  
              setStatus({
                  type:'error',
                  message:'Não foi possível acessar Api.'
              })
          })
        }
     getProduto()
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

                   <h1>Editar Produto</h1>
                   </div>
                   <div className="p-2">

                      <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                      <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>
                      <Link to="/listar-itempedidos" className="btn btn-outline-success btn btn-sm">ItemPedidos</Link>
                      <Link to="/listar-servicos" className="btn btn-outline-success btn btn-sm">Servicos</Link>
                      <Link to="/listar-compras" className="btn btn-outline-success btn btn-sm">Compras</Link>
                      <Link to="/listar-itemcompras" className="btn btn-outline-success btn btn-sm">ItemCompras</Link>
                      <Link to="/listar-produtos" className="btn btn-outline-success btn btn-sm">Produtos</Link>
                   </div>
                  
                 
               </div>

               <Form className="p-2" onSubmit={editProduto}>
  <Row form>
    
      <FormGroup>
        <Label >
         ID
        </Label>
        <Input
         
          name="id"
          placeholder="id do produto"
          type="text"
          defaultValue={id}
          
        />
      </FormGroup>
    
    
      <FormGroup>
        <Label >
          Nome
        </Label>
        <Input
          
          name="nome"
          placeholder="nome"
          type="text"
          onChange={e=>{setNome(e.target.value)}}
          value={nome}
        />
      </FormGroup>
    
  </Row>
  <FormGroup>
    <Label >
      Descrição
    </Label>
    <Input
     
      name="descricao"
      placeholder="descrição"
      onChange={e=>{setDescricao(e.target.value)}}
      value={descricao}
      
    />
  </FormGroup>
  
  <Button type="submit" outline color="warning">
    Salvar
  </Button>
  <Button type="reset" outline color="success">
    Limpar
  </Button>
</Form>


          </Container>

        </div>
    )
}