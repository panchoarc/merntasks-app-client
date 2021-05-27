import React, { useContext } from "react";
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";
import TareaContext from "../../Context/Tareas/TareaContext";

const Proyecto = ({ proyecto }) => {
  const proyectosContext = useContext(ProyectoContext);
  const { proyectoActual } = proyectosContext;

  const tareaContext = useContext(TareaContext);
  const { obtenerTareas } = tareaContext;

  //FUNCION PARA AGREGAR EL PROYECTO ACTUAL

  const seleccionarProyecto = (id) => {
    proyectoActual(id); //Fijar el proyecto Actual
    obtenerTareas(id); // Filtrar las tareas cuando se haga click
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
