"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { useState } from "react";
import toast from "react-hot-toast";

const services = [
  "Bridal Mehndi",
  "Party Mehndi",
  "Engagement Mehndi",
  "Foot Mehndi",
  "Casual Mehndi",
];

export default function BookingPage() {
  const { theme } = useTheme();

  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: services[0],
    date: today,
    time: currentTime,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/booking", {
      method: "POST",
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Booking sent successfully!");
      setSubmitted(true);

      setForm({
        name: "",
        email: "",
        phone: "",
        service: services[0],
        date: today,
        time: currentTime,
      });
    } else {
      toast.error("Failed to send booking. Try again!");
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-6 py-30"
      style={{ color: theme.background }}
    >
      <div
        className="max-w-3xl w-full p-10 rounded-2xl shadow-2xl backdrop-blur-xl"
        style={{
          background: theme.background,
          color: theme.text,
          border: `1px solid ${theme.text}`,
        }}
      >
        <h2 className="text-4xl font-bold text-center mb-8">
          Book Your Appointment
        </h2>

        {submitted ? (
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Thank you! 🎉</h3>
            <p>Your booking has been successfully submitted. We’ll contact you soon.</p>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 px-6 py-3 rounded-lg font-semibold transition cursor-pointer"
              style={{
                background: theme.text,
                color: theme.background,
              }}
            >
              Book Another Appointment
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              theme={theme}
            />

            <InputField
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              theme={theme}
            />

            <InputField
              label="Phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              theme={theme}
            />

            <div>
              <label className="block mb-1 font-semibold">Choose Service</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none"
                style={{
                  borderColor: theme.text,
                  background: theme.background,
                  color: theme.text,
                }}
              >
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Date"
                type="date"
                name="date"
                min={today}
                value={form.date}
                onChange={handleChange}
                theme={theme}
              />

              <InputField
                label="Time"
                type="time"
                name="time"
                min={form.date === today ? currentTime : "00:00"}
                value={form.time}
                onChange={handleChange}
                theme={theme}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 cursor-pointer"
                style={{
                  background: theme.text,
                  color: theme.background,
                }}
              >
                {loading ? "Sending..." : "Book Now"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function InputField({ label, theme, ...props }: any) {
  return (
    <div>
      <label className="block mb-1 font-semibold">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-2 rounded-lg border focus:outline-none"
        style={{
          borderColor: theme.text,
          background: theme.background,
          color: theme.text,
        }}
        required
      />
    </div>
  );
}
