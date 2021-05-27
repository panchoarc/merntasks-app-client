import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import {
  ACTUALIZAR_TAREA, AGREGAR_TAREA,

  ELIMINAR_TAREA,



  LIMPIAR_TAREA, TAREAS_PROYECTO,




  TAREA_ACTUAL, VALIDAR_TAREA
} from "../../types";
import TareaContext from "./TareaContext";
import TareaReducer from "./TareaReducer";



const TareaState = (props) => {
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionada: null,
  };

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //CREAR LAS FUNCIONES

  //OBTENER LAS TAREAS DE UN PROYECTO

  const obtenerTareas = async (proyecto) => {
    try {
      const resultado = await clienteAxios.get(`/api/tareas`, {
        params: { proyecto },
      });
      console.log(resultado);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const agregarTarea = async (tarea) => {
    try {
      const respuesta = await clienteAxios.post("/api/tareas", tarea);
      console.log(respuesta);
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };
  const eliminarTarea = async (tareaId, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${tareaId}`, {
        params: { proyecto },
      });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: tareaId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Cambia el estado de cada tarea
  const actualizarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, {
        tarea,
      });
      console.log(resultado);
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Extraer tarea edición
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  //Actualizar la tarea

  // Elimina la tarea Seleccionada

  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };

  return (
    <TareaContext.Provider
      value={{
        tareaSeleccionada: state.tareaSeleccionada,
        errorTarea: state.errorTarea,
        tareasProyecto: state.tareasProyecto,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};
export default TareaState;
