import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { api } from "../../../Config"

export const EditarCliente=(props)=>{

  const [id,setId]=useState(props.match.params.id)
  const [nome,setNome]=useState('')
  const [endereco,setEndereco]=useState('')
  const [cidade,setCidade]=useState('')
  const [uf,setUf]=useState('')
  const [nascimento,setNascimento]=useState('')
  const [clienteDesde,setClienteDesde]=useState('')

  const [status,setStatus]=useState({
    type:'',
    message:''
  })

  const editCliente=async(e)=>{
      e.preventDefault()

      const headers={
          'Content-Type':'application/json'
      }

      await axios.put(api+'/cliente/atualizar/'+id,{id,nome,endereco,cidade,uf,nascimento,clienteDesde},{headers}).then(()=>{
         
        setStatus({
            type:'success',
            message:'Cliente atualizado com sucesso.'
        })
         
      }).catch(()=>{

        setStatus({
            type:'error',
            message:'Não foi possível acessar Api.'
        })
      })
  }

  useEffect(()=>{

     const getCliente=async()=>{

        await axios.get(api+'/cliente/'+id).then((response)=>{

            setId(response.data.dados.id)
            setNome(response.data.dados.nome)
            setCidade(response.data.dados.cidade)
            setEndereco(response.data.dados.endereco)
            setUf(response.data.dados.uf)
            setNascimento(response.data.dados.nascimento)
            setClienteDesde(response.data.dados.clienteDesde)
        }).catch(()=>{

            setStatus({
                type:'error',
                message:'Não foi possível acessar Api.'
            })
        })
     }
     getCliente()
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

                   <h1>Editar Cliente</h1>
                   </div>
                   <div className="p-2">

                      <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                      
                   </div>
                   <div className="p-2">

                  <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>

                  </div>
                 
               </div>

               <Form className="p-2" onSubmit={editCliente}>
  <Row form>


  <FormGroup>
        <Label >
          Id
        </Label>
        <Input
         
          name="id"
          placeholder="id do cliente"
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
          placeholder="nome do cliente"
          type="text"
          onChange={e=>{setNome(e.target.value)}}
          value={nome}
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
          onChange={e=>{setEndereco(e.target.value)}}
          value={endereco}
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
      onChange={e=>{setCidade(e.target.value)}}
      value={cidade}
    />
  </FormGroup>
  <FormGroup>
    <Label >
      Uf
    </Label>
    <Input
      
      name="uf"
      placeholder="uf do cliente"
      onChange={e=>{setUf(e.target.value)}}
          value={uf}
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
          onChange={e=>{setNascimento(e.target.value)}}
          value={nascimento}
        />
      </FormGroup>
    
    
      <FormGroup>
        <Label >
         clienteDesde
        </Label>
        <Input
         
          name="clienteDesde"
          placeholder="cliente desde"
          onChange={e=>{setClienteDesde(e.target.value)}}
          value={clienteDesde}
        />
      </FormGroup>
    
   
      
    
  </Row>
  
  <Button type="submit" outline color="success">
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