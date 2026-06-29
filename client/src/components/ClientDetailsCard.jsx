export default function ClientDetailsCard({ client }) {
  return (
    <div className="px-4 py-6 bg-primary-bg shadow rounded-md text-white">
      <small className="uppercase">Client Details</small>
      <div className="flex gap-3 items-center mt-4">
        <div className="flex items-center justify-center w-14 aspect-square rounded-md bg-secondary-bg text-xl">
          {client.name ? client.name[0].toUpperCase() : "?"}
        </div>
        <div>
          <p className="text-xl font-bold">{client.name || "Client Name"}</p>
          <p>{client.email || "clientname@gmail.com"}</p>
        </div>
      </div>
    </div>
  );
}
