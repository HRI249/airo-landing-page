"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

import { Camera, Snowflake, Activity, ShieldCheck } from "lucide-react";

/* ═══════════════════════════════════════════════════
   AIRO — APPLE-GRADE LANDING PAGE
   Premium · Minimal · Dark Green #175e29
   ═══════════════════════════════════════════════════ */

const FEATURES = [
  {
    icon: <Camera className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    title: "Snap & Track",
    subtitle: "AI-Powered Recognition",
    description:
      "Point your camera at any meal. In under two seconds, Airo identifies every ingredient, calculates macros, and logs your intake — no manual entry needed.",
  },
  {
    icon: <Snowflake className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    title: "Fridge AI",
    subtitle: "Smart Ingredient Detection",
    description:
      "Open your fridge, snap a photo. Airo instantly recognizes what you have and generates perfectly balanced recipes from your existing inventory.",
  },
  {
    icon: <Activity className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    title: "Deep Insights",
    subtitle: "Metabolic Intelligence",
    description:
      "Go beyond calories. Track micronutrient balance, hydration levels, metabolic trends, and receive AI-generated weekly health reports.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    title: "Private by Design",
    subtitle: "Zero-Knowledge Architecture",
    description:
      "Your health data never leaves your device. All AI processing runs on-device with end-to-end encryption. We literally cannot see your data.",
  },
];

const STATS = [
  { value: "2,100+", label: "Foods Recognized" },
  { value: "98.7%", label: "Accuracy Rate" },
  { value: "<2s", label: "Analysis Time" },
  { value: "0", label: "Data Sold" },
];

const TESTIMONIALS = [
  {
    quote: "Airo replaced three apps I was using. The fridge scanner alone is worth it.",
    name: "Sarah K.",
    role: "Fitness Coach",
  },
  {
    quote: "I've never seen nutrition tracking this seamless. It feels invisible.",
    name: "Marcus T.",
    role: "Software Engineer",
  },
  {
    quote: "The privacy-first approach sold me. Finally, a health app I actually trust.",
    name: "Dr. Emily R.",
    role: "Nutritionist",
  },
];

