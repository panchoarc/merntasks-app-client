import React, { useEffect, useContext } from "react";

import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../Context/autenticacion/AuthContext";

const RutaPrivada = ({ component: Component, ...props }) => {
  const authContext = useContext(AuthContext);
  const { autenticado, cargando, usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);
  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !cargando ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaPrivada;
