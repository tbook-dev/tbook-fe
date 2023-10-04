import { useQuery } from "react-query";
import { getExporeCampain } from "@/api/incentive";

export default function useExporeCampainQuery() {
  return useQuery("exporeCampain", getExporeCampain, {
    staleTime: 50000,
  });
}
