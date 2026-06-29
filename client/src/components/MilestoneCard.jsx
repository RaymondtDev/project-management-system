import { useState } from "react";
import TaskRow from "./TaskRow";

export default function MilestoneCard({ milestone, index }) {
  const tasks = milestone.tasks;
  const [display, setDisplay] = useState(false);

  return (
    <div
      className="transform-3d bg-primary-bg text-white relative border-2 border-primary-bg rounded-md"
    >
      <div onClick={() => setDisplay(!display)} className="flex items-center gap-2 z-20 p-2 bg-primary-bg cursor-pointer">
        <div className="size-8 bg-linear-120 from-secondary-bg to-tertiary-bg rounded-full flex items-center justify-center">
          {index + 1}
        </div>
        <h3>{milestone.title}</h3>
      </div>
      <div
        className={`p-2 transition ease-in-out duration-300 -z-20 flex-col gap-2 ${display ? "opacity-100 flex" : "opacity-0 hidden"}`}
      >
        {tasks?.map((task) => (
          <TaskRow taskData={task} key={task._id} />
        ))}
      </div>
    </div>
  );
}
