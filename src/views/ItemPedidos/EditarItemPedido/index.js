import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { api } from "../../../Config"

export const EditarItemPedido=(props)=>{

    const [ServicoId,setServicoId]=useState(props.match.params.id)
    const [PedidoId,setPedidoId]=useState('')
    const [quantidade,setQuantidade]=useState('')
    const [valor,setValor]=useState('')
     
    const [status,setStatus]=useState({
        type:'',
        message:''
    })

    const editItemPedido=async(e)=>{
        e.preventDefault()
        const headers={
            'Content-Type':'application/json'
        }
 
        await axios.put(api+'/atualizar/'+ServicoId,{ServicoId,PedidoId,quantidade,valor},{headers}).then(()=>{
 
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
      const getItemPedido=async()=>{

        await axios.get(api+'/servicoid/'+ServicoId).then((response)=>{

             setServicoId(response.data.dados.ServicoId)
             setPedidoId(response.data.dados.PedidoId)
             setQuantidade(response.data.dados.quantidade)
             setValor(response.data.dados.valor)

        })
      }
      getItemPedido()
    
    },[ServicoId])

    return(

        <div>
          <Container>
          <div className="p-2">
          {status.type==='error' ? <Alert color="danger">{status.message}</Alert> : ""}
          {status.type==='success' ? <Alert color="success">{status.message}</Alert> : ""} 

          </div>
               <div className="d-flex">
                   <div className="m-auto p-2">

                   <h1>Editar ItemPedido</h1>
                   </div>
                   <div className="p-2">

                      <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                      <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>
                      <Link to="/listar-itempedidos" className="btn btn-outline-success btn btn-sm">ItemPedidos</Link>
                   </div>
                  
                 
               </div>

               <Form className="p-2" onSubmit={editItemPedido}>
  <Row form>
    
      <FormGroup>
        <Label >
         ServicoId
        </Label>
        <Input
         
          name="ServicoId"
          placeholder="id do servico"
          type="text"
          defaultValue={ServicoId}
          
        />
      </FormGroup>
    
    
      <FormGroup>
        <Label >
          PedidoId
        </Label>
        <Input
          
          name="PedidoId"
          placeholder="id do pedido"
          type="text"
         
          value={PedidoId}
          onChange={e=>{setQuantidade(e.target.value)}}
        />
      </FormGroup>
    
  </Row>
  <FormGroup>
    <Label >
    Quantidade
    </Label>
    <Input
     
      name="quantidade"
      placeholder="quantidade"
      onChange={e=>{setQuantidade(e.target.value)}}
    value={quantidade}
    />
  </FormGroup>
  <FormGroup>
    <Label >
    Valor
    </Label>
    <Input
     
      name="valor"
      placeholder="valor"
      onChange={e=>{setValor(e.target.value)}}
    value={valor}
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