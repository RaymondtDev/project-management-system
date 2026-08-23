import { Outlet, Navigate } from "react-router-dom";
import SidePanel from "./components/SidePanel";
import { useAuth } from "./AuthContext";
import LoadingSpinner from "./components/LoadingSpinner";

function Dashboard() {
  const { admin, loading } = useAuth();

  if (loading)
    return (
      <div className="w-full text-primary-bg text-lg h-screen flex items-center justify-center">
        <div className="size-12">
          <LoadingSpinner />
        </div>
      </div>
    );

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-screen bg-slate-200 grid grid-cols-[auto_1fr]">
      <aside className="w-64 py-3 pl-3">
        <SidePanel />
      </aside>
      <main className="p-3 h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
