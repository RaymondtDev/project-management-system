import { useState } from "react";
import MilestoneCard from "./MilestoneCard";
import { FaPlus } from "react-icons/fa";

export default function MilestonesContainer({ milestonesData }) {
  const [displayInpt, setDisplayInpt] = useState(false);

  return (
    <div className="px-4 py-6 bg-white shadow-md rounded-md min-h-0 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary-bg">
      <div className="flex items-center justify-between relative">
        <small className="uppercase">Milestones</small>
        <button onClick={() => setDisplayInpt(!displayInpt)} className="flex items-center gap-2 p-2 bg-primary-bg text-white rounded-full cursor-pointer">
          <FaPlus />
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        { displayInpt && (
          <div className="flex items-center gap-2">
            <input type="text" placeholder="Enter milestone title" className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-bg" />
            <button className="px-4 py-2 bg-primary-bg text-white rounded-md hover:bg-primary-bg/80">Add</button>
            <button onClick={() => setDisplayInpt(false)} className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">Cancel</button>
          </div>
        )}
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
