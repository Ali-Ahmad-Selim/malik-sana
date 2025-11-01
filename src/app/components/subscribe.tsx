"use client";
import React from "react";

export default function Subscribe() {
  const [email, setEmail] = React.useState<string>("");
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = React.useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Thanks! You are now subscribed.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <section
      aria-label="Subscribe"
      className="w-full py-12 sm:py-16 md:py-20 bg-[var(--back)] text-[var(--text)]"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Connect with us for the new things
          </h2>
          <p className="mt-3 text-sm sm:text-base opacity-80">
            Subscribe to get updates on new arrivals, offers, and style guides.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex flex-col sm:flex-row items-stretch gap-3"
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-label="Email address"
            required
            className="flex-1 rounded-md border border-[rgba(255,255,255,0.12)] bg-[var(--vibe)]/70 px-4 py-3 text-[var(--text)] placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-[var(--custom)]/60 focus:border-[var(--custom)]/60"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-md bg-[var(--custom)] text-[var(--back)] px-6 py-3 font-semibold transition-colors hover:bg-[color:var(--custom)]/90 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "loading"
              ? "Subscribing..."
              : status === "success"
              ? "Subscribed"
              : "Subscribe"}
          </button>
        </form>

        {status === "error" && (
          <p className="mt-3 text-sm text-red-400">{message}</p>
        )}
        {status === "success" && (
          <p className="mt-3 text-sm text-green-400">{message}</p>
        )}
      </div>
    </section>
  );
}
