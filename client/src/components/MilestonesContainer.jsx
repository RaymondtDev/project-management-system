import MilestoneCard from "./MilestoneCard";

export default function MilestonesContainer({ milestonesData }) {
  return (
    <div className="flex flex-col px-4 py-6 bg-white shadow-md rounded-md h-full">
      <small className="uppercase">Milestones</small>
      <div className="mt-4 flex-1 overflow-y-auto">
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
