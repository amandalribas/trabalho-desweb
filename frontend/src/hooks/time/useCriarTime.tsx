import { useMutation } from "@tanstack/react-query";
import type { TimeCreate } from "../../interfaces/TimeCreate";
import useAPI from "../useAPI";
import type { Time } from "../../interfaces/Time";
import { URL_TIMES } from "../../util/constantes";

const useCriarTime = () => {
    const { cadastrar } = useAPI<Time>(URL_TIMES);

  return useMutation({
    mutationFn: (timeCreate: TimeCreate) => cadastrar(timeCreate),
    onSuccess: () => {
    },
  });
};
export default useCriarTime;