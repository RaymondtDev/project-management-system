import { useState } from "react";
import MilestoneCard from "./MilestoneCard";

export default function MilestonesContainer({ milestonesData }) {
  const [display, setDisplay] = useState(false);

  return (
    <div className="px-4 py-6 bg-white shadow-md rounded-md min-h-0 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary-bg">
      <div className="flex items-center justify-between relative">
        <small className="uppercase">Milestones</small>
        <div className="size-7 flex flex-col items-center justify-center gap-0.5 cursor-pointer rounded-full hover:bg-gray-200" onClick={() => setDisplay(!display)}>
          <span className="size-1 rounded-full bg-black"></span>
          <span className="size-1 rounded-full bg-black"></span>
          <span className="size-1 rounded-full bg-black"></span>
        </div>
        <div className={`${!display && "hidden"} bg-gray-50 p-2 rounded-sm absolute top-[110%] right-2.5 z-40 shadow-lg`}>
          <small>Add Milestone</small>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {milestonesData?.map((milestone, index) => (
          <MilestoneCard
            milestone={milestone}
            index={index}
            key={milestone._id}
          />
        ))}
      </div>
    </div>
  );
}
