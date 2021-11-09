import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { api } from "../../../Config"

export const EditarServico=(props)=>{


    const [id,setId]=useState(props.match.params.id)
    const [nome,setNome]=useState('')
    const [descricao,setDescricao]=useState('')

    const [status,setStatus]=useState({
        type:'',
        message:''
    })

    const editServico=async(e)=>{
        e.preventDefault()

        const headers={

            'Content-Type':'application/json'
        }

        await axios.put(api+'/atualizarservico/'+id,{id,nome,descricao},{headers}).then(()=>{
          
            setStatus({
                type:'success',
                message:'Pedido atualizado com sucesso.'
            })

        }).catch(()=>{
          
            setStatus({
                type:'error',
                message:'Não foi possível acessar Api.'
            })

        })
    }

    useEffect(()=>{

      const getServico=async()=>{

        await axios.get(api+'/servico/'+id).then((response)=>{

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
   getServico()
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

                   <h1>Editar Serviço</h1>
                   </div>
                   <div className="p-2">

                      <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                      <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>
                      <Link to="/listar-itempedidos" className="btn btn-outline-success btn btn-sm">ItemPedidos</Link>
                      <Link to="/listar-servicos" className="btn btn-outline-success btn btn-sm">Servicos</Link>
                   </div>
                  
                 
               </div>
          
               <Form className="p-2" onSubmit={editServico}>
  <Row form>
    
      <FormGroup>
        <Label >
         ID
        </Label>
        <Input
         
          name="id"
          placeholder="id do serviço"
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