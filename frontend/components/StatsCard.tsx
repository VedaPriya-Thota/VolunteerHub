interface Props {
  value: string;
  title: string;
}

export default function StatsCard({
  value,
  title,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">

      <h2 className="text-4xl font-bold text-blue-600">
        {value}
      </h2>

      <p>{title}</p>

    </div>
  );
}