export default function StatusIndicators() {
  return (
    <div className="flex gap-2">
      <div className="flex items-center text-xs">
        <div className="w-2 h-2 bg-[#6b6666] rounded-full mr-1" />
        Planning
      </div>
      <div className="flex items-center text-xs">
        <div className="w-2 h-2 bg-[#0b80f4] rounded-full mr-1" />
        Active
      </div>
      <div className="flex items-center text-xs">
        <div className="w-2 h-2 bg-[#63adf8] rounded-full mr-1" />
        On-Hold
      </div>
      <div className="flex items-center text-xs">
        <div className="w-2 h-2 bg-[#07C700] rounded-full mr-1" />
        Completed
      </div>
      <div className="flex items-center text-xs">
        <div className="w-2 h-2 bg-[#ff0000] rounded-full mr-1" />
        Cancelled
      </div>
    </div>
  )
}
