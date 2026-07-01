import { useProjects } from "../hooks/useProjects";
import { useAuth } from "../AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

function DashboardHome() {
  const { admin } = useAuth();
  const adminId = admin?.id;
  const { data, isLoading } = useProjects(adminId);
  const projects = data.projects;

  const totalProjects = projects?.length;
  const completedProjects = projects?.filter((p) => p.status === "completed").length;
  const activeProjects = projects?.filter((p) => p.status === "active").length;
  const pendingProjects = projects?.filter((p) => p.status === "pending").length;

  if (isLoading)
    return (
      <div className="h-full w-full text-primary-bg text-lg h-screen flex items-center justify-center">
        <div className="size-12">
          <LoadingSpinner />
        </div>
      </div>
    );

  return (
    <div>
      <div className="py-3">
        <p>Welcome back, {admin.name}</p>
      </div>
      <div className="bg-gray-300 p-2">
        {/* Project Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="p-4 rounded-md shadow-md bg-linear-90 from-secondary-bg to-tertiary-bg">
            <h3>Total Projects</h3>
            <p className="text-2xl">{totalProjects}</p>
          </div>
          <div className="p-4 rounded-md shadow-md bg-white">
            <h3>Completed Projects</h3>
            <p className="text-2xl">{completedProjects}</p>
          </div>
          <div className="p-4 rounded-md shadow-md bg-white">
            <h3>Active Projects</h3>
            <p className="text-2xl">{activeProjects}</p>
          </div>
          <div className="p-4 rounded-md shadow-md bg-white">
            <h3>Pending Projects</h3>
            <p className="text-2xl">{pendingProjects}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
