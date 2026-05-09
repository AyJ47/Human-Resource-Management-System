const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div
        className={`${
          color || "bg-blue-500"
        } h-12 w-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-3xl font-black text-slate-900 tracking-tight mt-1">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
