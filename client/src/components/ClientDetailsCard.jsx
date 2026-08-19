import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { downloadInvoice, sendInvoiceEmail } from "../utils/api.js";
import { FaDownload } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { useGetSingleInvoice } from "../hooks/useInvoice.jsx";

export default function ClientDetailsCard({ client, project }) {
  const notify = (message) => toast(message);
  const queryClient = useQueryClient();
  const projectId = project._id;

  const { data } = useGetSingleInvoice(projectId);
  console.log(data)

  const invoiceData = data?.invoice;

  const sendInvoice = useMutation({
    mutationFn: (projectId) => sendInvoiceEmail(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoice", projectId] });
      notify("Invoice sent successfully!");
    },
    onError: (error) => {
      notify(`Error sending invoice: ${error.message}`);
    }
  })

  const handleSendInvoice = async () => {
    sendInvoice.mutate(projectId);
  }

  const handleDownload = async () => {
    try {
      const response = await downloadInvoice(projectId);

      const fileBlob = new Blob([response.data], { type: "application/pdf" });
      const fileUrl = window.URL.createObjectURL(fileBlob);

      const link = document.createElement("a");
      link.href = window.open(fileUrl, '_blank');

      link.setAttribute('download', `${invoiceData.number}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(fileUrl);

    } catch (error) {
      console.error("Error downloading pdf:", error)
    }
  }

  return (
    <div className="px-4 py-6 bg-primary-bg shadow rounded-md text-white h-fit">
      <small className="uppercase">Client Details</small>
      <div className="flex gap-3 items-center mt-4">
        <div className="flex items-center justify-center w-14 aspect-square rounded-md bg-secondary-bg text-xl">
          {client.name ? client.name[0].toUpperCase() : "?"}
        </div>
        <div>
          <p className="text-xl font-bold">{client.name || "Client Name"}</p>
          <p>{client.email || "clientname@gmail.com"}</p>
          <small>{client.phone || "(+27)71 234 5678"}</small>
        </div>
      </div>
      <div>
        { project.status === "completed" && (
          <div className="flex gap-4 mt-5">
            <button className="flex items-center gap-2 py-2 px-4 bg-linear-120 from-secondary-bg to-tertiary-bg rounded-md cursor-pointer transition hover:scale-105 flex items-center justify-center" onClick={handleSendInvoice}>
              <IoIosSend size={23} />
              { sendInvoice.isPending ? "Sending..." : "Send Invoice" }
            </button>
            <button onClick={handleDownload} className=" flex items-center gap-2 py-2 px-4 bg-white text-primary-bg rounded-md cursor-pointer transition hover:scale-105">
              <FaDownload />
              Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
