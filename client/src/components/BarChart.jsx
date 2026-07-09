import { useState, useRef, useEffect } from "react";

export default function BarChart({ projects }) {
  function buildChartData(projects) {
    const ORDER = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const map = {};
    projects.forEach(({ completedAt, status }) => {
      if (!completedAt || status?.toLowerCase() !== "completed") return;
      const key = new Date(completedAt).toLocaleString("en-GB", { month: "short" });
      if (!map[key]) map[key] = { month: key, completed: 0 };
      map[key].completed++;
    });
    return ORDER.filter(m => map[m]).map(m => map[m]);
  }
  const ALL_DATA = buildChartData(projects);
  const CURRENT_MONTH_IDX = new Date().getMonth();
  const BAR_R = 6;

  const [range,   setRange]   = useState(12);
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [tipPos,  setTipPos]  = useState({ top: 0, left: 0 });

  // Measured height of the plot area
  const [chartH, setChartH] = useState(0);
  const plotRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!plotRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setChartH(entry.contentRect.height);
    });
    ro.observe(plotRef.current);
    return () => ro.disconnect();
  }, []);

  // Windowed data
  const endIdx   = CURRENT_MONTH_IDX;
  const startIdx = Math.max(0, endIdx - range + 1);
  const DATA     = ALL_DATA.slice(startIdx, endIdx + 1);

  // Y-axis scale
  const maxVal = Math.max(...DATA.map(d => d.completed), 1);
  const yMax   = Math.ceil(maxVal / 5) * 5 + 2;
  const yTicks = Array.from({ length: 6 }, (_, i) => Math.round((yMax / 5) * i));

  // Summary stats
  const total = DATA.reduce((a, d) => a + d.completed, 0);
  const avg   = DATA.length ? Math.round(total / DATA.length) : 0;
  const peak  = DATA.reduce((a, d) => d.completed > (a?.completed ?? 0) ? d : a, null);

  const handleBarEnter = (e, d, i) => {
    setHovered(i);
    setTooltip({ d });
    if (cardRef.current) {
      const cr = cardRef.current.getBoundingClientRect();
      const br = e.currentTarget.getBoundingClientRect();
      setTipPos({ top: br.top - cr.top - 8, left: br.left - cr.left + br.width / 2 });
    }
  };

  return (
    // Outer shell: fills whatever grid cell it's placed in
    <div className="w-full h-full bg-primary-bg flex items-center justify-center font-sans rounded-md">

      <div
        ref={cardRef}
        className="relative flex flex-col w-full h-full rounded-2xl border border-[#1a3320] bg-primary-bg p-5 overflow-hidden"
        style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 70% 10%, rgba(22,163,74,0.06) 0%, transparent 70%)" }}
        />

        {/* ── Header ── */}
        <div className="relative flex flex-wrap items-start justify-between gap-3 mb-4 shrink-0">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2d5036] mb-1">
              2026 · Project Outcomes
            </p>
            <h2 className="text-lg font-extrabold tracking-tight text-[#e2efe6]">
              Completed Projects
            </h2>
          </div>

          {/* Summary stats */}
          <div className="flex items-center gap-3 rounded-xl border border-[#1a3320] bg-white/2 px-3.5 py-2">
            <div>
              <div className="text-base font-extrabold leading-none tracking-tight text-tertiary-bg">{total}</div>
              <div className="text-[10px] text-white mt-0.5">Total</div>
            </div>
            <div className="w-px h-7 bg-[#1a3320]" />
            <div>
              <div className="text-base font-extrabold leading-none tracking-tight text-tertiary-bg">{avg}</div>
              <div className="text-[10px] text-white mt-0.5">Avg / mo</div>
            </div>
            <div className="w-px h-7 bg-[#1a3320]" />
            <div>
              <div className="text-base font-extrabold leading-none tracking-tight text-tertiary-bg">
                {peak?.completed ?? "—"}
                <span className="text-[11px] font-semibold text-tertiary-bg ml-1">{peak?.month}</span>
              </div>
              <div className="text-[10px] text-white mt-0.5">Peak</div>
            </div>
          </div>
        </div>

        {/* ── Range toggle ── */}
        <div className="relative flex justify-end mb-4 shrink-0">
          <div className="flex gap-0.5 rounded-[10px] border border-[#1a3320] bg-white/3 p-0.5">
            {[4, 6, 12].map(r => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={[
                  "px-3 py-1 rounded-[7px] text-[11px] font-bold tracking-wider cursor-pointer transition-all duration-150",
                  range === r
                    ? "bg-tertiary-bg text-white ring-1 ring-[#166534]"
                    : "bg-transparent text-[#5a8c68] hover:text-[#e2efe6] hover:bg-white/5",
                ].join(" ")}
              >
                {r}M
              </button>
            ))}
          </div>
        </div>

        {/* ── Chart — flex-1 so it fills remaining card height ── */}
        <div className="relative flex gap-2 flex-1 min-h-0">

          {/* Y-axis — matches plot height via h-full */}
          <div className="flex flex-col justify-between shrink-0 w-6 select-none pb-9">
            {[...yTicks].reverse().map(t => (
              <span key={t} className="text-right text-[9px] leading-none text-[#2d5036]">{t}</span>
            ))}
          </div>

          {/* Plot column */}
          <div className="flex flex-col flex-1 min-w-0 min-h-0">

            {/* Plot area — ResizeObserver target */}
            <div ref={plotRef} className="relative flex-1 min-h-0">

              {/* Grid lines */}
              {yTicks.map(t => (
                <div
                  key={t}
                  className="absolute left-0 right-0 h-px"
                  style={{ bottom: `${(t / yMax) * 100}%`, background: "rgba(255,255,255,0.04)" }}
                />
              ))}

              {/* Dashed average line */}
              <div
                className="absolute left-0 right-0 h-px z-10"
                style={{
                  bottom: `${(avg / yMax) * 100}%`,
                  backgroundImage: "repeating-linear-gradient(90deg, rgba(74,222,128,0.45) 0px, rgba(74,222,128,0.45) 6px, transparent 6px, transparent 12px)",
                }}
              >
                <span className="absolute right-0 -top-4 text-[9px] font-bold text-[#4ade80]/70 bg-[#0d1a0f] px-1 rounded">
                  avg
                </span>
              </div>

              {/* Bars */}
              <div className="absolute inset-0 flex items-end gap-1.5 px-0.5">
                {DATA.map((d, i) => {
                  const isHov     = hovered === i;
                  const isCurrent = (startIdx + i) === CURRENT_MONTH_IDX;
                  const barH      = chartH ? (d.completed / yMax) * chartH : 0;

                  return (
                    <div
                      key={d.month + i}
                      className="flex-1 h-full flex items-end justify-center cursor-default"
                      onMouseEnter={e => handleBarEnter(e, d, i)}
                      onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                    >
                      <div
                        className="w-full bg-linear-to-tr from-secondary-bg to-tertiary-bg"
                        style={{
                          height: `${barH}px`,
                          borderRadius: BAR_R,
                          opacity: hovered !== null && !isHov ? 0.3 : 1,
                          boxShadow: isHov
                            ? "0 4px 20px rgba(34,197,94,0.45)"
                            : isCurrent
                            ? "0 4px 16px rgba(34,197,94,0.25)"
                            : "none",
                          transform: isHov ? "scaleX(1.07)" : "scaleX(1)",
                          transformOrigin: "bottom center",
                          transition: "opacity 0.2s, transform 0.15s, height 0.45s cubic-bezier(0.4,0,0.2,1), box-shadow 0.18s",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Separator ── */}
            <div className="w-full h-px shrink-0" style={{ background: "rgba(255,255,255,0.08)" }} />

            {/* ── Month labels ── */}
            <div className="flex gap-1.5 px-0.5 h-9 shrink-0 items-start">
              {DATA.map((d, i) => {
                const isCurrent = (startIdx + i) === CURRENT_MONTH_IDX;
                const isHov     = hovered === i;
                return (
                  <div key={d.month + i} className="flex-1 flex flex-col items-center gap-1 pt-1.5">
                    {isCurrent
                      ? <div className="w-1 h-1 rounded-full bg-[#4ade80]" style={{ boxShadow: "0 0 5px #4ade80" }} />
                      : <div className="w-1 h-1" />
                    }
                    <span className={[
                      "text-[10px] tracking-wide select-none whitespace-nowrap transition-colors duration-150",
                      isCurrent ? "font-bold text-[#4ade80]"
                        : isHov  ? "font-medium text-[#e2efe6]"
                        : "font-medium text-[#5a8c68]",
                    ].join(" ")}>
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Legend ── */}
        <div className="relative flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-[#1a3320] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-5 h-1.5 rounded-full bg-linear-90 from-secondary-bg to-tertiary-bg" />
            <span className="text-[11px] font-medium text-white">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-px"
              style={{ backgroundImage: "repeating-linear-gradient(90deg,rgba(74,222,128,0.5) 0px,rgba(74,222,128,0.5) 5px,transparent 5px,transparent 9px)" }}
            />
            <span className="text-[11px] font-medium text-white">Monthly avg</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-tertiary-bg" style={{ boxShadow: "0 0 5px #4ade80" }} />
            <span className="text-[11px] font-medium text-white">Current month</span>
          </div>
        </div>

        {/* ── Tooltip ── */}
        {tooltip && (
          <div
            className="absolute pointer-events-none z-50 min-w-35 rounded-xl border border-[#166534] bg-[#0d1e10] p-3.5"
            style={{
              top: tipPos.top,
              left: tipPos.left,
              transform: "translate(-50%, -100%) translateY(-12px)",
              boxShadow: "0 12px 36px rgba(0,0,0,0.65), 0 0 0 1px rgba(34,197,94,0.07)",
              animation: "tipIn 0.14s ease both",
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#5a8c68] mb-2">
              {tooltip.d.month} 2026
            </p>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shrink-0" />
              <span className="flex-1 text-xs text-[#5a8c68]">Completed</span>
              <span className="text-[13px] font-bold text-[#4ade80]">{tooltip.d.completed}</span>
            </div>
            <div className="h-px bg-[#1a3320] my-2" />
            <div className="flex items-center gap-2">
              <span className="flex-1 text-xs text-[#5a8c68]">vs avg</span>
              <span className={[
                "text-[13px] font-bold",
                tooltip.d.completed >= avg ? "text-[#4ade80]" : "text-[#f87171]",
              ].join(" ")}>
                {tooltip.d.completed >= avg ? "+" : ""}{tooltip.d.completed - avg}
              </span>
            </div>
          </div>
        )}
      </div>
   </div>
  );
}