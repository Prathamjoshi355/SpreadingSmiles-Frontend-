import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  HeartPulse,
  PawPrint,
  GraduationCap,
  Megaphone,
  Users2,
  Leaf,
  Baby,
  ArrowRight,
  HandHeart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { apiUrl } from "@/lib/api-url";

interface TickerItem {
  text: string;
}

const defaultTickerItems: TickerItem[] = [
  { text: 'Helpline: +91 72239 98881' },
  { text: 'spreadsingsmiles@gmail.com' },
  { text: 'Indore, Madhya Pradesh' },
];

// ─── Info Ticker Bar ─────────────────────────────────────────────────────────
function InfoTickerBar({ items }: { items: TickerItem[] }) {
  // Double the items for seamless scrolling
  const displayItems = [...items, ...items];

  return (
    <div
      style={{
        background: "#c2410c",
        
        borderBottom: "1px solid rgba(255,255,255,0.15)",
        overflow: "hidden",
        height: "20px",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Left label badge */}
      <div
        style={{
          background: "#ea580c",
          color: "#fff",
          fontSize: "10px",
          fontWeight: 300,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          padding: "0 14px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          flexShrink: 0,
          borderRight: "1px solid rgba(255,255,255,0.2)",
          zIndex: 2,
        }}
      >
        Notice
      </div>

      {/* Scrolling text */}
      <div style={{ overflow: "hidden", flex: 1, position: "relative" }}>
        <div className="ticker-track">
          {displayItems.map((item, i) => (
            <span key={i} style={{ color: "#fff", fontSize: "10px", fontWeight: 500, whiteSpace: "nowrap", paddingRight: "60px" }}>
              {item.text}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .ticker-track {
          display: inline-flex;
          align-items: top;
          animation: ticker-scroll 38s linear infinite;
          will-change: transform;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// ─── Slider Data ────────────────────────────────────────────────────────────
interface HeroSlide {
  image: string;
  tag: string;
  headline: string;
  headlineAccent: string;
  sub: string;
  hindi: string;
  primaryCta: { label: string; to: string };
  secondaryCta: { label: string; to: string };
}

const defaultHeroSlides: HeroSlide[] = [
  {
    image: "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1778003131/Post_one_yrcaeg.jpg",
    tag: "A Youth-Driven NGO from Indore",
    headline: "Spreading Smiles,",
    headlineAccent: "One Life at a Time.",
    sub: "A youth-driven initiative dedicated to helping communities through education, healthcare, and social support.",
    hindi: "इंदौर के युवाओं द्वारा समाज सेवा की एक पहल",
    primaryCta: { label: "Donate Now", to: "/donate" },
    secondaryCta: { label: "Join as Volunteer", to: "/volunteer" },
  },
  {
    image: "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1778004129/post4_r13k3g.jpg",
    tag: "Child Welfare & Education",
    headline: "Every Child Deserves",
    headlineAccent: "A Brighter Tomorrow.",
    sub: "From orphanage visits to scholarship support, we ensure no child grows up without care, education, or hope.",
    hindi: "हर बच्चे को प्यार और शिक्षा का अधिकार है",
    primaryCta: { label: "Support a Child", to: "/donate" },
    secondaryCta: { label: "Our Programs", to: "/what-we-do" },
  },
  {
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&q=80",
    tag: "Healthcare & Blood Drives",
    headline: "Healthy Communities,",
    headlineAccent: "Stronger Futures.",
    sub: "Free medical camps, blood donation drives, and health awareness — bringing essential care to those who need it most.",
    hindi: "स्वस्थ समाज के लिए हमारा संकल्प",
    primaryCta: { label: "Donate Now", to: "/donate" },
    secondaryCta: { label: "See Our Impact", to: "/what-we-do" },
  },
  {
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80",
    tag: "Volunteer with Us",
    headline: "Your Time Can Change",
    headlineAccent: "Someone's World.",
    sub: "No experience needed — just a willing heart. Join hundreds of volunteers making a difference across Indore.",
    hindi: "बदलाव की शुरुआत आपसे होती है",
    primaryCta: { label: "Become a Volunteer", to: "/volunteer" },
    secondaryCta: { label: "Learn More", to: "/what-we-do" },
  },
];

const SLIDE_DURATION = 6000;

// ─── Hero Slider Component ───────────────────────────────────────────────────
function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = slides.length;

  const goTo = useCallback(
    (idx: number) => {
      setCurrent((idx + total) % total);
      setProgress(0);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const back = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const pct = Math.min(((now - start) / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
      else next();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [current, paused, next]);

  const slide = slides[current];

  return (
    <section
      className="relative overflow-hidden select-none bg-[#0c1220] min-h-[48vh] md:min-h-[600px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Dimmed full-bleed backgrounds */}
      {slides.map((s, i) => (
        <div
          key={`bg-${i}`}
          className="absolute inset-0"
          style={{ opacity: i === current ? 1 : 0, transition: "opacity 1s ease", zIndex: 0 }}
        >
          <img
            src={s.image}
            alt=""
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              filter: "brightness(0.18) blur(2px)",
              transform: i === current ? "scale(1.05)" : "scale(1)",
              transition: "transform 8s ease-out",
            }}
          />
        </div>
      ))}

      {/* Split layout */}
      <div className="relative w-full flex items-center z-10 min-h-[48vh] md:min-h-[600px]">

        {/* LEFT — text */}
        <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center">

          <div
            key={`tag-${current}`}
            className="hero-animate-up"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(249,115,22,0.20)", border: "1px solid rgba(251,146,60,0.40)",
              color: "#fed7aa", padding: "6px 16px", borderRadius: "999px",
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.5px",
              width: "fit-content", marginBottom: "18px",
            }}
          >
            <HandHeart style={{ width: 14, height: 14 }} />
            {slide.tag}
          </div>

          <h1 key={`h-${current}`} className="hero-animate-up text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3" style={{ animationDelay: "80ms" }}>
            {slide.headline}<br />
            <span className="text-orange-400">{slide.headlineAccent}</span>
          </h1>

          <p key={`sub-${current}`} className="hero-animate-up text-base md:text-lg text-slate-300 leading-relaxed max-w-xl mb-2" style={{ animationDelay: "160ms" }}>
            {slide.sub}
          </p>

          <p
            key={`hi-${current}`}
            className="hero-animate-up"
            style={{
              fontSize: "0.95rem", color: "#fdba74", fontStyle: "italic",
              margin: "0 0 28px", animationDelay: "230ms",
            }}
          >
            {slide.hindi}
          </p>

          <div key={`cta-${current}`} className="hero-animate-up flex flex-wrap gap-3" style={{ animationDelay: "310ms" }}>
            <Link to={slide.primaryCta.to}>
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold">
                {slide.primaryCta.label}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to={slide.secondaryCta.to}>
              <Button size="lg" variant="outline" className="!bg-transparent border-white text-white hover:!bg-white/10 hover:text-white font-semibold">
                {slide.secondaryCta.label}
              </Button>
            </Link>
          </div>

          {/* Counter + dots */}
          <div className="flex items-center gap-4 mt-8">
            <span className="text-orange-400 font-bold text-base">{String(current + 1).padStart(2, "0")}</span>
            <span className="text-white/40 text-sm">/ {String(total).padStart(2, "0")}</span>
            <div className="flex gap-2 items-center">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: i === current ? "28px" : "8px", height: "8px",
                    borderRadius: "4px", border: "none",
                    background: i === current ? "#f97316" : "rgba(255,255,255,0.3)",
                    cursor: "pointer", padding: 0, transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — animated image card */}
        <div className="hidden md:flex md:w-5/12 md:h-[600px] relative items-center justify-center p-10">
          {slides.map((s, i) => (
            <div
              key={`card-${i}`}
              style={{
                position: "absolute", width: "82%", height: "86%",
                borderRadius: "20px", overflow: "hidden",
                opacity: i === current ? 1 : 0,
                transform: i === current ? "translateY(0px) scale(1)" : "translateY(30px) scale(0.95)",
                transition: "opacity 0.9s ease, transform 1s cubic-bezier(.22,1,.36,1)",
                border: "2px solid rgba(251,146,60,0.30)",
                boxShadow: i === current ? "0 40px 90px rgba(0,0,0,0.6), 0 0 0 1px rgba(251,146,60,0.15)" : "none",
              }}
            >
              <img
                src={s.image} alt=""
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  transform: i === current ? "scale(1.06)" : "scale(1)",
                  transition: "transform 8s ease-out",
                }}
              />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to top, rgba(194,65,12,0.55) 0%, transparent 100%)" }} />
              <div
                key={`lbl-${current}`}
                className="hero-animate-up"
                style={{
                  position: "absolute", bottom: "18px", left: "18px",
                  background: "rgba(15,23,42,0.72)", backdropFilter: "blur(8px)",
                  border: "1px solid rgba(251,146,60,0.3)", borderRadius: "10px",
                  padding: "10px 16px", animationDelay: "400ms",
                }}
              >
                <div style={{ fontSize: "10px", color: "#fb923c", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>{slide.tag}</div>
                <div style={{ fontSize: "13px", color: "#e2e8f0", fontWeight: 500, marginTop: "2px" }}>{slide.headlineAccent}</div>
              </div>
            </div>
          ))}
          <div className="absolute" style={{ width: 'full', height: 'full', borderRadius: 24, border: '1px solid rgba(251,146,60,0.10)', transform: 'translate(12px,12px)', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* Prev/Next */}
      {[{ fn: back, label: "Previous", side: "left", Icon: ChevronLeft }, { fn: next, label: "Next", side: "right", Icon: ChevronRight }].map(({ fn, label, side, Icon }) => (
        <button
          key={side}
          onClick={fn}
          aria-label={`${label} slide`}
          className={`absolute ${side === 'left' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 bg-white/6 text-white flex items-center justify-center z-20`}
        >
          <Icon style={{ width: 18, height: 18 }} />
        </button>
      ))}

      {/* Progress bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "rgba(255,255,255,0.08)", zIndex: 20 }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "#f97316", transition: "none" }} />
      </div>

      <style>{`
        @keyframes heroUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-animate-up { animation: heroUp 0.65s cubic-bezier(.22,1,.36,1) both; }
      `}</style>
    </section>
  );
}

// ─── Page Data ───────────────────────────────────────────────────────────────
const childrenImage = "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1780147190/IMG_0422.JPG_tsaehl.jpg";

const categories = [
  { domain: "healthcare", icon: HeartPulse,    title: "Healthcare",     desc: "Medical aid & blood drives" },
  { domain: "animal-welfare", icon: PawPrint,      title: "Animal Welfare", desc: "Feed, rescue & treat strays" },
  { domain: "education", icon: GraduationCap, title: "Education",      desc: "Awards & student support" },
  { domain: "awareness", icon: Megaphone,     title: "Awareness",      desc: "Mental health & social issues" },
  { domain: "elderly-care", icon: Users2,        title: "Elderly Care",   desc: "Old age home visits" },
  { domain: "environment", icon: Leaf,          title: "Environment",    desc: "Clean drives & I Love Indore" },
  { domain: "child-welfare", icon: Baby,          title: "Child Welfare",  desc: "Orphanage support" },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Index() {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(defaultHeroSlides);
  const [tickerItems, setTickerItems] = useState<TickerItem[]>(defaultTickerItems);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch hero slides
        const heroResponse = await fetch(apiUrl("/hero-slider"));
        const heroResult = await heroResponse.json();
        if (heroResponse.ok && heroResult.data?.slides?.length) {
          setHeroSlides(heroResult.data.slides);
        }

        // Fetch ticker items
        const tickerResponse = await fetch(apiUrl("/ticker-items"));
        const tickerResult = await tickerResponse.json();
        if (tickerResponse.ok && tickerResult.data?.items?.length) {
          setTickerItems(tickerResult.data.items.slice(0, 3));
        }
      } catch (error) {
        console.error("Unable to load page data:", error);
      }
    };
    loadData();
  }, []);

  return (
    <Layout>
      {/* ── Info Ticker Bar ── */}
      <InfoTickerBar items={tickerItems} />

      {/* ── Hero Slider ── */}
      <HeroSlider slides={heroSlides} />

      {/* ── Mission ── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">Our Mission</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-5">Small Efforts. Real Change.</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Spreading Smiles is a nonprofit organization based in Indore that works across
              multiple social areas — healthcare, education, animal welfare, and community
              development. Our mission is simple: to bring real change through small consistent efforts.
            </p>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Seven Ways We Make a Difference</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat, i) => (
              <Link key={i} to={`/blog?domain=${cat.domain}`} className="block">
                <Card className="h-full border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                      <cat.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">{cat.title}</h3>
                    <p className="text-sm text-slate-600">{cat.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/what-we-do">
              <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 font-semibold">
                Learn More About Our Work
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Join Us ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img src={childrenImage} alt="Children receiving support" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">Join Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">BE THE REASON SOMEONE BELIEVES IN THEIR DREAMS.</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
               Join Spreading Smiles in our mission to recognize talent, encourage education, and celebrate student achievements. Whether as a volunteer, supporter, sponsor, or well-wisher, your contribution can inspire young minds and help create a brighter future for our community.
                <p className="text-[13px] italic text-orange-600">
  संघर्ष को सम्मान, सपनों को उड़ान </p>
  <p className="pt-[30px] -mt-[10px] text-[15px] font-bold text-slate-900">
  Join us today and help us honor talent, inspire dreams, and build a stronger future together
</p>
              </p>
             
             
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/donate">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold w-full sm:w-auto">Donate</Button>
                </Link>
                <Link to="/volunteer">
                  <Button size="lg" variant="outline" className="border-slate-300 text-slate-800 hover:bg-slate-50 font-semibold w-full sm:w-auto">Volunteer</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
