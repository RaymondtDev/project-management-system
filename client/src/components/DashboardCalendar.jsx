import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Link } from "react-router-dom";

export default function DashboardCalendar({projects}) {
  const today = new Date();
  const [date, setDate] = useState(today);


  const filteredProjects = projects.filter((project) => {
    const projectDate = new Date(project.dueDate).toLocaleDateString();
    const formattedDateString = date.toLocaleDateString();

    return projectDate === formattedDateString;
  })

  return (
    <div className="min-h-0 h-full flex flex-col">
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{ monthShort: 'MMM' }}>
          <DateCalendar
            value={dayjs(date)}
            onChange={(newValue) => setDate(newValue.toDate())}
            sx={{
              width: "100%",
              maxWidth: "none",
              height: "100%",
              maxHeight: "none",
              "& .Mui-selected": {
                backgroundColor: "#047900",
                color: "#fff",
                padding: "2px",
              }
            }}
          />
        </LocalizationProvider>
      </div>
      <div className="w-full h-full min-h-0 flex flex-col gap-1 p-2">
        <h4>Due Projects</h4>
        { filteredProjects.length > 0 ? (
          <ul className="list-disc list-inside">
            {filteredProjects.map((project) => (
              <li key={project._id} className="hover:text-secondary-bg">
                <Link to={`/projects/p/${project._id}`} >{project.title}</Link>
              </li>
            ))}
          </ul>
          ) : (
          <div className="h-full min-h-0 flex items-center justify-center">
            <p>No Projects</p>
          </div>
          )
        }
      </div>
    </div>
  )
}