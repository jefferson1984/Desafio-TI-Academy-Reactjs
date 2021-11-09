import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { api } from "../../../Config"

export const EditarCompras=(props)=>{

    const [id,setId]=useState(props.match.params.id)
    const [data,setData]=useState('')
    const [ClienteId,setClienteId]=useState('')
  
    const [status,setStatus]=useState({
        type:'',
        message:''
    })

    const editCompra=async(e)=>{
        e.preventDefault()
        const headers={
            'Content-Type':'application/json'
        }
 
        await axios.put(api+'/compra/'+id,{id,data,ClienteId},{headers}).then(()=>{
 
         setStatus({
             type:'success',
             message:'Compra atualizada com sucesso.'
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
   
           await axios.get(api+'/compra/'+id).then((response)=>{
   
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

                   <h1>Editar Compras</h1>
                   </div>
                   <div className="p-2">

                      <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                      <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>
                      <Link to="/listar-itempedidos" className="btn btn-outline-success btn btn-sm">ItemPedidos</Link>
                      <Link to="/listar-servicos" className="btn btn-outline-success btn btn-sm">Servicos</Link>
                      <Link to="/listar-compras" className="btn btn-outline-success btn btn-sm">Compras</Link>
                   </div>
                  
                 
               </div>

           
               <Form className="p-2" onSubmit={editCompra}>
  <Row form>
    
      <FormGroup>
        <Label >
         ID
        </Label>
        <Input
         
          name="id"
          placeholder="id do compra"
          type="text"
          defaultValue={id}
          
        />
      </FormGroup>
    
    
      <FormGroup>
        <Label >
          Data da Compra
        </Label>
        <Input
          
          name="data"
          placeholder="data do compra"
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