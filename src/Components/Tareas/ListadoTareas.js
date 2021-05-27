import { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";
import TareaContext from "../../Context/Tareas/TareaContext";
import Tarea from "./Tarea";

const ListadoTareas = () => {
  const proyectosContext = useContext(ProyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  const tareaContext = useContext(TareaContext);
  const { tareasProyecto } = tareaContext;


  if (!proyecto) return <h2>Selecciona un Proyecto</h2>
  const [proyectoActual] = proyecto;

  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual._id);
  };

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>

      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay Tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasProyecto.map((tarea) => (
              <CSSTransition key={tarea._id} timeout={300} classNames="tarea">
                <Tarea key={tarea._id} tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickEliminar}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
