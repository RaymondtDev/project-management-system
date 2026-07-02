import { useProjects } from "../hooks/useProjects";
import { useAuth } from "../AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

function DashboardHome() {
  const { admin } = useAuth();
  const adminId = admin?.id;
  const { data, isLoading } = useProjects(adminId);

  if (isLoading)
    return (
      <div className="h-full w-full text-primary-bg text-lg h-screen flex items-center justify-center">
        <div className="size-12">
          <LoadingSpinner />
        </div>
      </div>
    );

  const projects = data?.projects;
  const totalProjects = projects?.length;
  const completedProjects = projects?.filter((p) => p.status === "completed").length;
  const activeProjects = projects?.filter((p) => p.status === "active").length;
  const pendingProjects = projects?.filter((p) => p.status === "pending").length;

  return (
    <div className="flex flex-col h-full">
      <div className="py-3 px-2">
        <p>Welcome back, {admin.username}</p>
      </div>
      <div className="bg-gray-300 p-2 flex-1 rounded-md grid grid-cols-4 grid-rows-4 gap-2">
        {/* Project Stats */}
        <div className="col-span-4 grid grid-cols-subgrid gap-2">
          <div className="text-white px-4 py-6 rounded-md shadow-md bg-linear-90 from-secondary-bg to-tertiary-bg">
            <h4 className="mb-4">Total Projects</h4>
            <p className="text-4xl">{totalProjects}</p>
          </div>
          <div className="px-4 py-6 rounded-md shadow-md bg-white">
            <h4 className="mb-4">Completed Projects</h4>
            <p className="text-4xl">{completedProjects}</p>
          </div>
          <div className="px-4 py-6 rounded-md shadow-md bg-white">
            <h4 className="mb-4">Active Projects</h4>
            <p className="text-4xl">{activeProjects}</p>
          </div>
          <div className="px-4 py-6 rounded-md shadow-md bg-white">
            <h4 className="mb-4">Pending Projects</h4>
            <p className="text-4xl">{pendingProjects}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
