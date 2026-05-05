import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { adminApi } from '../services/adminApi';
import { toast } from 'sonner';

const defaultStats = [
  { key: 'raised', label: 'Raised for medical support', value: 'Rs 76,000+', icon: 'TrendingUp' },
  { key: 'activities', label: 'Social activities conducted', value: '300+', icon: 'Activity' },
  { key: 'campaigns', label: 'Awareness campaigns executed', value: '15+', icon: 'Megaphone' },
  { key: 'volunteers', label: 'Active volunteers across Indore', value: '100+', icon: 'Users' }
];

export default function ImpactStatsPage() {
  const [stats, setStats] = useState(defaultStats);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminApi.getImpactStats();
        if (response.data?.data?.stats) {
          setStats(response.data.data.stats);
        }
      } catch (error) {
        console.error('Unable to load impact stats', error);
      }
    };

    fetchStats();
  }, []);

  const handleChange = (index: number, field: 'label' | 'value', value: string) => {
    setStats((current) =>
      current.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await adminApi.updateImpactStats({ stats });
      toast.success('Impact stats updated successfully. Public page will refresh automatically.');
    } catch (error) {
      console.error(error);
      toast.error('Unable to save impact stats.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Impact Stats</h1>
      <p className="mb-6 text-slate-600">
        Update the headline values shown on the public Impact page. These values are stored in the database and will refresh automatically.
      </p>

      <div className="space-y-6">
        {stats.map((stat, index) => (
          <Card key={stat.key} className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Stat {index + 1}</h2>
                  <p className="text-sm text-slate-500">Icon: {stat.icon}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor={`label-${index}`} className="text-sm font-medium text-slate-700">
                    Label
                  </Label>
                  <Input
                    id={`label-${index}`}
                    value={stat.label}
                    onChange={(e) => handleChange(index, 'label', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`value-${index}`} className="text-sm font-medium text-slate-700">
                    Value
                  </Label>
                  <Input
                    id={`value-${index}`}
                    value={stat.value}
                    onChange={(e) => handleChange(index, 'value', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Button onClick={handleSave} disabled={isSaving} className="bg-orange-600 hover:bg-orange-700 text-white">
          {isSaving ? 'Saving...' : 'Save Impact Stats'}
        </Button>
      </div>
    </div>
  );
}
