import { useQuery } from "@tanstack/react-query";
import { getInvoice, sendInvoiceEmail } from "../utils/api.js";
import { getInvoices } from "../utils/api.js";

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

export const useGetSingleInvoice = (projectId) => {
  return useQuery({
    queryKey: [ "single-ivoice", projectId ],
    queryFn: async () => {
      const response = await getInvoice(projectId);
      return response.data;
    },
    enabled: !!projectId
  })
}

export const useGetInvoices = (admin) => {
  return useQuery({
    queryKey: ["invoices", admin],
    queryFn: async () => {
      const response = await getInvoices(admin);
      return response.data;
    },
    enabled: !!admin,
  });
};