import { useAuth } from "../AuthContext";

function DashboardHome() {
  const { admin } = useAuth();

  return (
    <div>
      <h1 className="text-2xl text-primary-bg font-bold">
        Welcome Back, {admin.username}
      </h1>
    </div>
  );
}

export default DashboardHome;
