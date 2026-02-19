import horse_anatomy from "@assets/image_1771421514875.png";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Play,
  Pause,
  Square,
  Thermometer,
  Bluetooth,
  Activity,
  Zap,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
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
  {
    id: "p1_head",
    bodyPart: "head",
    name: "Rheumatology (Neurologic Pain)",
    duration: 0.5,
    intensity: 80,
    temp: -140,
  },
  {
    id: "p2_head",
    bodyPart: "head",
    name: "Post Operative (Early)",
    duration: 0.75,
    intensity: 70,
    temp: -120,
  },
  {
    id: "p3_head",
    bodyPart: "head",
    name: "Post Operative (Healing)",
    duration: 1,
    intensity: 60,
    temp: -110,
  },
  {
    id: "p4_head",
    bodyPart: "head",
    name: "Sepsis / Cellulitis",
    duration: 1.5,
    intensity: 50,
    temp: -100,
  },

  // Neck
  {
    id: "p1_neck",
    bodyPart: "neck",
    name: "Neck Maintenance",
    duration: 0.5,
    intensity: 80,
    temp: -140,
  },
  {
    id: "p2_neck",
    bodyPart: "neck",
    name: "Neck Pain",
    duration: 0.75,
    intensity: 70,
    temp: -120,
  },
  {
    id: "p3_neck",
    bodyPart: "neck",
    name: "Hematoma",
    duration: 1,
    intensity: 60,
    temp: -110,
  },
  {
    id: "p4_neck",
    bodyPart: "neck",
    name: "Chronic Articular Lesions",
    duration: 1.5,
    intensity: 50,
    temp: -100,
  },
  {
    id: "p25_neck",
    bodyPart: "neck",
    name: "Degenerative Joint Disease",
    duration: 2,
    intensity: 45,
    temp: -90,
  },
  {
    id: "p26_neck",
    bodyPart: "neck",
    name: "Trigger Point or Myofascial Pain",
    duration: 10,
    intensity: 65,
    temp: -115,
  },
  // Shoulder
  {
    id: "p1_shoulder",
    bodyPart: "shoulder",
    name: "Shoulder Maintenance",
    duration: 0.5,
    intensity: 80,
    temp: -140,
  },
  {
    id: "p2_shoulder",
    bodyPart: "shoulder",
    name: "Shoulder Hematoma",
    duration: 0.75,
    intensity: 70,
    temp: -120,
  },
  {
    id: "p3_shoulder",
    bodyPart: "shoulder",
    name: "Chronic Articular Lesions",
    duration: 1,
    intensity: 60,
    temp: -110,
  },
  {
    id: "p4_shoulder",
    bodyPart: "shoulder",
    name: "Degenerative Joint Disease",
    duration: 1.5,
    intensity: 50,
    temp: -100,
  },
  {
    id: "p25_shoulder",
    bodyPart: "shoulder",
    name: "Acute Tendinitis / Sprain",
    duration: 2,
    intensity: 45,
    temp: -90,
  },
  {
    id: "p26_shoulder",
    bodyPart: "shoulder",
    name: "Custom",
    duration: 10,
    intensity: 65,
    temp: -115,
  },
  // Back Left
  {
    id: "p5",
    bodyPart: "back-left",
    name: "Back Maintenance",
    duration: 0.5,
    intensity: 75,
    temp: -130,
  },
  {
    id: "p6",
    bodyPart: "back-left",
    name: "Low Back Pain",
    duration: 0.75,
    intensity: 85,
    temp: -150,
  },
  {
    id: "p7",
    bodyPart: "back-left",
    name: "Degenerative Joint Disease",
    duration: 1,
    intensity: 65,
    temp: -115,
  },
  {
    id: "p8",
    bodyPart: "back-left",
    name: "Rheumatology (Neurologic Pain)",
    duration: 1.5,
    intensity: 90,
    temp: -160,
  },
  {
    id: "p27",
    bodyPart: "back-left",
    name: "Post Operative (Early)",
    duration: 2,
    intensity: 70,
    temp: -125,
  },
  {
    id: "p28",
    bodyPart: "back-left",
    name: "Post Operative (Healing)",
    duration: 5,
    intensity: 40,
    temp: -80,
  },
  {
    id: "p_back_left_trigger",
    bodyPart: "back-left",
    name: "Trigger Point / Myofascial Pain",
    duration: 3,
    intensity: 60,
    temp: -110,
  },
  {
    id: "p1_hip",
    bodyPart: "hip",
    name: "Sepsis / Cellulitis",
    duration: 1.5,
    intensity: 80,
    temp: -140,
  },
  {
    id: "p2_hip",
    bodyPart: "hip",
    name: "Chronic Articular Lesions",
    duration: 2,
    intensity: 70,
    temp: -120,
  },
  {
    id: "p3_hip",
    bodyPart: "hip",
    name: "Degenerative Joint Disease",
    duration: 2.5,
    intensity: 60,
    temp: -110,
  },
  {
    id: "p4_hip",
    bodyPart: "hip",
    name: "Muscle / Tendon Rupture",
    duration: 3,
    intensity: 50,
    temp: -100,
  },
  {
    id: "p5_hip",
    bodyPart: "hip",
    name: "Rheumatology",
    duration: 1,
    intensity: 45,
    temp: -90,
  },
  // Front Leg Left -> Fetlock
  {
    id: "p9",
    bodyPart: "leg-front-left",
    name: "Fetlock Maintenance",
    duration: 0.5,
    intensity: 60,
    temp: -110,
  },
  {
    id: "p10",
    bodyPart: "leg-front-left",
    name: "Fetlock Tendinitis / Sprain",
    duration: 0.75,
    intensity: 70,
    temp: -125,
  },
  {
    id: "p11",
    bodyPart: "leg-front-left",
    name: "Degenerative Joint Disease",
    duration: 1,
    intensity: 75,
    temp: -130,
  },
  {
    id: "p12",
    bodyPart: "leg-front-left",
    name: "Post Operative (Early)",
    duration: 1.5,
    intensity: 55,
    temp: -105,
  },
  {
    id: "p29",
    bodyPart: "leg-front-left",
    name: "Post Operative (Healing)",
    duration: 2,
    intensity: 80,
    temp: -140,
  },
  {
    id: "p30",
    bodyPart: "leg-front-left",
    name: "Chronic Articular Lesions",
    duration: 11,
    intensity: 65,
    temp: -120,
  },
  // Front Leg Right -> Feet
  {
    id: "p_feet_hoof_wall",
    bodyPart: "leg-front-right",
    name: "Hoof Wall",
    duration: 0.5,
    intensity: 90,
    temp: -160,
  },
  {
    id: "p_feet_laminitis",
    bodyPart: "leg-front-right",
    name: "Laminitis",
    duration: 0.75,
    intensity: 80,
    temp: -140,
  },
  {
    id: "p_feet_navicular",
    bodyPart: "leg-front-right",
    name: "Coronary band / Navicular Bursa",
    duration: 1,
    intensity: 70,
    temp: -130,
  },
  {
    id: "p_feet_sepsis",
    bodyPart: "leg-front-right",
    name: "Sepsis / Cellulitis",
    duration: 1.5,
    intensity: 60,
    temp: -115,
  },
  {
    id: "p1_joint",
    bodyPart: "stifle",
    name: "Stifle Maintenance",
    duration: 0.5,
    intensity: 80,
    temp: -140,
  },
  {
    id: "p25_joint",
    bodyPart: "stifle",
    name: "Acute Tendinitis / Sprain",
    duration: 2,
    intensity: 45,
    temp: -90,
  },
  {
    id: "p_joint_rupture",
    bodyPart: "stifle",
    name: "Muscle / Tendon Rupture",
    duration: 3,
    intensity: 50,
    temp: -100,
  },
  {
    id: "p4_joint",
    bodyPart: "stifle",
    name: "Degenerative Joint Disease",
    duration: 1.5,
    intensity: 50,
    temp: -100,
  },
  {
    id: "p_joint_post_op_early",
    bodyPart: "stifle",
    name: "Post Operative (Early)",
    duration: 0.75,
    intensity: 70,
    temp: -120,
  },
  {
    id: "p_joint_post_op_healing",
    bodyPart: "stifle",
    name: "Post Operative (Healing)",
    duration: 1,
    intensity: 60,
    temp: -110,
  },
  {
    id: "p3_joint",
    bodyPart: "stifle",
    name: "Chronic Articular Lesions",
    duration: 1,
    intensity: 60,
    temp: -110,
  },
  // Hock
  {
    id: "p_hock_maintenance",
    bodyPart: "hoof-front-left",
    name: "Hock Maintenance",
    duration: 0.5,
    intensity: 90,
    temp: -160,
  },
  {
    id: "p_hock_tendinitis",
    bodyPart: "hoof-front-left",
    name: "Acute Tendinitis / Sprain",
    duration: 2,
    intensity: 50,
    temp: -100,
  },
  {
    id: "p_hock_djd",
    bodyPart: "hoof-front-left",
    name: "Degenerative Joint Disease",
    duration: 1.5,
    intensity: 60,
    temp: -115,
  },
  {
    id: "p_hock_post_op_early",
    bodyPart: "hoof-front-left",
    name: "Post Operative (Early)",
    duration: 0.75,
    intensity: 70,
    temp: -120,
  },
  {
    id: "p_hock_post_op_healing",
    bodyPart: "hoof-front-left",
    name: "Post Operative (Healing)",
    duration: 1,
    intensity: 60,
    temp: -110,
  },
  {
    id: "p_hock_articular",
    bodyPart: "hoof-front-left",
    name: "Chronic Articular Lesions",
    duration: 1,
    intensity: 70,
    temp: -130,
  },
  {
    id: "p_hock_hematoma",
    bodyPart: "hoof-front-left",
    name: "Hematoma",
    duration: 0.5,
    intensity: 80,
    temp: -140,
  },
  {
    id: "p_hock_custom",
    bodyPart: "hoof-front-left",
    name: "Custom",
    duration: 11,
    intensity: 65,
    temp: -120,
  },
];

