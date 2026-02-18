import america_cryo_logo from "@/assets/logo-official.png";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Clock, 
  Thermometer, 
  Calendar, 
  FileText, 
  Stethoscope, 
  Activity, 
  Zap, 
  Waves, 
  ShieldCheck,
  AlertCircle,
  CreditCard,
  Plus
} from "lucide-react";
import { Link, useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import thermalHorseDark from "@/assets/thermal-horse-dark.jpg";
import { cn } from "@/lib/utils";

export default function HistoryDetail() {
  const { horseId, date } = useParams();
  
  // Mock detailed data
  const detail = {
    horseName: "Thunder Spirit",
    date: "Feb 24, 2024",
    condition: "Tendonitis - Left Foreleg",
    category: "Tendon/Ligament Strain",
    status: "Completed",
    protocol: "Tendon Repair",
    temperature: "-120°C",
    doctor: "Dr. Anderson",
    notes: "Patient showed significant sensitivity in the initial 2 minutes. Temperature was stabilized at -120°C for the remainder of the session. Post-treatment thermal scan shows 45% reduction in heat signature around the affected tendon area. Recommended restricted exercise for 24 hours.",
    proposedTreatments: [
      { label: "Cryotherapy", icon: Zap, color: "text-blue-400" },
      { label: "3B Laser", icon: Activity, color: "text-red-400" }
    ],
    images: [thermalHorseDark, thermalHorseDark],
    missedTreatments: [
      { date: "Feb 15, 2024", reason: "Device Maintenance", protocol: "Recovery" }
    ]
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 pb-24 md:pb-8">
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center">
          <img src={america_cryo_logo} alt="America Cryo Logo" className="h-10 md:h-12 w-auto mb-1" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/horses">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Session detail</h1>
          <p className="text-sm text-muted-foreground">{detail.horseName} • {detail.date}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 md:hidden">
        <Link href="/billing">
          <Button className="w-full gap-2 bg-primary text-white font-bold h-11">
            <CreditCard className="w-4 h-4" /> Create Invoice
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Images Section */}
          <Card className="bg-card/50 backdrop-blur border-white/5 overflow-hidden shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xs font-black tracking-[0.2em] text-primary">Thermal Baseline & Post-Op</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {detail.images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/50 group shadow-2xl">
                    <img 
                      src={img} 
                      alt={`Thermal ${i === 0 ? 'Before' : 'After'}`} 
                      className={cn("object-cover w-full h-full opacity-90 transition-transform group-hover:scale-105", i === 1 && "grayscale")} 
                      style={i === 1 ? { filter: "hue-rotate(180deg) contrast(1.4) brightness(0.8)" } : {}}
                    />
                    <div className="absolute top-3 left-3 bg-black/80 text-white text-[9px] px-2 py-1 rounded-md backdrop-blur-md font-black border border-white/10 tracking-widest">
                      {i === 0 ? "Baseline" : "Post-Op"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Clinical Notes */}
          <Card className="bg-card/50 backdrop-blur border-white/5 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black tracking-[0.2em] text-primary">Clinical Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <Stethoscope className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-wider">{detail.category}</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed italic">"{detail.notes}"</p>
                <div className="mt-4 pt-4 border-t border-primary/10 text-[10px] text-muted-foreground font-bold tracking-widest">
                  Signed: {detail.doctor}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Status & Metrics */}
          <Card className="bg-card/50 backdrop-blur border-white/5 shadow-xl border-t-4 border-t-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xs font-black tracking-[0.2em] text-muted-foreground">Session Metrics</CardTitle>
              <Link href="/billing">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10">
                  <CreditCard className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-bold tracking-wider">Status</span>
                <Badge className="bg-green-500/20 text-green-500 border-green-500/30 font-black text-[10px] tracking-tighter">
                  {detail.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-bold tracking-wider">Protocol</span>
                <span className="text-sm font-bold text-white tracking-tight">{detail.protocol}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-bold tracking-wider">Target Temp</span>
                <div className="flex items-center gap-1 text-primary font-black">
                  <Thermometer className="w-4 h-4" />
                  {detail.temperature}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Proposed Modalities */}
          <Card className="bg-card/50 backdrop-blur border-white/5 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xs font-black tracking-[0.2em] text-muted-foreground">Treatment Modalities</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
              {detail.proposedTreatments.map((t, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  <t.icon className={cn("w-4 h-4", t.color)} />
                  <span className="text-[10px] font-black tracking-widest text-gray-300">{t.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Missed Treatments */}
          <Card className="bg-orange-500/5 backdrop-blur border-orange-500/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xs font-black tracking-[0.2em] text-orange-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Missed Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {detail.missedTreatments.map((m, i) => (
                <div key={i} className="text-xs p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 space-y-1">
                  <div className="flex justify-between font-bold text-orange-200 tracking-tighter">
                    <span>{m.date}</span>
                    <span>{m.protocol}</span>
                  </div>
                  <p className="text-[10px] text-orange-400/80 font-medium">Reason: {m.reason}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
