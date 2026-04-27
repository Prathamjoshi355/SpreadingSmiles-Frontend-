import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/api-url";

const fallbackImages = [
  { src: "https://mgx-backend-cdn.metadl.com/generate/images/923119/2026-04-25/nj6cuhaaafla/hero-volunteers-community.png", alt: "Volunteers with community" },
  { src: "https://mgx-backend-cdn.metadl.com/generate/images/923119/2026-04-25/nj6ct6qaafnq/about-team-group.png", alt: "Team group photo" },
  { src: "https://mgx-backend-cdn.metadl.com/generate/images/923119/2026-04-25/nj6c5eiaafna/impact-healthcare.png", alt: "Blood donation camp" },
  { src: "https://mgx-backend-cdn.metadl.com/generate/images/923119/2026-04-25/nj6ctoaaafmq/impact-children.png", alt: "Children receiving support" },
  { src: "https://mgx-backend-cdn.metadl.com/generate/images/923119/2026-04-25/nj6cuhaaafla/hero-volunteers-community.png", alt: "Community outreach" },
  { src: "https://mgx-backend-cdn.metadl.com/generate/images/923119/2026-04-25/nj6ctoaaafmq/impact-children.png", alt: "Child welfare" },
];

export default function Gallery() {
  const [images, setImages] = useState(fallbackImages);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(apiUrl("/gallery"));
        if (!response.ok) return;

        const result = await response.json();
        if (!result.data?.length) return;

        setImages(
          result.data.map((item) => ({
            src: item.imageUrl,
            alt: item.title || "Gallery image",
          }))
        );
      } catch (error) {
        console.error("Error loading gallery:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Layout>
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">Gallery</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">
            Our Work in Action
          </h1>
          <p className="text-slate-600 text-lg">
            A glimpse of our journey through real moments, real people, and real impact.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {images.map((img, i) => (
              <div key={i} className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow aspect-[4/3]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
