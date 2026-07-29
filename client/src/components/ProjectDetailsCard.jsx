import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCalendar, FaPause, FaPlay } from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";
import { updateProjectStatus } from "../utils/api";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";

export default function ProjectDetailsCard({ projectData }) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const dueDate = new Date(projectData.dueDate).toLocaleDateString(
    "en-US",
    options,
  );
  const projectId = projectData._id;

  let statusColor;
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

  const notify = (message) => toast(message);

  const queryClient = useQueryClient();
  const projectStatusMutation = useMutation({
    mutationFn: (payload) => updateProjectStatus(payload.id, payload.status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
      notify("Project status updated!");
    },
  });

  const handleStatusChange = (id, status) => {
    const payload = { id, status };
    projectStatusMutation.mutate(payload);
  };

  return (
    <div className="bg-white px-4 py-6 rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <div
          className={`flex-1 flex items-center gap-2 mb-2 py-1 px-1.5 rounded-full w-fit`}
        >
          <div className={`size-2 bg-[#${statusColor}] rounded-full`} />
          <small className="capitalize">{projectData.status}</small>
        </div>
        {projectStatusMutation.isPending ? (
            <div className="size-7">
              <LoadingSpinner />
            </div>
          ) : projectData.status === "active" ? (
            <button onClick={() => handleStatusChange(projectData._id, "on-hold")} className="cursor-pointer">
              <FaPause size={15} />
            </button>
          ) : projectData.status === "on-hold" && (
            <button onClick={() => handleStatusChange(projectData._id, "active")} className="cursor-pointer">
              <FaPlay size={15} />
            </button>
          )
        }
      </div>
      <div className="mb-4">
        <h2 className="mb-1 text-primary-bg">{projectData.title}</h2>
        <p>{projectData.description}</p>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <FaCalendar size={10} color="#012100" />
          <small>{dueDate}</small>
        </div>
        <div className="flex items-center gap-3">
          <ImPriceTag size={10} color="#012100" />
          <small>R {projectData.price}</small>
        </div>
      </div>
    </div>
  );
}
