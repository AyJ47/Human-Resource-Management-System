const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg text-gray-600 mb-2">{title}</h2>

      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;
