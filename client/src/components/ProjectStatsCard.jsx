export default function ProjectStatsCard({ projectData, milestonesData }) {
  return (
    <div className="bg-primary-bg rounded-md px-4 py-6 shadow-md text-white flex-1 flex flex-col min-h-0 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-secondary-bg">
      <small className="uppercase">Overall Progress</small>
      <div>
        <div className="text-9xl bg-linear-60 from-secondary-bg to-chartreuse-100 bg-clip-text text-transparent font-bold mb-3">
          {projectData.progress}%
        </div>
        <div className="h-1 bg-gray-400/30 w-full rounded-full">
          <div className="h-full bg-linear-to-r from-secondary-bg to-tertiary-bg rounded-full" style={{ width: `${projectData.progress}%` }}></div>
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-4 flex-1">
        {milestonesData?.map((milestone, index) => (
          <div
            className="flex items-center justify-between gap-2"
            key={milestone._id}
          >
            <span className="py-1 px-2 bg-secondary-bg flex items-center justify-center w-fit rounded-md">
              M{index + 1}
            </span>
            <div className="h-1 bg-gray-400/30 w-full rounded-full">
              <div className="h-full bg-tertiary-bg rounded-full" style={{ width: `${milestone.progress}%` }}></div>
            </div>
            <span>{milestone.progress}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
