import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";
import AlertaContext from "../../Context/Alertas/AlertaContext";
import Proyecto from "./Proyecto";
import Alerta from "../layout/Alerta";

const ListadoProyectos = () => {
  //Extraer Proyectos de State Inicial
  const proyectosContext = useContext(ProyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //Obtener Proyectos
  useEffect(() => {
    //Si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.message, mensaje.categoria);
    }
    obtenerProyectos();
    //eslint-disable-next-line
  }, [mensaje]);

  //Verificar si existen Proyectos
  if (proyectos.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <ul data-cy="listado-proyectos" className="listado-proyectos">
      <Alerta alerta={alerta} />
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={500} classNames="proyecto">
            <Proyecto key={proyecto._id} proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
