import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/fetchdata";

export function useJobs(key: string, url: string) {
  return useQuery([key], () => fetchData(url));
}
