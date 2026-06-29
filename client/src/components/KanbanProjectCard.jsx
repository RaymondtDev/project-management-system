import { FaCalendar } from "react-icons/fa";

export default function KanbanProjectCard({ projectData }) {
  const options = { day: "numeric", month: "long" };
  const dueDate = new Date(projectData.dueDate).toLocaleString(
    "en-US",
    options,
  );

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
      className={`isolate bg-white rounded-t-md p-2 relative shadow before:content[''] ${status === "overdue" ? "before:bg-red-600" : status === "due-soon" ? "before:bg-orange-400" : status === "on-track" && "before:bg-tertiary-bg"} before:absolute before:top-full before:left-0 before:w-full before:p-1 before:rounded-b-md`}
    >
      <div className="h-1 w-full bg-gray-300/50 rounded-full mb-1">
        <div
          className="h-full bg-tertiary-bg rounded-full"
          style={{ width: `${projectData.progress}%` }}
        ></div>
      </div>
      <p className="font-bold capitalize">{projectData.title}</p>
      <p className="text-gray-700 text-sm capitalize line-clamp-2">
        {projectData.description}
      </p>
      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-1.5 bg-gray-200/50 text-gray-600 py-1 px-1.5 w-fit rounded-xs">
          <FaCalendar size={10} color="#4a5565" />
          <small className="text-xs">{dueDate}</small>
        </div>
      </div>
    </div>
  );
}
