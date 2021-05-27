import React, { useContext, useEffect } from "react";
import Barra from "../layout/Barra";
import Sidebar from "../layout/Sidebar";
import FormTarea from "../Tareas/FormTarea";
import ListadoTareas from "../Tareas/ListadoTareas";
import AuthContext from "../../Context/autenticacion/AuthContext";

const Proyectos = () => {
  //Extraer la info de autenticación
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="contenedor-app">
      <Sidebar />

      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedor-tareas">
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
