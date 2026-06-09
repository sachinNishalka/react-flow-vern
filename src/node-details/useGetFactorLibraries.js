import { useQuery } from "@tanstack/react-query";
import { getFactorLibraries } from "../services/factorLibrary";

export function useGetFactorLibraries() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["factorLibraries"],
    queryFn: getFactorLibraries,
  });
  return { data, isLoading, isError };
}
