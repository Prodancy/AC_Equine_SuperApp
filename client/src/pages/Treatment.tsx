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
import { Play, Pause, Square, Thermometer, Timer, Bluetooth, Activity, ChevronLeft, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'scanning' | 'connecting' | 'connected' | 'error'>('idle');
  const { toast } = useToast();

  const handleConnect = async () => {
    setConnectionStatus('scanning');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConnectionStatus('connecting');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setConnectionStatus('connected');
    
    setTimeout(() => {
      setIsConnectOpen(false);
      setConnectionStatus('idle');
    }, 2000);
  };

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
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 pb-24 md:pb-8">
      <div className="flex justify-center md:hidden mb-2">
        <div className="flex flex-col items-center">
          <img src={america_cryo_logo} alt="America Cryo Logo" className="h-8 w-auto mb-1" />
        </div>
      </div>
      {/* Mobile Back Button & Header */}
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Treatment</h1>
          <p className="text-xs md:text-sm text-muted-foreground hidden md:block">Manage active cryotherapy session.</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsConnectOpen(true)}
          className="h-8 md:h-9 text-[10px] md:text-xs font-bold uppercase tracking-wider border-white/10 bg-card/50 hover:bg-card"
        >
          <Bluetooth className="w-3 h-3 md:w-4 md:h-4 mr-1.5" />
          Manage Device
        </Button>
      </div>
    </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Right Column: Visualization (Top on mobile) */}
        <div className="space-y-6 order-1 md:order-2">
          <Card className="flex flex-col justify-between overflow-hidden relative border-primary/20 shadow-lg bg-card">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            
            <CardHeader className="text-center pb-0 pt-4">
              <CardTitle className="text-muted-foreground tracking-widest text-[10px] md:text-xs">Current Session</CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col items-center justify-center space-y-6 md:space-y-8 relative z-10 py-6 md:py-8">
              
              {/* Circular Timer Mockup */}
              <div className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-secondary"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 115} // Approx based on radius
                    strokeDashoffset={2 * Math.PI * 115 * (1 - progress / 100)} // This is simpler for responsiveness
                    className="text-primary transition-all duration-1000 ease-linear"
                    style={{ strokeDasharray: "283", strokeDashoffset: `${283 * (1 - progress / 100)}` }} // Fallback for responsiveness logic
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-5xl md:text-6xl font-bold tracking-tighter tabular-nums">
                    {formatTime(timeLeft)}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1 font-semibold tracking-wider">REMAINING</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 md:gap-8 w-full">
                <div className="flex flex-col items-center bg-secondary/30 p-3 md:p-4 rounded-xl border border-secondary/50">
                  <Thermometer className="w-5 h-5 md:w-6 md:h-6 text-primary mb-1" />
                  <span className="text-xl md:text-2xl font-bold tabular-nums">{Math.round(currentTemp)}°C</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground">Nozzle Temp</span>
                </div>
                <div className="flex flex-col items-center bg-secondary/30 p-3 md:p-4 rounded-xl border border-secondary/50">
                  <Activity className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground mb-1" />
                  <span className="text-xl md:text-2xl font-bold tabular-nums">{intensity}%</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground">Intensity</span>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Left Column: Controls (Bottom on mobile) */}
        <div className="space-y-4 md:space-y-6 order-2 md:order-1">
          <Card>
            <CardHeader className="pb-2 md:pb-4">
              <CardTitle className="text-base md:text-lg">Protocol Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={activeProtocol} onValueChange={setActiveProtocol} disabled={isPlaying}>
                <SelectTrigger className="w-full text-base md:text-lg h-12">
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

              <div className="pt-2 md:pt-4 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Intensity Adjustment</span>
                    <span className="text-primary font-bold">{intensity[0]}%</span>
                  </div>
                  <Slider
                    value={intensity}
                    onValueChange={setIntensity}
                    max={100}
                    step={5}
                    className="py-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-none shadow-none md:border md:shadow-sm">
            <CardContent className="pt-2 md:pt-6 px-0 md:px-6">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <Button 
                  size="lg" 
                  className={cn(
                    "h-20 md:h-24 text-lg md:text-xl flex flex-col gap-1 md:gap-2 transition-all active:scale-95 shadow-lg rounded-2xl",
                    isPlaying ? "bg-yellow-500 hover:bg-yellow-600 text-white" : "bg-primary hover:bg-primary/90"
                  )}
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="w-8 h-8 md:w-10 md:h-10" /> : <Play className="w-8 h-8 md:w-10 md:h-10" />}
                  {isPlaying ? "Pause" : "Start"}
                </Button>
                <Button 
                  size="lg" 
                  className="h-20 md:h-24 text-lg md:text-xl flex flex-col gap-1 md:gap-2 active:scale-95 shadow-lg rounded-2xl bg-orange-500 hover:bg-orange-600 text-white border-0"
                  onClick={stopTreatment}
                  disabled={timeLeft === currentProtocol.duration * 60}
                >
                  <Square className="w-8 h-8 md:w-10 md:h-10" />
                  Stop
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bluetooth Connection Dialog */}
      <Dialog open={isConnectOpen} onOpenChange={setIsConnectOpen}>
        <DialogContent className="sm:max-w-md bg-card border-white/10">
          <DialogHeader>
            <DialogTitle>Bluetooth Connection</DialogTitle>
            <DialogDescription>
              Connect to your America Cryo ESP32 handheld device.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            <div className="relative">
              <AnimatePresence mode="wait">
                {connectionStatus === 'idle' && (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <Bluetooth className="w-10 h-10 text-primary" />
                  </motion.div>
                )}
                {(connectionStatus === 'scanning' || connectionStatus === 'connecting') && (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative"
                  >
                    <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <Bluetooth className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </motion.div>
                )}
                {connectionStatus === 'connected' && (
                  <motion.div 
                    key="connected"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-center space-y-1">
              <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                {connectionStatus === 'idle' && "Ready to Connect"}
                {connectionStatus === 'scanning' && "Scanning for Devices..."}
                {connectionStatus === 'connecting' && "Pairing with ESP32-Cryo..."}
                {connectionStatus === 'connected' && "Connection Successful"}
              </p>
              <p className="text-xs text-muted-foreground">
                {connectionStatus === 'idle' && "Make sure your handheld device is turned on."}
                {connectionStatus === 'scanning' && "Looking for nearby America Cryo hardware."}
                {connectionStatus === 'connecting' && "Establishing secure Bluetooth tunnel."}
                {connectionStatus === 'connected' && "ESP32 Handheld Controller is ready."}
              </p>
            </div>

            <Button 
              onClick={handleConnect}
              disabled={connectionStatus !== 'idle'}
              className="w-full h-12 text-base font-bold tracking-wide"
            >
              {connectionStatus === 'idle' ? "Start Scanning" : (
                connectionStatus === 'connected' ? "Connected" : "Processing..."
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