export default function Cryotherapy() {
  const { toast } = useToast();
  const [selectedPart, setSelectedPart] = useState<string>("neck");
  const [localProtocols, setLocalProtocols] = useState(protocols);
  const [activeProtocol, setActiveProtocol] = useState(protocols[0].id);

  const [activeTab, setActiveTab] = useState("controls");
  const [selectedNozzle, setSelectedNozzle] = useState("small");
  const [selectedMassageNozzle, setSelectedMassageNozzle] = useState("small");
  const [flowRate, setFlowRate] = useState([50]);

  const [isNozzleExpanded, setIsNozzleExpanded] = useState(true);
  const [isProtocolExpanded, setIsProtocolExpanded] = useState(false);
  const [selectedControl, setSelectedControl] = useState<string | null>(null);

  const [customTime, setCustomTime] = useState(120);
  const [manualProtocols, setManualProtocols] = useState([
    { id: "m30", name: "30s", duration: 0.5, temp: -120, intensity: 70 },
    { id: "m45", name: "45s", duration: 0.75, temp: -120, intensity: 70 },
    { id: "m60", name: "60s", duration: 1, temp: -120, intensity: 70 },
    { id: "m90", name: "90s", duration: 1.5, temp: -120, intensity: 70 },
    { id: "m120", name: "120s", duration: 2, temp: -120, intensity: 70 },
    { id: "m_custom", name: "Custom", duration: 2, temp: -120, intensity: 70 },
  ]);

  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'scanning' | 'connecting' | 'connected' | 'error'>('idle');

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

  const [showSession, setShowSession] = useState(false);
  const [lastTouchY, setLastTouchY] = useState<number | null>(null);

  const filteredProtocols = localProtocols.filter(
    (p) => p.bodyPart === selectedPart,
  );

  const currentProtocol =
    manualProtocols.find((p) => p.id === activeProtocol) || 
    (activeTab === 'thermal' ? filteredProtocols.find((p) => p.id === activeProtocol) : null) || 
    filteredProtocols[0] || 
    protocols[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(currentProtocol.duration * 60);
  const [currentTemp, setCurrentTemp] = useState(20);
  const [targetTemp, setTargetTemp] = useState(currentProtocol.temp);
  const [intensity, setIntensity] = useState([currentProtocol.intensity]);

  const updateProtocolName = (id: string, newName: string) => {
    setLocalProtocols((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: newName } : p)),
    );
  };

  const handleSelection = (
    type: "fog" | "massage" | "flow",
    id: string,
    value?: number,
  ) => {
    setSelectedControl(`${type}-${id}`);
    if (type === "fog") setSelectedNozzle(id);
    if (type === "massage") {
      setSelectedMassageNozzle(id);
      setActiveProtocol("m_custom");
      setCustomTime(3);
    }
    if (type === "flow" && value !== undefined) setFlowRate([value]);
    setIsProtocolExpanded(true);
    setIsNozzleExpanded(false);
  };

  const startSession = () => {
    setShowSession(true);
    setIsPlaying(true);
  };

  const getPartLabel = (part: string) => {
    let label = "";
    if (part === "leg-front-left") label = "Fetlock";
    else if (part === "stifle") label = "Stifle";
    else if (part === "joint-hind") label = "Stifle";
    else if (part === "leg-front-right") label = "Feet";
    else if (part === "hoof-front-left") label = "Hock";
    else if (part === "back-left") label = "Back";
    else if (part === "neck") label = "Neck";
    else if (part === "hip") label = "Hip";
    else if (part === "shoulder") label = "Shoulder";
    else if (part === "chest") label = "Chest";
    else if (part === "back-right") label = "Back";
    else if (part === "tail") label = "Tail";
    else label = part.replace(/-/g, " ");
    
    return label.split(' ').map(word => {
      if (word.startsWith('(')) {
        return '(' + word.charAt(1).toUpperCase() + word.slice(2).toLowerCase();
      }
      if (word.includes('/')) {
        return word.split('/').map(sub => {
          const trimmed = sub.trim();
          return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
        }).join(' / ');
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  };

  const toTitleCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const getFullTitleCase = (str: string) => {
    return str.split(' ').map(word => {
      if (word.startsWith('(')) {
        return '(' + word.charAt(1).toUpperCase() + word.slice(2).toLowerCase();
      }
      if (word.includes('/')) {
        return word.split('/').map(sub => {
          const trimmed = sub.trim();
          return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
        }).join(' / ');
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const partProtocols = localProtocols.filter((p) => p.bodyPart === selectedPart);
    if (partProtocols.length > 0) {
      setActiveProtocol(partProtocols[0].id);
      setSelectedControl(null);
      setIsNozzleExpanded(true);
      setIsProtocolExpanded(false);
    }
  }, [selectedPart, localProtocols]);

  useEffect(() => {
    if (currentProtocol.name === "Custom") {
      setTimeLeft(customTime);
    } else {
      setTimeLeft(currentProtocol.duration * 60);
    }
    setTargetTemp(currentProtocol.temp);
    setIntensity([currentProtocol.intensity]);
    setIsPlaying(false);
    setCurrentTemp(20);
  }, [activeProtocol, customTime, currentProtocol]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            toast({
              title: "Cryotherapy Complete",
              description: "The session has finished successfully.",
            });
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

  const progress =
    ((currentProtocol.duration * 60 - timeLeft) /
      (currentProtocol.duration * 60)) *
    100;

  if (showSession) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#030712] p-4 md:p-8 overflow-y-auto">
        <div className="flex justify-center mb-6 pt-4">
          <div className="flex flex-col items-center">
            <img src={america_cryo_logo} alt="America Cryo Logo" className="h-10 md:h-12 w-auto mb-1" />
          </div>
        </div>
        <div className="max-w-5xl mx-auto space-y-6 pb-24 md:pb-8">
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setShowSession(false)}
              className="text-[#A9B3CE] hover:text-white"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Setup
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6 order-1 md:order-2">
              <Card className="flex flex-col justify-between overflow-hidden relative border-blue-400/20 shadow-lg bg-card">
                <CardHeader className="text-center pb-0 pt-4">
                  <CardTitle className="font-semibold text-[#3D63DD]/60 tracking-widest text-[17px]">
                    Cooling progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col items-center justify-center relative z-10 p-0 overflow-hidden rounded-full aspect-square border-[10px] border-[#3D63DD]/20 w-60 h-60 mx-auto shadow-[0_0_40px_rgba(61,99,221,0.15)] bg-[#030712]">
                  {/* Top Section: Time */}
                  <div className="w-full h-1/3 bg-[#0a0f1d] flex flex-col items-center justify-center relative border-b border-white/5">
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className="w-4 h-4 rounded-full border-[1.5px] border-[#A9B3CE]/60 flex items-center justify-center relative">
                        <div className="absolute top-[1.5px] left-1/2 w-[1px] h-[6px] bg-[#A9B3CE]/60 origin-bottom -translate-x-1/2" />
                        <div className="w-0.5 h-0.5 rounded-full bg-[#A9B3CE]/60" />
                      </div>
                      <span className="text-[#A9B3CE]/60 text-[10px] font-bold tracking-[0.2em] uppercase">Time</span>
                    </div>
                    <span className="text-4xl font-bold text-white tabular-nums tracking-tight">
                      {timeLeft}s
                    </span>
                  </div>

                  {/* Middle Section: Temperature */}
                  <div className="w-full h-1/3 bg-[#1d4ed8] flex flex-col items-center justify-center relative shadow-[inset_0_0_30px_rgba(0,0,0,0.15)]">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Thermometer className="w-4 h-4 text-white/60" />
                      <span className="text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase">Temperature</span>
                    </div>
                    <span className="text-6xl font-black text-white tabular-nums leading-none tracking-tighter">
                      {Math.round(currentTemp)}° C
                    </span>
                  </div>

                  {/* Bottom Section: Intensity */}
                  <div className="w-full h-1/3 bg-[#b91c1c] flex flex-col items-center justify-center relative shadow-[inset_0_0_30px_rgba(0,0,0,0.15)]">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Zap className="w-4 h-4 text-white/60" />
                      <span className="text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase">Intensity</span>
                    </div>
                    <span className="text-4xl font-black text-white tabular-nums leading-none tracking-tight">
                      {intensity[0]} in
                    </span>
                  </div>

                  {/* Progress Ring Overlay */}
                  <div className="absolute inset-[-10px] pointer-events-none p-0">
                    <svg className="w-full h-full">
                      {/* Background Track */}
                      <circle
                        cx="50%"
                        cy="50%"
                        r="47.5%"
                        stroke="rgba(61,99,221,0.1)"
                        strokeWidth="10"
                        fill="transparent"
                      />
                      {/* Progress Indicator */}
                      <circle
                        cx="50%"
                        cy="50%"
                        r="47.5%"
                        stroke="#3D63DD"
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray="716"
                        strokeDashoffset={716 * (1 - progress / 100)}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-linear"
                        style={{ 
                          transformOrigin: 'center', 
                          transform: 'rotate(-90deg)' 
                        }}
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-[#0a0f1d] border border-white/5 rounded-2xl p-6">
              <h3 className="text-[#A9B3CE] font-bold mb-4 text-[17px]">Session details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-[#A9B3CE]/60 text-sm">Treatment site</span>
                  <span className="text-white font-bold">{getPartLabel(selectedPart)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-[#A9B3CE]/60 text-sm">Protocol</span>
                  <span className="text-white font-bold">{currentProtocol.name}</span>
                </div>
                {selectedControl && (
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-[#A9B3CE]/60 text-sm">Nozzle</span>
                    <span className="text-[#3D63DD] font-bold text-xs">
                      {selectedControl.split('-')[1]}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                size="lg"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 text-primary-foreground border border-primary-border min-h-10 px-8 h-20 rounded-2xl font-bold transition-all active:scale-95 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 text-[17px]"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 mr-2 fill-current" />
                ) : (
                  <Play className="w-8 h-8 mr-2 fill-current" />
                )}
                {isPlaying ? "Pause session" : "Start session"}
              </Button>
              <Button
                size="lg"
                variant="destructive"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 shadow-sm min-h-10 px-8 h-20 rounded-2xl font-bold bg-red-500/20 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95 text-[17px]"
                onClick={() => {
                  setIsPlaying(false);
                  setShowSession(false);
                }}
              >
                <Square className="w-8 h-8 mr-2 fill-current" />
                Stop session
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-6 max-w-5xl mx-auto space-y-4 pb-20 md:pb-6">
      <div className="flex justify-center mb-4 pt-3">
        <img
          src={america_cryo_logo}
          alt="America Cryo Logo"
          className="h-7 md:h-9 w-auto"
        />
      </div>
      <div className="flex flex-col bg-[#0a0f1d] sticky top-0 z-50 border-b border-white/5 -mx-4 md:-mx-8 mb-6">
        <div className="flex justify-between items-center py-4 px-4 md:px-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-widest text-white">
                Cryotherapy
              </h1>
              <p className="text-[10px] text-muted-foreground tracking-tight hidden md:block font-bold">
                Active cryo session
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsConnectOpen(true)}
              className={cn(
                "h-8 md:h-9 text-[10px] md:text-xs font-bold tracking-wider border-white/10 transition-all",
                connectionStatus === 'connected' ? "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20" : "bg-white/5 hover:bg-white/10 text-white"
              )}
            >
              <Bluetooth className={cn("w-3 h-3 md:w-4 md:h-4 mr-1.5", connectionStatus === 'connected' && "animate-pulse")} />
              {connectionStatus === 'connected' ? "Connected" : "Connect Device"}
            </Button>
          </div>
        </div>

        <div className="flex px-4 md:px-8">
          <button
            onClick={() => setActiveTab("controls")}
            className="flex-1 py-3 tracking-[0.2em] transition-all relative text-[#3D63DD] font-semibold text-[17px]"
          >
            Manual mode
            {activeTab === "controls" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3D63DD]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("thermal")}
            className="flex-1 py-3 tracking-[0.2em] transition-all relative text-[17px] text-[#A9B3CE] hover:text-[#A9B3CE]/80 font-semibold"
          >
            Protocol mode
            {activeTab === "thermal" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3D63DD]"
              />
            )}
          </button>
        </div>

        {/* Nozzle Selection Section - Only in Manual Mode */}
        {activeTab === "controls" && (
          <div className="px-4 md:px-8 py-4 bg-[#0a0f1d] border-t border-white/5">
            <button
              onClick={() => setIsNozzleExpanded(!isNozzleExpanded)}
              className="w-full flex items-center justify-between py-2 group"
            >
                <p className="tracking-[0.3em] text-[#A9B3CE] text-[17px] group-hover:text-white transition-colors font-bold leading-tight text-left">
                  Select nozzle type
                </p>
              <div className="flex-1" />
              {selectedControl && (
                <span className="font-bold text-[#3D63DD] tracking-widest bg-[#3D63DD]/10 px-2 py-0.5 rounded-full border border-[#3D63DD]/20 shrink-0 text-[12px]">
                  {selectedControl
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(" ")}
                </span>
              )}
              <motion.div
                animate={{ rotate: isNozzleExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="ml-3"
              >
                <ChevronDown className="w-5 h-5 text-[#A9B3CE] group-hover:text-white transition-colors" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isNozzleExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 space-y-6">
                    <div>
                      <p className="font-medium tracking-widest mb-4 text-[17px] text-[#ffffff]">
                        Fog nozzle
                      </p>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {[
                          { id: "mild", name: "Mild Cone", image: nozzle6mm },
                          {
                            id: "strong",
                            name: "Strong Cone",
                            image: nozzle15mm,
                          },
                        ].map((nozzle) => (
                          <button
                            key={`fog-nozzle-${nozzle.id}`}
                            onClick={() => handleSelection("fog", nozzle.id)}
                            className={cn(
                              "group relative transition-all duration-300 active:scale-95",
                              selectedControl === `fog-${nozzle.id}`
                                ? "scale-[1.02] z-10"
                                : "opacity-60",
                            )}
                          >
                            <div
                              className={cn(
                                "h-32 rounded-2xl flex flex-col items-center justify-center p-2 border transition-all duration-300",
                                selectedControl === `fog-${nozzle.id}`
                                  ? "bg-[#3D63DD] border-[#3D63DD] shadow-[0_0_20px_rgba(61,99,221,0.15)]"
                                  : "bg-[#151b2e] border-white/10 hover:border-white/20",
                              )}
                            >
                              <div className="w-16 h-16 mb-2 flex items-center justify-center overflow-hidden">
                                <img
                                  src={nozzle.image}
                                  alt={nozzle.name}
                                  className="w-full h-full object-contain filter brightness-110 contrast-110"
                                />
                              </div>
                              <span className="tracking-widest text-[#ffffff] text-[14px] font-medium">
                                {nozzle.name}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>

                      <p className="font-medium tracking-widest mb-4 text-[17px] text-[#ffffff]">
                        Massage nozzle
                      </p>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {[
                          {
                            id: "mild",
                            name: "Dome Nozzle",
                            image: massageMild,
                          },
                          {
                            id: "strong",
                            name: "Thin Nozzle",
                            image: massageStrong,
                          },
                          {
                            id: "precision",
                            name: "Flat Contact Nozzle",
                            image: massagePrecision,
                          },
                        ].map((nozzle, index) => (
                          <button
                            key={`massage-${nozzle.id}`}
                            onClick={() =>
                              handleSelection("massage", nozzle.id)
                            }
                            className={cn(
                              "group relative transition-all duration-300 active:scale-95",
                              selectedControl === `massage-${nozzle.id}`
                                ? "scale-[1.02] z-10"
                                : "opacity-60",
                              index === 2
                                ? "col-span-2 w-1/2 mx-auto"
                                : "w-full",
                            )}
                          >
                            <div
                              className={cn(
                                "h-32 rounded-2xl flex flex-col items-center justify-center p-2 border transition-all duration-300 w-full",
                                selectedControl === `massage-${nozzle.id}`
                                  ? "bg-[#3D63DD] border-[#3D63DD] shadow-[0_0_20px_rgba(61,99,221,0.15)]"
                                  : "bg-[#151b2e] border-white/10 hover:border-white/20",
                              )}
                            >
                              <div className="w-16 h-16 mb-2 flex items-center justify-center overflow-hidden">
                                <img
                                  src={nozzle.image}
                                  alt={nozzle.name}
                                  className="w-full h-full object-contain filter brightness-110 contrast-110"
                                />
                              </div>
                              <span className="tracking-widest text-[#ffffff] text-[14px] font-medium">
                                {nozzle.name}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>

                      <p className="font-medium tracking-widest mb-4 text-[17px] text-[#FFFFFF]">
                        Regular spray - flow rates
                      </p>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {[
                          {
                            id: "extra-soft",
                            label: "Extra Soft - 0.3lpm",
                            value: 20,
                          },
                          { id: "soft", label: "Soft - 0.5lpm", value: 40 },
                          { id: "medium", label: "Medium - 0.7lpm", value: 60 },
                          { id: "hard", label: "Hard - 0.9lpm", value: 80 },
                          {
                            id: "extra-hard",
                            label: "Extra Hard - 1.1lpm",
                            value: 100,
                          },
                        ].map((rate) => (
                          <div
                            key={`flow-btn-${rate.value}`}
                            onClick={() =>
                              handleSelection("flow", rate.id, rate.value)
                            }
                            role="button"
                            tabIndex={0}
                            className={cn(
                              "group relative transition-all duration-300 active:scale-95 cursor-pointer outline-none",
                              selectedControl === `flow-${rate.id}`
                                ? "scale-[1.02] z-10"
                                : "opacity-60",
                            )}
                          >
                            <div
                              className={cn(
                                "h-16 rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 px-2 text-center",
                                selectedControl === `flow-${rate.id}`
                                  ? "bg-[#3D63DD] border-[#3D63DD] shadow-[0_0_20px_rgba(61,99,221,0.15)]"
                                  : "bg-[#151b2e] border-white/10 hover:border-white/20",
                              )}
                            >
                              <p className="tracking-tight font-medium text-[#ffffff] outline-none rounded px-1 text-[14px]">
                                {rate.label}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Protocol Selection Section - Only in Manual Mode */}
        {activeTab === "controls" && (
          <div
            className={cn(
              "px-4 md:px-8 py-4 bg-[#0a0f1d] border-t border-white/5 transition-all duration-300",
              !selectedControl && "opacity-40 grayscale pointer-events-none",
            )}
          >
            <button
              onClick={() => setIsProtocolExpanded(!isProtocolExpanded)}
              disabled={!selectedControl}
              className="w-full flex items-center justify-between py-2 group"
            >
              <div className="flex flex-col items-start">
                <p className="tracking-[0.3em] text-[#A9B3CE] group-hover:text-white transition-colors text-[17px] font-bold text-left leading-tight">
                  Set session duration
                </p>
                {!selectedControl && (
                  <span className="text-[8px] text-[#3D63DD] font-black uppercase tracking-widest mt-1 animate-pulse">
                    Select nozzle first
                  </span>
                )}
              </div>
              <div className="flex-1" />
                <span className="font-bold text-[#3D63DD] tracking-widest bg-[#3D63DD]/10 px-2 py-0.5 rounded-full border border-[#3D63DD]/20 shrink-0 text-[12px]">
                  {manualProtocols.find((p) => p.id === activeProtocol)?.name ===
                  "Custom"
                    ? `Custom (${formatTime(customTime)})`
                    : manualProtocols.find((p) => p.id === activeProtocol)?.name}
                </span>
              <motion.div
                animate={{ rotate: isProtocolExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="ml-3"
              >
                <ChevronDown className="w-5 h-5 text-[#A9B3CE] group-hover:text-white transition-colors" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isProtocolExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 pb-4">
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {manualProtocols.map((p) => (
                          <div
                            key={`manual-protocol-btn-${p.id}`}
                            onClick={() => {
                              setActiveProtocol(p.id);
                            }}
                            role="button"
                            tabIndex={0}
                            className={cn(
                              "group relative transition-all duration-300 active:scale-95 cursor-pointer outline-none",
                              activeProtocol === p.id
                                ? "scale-[1.02] z-10"
                                : "opacity-60",
                            )}
                          >
                            <div
                              className={cn(
                                "h-20 rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 px-2 text-center",
                                activeProtocol === p.id
                                  ? "bg-[#3D63DD] border-[#3D63DD] shadow-[0_0_20px_rgba(61,99,221,0.15)]"
                                  : "bg-[#151b2e] border-white/10 hover:border-white/20",
                              )}
                            >
                            <p className="tracking-tight text-white text-[18px] font-semibold">
                              {p.name}
                            </p>
                            </div>
                          </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      {activeProtocol === "m_custom" && (
                        <div className="bg-[#0a0f1d] border border-white/10 rounded-2xl p-6 flex flex-col items-center space-y-6">
                          <div className="flex items-center justify-center gap-2">
                            <div 
                              className="flex flex-col items-center cursor-ns-resize select-none group px-6 hover:bg-white/[0.03] rounded-2xl transition-all duration-300"
                              onWheel={(e) => {
                                const mins = Math.floor(customTime / 60);
                                const secs = customTime % 60;
                                if (e.deltaY < 0 && mins < 4) {
                                  setCustomTime(Math.min(240, (mins + 1) * 60 + secs));
                                } else if (e.deltaY > 0 && mins > 0) {
                                  setCustomTime(Math.max(0, (mins - 1) * 60 + secs));
                                }
                              }}
                              onTouchStart={(e) => setLastTouchY(e.touches[0].clientY)}
                              onTouchMove={(e) => {
                                if (lastTouchY === null) return;
                                const currentY = e.touches[0].clientY;
                                const deltaY = lastTouchY - currentY;
                                if (Math.abs(deltaY) > 10) {
                                  const mins = Math.floor(customTime / 60);
                                  const secs = customTime % 60;
                                  if (deltaY > 0 && mins < 4) {
                                    setCustomTime(Math.min(240, (mins + 1) * 60 + secs));
                                  } else if (deltaY < 0 && mins > 0) {
                                    setCustomTime(Math.max(0, (mins - 1) * 60 + secs));
                                  }
                                  setLastTouchY(currentY);
                                }
                              }}
                              onTouchEnd={() => setLastTouchY(null)}
                            >
                              <div className="flex flex-col items-center py-4 transition-transform group-hover:scale-105">
                                <span className="text-8xl font-extralight text-white tabular-nums tracking-tighter leading-none" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                                  {Math.floor(customTime / 60)
                                    .toString()
                                    .padStart(2, "0")}
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.4em] text-[#A9B3CE] font-bold mt-2 ml-[0.4em]">
                                  minutes
                                </span>
                              </div>
                            </div>

                            {/* Separator */}
                            <div className="text-6xl font-extralight text-white/5 pb-10 select-none">:</div>

                            {/* Seconds Column */}
                            <div 
                              className="flex flex-col items-center cursor-ns-resize select-none group px-6 hover:bg-white/[0.03] rounded-2xl transition-all duration-300"
                              onWheel={(e) => {
                                if (e.deltaY < 0 && customTime < 240) {
                                  setCustomTime(prev => Math.min(240, prev + 1));
                                } else if (e.deltaY > 0 && customTime > 0) {
                                  setCustomTime(prev => Math.max(0, prev - 1));
                                }
                              }}
                              onTouchStart={(e) => setLastTouchY(e.touches[0].clientY)}
                              onTouchMove={(e) => {
                                if (lastTouchY === null) return;
                                const currentY = e.touches[0].clientY;
                                const deltaY = lastTouchY - currentY;
                                if (Math.abs(deltaY) > 10) {
                                  if (deltaY > 0 && customTime < 240) {
                                    setCustomTime(prev => Math.min(240, prev + 1));
                                  } else if (deltaY < 0 && customTime > 0) {
                                    setCustomTime(prev => Math.max(0, prev - 1));
                                  }
                                  setLastTouchY(currentY);
                                }
                              }}
                              onTouchEnd={() => setLastTouchY(null)}
                            >
                              <div className="flex flex-col items-center py-4 transition-transform group-hover:scale-105">
                                <span className="text-8xl font-extralight text-white tabular-nums tracking-tighter leading-none" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                                  {(customTime % 60).toString().padStart(2, "0")}
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.4em] text-[#A9B3CE] font-bold mt-2 ml-[0.4em]">
                                  seconds
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <Button
                        size="lg"
                        className="w-full h-20 text-xl rounded-2xl font-bold bg-[#3D63DD] hover:bg-[#3D63DD]/90 shadow-lg shadow-[#3D63DD]/20 transition-all active:scale-95"
                        onClick={startSession}
                      >
                        <Play className="w-8 h-8 mr-2 fill-current" />
                        Start Session
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      <AnimatePresence mode="wait">
        {activeTab === "thermal" && (
          <motion.div
            key="thermal-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <div className="w-full flex flex-col items-center">
              <div className="relative w-full max-w-4xl aspect-[16/10] bg-[#0a0f1d] rounded-3xl p-4 border border-white/5 shadow-2xl overflow-hidden group">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(#3D63DD_1px,transparent_1px)] [background-size:20px_20px]" />
                </div>
                
                <img
                  src={horse_anatomy}
                  alt="Horse Anatomy"
                  className="w-full h-full object-contain relative z-10 filter brightness-110 contrast-110 drop-shadow-[0_0_30px_rgba(61,99,221,0.2)] scale-[1.404]"
                />

                {/* Hotspots */}
                {[
                  { id: "head", top: "19%", left: "10%", label: "Head" },
                  { id: "neck", top: "16.5%", left: "24%", label: "Neck" },
                  { id: "shoulder", top: "31%", left: "31.5%", label: "Shoulder" },
                  { id: "back-left", top: "22%", left: "49%", label: "Back" },
                  { id: "hip", top: "24%", left: "69%", label: "Hip" },
                  { id: "stifle", top: "47%", left: "68%", label: "Stifle" },
                  { id: "leg-front-left", top: "78%", left: "36%", label: "Fetlock" },
                  { id: "hoof-front-left", top: "58.5%", left: "74.5%", label: "Hock" },
                  { id: "leg-front-right", top: "83%", left: "60%", label: "Feet" },
                ].map((spot) => (
                  <button
                    key={`hotspot-${spot.id}`}
                    onClick={() => setSelectedPart(spot.id)}
                    className={cn(
                      "absolute w-10 h-10 md:w-12 md:h-12 z-20 group/spot transition-all duration-500",
                      selectedPart === spot.id ? "scale-110" : "hover:scale-105",
                    )}
                    style={{ top: spot.top, left: spot.left }}
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Orange Button Style */}
                      <div className={cn(
                        "absolute inset-0 rounded-full border-2 transition-all duration-500",
                        selectedPart === spot.id 
                          ? "border-[#FF8A00] bg-[#FF8A00]/40 shadow-[0_0_20px_rgba(255,138,0,0.6)]" 
                          : "border-[#FF8A00]/60 bg-[#FF8A00]/10 group-hover/spot:border-[#FF8A00] group-hover/spot:bg-[#FF8A00]/20"
                      )} />
                      
                      {/* Inner Core */}
                      <div className={cn(
                        "w-3 h-3 rounded-full transition-all duration-500",
                        selectedPart === spot.id 
                          ? "bg-white scale-125 shadow-[0_0_10px_white]" 
                          : "bg-[#FF8A00]/80 group-hover/spot:bg-[#FF8A00]"
                      )} />

                      {/* Label tooltip */}
                      <div className={cn(
                        "absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#FF8A00] text-[10px] font-bold text-white whitespace-nowrap opacity-0 group-hover/spot:opacity-100 transition-opacity pointer-events-none z-30 shadow-lg",
                        selectedPart === spot.id && "opacity-100 -translate-y-0.5"
                      )}>
                        {spot.label}
                      </div>

                      {/* Pulse effect */}
                      {selectedPart === spot.id && (
                        <div className="absolute inset-[-10px] rounded-full border-2 border-[#FF8A00] animate-ping opacity-40" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 w-full max-w-2xl">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                    {getPartLabel(selectedPart)} protocols
                  </h3>
                  <p className="text-[#A9B3CE] text-xs tracking-widest">
                    Select a protocol to begin treatment
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredProtocols
                    .filter((p) => p.name.toLowerCase() !== "custom")
                    .map((p) => (
                      <div
                        key={`protocol-mode-${p.id}`}
                      className={cn(
                        "group relative p-4 rounded-2xl border transition-all duration-300 text-left overflow-hidden cursor-pointer",
                        activeProtocol === p.id
                          ? "bg-[#3D63DD]/20 border-[#3D63DD] shadow-[0_0_20px_rgba(61,99,221,0.2)]"
                          : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]",
                      )}
                      onClick={() => {
                        setActiveProtocol(p.id);
                        startSession();
                        toast({
                          title: "Protocol Started",
                          description: `Starting ${getFullTitleCase(p.name)} for ${getPartLabel(selectedPart)}`,
                        });
                      }}
                    >
                      <div className="relative z-10">
                        <input
                          type="text"
                          value={getFullTitleCase(p.name)}
                          readOnly
                          className="bg-transparent border-none outline-none text-white font-bold text-sm tracking-wider w-full focus:ring-0 p-0 pointer-events-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isConnectOpen} onOpenChange={setIsConnectOpen}>
        <DialogContent className="sm:max-w-md bg-[#0a0f1d] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Bluetooth Connection</DialogTitle>
            <DialogDescription className="text-[#A9B3CE]">
              Connect to your America Cryo ESP32 handheld device.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            <div className="text-center space-y-1">
              <p className="text-sm font-semibold text-white tracking-wider">
                {connectionStatus === 'idle' && "Ready to Connect"}
                {connectionStatus === 'scanning' && "Scanning for Devices..."}
                {connectionStatus === 'connecting' && "Pairing with ESP32-Cryo..."}
                {connectionStatus === 'connected' && "Connection Successful"}
              </p>
            </div>
            <Button 
              onClick={handleConnect}
              disabled={connectionStatus !== 'idle'}
              className="w-full h-12 text-base font-bold tracking-wide bg-[#3D63DD] hover:bg-[#3D63DD]/90"
            >
              {connectionStatus === 'idle' ? "Start Scanning" : "Connected"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
