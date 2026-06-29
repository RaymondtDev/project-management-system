import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCheck } from "react-icons/fa";
import { updateTaskStatus } from "../utils/api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export default function TaskRow({ taskData }) {
  const { id } = useParams();
  const notify = (message) => toast(message);

  const queryClient = useQueryClient();
  const taskMutation = useMutation({
    mutationFn: (payload) => updateTaskStatus(payload.id, payload.status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project", id],
      });
      notify("Task updated successfully");
    },
    onError: () => notify("An erro occured when updating task"),
  });

  const handleClick = (id, status) => {
    const payload = { id, status };
    taskMutation.mutate(payload);
  };

  return (
    <div
      className={`flex items-center justify-between p-2 bg-white text-black rounded-full cursor-pointer transition hover:-translate-y-0.5 ${taskData.status === "completed" ? "pointer-events-none opacity-40" : ""}`}
      onClick={() => handleClick(taskData._id, "completed")}
    >
      <div className="flex items-center gap-4">
        <div
          className={`size-7 ${taskData.status === "completed" ? "bg-gray-600" : "bg-tertiary-bg"} rounded-full flex items-center justify-center`}
        >
          <FaCheck color="#ffffff" />
        </div>
        <p>{taskData.title}</p>
      </div>
      {taskMutation.isPending && (
        <div className="size-7">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
