import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

import {
  REGISTRO_ERROR,
  REGISTRO_EXITOSO,
  LOGIN_ERROR,
  LOGIN_EXITOSO,
  CERRAR_SESION,
  OBTENER_USUARIO,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Funciones

  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
      console.log(respuesta);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });

      //Obtener el usuario
      usuarioAutenticado();
    } catch (error) {
      const alerta = {
        message: error.response.data.message,
        categoria: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  //Retorna el usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/auth");

      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  //Cuando el usuario inicia sesión
  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });
      //Obtener el usuario autenticado
      usuarioAutenticado();
    } catch (error) {
      console.log(error.response.data.message);
      const alerta = {
        message: error.response.data.message,
        categoria: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };

  //Cierra la sesión del usuario
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        cargando: state.cargando,
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,

        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
