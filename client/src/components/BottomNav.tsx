import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Zap, 
  Camera, 
  Users, 
  UserCircle,
  Stethoscope,
  Plus,
  X,
  ShieldCheck,
  Loader2,
  Activity,
  Waves
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import thermalHorseDark from "@/assets/thermal-horse-dark.jpg";

export default function BottomNav() {
  const [location] = useLocation();
  const [isScanOpen, setIsScanOpen] = useState(false);
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
    setIsScanOpen(false);
    setCapturedImages([]);
    setDiagnosisNote("");
    setConditionLabel("");
    setProposedTreatment([]);
  };

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Zap, label: "Therapy", href: "/treatment" },
    { icon: Camera, label: "Diagnose", href: "#", isCenter: true, onClick: () => setIsScanOpen(true) },
    { icon: Users, label: "Horses", href: "/horses" },
    { icon: UserCircle, label: "Settings", href: "/settings" },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a0f1d] border-t border-white/5 z-50 md:hidden pb-safe shadow-2xl">
        <nav className="flex justify-around items-center h-16 relative">
          {navItems.map((item) => {
            const isActive = location === item.href;
            if (item.isCenter) {
              return (
                <div key={item.label} className="relative flex flex-col items-center justify-center -mt-8" onClick={item.onClick}>
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl active:scale-90 cursor-pointer",
                    isActive 
                      ? "bg-primary text-white shadow-primary/30" 
                      : "bg-[#1a2234] text-gray-400 border border-white/10"
                  )}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <span className={cn(
                    "mt-1 text-[10px] font-bold tracking-tight transition-colors",
                    isActive ? "text-primary" : "text-gray-500"
                  )}>
                    {item.label}
                  </span>
                </div>
              );
            }
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex flex-col items-center justify-center w-16 h-full gap-1 transition-all duration-300 relative active:scale-95 cursor-pointer",
                    isActive
                      ? "text-primary"
                      : "text-gray-500 hover:text-gray-400"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-6 h-6 transition-all duration-300",
                      isActive ? "scale-110" : "scale-100"
                    )}
                  />
                  <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active-dot"
                      className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <Dialog open={isScanOpen} onOpenChange={setIsScanOpen}>
        <DialogContent className="sm:max-w-[700px] h-[90vh] flex flex-col p-0 overflow-hidden bg-[#0a0f1d] border-white/10 shadow-2xl">
          <DialogHeader className="p-6 pb-0 border-b border-white/5 bg-[#111827] shrink-0">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Stethoscope className="w-6 h-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold tracking-tight">Clinical Assessment</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Perform real-time thermal analysis and prescribe treatments.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 p-6">
            <div className="space-y-8">
              {/* Thermography Viewport */}
              <section className="space-y-4">
                <div className="flex justify-between items-end">
                  <Label className="text-[10px] uppercase tracking-[0.2em] text-primary font-black">Digital Thermography (Live Stream)</Label>
                  <span className="text-[10px] text-gray-500 font-bold">{capturedImages.length}/4 Snapshots</span>
                </div>
                
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black group shadow-2xl ring-1 ring-white/5">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Label className="text-[10px] uppercase tracking-[0.2em] text-primary font-black">Treatment Modalities</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {treatments.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => toggleTreatment(t.id)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all text-left",
                          proposedTreatment.includes(t.id)
                            ? "bg-primary/20 border-primary text-white"
                            : "bg-[#1a2234] border-white/5 text-gray-400"
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
                <div className="rounded-xl border border-white/5 bg-[#1a2234] p-4 min-h-[120px]">
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

          <DialogFooter className="p-6 border-t border-white/5 bg-[#111827] shrink-0">
            <Button variant="ghost" onClick={() => setIsScanOpen(false)} className="text-gray-400 font-bold tracking-widest text-xs">
              Discard
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting || capturedImages.length === 0 || !conditionLabel}
              className="gap-2 bg-primary hover:bg-primary/90 text-white min-w-[180px] h-12 font-black tracking-widest"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
              Save Assessment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
