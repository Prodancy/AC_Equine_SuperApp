import america_cryo_logo from "@/assets/logo-official.png";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Stethoscope, 
  Zap, 
  Activity, 
  Waves, 
  ShieldCheck, 
  X, 
  Loader2, 
  Camera,
  History,
  ArrowRight,
  Plus
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Diagnose() {
  const [, setLocation] = useLocation();

  const previousDiagnoses = [
    { horse: "Thunder Spirit", date: "Feb 24, 2024", condition: "Acute Inflammation", delta: "-16.4°C", status: "Baseline" },
    { horse: "Bella Luna", date: "Feb 23, 2024", condition: "Muscle Soreness", delta: "-8.2°C", status: "Post-Op" },
    { horse: "Apollo", date: "Feb 23, 2024", condition: "Joint Degeneration", delta: "-4.1°C", status: "Follow-up" },
    { horse: "Midnight Star", date: "Feb 22, 2024", condition: "Tendon Strain", delta: "-12.5°C", status: "Baseline" },
  ];

  return (
    <div className="min-h-screen text-white p-3 md:p-6 pb-20 md:pb-6 bg-[#0a0f1d]">
      <div className="flex justify-center mb-8">
        <div className="flex flex-col items-center">
          <img src={america_cryo_logo} alt="America Cryo Logo" className="h-7 md:h-9 w-auto mb-1" />
        </div>
      </div>
      <div className="flex justify-between items-center bg-card/30 backdrop-blur-md sticky top-0 z-50 py-4 px-4 md:px-8 border-b border-white/5 -mx-4 md:-mx-8 mb-6">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Diagnose</h1>
            <p className="text-[10px] text-muted-foreground tracking-tight hidden md:block">Clinical assessments & thermography</p>
          </div>
        </div>
        <Link href="/diagnose/new">
          <Button size="sm" className="gap-2 shadow-md h-9 text-[10px] font-bold">
            <Plus className="w-4 h-4" /> <span>New assessment</span>
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-card/50 backdrop-blur border-white/5 overflow-hidden">
          <CardHeader className="border-b border-white/5 bg-white/[0.02]">
            <CardTitle className="text-[10px] font-semibold text-white">Assessment registry</CardTitle>
            <CardDescription className="text-gray-500 text-xs">A comprehensive list of all clinical evaluations</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="divide-y divide-white/5">
                {previousDiagnoses.map((diag, i) => (
                  <div key={i} className="p-4 hover:bg-white/[0.02] transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Stethoscope className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-primary transition-colors">{diag.horse}</h3>
                          <p className="text-[10px] text-gray-500 font-medium tracking-tighter">{diag.date}</p>
                        </div>
                      </div>
                      <Badge className="bg-white/5 text-gray-400 border-white/10 text-[8px] font-black tracking-widest">
                        {diag.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex gap-4">
                        <div className="space-y-0.5">
                          <p className="text-[8px] text-gray-600 font-black tracking-widest">Category</p>
                          <p className="text-xs text-gray-300">{diag.condition}</p>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[8px] text-gray-600 font-black tracking-widest">Thermal Delta</p>
                          <p className="text-xs text-red-400 font-bold">{diag.delta}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 text-[10px] font-black tracking-widest">
                        View Report <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-white/5 overflow-hidden h-fit">
          <CardHeader className="border-b border-white/5 bg-white/[0.02]">
            <CardTitle className="text-[10px] tracking-[0.2em] text-white font-black">Statistics</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <p className="text-[9px] text-gray-500 font-black tracking-widest text-center">Total Assessments</p>
              <p className="text-4xl font-black text-white text-center tracking-tighter">124</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                <p className="text-[8px] text-gray-600 font-black tracking-widest mb-1">Success Rate</p>
                <p className="text-lg font-bold text-green-400">92%</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                <p className="text-[8px] text-gray-600 font-black tracking-widest mb-1">Active Cases</p>
                <p className="text-lg font-bold text-primary">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
