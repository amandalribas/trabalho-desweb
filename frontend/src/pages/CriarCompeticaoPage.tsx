import CriarCompeticaoForm from "../components/CriarCompeticaoForm";

const CriarCompeticaoPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-verde-texto">
          Cadastro de Jogo
        </h1>
      <hr className="mb-4" />

      <CriarCompeticaoForm />
    </>
  );
}
export default CriarCompeticaoPage