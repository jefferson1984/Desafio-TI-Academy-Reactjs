import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { api } from "../../../Config"

export const EditarPedido=(props)=>{

  const [id,setId]=useState(props.match.params.id)
  const [data,setData]=useState('')
  const [ClienteId,setClienteId]=useState('')

  const [status,setStatus]=useState({
      type:'',
      message:''
  })

   const editPedido=async(e)=>{
       e.preventDefault()
       const headers={
           'Content-Type':'application/json'
       }

       await axios.put(api+'/pedido/'+id,{id,data,ClienteId},{headers}).then(()=>{

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

     const getPedido=async()=>{

        await axios.get(api+'/pedido/'+id).then((response)=>{

             setId(response.data.dados.id)
             setData(response.data.dados.data)
             setClienteId(response.data.dados.ClienteId)
            
        }).catch(()=>{

            setStatus({
                type:'error',
                message:'Não foi possível acessar Api.'
            })
        })
     }
     getPedido()

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

                   <h1>Editar Pedido</h1>
                   </div>
                   <div className="p-2">

                      <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                      
                   </div>
                   <div className="p-2">

                  <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>

                  </div>
                 
               </div>

               <Form className="p-2" onSubmit={editPedido}>
  <Row form>
    
      <FormGroup>
        <Label >
         ID
        </Label>
        <Input
         
          name="id"
          placeholder="id do pedido"
          type="text"
          defaultValue={id}
          
        />
      </FormGroup>
    
    
      <FormGroup>
        <Label >
          Data do Pedido
        </Label>
        <Input
          
          name="data"
          placeholder="data do pedido"
          type="text"
          onChange={e=>{setData(e.target.value)}}
          value={data}
        />
      </FormGroup>
    
  </Row>
  <FormGroup>
    <Label >
      ClienteId
    </Label>
    <Input
     
      name="ClienteId"
      placeholder="ClienteId"
      defaultValue={ClienteId}
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