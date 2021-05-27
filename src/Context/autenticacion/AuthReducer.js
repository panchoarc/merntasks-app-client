import {
  REGISTRO_ERROR,
  REGISTRO_EXITOSO,
  LOGIN_ERROR,
  LOGIN_EXITOSO,
  CERRAR_SESION,
  OBTENER_USUARIO,
} from "../../types";

const alertaReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_EXITOSO:
    case REGISTRO_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return { ...state, autenticado: true, mensaje: null, cargando: false };
    case OBTENER_USUARIO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true,
        cargando: false,
      };

    case CERRAR_SESION:
    case LOGIN_ERROR:
    case REGISTRO_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        mensaje: action.payload,
        usuario: null,
        autenticado: null,
        cargando: false,
      };

    default:
      return state;
  }
};

export default alertaReducer;
