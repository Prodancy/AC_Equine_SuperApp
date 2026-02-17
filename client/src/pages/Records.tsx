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
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground tracking-widest uppercase">Diagnose</h1>
            <p className="text-sm md:text-base text-muted-foreground">Assess condition and propose precision treatments.</p>
          </div>
        </div>
        <div className="flex w-full md:w-auto gap-2">
            <Dialog open={isScanOpen} onOpenChange={setIsScanOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 md:flex-none gap-2 bg-primary hover:bg-primary/90 text-white border-0 shadow-lg shadow-primary/20 font-bold tracking-widest h-12 px-8">
                  <Camera className="w-5 h-5" /> NEW SCAN
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] max-h-[95vh] flex flex-col p-0 overflow-hidden bg-[#0a0f1d] border-white/10 shadow-2xl">
                <DialogHeader className="p-6 pb-0 border-b border-white/5 bg-[#111827]">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Stethoscope className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <DialogTitle className="text-xl font-bold tracking-tight">Clinical Assessment</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Capture thermal data and define treatment protocols.
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-8">
                    {/* Image Capture Section */}
                    <section className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Label className="text-[10px] uppercase tracking-[0.2em] text-primary font-black">Thermal Imaging (Max 4)</Label>
                        <span className="text-[10px] text-gray-500 font-bold">{capturedImages.length}/4 Images</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {capturedImages.map((img, idx) => (
                          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/40 group ring-1 ring-white/5">
                            <img src={img} className="object-cover w-full h-full opacity-90 transition-transform duration-500 group-hover:scale-110" alt={`Capture ${idx + 1}`} />
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(idx)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                            <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/60 text-[9px] text-white backdrop-blur-md border border-white/10 font-bold">
                              VIEW {idx + 1}
                            </div>
                          </div>
                        ))}
                        {capturedImages.length < 4 && (
                          <button 
                            onClick={handleCapture}
                            className="aspect-square rounded-xl border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 flex flex-col items-center justify-center gap-2 transition-all text-muted-foreground hover:text-primary group bg-white/5"
                          >
                            <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary/10 transition-colors">
                              <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest">Add View</span>
                          </button>
                        )}
                      </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Condition Selection */}
                      <section className="space-y-3">
                        <Label htmlFor="condition" className="text-[10px] uppercase tracking-[0.2em] text-primary font-black">Health Category</Label>
                        <Select value={conditionLabel} onValueChange={setConditionLabel}>
                          <SelectTrigger id="condition" className="bg-[#1a2234] border-white/5 h-12 rounded-xl text-gray-200">
                            <SelectValue placeholder="Select primary condition..." />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a2234] border-white/10 text-gray-200">
                            <SelectItem value="inflammation">Acute Inflammation</SelectItem>
                            <SelectItem value="tendon">Tendon/Ligament Strain</SelectItem>
                            <SelectItem value="muscle">Muscle Soreness</SelectItem>
                            <SelectItem value="joint">Joint Degeneration</SelectItem>
                            <SelectItem value="recovery">General Recovery</SelectItem>
                            <SelectItem value="other">Other/Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </section>

                      {/* Proposed Treatment */}
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
                                  ? "bg-primary/20 border-primary text-white shadow-lg shadow-primary/10"
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

                    {/* Rich Text Notes */}
                    <section className="space-y-3">
                      <Label htmlFor="notes" className="text-[10px] uppercase tracking-[0.2em] text-primary font-black">Clinical Notes (Rich Text)</Label>
                      <div className="rounded-xl border border-white/5 bg-[#1a2234] overflow-hidden focus-within:border-primary/40 transition-colors">
                        <div className="flex items-center gap-1 p-2 border-b border-white/5 bg-white/5">
                           <div className="flex gap-1">
                              {['B', 'I', 'U', '•'].map(btn => (
                                <button key={btn} className="w-8 h-8 rounded hover:bg-white/10 text-gray-400 font-serif text-sm transition-colors">{btn}</button>
                              ))}
                           </div>
                        </div>
                        <textarea 
                          id="notes" 
                          placeholder="Document detailed veterinary observations and assessment results..." 
                          className="w-full min-h-[160px] bg-transparent border-0 p-4 focus:ring-0 text-sm leading-relaxed text-gray-200 resize-none"
                          value={diagnosisNote}
                          onChange={(e) => setDiagnosisNote(e.target.value)}
                        />
                      </div>
                    </section>
                  </div>
                </ScrollArea>

                <DialogFooter className="p-6 border-t border-white/5 bg-[#111827]">
                  <Button variant="ghost" onClick={() => setIsScanOpen(false)} disabled={isSubmitting} className="text-gray-400 hover:bg-white/5 font-bold tracking-widest text-xs">
                    DISCARD
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting || capturedImages.length === 0 || !conditionLabel}
                    className="gap-2 shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 text-white min-w-[180px] h-12 font-black tracking-[0.1em]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        PROCESSING...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        SAVE TO EHR
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="flex-1 md:flex-none gap-2 border-white/10 bg-card/50 hover:bg-card text-foreground font-bold tracking-widest h-12 px-6">
              <Download className="w-4 h-4" /> EXPORT
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1 shadow-lg bg-card/50 backdrop-blur border-white/5 overflow-hidden">
          <div className="h-1 bg-primary/40 w-full" />
          <CardHeader>
            <CardTitle className="tracking-[0.2em] text-[10px] uppercase text-primary font-black">Case Analysis</CardTitle>
            <CardDescription className="text-gray-400">Pre and post treatment thermal verification.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-2">
                <div className="aspect-square relative rounded-2xl overflow-hidden border border-white/10 bg-black/50 group cursor-pointer shadow-2xl">
                  <img src={thermalHorseDark} alt="Before Treatment" className="object-cover w-full h-full opacity-90 transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-black/80 text-white text-[9px] px-2 py-1 rounded-md backdrop-blur-md font-black border border-white/10 tracking-widest">
                    BASELINE
                  </div>
                  <div className="absolute bottom-3 right-3 bg-red-500/90 text-white text-xs px-2.5 py-1.5 rounded-xl backdrop-blur-md font-black shadow-lg border border-red-400/50">
                    38.5°C
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="aspect-square relative rounded-2xl overflow-hidden border border-white/10 bg-black/50 group cursor-pointer shadow-2xl">
                  <img src={thermalHorseDark} alt="After Treatment" className="object-cover w-full h-full grayscale opacity-80 transition-transform group-hover:scale-105" style={{ filter: "hue-rotate(180deg) contrast(1.4) brightness(0.8)" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-black/80 text-white text-[9px] px-2 py-1 rounded-md backdrop-blur-md font-black border border-white/10 tracking-widest">
                    POST-OP
                  </div>
                   <div className="absolute bottom-3 right-3 bg-primary/90 text-white text-xs px-2.5 py-1.5 rounded-xl backdrop-blur-md font-black shadow-lg border border-primary/50">
                    22.1°C
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 relative">
              <div className="absolute -top-3 left-6 px-3 py-1 bg-[#111827] border border-white/5 rounded-full text-[9px] font-black text-primary tracking-widest uppercase">Clinical Assessment</div>
              <h4 className="font-bold text-sm flex items-center gap-2 mb-2 text-primary tracking-wide pt-2">
                <FileText className="w-4 h-4" /> Diagnosis Summary
              </h4>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-medium">
                Significant inflammation reduction observed in the left hock area. Thermal delta indicates successful cryotherapy application. Recommended follow-up in 48 hours with Class IV laser support.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
