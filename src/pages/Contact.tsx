import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  const infos = [
    { icon: MapPin, label: "Location", value: "Indore, Madhya Pradesh" },
    { icon: Phone, label: "Phone", value: "+91 98765 43210" },
    { icon: Mail, label: "Email", value: "hello@spreadingsmiles.in" },
    { icon: Instagram, label: "Instagram", value: "@spreadingsmiles.indore" },
  ];

  return (
    <Layout>
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">Contact</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">
            Get in Touch
          </h1>
          <p className="text-slate-600 text-lg">
            We'd love to hear from you about partnerships, volunteering, or just saying hello.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-4">
              {infos.map((info, i) => (
                <Card key={i} className="border-orange-100">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">{info.label}</div>
                      <div className="text-slate-900 font-semibold">{info.value}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-orange-100 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <h3 className="font-bold text-slate-900 text-xl mb-5">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="c-name">Name</Label>
                    <Input id="c-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" required />
                  </div>
                  <div>
                    <Label htmlFor="c-email">Email</Label>
                    <Input id="c-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" required />
                  </div>
                  <div>
                    <Label htmlFor="c-msg">Message</Label>
                    <Textarea id="c-msg" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1.5" required />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold">
                    Send Message
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
