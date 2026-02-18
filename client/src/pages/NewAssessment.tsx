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
  List,
  ListOrdered,
  Type
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import thermalHorseDark from "@/assets/thermal-horse-dark.jpg";
import { cn } from "@/lib/utils";

export default function NewAssessment() {
  const [, setLocation] = useLocation();
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [diagnosisNote, setDiagnosisNote] = useState("");
  const [conditionLabel, setConditionLabel] = useState("");
  const [proposedTreatment, setProposedTreatment] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const treatments = [
    { id: "cryo", label: "Cryotherapy", icon: Zap, color: "text-blue-400" },
    { id: "3b_laser", label: "3B Laser", icon: Activity, color: "text-red-400" },
    { id: "shockwave", label: "Shockwave", icon: Waves, color: "text-orange-400" },
    { id: "class_iv", label: "Class IV Laser", icon: ShieldCheck, color: "text-purple-400" },
  ];

  const handleCapture = () => {
    if (capturedImages.length < 4) {
      setCapturedImages([...capturedImages, thermalHorseDark]);
    }
  };

  const toggleTreatment = (id: string) => {
    setProposedTreatment(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const removeImage = (index: number) => {
    setCapturedImages(capturedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setLocation("/diagnose");
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0f1d] overflow-hidden">
      <div className="flex justify-center mb-6 pt-4">
        <div className="flex flex-col items-center">
          <img src={america_cryo_logo} alt="America Cryo Logo" className="h-10 md:h-12 w-auto mb-1" />
        </div>
      </div>
      <header className="p-4 md:p-6 border-b border-white/5 bg-[#111827]/50 backdrop-blur-md flex items-center justify-between shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/diagnose">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 shadow-lg shadow-primary/5">
              <Stethoscope className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">New assessment</h1>
              <p className="text-[10px] text-gray-500 font-bold hidden md:block">Real-time digital thermography</p>
            </div>
          </div>
        </div>
        <Button variant="ghost" onClick={() => setLocation("/diagnose")} className="text-gray-400 font-bold text-[10px] hover:text-white transition-colors">
          Discard
        </Button>
      </header>

      <ScrollArea className="flex-1">
        <div className="max-w-4xl mx-auto p-4 md:p-10 space-y-4 pb-12">
          <section className="space-y-2">
            <div className="flex justify-between items-end">
              <Label className="text-[11px] tracking-[0.1em] text-white font-bold">Digital Thermography (Live Stream)</Label>
              <span className="text-[10px] text-gray-500 font-bold tracking-widest">{capturedImages.length}/4 Snapshots</span>
            </div>
            
            <div className="relative aspect-video lg:aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 bg-black group shadow-2xl ring-1 ring-white/5">
              <img src={thermalHorseDark} className="object-cover w-full h-full opacity-80 transition-transform duration-700 group-hover:scale-105" alt="Thermal Stream" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-xl border border-white/10 text-[10px] font-mono text-red-400 shadow-xl">
                  MAX: 38.4°C
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-xl border border-white/10 text-[10px] font-mono text-blue-400 shadow-xl">
                  MIN: 19.2°C
                </div>
              </div>
              
              <div className="absolute top-6 right-6 animate-pulse">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-[10px] font-black text-red-500 backdrop-blur-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" /> LIVE REC
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-40 h-40 border border-white/10 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
                <div className="absolute w-2 h-2 bg-primary rounded-full" />
              </div>

              <Button 
                onClick={handleCapture}
                disabled={capturedImages.length >= 4}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 border-4 border-white/40 backdrop-blur-2xl flex items-center justify-center group transition-all active:scale-90"
              >
                <div className="w-12 h-12 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]" />
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-4 pt-2">
              {capturedImages.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-[1.25rem] overflow-hidden border border-white/10 bg-black/40 group ring-1 ring-white/5 shadow-xl">
                  <img src={img} className="object-cover w-full h-full opacity-90 transition-transform duration-500 group-hover:scale-110" alt={`Snapshot ${idx + 1}`} />
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 w-7 h-7 rounded-xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
                    onClick={() => removeImage(idx)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-[8px] text-white backdrop-blur-md border border-white/10 font-black tracking-widest">
                    View {idx + 1}
                  </div>
                </div>
              ))}
              {[...Array(Math.max(0, 4 - capturedImages.length))].map((_, i) => (
                <div key={i} className="aspect-square rounded-[1.25rem] border-2 border-dashed border-white/5 bg-white/[0.02] flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white/5" />
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section className="space-y-2">
              <Label className="text-[11px] tracking-[0.1em] text-white font-bold">Clinical Category</Label>
              <Select value={conditionLabel} onValueChange={setConditionLabel}>
                <SelectTrigger className="bg-[#1a2234]/50 border-white/5 h-14 rounded-2xl text-gray-200 focus:ring-primary/20 transition-all shadow-inner">
                  <SelectValue placeholder="Select diagnostic focus..." />
                </SelectTrigger>
                <SelectContent className="bg-[#1a2234] border-white/10 text-gray-200">
                  <SelectItem value="inflammation" className="focus:bg-primary/20">Acute Inflammation</SelectItem>
                  <SelectItem value="tendon" className="focus:bg-primary/20">Tendon/Ligament Strain</SelectItem>
                  <SelectItem value="muscle" className="focus:bg-primary/20">Muscle Soreness</SelectItem>
                  <SelectItem value="joint" className="focus:bg-primary/20">Joint Degeneration</SelectItem>
                </SelectContent>
              </Select>
            </section>

            <section className="space-y-2">
              <Label className="text-[11px] tracking-[0.1em] text-white font-bold">Proposed Modalities</Label>
              <div className="grid grid-cols-2 gap-3">
                {treatments.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => toggleTreatment(t.id)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all text-left shadow-lg",
                      proposedTreatment.includes(t.id)
                        ? "bg-primary/20 border-primary text-white scale-[1.02] shadow-primary/10"
                        : "bg-[#1a2234]/50 border-white/5 text-gray-400 hover:border-white/20"
                    )}
                  >
                    <t.icon className={cn("w-4 h-4", proposedTreatment.includes(t.id) ? t.color : "text-gray-500")} />
                    <span className="text-[10px] font-black tracking-widest">{t.label}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <section className="space-y-2 pb-1">
            <Label className="text-[11px] tracking-[0.1em] text-white font-bold">Clinical Notes</Label>
            <div className="rounded-[1.5rem] border border-white/5 bg-[#1a2234]/50 overflow-hidden focus-within:border-primary/40 transition-all shadow-2xl">
              <div className="flex items-center gap-1 p-3 border-b border-white/5 bg-white/[0.03]">
                <div className="flex gap-1 px-1 border-r border-white/10 mr-1">
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white hover:bg-white/5">
                    <Type className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white hover:bg-white/5">
                    <List className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white hover:bg-white/5">
                    <ListOrdered className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <textarea 
                placeholder="Document detailed veterinary observations and assessment results..." 
                className="w-full bg-transparent border-0 p-6 focus:ring-0 text-sm leading-relaxed text-gray-200 resize-none h-48 no-scrollbar"
                value={diagnosisNote}
                onChange={(e) => setDiagnosisNote(e.target.value)}
              />
            </div>
          </section>

          <div className="pt-1">
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting || capturedImages.length === 0 || !conditionLabel}
              className="w-full gap-3 bg-primary hover:bg-primary/90 text-white h-14 font-bold text-xs shadow-[0_10px_30px_rgba(239,68,68,0.2)] transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing assessment...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Finalize & save to EHR
                </>
              )}
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
