import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  ArrowUpRight, 
  ChevronLeft, 
  Camera, 
  X, 
  CheckCircle2,
  Loader2
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Records() {
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [diagnosisNote, setDiagnosisNote] = useState("");
  const [conditionLabel, setConditionLabel] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCapture = () => {
    if (capturedImages.length < 4) {
      setCapturedImages([...capturedImages, thermalHorseDark]);
    }
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
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 pb-24 md:pb-8">
      <div className="flex justify-center md:hidden mb-2">
        <div className="flex flex-col items-center">
          <img src="/src/assets/logo.png" alt="America Cryo Logo" className="h-8 w-auto mb-1" />
          <a 
            href="https://www.americacryo.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[8px] text-muted-foreground hover:text-primary transition-colors tracking-[0.2em]"
          >
            WWW.AMERICACRYO.COM
          </a>
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
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground tracking-widest">Health Records</h1>
            <p className="text-sm md:text-base text-muted-foreground">Diagnose, track, and analyze treatment history.</p>
          </div>
        </div>
        <div className="flex w-full md:w-auto gap-2">
            <Dialog open={isScanOpen} onOpenChange={setIsScanOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 md:flex-none gap-2 bg-primary hover:bg-primary/90 text-white border-0 shadow-lg shadow-primary/20">
                  <Camera className="w-4 h-4" /> New Scan
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col p-0 overflow-hidden bg-card border-white/10">
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="text-xl">New Diagnostic Scan</DialogTitle>
                  <DialogDescription>
                    Capture thermal images and record veterinary diagnosis.
                  </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-xs uppercase tracking-widest text-muted-foreground">Thermal Capture (Max 4)</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {capturedImages.map((img, idx) => (
                          <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-white/10 bg-black/40 group">
                            <img src={img} className="object-cover w-full h-full opacity-90" alt={`Capture ${idx + 1}`} />
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(idx)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[10px] text-white backdrop-blur-sm border border-white/10">
                              View {idx + 1}
                            </div>
                          </div>
                        ))}
                        {capturedImages.length < 4 && (
                          <button 
                            onClick={handleCapture}
                            className="aspect-square rounded-lg border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 flex flex-col items-center justify-center gap-2 transition-all text-muted-foreground hover:text-primary group"
                          >
                            <Camera className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-medium">Capture View</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="condition" className="text-xs uppercase tracking-widest text-muted-foreground">Primary Condition</Label>
                      <Select value={conditionLabel} onValueChange={setConditionLabel}>
                        <SelectTrigger id="condition" className="bg-background/50 border-white/10 h-11">
                          <SelectValue placeholder="Select condition type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inflammation">Acute Inflammation</SelectItem>
                          <SelectItem value="tendon">Tendon/Ligament Strain</SelectItem>
                          <SelectItem value="muscle">Muscle Soreness</SelectItem>
                          <SelectItem value="joint">Joint Degeneration</SelectItem>
                          <SelectItem value="recovery">General Recovery</SelectItem>
                          <SelectItem value="other">Other/Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-xs uppercase tracking-widest text-muted-foreground">Veterinary Diagnosis Notes</Label>
                      <div className="relative group">
                        <Textarea 
                          id="notes" 
                          placeholder="Enter detailed diagnosis and clinical observations..." 
                          className="min-h-[120px] bg-background/50 border-white/10 focus:border-primary/50 transition-colors resize-none text-sm leading-relaxed pr-10"
                          value={diagnosisNote}
                          onChange={(e) => setDiagnosisNote(e.target.value)}
                        />
                        <div className="absolute right-3 top-3 opacity-20 group-focus-within:opacity-50 transition-opacity pointer-events-none">
                          <FileText className="w-4 h-4" />
                        </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground italic">
                        Notes will be timestamped and attached to the patient's permanent EHR.
                      </p>
                    </div>
                  </div>
                </ScrollArea>

                <DialogFooter className="p-6 border-t border-white/10 bg-secondary/5">
                  <Button variant="ghost" onClick={() => setIsScanOpen(false)} disabled={isSubmitting} className="hover:bg-white/5">
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting || capturedImages.length === 0 || !conditionLabel}
                    className="gap-2 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Complete Diagnosis
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="flex-1 md:flex-none gap-2 border-white/10 bg-card/50 hover:bg-card text-foreground">
              <Download className="w-4 h-4" /> Export
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1 shadow-lg bg-card/50 backdrop-blur border-white/5">
          <CardHeader>
            <CardTitle className="tracking-wider text-sm md:text-base">Thermal Imaging Analysis</CardTitle>
            <CardDescription>Compare pre and post treatment thermal scans.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-2">
                <div className="aspect-square relative rounded-xl overflow-hidden border border-white/10 bg-black/50 group cursor-pointer shadow-inner">
                  <img src={thermalHorseDark} alt="Before Treatment" className="object-cover w-full h-full opacity-90 transition-transform group-hover:scale-105" />
                  <div className="absolute top-2 left-2 bg-black/80 text-white text-[10px] md:text-xs px-2 py-1 rounded-md backdrop-blur-sm font-medium border border-white/10">
                    BEFORE (14:00)
                  </div>
                  <div className="absolute bottom-2 right-2 bg-red-500/90 text-white text-[10px] md:text-xs px-2 py-1 rounded-full backdrop-blur-sm font-bold shadow-lg border border-red-400/50">
                    38.5°C
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="aspect-square relative rounded-xl overflow-hidden border border-white/10 bg-black/50 group cursor-pointer shadow-inner">
                  <img src={thermalHorseDark} alt="After Treatment" className="object-cover w-full h-full grayscale opacity-80 transition-transform group-hover:scale-105" style={{ filter: "hue-rotate(180deg) contrast(1.4) brightness(0.8)" }} />
                  <div className="absolute top-2 left-2 bg-black/80 text-white text-[10px] md:text-xs px-2 py-1 rounded-md backdrop-blur-sm font-medium border border-white/10">
                    AFTER (14:20)
                  </div>
                   <div className="absolute bottom-2 right-2 bg-primary/90 text-white text-[10px] md:text-xs px-2 py-1 rounded-full backdrop-blur-sm font-bold shadow-lg border border-primary/50">
                    22.1°C
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <h4 className="font-bold text-sm flex items-center gap-2 mb-2 text-primary tracking-wide">
                <FileText className="w-4 h-4" /> Diagnosis Note
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Significant inflammation reduction observed in the left hock area. Thermal delta indicates successful cryotherapy application. Recommended follow-up in 48 hours.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 md:col-span-1 shadow-lg bg-card/50 backdrop-blur border-white/5">
          <CardHeader>
            <CardTitle className="tracking-wider text-sm md:text-base">Treatment History</CardTitle>
            <CardDescription>Recent sessions across all patients.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 md:p-6">
            <div className="rounded-md md:border border-white/10 overflow-hidden">
              <Table>
                <TableHeader className="hidden md:table-header-group">
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Date</TableHead>
                    <TableHead className="text-muted-foreground">Horse</TableHead>
                    <TableHead className="text-muted-foreground">Protocol</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { date: "Feb 24, 2024", horse: "Thunder Spirit", protocol: "Tendon Repair", status: "Completed" },
                    { date: "Feb 23, 2024", horse: "Bella Luna", protocol: "Recovery", status: "Completed" },
                    { date: "Feb 23, 2024", horse: "Apollo", protocol: "Inflammation", status: "Interrupted" },
                    { date: "Feb 22, 2024", horse: "Midnight Star", protocol: "Manual", status: "Completed" },
                    { date: "Feb 21, 2024", horse: "Thunder Spirit", protocol: "Tendon Repair", status: "Completed" },
                  ].map((row, i) => (
                    <TableRow key={i} className="flex flex-col md:table-row border-b md:border-b-0 p-4 md:p-0 border-white/5 hover:bg-white/5">
                      <TableCell className="font-medium text-xs text-muted-foreground md:table-cell pb-1 md:pb-4 pt-0 md:pt-4 border-none md:border-b border-white/5">
                        <span className="md:hidden font-semibold text-foreground mr-2">Date:</span>{row.date}
                      </TableCell>
                      <TableCell className="md:table-cell py-1 md:py-4 border-none md:border-b border-white/5 text-base md:text-sm font-semibold md:font-normal text-foreground">
                         <span className="md:hidden font-normal text-muted-foreground mr-2 text-xs">Patient:</span>{row.horse}
                      </TableCell>
                      <TableCell className="md:table-cell py-1 md:py-4 border-none md:border-b border-white/5 text-sm text-primary font-medium">
                         <span className="md:hidden font-normal text-muted-foreground mr-2 text-xs">Protocol:</span>{row.protocol}
                      </TableCell>
                      <TableCell className="md:table-cell py-1 md:py-4 border-none md:border-b border-white/5">
                        <div className="flex justify-between items-center md:block">
                           <span className="md:hidden text-xs text-muted-foreground">Status:</span>
                           <Badge variant={row.status === "Completed" ? "default" : "destructive"} className="text-[10px] md:text-xs">
                             {row.status}
                           </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 md:p-0 md:mt-4">
              <Button variant="ghost" className="w-full text-primary hover:text-primary/80 hover:bg-primary/10">
                View Full History <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
