import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Activity, Megaphone, Users } from "lucide-react";

const healthcareImage =
  "https://mgx-backend-cdn.metadl.com/generate/images/923119/2026-04-25/nj6c5eiaafna/impact-healthcare.png";

const stats = [
  { icon: TrendingUp, value: "Rs 76,000+", label: "Raised for medical support" },
  { icon: Activity, value: "300+", label: "Social activities conducted" },
  { icon: Megaphone, value: "15+", label: "Awareness campaigns executed" },
  { icon: Users, value: "100+", label: "Active volunteers across Indore" },
];

export default function Impact() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">Our Impact</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">
            Real Numbers. Real People.
          </h1>
          <p className="text-slate-600 text-lg">
            Honest results from a youth-driven movement in Indore.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {stats.map((s, i) => (
              <Card key={i} className="border-orange-100 text-center">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                    <s.icon className="w-7 h-7 text-orange-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{s.value}</div>
                  <div className="text-sm text-slate-600">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src={healthcareImage} alt="Medical support camp" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">Behind the numbers</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-4">
                Every number is a person we showed up for.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Medical bills covered. Blood donors mobilized in emergencies. Strays fed
                every week. Old age homes visited every month. Classrooms brightened with
                books and supplies.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We don't chase headlines. We chase impact, one smile at a time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
