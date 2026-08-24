import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const createAdmin = (username, email, password) =>
  api.post("/admin/create", {
    username,
    email,
    password,
  });

export const adminLogin = (email, password) =>
  api.post("/admin/login", { email, password }, { withCredentials: true });

export const adminLogout = () =>
  api.post("/admin/logout", {}, { withCredentials: true });

export const refreshToken = () =>
  api.post("/auth/refresh", {}, { withCredentials: true });

export const createProject = async (
  adminId,
  projectData,
  clientData,
  milestones,
) => {
  const response = await api.post(
    "/projects",
    {
      adminId,
      project: projectData,
      client: clientData,
      milestones,
    },
    { withCredentials: true },
  );
  return response.data;
};

export const getProjects = (admin) =>
  api.get("/projects", {
    params: { admin },
    withCredentials: true,
  });

export const getProjectById = (id) =>
  api.get("/projects/p", {
    params: { id },
    withCredentials: true,
  });

export const deleteProject = (id) =>
  api.delete("/projects/p/delete", {
    params: { id },
    withCredentials: true,
  });
export const updateProjectStatus = (id, status) =>
  api.put(
    "/projects/p/update",
    { status },
    {
      params: { id },
      withCredentials: true,
    },
  );

export const updateTaskStatus = (id, status) =>
  api.put(
    "/tasks/t/update",
    { status },
    {
      params: { id },
      withCredentials: true,
    },
  );

export const getInvoice = (projectId) =>
  api.get("/invoices/single", {
    params: { projectId },
    withCredentials: true
  })

export const getInvoices = (admin) =>
  api.get("/invoices", {
    params: { admin },
    withCredentials: true,
  });

export const sendInvoiceEmail = (projectId) =>
  api.post(
    "/invoices/send",
    {},
    {
      params: { projectId },
      withCredentials: true
    }
  );

export const downloadInvoice = (projectId) =>
  api.get("/invoices/download", {
    params: { projectId },
    withCredentials: true,
    responseType: "blob"
  });


export const createMilestone = (title, projectId) => 
  api.post(
    "/milestones",
    { title, projectId },
    {
      withCredentials: true
    }
  )

export const deleteMilestone = (milestoneId) =>
  api.delete("/milestones/m/delete", {
    params: { milestoneId },
    withCredentials: true
  })