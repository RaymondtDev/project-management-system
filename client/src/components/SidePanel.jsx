import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdLogout, MdSpaceDashboard } from "react-icons/md";
import { AiFillProject } from "react-icons/ai";
import { adminLogout } from "../utils/api";

function SidePanel() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await adminLogout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="bg-linear-to-bl from-primary-bg to-secondary-bg text-white px-2 py-6 h-full rounded-lg flex flex-col justify-between">
      <nav className="flex flex-col gap-2">
        <h1 className="logo text-lg font-bold mb-4 flex items-center">
          <img className="w-8 h-8" src="/logo.svg" alt="Logo" />
          antage
        </h1>
        <Link
          to="/"
          className={`group flex items-center gap-4 py-2 rounded-md px-2 transition hover:text-primary-bg hover:font-lightbold hover:bg-white ${location.pathname === "/" && "bg-white text-primary-bg font-lightbold"}`}
        >
          <MdSpaceDashboard
            className="transition group-hover:fill-primary-bg"
            color={`${location.pathname === "/" ? "#012100" : "#ffffff"}`}
            size={25}
          />
          Dashboard
        </Link>
        <Link
          to="/projects"
          className={`group flex items-center gap-4 py-2 rounded-md px-2 transition hover:text-primary-bg hover:font-lightbold hover:bg-white ${location.pathname === "/projects" && "bg-white text-primary-bg font-lightbold"}`}
        >
          <AiFillProject className="transition group-hover:fill-primary-bg" color={`${location.pathname === "/projects" ? "#012100" : "#ffffff"}`} size={25}

 />
          Projects
        </Link>
      </nav>
      <button
        className="text-lime-100 text-center p-2 border-2 border-secondary-bg rounded-full w-full bg-primary-bg/50 backgrop-blur-md flex items-center gap-2 justify-center cursor-pointer transition hover:scale-[102%]"
        onClick={handleLogout}
      >
        <div>
          <MdLogout color="#00FF00" />
        </div>
        Logout
      </button>
    </div>
  );
}

export default SidePanel;