const TIMELINE = [
  { step: "01", title: "Snap", desc: "Take a photo of your meal or open fridge." },
  { step: "02", title: "Analyze", desc: "AI processes ingredients and macros in real-time." },
  { step: "03", title: "Track", desc: "Data is logged automatically to your personal dashboard." },
  { step: "04", title: "Improve", desc: "Receive actionable insights to optimize your nutrition." },
];

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  /* ── Scroll reveal observer ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll(".reveal, .reveal-scale, .reveal-left, .reveal-right").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Counter animation ── */
  const statsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.querySelectorAll(".stat-value").forEach((s, i) => {
            (s as HTMLElement).style.animation = `countUp 0.6s ${i * 0.15}s var(--ease) both`;
          });
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Form submission ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!source) {
      setMessage({ text: "Please select how you discovered us.", type: "error" });
      return;
    }
    setLoading(true);
    setMessage(null);

    const supabaseUrl = "https://jxqmblmpenzkgxizoasa.supabase.co";
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4cW1ibG1wZW56a2d4aXpvYXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5NzY3NjIsImV4cCI6MjA0NjU1Mjc2Mn0.YOxO0yHCRjQilOHYDu53_VwoBBfVHEFWxFVBVcjDPuI";
    const client = createClient(supabaseUrl, supabaseKey);

    try {
      const { error } = await client.from("waitlist").insert([
        {
          name,
          email,
          interest: `Source: ${source}`,
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) throw error;
      setMessage({ text: "You're in. We'll be in touch.", type: "success" });
      setName("");
      setEmail("");
      setSource("");
    } catch (error: any) {
      setMessage({
        text: error.message?.includes("duplicate")
          ? "This email is already on the list."
          : "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen" style={{ background: "#000" }}>
      {/* ── Ambient orbs ── */}
      <div className="orb-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════ */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6 pt-24 pb-16">
        {/* Badge */}
        <div
          className="hero-animate-1 inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-10"
          style={{
            background: "rgba(23, 94, 41, 0.08)",
            borderColor: "rgba(23, 94, 41, 0.25)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: "#4ade80",
              boxShadow: "0 0 8px #4ade80",
              animation: "heroPulse 2s ease-in-out infinite",
            }}
          />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#4ade80" }}>
            Now in Early Access
          </span>
        </div>

        {/* Headline */}
        <h1 className="hero-animate-2 text-5xl sm:text-7xl md:text-8xl lg:text-[112px] font-bold tracking-tight leading-[1.05] max-w-5xl">
          <span className="gradient-text">Nutrition.</span>
          <br />
          <span className="green-gradient-text">Reimagined.</span>
        </h1>

        {/* Subhead */}
        <p className="hero-animate-3 mt-8 text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed" style={{ color: "#86868b" }}>
          The world's most advanced AI nutrition tracker. Snap a photo of any meal, get instant macros, and build
          healthier habits — effortlessly.
        </p>

        {/* CTA Buttons */}
        <div className="hero-animate-4 flex flex-col sm:flex-row gap-4 mt-12 min-h-[56px]">
          {isLoaded ? (
            isSignedIn ? (
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95 text-center"
                style={{
                  background: "#175e29",
                  color: "#fff",
                  boxShadow: "0 0 40px rgba(23, 94, 41, 0.3)",
                }}
              >
                Go to Dashboard →
              </Link>
            ) : (
              <a
                href="#waitlist"
                className="px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "#175e29",
                  color: "#fff",
                  boxShadow: "0 0 40px rgba(23, 94, 41, 0.3)",
                }}
              >
                Request Early Access →
              </a>
            )
          ) : (
             <div className="w-[240px] h-14 bg-[#111] rounded-full animate-pulse border border-[rgba(255,255,255,0.05)]" />
          )}

          <a
            href="#features"
            className="px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
            style={{
              background: "transparent",
              color: "#f5f5f7",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            See How It Works
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="hero-animate-5 mt-20 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase" style={{ color: "#86868b" }}>
            Scroll
          </span>
          <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, #86868b, transparent)" }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — STATS BAR
          ═══════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6" ref={statsRef}>
        <div className="max-w-6xl mx-auto">
          <div className="section-divider mb-16" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div
                  className="stat-value text-4xl md:text-5xl lg:text-6xl font-bold mb-2"
                  style={{ color: "#f5f5f7", opacity: 0 }}
                >
                  {s.value}
                </div>
                <div className="text-sm md:text-base font-medium" style={{ color: "#6e6e73" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div className="section-divider mt-16" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3 — PRODUCT STATEMENT
          ═══════════════════════════════════════════════ */}
      <section className="relative z-10 py-32 md:py-48 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="reveal text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.08] tracking-tight">
            The future of health
            <br />
            <span style={{ color: "#86868b" }}>is ambient.</span>
          </h2>
          <p className="reveal reveal-delay-2 mt-10 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: "#86868b" }}>
            We believe nutrition tracking should be invisible. No food diaries. No barcode scanning. No guesswork. Just
            point, snap, and live your life. Airo handles
            everything else.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4 — FEATURES GRID
          ═══════════════════════════════════════════════ */}
      <section id="features" className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <p className="reveal text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#4ade80" }}>
              Capabilities
            </p>
            <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Engineered for
              <br />
              <span style={{ color: "#86868b" }}>precision.</span>
            </h2>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} glass-card p-8 md:p-12 group cursor-default h-full flex flex-col`}
              >
                <div className="mb-8 p-4 rounded-2xl w-fit" style={{ background: "rgba(23, 94, 41, 0.4)", border: "1px solid rgba(74, 222, 128, 0.2)" }}>
                   {f.icon}
                </div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#4ade80" }}>
                  {f.subtitle}
                </p>
                <h3 className="text-3xl font-bold mb-4 tracking-tight" style={{ color: "#ffffff" }}>{f.title}</h3>
                <p className="text-lg leading-relaxed" style={{ color: "#86868b" }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5 — LARGE PRODUCT SHOWCASE
          ═══════════════════════════════════════════════ */}
      <section className="relative z-10 py-32 md:py-48 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-scale relative overflow-hidden rounded-[32px] md:rounded-[48px]"
            style={{
              background: "linear-gradient(145deg, #0a1f14, #111, #0a0a0a)",
              border: "1px solid rgba(23, 94, 41, 0.2)",
              minHeight: "500px",
            }}
          >
            {/* Decorative glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 30% 20%, rgba(23,94,41,0.15), transparent 60%)",
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 p-10 md:p-20">
              {/* Left text */}
              <div className="flex-1">
                <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#4ade80" }}>
                  The Experience
                </p>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-8">
                  It just works.
                  <br />
                  <span style={{ color: "#86868b" }}>Like magic.</span>
                </h2>
                <p className="text-lg leading-relaxed max-w-lg" style={{ color: "#86868b" }}>
                  No onboarding flow. No tutorials. Open the app, point at food, and let the AI do what it was trained to do.
                  Nutrition tracking that respects your time.
                </p>
              </div>

              {/* Right: phone mockup placeholder */}
              <div className="flex-1 flex justify-center">
                <div
                  className="w-[260px] h-[520px] md:w-[300px] md:h-[600px] rounded-[40px] relative overflow-hidden"
                  style={{
                    background: "linear-gradient(180deg, #1a1a2e, #0f0f0f)",
                    border: "3px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 60px 120px rgba(0,0,0,0.6), 0 0 80px rgba(23,94,41,0.1)",
                    animation: "float 6s ease-in-out infinite",
                  }}
                >
                  {/* Phone notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 rounded-b-2xl" style={{ background: "#000" }} />

                  {/* Phone content */}
                  <div className="absolute inset-6 top-12 flex flex-col gap-4">
                    <div className="w-20 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
                    <div className="w-full h-36 rounded-2xl" style={{ background: "rgba(23,94,41,0.15)", border: "1px solid rgba(23,94,41,0.2)" }} />
                    <div className="flex gap-3">
                      <div className="flex-1 h-20 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }} />
                      <div className="flex-1 h-20 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }} />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1 h-20 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }} />
                      <div className="flex-1 h-20 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }} />
                    </div>
                    <div className="mt-auto w-full h-12 rounded-2xl flex items-center justify-center font-semibold text-sm" style={{ background: "#175e29", color: "#fff" }}>
                      Log Meal
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 6 — HOW IT WORKS TIMELINE
          ═══════════════════════════════════════════════ */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <p className="reveal text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#4ade80" }}>
              Process
            </p>
            <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Four steps.
              <br />
              <span style={{ color: "#86868b" }}>Zero friction.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {TIMELINE.map((t, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} flex flex-col md:flex-row items-start gap-6 md:gap-12 p-8 md:p-12 glass-card rounded-3xl relative overflow-hidden group`}
                style={{ border: "1px solid rgba(255,255,255,0.04)", background: "rgba(10, 10, 10, 0.4)" }}
              >
                {/* Glow hint on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(23, 94, 41, 0.08) 0%, transparent 60%)" }} />
                
                <span
                  className="text-6xl md:text-[90px] font-black leading-none flex-shrink-0 tracking-tighter"
                  style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.15)", background: "linear-gradient(to bottom, #175e29, #000)", WebkitBackgroundClip: "text" }}
                >
                  {t.step}
                </span>
                <div className="pt-2">
                  <h3 className="text-3xl font-bold mb-3 tracking-tight text-white">{t.title}</h3>
                  <p className="text-lg md:text-xl font-medium leading-relaxed" style={{ color: "#86868b" }}>
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 7 — LARGE TYPOGRAPHY STATEMENT
          ═══════════════════════════════════════════════ */}
      <section className="relative z-10 py-32 md:py-48 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className="reveal text-6xl sm:text-8xl md:text-[10rem] lg:text-[14rem] font-black tracking-tighter leading-none"
            style={{ color: "rgba(255,255,255,0.03)" }}
          >
            INTELLIGENCE
          </h2>
          <p
            className="reveal reveal-delay-2 -mt-10 md:-mt-20 text-xl md:text-3xl font-medium max-w-2xl mx-auto"
            style={{ color: "#86868b" }}
          >
            Powered by models trained on millions of meals. Airo doesn't guess — it knows.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 8 — TESTIMONIALS
          ═══════════════════════════════════════════════ */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="reveal text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#4ade80" }}>
              Community
            </p>
            <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Loved by early
              <br />
              <span style={{ color: "#86868b" }}>adopters.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} glass-card p-10 flex flex-col justify-between`}
              >
                <div className="mb-8">
                   <p className="text-xl md:text-2xl font-serif font-medium leading-relaxed tracking-tight" style={{ color: "#ffffff" }}>
                     &ldquo;{t.quote}&rdquo;
                   </p>
                </div>
                <div className="flex items-center gap-4 border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: "linear-gradient(135deg, #175e29, #0a2e14)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-base" style={{ color: "#f5f5f7" }}>
                      {t.name}
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: "#6e6e73" }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 9 — MARQUEE LOGOS
          ═══════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="reveal text-center text-sm font-semibold tracking-widest uppercase mb-16" style={{ color: "#6e6e73" }}>
            Compatible with your favorite platforms
          </p>
          <div className="marquee-container">
            <div className="marquee-track">
              {[
                "Apple Health",
                "Google Fit",
                "Fitbit",
                "MyFitnessPal",
                "Strava",
                "Garmin",
                "Whoop",
                "Oura Ring",
                "Apple Health",
                "Google Fit",
                "Fitbit",
                "MyFitnessPal",
                "Strava",
                "Garmin",
                "Whoop",
                "Oura Ring",
              ].map((name, i) => (
                <span
                  key={i}
                  className="flex-shrink-0 px-10 text-xl md:text-2xl font-bold whitespace-nowrap"
                  style={{ color: "rgba(255,255,255,0.12)" }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 10 — EARLY ACCESS CTA / WAITLIST
          ═══════════════════════════════════════════════ */}
      <section id="waitlist" className="relative z-10 py-32 md:py-48 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="reveal text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#4ade80" }}>
            Early Access
          </p>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Be first in line.
          </h2>
          <p className="reveal reveal-delay-2 text-lg md:text-xl max-w-xl mx-auto mb-16" style={{ color: "#86868b" }}>
            We're rolling out access to a limited group. Join the waitlist and be the first to experience the future of
            nutrition tracking.
          </p>

          {/* Form */}
          <div className="reveal reveal-delay-3 max-w-lg mx-auto p-2 rounded-[2rem]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))" }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 glass-card p-6 md:p-8 rounded-[1.75rem] shadow-2xl">
              <div className="text-left mb-4">
                <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Request Access</h3>
                <p className="text-sm font-medium" style={{ color: "#86868b" }}>Join the exclusive beta waitlist.</p>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                required
                className="w-full px-5 py-4 rounded-xl text-base font-medium outline-none transition-all duration-300"
                style={{
                  background: "#161616",
                  color: "#f5f5f7",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(23,94,41,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full px-5 py-4 rounded-xl text-base font-medium outline-none transition-all duration-300"
                style={{
                  background: "#161616",
                  color: "#f5f5f7",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(23,94,41,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
              <div className="relative">
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-xl text-base font-medium outline-none transition-all duration-300 appearance-none cursor-pointer"
                  style={{
                    background: "#161616",
                    color: source ? "#f5f5f7" : "#6e6e73",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(23,94,41,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                >
                  <option value="" disabled>
                    How did you hear about us?
                  </option>
                  <option value="social" style={{color: "black", background: "white"}}>Social Media</option>
                  <option value="search" style={{color: "black", background: "white"}}>Search Engine</option>
                  <option value="friend" style={{color: "black", background: "white"}}>Word of Mouth</option>
                  <option value="other" style={{color: "black", background: "white"}}>Other</option>
                </select>
                <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none opacity-50">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-4 rounded-xl text-base font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 hover:bg-[#1f8739] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #175e29, #10441e)",
                  color: "#fff",
                  border: "1px solid rgba(74, 222, 128, 0.2)",
                  boxShadow: "0 10px 30px rgba(23, 94, 41, 0.3)",
                }}
              >
                {loading ? "Submitting..." : "Secure My Spot"}
              </button>
            </form>

            {message && (
              <div
                className="mt-4 p-4 rounded-xl text-sm font-medium text-center"
                style={{
                  background:
                    message.type === "success"
                      ? "rgba(23, 94, 41, 0.15)"
                      : "rgba(239, 68, 68, 0.1)",
                  color: message.type === "success" ? "#4ade80" : "#f87171",
                  border: `1px solid ${
                    message.type === "success"
                      ? "rgba(23, 94, 41, 0.3)"
                      : "rgba(239, 68, 68, 0.2)"
                  }`,
                }}
              >
                {message.text}
              </div>
            )}
          </div>
          <p className="mt-6 text-xs" style={{ color: "#6e6e73" }}>
            No spam. No sharing. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 11 — FAQ
          ═══════════════════════════════════════════════ */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="reveal text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6">
              Questions<span style={{ color: "#86868b" }}> & answers.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How accurate is Airo's food recognition?",
                a: "Our AI achieves 98.7% accuracy across 2,100+ food items. It uses a combination of visual recognition and contextual analysis to identify ingredients and estimate portions.",
              },
              {
                q: "Does Airo sell my health data?",
                a: "Absolutely not. We operate on a zero-knowledge architecture. Your data is processed on-device and encrypted end-to-end. We physically cannot access your health information.",
              },
              {
                q: "What platforms does Airo support?",
                a: "Airo will launch on Android first. Integrations with Apple Health, Google Fit, Fitbit, Whoop, and Oura are planned for the future and will be rolled out as our user base grows.",
              },
              {
                q: "Is Airo free?",
                a: "Airo will offer a generous free tier with core tracking features. A premium plan will unlock advanced insights, Fridge AI, and unlimited recipe generation.",
              },
              {
                q: "When will I get access?",
                a: "We are actively developing Airo and expect to start rolling out invites in Q3 of 2026 or Q1 of 2027. Waitlist members will get priority access.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${Math.min(i + 1, 5)} p-8 md:p-10 glass-card rounded-3xl group transition-all duration-500 hover:bg-[#151515]`}
              >
                <div className="flex gap-6 items-start">
                  <span className="text-2xl mt-1 opacity-40 font-serif" style={{ color: "#4ade80" }}>Q</span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-4 text-white">{faq.q}</h3>
                    <p className="text-base md:text-lg leading-relaxed font-medium" style={{ color: "#86868b" }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════ */}
      <footer className="relative z-10 py-20 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <span
              className="text-3xl font-black tracking-tighter"
              style={{ color: "#f5f5f7", letterSpacing: "-0.08em" }}
            >
              airo!
            </span>
          </div>

          <div className="flex items-center gap-8">
            {["Privacy", "Terms", "Twitter", "Support"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium transition-colors duration-300"
                style={{ color: "#6e6e73", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f5f5f7")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6e6e73")}
              >
                {link}
              </a>
            ))}
          </div>

          <p className="text-sm" style={{ color: "#6e6e73" }}>
            © 2025 Airo Technologies
          </p>
        </div>
      </footer>
    </div>
  );
}
