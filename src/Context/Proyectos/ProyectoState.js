import React, { useReducer } from "react";

import ProyectoContext from "./ProyectoContext";
import proyectoReducer from "./ProyectoReducer";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR,
} from "../../types";
import clienteAxios from "../../config/axios";

const ProyectoState = (props) => {
  const initialState = {
    proyectos: [],
    formulario: false,
    errorFormulario: false,
    proyecto: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //Agregar funciones CRUD

  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  //Obtener Proyectos

  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/proyectos");
      console.log(resultado);
      dispatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data.proyectos,
      });
    } catch (error) {
      const alerta = {
        message: "Hubo un error",
        categoria: "alerta-error",
      };

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  //Añadir un proyecto
  const agregarProyecto = async (proyecto) => {
    try {
      const resultado = await clienteAxios.post("/api/proyectos", proyecto);
      console.log(resultado);
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data.proyecto,
      });
    } catch (error) {
      const alerta = {
        message: "Hubo un error",
        categoria: "alerta-error",
      };

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
      
    } catch (error) {
      const alerta = {
        message: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <ProyectoContext.Provider
      value={{
        mensaje: state.mensaje,
        proyecto: state.proyecto,
        errorFormulario: state.errorFormulario,
        proyectos: state.proyectos,
        formulario: state.formulario,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {props.children}
    </ProyectoContext.Provider>
  );
};

export default ProyectoState;
