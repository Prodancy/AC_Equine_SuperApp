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
  Thermometer,
  ArrowRight
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import thermalHorseDark from "@/assets/thermal-horse-dark.jpg";
import { cn } from "@/lib/utils";

export default function Diagnose() {
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

  const previousDiagnoses = [
    { horse: "Thunder Spirit", date: "Feb 24, 2024", condition: "Acute Inflammation", delta: "-16.4°C" },
    { horse: "Bella Luna", date: "Feb 23, 2024", condition: "Muscle Soreness", delta: "-8.2°C" },
    { horse: "Apollo", date: "Feb 23, 2024", condition: "Joint Degeneration", delta: "-4.1°C" },
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
    setLocation("/records");
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0f1d] overflow-hidden">
      {/* Header */}
      <header className="p-4 md:p-6 border-b border-white/5 bg-[#111827] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Stethoscope className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase tracking-widest">New Assessment</h1>
              <p className="text-xs text-gray-400 hidden md:block">Real-time Digital Thermography & Clinical Diagnosis</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => setLocation("/")} className="text-gray-400 font-bold tracking-widest text-xs hidden sm:flex">
            Discard
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || capturedImages.length === 0 || !conditionLabel}
            className="gap-2 bg-primary hover:bg-primary/90 text-white min-w-[140px] h-10 font-black tracking-widest text-xs"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            Save Assessment
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden flex-col lg:flex-row">
        {/* Main Assessment Content */}
        <ScrollArea className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Thermography Viewport */}
            <section className="space-y-4">
              <div className="flex justify-between items-end">
                <Label className="text-[10px] uppercase tracking-[0.2em] text-primary font-black">Digital Thermography (Live Stream)</Label>
                <span className="text-[10px] text-gray-500 font-bold">{capturedImages.length}/4 Snapshots</span>
              </div>
              
              <div className="relative aspect-video lg:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-black group shadow-2xl ring-1 ring-white/5">
                <img src={thermalHorseDark} className="object-cover w-full h-full opacity-80" alt="Thermal Stream" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Digital Overlays */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-red-400">
                    MAX: 38.4°C
                  </div>
                  <div className="px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-blue-400">
                    MIN: 19.2°C
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 animate-pulse">
                  <div className="flex items-center gap-2 px-2 py-1 rounded bg-red-500/20 border border-red-500/40 text-[10px] font-bold text-red-500">
                    <div className="w-2 h-2 rounded-full bg-red-500" /> REC
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-32 h-32 border border-white/20 rounded-full border-dashed" />
                </div>

                <Button 
                  onClick={handleCapture}
                  disabled={capturedImages.length >= 4}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 border-4 border-white/40 backdrop-blur-xl flex items-center justify-center group"
                >
                  <div className="w-10 h-10 rounded-full bg-red-500 group-active:scale-90 transition-transform" />
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-3 pt-2">
                {capturedImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/40 group">
                    <img src={img} className="object-cover w-full h-full opacity-90" alt={`Snapshot ${idx + 1}`} />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-1 right-1 w-5 h-5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(idx)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                {[...Array(Math.max(0, 4 - capturedImages.length))].map((_, i) => (
                  <div key={i} className="aspect-square rounded-xl border border-dashed border-white/5 bg-white/[0.02]" />
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="space-y-3">
                <Label className="text-[10px] uppercase tracking-[0.2em] text-primary font-black">Clinical Category</Label>
                <Select value={conditionLabel} onValueChange={setConditionLabel}>
                  <SelectTrigger className="bg-[#1a2234] border-white/5 h-12 rounded-xl text-gray-200">
                    <SelectValue placeholder="Select condition..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a2234] border-white/10 text-gray-200">
                    <SelectItem value="inflammation">Acute Inflammation</SelectItem>
                    <SelectItem value="tendon">Tendon/Ligament Strain</SelectItem>
                    <SelectItem value="muscle">Muscle Soreness</SelectItem>
                    <SelectItem value="joint">Joint Degeneration</SelectItem>
                  </SelectContent>
                </Select>
              </section>

              <section className="space-y-3">
                <Label className="text-[10px] uppercase tracking-[0.2em] text-primary font-black">Proposed Modalities</Label>
                <div className="grid grid-cols-2 gap-2">
                  {treatments.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => toggleTreatment(t.id)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all text-left",
                        proposedTreatment.includes(t.id)
                          ? "bg-primary/20 border-primary text-white"
                          : "bg-[#1a2234] border-white/5 text-gray-400 hover:border-white/20"
                      )}
                    >
                      <t.icon className={cn("w-4 h-4", proposedTreatment.includes(t.id) ? t.color : "text-gray-500")} />
                      <span className="text-[10px] font-bold uppercase tracking-tight">{t.label}</span>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <section className="space-y-3">
              <Label className="text-[10px] uppercase tracking-[0.2em] text-primary font-black">Clinical Notes</Label>
              <div className="rounded-xl border border-white/5 bg-[#1a2234] p-4 min-h-[160px] focus-within:border-primary/40 transition-colors">
                <textarea 
                  placeholder="Describe thermal findings and anatomical observations..." 
                  className="w-full bg-transparent border-0 p-0 focus:ring-0 text-sm leading-relaxed text-gray-200 resize-none h-full"
                  value={diagnosisNote}
                  onChange={(e) => setDiagnosisNote(e.target.value)}
                />
              </div>
            </section>
          </div>
        </ScrollArea>

        {/* Sidebar - Recent Assessments */}
        <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/5 bg-[#0a0f1d] flex flex-col shrink-0">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-[10px] uppercase tracking-widest text-muted-foreground font-black flex items-center gap-2">
              <History className="w-3 h-3" /> Recent Assessments
            </h2>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              {previousDiagnoses.map((diag, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[9px] font-black text-primary uppercase tracking-tighter">{diag.date}</span>
                    <Badge variant="outline" className="text-[8px] h-4 px-1.5 border-white/10 text-gray-500">{diag.delta}</Badge>
                  </div>
                  <p className="text-xs font-bold text-white mb-1">{diag.horse}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-gray-500 font-medium">{diag.condition}</p>
                    <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>
      </div>
    </div>
  );
}
