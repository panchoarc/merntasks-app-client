import React, { Fragment, useContext } from "react";
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";
import TareaContext from "../../Context/Tareas/TareaContext";

const Tarea = ({ tarea }) => {
  const proyectosContext = useContext(ProyectoContext);
  const { proyecto } = proyectosContext;

  const tareaContext = useContext(TareaContext);
  const {
    eliminarTarea,
    obtenerTareas,
    actualizarTarea,
    guardarTareaActual,
  } = tareaContext;

  const [proyectoActual] = proyecto;

  const onClickEliminar = (id) => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual._id);
  };

  const cambiarEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    actualizarTarea(tarea);
  };

  const seleccionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  };

  return (
    <Fragment>
      <li data-cy="tarea" key={tarea._id} className="tarea sombra">
        <p>{tarea.nombre}</p>
        <div className="estado">
          {tarea.estado ? (
            <button
              data-cy="tarea-completa"
              type="button"
              className="completo"
              onClick={() => cambiarEstado(tarea)}
            >
              Completo
            </button>
          ) : (
            <button
              data-cy="tarea-incompleta"
              type="button"
              className="incompleto"
              onClick={() => cambiarEstado(tarea)}
            >
              Incompleto
            </button>
          )}

          <div className="acciones">
            <button
              data-cy="btn-editar"
              type="button"
              className="btn btn-primario"
              onClick={() => seleccionarTarea(tarea)}
            >
              Editar
            </button>
            <button
              data-cy="btn-eliminar"
              type="button"
              className="btn btn-secundario"
              onClick={() => onClickEliminar(tarea._id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </li>
    </Fragment>
  );
};

export default Tarea;
