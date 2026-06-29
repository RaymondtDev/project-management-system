import KanbanProjectCard from "./KanbanProjectCard";

export default function KanbanBoard({ projects }) {
  const activeProjects = projects.filter(
    (project) => project.status === "active",
  );
  const onHoldProjects = projects.filter(
    (project) => project.status === "on-hold",
  );
  const completeProjects = projects.filter(
    (project) => project.status === "complete",
  );
  const planningProjects = projects.filter(
    (project) => project.status === "planning",
  );

  return (
    <div className="grid grid-cols-4 gap-2 h-full">
      <div className="bg-gray-100 rounded-md h-full flex flex-col">
        <div className="bg-[#0b80f4] text-center py-2 text-white rounded-t-md">
          Active
        </div>
        <div className="p-1 flex flex-col flex-1 gap-3 overflow-y-auto scrollbar-none">
          {activeProjects?.map((project) => (
            <KanbanProjectCard projectData={project} key={project._id} />
          ))}
        </div>
      </div>
      <div className="bg-gray-100 rounded-md h-full flex flex-col">
        <div className="bg-[#63adf8] text-center py-2 text-white rounded-t-md">
          On-Hold
        </div>
        <div className="p-1 flex flex-col flex-1 gap-3 overflow-y-auto scrollbar-none">
          {onHoldProjects?.map((project) => (
            <KanbanProjectCard projectData={project} key={project._id} />
          ))}
        </div>
      </div>
      <div className="bg-gray-100 rounded-md h-full flex flex-col">
        <div className="bg-[#07C700]  text-center py-2 text-white rounded-t-md">
          Complete
        </div>
        <div className="p-1 flex flex-col flex-1 gap-3 overflow-y-auto scrollbar-none">
          {completeProjects?.map((project) => (
            <KanbanProjectCard projectData={project} key={project._id} />
          ))}
        </div>
      </div>
      <div className="bg-gray-100 rounded-md h-full flex flex-col">
        <div className="bg-[#6b6666] text-center py-2 text-white rounded-t-md">
          Planning
        </div>
        <div className="p-1 flex flex-col flex-1 gap-3 overflow-y-auto scrollbar-none">
          {planningProjects?.map((project) => (
            <KanbanProjectCard projectData={project} key={project._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
