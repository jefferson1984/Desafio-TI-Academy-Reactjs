import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { api } from "../../../Config"

export const CadastrarCliente=()=>{

 const [cliente,setCliente]=useState({
     nome:'',
     endereco:'',
     cidade:'',
     uf:'',
     nascimento:'',
     clienteDesde:''
 })

 const [status,setStatus]=useState({
    type:'',
    message:''
  })

 const valorInput=e=>setCliente({...cliente,[e.target.name]:e.target.value})

 const cadCliente=async(e)=>{
   e.preventDefault()

 const  headers={
       'Content-Type':'application/json'
   }

    await axios.post(api+'/cliente',cliente,{headers}).then(()=>{
        
        setStatus({
            type:'success',
            message:'Cliente cadastrado com sucesso.'
        })
    }).catch(()=>{
        setStatus({
            type:'error',
            message:'Não foi possível acessar Api.'
        })

        
    })

 }
    return(
        <Container>
          <div className="p-2">
          {status.type==='error' ? <Alert color="danger">{status.message}</Alert> : ""}
          {status.type==='success' ? <Alert color="success">{status.message}</Alert> : ""} 

          </div>

        <div className="d-flex">

            <div className="m-auto p-2">
               
            <h1>Cadastrar Cliente</h1>
                 
            </div>

            <div className="p-2">
            <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>

            </div>
          

        </div>

        <Form className="p-2" onSubmit={cadCliente}>
  <Row form>
    
      <FormGroup>
        <Label >
          Nome
        </Label>
        <Input
         
          name="nome"
          placeholder="nome do cliente"
          type="text"
          onChange={valorInput}
        />
      </FormGroup>
    
    
      <FormGroup>
        <Label >
          Endereço
        </Label>
        <Input
          
          name="endereco"
          placeholder="endereço do cliente"
          type="text"
          onChange={valorInput}
        />
      </FormGroup>
    
  </Row>
  <FormGroup>
    <Label >
      Cidade
    </Label>
    <Input
     
      name="cidade"
      placeholder="cidade do cliente"
      onChange={valorInput}
    />
  </FormGroup>
  <FormGroup>
    <Label >
      Uf
    </Label>
    <Input
      
      name="uf"
      placeholder="uf do cliente"
      onChange={valorInput}
    />
  </FormGroup>
  <Row form>
    
      <FormGroup>
        <Label >
          Nascimento
        </Label>
        <Input
          
          name="nascimento"
          placeholder="nascimento cliente"
          onChange={valorInput}
        />
      </FormGroup>
    
    
      <FormGroup>
        <Label >
         clienteDesde
        </Label>
        <Input
         
          name="clienteDesde"
          placeholder="cliente desde"
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
    )
}