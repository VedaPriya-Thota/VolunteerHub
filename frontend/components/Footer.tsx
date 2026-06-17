export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">VolunteerHub</h2>
            <p className="mt-2 text-sm text-slate-400">Connecting volunteers with meaningful impact.</p>
          </div>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Events</a>
            <a href="#" className="hover:text-white">Impact</a>
          </div>
        </div>
        <div className="pt-6 text-sm text-slate-500">
          © 2026 VolunteerHub. Built for people who care.
        </div>
      </div>
    </footer>
  );
}