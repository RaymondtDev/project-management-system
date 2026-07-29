export default function ClientDetailsCard({ client, project }) {
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
          <button className="py-2 px-4 bg-linear-120 from-secondary-bg to-tertiary-bg rounded-md cursor-pointer mt-5 transition hover:scale-105">
            Send Invoice
          </button>
        )}
      </div>
    </div>
  );
}
