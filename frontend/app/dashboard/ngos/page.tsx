"use client";

export default function NGOsPage() {
  const ngos = [
    {
      name: "Green Earth Foundation",
      mission: "Environmental conservation and sustainability",
      email: "greenearth@gmail.com",
      phone: "+91 9876543210",
    },
    {
      name: "Helping Hands NGO",
      mission: "Community welfare and food drives",
      email: "helpinghands@gmail.com",
      phone: "+91 9123456780",
    },
    {
      name: "Youth Impact Network",
      mission: "Youth empowerment and education",
      email: "youthimpact@gmail.com",
      phone: "+91 9988776655",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Partner NGOs
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {ngos.map((ngo, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6"
          >
            <h2 className="text-xl font-bold mb-3">
              {ngo.name}
            </h2>

            <p className="text-gray-600 mb-3">
              {ngo.mission}
            </p>

            <p>📧 {ngo.email}</p>
            <p>📞 {ngo.phone}</p>

          </div>
        ))}

      </div>

    </div>
  );
}