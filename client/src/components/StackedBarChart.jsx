export default function StackedBarChart({ projects }) {
  const buildChartData = (projects) => {
    const monthMap = {};

    projects.forEach(({ completedAt, status }) => {
      if (!completedAt) return;
      const date = new Date(completedAt);
      const key = date.toLocaleString("en-US", { month: "short" });

      if (!monthMap[key]) monthMap[key] = { month: key, completed: 0, canceled: 0 };
      if (status === "completed") monthMap[key].completed += 1;
      else if (status === "canceled") monthMap[key].canceled += 1;
    })

    const ORDER = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return ORDER.filter((month) => monthMap[month]).map((month) => monthMap[month]);
  }

  const ALL_DATA = buildChartData(projects);

  return (
    <div className="bg-linear-to-br from-primary-bg to-secondary-bg col-span-3 row-span-4"></div>
  );
}