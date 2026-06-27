import useListarTimes from "../hooks/time/useListarTimes";
import useAdicionarTimeUser from "../hooks/user/useAdicionarTimeUser";
import useListarTimesUser from "../hooks/user/useListarTimesUser";

const AdicionarTimesPage = () => {
  const { data: times } = useListarTimes();
  const { data: meusTimes } = useListarTimesUser();
  const { mutate: adicionarTime } = useAdicionarTimeUser();

  const timesDisponiveis = times?.filter(
    (time) => !meusTimes?.some((meuTime) => meuTime.id === time.id),
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-verde-texto">Adicionar times</h1>
      <br/>
      <div className="overflow-hidden rounded-md border border-gray-300 bg-white">
        {timesDisponiveis?.map((time) => (
          <div
            key={time.id}
            className="flex items-center justify-between border-b border-gray-200 px-4 py-3 last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <img
                src={time.imagem}
                alt={time.nome}
                className="h-12 w-16 object-cover"
              />

              <div>
                <p className="font-bold text-gray-800">{time.nome}</p>
                <p className="text-sm text-gray-500">{time.sigla}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => adicionarTime(time.id)}
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              Adicionar
            </button>
          </div>
        ))}

        {timesDisponiveis?.length === 0 && (
          <p className="px-4 py-6 text-center text-gray-600">
            Todos os times já foram adicionados à sua lista.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdicionarTimesPage;
