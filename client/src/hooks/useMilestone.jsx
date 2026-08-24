import { useQuery } from "@tanstack/react-query";
import { deleteMilestone } from "../utils/api";

export const useDelMilestone = (milestoneId) => {
  return useQuery({
    queryKey: ["milestone", milestoneId],
    queryFn: async () => {
      const response = await deleteMilestone(milestoneId);
      return response;
    },
    enabled: !!milestoneId
  })
}