


import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import { Menu } from "./Components/Menu";
import { ListarPedido } from "./views/Pedidos/ListarPedido";
import { ListarCliente } from "./views/Cliente/ListarCliente";
import { Home } from './views/Home';
import { PedidosId } from "./views/Cliente/PedidosId";
import { CadastrarCliente } from "./views/Cliente/CadastrarCliente";
import { EditarPedido } from "./views/Cliente/EditarPedido";
import { CadastrarPedido } from "./views/Pedidos/CadastrarPedido";
import { EditarCliente } from "./views/Cliente/EditarCliente";

function App() {
  return (

    <div className="App">
      <Menu/>
      <Router>

      <Switch >

     <Route exact path="/" component={Home} />
     <Route path="/cadastrar-cliente" component={CadastrarCliente}/>
     <Route  path="/listar-clientes" component={ListarCliente} />
     <Route  path="/editar-cliente" component={EditarCliente} />
     <Route  path="/cadastrar-pedido" component={CadastrarPedido} />
     <Route  path="/pedidos-cliente/:id" component={PedidosId} />
     <Route  path="/listar-pedidos" component={ListarPedido} />
     <Route  path="/editar-pedido/:id" component={EditarPedido} />



      </Switch>


      </Router>
     
    </div>
  );
}

export default App;
