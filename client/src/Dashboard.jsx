import { Outlet, Navigate } from "react-router-dom";
import SidePanel from "./components/SidePanel";
import { useAuth } from "./AuthContext";
import LoadingSpinner from "./components/LoadingSpinner";

function Dashboard() {
  const { loading, admin } = useAuth();

  if (loading)
    return (
      <div className="h-full w-full text-primary-bg text-lg h-screen flex items-center justify-center">
        <div className="size-12">
          <LoadingSpinner />
        </div>
      </div>
    );

  if (admin === null)
    return (
      <div className="h-screen flex items-center justify-center">
        Checking Authentication...
      </div>
    );

  setTimeout(() => {
    if (!admin) {
      return <Navigate to="/login" replace />;
    }
  }, 2000);

  return (
    <div className="h-screen bg-slate-200 grid grid-cols-[auto_1fr]">
      <aside className="w-74 py-1.5 pl-1.5">
        <SidePanel />
      </aside>
      <main className="p-6 h-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
