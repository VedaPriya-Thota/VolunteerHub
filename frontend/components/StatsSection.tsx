import StatsCard from "./StatsCard";

export default function StatsSection() {
  return (
    <section className="bg-gray-100 py-20">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-10">
          Our Impact
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <StatsCard
            value="500+"
            title="Volunteers"
          />

          <StatsCard
            value="75+"
            title="Events"
          />

          <StatsCard
            value="1500+"
            title="Hours"
          />

          <StatsCard
            value="20+"
            title="NGOs"
          />

        </div>

      </div>

    </section>
  );
}