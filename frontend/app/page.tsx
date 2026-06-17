// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <main>

//       {/* HERO SECTION */}

//       <section className="bg-gradient-to-r from-green-600 to-emerald-500 text-white">

//         <div className="max-w-7xl mx-auto px-6 py-24">

//           <h1 className="text-6xl font-bold mb-6">
//             Make a Difference
//             <br />
//             In Your Community
//           </h1>

//           <p className="text-xl mb-8 max-w-2xl">
//             Join thousands of volunteers contributing
//             their time and skills to create positive
//             social impact through meaningful events.
//           </p>

//           <div className="flex gap-4">

//             <Link
//               href="/events"
//               className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold"
//             >
//               Explore Events
//             </Link>

//             <Link
//               href="/register"
//               className="border border-white px-6 py-3 rounded-xl font-semibold"
//             >
//               Become a Volunteer
//             </Link>

//           </div>

//         </div>

//       </section>

//       {/* STATS */}

//       <section className="max-w-7xl mx-auto px-6 py-20">

//         <h2 className="text-4xl font-bold text-center mb-12">
//           Our Impact
//         </h2>

//         <div className="grid md:grid-cols-4 gap-6">

//           <div className="bg-white shadow-lg rounded-xl p-8 text-center">
//             <h3 className="text-5xl font-bold text-green-600">
//               10K+
//             </h3>

//             <p className="mt-3 text-gray-600">
//               Volunteers
//             </p>
//           </div>

//           <div className="bg-white shadow-lg rounded-xl p-8 text-center">
//             <h3 className="text-5xl font-bold text-green-600">
//               500+
//             </h3>

//             <p className="mt-3 text-gray-600">
//               Events
//             </p>
//           </div>

//           <div className="bg-white shadow-lg rounded-xl p-8 text-center">
//             <h3 className="text-5xl font-bold text-green-600">
//               150+
//             </h3>

//             <p className="mt-3 text-gray-600">
//               NGO Partners
//             </p>
//           </div>

//           <div className="bg-white shadow-lg rounded-xl p-8 text-center">
//             <h3 className="text-5xl font-bold text-green-600">
//               50K+
//             </h3>

//             <p className="mt-3 text-gray-600">
//               Volunteer Hours
//             </p>
//           </div>

//         </div>

//       </section>

//       {/* FEATURED EVENTS */}

//       <section className="bg-gray-50 py-20">

//         <div className="max-w-7xl mx-auto px-6">

//           <h2 className="text-4xl font-bold text-center mb-12">
//             Featured Opportunities
//           </h2>

//           <div className="grid md:grid-cols-3 gap-6">

//             <div className="bg-white rounded-xl shadow-lg p-6">

//               <h3 className="text-xl font-bold mb-3">
//                 Tree Plantation Drive
//               </h3>

//               <p className="text-gray-600 mb-4">
//                 Help build a greener future by planting
//                 trees in urban spaces.
//               </p>

//               <p>📍 Vijayawada</p>
//               <p>📅 June 20, 2026</p>

//             </div>

//             <div className="bg-white rounded-xl shadow-lg p-6">

//               <h3 className="text-xl font-bold mb-3">
//                 Beach Cleanup
//               </h3>

//               <p className="text-gray-600 mb-4">
//                 Protect marine ecosystems by helping
//                 remove waste from beaches.
//               </p>

//               <p>📍 Visakhapatnam</p>
//               <p>📅 July 10, 2026</p>

//             </div>

//             <div className="bg-white rounded-xl shadow-lg p-6">

//               <h3 className="text-xl font-bold mb-3">
//                 Blood Donation Camp
//               </h3>

//               <p className="text-gray-600 mb-4">
//                 Support local healthcare initiatives and
//                 save lives.
//               </p>

//               <p>📍 Vijayawada</p>
//               <p>📅 July 15, 2026</p>

//             </div>

//           </div>

//         </div>

//       </section>

//       {/* NGO SECTION */}

//       <section className="max-w-7xl mx-auto px-6 py-20">

//         <h2 className="text-4xl font-bold text-center mb-12">
//           Trusted NGO Partners
//         </h2>

//         <div className="grid md:grid-cols-3 gap-6">

//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h3 className="font-bold text-xl mb-2">
//               Green Earth Foundation
//             </h3>

