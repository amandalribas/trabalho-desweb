import { useQuery } from "@tanstack/react-query";
import useAPI from "../useAPI";
import type { Time } from "../../interfaces/Time";
import { URL_TIMES } from "../../util/constantes";

const useListarTimes = () => {
  const { recuperar } = useAPI<Time>(URL_TIMES);

  return useQuery({
    queryKey: ["times"],
    queryFn: recuperar,
  });
};
export default useListarTimes;
