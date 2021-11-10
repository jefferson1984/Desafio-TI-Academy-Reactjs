import axios from "axios"
import { Link } from "react-router-dom"
import { useState } from "react/cjs/react.development"
import { Alert, Button, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { api } from "../../../Config"

export const CadastrarItemCompra=()=>{

    const [itemCompra,setItemCompra]=useState({
        CompraId:'',
        ProdutoId:'',
        quantidade:'',
        valor:''
    })
 
    const [status,setStatus]=useState({
        type:'',
        message:''
    })

    const valorInput=e=>setItemCompra({...itemCompra,[e.target.name]:e.target.value})

    const cadItemCompra=async(e)=>{
 
        e.preventDefault()

        const headers={
            'Content-Type':'application/json'
        }

        await axios.post(api+'/itemcompra/cadastro',itemCompra,{headers}).then(()=>{

            setStatus({
                type:'success',
                message:'ItemCompra cadastrado com sucesso.'
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

                   <h1>Cadastrar ItemCompra</h1>
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
               <Form className="p-2" onSubmit={cadItemCompra}>
  <Row form>
    
      <FormGroup>
        <Label >
         CompraId
        </Label>
        <Input
         
          name="CompraId"
          placeholder="id do compra"
          type="text"
          onChange={valorInput}
          
        />
      </FormGroup>
    
    
      <FormGroup>
        <Label >
          ProdutoId
        </Label>
        <Input
          
          name="ProdutoId"
          placeholder="ProdutoId"
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