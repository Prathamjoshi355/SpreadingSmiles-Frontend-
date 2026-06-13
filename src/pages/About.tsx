import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Users, Target, Sparkles, Instagram, Linkedin } from "lucide-react";
import { apiUrl } from "@/lib/api-url";

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

type FeaturedVolunteer = {
  _id: string;
  name: string;
  photoUrl: string;
};

export default function About() {
  const [volunteers, setVolunteers] = useState<FeaturedVolunteer[]>([]);

  useEffect(() => {
    const fetchFeaturedVolunteers = async () => {
      try {
        const response = await fetch(apiUrl("/volunteer/featured"));
        const result = await response.json();

        if (response.ok && Array.isArray(result.data)) {
          setVolunteers(result.data);
        }
      } catch (error) {
        console.error("Unable to load featured volunteers:", error);
      }
    };

    fetchFeaturedVolunteers();
  }, []);

  const repeatCount = volunteers.length > 0 ? Math.max(2, Math.ceil(12 / volunteers.length)) : 0;
  const sliderVolunteers = Array.from({ length: repeatCount }, () => volunteers).flat();

  return (
    <Layout>
      <div className="ss-wrap">
        <h2 style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)" }}>
          Spreading Smiles About page
        </h2>

        {/* Hero */}
        <div className="ss-hero">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">Spreading Smiles</h1>
          <p className="ss-hero-sub">"Indore Educated Youth Organization"</p>
        </div>

        {/* Founder */}
        <div className="ss-founder">
          <div>
            <img
              className="ss-founder-img"
              src="https://res.cloudinary.com/dhy9pmo8s/image/upload/v1780145606/IMG_0421_jlfbln.jpg"
              alt="Rahul Lodwal"
            />
          </div>
          <div>
            <div className="ss-founder-badge">Founder &amp; President</div>
            <h2>Rahul Lodwal</h2>
            <p className="ss-founder-text">
              Rahul started Spreading Smiles with a simple belief — small, consistent acts of kindness can create lasting change.
              What began as a personal commitment has grown into a youth-driven organization dedicated to healthcare, education,
              environmental initiatives, and community welfare.
            </p>
            <p className="ss-founder-text">
              Today, Rahul leads the organization&#8217;s vision, partnerships, volunteer network, and strategic initiatives
              while ensuring every project stays focused on real impact.
            </p>
            <div className="ss-socials">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="ss-social-btn"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="ss-social-btn"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Volunteers */}
        <div className="ss-volunteers">
          <div className="ss-vol-header">
            <h3>Faces Behind the Work</h3>
          </div>
          <div className="vol-track-wrap">
            <div className="vol-track">
              {sliderVolunteers.length > 0 ? (
                <>
                  {sliderVolunteers.map((v, i) => (
                    <div className="vol-slide" key={`a-${v._id}-${i}`}>
                      <img src={v.photoUrl} alt={v.name} />
                      <p className="vol-name">{v.name}</p>
                    </div>
                  ))}
                  {sliderVolunteers.map((v, i) => (
                    <div className="vol-slide" key={`b-${v._id}-${i}`}>
                      <img src={v.photoUrl} alt={v.name} />
                      <p className="vol-name">{v.name}</p>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {Array.from({ length: 12 }).map((_, index) => (
                    <div className="vol-slide" key={`ph-${index}`}>
                      <img
                        src="https://res.cloudinary.com/dhy9pmo8s/image/upload/v1778004401/post5_tcrmsu.jpg"
                        alt="Volunteer"
                      />
                      <p className="vol-name">Volunteer</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="ss-story">
          <img
            className="ss-story-img"
            src="https://res.cloudinary.com/dhy9pmo8s/image/upload/v1778004401/post5_tcrmsu.jpg"
            alt="Spreading Smiles team"
          />
          <div className="ss-story-text">
            <p>
              <strong>Spreading Smiles</strong> is a registered nonprofit organization based in Indore, working towards building a better and more compassionate society.
            </p>
            <p>
              Founded by <strong>Rahul Lodwal</strong>, the organization brings together educated youth to contribute towards meaningful social change.
            </p>
            <p>
              From healthcare support to environmental campaigns, the organization actively works on multiple social issues with a hands-on approach.
            </p>
          </div>
        </div>

        {/* Mission / People / Approach */}
        <div className="ss-cards">
          <div className="ss-cards-grid">
            <div className="ss-card">
              <div className="ss-card-icon"><Target size={20} className="ss-card-svg" aria-hidden="true" /></div>
              <h4>Our Mission</h4>
              <p>To bring real change through small consistent efforts in healthcare, education, and community welfare.</p>
              <div className="ss-card-line" />
            </div>
            <div className="ss-card">
              <div className="ss-card-icon"><Users size={20} className="ss-card-svg" aria-hidden="true" /></div>
              <h4>Our People</h4>
              <p>Educated youth of Indore coming together to serve their city with hands-on action and genuine care.</p>
              <div className="ss-card-line" />
            </div>
            <div className="ss-card">
              <div className="ss-card-icon"><Sparkles size={20} className="ss-card-svg" aria-hidden="true" /></div>
              <h4>Our Approach</h4>
              <p>Hands-on, honest, and community-first. We show up, we act, and every rupee reaches the right place.</p>
              <div className="ss-card-line" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Use site's default font (inherit) so About matches global typography */
        .ss-wrap { font-family: inherit; color: #1a1a1a; background: #fff; }

        .ss-hero {
          padding: 36px 32px 28px;
          background: #fff8f3;
          border-radius: var(--border-radius-lg);
          text-align: center;
          border-bottom: 1.5px solid #ffe0c8;
          position: relative;
          overflow: hidden;
        }
        .ss-hero::before {
          content: '';
          position: absolute;
          width: 260px; height: 260px;
          border-radius: 50%;
          background: #ffede0;
          top: -90px; right: -60px;
          z-index: 0;
        }
        .ss-hero h1 {
          color: #c95c1a;
          margin: 0 0 6px; line-height: 1.1;
          position: relative; z-index: 1;
        }
        .ss-hero-sub {
          font-size: 14px; color: #888;
          font-style: italic; position: relative; z-index: 1;
          margin: 0;
        }

        .ss-founder {
          padding: 36px 32px;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
          align-items: center;
          background: #fff;
          border-radius: var(--border-radius-lg);
          margin-top: 12px;
          border: 0.5px solid #f0e0d6;
        }
        .ss-founder-img {
          border-radius: 18px;
          width: 100%;
          height: full/200px;
          object-fit: cover;
          border: 2px solid #ffe0c8;
          display: block;
        }
        .ss-founder-badge {
          display: inline-block;
          background: #c95c1a;
          color: #fff;
          font-size: 11px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 999px;
          margin-bottom: 12px;
        }
        .ss-founder h2 {
          font-family: 'Playfair Display', serif;
          font-size: 34px; font-weight: 700;
          margin: 0 0 12px; line-height: 1.1;
          color: #1a1a1a;
        }
        .ss-founder-text {
          font-size: 13.5px; line-height: 1.75;
          color: #666;
          margin-bottom: 8px;
        }
        .ss-socials { display: flex; gap: 10px; margin-top: 16px; }
        .ss-social-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 0.5px solid #ffe0c8;
          background: #fff8f3;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s, border-color 0.2s;
          text-decoration: none;
          color: #c95c1a;
        }
        .ss-social-btn:hover { background: #c95c1a; color: #fff; border-color: #c95c1a; }
        .ss-social-btn i { font-size: 17px; }

        .ss-volunteers {
          padding: 28px 0 20px;
          overflow: hidden;
          background: #fff8f3;
          border-radius: var(--border-radius-lg);
          margin-top: 12px;
          border: 0.5px solid #f0e0d6;
        }
        .ss-vol-header { text-align: center; padding: 0 32px 18px; }
        .ss-vol-header h3 {
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 700;
          margin: 0; color: #1a1a1a;
        }

        .vol-track-wrap {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
        }
        .vol-track {
          display: flex; gap: 14px; width: max-content;
          animation: vol-scroll 24s linear infinite;
        }
        .vol-slide {
          width: 96px; flex: 0 0 auto;
          border-radius: 14px; overflow: hidden;
          border: 1px solid #ffe0c8;
          background: #fff;
          display: flex; flex-direction: column;
        }
        .vol-slide img { width: 100%; height: 96px; object-fit: cover; display: block; }
        .vol-name {
          font-size: 11px; font-weight: 500; color: #666;
          padding: 6px 4px; text-align: center;
          margin: 0; word-wrap: break-word;
          line-height: 1.3;
        }
        @keyframes vol-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 7px)); }
        }

        .ss-story {
          padding: 36px 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          align-items: center;
          background: #fff;
          border-radius: var(--border-radius-lg);
          margin-top: 12px;
          border: 0.5px solid #f0e0d6;
        }
        .ss-story-img {
          width: 100%; height: full; object-fit: cover;
          border-radius: 16px;
          border: 1.5px solid #ffe0c8;
          display: block;
        }
        .ss-story-text p { font-size: 13.5px; line-height: 1.8; color: #666; margin-bottom: 10px; }
        .ss-story-text p:last-child { margin-bottom: 0; }
        .ss-story-text strong { color: #1a1a1a; font-weight: 500; }

        .ss-cards {
          padding: 28px 32px 32px;
          background: #fff8f3;
          border-radius: var(--border-radius-lg);
          margin-top: 12px;
          border: 0.5px solid #f0e0d6;
        }
        .ss-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .ss-card {
          background: #fff;
          border: 0.5px solid #f0e0d6;
          border-radius: var(--border-radius-lg);
          padding: 20px 18px;
          position: relative; overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: default;
        }
        .ss-card:hover { transform: translateY(-5px); box-shadow: 0 10px 28px rgba(201,92,26,0.10); border-color: #f97316; }
        .ss-card-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: #fff3eb;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 12px;
          transition: background 0.3s;
        }
        .ss-card:hover .ss-card-icon { background: #c95c1a; }
        .ss-card-icon svg, .ss-card-icon .ss-card-svg { width: 20px; height: 20px; color: #c95c1a; transition: color 0.3s; }
        .ss-card:hover .ss-card-icon svg, .ss-card:hover .ss-card-icon .ss-card-svg { color: #fff; }
        .ss-card h4 { font-weight: 500; font-size: 14px; margin: 0 0 6px; color: #1a1a1a; }
        .ss-card p { font-size: 12.5px; line-height: 1.65; color: #888; margin: 0; }
        .ss-card-line {
          position: absolute; bottom: 0; left: 0; height: 2px; width: 0%;
          background: #c95c1a;
          transition: width 0.35s ease;
        }
        .ss-card:hover .ss-card-line { width: 100%; }

        /* ── Mobile Responsive ── */
        @media (max-width: 640px) {
          .ss-hero {
            padding: 28px 18px 22px;
          }
          .ss-hero h1 {
            font-size: 28px;
          }

          .ss-founder {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 24px 18px;
          }
          .ss-founder-img {
            max-height: 280px;
          }
          .ss-founder h2 {
            font-size: 26px;
          }

          .ss-vol-header {
            padding: 0 18px 14px;
          }
          .ss-vol-header h3 {
            font-size: 18px;
          }
          .vol-slide {
            width: 72px;
            height: 72px;
          }

          .ss-story {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 24px 18px;
          }

          .ss-cards {
            padding: 20px 18px 24px;
          }
          .ss-cards-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>
    </Layout>
  );
}