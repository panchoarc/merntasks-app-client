import React, { useContext, useEffect, useState } from "react";
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";
import TareaContext from "../../Context/Tareas/TareaContext";

const FormTarea = () => {
  const proyectosContext = useContext(ProyectoContext);
  const { proyecto } = proyectosContext;

  const tareaContext = useContext(TareaContext);
  const {
    errorTarea,
    tareaSeleccionada,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = tareaContext;

  //Effect que detecta si hay una tarea seleccionada

  useEffect(() => {
    if (tareaSeleccionada !== null) {
      guardarTarea(tareaSeleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaSeleccionada]);

  const [tarea, guardarTarea] = useState({
    nombre: "",
  });
  const { nombre } = tarea;

  if (!proyecto) return null;
  const [proyectoActual] = proyecto;

  const onSubmit = (e) => {
    e.preventDefault();

    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //Revisar si es Edición o si es nueva tarea

    if (tareaSeleccionada === null) {
      // Tarea Nueva

      tarea.proyecto = proyectoActual._id;

      agregarTarea(tarea);
    } else {
      //Actualizar tarea Existent
      actualizarTarea(tarea);

      //Elimina tarea seleccionada del State
      limpiarTarea();
    }

    obtenerTareas(proyectoActual._id);
    guardarTarea({
      nombre: "",
    });
  };

  const onChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            data-cy="input-tarea"
            type="text"
            className="input-text"
            placeholder="Nombre tarea"
            name="nombre"
            value={nombre}
            onChange={onChange}
          />
        </div>

        <div className="contenedor-input">
          <button
            data-cy="submit-tarea"
            type="submit"
            className="btn btn-primario btn-block"
          >
            {tareaSeleccionada ? " Editar Tarea" : "Agregar Tarea"}
          </button>
        </div>
      </form>
      {errorTarea ? (
        <p data-cy="alerta" className="mensaje error">
          Nombre de la tarea es obligatorio
        </p>
      ) : null}
    </div>
  );
};

export default FormTarea;
