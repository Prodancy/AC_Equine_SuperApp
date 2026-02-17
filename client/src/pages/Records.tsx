import america_cryo_logo from "@/assets/logo-official.png";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  ChevronLeft, 
  Camera, 
  X, 
  CheckCircle2,
  Loader2,
  Stethoscope,
  Activity,
  Zap,
  Waves,
  ShieldCheck,
  Plus
} from "lucide-react";
import thermalHorseDark from "@/assets/thermal-horse-dark.jpg"; 
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function Records() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 pb-24 md:pb-8">
      <div className="flex justify-center md:hidden mb-2">
        <div className="flex flex-col items-center">
          <img src={america_cryo_logo} alt="America Cryo Logo" className="h-8 w-auto mb-1" />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex items-center gap-2">
          <Link href="/">
             <Button variant="ghost" size="icon" className="md:hidden -ml-2 text-muted-foreground hover:text-primary">
               <ChevronLeft className="w-6 h-6" />
             </Button>
           </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground tracking-widest">Diagnose History</h1>
            <p className="text-sm md:text-base text-muted-foreground">Historical digital thermography assessments and baseline records.</p>
          </div>
        </div>
        <div className="flex w-full md:w-auto gap-2">
            <Link href="/diagnose">
              <Button className="flex-1 md:flex-none gap-2 bg-primary hover:bg-primary/90 text-white border-0 shadow-lg shadow-primary/20 font-bold tracking-widest h-12 px-8">
                <Camera className="w-5 h-5" /> New Scan
              </Button>
            </Link>
            <Button variant="outline" className="flex-1 md:flex-none gap-2 border-white/10 bg-card/50 hover:bg-card text-foreground font-bold tracking-widest h-12 px-6">
              <Download className="w-4 h-4" /> Export
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1 shadow-lg bg-card/50 backdrop-blur border-white/5 overflow-hidden">
          <div className="h-1 bg-primary/40 w-full" />
          <CardHeader>
            <CardTitle className="tracking-[0.2em] text-[10px] text-primary font-black">Digital Thermography History</CardTitle>
            <CardDescription className="text-gray-400">Historical digital thermography assessments and baseline records.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 md:p-6">
            <ScrollArea className="h-[500px] px-4 md:px-0">
              <div className="space-y-4 pb-4">
                {[
                  { horse: "Thunder Spirit", date: "Feb 24, 2024", condition: "Acute Inflammation", delta: "-16.4°C", status: "Baseline Captured" },
                  { horse: "Bella Luna", date: "Feb 23, 2024", condition: "Muscle Soreness", delta: "-8.2°C", status: "Post-Op Verified" },
                  { horse: "Apollo", date: "Feb 23, 2024", condition: "Joint Degeneration", delta: "-4.1°C", status: "Monitoring" },
                  { horse: "Midnight Star", date: "Feb 22, 2024", condition: "Tendon Strain", delta: "-12.5°C", status: "Baseline Captured" },
                ].map((record, i) => (
                  <div key={i} className="group bg-[#1a2234]/40 rounded-2xl p-4 border border-white/5 hover:border-primary/30 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-[10px] font-black text-primary tracking-widest mb-1">{record.date}</div>
                        <div className="text-sm font-bold text-white tracking-tight">{record.horse}</div>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] font-black tracking-tighter">
                        {record.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <div className="text-[9px] text-gray-500 font-bold tracking-widest">Clinical Category</div>
                        <div className="text-xs font-medium text-gray-300">{record.condition}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] text-gray-500 font-bold tracking-widest">Thermal Delta</div>
                        <div className="text-xs font-black text-red-400">{record.delta}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
