import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/global/ui/card";
import { Button } from "@/components/global/ui/button";
import { Progress } from "@/components/global/ui/progress";
import { Settings } from "lucide-react";
import { Slider } from "@/components/global/ui/slider"; // 1. Impor komponen Slider baru

// Tipe data & data awal hanya ada di file ini
interface LifeArea {
  id: number;
  name: string;
  score: number;
  color: string;
}

const initialAreas: LifeArea[] = [
  { id: 1, name: 'Kesehatan & Kebugaran', score: 75, color: 'bg-green-500' },
  { id: 2, name: 'Karir & Pekerjaan', score: 80, color: 'bg-blue-500' },
  { id: 3, name: 'Pikiran & Spiritualitas', score: 60, color: 'bg-purple-500' },
  { id: 4, name: 'Keuangan', score: 70, color: 'bg-yellow-500' },
  { id: 5, name: 'Hubungan', score: 85, color: 'bg-red-500' },
  { id: 6, name: 'Pengembangan Diri', score: 65, color: 'bg-teal-500' },
];

// Komponen Utama LifeBalance
const LifeBalance = () => {
  const [areas, setAreas] = useState<LifeArea[]>(initialAreas);

  const handleUpdateScore = (id: number, score: number) => {
    const newScore = Math.max(0, Math.min(100, score));
    setAreas(prev => prev.map(area => area.id === id ? { ...area, score: newScore } : area));
  };

  const overallScore = areas.length > 0
    ? Math.round(areas.reduce((sum, area) => sum + area.score, 0) / areas.length)
    : 0;
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-3xl font-bold">Life Balance</h1>
          <p className="text-muted-foreground">Pandangan holistik tentang kesejahteraan Anda.</p>
        </div>
        <Button variant="outline"><Settings className="mr-2 h-4 w-4" /> Konfigurasi</Button>
      </div>

      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-6xl font-bold text-primary">{overallScore}</div>
          <p className="text-muted-foreground mt-2">Skor Keseimbangan Hidup</p>
          <Progress value={overallScore} className="mt-4 h-3" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {areas.map(area => (
          <Card key={area.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{area.name}</span>
                <span className="text-lg font-semibold">{area.score}%</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* 2. Ganti input range dengan komponen Slider yang lebih canggih dan dapat di-style */}
              <Slider
                value={[area.score]}
                onValueChange={(value: number[]) => handleUpdateScore(area.id, value[0])}
                max={100}
                step={1}
                aria-label={`Skor untuk ${area.name}`}
                // 3. Trik CSS: Kirim warna dinamis melalui variabel CSS ke komponen Slider
                style={{ 
                  '--slider-range-color': `var(--${area.color.replace('bg-', '')})` 
                } as React.CSSProperties}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LifeBalance;
