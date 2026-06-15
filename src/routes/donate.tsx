import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart, IndianRupee, Shield, Sparkles, CheckCircle2 } from "lucide-react";

import heroCover from "../assets/hero-cover.jpeg.asset.json";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const RAZORPAY_KEY =
  (import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined) ?? "";
const UPI_ID =
  (import.meta.env.VITE_UPI_ID as string | undefined) ?? "devanampriya@upi";
const UPI_PAYEE =
  (import.meta.env.VITE_UPI_PAYEE as string | undefined) ?? "DEVANAMPRIYA";

const PRESETS = [101, 501, 1100, 2100, 5100, 11000];

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Support DEVANAMPRIYA" },
      {
        name: "description",
        content:
          "Support DEVANAMPRIYA's work in education, dhamma, and social justice. Donate securely via Razorpay or UPI.",
      },
      { property: "og:title", content: "Donate — Support DEVANAMPRIYA" },
      {
        property: "og:description",
        content: "Your contribution funds education, dhamma, and humanitarian work.",
      },
    ],
  }),
  component: DonatePage,
});

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

function DonatePage() {
  const [amount, setAmount] = useState<number>(501);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRazorpay();
  }, []);

  const handleRazorpay = async () => {
    setStatus(null);
    if (!amount || amount < 1) {
      setStatus("Please enter a valid amount.");
      return;
    }
    if (!RAZORPAY_KEY) {
      setStatus(
        "Razorpay is not configured yet. Please add VITE_RAZORPAY_KEY_ID to enable card/netbanking payments. You can still pay via UPI below.",
      );
      return;
    }
    setLoading(true);
    const ok = await loadRazorpay();
    if (!ok || !window.Razorpay) {
      setLoading(false);
      setStatus("Could not load Razorpay. Please check your connection.");
      return;
    }
    const rzp = new window.Razorpay({
      key: RAZORPAY_KEY,
      amount: amount * 100,
      currency: "INR",
      name: "DEVANAMPRIYA",
      description: "Donation in support of Dhamma & Humanity",
      image: heroCover.url,
      prefill: { name, email, contact: phone },
      notes: { purpose: "donation" },
      theme: { color: "#0A1F5B" },
      handler: (resp: { razorpay_payment_id?: string }) => {
        setStatus(
          `Thank you! Donation received. Reference: ${resp.razorpay_payment_id ?? "—"}`,
        );
      },
      modal: {
        ondismiss: () => setLoading(false),
      },
    });
    rzp.open();
    setLoading(false);
  };

  const upiUrl = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    UPI_PAYEE,
  )}&am=${encodeURIComponent(String(amount || 0))}&cu=INR&tn=${encodeURIComponent(
    "Donation to DEVANAMPRIYA",
  )}`;

  return (
    <div className="bg-[var(--royal-deep)] text-white pt-24 md:pt-28">
      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <img
          src={heroCover.url}
          alt="Support DEVANAMPRIYA"
          className="block w-full h-auto"
        />
        <div className="container-page py-10 md:py-14 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold sm:text-4xl md:text-5xl"
          >
            Your Gift Lights the <span className="text-gradient-gold">Path of Dhamma</span>
          </motion.h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/85 md:text-lg">
            Every contribution funds education, compassion drives, and social
            justice programs. Donate securely below.
          </p>
        </div>
      </section>

      {/* Donation card */}
      <section className="container-page pb-20">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 text-[var(--royal-deep)] shadow-2xl md:p-10">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--royal)]">
            <Heart className="h-4 w-4" /> Make a Donation
          </div>

          {/* Amount presets */}
          <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                  amount === p
                    ? "border-[var(--royal)] bg-[var(--royal)] text-white"
                    : "border-slate-200 hover:border-[var(--royal)]"
                }`}
              >
                ₹{p.toLocaleString("en-IN")}
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <label className="mt-5 block text-sm font-medium">Enter amount (INR)</label>
          <div className="mt-2 flex items-center rounded-xl border border-slate-200 px-3 focus-within:border-[var(--royal)]">
            <IndianRupee className="h-5 w-5 text-slate-400" />
            <input
              type="number"
              min={1}
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-transparent px-2 py-3 text-lg font-semibold outline-none"
              placeholder="Any amount"
            />
          </div>

          {/* Optional donor info */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-[var(--royal)]"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile (optional)"
              className="rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-[var(--royal)]"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              className="rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-[var(--royal)] sm:col-span-2"
              type="email"
            />
          </div>

          {/* Payment buttons */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              onClick={handleRazorpay}
              disabled={loading}
              className="btn-primary w-full justify-center"
            >
              <Sparkles className="h-4 w-4" />
              {loading ? "Opening…" : "Pay via Razorpay"}
            </button>
            <a
              href={upiUrl}
              className="btn-outline w-full justify-center"
              style={{ color: "var(--royal)", borderColor: "var(--royal)" }}
            >
              <IndianRupee className="h-4 w-4" />
              Pay via UPI
            </a>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            UPI link opens GPay / PhonePe / Paytm / BHIM on mobile devices. On
            desktop, scan the UPI ID{" "}
            <span className="font-semibold text-[var(--royal-deep)]">{UPI_ID}</span>.
          </p>

          {status && (
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
              <CheckCircle2 className="mt-0.5 h-4 w-4" />
              <span>{status}</span>
            </div>
          )}

          <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
            <Shield className="h-4 w-4" />
            Secure payments. We never store your card details.
          </div>
        </div>
      </section>
    </div>
  );
}
