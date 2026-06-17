"use client";

import { useEffect, useState } from "react";
import API from "../../../services/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    bio: "",
    skills: "",
    availability: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get(
        "/volunteers/profile"
      );

      setProfile({
        bio: res.data.bio || "",
        skills: res.data.skills || "",
        availability:
          res.data.availability || "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async () => {
    try {
      await API.put(
        "/volunteers/profile",
        profile
      );

      alert(
        "Profile updated successfully"
      );
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        My Profile
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6">

        <label className="block mb-2 font-semibold">
          Bio
        </label>

        <textarea
          className="border w-full p-3 rounded mb-5"
          rows={4}
          value={profile.bio}
          onChange={(e) =>
            setProfile({
              ...profile,
              bio: e.target.value,
            })
          }
        />

        <label className="block mb-2 font-semibold">
          Skills
        </label>

        <textarea
          className="border w-full p-3 rounded mb-5"
          rows={3}
          value={profile.skills}
          onChange={(e) =>
            setProfile({
              ...profile,
              skills: e.target.value,
            })
          }
        />

        <label className="block mb-2 font-semibold">
          Availability
        </label>

        <input
          className="border w-full p-3 rounded mb-5"
          value={profile.availability}
          onChange={(e) =>
            setProfile({
              ...profile,
              availability:
                e.target.value,
            })
          }
        />

        <button
          onClick={updateProfile}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Save Profile
        </button>

      </div>
    </div>
  );
}