import america_cryo_logo from "@/assets/logo-official.png";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, Square, ShieldCheck, Bluetooth, Activity, ChevronLeft, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

const protocols = [
  { id: "iv1", name: "Deep Tissue Inflammation", duration: 10, intensity: 90, power: "15W" },
  { id: "iv2", name: "Chronic Back Pain", duration: 15, intensity: 85, power: "20W" },
  { id: "iv3", name: "Arthritis Support", duration: 12, intensity: 75, power: "12W" },
];

export default function ClassIV() {
  const [activeProtocol, setActiveProtocol] = useState(protocols[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(protocols[0].duration * 60);
  const [intensity, setIntensity] = useState([protocols[0].intensity]);
  const { toast } = useToast();

  const currentProtocol = protocols.find(p => p.id === activeProtocol) || protocols[0];

  useEffect(() => {
    setTimeLeft(currentProtocol.duration * 60);
    setIntensity([currentProtocol.intensity]);
    setIsPlaying(false);
  }, [activeProtocol]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            toast({ title: "Class IV Laser Complete", description: "The session has finished successfully." });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentProtocol.duration * 60 - timeLeft) / (currentProtocol.duration * 60)) * 100;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 pb-24 md:pb-8">
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center">
          <img src={america_cryo_logo} alt="America Cryo Logo" className="h-10 md:h-12 w-auto mb-1" />
        </div>
      </div>
      
      <div className="flex justify-between items-center bg-card/30 backdrop-blur-md sticky top-0 z-50 py-4 px-4 md:px-8 border-b border-white/5 -mx-4 md:-mx-8 mb-6">
        <div className="flex items-center gap-4">
          <Link href="/treatment">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-widest text-foreground">Class IV Laser</h1>
            <p className="text-[10px] text-muted-foreground tracking-tight hidden md:block">High Power Laser Session</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6 order-1 md:order-2">
          <Card className="flex flex-col justify-between overflow-hidden relative border-blue-400/20 shadow-lg bg-card">
            <CardHeader className="text-center pb-0 pt-4">
              <CardTitle className="text-blue-400/60 tracking-widest text-[10px] md:text-xs">Power Output</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center space-y-6 md:space-y-8 relative z-10 py-6 md:py-8">
              <div className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-secondary" />
                  <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="283" strokeDashoffset={283 * (1 - progress / 100)} className="text-blue-400 transition-all duration-1000 ease-linear" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-5xl md:text-6xl font-bold tracking-tighter tabular-nums text-white">{formatTime(timeLeft)}</span>
                  <span className="text-xs text-blue-400/80 mt-1 font-semibold tracking-wider">Remaining</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-8 w-full">
                <div className="flex flex-col items-center bg-blue-500/5 p-3 md:p-4 rounded-xl border border-blue-500/10">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mb-1" />
                  <span className="text-xl md:text-2xl font-bold tabular-nums text-white">{currentProtocol.power}</span>
                  <span className="text-[10px] md:text-xs text-blue-400/60">Power Level</span>
                </div>
                <div className="flex flex-col items-center bg-blue-500/5 p-3 md:p-4 rounded-xl border border-blue-500/10">
                  <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mb-1" />
                  <span className="text-xl md:text-2xl font-bold tabular-nums text-white">{intensity[0]}%</span>
                  <span className="text-[10px] md:text-xs text-blue-400/60">Duty Cycle</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 md:space-y-6 order-2 md:order-1">
          <Card>
            <CardHeader className="pb-2 md:pb-4">
              <CardTitle className="text-base md:text-lg">Class IV Protocol</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={activeProtocol} onValueChange={setActiveProtocol} disabled={isPlaying}>
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Select Protocol" />
                </SelectTrigger>
                <SelectContent>
                  {protocols.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      <span className="font-medium">{p.name}</span> <span className="text-muted-foreground text-xs ml-1">({p.duration}m)</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="pt-2 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Power Intensity</span>
                    <span className="text-blue-400 font-bold">{intensity[0]}%</span>
                  </div>
                  <Slider value={intensity} onValueChange={setIntensity} max={100} step={5} className="py-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <Button size="lg" className={cn("h-20 text-xl rounded-2xl", isPlaying ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600")} onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="w-8 h-8 mr-2" /> : <Play className="w-8 h-8 mr-2" />}
              {isPlaying ? "Pause" : "Start"}
            </Button>
            <Button size="lg" variant="destructive" className="h-20 text-xl rounded-2xl" onClick={() => setIsPlaying(false)} disabled={!isPlaying && timeLeft === currentProtocol.duration * 60}>
              <Square className="w-8 h-8 mr-2" />
              Stop
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