//             <p className="text-gray-600">
//               Environmental sustainability and climate
//               action initiatives.
//             </p>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h3 className="font-bold text-xl mb-2">
//               Helping Hands
//             </h3>

//             <p className="text-gray-600">
//               Community welfare, food drives and
//               education programs.
//             </p>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h3 className="font-bold text-xl mb-2">
//               Youth Impact Network
//             </h3>

//             <p className="text-gray-600">
//               Empowering young leaders through social
//               impact projects.
//             </p>
//           </div>

//         </div>

//       </section>

//       {/* CTA */}

//       <section className="bg-green-600 text-white">

//         <div className="max-w-7xl mx-auto px-6 py-20 text-center">

//           <h2 className="text-5xl font-bold mb-6">
//             Ready To Create Impact?
//           </h2>

//           <p className="text-xl mb-8">
//             Join our growing volunteer community today.
//           </p>

//           <Link
//             href="/register"
//             className="bg-white text-green-700 px-8 py-4 rounded-xl font-bold"
//           >
//             Get Started
//           </Link>

//         </div>

//       </section>

//     </main>
//   );
// }
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarDays,
  HeartHandshake,
  Leaf,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";

const stats = [
  { value: "10K+", label: "active volunteers" },
  { value: "500+", label: "impact events" },
  { value: "150+", label: "trusted NGOs" },
  { value: "50K+", label: "hours served" },
];

const partners = [
  "Green Earth Foundation",
  "Helping Hands",
  "Youth Impact Network",
  "CareCircle",
  "BrightFuture",
  "HopeBridge",
];

const steps = [
  {
    icon: BadgeCheck,
    title: "Create your profile",
    text: "Share your skills, interests, and causes you care about.",
  },
  {
    icon: Sparkles,
    title: "Discover missions",
    text: "Browse curated opportunities that match your values.",
  },
  {
    icon: HeartHandshake,
    title: "Join the journey",
    text: "Show up, contribute, and grow with a supportive community.",
  },
  {
    icon: Award,
    title: "Earn recognition",
    text: "Collect certificates and badges that celebrate your impact.",
  },
];

const featuredEvents = [
  {
    category: "Environment",
    icon: Leaf,
    title: "Tree Plantation Drive",
    description:
      "Help plant 500 trees and restore greener spaces across Vijayawada.",
    location: "Vijayawada",
    date: "June 20, 2026",
    slots: "34 / 50 joined",
    accent: "from-emerald-500 to-green-600",
  },
  {
    category: "Health",
    icon: HeartHandshake,
    title: "Blood Donation Camp",
    description:
      "Support local healthcare efforts and help save up to 3 lives.",
    location: "Hyderabad",
    date: "July 10, 2026",
    slots: "21 / 40 joined",
    accent: "from-sky-500 to-cyan-600",
  },
  {
    category: "Community",
    icon: Users,
    title: "Beach Cleanup Mission",
    description:
      "Protect marine ecosystems by removing waste and raising awareness.",
    location: "Visakhapatnam",
    date: "July 25, 2026",
    slots: "48 / 60 joined",
    accent: "from-teal-500 to-emerald-600",
  },
];

const stories = [
  {
    quote:
      "VolunteerHub helped me turn my weekends into meaningful community impact.",
    name: "Veda R.",
  },
  {
    quote:
      "I found opportunities that matched my passion for education and mentorship.",
    name: "Arjun S.",
  },
  {
    quote:
      "The journey felt motivating, social, and deeply rewarding from the start.",
    name: "Nisha K.",
  },
];

