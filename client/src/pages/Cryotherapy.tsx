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
    name: "Trigger Point / Myofascial Pain",
    duration: 10,
    intensity: 65,
    temp: -115,
  },
  // Shoulder
  {
    id: "p1_shoulder",
    bodyPart: "shoulder",
    name: "30 Seconds",
    duration: 0.5,
    intensity: 80,
    temp: -140,
  },
  {
    id: "p2_shoulder",
    bodyPart: "shoulder",
    name: "45 Seconds",
    duration: 0.75,
    intensity: 70,
    temp: -120,
  },
  {
    id: "p3_shoulder",
    bodyPart: "shoulder",
    name: "60 Seconds",
    duration: 1,
    intensity: 60,
    temp: -110,
  },
  {
    id: "p4_shoulder",
    bodyPart: "shoulder",
    name: "90 Seconds",
    duration: 1.5,
    intensity: 50,
    temp: -100,
  },
  {
    id: "p25_shoulder",
    bodyPart: "shoulder",
    name: "120 Seconds",
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
    name: "30 Seconds",
    duration: 0.5,
    intensity: 75,
    temp: -130,
  },
  {
    id: "p6",
    bodyPart: "back-left",
    name: "45 Seconds",
    duration: 0.75,
    intensity: 85,
    temp: -150,
  },
  {
    id: "p7",
    bodyPart: "back-left",
    name: "60 Seconds",
    duration: 1,
    intensity: 65,
    temp: -115,
  },
  {
    id: "p8",
    bodyPart: "back-left",
    name: "90 Seconds",
    duration: 1.5,
    intensity: 90,
    temp: -160,
  },
  {
    id: "p27",
    bodyPart: "back-left",
    name: "120 Seconds",
    duration: 2,
    intensity: 70,
    temp: -125,
  },
  {
    id: "p28",
    bodyPart: "back-left",
    name: "Custom",
    duration: 5,
    intensity: 40,
    temp: -80,
  },
  // Back Right
  {
    id: "p13",
    bodyPart: "back-right",
    name: "30 Seconds",
    duration: 0.5,
    intensity: 70,
    temp: -125,
  },
  {
    id: "p14",
    bodyPart: "back-right",
    name: "45 Seconds",
    duration: 0.75,
    intensity: 80,
    temp: -140,
  },
  {
    id: "p15",
    bodyPart: "back-right",
    name: "60 Seconds",
    duration: 1,
    intensity: 65,
    temp: -115,
  },
  {
    id: "p16",
    bodyPart: "back-right",
    name: "90 Seconds",
    duration: 1.5,
    intensity: 60,
    temp: -110,
  },
  {
    id: "p31",
    bodyPart: "back-right",
    name: "120 Seconds",
    duration: 2,
    intensity: 75,
    temp: -130,
  },
  {
    id: "p32",
    bodyPart: "back-right",
    name: "Custom",
    duration: 15,
    intensity: 85,
    temp: -150,
  },
  // Front Leg Left
  {
    id: "p9",
    bodyPart: "leg-front-left",
    name: "30 Seconds",
    duration: 0.5,
    intensity: 60,
    temp: -110,
  },
  {
    id: "p10",
    bodyPart: "leg-front-left",
    name: "45 Seconds",
    duration: 0.75,
    intensity: 70,
    temp: -125,
  },
  {
    id: "p11",
    bodyPart: "leg-front-left",
    name: "60 Seconds",
    duration: 1,
    intensity: 75,
    temp: -130,
  },
  {
    id: "p12",
    bodyPart: "leg-front-left",
    name: "90 Seconds",
    duration: 1.5,
    intensity: 55,
    temp: -105,
  },
  {
    id: "p29",
    bodyPart: "leg-front-left",
    name: "120 Seconds",
    duration: 2,
    intensity: 80,
    temp: -140,
  },
  {
    id: "p30",
    bodyPart: "leg-front-left",
    name: "Custom",
    duration: 11,
    intensity: 65,
    temp: -120,
  },
  // Front Leg Right
  {
    id: "p17",
    bodyPart: "leg-front-right",
    name: "30 Seconds",
    duration: 0.5,
    intensity: 75,
    temp: -135,
  },
  {
    id: "p18",
    bodyPart: "leg-front-right",
    name: "45 Seconds",
    duration: 0.75,
    intensity: 85,
    temp: -145,
  },
  {
    id: "p19",
    bodyPart: "leg-front-right",
    name: "60 Seconds",
    duration: 1,
    intensity: 65,
    temp: -120,
  },
  {
    id: "p20",
    bodyPart: "leg-front-right",
    name: "90 Seconds",
    duration: 1.5,
    intensity: 50,
    temp: -100,
  },
  {
    id: "p33",
    bodyPart: "leg-front-right",
    name: "120 Seconds",
    duration: 2,
    intensity: 60,
    temp: -110,
  },
  {
    id: "p34",
    bodyPart: "leg-front-right",
    name: "Custom",
    duration: 13,
    intensity: 70,
    temp: -125,
  },
  // Joint Hind
  {
    id: "p1_joint",
    bodyPart: "joint-hind",
    name: "30 Seconds",
    duration: 0.5,
    intensity: 80,
    temp: -140,
  },
  {
    id: "p2_joint",
    bodyPart: "joint-hind",
    name: "45 Seconds",
    duration: 0.75,
    intensity: 70,
    temp: -120,
  },
  {
    id: "p3_joint",
    bodyPart: "joint-hind",
    name: "60 Seconds",
    duration: 1,
    intensity: 60,
    temp: -110,
  },
  {
    id: "p4_joint",
    bodyPart: "joint-hind",
    name: "90 Seconds",
    duration: 1.5,
    intensity: 50,
    temp: -100,
  },
  {
    id: "p25_joint",
    bodyPart: "joint-hind",
    name: "120 Seconds",
    duration: 2,
    intensity: 45,
    temp: -90,
  },
  {
    id: "p26_joint",
    bodyPart: "joint-hind",
    name: "Custom",
    duration: 10,
    intensity: 65,
    temp: -115,
  },
  // Hoof Front Left
  {
    id: "p21",
    bodyPart: "hoof-front-left",
    name: "30 Seconds",
    duration: 0.5,
    intensity: 90,
    temp: -160,
  },
  {
    id: "p22",
    bodyPart: "hoof-front-left",
    name: "45 Seconds",
    duration: 0.75,
    intensity: 80,
    temp: -140,
  },
  {
    id: "p23",
    bodyPart: "hoof-front-left",
    name: "60 Seconds",
    duration: 1,
    intensity: 70,
    temp: -130,
  },
  {
    id: "p24",
    bodyPart: "hoof-front-left",
    name: "90 Seconds",
    duration: 1.5,
    intensity: 60,
    temp: -115,
  },
  {
    id: "p35",
    bodyPart: "hoof-front-left",
    name: "120 Seconds",
    duration: 2,
    intensity: 50,
    temp: -100,
  },
  {
    id: "p36",
    bodyPart: "hoof-front-left",
    name: "Custom",
    duration: 11,
    intensity: 65,
    temp: -120,
  },
];

