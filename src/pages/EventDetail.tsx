import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { CalendarDays, MapPin, Users, ArrowLeft } from 'lucide-react';
import { apiUrl } from '@/lib/api-url';

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

type GalleryImage = {
  _id: string;
  imageUrl: string;
  title?: string;
  date?: string;
};

export default function EventDetail() {
  const { id } = useParams();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [galleryLoading, setGalleryLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      if (!id) return;
      try {
        const response = await fetch(apiUrl(`/activity/${id}`));
        if (!response.ok) {
          throw new Error('Activity not found');
        }
        const result = await response.json();
        setActivity(result.data);
      } catch (error) {
        console.error('Error loading activity:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchGalleryImages = async () => {
      if (!id) return;
      try {
        const response = await fetch(apiUrl(`/gallery/activity/${id}`));
        if (!response.ok) return;
        const result = await response.json();
        setGalleryImages(result.data || []);
      } catch (error) {
        console.error('Error loading gallery images:', error);
      } finally {
        setGalleryLoading(false);
      }
    };

    fetchActivity();
    fetchGalleryImages();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="py-20 text-center text-slate-600">Loading event...</div>
      </Layout>
    );
  }

  if (!activity) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Event not found</h1>
          <Link to="/events" className="text-orange-600 font-semibold">
            Back to Events
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700">
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-5">{activity.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-orange-600" />
              {new Date(activity.date).toLocaleDateString()}
            </span>
            {activity.location && (
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-600" />
                {activity.location}
              </span>
            )}
            {activity.volunteers != null && (
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-600" />
                {activity.volunteers} volunteer{activity.volunteers !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <p className="text-lg leading-8 text-slate-700">{activity.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activity.images?.map((image) => (
              <div key={image} className="rounded-xl overflow-hidden shadow-md bg-white">
                <img src={image} alt={activity.title} className="w-full h-48 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Related Gallery Images</h2>
            <p className="text-slate-600 mt-2">These images were uploaded for this event and help show its impact.</p>
          </div>

          {galleryLoading ? (
            <div className="text-center text-slate-600">Loading gallery images...</div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center text-slate-600">No related gallery images yet.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img) => (
                <div key={img._id} className="group rounded-xl overflow-hidden shadow-md bg-white">
                  <img src={img.imageUrl} alt={img.title || 'Event image'} className="w-full h-56 object-cover" />
                  <div className="p-4">
                    {img.title && <h3 className="font-semibold text-slate-900 mb-1">{img.title}</h3>}
                    {img.date && <p className="text-sm text-slate-500">{new Date(img.date).toLocaleDateString()}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
