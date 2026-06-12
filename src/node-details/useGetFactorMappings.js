import { useQuery } from "@tanstack/react-query";
import { factorMapping } from "../services/factorMapping";

export function useGetFactorMappings() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["estimationFactors"],
    queryFn: factorMapping,
  });

  return {
    data,
    isLoading,
    error,
  };
}
