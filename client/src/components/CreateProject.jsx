import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RxCross2 } from "react-icons/rx";
import {
  IoIosCheckmark,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";
import { FaPlus, FaProjectDiagram } from "react-icons/fa";
import { toast } from "react-toastify";
import Field from "./Field";
import { createProject } from "../utils/api";
import LoadingSpinner from "./LoadingSpinner";

const initialMilestone = () => ({
  title: "",
  tasks: [{ title: "" }],
});

function CreateProject({ display }) {
  const { admin } = useAuth();
  const adminId = admin.id;

  const [step, setStep] = useState(0);
  const [project, setProject] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [client, setClient] = useState({
    name: "",
    email: "",
  });
  const [milestones, setMilestones] = useState([initialMilestone()]);
  const steps = ["Project", "Client", "Milestones"];

  const notify = (message) => toast(message);

  const updateProject = (key, val) => setProject((p) => ({ ...p, [key]: val }));
  const updateClient = (key, val) => setClient((c) => ({ ...c, [key]: val }));

  const addMilestone = () => setMilestones((m) => [...m, initialMilestone()]);
  const removeMilestone = (index) =>
    setMilestones((m) => m.filter((_, i) => i !== index));
  const updateMilestone = (index, key, val) =>
    setMilestones((m) =>
      m.map((ms, i) => (i === index ? { ...ms, [key]: val } : ms)),
    );
  const addTask = (msIndex) =>
    setMilestones((m) =>
      m.map((ms, i) =>
        i === msIndex ? { ...ms, tasks: [...ms.tasks, { title: "" }] } : ms,
      ),
    );
  const removeTask = (msIndex, taskIndex) =>
    setMilestones((m) =>
      m.map((ms, i) =>
        i === msIndex
          ? { ...ms, tasks: ms.tasks.filter((_, tI) => tI !== taskIndex) }
          : ms,
      ),
    );
  const updateTask = (msIndex, taskIndex, val) =>
    setMilestones((ms) =>
      ms.map((m, i) =>
        msIndex === i
          ? {
              ...m,
              tasks: m.tasks.map((t, tI) =>
                tI === taskIndex ? { ...t, title: val } : t,
              ),
            }
          : m,
      ),
    );

  const clearInputs = () => {
    setProject({
      title: "",
      description: "",
      dueDate: "",
    });
    setClient({
      name: "",
      email: "",
    });
    setMilestones([initialMilestone()]);
  };

  const queryClient = useQueryClient();

  const addProject = useMutation({
    mutationFn: (payload) =>
      createProject(
        payload.adminId,
        payload.project,
        payload.client,
        payload.milestones,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", adminId],
      });
      notify("Project created!");
      clearInputs();
    },
    onError: () => {
      notify("Something went wrong, project not created");
    },
  });

  const handleSubmit = () => {
    const payload = { adminId, project, client, milestones };
    addProject.mutate(payload);
    console.log(payload);
  };

  if (addProject.isPending) return (
    <div className="h-full w-full text-primary-bg text-lg flex items-center justify-center">
      <div className="size-12">
        <LoadingSpinner />
      </div>
    </div> 
  )

  return (
    <div className="pop-in relative h-full scrollbar-thumb-secondary-bg px-8 pt-8 bg-white rounded-md overflow-x-auto">
      <div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 mb-6">
            <FaProjectDiagram color={"#047900"} size={35} />
            <h1>Create Project</h1>
          </div>
          <button
            className="cursor-pointer transition hover:scale-105"
            onClick={() => display(false)}
          >
            <RxCross2 size={30} />
          </button>
        </div>
        <div className="flex gap-2.5">
          {steps.map((s, i) => (
            <p
              key={s}
              className={`flex items-center justify-center gap-2 cursor-pointer p-2 text-center text-white rounded-md w-full ${i === step ? "bg-linear-150 from-primary-bg to-secondary-bg outline-2 outline-primary-bg outline-offset-2" : "bg-linear-150 from-secondary-bg to-lime-100"}`}
              onClick={() => setStep(i)}
            >
              {i < step ? (
                <span className="bg-linear-150 from-primary-bg to-secondary-bg rounded-full">
                  <IoIosCheckmark size={20} />
                </span>
              ) : (
                <span>{i + 1}</span>
              )}
              {s}
            </p>
          ))}
        </div>
        <div className="relative h-1 w-full bg-green-300/30 rounded-full mt-2">
          <div
            className="h-full bg-linear-150 from-secondary-bg to-lime-100 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div key={step} className="slide-in" style={{ paddingBlock: "10px" }}>
        {step === 0 && (
          <div>
            <h2>Project Details</h2>
            <Field
              label="Project Title"
              placeholder="e.g. Website Redesign"
              value={project.title}
              onChange={(val) => updateProject("title", val)}
            />
            <Field
              label="Description"
              placeholder="Brief description of the project"
              value={project.description}
              onChange={(val) => updateProject("description", val)}
              textArea
            />
            <Field
              label="Due Date"
              type="date"
              value={project.dueDate}
              onChange={(val) => updateProject("dueDate", val)}
            />
          </div>
        )}

        {step === 1 && (
          <div>
            <h2>Client Details</h2>
            <Field
              label="Client Name"
              placeholder="e.g. John Doe"
              value={client.name}
              onChange={(val) => updateClient("name", val)}
            />
            <Field
              label="Client Email"
              type="email"
              placeholder="e.g. clientname@gmail.com"
              value={client.email}
              onChange={(val) => updateClient("email", val)}
            />
            <div className="p-4 bg-linear-150 from-primary-bg to-secondary-bg shadow rounded-md mt-2">
              <div className="flex gap-3 items-center text-white">
                <div className="flex items-center justify-center w-14 aspect-square rounded-full bg-linear-45 from-secondary-bg to-primary-bg border-1 border-lime-100">
                  {client.name ? client.name[0].toUpperCase() : "?"}
                </div>
                <div>
                  <h3>{client.name || "Client Name"}</h3>
                  <p>{client.email || "clientname@gmail.com"}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="flex justify-between mb-2">
              <h2>Milestones</h2>
              <div
                className="w-10 aspect-square flex items-center justify-center bg-primary-bg rounded-full cursor-pointer transition hover:scale-105"
                onClick={addMilestone}
              >
                <FaPlus color={"white"} size={10} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1 px-2">
              {milestones.map((ms, i) => (
                <div
                  key={i}
                  className="relative text-white bg-primary-bg px-2 pt-8 pb-2 rounded-md"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <p>M{i + 1}</p>
                    <Field
                      placeholder="Milestone Title"
                      value={ms.title}
                      onChange={(val) => updateMilestone(i, "title", val)}
                    />
                    {milestones.length > 1 && (
                      <button
                        className="absolute top-2 right-2 cursor-pointer"
                        onClick={() => removeMilestone(i)}
                      >
                        <RxCross2 />
                      </button>
                    )}
                  </div>
                  <div>
                    {ms.tasks.map((t, ti) => (
                      <div key={ti} className="relative mb-1">
                        <Field
                          placeholder={`Task ${ti + 1}`}
                          value={t.title}
                          onChange={(val) => updateTask(i, ti, val)}
                        />
                        {ms.tasks.length > 1 && (
                          <button
                            className="absolute top-4 right-2 cursor-pointer"
                            onClick={() => removeTask(i, ti)}
                          >
                            <RxCross2 />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      className="cursor-pointer py-2 px-4 rounded-md transition hover:scale-105 bg-white text-primary-bg w-full mt-2"
                      onClick={() => addTask(i)}
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between sticky bottom-0 bg-white/30 backdrop-blur-md px-2 pb-8 pt-2">
        {step > 0 ? (
          <button
            className="form-btn bg-primary-bg flex items-center gap-2"
            onClick={() => setStep((s) => s - 1)}
          >
            <IoIosArrowBack size={20} />
            Back
          </button>
        ) : (
          <div />
        )}
        {step < steps.length - 1 ? (
          <button
            className="form-btn bg-primary-bg flex items-center gap-2"
            onClick={() => setStep((s) => s + 1)}
          >
            Next
            <IoIosArrowForward size={20} />
          </button>
        ) : (
          <button
            className="form-btn bg-linear-45 from-secondary-bg to-primary-bg"
            onClick={handleSubmit}
          >
            &#10022; Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default CreateProject;
