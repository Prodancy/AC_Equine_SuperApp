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
import { Play, Pause, Square, Thermometer, Timer, Bluetooth, Activity } from "lucide-react"; // Added Activity
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Mock Protocols
const protocols = [
  { id: "p1", name: "Inflammation Reduction", duration: 15, intensity: 80, temp: -140 },
  { id: "p2", name: "Tendon Repair", duration: 10, intensity: 60, temp: -120 },
  { id: "p3", name: "Post-Race Recovery", duration: 20, intensity: 75, temp: -130 },
  { id: "p4", name: "Deep Tissue", duration: 12, intensity: 90, temp: -150 },
  { id: "p5", name: "Manual Mode", duration: 5, intensity: 50, temp: -100 },
];

export default function Treatment() {
  const [activeProtocol, setActiveProtocol] = useState(protocols[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(protocols[0].duration * 60);
  const [currentTemp, setCurrentTemp] = useState(20); // Starting at room temp
  const [targetTemp, setTargetTemp] = useState(protocols[0].temp);
  const [intensity, setIntensity] = useState([protocols[0].intensity]);
  const { toast } = useToast();

  const currentProtocol = protocols.find(p => p.id === activeProtocol) || protocols[0];

  useEffect(() => {
    // Reset when protocol changes
    setTimeLeft(currentProtocol.duration * 60);
    setTargetTemp(currentProtocol.temp);
    setIntensity([currentProtocol.intensity]);
    setIsPlaying(false);
    setCurrentTemp(20);
  }, [activeProtocol]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            toast({ title: "Treatment Complete", description: "The session has finished successfully." });
            return 0;
          }
          return prev - 1;
        });

        // Simulate cooling down
        setCurrentTemp((prev) => {
          if (prev > targetTemp) return prev - 2; // Cool down rate
          return prev + (Math.random() - 0.5) * 2; // Fluctuations
        });

      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, targetTemp]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast({ title: "Treatment Started", description: `Running protocol: ${currentProtocol.name}` });
    } else {
      toast({ title: "Paused", description: "Treatment paused." });
    }
  };

  const stopTreatment = () => {
    setIsPlaying(false);
    setTimeLeft(currentProtocol.duration * 60);
    setCurrentTemp(20);
    toast({ title: "Stopped", description: "Treatment reset." });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentProtocol.duration * 60 - timeLeft) / (currentProtocol.duration * 60)) * 100;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Treatment Control</h1>
          <p className="text-muted-foreground">Manage active cryotherapy session.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full border border-green-500/20">
          <Bluetooth className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-medium">Device Connected</span>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Left Column: Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Protocol Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={activeProtocol} onValueChange={setActiveProtocol} disabled={isPlaying}>
                <SelectTrigger className="w-full text-lg h-12">
                  <SelectValue placeholder="Select Protocol" />
                </SelectTrigger>
                <SelectContent>
                  {protocols.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} ({p.duration} min)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Intensity</span>
                    <span>{intensity[0]}%</span>
                  </div>
                  <Slider
                    value={intensity}
                    onValueChange={setIntensity}
                    max={100}
                    step={5}
                    className="py-4"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  size="lg" 
                  className={cn(
                    "h-24 text-xl flex flex-col gap-2 transition-all",
                    isPlaying ? "bg-yellow-500 hover:bg-yellow-600 text-white" : "bg-primary hover:bg-primary/90"
                  )}
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                  {isPlaying ? "Pause" : "Start"}
                </Button>
                <Button 
                  size="lg" 
                  variant="destructive"
                  className="h-24 text-xl flex flex-col gap-2"
                  onClick={stopTreatment}
                  disabled={timeLeft === currentProtocol.duration * 60}
                >
                  <Square className="w-8 h-8" />
                  Stop
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Visualization */}
        <div className="space-y-6">
          <Card className="h-full flex flex-col justify-between overflow-hidden relative border-primary/20 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-muted-foreground uppercase tracking-widest text-xs">Current Session</CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col items-center justify-center space-y-8 relative z-10">
              
              {/* Circular Timer Mockup */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-secondary"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 120}
                    strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                    className="text-primary transition-all duration-1000 ease-linear"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-6xl font-bold font-mono tracking-tighter">
                    {formatTime(timeLeft)}
                  </span>
                  <span className="text-sm text-muted-foreground mt-1">REMAINING</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 w-full">
                <div className="flex flex-col items-center bg-secondary/30 p-4 rounded-xl">
                  <Thermometer className="w-6 h-6 text-blue-500 mb-2" />
                  <span className="text-2xl font-bold">{Math.round(currentTemp)}°C</span>
                  <span className="text-xs text-muted-foreground">NOZZLE TEMP</span>
                </div>
                <div className="flex flex-col items-center bg-secondary/30 p-4 rounded-xl">
                  <Activity className="w-6 h-6 text-indigo-500 mb-2" />
                  <span className="text-2xl font-bold">{intensity}%</span>
                  <span className="text-xs text-muted-foreground">INTENSITY</span>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
