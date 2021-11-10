import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { api } from "../../../Config"

export const CadastrarCompra=()=>{
  
    const [compra,setCompra]=useState({
        data:'',
        ClienteId:''
    })
 
    const [status,setStatus]=useState({
        type:'',
        message:''
    })

    const valorInput=e=>setCompra({...compra,[e.target.name]:e.target.value})

    const cadCompra=async(e)=>{

       e.preventDefault()

       const headers={
           'Content-Type':'application/json'
       }

       await axios.post(api+'/compra/cadastro',compra,{headers}).then(()=>{

           setStatus({
               type:'success',
               message:'Compra cadastrada com sucesso.'
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

                   <h1>Cadastrar Compra</h1>
                   </div>
                   <div className="p-2">

                      <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                      <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>
                      <Link to="/listar-itempedidos" className="btn btn-outline-success btn btn-sm">ItemPedidos</Link>
                      <Link to="/listar-servicos" className="btn btn-outline-success btn btn-sm">Servicos</Link>
                      <Link to="/listar-compras" className="btn btn-outline-success btn btn-sm">Compras</Link>
                   </div>
                  
                 
               </div>
               <Form className="p-2" onSubmit={cadCompra}>
  <Row form>
    
      <FormGroup>
        <Label >
         Data
        </Label>
        <Input
         
          name="data"
          placeholder="data do compra"
          type="text"
          onChange={valorInput}
          
        />
      </FormGroup>
    
    
      <FormGroup>
        <Label >
          ClienteId
        </Label>
        <Input
          
          name="ClienteId"
          placeholder="ClienteId"
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