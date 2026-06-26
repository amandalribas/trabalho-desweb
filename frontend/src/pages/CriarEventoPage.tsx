import CriarEventoForm from "../components/CriarEventoForm";

const CriarEventoPage = () => {
  return (
    <>
      <h1 className="mb-1 text-xl font-semibold">Cadastro de Evento</h1>
      <hr className="mb-4" />

      <CriarEventoForm />
    </>
  );
};
export default CriarEventoPage;