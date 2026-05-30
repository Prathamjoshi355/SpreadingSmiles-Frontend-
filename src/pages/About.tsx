import Layout from "@/components/Layout";
import { Users, Target, Sparkles, Instagram, Linkedin } from "lucide-react";

const teamImage =
  "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1778004401/post5_tcrmsu.jpg";

const cards = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To bring real change through small consistent efforts in healthcare, education, and community welfare.",
  },
  {
    icon: Users,
    title: "Our People",
    desc: "Educated youth of Indore coming together to serve their city with hands-on action and genuine care.",
  },
  {
    icon: Sparkles,
    title: "Our Approach",
    desc: "Hands-on, honest, and community-first. We show up, we act, and we make sure every rupee reaches the right place.",
  },
];

// ── Replace these with real data ──────────────────────────────────────────
const founders = [
  {
    name: "Rahul Lodwal",
    role: "Founder & President",
    bio: "Rahul started Spreading Smiles with a simple belief — small consistent acts of kindness can transform a community. He leads operations, outreach, and strategy for the organization.",
    photo: "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1778004401/post5_tcrmsu.jpg", // replace with actual photo URL
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    initials: "RL",
  },
  {
    name: "Founder Two",       // replace
    role: "Co-Founder",        // replace
    bio: "Brief bio about this co-founder — their background, passion, and what they bring to Spreading Smiles.",
    photo: "",                 // paste Cloudinary URL here
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    initials: "FT",
  },
  {
    name: "Founder Three",     // replace
    role: "Co-Founder",        // replace
    bio: "Brief bio about this co-founder — their background, passion, and what they bring to Spreading Smiles.",
    photo: "",                 // paste Cloudinary URL here
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    initials: "FH",
  },
];
// ─────────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">
            About Spreading Smiles
          </h1>
          <p className="text-slate-600 text-lg italic">"Indore Educated Youth Organization"</p>
        </div>
      </section>
       {/* ── Founders / Team Section ── */}
      <section className="py-16 md:py-20" style={{ background: "#fafaf8" }}>
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-14">
            <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">The People Behind It</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Meet Our Founders</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-base">
              Three young minds from Indore who chose action over apathy.
            </p>
          </div>

          {/* Founder cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {founders.map((f, i) => (
              <div key={i} className="founder-card">
                {/* Photo */}
                <div className="founder-photo-wrap">
                  {f.photo ? (
                    <img src={f.photo} alt={f.name} className="founder-photo" />
                  ) : (
                    <div className="founder-avatar">{f.initials}</div>
                  )}
                  {/* Orange ring on hover */}
                  <div className="founder-ring" />
                </div>

                {/* Info */}
                <div className="founder-info">
                  <h3 className="founder-name">{f.name}</h3>
                  <span className="founder-role">{f.role}</span>
                  <p className="founder-bio">{f.bio}</p>

                  {/* Social links */}
                  <div className="founder-socials">
                    {f.instagram && (
                      <a href={f.instagram} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                        <Instagram style={{ width: 16, height: 16 }} />
                      </a>
                    )}
                    {f.linkedin && (
                      <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                        <Linkedin style={{ width: 16, height: 16 }} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src={teamImage} alt="Spreading Smiles team" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-5 text-slate-700 leading-relaxed">
              <p>
                <strong className="text-slate-900">Spreading Smiles</strong> is a registered
                nonprofit organization based in Indore, working towards building a better
                and more compassionate society.
              </p>
              <p>
                Founded by <strong className="text-slate-900">Rahul Lodwal</strong>, the
                organization brings together educated youth to contribute towards meaningful
                social change.
              </p>
              <p>
                From healthcare support to environmental campaigns, the organization
                actively works on multiple social issues with a hands-on approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / People / Approach cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {cards.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="about-card group relative rounded-2xl border border-orange-100 bg-white p-6 cursor-default">
                <div className="about-card-bg" />
                <div className="about-card-icon w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4 relative z-10">
                  <Icon className="w-6 h-6 text-orange-600 about-card-svg" />
                </div>
                <h3 className="about-card-title font-bold text-slate-900 text-lg mb-2 relative z-10">{title}</h3>
                <p className="about-card-desc text-slate-600 text-sm leading-relaxed relative z-10">{desc}</p>
                <div className="about-card-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

     

      <style>{`
        /* ── About cards ── */
        .about-card {
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
        }
        .about-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 50px rgba(234,88,12,0.18);
          border-color: #fb923c;
        }
        .about-card-bg {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
          opacity: 0; transition: opacity 0.35s ease; z-index: 0; border-radius: inherit;
        }
        .about-card:hover .about-card-bg { opacity: 1; }
        .about-card-icon { transition: background 0.3s ease, transform 0.35s cubic-bezier(.22,1,.36,1); }
        .about-card:hover .about-card-icon { background: #ea580c; transform: rotate(-6deg) scale(1.1); }
        .about-card-svg { transition: color 0.3s ease; }
        .about-card:hover .about-card-svg { color: #ffffff !important; }
        .about-card-title { transition: color 0.3s ease; }
        .about-card:hover .about-card-title { color: #c2410c; }
        .about-card-desc { transition: color 0.3s ease; }
        .about-card:hover .about-card-desc { color: #78350f; }
        .about-card-line {
          position: absolute; bottom: 0; left: 0; height: 3px; width: 0%;
          background: linear-gradient(to right, #f97316, #ea580c);
          border-radius: 0 0 2px 2px;
          transition: width 0.4s cubic-bezier(.22,1,.36,1);
        }
        .about-card:hover .about-card-line { width: 100%; }

        /* ── Founder cards ── */
        .founder-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid #fed7aa;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(.22,1,.36,1), box-shadow 0.4s ease, border-color 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .founder-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 24px 60px rgba(234,88,12,0.16);
          border-color: #fb923c;
        }

        /* Photo area */
        .founder-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #ffedd5;
        }
        .founder-photo {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s cubic-bezier(.22,1,.36,1);
        }
        .founder-card:hover .founder-photo { transform: scale(1.07); }

        /* Initials avatar fallback */
        .founder-avatar {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 2.5rem; font-weight: 800; color: #ea580c;
          background: linear-gradient(135deg, #fff7ed, #fed7aa);
          letter-spacing: 2px;
        }

        /* Orange overlay on hover */
        .founder-ring {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(194,65,12,0.45) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .founder-card:hover .founder-ring { opacity: 1; }

        /* Info block */
        .founder-info {
          padding: 20px 22px 22px;
          display: flex; flex-direction: column; gap: 6px;
          flex: 1;
        }
        .founder-name {
          font-size: 1.1rem; font-weight: 700; color: #1e293b;
          transition: color 0.3s ease;
        }
        .founder-card:hover .founder-name { color: #c2410c; }

        .founder-role {
          display: inline-block;
          font-size: 11px; font-weight: 600; letter-spacing: 1px;
          text-transform: uppercase; color: #fff;
          background: #ea580c;
          padding: 3px 10px; border-radius: 999px;
          width: fit-content;
        }

        .founder-bio {
          font-size: 0.85rem; color: #64748b; line-height: 1.65;
          margin-top: 4px;
        }

        /* Social buttons */
        .founder-socials {
          display: flex; gap: 8px; margin-top: 10px;
        }
        .social-btn {
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #ea580c;
          border: 1.5px solid #fed7aa;
          background: #fff7ed;
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }
        .social-btn:hover {
          background: #ea580c; color: #fff;
          border-color: #ea580c;
          transform: scale(1.12);
        }
      `}</style>
    </Layout>
  );
}