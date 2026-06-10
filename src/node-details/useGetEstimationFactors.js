import { useQueries, useQuery } from "@tanstack/react-query";
import { estimationFactor } from "../services/estimationFactor";

export function useGetEstimationFactors() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["estimationFactors"],
    queryFn: estimationFactor,
  });

  return {
    data,
    isLoading,
    error,
  };
}
