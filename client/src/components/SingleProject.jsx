import { useParams } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import LoadingSpinner from "./LoadingSpinner";
import ProjectDetailsCard from "./ProjectDetailsCard";
import ProjectStatsCard from "./ProjectStatsCard";
import MilestonesContainer from "./MilestonesContainer";
import ClientDetailsCard from "./ClientDetailsCard";
import { ToastContainer } from "react-toastify";

export default function SingleProject() {
  const { id } = useParams();
  const { data, isPending, isError } = useProject(id);

  if (isPending)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <LoadingSpinner />
      </div>
    );

  if (isError) return <p>An error occured...</p>;

  const project = data.project;
  const client = project.client;
  const milestones = project.milestones;

  return (
    <div className="h-full">
      <ToastContainer />
      <div className="grid grid-cols-2 gap-x-4 h-full">
        <div className="flex flex-col gap-4 h-full min-h-0">
          <ProjectDetailsCard projectData={project} />
          <ProjectStatsCard projectData={project} milestonesData={milestones} />
        </div>
        <div className="flex flex-col gap-4 h-full min-h-0">
          <ClientDetailsCard client={client} />
          <MilestonesContainer milestonesData={milestones} />
        </div>
      </div>
    </div>
  );
}
