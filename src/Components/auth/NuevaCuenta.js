import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../Context/Alertas/AlertaContext";
import AuthContext from "../../Context/autenticacion/AuthContext";
import Alerta from "../layout/Alerta";

const NuevaCuenta = (props) => {
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

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
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const onChange = (e) => {
    guardarUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //Password Mínimo de 6 caracteres
    if (password.length < 6) {
      mostrarAlerta(
        "Password debe ser de al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }

    //Revisar si las dos passwords son iguales
    if (password !== confirmar) {
      mostrarAlerta("Las contraseñas no son iguales", "alerta-error");
      return;
    }
    registrarUsuario({
      nombre,
      email,
      password,
    });
  };

  const { nombre, email, password, confirmar } = usuario;
  return (
    <div className="form-usuario">
      <Alerta alerta={alerta} />
      <div className="contenedor-form sombra-dark">
        <h1 data-cy="titulo">Crea una Cuenta</h1>

        <form onSubmit={onSubmit} data-cy="nueva-cuenta">
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              data-cy="nombre-input"
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              onChange={onChange}
              value={nombre}
            />
          </div>
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
            <label htmlFor="confirmar">Confirmar Passowrd</label>
            <input
              data-cy="repetir-password-input"
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Tu Password"
              onChange={onChange}
              value={confirmar}
            />
          </div>

          <div className="campo-form">
            <button
              type="submit"
              className="btn btn-primario btn-block"
              data-cy="submit-nueva-cuenta"
            >
              Registrarse
            </button>
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta" data-cy="enlace-login">
          Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
