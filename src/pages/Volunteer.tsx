import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Clock, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";

const perks = [
  { icon: Heart, title: "Real Impact", desc: "See direct change in your city, every week." },
  { icon: Clock, title: "Flexible Time", desc: "Contribute as much time as you can spare." },
  { icon: Users, title: "Amazing Community", desc: "Work with Indore's most driven youth." },
  { icon: Sparkles, title: "No Experience Needed", desc: "Just bring willingness and heart." },
];

export default function Volunteer() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.interest) {
      toast.error("Please fill in name, email, phone and interest");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Unable to submit volunteer request");
      }

      toast.success(`Thank you ${form.name}! We'll reach out to you soon.`);
      setForm({ name: "", email: "", phone: "", interest: "", message: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit volunteer request";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">Volunteer</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">
            Be a Part of the Change
          </h1>
          <p className="text-slate-600 text-lg">
            Spreading Smiles is powered by volunteers. If you want to contribute your time,
            skills, or effort, you are always welcome.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-14">
            {perks.map((p, i) => (
              <Card key={i} className="border-orange-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                    <p.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{p.title}</h3>
                  <p className="text-sm text-slate-600">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-orange-100 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Join Our Team</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="v-name">Full name</Label>
                      <Input id="v-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" required />
                    </div>
                    <div>
                      <Label htmlFor="v-phone">Phone</Label>
                      <Input id="v-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="v-email">Email</Label>
                    <Input id="v-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" required />
                  </div>
                  <div>
                    <Label htmlFor="v-interest">Area of interest</Label>
                    <Input id="v-interest" placeholder="e.g. Healthcare, Education, Community" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} className="mt-1.5" required />
                  </div>
                  <div>
                    <Label htmlFor="v-msg">Why do you want to join? (optional)</Label>
                    <Textarea id="v-msg" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1.5" />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Sign Up to Volunteer"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
