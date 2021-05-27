import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../Context/Alertas/AlertaContext";
import AuthContext from "../../Context/autenticacion/AuthContext";
import Alerta from "../layout/Alerta";

const Login = (props) => {
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.message, mensaje.categoria);
    }
    //eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    guardarUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const { email, password } = usuario;
  const onSubmit = (e) => {
    e.preventDefault();

    try {
      //Validar campos
      if (email.trim() === "" || password.trim() === "") {
        mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      } else {
        iniciarSesion({ email, password });
      }
      //
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form-usuario">
      <Alerta alerta={alerta} />
      <div className="contenedor-form sombra-dark">
        <h1 data-cy="titulo">Iniciar Sesión</h1>

        <form onSubmit={onSubmit} data-cy="form-login">
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              data-cy="email-input"
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              onChange={onChange}
              value={email}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              data-cy="password-input"
              type="password"
              id="password"
              name="password"
              placeholder="Tu password"
              onChange={onChange}
              value={password}
            />
          </div>

          <div className="campo-form">
            <button
              type="submit"
              className="btn btn-primario btn-block"
              data-cy="submit-login"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        <Link
          data-cy="nueva-cuenta"
          to={"/nueva-cuenta"}
          className="enlace-cuenta"
        >
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
