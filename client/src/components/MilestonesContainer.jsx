import MilestoneCard from "./MilestoneCard";

export default function MilestonesContainer({ milestonesData }) {
  return (
    <div className="px-4 py-6 bg-white shadow-md rounded-md min-h-0 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary-bg">
      <small className="uppercase">Milestones</small>
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
