import { useState } from "react";
import TaskRow from "./TaskRow";
import { RxCross2, RxCheck } from "react-icons/rx";

export default function MilestoneCard({ milestone, index }) {
  const tasks = milestone.tasks;
  const [display, setDisplay] = useState(false);
  const [menuDis, setMenuDis] = useState(false);
  const [displayInpt, setDisplayInpt] = useState(false);
  const [milestoneTitleInpt, setMilestoneTitleInpt] = useState(false);
  const [milestoneTitle, setMilestoneTitle] = useState(milestone.title);

  return (
    <div
      className="transform-3d bg-primary-bg text-white relative border-2 border-primary-bg rounded-md"
    >
      <div className="flex items-center justify-between p-2 bg-primary-bg relative">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-linear-120 from-secondary-bg to-tertiary-bg rounded-full flex items-center justify-center">
            {index + 1}
          </div>
          { milestoneTitleInpt ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={milestoneTitle}
                onChange={(e) => setMilestoneTitle(e.target.value)}
                className="p-1 rounded-full text-white bg-white/20 backdrop-blur-md"
                style={{ borderRadius: "100px" }}
              />
              <button
                onClick={() => setMilestoneTitleInpt(false)}
                className="p-2 bg-tertiary-bg text-white rounded-full hover:bg-secondary-bg/80"
              >
                <RxCheck />
              </button>
              <button
                onClick={() => setMilestoneTitleInpt(false)}
                className="p-2 bg-gray-300 text-black rounded-full hover:bg-gray-400"
              >
                <RxCross2 />
              </button>
            </div> ) : (
              <h3 className="cursor-pointer" onClick={() => setDisplay(!display)}>
                {milestone.title}
              </h3>
            )
          }
        </div>
        <div>
          <div className="size-7 flex flex-col items-center justify-center gap-0.5 cursor-pointer rounded-full" onClick={() => setMenuDis(!menuDis)}>
            <span className="size-1 rounded-full bg-white"></span>
            <span className="size-1 rounded-full bg-white"></span>
            <span className="size-1 rounded-full bg-white"></span>
          </div>
          <div className={`${!menuDis && "hidden"} bg-gray-50 text-black p-2 rounded-sm absolute bottom-[35%] right-10 z-50 shadow-lg flex flex-col gap-1`}>
            <small className="hover:bg-gray-200 cursor-pointer p-1" onClick={() => setDisplayInpt(!displayInpt)}>Add Task</small>
            <small className="hover:bg-gray-200 cursor-pointer p-1" onClick={() => setMilestoneTitleInpt(!milestoneTitleInpt)}>Edit Title</small>
            <small className="hover:bg-gray-200 cursor-pointer p-1">Delete Milestone</small>
          </div>
        </div>
      </div>
      <div
        className={`p-2 transition ease-in-out duration-300 -z-20 flex-col gap-2 ${display ? "opacity-100 flex" : "opacity-0 hidden"}`}
      >
        { displayInpt && (
          <div className="flex items-center gap-2 bg-white p-2 rounded-full">
            <input type="text" placeholder="Enter Task Title" className="rounded-full border-2 border-secondary-bg text-black" style={{ borderRadius: "100px" }} />
            <button className="p-2 bg-secondary-bg text-white rounded-full hover:bg-primary-bg/80 cursor-pointer">
              <RxCheck />
            </button>
            <button onClick={() => setDisplayInpt(false)} className="p-2 bg-gray-300 text-black rounded-full hover:bg-gray-400 cursor-pointer">
              <RxCross2 />
            </button>
          </div>
        )}
        {tasks?.map((task) => (
          <TaskRow taskData={task} key={task._id} />
        ))}
      </div>
    </div>
  );
}
