import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Sparkles } from "lucide-react";

const teamImage =
  "https://mgx-backend-cdn.metadl.com/generate/images/923119/2026-04-25/nj6ct6qaafnq/about-team-group.png";

export default function About() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">
            About Spreading Smiles
          </h1>
          <p className="text-slate-600 text-lg italic">
            "Indore Educated Youth Organization"
          </p>
        </div>
      </section>

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

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-orange-100">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Our Mission</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To bring real change through small consistent efforts in healthcare,
                  education, and community welfare.
                </p>
              </CardContent>
            </Card>
            <Card className="border-orange-100">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Our People</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Educated youth of Indore coming together to serve their city with
                  hands-on action and genuine care.
                </p>
              </CardContent>
            </Card>
            <Card className="border-orange-100">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Our Approach</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Hands-on, honest, and community-first. We show up, we act, and we make
                  sure every rupee reaches the right place.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
