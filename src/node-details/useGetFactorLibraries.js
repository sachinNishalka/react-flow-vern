import { useQuery } from "@tanstack/react-query";
import { factorLibraries } from "../services/factorLibrary";

export function useGetFactorLibraries() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["factorLibraries"],
    queryFn: factorLibraries,
  });
  return { data, isLoading, isError };
}
