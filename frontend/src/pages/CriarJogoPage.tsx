import CriarJogoForm from "../components/CriarJogoForm";

const CriarJogoPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-verde-texto">
          Criar jogo
        </h1>
      <hr className="mb-4" />

      <CriarJogoForm />
    </>
  );
};
export default CriarJogoPage;
