import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Proyectos from "./Components/Proyectos/Proyectos";

import Login from "./Components/auth/Login";
import NuevaCuenta from "./Components/auth/NuevaCuenta";
import ProyectoState from "./Context/Proyectos/ProyectoState";
import TareaState from "./Context/Tareas/TareaState";
import AlertaState from "./Context/Alertas/AlertaState";
import AuthState from "./Context/autenticacion/AuthState";
import tokenAuth from "./config/token";

import RutaPrivada from "./Components/rutas/RutaPrivada";

//Revisar si existe un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <AuthState>
      <ProyectoState>
        <TareaState>
          <AlertaState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AlertaState>
        </TareaState>
      </ProyectoState>
    </AuthState>
  );
}

export default App;
