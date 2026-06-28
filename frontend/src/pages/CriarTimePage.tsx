import CriarTimeForm from "../components/CriarTimeForm";

const CriarTimePage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-verde-texto">
          Criar time
        </h1>
      <hr className="mb-4" />

      <CriarTimeForm />
    </>
  );
}
export default CriarTimePage;