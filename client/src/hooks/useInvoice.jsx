import { useQuery } from "@tanstack/react-query";
import { sendInvoiceEmail } from "../utils/api.js";

export const useInvoice = (projectId) => {
  return useQuery({
    queryKey: ["invoice", projectId],
    queryFn: async () => {
      const response = await sendInvoiceEmail(projectId);
      return response.data;
    },
    enabled: !!projectId,
  });
};