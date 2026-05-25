import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { adminApi } from '../services/adminApi';
import { toast } from 'sonner';

interface TickerItem {
  text: string;
}

const EMPTY_ITEMS: TickerItem[] = Array.from({ length: 3 }, () => ({ text: '' }));

export default function TickerItemsPage() {
  const [items, setItems] = useState<TickerItem[]>(EMPTY_ITEMS);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await adminApi.getTickerItems();
        if (response.data?.data?.items) {
          const loadedItems = response.data.data.items.slice(0, 3);
          setItems([...loadedItems, ...EMPTY_ITEMS.slice(loadedItems.length)]);
        }
      } catch (error) {
        console.error('Unable to load ticker items', error);
        toast.error('Failed to load ticker items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleItemChange = (index: number, value: string) => {
    setItems((current) =>
      current.map((item, idx) =>
        idx === index
          ? { text: value }
          : item
      )
    );
  };

  const handleSave = async () => {
    const hasEmptyText = items.some((item) => !item.text.trim());

    if (hasEmptyText) {
      toast.error('Please fill in all text fields');
      return;
    }

    setIsSaving(true);
    try {
      await adminApi.updateTickerItems({ items });
      toast.success('Ticker items updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Unable to save ticker items.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-600">Loading ticker items...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Ticker Items</h1>
      <p className="mb-6 text-slate-600">
        Manage the three text messages shown in the scrolling ticker bar on the homepage.
      </p>

      <div className="space-y-4">
        {items.map((item, index) => (
          <Card key={index} className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <Label htmlFor={`text-${index}`} className="text-sm font-medium text-slate-700">
                Text {index + 1}
              </Label>
              <Input
                id={`text-${index}`}
                value={item.text}
                onChange={(e) => handleItemChange(index, e.target.value)}
                placeholder="Enter ticker text"
                className="mt-1"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          {isSaving ? 'Saving...' : 'Save Ticker Items'}
        </Button>
      </div>
    </div>
  );
}
