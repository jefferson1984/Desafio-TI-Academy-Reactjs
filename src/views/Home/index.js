import { Link } from "react-router-dom"
import { Container } from "reactstrap"

export const Home=()=>{


    return(

        <div>
          <Container>

               <div className="d-flex">
                   <div className="m-auto p-2">

                   <h1>Home</h1>
                   </div>
                   <div className="p-2">

                      <Link to="/listar-clientes" className="btn btn-outline-success btn-sm">Clientes</Link>
                      <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>
                      <Link to="/listar-itempedidos" className="btn btn-outline-success btn btn-sm">ItemPedidos</Link>
                      <Link to="/listar-servicos" className="btn btn-outline-success btn btn-sm">Servicos</Link>
                      <Link to="/listar-compras" className="btn btn-outline-success btn btn-sm">Compras</Link>
                   </div>
                  
                 
               </div>


          </Container>

        </div>
    )
}