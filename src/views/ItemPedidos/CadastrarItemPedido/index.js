import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { api } from "../../../Config"

export const CadastrarItemPedido=()=>{


    const [itemPedido,setItemPedido]=useState({
        PedidoId:'',
        ServicoId:'',
        quantidade:'',
        valor:''
    })
 
    const [status,setStatus]=useState({
        type:'',
        message:''
    })
 
      const valorInput=e=>setItemPedido({...itemPedido,[e.target.name]:e.target.value})
 
      const cadItemPedido=async(e)=>{
 
         e.preventDefault()
 
         const headers={
             'Content-Type':'application/json'
         }
 
         await axios.post(api+'/itempedido/cadastro',itemPedido,{headers}).then(()=>{
 
             setStatus({
                 type:'success',
                 message:'ItemPedido cadastrado com sucesso.'
             })
         }).catch(()=>{
 
             setStatus({
                 type:'error',
                 message:'Não foi possível acessar Api.'
             })
         })
      }


    return(

        <div>
          <Container>
          <div className="p-2">
          {status.type==='error' ? <Alert color="danger">{status.message}</Alert> : ""}
          {status.type==='success' ? <Alert color="success">{status.message}</Alert> : ""} 

          </div>

               <div className="d-flex">
                   <div className="m-auto p-2">

                   <h1>Cadastrar ItemPedido</h1>
                   </div>
                   <div className="p-2">

                      <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                      <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>
                      <Link to="/listar-itempedidos" className="btn btn-outline-success btn btn-sm">ItemPedidos</Link>
                   </div>
                  
                 
               </div>
               <Form className="p-2" onSubmit={cadItemPedido}>
  <Row form>
    
      <FormGroup>
        <Label >
         PedidoId
        </Label>
        <Input
         
          name="PedidoId"
          placeholder="id do pedido"
          type="text"
          onChange={valorInput}
          
        />
      </FormGroup>
    
    
      <FormGroup>
        <Label >
          ServicoId
        </Label>
        <Input
          
          name="ServicoId"
          placeholder="ServicoId"
          type="text"
          onChange={valorInput}
          
        />
      </FormGroup>

      <FormGroup>
        <Label >
          Quantidade
        </Label>
        <Input
          
          name="quantidade"
          placeholder="quantidade"
          type="text"
          onChange={valorInput}
          
        />
      </FormGroup>

      <FormGroup>
        <Label >
          Valor
        </Label>
        <Input
          
          name="valor"
          placeholder="valor"
          type="text"
          onChange={valorInput}
          
        />
      </FormGroup>
    
  </Row>
  
  
  <Button type="submit" outline color="success">
    Cadastrar
  </Button>
  <Button type="reset" outline color="success">
    Limpar
  </Button>
</Form>


          </Container>

        </div>
    )
}