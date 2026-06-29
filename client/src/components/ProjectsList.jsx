import { useAuth } from "../AuthContext";
import ProjectRow from "./ProjectRow";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteProject, updateProjectStatus } from "../utils/api";
import { toast } from "react-toastify";

export default function ProjectsList({ projects }) {
  const { admin } = useAuth();
  const notify = (message) => toast(message);
  const adminId = admin.id;

  const queryClient = useQueryClient();
  const deleteProjectMutation = useMutation({
    mutationFn: (id) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", adminId],
      });
      notify("Project deleted");
    },
    onError: () => notify("An error occured when deleting project"),
  });
  const cancelProjectMutaion = useMutation({
    mutationFn: (payload) => updateProjectStatus(payload.id, payload.status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", adminId],
      });
      notify("Project cancelled");
    },
    onError: () => notify("An error occured when cancelling project"),
  });

  const handleDelete = (id) => {
    deleteProjectMutation.mutate(id);
  };
  const handleCancel = (id, status) => {
    const payload = { id, status };
    cancelProjectMutaion.mutate(payload);
  };

  return (
    <>
      {projects.map((project) => (
        <ProjectRow
          projectData={project}
          deleteFunc={handleDelete}
          cancelFunc={handleCancel}
          key={project._id}
        />
      ))}
    </>
  );
}
