"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import themeColors from "../themeColors/themeColors";

const initialForm = { name: "", email: "", Phone: "", message: "" };

type FormType = typeof initialForm;

type StatusType = "idle" | "loading" | "success" | "error";

interface Status {
  type: StatusType;
  msg: string;
}

interface FieldProps {
  label: string;
  name: keyof FormType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  as?: "input" | "textarea";
  rows?: number;
  type?: string;
  placeholder?: string;
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  iconStyle?: React.CSSProperties;
}

function validate(values: FormType) {
  const errors: Partial<FormType> = {};
  if (!values.name.trim()) errors.name = "Name is required";
  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(values.email)) {
    errors.email = "Enter a valid email";
  }
  if (!values.Phone.trim()) errors.Phone = "Phone is required";
  if (!values.message.trim()) errors.message = "Message is required";
  return errors;
}

export default function ContactSection() {
  const now = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[now.getDay()];
  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // e.g., 03:15:30 PM
  const theme = themeColors.dark;
  const [form, setForm] = useState<FormType>(initialForm);
  const [errors, setErrors] = useState<Partial<FormType>>({});
  const [status, setStatus] = useState<Status>({ type: "idle", msg: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormType]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const er = validate(form);
    setErrors(er);

    if (Object.keys(er).length) {
      setStatus({ type: "error", msg: "Please fix the highlighted fields." });
      return;
    }

    setStatus({ type: "loading", msg: "Sending your message..." });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({ type: "success", msg: "Thanks! Your message has been sent." });
        setForm(initialForm);
      } else {
        setStatus({ type: "error", msg: "Failed to send message, please try again." });
      }
    } catch (err) {
      console.error("Network error:", err);
      setStatus({ type: "error", msg: "Network error, try again." });
    }
  };

  return (
    <section className="relative overflow-hidden mt-30">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-orange-500/20 to-pink-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <span
            style={{ background: theme.text, color: theme.background }}
            className="inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide shadow-md">
            Get in touch
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">
              Us
            </span>
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Have a question or a project in mind? Send a message and we’ll reply
            soon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2"
          >
            <InfoCard
              icon={
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: theme.text, color: theme.background }}
                >
                  <Phone className="h-5 w-5" />
                </div>
              }
              title="Phone"
              content={
                <a className="hover:underline" href="https://web.whatsapp.com/" target="_blank">
                  +92 123 456 7890
                </a>
              }
            />

            <InfoCard
              icon={
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: theme.text, color: theme.background }}
                >
                  <Mail className="h-5 w-5" />
                </div>
              }
              title="Email"
              content={
                <a className="hover:underline" href="mailto:bilalusman1291@gmail.com">
                  bilalusman1291@gmail.com
                </a>
              }
            />

            <InfoCard
              icon={
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: theme.text, color: theme.background }}
                >
                  <MapPin className="h-5 w-5" />
                </div>
              }
              title="Address"
              content={<>Karachi, Pakistan</>}
            />


            <InfoCard
              icon={
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: theme.text, color: theme.background }}
                >
                  <Clock className="h-5 w-5" />
                </div>
              }
              title="Current Time"
              content={<> {dayName}, {dateStr} — {timeStr} </>}
            />

            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <iframe
                title="Map"
                className="h-56 w-full"
                loading="lazy"
                src="https://www.google.com/maps?q=Karachi%20Pakistan&output=embed"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-xl backdrop-blur">
              {status.type !== "idle" && (
                <div
                  className={
                    "mb-4 flex items-center gap-2 rounded-xl border p-3 text-sm " +
                    (status.type === "success"
                      ? "border-green-200 bg-green-50"
                      : status.type === "error"
                        ? "border-red-200 bg-red-50"
                        : "border-gray-200 bg-gray-50")
                  }
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : status.type === "error" ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <p>{status.msg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Bilal Ahmed"
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="you@example.com"
                  />
                </div>

                <Field
                  label="Phone"
                  type="number"
                  name="Phone"
                  value={form.Phone}
                  onChange={handleChange}
                  error={errors.Phone}
                  placeholder="+92 123 456 7890"
                />

                <Field
                  label="Message"
                  name="message"
                  as="textarea"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  error={errors.message}
                  placeholder="Write your message here..."
                />

                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs text-gray-500">We’ll never share your info.</p>
                  <button
                    style={{ background: theme.text, color: theme.background }}
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold shadow-md transition focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400 cursor-pointer"
                    disabled={status.type === "loading"}
                  >
                    <Send className="h-4 w-4" />
                    {status.type === "loading" ? "Sending..." : "Send Message"}
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, error, as = "input", rows = 4, type = "text", placeholder }: FieldProps) {
  const InputTag = as;
  const base =
    "w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:ring-2 " +
    (error
      ? "border-red-300 focus:border-red-400 focus:ring-red-200"
      : "border-gray-300 focus:border-orange-400 focus:ring-orange-200");

  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-gray-700">{label}</label>
      <InputTag
        name={name}
        type={type}
        rows={as === "textarea" ? rows : undefined}
        className={base}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function InfoCard({ icon, title, content }: InfoCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">{icon}</div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <div className="text-sm text-gray-600">{content}</div>
      </div>
    </div>
  );
}
