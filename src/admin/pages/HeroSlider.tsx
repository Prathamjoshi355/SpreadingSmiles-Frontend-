import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { adminApi } from '../services/adminApi';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

interface Slide {
  image: string;
  tag: string;
  headline: string;
  headlineAccent: string;
  sub: string;
  hindi: string;
  primaryCta: {
    label: string;
    to: string;
  };
  secondaryCta: {
    label: string;
    to: string;
  };
}

const defaultSlides: Slide[] = [
  {
    image: "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1778003131/Post_one_yrcaeg.jpg",
    tag: "A Youth-Driven NGO from Indore",
    headline: "Spreading Smiles,",
    headlineAccent: "One Life at a Time.",
    sub: "A youth-driven initiative dedicated to helping communities through education, healthcare, and social support.",
    hindi: "इंदौर के युवाओं द्वारा समाज सेवा की एक पहल",
    primaryCta: { label: "Donate Now", to: "/donate" },
    secondaryCta: { label: "Join as Volunteer", to: "/volunteer" },
  },
];

export default function HeroSliderPage() {
  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await adminApi.getHeroSlides();
        if (response.data?.data?.slides) {
          setSlides(response.data.data.slides);
        }
      } catch (error) {
        console.error('Unable to load hero slides', error);
      }
    };

    fetchSlides();
  }, []);

  const handleSlideChange = (
    index: number,
    field: keyof Slide,
    value: string | object
  ) => {
    setSlides((current) =>
      current.map((slide, idx) =>
        idx === index ? { ...slide, [field]: value } : slide
      )
    );
  };

  const handleCtaChange = (
    slideIndex: number,
    ctaType: 'primaryCta' | 'secondaryCta',
    field: 'label' | 'to',
    value: string
  ) => {
    setSlides((current) =>
      current.map((slide, idx) =>
        idx === slideIndex
          ? {
              ...slide,
              [ctaType]: { ...slide[ctaType], [field]: value },
            }
          : slide
      )
    );
  };

  const handleImageUpload = async (index: number, file: File | null) => {
    if (!file) return;

    setUploadingImage((current) => ({ ...current, [index]: true }));

    try {
      const data = new FormData();
      data.append('image', file);
      data.append('title', slides[index]?.tag || `Hero slide ${index + 1}`);
      data.append('description', slides[index]?.sub || 'Hero slide image upload');
      data.append('category', 'hero');

      const response = await adminApi.uploadImage(data);
      const imageUrl = response.data?.data?.imageUrl;

      if (imageUrl) {
        setSlides((current) =>
          current.map((slide, idx) =>
            idx === index ? { ...slide, image: imageUrl } : slide
          )
        );
      }
    } catch (error) {
      console.error('Image upload failed', error);
      toast.error('Unable to upload hero slide image.');
    } finally {
      setUploadingImage((current) => ({ ...current, [index]: false }));
    }
  };

  const handleAddSlide = () => {
    const newSlide: Slide = {
      image: '',
      tag: '',
      headline: '',
      headlineAccent: '',
      sub: '',
      hindi: '',
      primaryCta: { label: 'Donate Now', to: '/donate' },
      secondaryCta: { label: 'Learn More', to: '/what-we-do' },
    };
    setSlides([...slides, newSlide]);
  };

  const handleRemoveSlide = (index: number) => {
    setSlides((current) => current.filter((_, idx) => idx !== index));
  };

  const handleSave = async () => {
    if (slides.length === 0) {
      toast.error('Please add at least one slide');
      return;
    }

    const allValid = slides.every(
      (slide) =>
        slide.image &&
        slide.headline &&
        slide.headlineAccent &&
        slide.sub &&
        slide.tag
    );

    if (!allValid) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSaving(true);
    try {
      await adminApi.updateHeroSlides({ slides });
      toast.success('Hero slides updated successfully. Public page will refresh automatically.');
    } catch (error) {
      console.error(error);
      toast.error('Unable to save hero slides.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Hero Slider</h1>
      <p className="mb-6 text-slate-600">
        Edit the hero section slides displayed on the homepage. Images and content will update automatically.
      </p>

      <div className="space-y-8">
        {slides.map((slide, index) => (
          <Card key={index} className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-900">
                  Slide {index + 1}
                </h2>
                {slides.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveSlide(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {/* Image Upload */}
                <div>
                  <Label htmlFor={`image-${index}`} className="text-sm font-medium text-slate-700">
                    Upload Slide Image *
                  </Label>
                  <input
                    id={`image-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(index, e.target.files?.[0] || null)}
                    className="mt-1 block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                  {uploadingImage[index] && (
                    <p className="mt-2 text-sm text-slate-500">Uploading image...</p>
                  )}
                  {slide.image && (
                    <div className="mt-4 rounded-lg overflow-hidden w-full h-40">
                      <img
                        src={slide.image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Tag */}
                <div>
                  <Label htmlFor={`tag-${index}`} className="text-sm font-medium text-slate-700">
                    Tag *
                  </Label>
                  <Input
                    id={`tag-${index}`}
                    value={slide.tag}
                    onChange={(e) => handleSlideChange(index, 'tag', e.target.value)}
                    placeholder="e.g., A Youth-Driven NGO from Indore"
                    className="mt-1"
                  />
                </div>

                {/* Headline */}
                <div>
                  <Label htmlFor={`headline-${index}`} className="text-sm font-medium text-slate-700">
                    Headline *
                  </Label>
                  <Input
                    id={`headline-${index}`}
                    value={slide.headline}
                    onChange={(e) => handleSlideChange(index, 'headline', e.target.value)}
                    placeholder="e.g., Spreading Smiles,"
                    className="mt-1"
                  />
                </div>

                {/* Headline Accent */}
                <div>
                  <Label htmlFor={`accent-${index}`} className="text-sm font-medium text-slate-700">
                    Headline Accent (Orange) *
                  </Label>
                  <Input
                    id={`accent-${index}`}
                    value={slide.headlineAccent}
                    onChange={(e) => handleSlideChange(index, 'headlineAccent', e.target.value)}
                    placeholder="e.g., One Life at a Time."
                    className="mt-1"
                  />
                </div>

                {/* Sub */}
                <div>
                  <Label htmlFor={`sub-${index}`} className="text-sm font-medium text-slate-700">
                    Description *
                  </Label>
                  <Textarea
                    id={`sub-${index}`}
                    value={slide.sub}
                    onChange={(e) => handleSlideChange(index, 'sub', e.target.value)}
                    placeholder="e.g., A youth-driven initiative dedicated to helping communities..."
                    className="mt-1 min-h-[80px]"
                  />
                </div>

                {/* Hindi */}
                <div>
                  <Label htmlFor={`hindi-${index}`} className="text-sm font-medium text-slate-700">
                    Hindi Text *
                  </Label>
                  <Input
                    id={`hindi-${index}`}
                    value={slide.hindi}
                    onChange={(e) => handleSlideChange(index, 'hindi', e.target.value)}
                    placeholder="e.g., इंदौर के युवाओं द्वारा समाज सेवा की एक पहल"
                    className="mt-1"
                  />
                </div>

                {/* Primary CTA */}
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-slate-900 mb-3">Primary CTA (Main Button)</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor={`primary-label-${index}`} className="text-sm font-medium text-slate-700">
                        Button Label
                      </Label>
                      <Input
                        id={`primary-label-${index}`}
                        value={slide.primaryCta.label}
                        onChange={(e) =>
                          handleCtaChange(index, 'primaryCta', 'label', e.target.value)
                        }
                        placeholder="e.g., Donate Now"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`primary-to-${index}`} className="text-sm font-medium text-slate-700">
                        Link
                      </Label>
                      <Input
                        id={`primary-to-${index}`}
                        value={slide.primaryCta.to}
                        onChange={(e) =>
                          handleCtaChange(index, 'primaryCta', 'to', e.target.value)
                        }
                        placeholder="e.g., /donate"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Secondary CTA */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-3">Secondary CTA (Outline Button)</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor={`secondary-label-${index}`} className="text-sm font-medium text-slate-700">
                        Button Label
                      </Label>
                      <Input
                        id={`secondary-label-${index}`}
                        value={slide.secondaryCta.label}
                        onChange={(e) =>
                          handleCtaChange(index, 'secondaryCta', 'label', e.target.value)
                        }
                        placeholder="e.g., Learn More"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`secondary-to-${index}`} className="text-sm font-medium text-slate-700">
                        Link
                      </Label>
                      <Input
                        id={`secondary-to-${index}`}
                        value={slide.secondaryCta.to}
                        onChange={(e) =>
                          handleCtaChange(index, 'secondaryCta', 'to', e.target.value)
                        }
                        placeholder="e.g., /what-we-do"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <Button
          onClick={handleAddSlide}
          variant="outline"
          className="border-slate-300 text-slate-800 hover:bg-slate-50"
        >
          Add New Slide
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          {isSaving ? 'Saving...' : 'Save Hero Slides'}
        </Button>
      </div>
    </div>
  );
}
