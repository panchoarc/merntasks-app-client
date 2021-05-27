const Alerta = ({ alerta }) => {
  if (!alerta) return null;

  return (
    <div data-cy="alerta" className={`alerta ${alerta.categoria}`}>
      {alerta.message}
    </div>
  );
};

export default Alerta;
