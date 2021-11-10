import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { api } from "../../../Config"

export const EditarItemCompra=(props)=>{
     
     const [ProdutoId,setProdutoId]=useState(props.match.params.id)
     const [CompraId,setCompraId]=useState('')
     const [quantidade,setQuantidade]=useState('')
     const [valor,setValor]=useState('')

     const [status,setStatus]=useState({
        type:'',
        message:''
    })


    const editItemCompra=async(e)=>{

        e.preventDefault()

        const headers={
            'Content-Type':'application/json'
        }

        await axios.put(api+'/compra/'+ProdutoId+'/atualizaritemcompra',{ProdutoId,CompraId,quantidade,valor},{headers})
        .then(()=>{

            setStatus({
                type:'success',
                message:'ItemCompra atualizado com sucesso.'
            })
        }).catch(()=>{

            setStatus({
                type:'error',
                message:'Não foi possível acessar Api.'
            })
        })
    
    }

    useEffect(()=>{

    const getItemCompra=async()=>{

        await axios.get(api+'/listaritemcompra/'+ProdutoId).then((response)=>{

            setProdutoId(response.data.dados.ProdutoId)
            setCompraId(response.data.dados.CompraId)
            setQuantidade(response.data.dados.quantidade)
            setValor(response.data.dados.valor)
        }).catch(()=>{

            setStatus({
                type:'error',
                message:'Não foi possível acessar Api.'
            })
        })
    }
   getItemCompra()

    },[ProdutoId])


    return(

        <div>
          <Container>
          <div className="p-2">
          {status.type==='error' ? <Alert color="danger">{status.message}</Alert> : ""}
          {status.type==='success' ? <Alert color="success">{status.message}</Alert> : ""} 

          </div>
               <div className="d-flex">
                   <div className="m-auto p-2">

                   <h1>Editar ItemCompra</h1>
                   </div>
                   <div className="p-2">

                      <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                      <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>
                      <Link to="/listar-itempedidos" className="btn btn-outline-success btn btn-sm">ItemPedidos</Link>
                      <Link to="/listar-servicos" className="btn btn-outline-success btn btn-sm">Servicos</Link>
                      <Link to="/listar-compras" className="btn btn-outline-success btn btn-sm">Compras</Link>
                      <Link to="/listar-itemcompras" className="btn btn-outline-success btn btn-sm">ItemCompras</Link>
                   </div>
                  
                 
               </div>

               <Form className="p-2" onSubmit={editItemCompra}>
  <Row form>
    
      <FormGroup>
        <Label >
         ID
        </Label>
        <Input
         
          name="ProdutoId"
          placeholder="ProdutoId"
          type="text"
          defaultValue={ProdutoId}
          
        />
      </FormGroup>
    
    
      <FormGroup>
        <Label >
          CompraId
        </Label>
        <Input
          
          name="CompraId"
          placeholder="CompraId"
          type="text"
          defaultValue={CompraId}
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