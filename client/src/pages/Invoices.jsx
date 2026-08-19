import { useGetInvoices } from "../hooks/useInvoice.jsx";
import { useAuth } from "../AuthContext.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

function Invoices() {
  const { admin } = useAuth();
  const { data, isLoading } = useGetInvoices(admin.id);

  if (isLoading)
    return (
      <div className="w-full text-primary-bg text-lg h-full flex items-center justify-center">
        <div className="size-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  
  const invoices = data?.invoices;

  return (  
    <div className="flex flex-col size-full gap-4">
      <h1 className="text-2xl text-primary-bg font-bold mt-2">Invoices</h1>
      { !invoices || invoices?.length === 0 ? (
        <div className="text-primary-bg text-lg h-full w-full flex-1 flex items-center justify-center">
          <p>No invoices found.</p>
        </div>
      ) : (
        <div className="rounded-md overflow-hidden shadow-md">
          <table className="w-full border-collapse table-auto">
            <thead className="bg-primary-bg text-white">
              <tr className="divide-x divide-gray-300">
                <th>Invoice No.</th>
                <th>Project</th>
                <th>Client</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="bg-gray-300">
              { invoices?.map(invoice => (
                <tr className="divide-x divide-gray-400" key={invoice._id}>
                  <td className="font-bold max-w-30 truncate">#{invoice.number}</td>
                  <td className="max-w-60 truncate">{invoice.project.title}</td>
                  <td>{invoice.client.name}</td>
                  <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
                  <td className="capitalize">
                    {invoice.status}
                  </td>
                  <td>R {invoice.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Invoices;