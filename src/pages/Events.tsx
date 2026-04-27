import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin, Users } from "lucide-react";

type Activity = {
  _id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  location?: string;
  volunteers?: number;
  images?: string[];
};

export default function Events() {
  const [events, setEvents] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/activity");
        if (!response.ok) return;

        const result = await response.json();
        setEvents(result.data || []);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Layout>
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">Events</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">
            Activities & Events
          </h1>
          <p className="text-slate-600 text-lg">
            Follow our latest drives, campaigns, awareness programs, and community activities.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center text-slate-600">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center text-slate-600">No events have been added yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {events.map((event) => (
                <Card key={event._id} className="border-orange-100 overflow-hidden hover:shadow-lg transition-shadow">
                  {event.images?.[0] && (
                    <div className="aspect-[4/3] bg-slate-100">
                      <img
                        src={event.images[0]}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="text-xs font-semibold text-orange-600 uppercase mb-2">
                      {event.category}
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-3">{event.title}</h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {event.description}
                    </p>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-orange-600" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-orange-600" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {typeof event.volunteers === "number" && event.volunteers > 0 && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-orange-600" />
                          <span>{event.volunteers} volunteers</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