const achievements = [
  {
    title: "🌱 Green Starter",
    text: "Applied to your first event",
  },
  { title: "🤝 Community Helper", text: "5 volunteer hours" },
  { title: "🏆 Impact Champion", text: "10 events completed" },
  { title: "❤️ Social Hero", text: "25 volunteer hours" },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#f6fbf7]">
      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden bg-linear-to-br from-emerald-600 via-green-500 to-teal-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_18%)]" />
        <div className="absolute -left-12 top-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-emerald-50 backdrop-blur-xl">
                <Sparkles size={16} />
                Build real impact with every action
              </span>
              <h1 className="mt-6 text-5xl font-black leading-tight text-white md:text-7xl">
                Turn kindness into
                <span className="block bg-linear-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                  lasting change.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50/95">
                Join meaningful community missions, connect with NGOs, and grow your impact story one volunteer moment at a time.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-semibold text-emerald-700 shadow-2xl transition duration-300 hover:-translate-y-0.5"
                >
                  Explore events
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center rounded-2xl border border-white/25 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-xl transition duration-300 hover:bg-white/15"
                >
                  Join the community
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -right-6 top-6 h-24 w-24 rounded-full bg-sky-300/20 blur-2xl" />
              <div className="rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl">
                <div className="rounded-3xl bg-gradient-to-br from-white/90 to-emerald-50/90 p-6 text-slate-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">This week</p>
                      <h3 className="mt-1 text-3xl font-bold">1,248</h3>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                      +18.4%
                    </span>
                  </div>
                  <div className="mt-6 h-3 w-full rounded-full bg-slate-200">
                    <div className="h-3 w-[78%] rounded-full bg-linear-to-r from-emerald-500 to-teal-500" />
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Volunteer hours</p>
                      <p className="mt-1 text-2xl font-semibold">3,420</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Projects funded</p>
                      <p className="mt-1 text-2xl font-semibold">96</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 text-center shadow-lg shadow-emerald-100/50 backdrop-blur-xl transition duration-300 hover:-translate-y-1"
              >
                <h3 className="text-4xl font-bold text-emerald-600">{stat.value}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="pb-18">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[28px] border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-xl">
            <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              trusted by changemakers
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {partners.map((partner) => (
                <span
                  key={partner}
                  className="rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">How it works</p>
            <h2 className="mt-3 text-4xl font-bold text-slate-900">A journey that keeps growing</h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{step.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED EVENTS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Featured missions</p>
              <h2 className="mt-3 text-4xl font-bold text-slate-900">Open opportunities today</h2>
            </div>
            <Link href="/events" className="hidden text-sm font-semibold text-emerald-700 md:block">
              View all events →
            </Link>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {featuredEvents.map((event, index) => {
              const Icon = event.icon;
              return (
                <motion.article
                  key={event.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-lg shadow-slate-200/60 transition duration-300"
                >
                  <div className={`h-48 bg-linear-to-br ${event.accent} p-6`}>
                    <div className="flex h-full items-start justify-between">
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xl">
                        {event.category}
                      </span>
                      <div className="rounded-2xl bg-white/10 p-3 text-white backdrop-blur-xl">
                        <Icon size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-slate-900">{event.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-500">{event.description}</p>
                    <div className="mt-5 space-y-2 text-sm text-slate-600">
                      <p className="flex items-center gap-2"><MapPin size={16} className="text-emerald-600" /> {event.location}</p>
                      <p className="flex items-center gap-2"><CalendarDays size={16} className="text-emerald-600" /> {event.date}</p>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-500">{event.slots}</p>
                      <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-emerald-600">
                        Join mission
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* IMPACT SHOWCASE */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[32px] bg-linear-to-br from-slate-900 via-emerald-900 to-teal-800 p-8 text-white shadow-2xl"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">Impact journey</p>
              <h2 className="mt-3 text-4xl font-bold">Your progress, beautifully mapped</h2>
              <div className="mt-8 space-y-4">
                {[
                  "Registered",
                  "Applied",
                  "Approved",
                  "Attended",
                  "Certificate earned",
                ].map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="text-sm text-slate-100">{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {achievements.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-500">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Voices from the community</p>
            <h2 className="mt-3 text-4xl font-bold text-slate-900">Volunteer stories</h2>
          </motion.div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {stories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <p className="text-lg leading-7 text-slate-600">“{story.quote}”</p>
                <h4 className="mt-6 font-semibold text-slate-900">{story.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 pt-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[32px] bg-linear-to-r from-emerald-600 to-teal-500 p-12 text-center text-white shadow-2xl"
          >
            <h2 className="text-4xl font-bold">Ready to create your own impact?</h2>
            <p className="mt-3 text-emerald-50">Join a growing community building a brighter tomorrow.</p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/register" className="rounded-2xl bg-white px-6 py-3 font-semibold text-emerald-700">
                Get started
              </Link>
              <Link href="/events" className="rounded-2xl border border-white/30 px-6 py-3 font-semibold text-white">
                Explore missions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
