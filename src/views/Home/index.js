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
                      
                   </div>
                   <div className="p-2">

                  <Link to="/listar-pedidos" className="btn btn-outline-success btn btn-sm">Pedidos</Link>

                  </div>
                 
               </div>


          </Container>

        </div>
    )
}