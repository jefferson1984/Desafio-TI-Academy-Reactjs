


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
import { ListarItemPedido } from "./views/ItemPedidos/ListarItemPedido";
import {CadastrarItemPedido} from "./views/ItemPedidos/CadastrarItemPedido"
import { ItemPedidoId } from "./views/ItemPedidos/ItemPedidoId";
import { EditarItemPedido } from "./views/ItemPedidos/EditarItemPedido";
import { ListarServico } from "./views/Servico/ListarServico";
import { EditarServico } from "./views/Servico/EditarServico";
import { CadastrarServico } from "./views/Servico/CadastrarServico";
import { ListarCompras } from "./views/Compras/ListarCompras";
import { EditarCompras } from "./views/Cliente/EditarCompras";

function App() {
  return (

    <div className="App">
      <Menu/>
      <Router>

      <Switch >

     <Route exact path="/" component={Home} />
     <Route path="/cadastrar-cliente" component={CadastrarCliente}/>
     <Route  path="/listar-clientes" component={ListarCliente} />
     <Route  path="/editar-cliente/:id" component={EditarCliente} />
     <Route  path="/cadastrar-pedido" component={CadastrarPedido} />
     <Route  path="/pedidos-cliente/:id" component={PedidosId} />
     <Route  path="/listar-pedidos" component={ListarPedido} />
     <Route  path="/editar-pedido/:id" component={EditarPedido} />
     <Route  path="/listar-itempedidos" component={ListarItemPedido} />
     <Route path="/cadastrar-itempedidos"   component={CadastrarItemPedido}/>
     <Route path="/pedidos-itempedido/:id" component={ItemPedidoId} />
      <Route path="/editar-itempedido/:id" component={EditarItemPedido} /> 
      <Route path="/listar-servicos" component={ListarServico} />
      <Route path="/editar-servico:id" component={EditarServico} />
      <Route path="/cadastrar-servico" component={CadastrarServico} />
      <Route path="/listar-compras" component={ListarCompras} />
      <Route path="/compras-cliente/:id" component={EditarCompras} />

      </Switch>


      </Router>
     
    </div>
  );
}

export default App;
