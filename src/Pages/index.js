import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "../Components/Inicio/Inicio";
import PaginaPrincipal from "../Pages/PaginaPrincipal/PaginaPrincipal";
import Clientes from "../Pages/Clientes/Clientes"
import ListaPrecios from "../Pages/ListaPrecios/ListaPrecios";
import ListaClientes from "../Components/ListaClientes/ListaClientes";
import EntradaClientes from "../Components/EntradaClientes/EntradaClientes";
import ModificarCliente from "../Components/ModicarCliente/ModificarCliente";
import EntradaProductos from "../Components/EntradaProductos/EntradaProductos";
import EliminarProducto from "../Components/EliminarProducto/EliminarProducto"
import FacturaElectronica from "../Pages/FacturaElectronica/FacturaElectronica";
import RemitoForm from "../Pages/Remitoform/RemitoForm";
import PresupuestoForm from "../Pages/Presupuestoform/PresupuestoForm";
import FormularioVentas from "../Pages/FormularioVentas/FormularioVentas";
import InstalacionFormulario from "../Pages/InstalacionFormulario/InstalacionFormulario";


const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/PaginaPrincipal" element={<PaginaPrincipal />} /> 
        <Route path="/Clientes" element={<Clientes />} />
        <Route path="/ListaClientes" element={<ListaClientes />} />
        <Route path="/EntradaClientes" element={<EntradaClientes />} />
        <Route path="/ModificarCliente" element={<ModificarCliente />} />
        <Route path="/ListaPrecios" element={<ListaPrecios />} />
        <Route path="/EntradaProductos" element={<EntradaProductos />} />
        <Route path="/EliminarProducto" element={<EliminarProducto />} />
        <Route path="/FacturaElectronica" element={<FacturaElectronica />} />
        <Route path="/RemitoForm" element={<RemitoForm />} />
        <Route path="/PresupuestoForm" element={<PresupuestoForm />} />
        <Route path="/FormularioVentas" element={<FormularioVentas />} />
        <Route path="/InstalacionFormulario" element={<InstalacionFormulario />} />

      </Routes>
    </BrowserRouter>
  );
}

export default router;