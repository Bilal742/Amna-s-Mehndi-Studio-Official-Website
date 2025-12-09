"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { useState } from "react";

const services = [
  "Bridal Makeup",
  "Party Makeup",
  "Mehndi Designs",
  "Hair Styling",
  "Facial Treatments",
];

export default function BookingPage() {
  const { theme } = useTheme();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: services[0],
    date: "",
    time: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.date || !form.time) {
      alert("Please fill all required fields!");
      return;
    }

    console.log("Booking Submitted:", form);
    setSubmitted(true);
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center py-20 px-6 md:px-20 transition-colors duration-500"
      style={{ background: theme.background, color: theme.text }}
    >
      <div className="max-w-3xl w-full bg-opacity-90 bg-white dark:bg-gray-900 rounded-lg p-10 shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Book Your Appointment</h2>

        {submitted ? (
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Thank you!</h3>
            <p>Your booking has been submitted successfully. We will contact you soon.</p>
            <button
              className="mt-6 px-6 py-3 rounded-lg font-semibold"
              style={{ background: theme.text, color: theme.background }}
              onClick={() => setSubmitted(false)}
            >
              Book Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring"
                style={{ borderColor: theme.text, background: theme.background, color: theme.text }}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring"
                style={{ borderColor: theme.text, background: theme.background, color: theme.text }}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring"
                style={{ borderColor: theme.text, background: theme.background, color: theme.text }}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Service</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring"
                style={{ borderColor: theme.text, background: theme.background, color: theme.text }}
              >
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold">Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring"
                  style={{ borderColor: theme.text, background: theme.background, color: theme.text }}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Time</label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring"
                  style={{ borderColor: theme.text, background: theme.background, color: theme.text }}
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 rounded-lg font-semibold"
                style={{ background: theme.text, color: theme.background }}
              >
                Book Now
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
