import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../utils/api";

export const useProjects = (admin) => {
  return useQuery({
    queryKey: ["projects", admin],
    queryFn: async () => {
      const response = await getProjects(admin);
      return response.data;
    },
    enabled: !!admin,
  });
};
