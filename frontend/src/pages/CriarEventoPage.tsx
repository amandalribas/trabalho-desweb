import CriarEventoForm from "../components/CriarEventoForm";

const CriarEventoPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-verde-texto">
          Criar evento
        </h1>
      <hr className="mb-4" />

      <CriarEventoForm />
    </>
  );
};
export default CriarEventoPage;