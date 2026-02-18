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
import { Play, Pause, Square, Thermometer, Bluetooth, Activity, Zap, ChevronLeft } from "lucide-react";
import { Horse } from "@/components/icons/Horse";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import nozzle6mm from "@/assets/nozzle-white.png";
import nozzle15mm from "@/assets/nozzle-black.png";
import massageMild from "@/assets/image_1771412928055.png";
import massageStrong from "@/assets/image_1771412940321.png";
import massagePrecision from "@/assets/image_1771412948862.png";

const protocols = [
  { id: "c1", name: "Localized Inflammation", duration: 10, intensity: 80, temp: -140 },
  { id: "c2", name: "Muscle Recovery", duration: 15, intensity: 70, temp: -120 },
  { id: "c3", name: "Post-Surgical", duration: 8, intensity: 60, temp: -110 },
];

export default function Cryotherapy() {
  const [activeProtocol, setActiveProtocol] = useState(protocols[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(protocols[0].duration * 60);
  const [currentTemp, setCurrentTemp] = useState(20);
  const [targetTemp, setTargetTemp] = useState(protocols[0].temp);
  const [intensity, setIntensity] = useState([protocols[0].intensity]);
  const { toast } = useToast();

  const currentProtocol = protocols.find(p => p.id === activeProtocol) || protocols[0];

  useEffect(() => {
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
            toast({ title: "Cryotherapy Complete", description: "The session has finished successfully." });
            return 0;
          }
          return prev - 1;
        });
        setCurrentTemp((prev) => {
          if (prev > targetTemp) return prev - 2;
          return prev + (Math.random() - 0.5) * 2;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, targetTemp, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentProtocol.duration * 60 - timeLeft) / (currentProtocol.duration * 60)) * 100;

  const [activeTab, setActiveTab] = useState("controls");
  const [selectedNozzle, setSelectedNozzle] = useState("small");
  const [selectedMassageNozzle, setSelectedMassageNozzle] = useState("small");
  const [selectedNozzleType, setSelectedNozzleType] = useState("small");
  const [fogNozzle, setFogNozzle] = useState(false);
  const [massageNozzle, setMassageNozzle] = useState(false);
  const [flowRate, setFlowRate] = useState([50]);
  const [fogRate, setFogRate] = useState(2);

  const nozzles = [
    { id: "small", name: "Mild Cone", image: nozzle6mm },
    { id: "medium", name: "Strong Cone", image: nozzle15mm },
  ];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 pb-24 md:pb-8">
      <div className="flex justify-center mb-6">
        <img src={america_cryo_logo} alt="America Cryo Logo" className="h-10 md:h-12 w-auto" />
      </div>
      <div className="flex flex-col bg-card/30 backdrop-blur-md sticky top-0 z-50 border-b border-white/5 -mx-4 md:-mx-8 mb-6">
        <div className="flex justify-between items-center py-4 px-4 md:px-8">
          <div className="flex items-center gap-4">
            <Link href="/treatment">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-widest text-white">Cryotherapy</h1>
              <p className="text-[10px] text-muted-foreground tracking-tight hidden md:block uppercase font-bold">Active Cryo Session</p>
            </div>
          </div>
        </div>
        
        <div className="flex px-4 md:px-8">
          <button 
            onClick={() => setActiveTab("controls")}
            className={cn(
              "flex-1 py-3 tracking-[0.2em] uppercase transition-all relative text-[14px] font-extrabold",
              activeTab === "controls" ? "text-[#3D63DD]" : "text-[#A9B3CE] hover:text-[#A9B3CE]/80"
            )}
          >
            Manual Mode
            {activeTab === "controls" && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3D63DD]" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab("thermal")}
            className={cn(
              "flex-1 py-3 tracking-[0.2em] uppercase transition-all relative text-[14px] font-extrabold",
              activeTab === "thermal" ? "text-[#3D63DD]" : "text-[#A9B3CE] hover:text-[#A9B3CE]/80"
            )}
          >
            Protocol Mode
            {activeTab === "thermal" && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3D63DD]" />
            )}
          </button>
        </div>

        {/* Nozzle Selection Section */}
        <div className="px-4 md:px-8 py-6 bg-[#0a0f1d]/40 backdrop-blur-md border-t border-white/5 space-y-6">
          <div>
            <p className="font-black uppercase tracking-[0.3em] text-[#A9B3CE] mb-4 text-[14px]">Select Nozzle Type</p>
            
            <p className="font-medium text-[#A9B3CE]/40 uppercase tracking-widest mb-4 text-[14px]">Fog Nozzle</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { id: "mild", name: "Mild Cone", image: nozzle6mm },
                { id: "strong", name: "Strong Cone", image: nozzle15mm },
              ].map((nozzle) => (
                <button
                  key={`fog-nozzle-${nozzle.id}`}
                  onClick={() => setSelectedNozzle(nozzle.id)}
                  className={cn(
                    "group relative transition-all duration-300 active:scale-95",
                    selectedNozzle === nozzle.id ? "scale-[1.02] z-10" : "opacity-60"
                  )}
                >
                <div className={cn(
                  "h-32 rounded-2xl flex flex-col items-center justify-center p-2 border transition-all duration-300",
                  selectedNozzle === nozzle.id 
                    ? "bg-[#3D63DD]/10 border-[#3D63DD] shadow-[0_0_20px_rgba(61,99,221,0.15)]" 
                    : "bg-white/5 border-white/10 hover:border-white/20"
                )}>
                  <div className="w-16 h-16 mb-2 flex items-center justify-center overflow-hidden">
                    <img 
                      src={nozzle.image} 
                      alt={nozzle.name} 
                      className="w-full h-full object-contain filter brightness-110 contrast-110"
                    />
                  </div>
                  <span className="uppercase tracking-widest text-[#ffffff] text-[14px] font-medium">
                    {nozzle.name}
                  </span>
                </div>
                  {selectedNozzle === nozzle.id && (
                    <motion.div 
                      layoutId="selected-nozzle-glow-fog"
                      className="absolute inset-0 bg-[#3D63DD]/10 blur-xl -z-10 rounded-2xl"
                    />
                  )}
                </button>
              ))}
            </div>

            <p className="font-medium text-[#A9B3CE]/40 uppercase tracking-widest mb-4 text-[14px]">Massage Nozzle</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { id: "mild", name: "Dome Nozzle", image: massageMild },
                { id: "strong", name: "Thin Nozzle", image: massageStrong },
                { id: "precision", name: "Flat Contact Nozzle", image: massagePrecision },
              ].map((nozzle, index) => (
                <button
                  key={`massage-${nozzle.id}`}
                  onClick={() => setSelectedMassageNozzle(nozzle.id)}
                  className={cn(
                    "group relative transition-all duration-300 active:scale-95",
                    selectedMassageNozzle === nozzle.id ? "scale-[1.02] z-10" : "opacity-60",
                    index === 2 ? "col-span-2 w-1/2 mx-auto" : "w-full"
                  )}
                >
                  <div className={cn(
                    "h-32 rounded-2xl flex flex-col items-center justify-center p-2 border transition-all duration-300 w-full",
                    selectedMassageNozzle === nozzle.id 
                      ? "bg-[#3D63DD]/10 border-[#3D63DD] shadow-[0_0_20px_rgba(61,99,221,0.15)]" 
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  )}>
                    <div className="w-16 h-16 mb-2 flex items-center justify-center overflow-hidden">
                      <img 
                        src={nozzle.image} 
                        alt={nozzle.name} 
                        className="w-full h-full object-contain filter brightness-110 contrast-110"
                      />
                    </div>
                    <span className="uppercase tracking-widest text-[#ffffff] text-[14px] font-medium">
                      {nozzle.name}
                    </span>
                  </div>
                  {selectedMassageNozzle === nozzle.id && (
                    <motion.div 
                      layoutId="selected-nozzle-glow-massage"
                      className="absolute inset-0 bg-[#3D63DD]/10 blur-xl -z-10 rounded-2xl"
                    />
                  )}
                </button>
              ))}
            </div>

            <p className="font-medium text-[#A9B3CE]/40 uppercase tracking-widest mb-4 text-[14px]">Flow Rates</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: "Extra Soft - 0.3lpm", value: 20 },
                { label: "Soft - 0.5lpm", value: 40 },
                { label: "Medium - 0.7lpm", value: 60 },
                { label: "Hard - 0.9lpm", value: 80 },
                { label: "Extra Hard - 1.1lpm", value: 100 },
              ].map((rate) => (
                <button
                  key={`flow-btn-${rate.value}`}
                  onClick={() => setFlowRate([rate.value])}
                  className={cn(
                    "group relative transition-all duration-300 active:scale-95",
                    flowRate[0] === rate.value ? "scale-[1.02] z-10" : "opacity-60"
                  )}
                >
                  <div className={cn(
                    "h-16 rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 px-2 text-center",
                    flowRate[0] === rate.value 
                      ? "bg-[#3D63DD]/10 border-[#3D63DD] shadow-[0_0_20px_rgba(61,99,221,0.15)]" 
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  )}>
                    <span className="uppercase tracking-tight text-[14px] font-medium text-[#ffffff]">
                      {rate.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>


        </div>
      </div>
      <AnimatePresence mode="wait">
        {activeTab === "controls" ? (
          <motion.div 
            key="controls"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-6 md:grid-cols-2"
          >
            <div className="space-y-6 order-1 md:order-2">
              <Card className="flex flex-col justify-between overflow-hidden relative border-blue-400/20 shadow-lg bg-card">
                <CardHeader className="text-center pb-0 pt-4">
                  <CardTitle className="text-blue-400/60 tracking-widest text-[10px] md:text-xs">Cooling Progress</CardTitle>
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
                      <Thermometer className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mb-1" />
                      <span className="text-xl md:text-2xl font-bold tabular-nums text-white">{Math.round(currentTemp)}°C</span>
                      <span className="text-[10px] md:text-xs text-blue-400/60 font-bold uppercase tracking-wider">Nozzle Temp</span>
                    </div>
                    <div className="flex flex-col items-center bg-blue-500/5 p-3 md:p-4 rounded-xl border border-blue-500/10">
                      <Zap className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mb-1" />
                      <span className="text-xl md:text-2xl font-bold tabular-nums text-white">{intensity[0]}%</span>
                      <span className="text-[10px] md:text-xs text-blue-400/60 font-bold uppercase tracking-wider">Intensity</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4 md:space-y-6 order-2 md:order-1">
              <Card className="bg-card border-white/5">
                <CardHeader className="pb-2 md:pb-4">
                  <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-primary">Cryo Protocol</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Select value={activeProtocol} onValueChange={setActiveProtocol} disabled={isPlaying}>
                    <SelectTrigger className="w-full h-14 bg-white/5 border-white/10 rounded-xl text-white font-bold">
                      <SelectValue placeholder="Select Protocol" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a2234] border-white/10 text-white">
                      {protocols.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          <span className="font-bold">{p.name}</span> <span className="text-muted-foreground text-[10px] ml-2 uppercase tracking-widest font-black">({p.duration}m)</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="pt-2 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-gray-400">Target Intensity</span>
                        <span className="text-primary">{intensity[0]}%</span>
                      </div>
                      <Slider value={intensity} onValueChange={setIntensity} max={100} step={5} className="py-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <Button 
                  size="lg" 
                  className={cn(
                    "h-20 text-xl rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95", 
                    isPlaying ? "bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20" : "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                  )} 
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-8 h-8 mr-2 fill-current" /> : <Play className="w-8 h-8 mr-2 fill-current" />}
                  {isPlaying ? "Pause" : "Start"}
                </Button>
                <Button 
                  size="lg" 
                  variant="destructive" 
                  className="h-20 text-xl rounded-2xl font-black uppercase tracking-widest bg-red-500/20 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95" 
                  onClick={() => setIsPlaying(false)} 
                  disabled={!isPlaying && timeLeft === currentProtocol.duration * 60}
                >
                  <Square className="w-8 h-8 mr-2 fill-current" />
                  Stop
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="thermal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-white/5 rounded-[2rem] bg-white/5"
          >
            <Activity className="w-16 h-16 text-primary mb-4 opacity-50" />
            <h3 className="text-xl font-bold tracking-tight text-white">Thermal Imaging</h3>
            <p className="text-gray-500 text-sm mt-2">Connect a thermal camera to view live feed.</p>
            <Button className="mt-8 bg-primary hover:bg-primary/90 text-white rounded-xl px-8 font-black tracking-widest uppercase">
              Connect Camera
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