export default function Cryotherapy() {
  const [selectedPart, setSelectedPart] = useState<string>("neck");
  const [localProtocols, setLocalProtocols] = useState(protocols);
  const [activeProtocol, setActiveProtocol] = useState(protocols[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(protocols[0].duration * 60);
  const [currentTemp, setCurrentTemp] = useState(20);
  const [targetTemp, setTargetTemp] = useState(protocols[0].temp);
  const [intensity, setIntensity] = useState([protocols[0].intensity]);

  useEffect(() => {
    const active = localProtocols.find((p) => p.id === activeProtocol);
    if (active) {
      setTargetTemp(active.temp);
      setIntensity([active.intensity]);
      setTimeLeft(active.duration * 60);
    }
  }, [activeProtocol]);

  const updateProtocolName = (id: string, newName: string) => {
    setLocalProtocols((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: newName } : p)),
    );
  };

  const filteredProtocols = localProtocols.filter(
    (p) => p.bodyPart === selectedPart,
  );
  const { toast } = useToast();

  const [customTime, setCustomTime] = useState(120);

  const currentProtocol =
    protocols.find((p) => p.id === activeProtocol) || filteredProtocols[0];

  useEffect(() => {
    const partProtocols = protocols.filter((p) => p.bodyPart === selectedPart);
    if (partProtocols.length > 0) {
      setActiveProtocol(partProtocols[0].id);
      setSelectedControl(null);
      setIsNozzleExpanded(true);
      setIsProtocolExpanded(false);
    }
  }, [selectedPart]);

  useEffect(() => {
    if (currentProtocol.name === "CUSTOM") {
      setTimeLeft(customTime);
    } else {
      setTimeLeft(currentProtocol.duration * 60);
    }
    setTargetTemp(currentProtocol.temp);
    setIntensity([currentProtocol.intensity]);
    setIsPlaying(false);
    setCurrentTemp(20);
  }, [activeProtocol, customTime]);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress =
    ((currentProtocol.duration * 60 - timeLeft) /
      (currentProtocol.duration * 60)) *
    100;

  const [activeTab, setActiveTab] = useState("controls");
  const [selectedNozzle, setSelectedNozzle] = useState("small");
  const [selectedMassageNozzle, setSelectedMassageNozzle] = useState("small");
  const [flowRate, setFlowRate] = useState([50]);

  const [isNozzleExpanded, setIsNozzleExpanded] = useState(true);
  const [isProtocolExpanded, setIsProtocolExpanded] = useState(false);
  const [selectedControl, setSelectedControl] = useState<string | null>(null);

  const handleSelection = (
    type: "fog" | "massage" | "flow",
    id: string,
    value?: number,
  ) => {
    setSelectedControl(`${type}-${id}`);
    if (type === "fog") setSelectedNozzle(id);
    if (type === "massage") setSelectedMassageNozzle(id);
    if (type === "flow" && value !== undefined) setFlowRate([value]);
    setIsProtocolExpanded(true);
    setIsNozzleExpanded(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 pb-24 md:pb-8">
      <div className="flex justify-center mb-6">
        <img
          src={america_cryo_logo}
          alt="America Cryo Logo"
          className="h-10 md:h-12 w-auto"
        />
      </div>
      <div className="flex flex-col bg-card/30 backdrop-blur-md sticky top-0 z-50 border-b border-white/5 -mx-4 md:-mx-8 mb-6">
        <div className="flex justify-between items-center py-4 px-4 md:px-8">
          <div className="flex items-center gap-4">
            <Link href="/treatment">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-widest text-white">
                Cryotherapy
              </h1>
              <p className="text-[10px] text-muted-foreground tracking-tight hidden md:block uppercase font-bold">
                Active Cryo Session
              </p>
            </div>
          </div>
        </div>

        <div className="flex px-4 md:px-8">
          <button
            onClick={() => setActiveTab("controls")}
            className={cn(
              "flex-1 py-3 tracking-[0.2em] uppercase transition-all relative text-[14px] font-extrabold",
              activeTab === "controls"
                ? "text-[#3D63DD]"
                : "text-[#A9B3CE] hover:text-[#A9B3CE]/80",
            )}
          >
            Manual Mode
            {activeTab === "controls" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3D63DD]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("thermal")}
            className={cn(
              "flex-1 py-3 tracking-[0.2em] uppercase transition-all relative text-[14px] font-extrabold",
              activeTab === "thermal"
                ? "text-[#3D63DD]"
                : "text-[#A9B3CE] hover:text-[#A9B3CE]/80",
            )}
          >
            Protocol Mode
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
          <div className="px-4 md:px-8 py-4 bg-[#0a0f1d]/40 backdrop-blur-md border-t border-white/5">
            <button
              onClick={() => setIsNozzleExpanded(!isNozzleExpanded)}
              className="w-full flex items-center justify-between py-2 group"
            >
              <p className="uppercase tracking-[0.3em] text-[#A9B3CE] text-[14px] group-hover:text-white transition-colors font-bold leading-tight text-left">
                SELECT
                <br />
                NOZZLE TYPE
              </p>
              <div className="flex-1" />
              {selectedControl && (
                <span className="font-bold text-[#3D63DD] uppercase tracking-widest bg-[#3D63DD]/10 px-2 py-0.5 rounded-full border border-[#3D63DD]/20 shrink-0 text-[12px]">
                  {selectedControl
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
                      <p className="font-medium text-[#A9B3CE]/40 uppercase tracking-widest mb-4 text-[14px]">
                        Fog Nozzle
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
                                  ? "bg-[#3D63DD]/10 border-[#3D63DD] shadow-[0_0_20px_rgba(61,99,221,0.15)]"
                                  : "bg-white/5 border-white/10 hover:border-white/20",
                              )}
                            >
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
                          </button>
                        ))}
                      </div>

                      <p className="font-medium text-[#A9B3CE]/40 uppercase tracking-widest mb-4 text-[14px]">
                        Massage Nozzle
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
                                  ? "bg-[#3D63DD]/10 border-[#3D63DD] shadow-[0_0_20px_rgba(61,99,221,0.15)]"
                                  : "bg-white/5 border-white/10 hover:border-white/20",
                              )}
                            >
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
                          </button>
                        ))}
                      </div>

                      <p className="font-medium text-[#A9B3CE]/40 uppercase tracking-widest mb-4 text-[14px]">
                        Flow Rates
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
                                  ? "bg-[#3D63DD]/10 border-[#3D63DD] shadow-[0_0_20px_rgba(61,99,221,0.15)]"
                                  : "bg-white/5 border-white/10 hover:border-white/20",
                              )}
                            >
                              <p className="uppercase tracking-tight text-[14px] font-medium text-[#ffffff] outline-none rounded px-1">
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
              "px-4 md:px-8 py-4 bg-[#0a0f1d]/40 backdrop-blur-md border-t border-white/5 transition-all duration-300",
              !selectedControl && "opacity-40 grayscale pointer-events-none",
            )}
          >
            <button
              onClick={() => setIsProtocolExpanded(!isProtocolExpanded)}
              disabled={!selectedControl}
              className="w-full flex items-center justify-between py-2 group"
            >
              <div className="flex flex-col items-start">
                <p className="uppercase tracking-[0.3em] text-[#A9B3CE] group-hover:text-white transition-colors text-[14px] font-bold text-left leading-tight">
                  SET SESSION
                  <br />
                  DURATION
                </p>
                {!selectedControl && (
                  <span className="text-[8px] text-[#3D63DD] font-black uppercase tracking-widest mt-1 animate-pulse">
                    Select nozzle first
                  </span>
                )}
              </div>
              <div className="flex-1" />
              {activeProtocol && selectedControl && (
                <span className="font-bold text-[#3D63DD] uppercase tracking-widest bg-[#3D63DD]/10 px-2 py-0.5 rounded-full border border-[#3D63DD]/20 shrink-0 text-[12px]">
                  {protocols.find((p) => p.id === activeProtocol)?.name ===
                  "CUSTOM"
                    ? `CUSTOM (${formatTime(customTime)})`
                    : protocols.find((p) => p.id === activeProtocol)?.name}
                </span>
              )}
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
                      {filteredProtocols.map((p) => (
                        <div
                          key={`protocol-btn-${p.id}`}
                          onClick={() => setActiveProtocol(p.id)}
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
                                ? "bg-[#3D63DD]/10 border-[#3D63DD] shadow-[0_0_20px_rgba(61,99,221,0.15)]"
                                : "bg-white/5 border-white/10 hover:border-white/20",
                            )}
                          >
                            <p className="uppercase tracking-tight text-[13px] font-bold text-white">
                              {p.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      {currentProtocol.name === "CUSTOM" && (
                        <div className="bg-[#0a0f1d] border border-white/10 rounded-2xl p-6 flex flex-col items-center space-y-6">
                          <div className="flex items-center justify-center gap-8">
                            {/* Minutes Column */}
                            <div className="flex flex-col items-center gap-1">
                              <button
                                onClick={() => {
                                  const mins = Math.floor(customTime / 60);
                                  const secs = customTime % 60;
                                  if (mins < 4)
                                    setCustomTime(
                                      Math.min(240, (mins + 1) * 60 + secs),
                                    );
                                }}
                                className="text-white/20 hover:text-white/60 transition-colors p-1"
                              >
                                <ChevronDown className="w-8 h-8 rotate-180" />
                              </button>
                              <div className="w-20 h-28 bg-[#3D63DD]/10 border border-[#3D63DD]/30 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-b from-[#3D63DD]/5 via-transparent to-[#3D63DD]/5 pointer-events-none" />
                                <span className="text-5xl font-black text-white tabular-nums tracking-tighter">
                                  {Math.floor(customTime / 60)
                                    .toString()
                                    .padStart(2, "0")}
                                </span>
                              </div>
                              <button
                                onClick={() => {
                                  const mins = Math.floor(customTime / 60);
                                  const secs = customTime % 60;
                                  if (mins > 2)
                                    setCustomTime(
                                      Math.max(120, (mins - 1) * 60 + secs),
                                    );
                                }}
                                className="text-white/20 hover:text-white/60 transition-colors p-1"
                              >
                                <ChevronDown className="w-8 h-8" />
                              </button>
                              <span className="font-black uppercase tracking-[0.2em] text-[#A9B3CE] mt-1 text-[14px]">
                                mins
                              </span>
                            </div>

                            {/* Divider */}
                            <div className="flex flex-col gap-3 py-10">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#3D63DD]" />
                              <div className="w-1.5 h-1.5 rounded-full bg-[#3D63DD]" />
                            </div>

                            {/* Seconds Column */}
                            <div className="flex flex-col items-center gap-1">
                              <button
                                onClick={() => {
                                  if (customTime < 240)
                                    setCustomTime(
                                      Math.min(240, customTime + 1),
                                    );
                                }}
                                className="text-white/20 hover:text-white/60 transition-colors p-1"
                              >
                                <ChevronDown className="w-8 h-8 rotate-180" />
                              </button>
                              <div className="w-20 h-28 bg-[#3D63DD]/10 border border-[#3D63DD]/30 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-b from-[#3D63DD]/5 via-transparent to-[#3D63DD]/5 pointer-events-none" />
                                <span className="text-5xl font-black text-white tabular-nums tracking-tighter">
                                  {(customTime % 60)
                                    .toString()
                                    .padStart(2, "0")}
                                </span>
                              </div>
                              <button
                                onClick={() => {
                                  if (customTime > 120)
                                    setCustomTime(
                                      Math.max(120, customTime - 1),
                                    );
                                }}
                                className="text-white/20 hover:text-white/60 transition-colors p-1"
                              >
                                <ChevronDown className="w-8 h-8" />
                              </button>
                              <span className="font-black uppercase tracking-[0.2em] text-[#A9B3CE] mt-1 text-[14px]">
                                sec
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
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
                  <CardTitle className="text-blue-400/60 tracking-widest text-[10px] md:text-xs">
                    Cooling Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col items-center justify-center space-y-6 md:space-y-8 relative z-10 py-6 md:py-8">
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
                        strokeDasharray="283"
                        strokeDashoffset={283 * (1 - progress / 100)}
                        className="text-blue-400 transition-all duration-1000 ease-linear"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-5xl md:text-6xl font-bold tracking-tighter tabular-nums text-white">
                        {formatTime(timeLeft)}
                      </span>
                      <span className="text-xs text-blue-400/80 mt-1 font-semibold tracking-wider">
                        Remaining
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:gap-8 w-full">
                    <div className="flex flex-col items-center bg-blue-500/5 p-3 md:p-4 rounded-xl border border-blue-500/10">
                      <Thermometer className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mb-1" />
                      <span className="text-xl md:text-2xl font-bold tabular-nums text-white">
                        {Math.round(currentTemp)}°C
                      </span>
                      <span className="text-[10px] md:text-xs text-blue-400/60 font-bold capitalize tracking-wider">
                        Nozzle Temp
                      </span>
                    </div>
                    <div className="flex flex-col items-center bg-blue-500/5 p-3 md:p-4 rounded-xl border border-blue-500/10">
                      <Zap className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mb-1" />
                      <span className="text-xl md:text-2xl font-bold tabular-nums text-white">
                        {intensity[0]}%
                      </span>
                      <span className="text-[10px] md:text-xs text-blue-400/60 font-bold capitalize tracking-wider">
                        Intensity
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4 md:space-y-6 order-2 md:order-1">
              <div
                className={cn(
                  "grid grid-cols-2 gap-3 md:gap-4 transition-all duration-300",
                  !selectedControl &&
                    "opacity-40 grayscale pointer-events-none",
                )}
              >
                <Button
                  size="lg"
                  disabled={!selectedControl}
                  className={cn(
                    "h-20 text-xl rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95",
                    isPlaying
                      ? "bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20"
                      : "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20",
                  )}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 mr-2 fill-current" />
                  ) : (
                    <Play className="w-8 h-8 mr-2 fill-current" />
                  )}
                  {isPlaying ? "Pause" : "Start"}
                </Button>
                <Button
                  size="lg"
                  variant="destructive"
                  className="h-20 text-xl rounded-2xl font-black uppercase tracking-widest bg-red-500/20 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95"
                  onClick={() => setIsPlaying(false)}
                  disabled={
                    !isPlaying && timeLeft === currentProtocol.duration * 60
                  }
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
            className="flex flex-col items-center justify-center min-h-[400px] border-2 border-white/5 rounded-[2rem] bg-white/5 relative"
          >
            <div className="absolute inset-0 flex items-center justify-center p-8 opacity-20 pointer-events-none">
              <Horse
                className="w-full h-full text-white"
                activePart={selectedPart}
              />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
              <div className="relative w-full max-w-2xl aspect-[1.1/1] flex items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl bg-[#0a0f1d]">
                <img
                  src={horse_anatomy}
                  alt="Horse Anatomy"
                  className="w-full h-full object-cover opacity-80"
                />

                {/* Hotspots matched to image with precise orange glowing points */}
                {[
                  { id: "head", top: "30.5%", left: "8.5%" },
                  { id: "neck", top: "28.8%", left: "25.2%" },
                  { id: "shoulder", top: "41.1%", left: "34.2%" },
                  { id: "back-left", top: "32.8%", left: "54.7%" },
                  { id: "back-right", top: "34.8%", left: "78.4%" },
                  { id: "leg-front-left", top: "80.2%", left: "39.1%" },
                  { id: "leg-front-right", top: "83.6%", left: "67.9%" },
                  { id: "joint-hind", top: "54.2%", left: "77.5%" },
                  { id: "hoof-front-left", top: "84.2%", left: "86.1%" },
                ].map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedPart(spot.id)}
                    className={cn(
                      "absolute w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 group z-20",
                      selectedPart === spot.id
                        ? "scale-110"
                        : "hover:scale-110",
                    )}
                    style={{ top: spot.top, left: spot.left }}
                  >
                    {/* Glowing orange point to match the image style */}
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full transition-all duration-500 relative flex items-center justify-center",
                        selectedPart === spot.id
                          ? "bg-[#FF8A00] shadow-[0_0_30px_#FF8A00] border-2 border-white"
                          : "bg-[#FF8A00] shadow-[0_0_15px_rgba(255,138,0,0.6)] border border-white/20 opacity-90 group-hover:opacity-100",
                      )}
                    >
                      {/* Inner highlight dot */}
                      <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />

                      {/* Outer pulse for active part */}
                      {selectedPart === spot.id && (
                        <div className="absolute inset-[-8px] rounded-full border-2 border-[#FF8A00] animate-ping opacity-40" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 w-full max-w-2xl">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold tracking-tight text-white uppercase mb-2">
                    {selectedPart.replace("-", " ")} Protocols
                  </h3>
                  <p className="text-[#A9B3CE] text-xs uppercase tracking-widest">
                    Select a protocol to begin treatment
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredProtocols.slice(0, 5).map((p) => (
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
                        setActiveTab("controls");
                        setIsPlaying(true);
                        toast({
                          title: "Protocol Started",
                          description: `Starting ${p.name} for ${selectedPart.replace("-", " ")}`,
                        });
                      }}
                    >
                      <div className="relative z-10">
                        <input
                          type="text"
                          value={p.name}
                          onChange={(e) => {
                            e.stopPropagation();
                            updateProtocolName(p.id, e.target.value);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="bg-transparent border-none outline-none text-white font-bold text-sm capitalize tracking-wider w-full focus:ring-0 p-0"
                        />
                      </div>
                      <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                        <Play className="w-4 h-4 text-white fill-current" />
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
  );
}
