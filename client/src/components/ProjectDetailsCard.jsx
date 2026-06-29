import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCalendar, FaPause, FaPlay } from "react-icons/fa";
import { updateProjectStatus } from "../utils/api";
import { useAuth } from "../AuthContext";

export default function ProjectDetailsCard({ projectData }) {
  const { admin } = useAuth();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const dueDate = new Date(projectData.dueDate).toLocaleDateString(
    "en-US",
    options,
  );
  const adminId = admin._id;

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

  const queryClient = useQueryClient();
  const projectStatusMutation = useMutation({
    mutationFn: (payload) => updateProjectStatus(payload.id, payload.status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project", adminId],
      });
    },
  });

  const handleStatusChange = (id, status) => {
    const payload = { id, status };
    projectStatusMutation.mutate(payload);
  };

  return (
    <div className="bg-white px-4 py-6 rounded-md shadow-md">
      <div
        className={`flex-1 flex items-center gap-2 mb-2 py-1 px-1.5 border-2 rounded-full w-fit`}
        style={{ borderColor: `#${statusColor}` }}
      >
        <div className={`size-2 bg-[#${statusColor}] rounded-full`} />
        <small className="capitalize">{projectData.status}</small>
      </div>
      <div className="mb-4">
        <h2 className="mb-1 text-primary-bg">{projectData.title}</h2>
        <p>{projectData.description}</p>
      </div>
      <div>
        <div className="flex items-center gap-3">
          <FaCalendar size={10} color="#012100" />
          <small>{dueDate}</small>
        </div>
      </div>
    </div>
  );
}
