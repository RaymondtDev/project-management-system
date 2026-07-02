import { useState } from "react";
import ProjectsSkeleton from "../components/ProjectsSkeleton";
import { useProjects } from "../hooks/useProjects";
import CreateProject from "../components/CreateProject";
import { useAuth } from "../AuthContext";
import { FaPlus, FaList } from "react-icons/fa";
import { TbLayoutKanbanFilled } from "react-icons/tb";
import StatusIndicators from "../components/StatusIndicators";
import { ToastContainer } from "react-toastify";
import ProjectsList from "../components/ProjectsList";
import KanbanBoard from "../components/KanbanBoard";

function Projects() {
  const { admin } = useAuth();
  const { data, isPending, isError } = useProjects(admin.id);
  const [display, setDisplay] = useState(false);
  const [list, setList] = useState(true);

  if (isPending) return <ProjectsSkeleton />;

  const projects = data.projects.sort((a,b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (a.status !== "active" && b.status === "active") return 1;
    return 0;
  });

  if (isError)
    return (
      <div className="h-screen flex items-center justify-center">
        No Projects Found
      </div>
    );

  return (
    <div className="relative flex flex-col h-full">
      <ToastContainer />
      <div className="flex justify-between">
        <h1 className="text-2xl text-primary-bg font-bold">Projects</h1>
        <button
          onClick={() => setDisplay(true)}
          className="flex items-center gap-1.5 p-1.5 rounded-full bg-primary-bg text-white cursor-pointer transition hover:scale-105"
        >
          <div className="flex items-center justify-center bg-primary-btn p-1.5 rounded-full">
            <FaPlus color="#012100" />
          </div>
          Add Project
        </button>
      </div>
      <div className="my-4 rounded-lg bg-gray-300 flex flex-col flex-1 p-4 h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1 p-1 bg-white rounded-full">
            <button
              className={`${list && "bg-primary-bg"} p-2 rounded-full cursor-pointer`}
              onClick={() => setList(true)}
            >
              <FaList size={15} color={`${list ? "#ffffff" : "#012100"}`} />
            </button>
            <button
              className={`${!list && "bg-primary-bg"} p-2 rounded-full cursor-pointer`}
              onClick={() => setList(false)}
            >
              <TbLayoutKanbanFilled
                size={15}
                color={`${!list ? "#ffffff" : "#012100"}`}
              />
            </button>
          </div>
          <StatusIndicators />
        </div>

        {projects.length > 0 ? (
          <div className="w-full h-full flex-1 overflow-y-auto">
            {list ? (
              <ProjectsList projects={projects} />
            ) : (
              <KanbanBoard projects={projects} />
            )}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p>No Projects Found</p>
          </div>
        )}
      </div>

      {display && (
        <div className="absolute top-0 left-0 w-full h-full px-6 py-4 bg-black/50 backdrop-blur-md rounded-lg overflow-y-hidden">
          <CreateProject display={setDisplay} />
        </div>
      )}
    </div>
  );
}

export default Projects;
