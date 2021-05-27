import React, { Fragment, useContext, useState } from "react";
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";

const NuevoProyecto = () => {
  const proyectosContext = useContext(ProyectoContext);
  const {
    formulario,
    errorFormulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;

  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });
  const { nombre } = proyecto;

  const onChangeProyecto = (e) => {
    guardarProyecto({ ...proyecto, [e.target.name]: e.target.value });
  };

  const onSumbitProyecto = (e) => {
    e.preventDefault();
    if (nombre.trim() === "") {
      mostrarError();
      return;
    }
    agregarProyecto(proyecto);

    guardarProyecto({
      nombre: "",
    });
  };

  const onClickFormulario = () => {
    mostrarFormulario();
  };

  return (
    <Fragment>
      <button
        data-cy="boton-nuevo-proyecto"
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickFormulario}
      >
        Nuevo Proyecto
      </button>

      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSumbitProyecto}>
          <input
            data-cy="input-nuevo-proyecto"
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            onChange={onChangeProyecto}
            value={nombre}
          />

          <button
            data-cy="submit-nuevo-proyecto"
            type="submit"
            className="btn btn-primario btn-block"
          >
            Agregar Proyecto
          </button>
        </form>
      ) : null}

      {errorFormulario ? (
        <p data-cy="alerta" className="mensaje error">
          El nombre del Proyecto es Obligatorio
        </p>
      ) : null}
    </Fragment>
  );
};

export default NuevoProyecto;
