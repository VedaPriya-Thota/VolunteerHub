import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white">

      <div className="max-w-6xl mx-auto py-28 text-center">

        <h1 className="text-6xl font-bold mb-6">
          Make an Impact
        </h1>

        <p className="text-xl mb-8">
          Connect with NGOs,
          join events,
          and contribute to your community.
        </p>

        <div className="flex justify-center gap-4">

          <Link
            href="/register"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg"
          >
            Become a Volunteer
          </Link>

          <Link
            href="/events"
            className="border border-white px-6 py-3 rounded-lg"
          >
            Explore Events
          </Link>

        </div>

      </div>

    </section>
  );
}