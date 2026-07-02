import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";

export default function ProjectRow({ projectData, deleteFunc, cancelFunc }) {
  let statusColor;
  const options = { year: "numeric", month: "long", day: "numeric" };
  const dueDate = new Date(projectData.dueDate).toLocaleDateString(
    "en-GB",
    options,
  );

  switch (projectData.status) {
    case "planning":
      statusColor = "6b6666";
      break;
    case "active":
      statusColor = "0b80f4";
      break;
    case "on-hold":
      statusColor = "63adf8";
      break;
    case "completed":
      statusColor = "07C700";
      break;
    case "cancelled":
      statusColor = "ff0000";
      break;
  }

  const getProjectStatus = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diffInDays = Math.floor((due - today) / (1000 * 60 * 60 * 24));

    if (diffInDays < 0) return "overdue";
    if (diffInDays <= 3) return "due-soon";
    return "on-track";
  };
  const status = getProjectStatus(projectData.dueDate);

  return (
    <div
      className={`flex justify-between items-center px-4 py-1.5 bg-white rounded-full mb-4 ${projectData.status === "cancelled" && "border-2 border-red-600"}`}
    >
      <Link
        to={`/projects/p/${projectData._id}`}
        key={projectData._id}
        className=""
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 bg-[#${statusColor}] rounded-full mr-2`}
          ></div>
          <div className="mr-4">
            <p className="font-bold text-primary-bg truncate w-96 capitalize">
              {projectData.title}
            </p>
            <p className="truncate w-96 capitalize">
              {projectData.description}
            </p>
          </div>
          {projectData.status === "cancelled" ? (
            <p className="bg-red-600 text-white rounded-full p-1 px-2">
              Cancelled
            </p>
          ) : (
            <div
              className={`p-1 px-1.5 rounded-full ${projectData.status === "completed" ? "bg-primary-bg text-white" : status === "due-soon" ? "bg-orange-400 text-white" : status === "overdue" ? "bg-red-600 text-white" : status === "on-track" && "bg-tertiary-bg text-white"}`}
            >
              {projectData.status === "completed" ? "Completed" : status === "overdue" ? `Overdue: ${dueDate}` : `Due: ${dueDate}`}
            </div>
          )}
        </div>
      </Link>
      <div className="flex gap-2">
        <div
          onClick={() => deleteFunc(projectData._id)}
          className="group relative cursor-pointer flex items-center justify-center"
        >
          <FaTrash color="#012100" />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-800/50 p-0.5 px-1 mb-0.5 rounded-full text-white scale-0 transition-all group-hover:scale-80 text-xs">
            delete
          </span>
        </div>
        {projectData.status === "cancelled" || projectData.status === "completed" ? (
          <div />
        ) : (
          <div
            onClick={() => cancelFunc(projectData._id, "cancelled")}
            className="group relative cursor-pointer flex items-center justify-center"
          >
            <FcCancel size={20} />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-800/50 p-0.5 px-1 mb-0.5 rounded-full text-white scale-0 transition-all group-hover:scale-80 text-xs">
              cancel
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
