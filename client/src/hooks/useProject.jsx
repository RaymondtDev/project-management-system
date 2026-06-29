import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../utils/api";

export const useProject = (id) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => { 
      const response = await getProjectById(id) 
      return response.data;
    },
    enabled: !!id,
  });
};
