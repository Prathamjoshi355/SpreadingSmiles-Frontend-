import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  HeartPulse,
  PawPrint,
  GraduationCap,
  Megaphone,
  Users2,
  Leaf,
  Baby,
} from "lucide-react";

const items = [
  {
    icon: HeartPulse,
    title: "Healthcare Support",
    desc: "We provide medical assistance to those in need, including financial help and organizing blood donation drives.",
  },
  {
    icon: PawPrint,
    title: "Animal Welfare",
    desc: "We actively work towards feeding, rescuing, and treating stray animals.",
  },
  {
    icon: GraduationCap,
    title: "Education & Talent Development",
    desc: "We support students through recognition programs, awards, and educational activities.",
  },
  {
    icon: Megaphone,
    title: "Social Awareness",
    desc: "We conduct awareness campaigns on mental health, digital well-being, and social issues.",
  },
  {
    icon: Users2,
    title: "Elderly Care",
    desc: "We regularly visit old age homes and support senior citizens.",
  },
  {
    icon: Leaf,
    title: "Environmental Initiatives",
    desc: "We organize cleanliness drives and campaigns like \"I Love Indore\" to promote a better environment.",
  },
  {
    icon: Baby,
    title: "Child Welfare",
    desc: "We work with orphanages and support underprivileged children.",
  },
];

export default function WhatWeDo() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">What We Do</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">
            Our Work Across Seven Areas
          </h1>
          <p className="text-slate-600 text-lg">
            Real action across the causes that matter most to our community.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {items.map((item, i) => (
              <Card key={i} className="border-orange-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-orange-600 mb-1">0{i + 1}</div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
