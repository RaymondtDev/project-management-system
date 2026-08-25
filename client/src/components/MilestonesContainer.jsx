import { useState } from "react";
import MilestoneCard from "./MilestoneCard";
import { FaPlus } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMilestone, updateMilestone } from "../utils/api";
import { toast } from "react-toastify";
import { deleteMilestone } from "../utils/api";

export default function MilestonesContainer({ milestonesData, projectId }) {
  const [displayInpt, setDisplayInpt] = useState(false);
  const [title, setTitle] = useState(null);
  const notify = (message) => toast(message);

  const queryClient = useQueryClient();

  const addMilestone = useMutation({
    mutationFn: (payload) =>
      createMilestone(payload.title, payload.projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId]
      });
      notify("New milestone added")
    },
    onError: () => notify("Error adding milestone")
  })

  const delMilestone = useMutation({
    mutationFn: (milestoneId) => deleteMilestone(milestoneId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId]
      });
      notify("Milestone deleted")
    },
    onError: () => notify("Error when deleting milestone")
  })

  const updateMilestoneTitle = useMutation({
    mutationFn: (payload) => updateMilestone(payload.title, payload.milestoneId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId]
      });
      notify("Milestone title updated successfully")
    },
    onError: () => notify("Error when updating milestone title")
  })

  const handleUpdateMilestone = (title, milestoneId) => {
    const payload = { title, milestoneId }
    updateMilestoneTitle.mutate(payload)
  }

  const handleDelMilestone = (milestoneId) => {
    delMilestone.mutate(milestoneId);
  }

  const handleSubmit = () => {
    const payload = { title, projectId };
    if (title !== null) addMilestone.mutate(payload);
  }

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
            <input type="text" placeholder="Enter milestone title" onChange={(e) => setTitle(e.target.value)} className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-bg" />
            <button className="px-4 py-2 bg-primary-bg text-white rounded-md hover:bg-primary-bg/80" onClick={handleSubmit}>Add</button>
            <button onClick={() => setDisplayInpt(false)} className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">Cancel</button>
          </div>
        )}
        {milestonesData?.map((milestone) => (
          <MilestoneCard
            milestone={milestone}
            key={milestone._id}
            projectId={projectId}
            deleteFunc={handleDelMilestone}
            updateFunc={handleUpdateMilestone}
          />
        ))}
      </div>
    </div>
  );
}
