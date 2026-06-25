import useListarJogos from "../hooks/jogo/useListarJogos";
import useDeletarJogo from "../hooks/jogo/useDeletarJogo";

const AtualizarJogoPage = () => {
  const { data: jogos, isLoading } = useListarJogos();
  const { mutate: deletarJogo } = useDeletarJogo();

  if (isLoading) return <p className="text-gray-500">Carregando jogos...</p>;

  return (
    <>
      <h1 className="mb-1 text-xl font-semibold">Gerenciar Jogos</h1>
      <hr className="mb-4" />

      {jogos && jogos.length === 0 && (
        <p className="text-gray-500">Nenhum jogo cadastrado.</p>
      )}

      {jogos && jogos.length > 0 && (
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Time A</th>
              <th className="p-2 text-left">Time B</th>
              <th className="p-2 text-left">Local</th>
              <th className="p-2 text-left">Descrição</th>
              <th className="p-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {jogos.map((jogo) => (
              <tr key={jogo.id} className="border-b">
                <td className="p-2">{jogo.timeA.nome}</td>
                <td className="p-2">{jogo.timeB.nome}</td>
                <td className="p-2">{jogo.local}</td>
                <td className="p-2">{jogo.descricao}</td>
                <td className="p-2">
                  <button
                    onClick={() => deletarJogo(jogo.id)}
                    className="cursor-pointer rounded-md bg-red-600 px-3 py-1 text-white duration-200 hover:bg-red-700"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
export default AtualizarJogoPage;
