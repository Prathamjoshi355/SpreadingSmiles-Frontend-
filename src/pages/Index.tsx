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
} from "lucide-react";

const heroImage =
  "https://mgx-backend-cdn.metadl.com/generate/images/923119/2026-04-25/nj6cuhaaafla/hero-volunteers-community.png";
const childrenImage =
  "https://mgx-backend-cdn.metadl.com/generate/images/923119/2026-04-25/nj6ctoaaafmq/impact-children.png";

const categories = [
  { icon: HeartPulse, title: "Healthcare", desc: "Medical aid & blood drives" },
  { icon: PawPrint, title: "Animal Welfare", desc: "Feed, rescue & treat strays" },
  { icon: GraduationCap, title: "Education", desc: "Awards & student support" },
  { icon: Megaphone, title: "Awareness", desc: "Mental health & social issues" },
  { icon: Users2, title: "Elderly Care", desc: "Old age home visits" },
  { icon: Leaf, title: "Environment", desc: "Clean drives & I Love Indore" },
  { icon: Baby, title: "Child Welfare", desc: "Orphanage support" },
];

const stats = [
  { value: "Rs 76,000+", label: "Raised for medical support" },
  { value: "300+", label: "Social activities conducted" },
  { value: "15+", label: "Awareness campaigns" },
  { value: "100+", label: "Active volunteers" },
];

export default function Index() {
  return (
    <Layout>
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Volunteers helping community in Indore"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-slate-900/40" />
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 text-orange-100 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 backdrop-blur">
              <HandHeart className="w-4 h-4" />
              A Youth-Driven NGO from Indore
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
              Spreading Smiles,
              <br />
              <span className="text-orange-400">One Life at a Time.</span>
            </h1>
            <p className="text-lg text-slate-200 mb-3 leading-relaxed">
              A youth-driven initiative dedicated to helping communities through
              education, healthcare, and social support.
            </p>
            <p className="text-base text-orange-200 italic mb-8">
              {"\u0907\u0902\u0926\u094c\u0930 \u0915\u0947 \u092f\u0941\u0935\u093e\u0913\u0902 \u0926\u094d\u0935\u093e\u0930\u093e \u0938\u092e\u093e\u091c \u0938\u0947\u0935\u093e \u0915\u0940 \u090f\u0915 \u092a\u0939\u0932"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/donate">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold w-full sm:w-auto">
                  Donate Now
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button
                  size="lg"
                  variant="outline"
                  className="!bg-transparent !hover:bg-white/10 border-white text-white hover:text-white font-semibold w-full sm:w-auto"
                >
                  Join as Volunteer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">Our Mission</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-5">
              Small Efforts. Real Change.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Spreading Smiles is a nonprofit organization based in Indore that works across
              multiple social areas, healthcare, education, animal welfare, and community
              development. Our mission is simple: to bring real change through small consistent efforts.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">{s.value}</div>
                <div className="text-sm text-orange-100">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Seven Ways We Make a Difference
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat, i) => (
              <Card key={i} className="border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                    <cat.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{cat.title}</h3>
                  <p className="text-sm text-slate-600">{cat.desc}</p>
                </CardContent>
              </Card>
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

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src={childrenImage} alt="Children receiving support" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">Join Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                Every Smile Starts With You.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Whether you give your time, skills, or support, your contribution creates
                real impact in real lives. No experience needed. Just willingness to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/donate">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold w-full sm:w-auto">
                    Donate
                  </Button>
                </Link>
                <Link to="/volunteer">
                  <Button size="lg" variant="outline" className="border-slate-300 text-slate-800 hover:bg-slate-50 font-semibold w-full sm:w-auto">
                    Volunteer
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
