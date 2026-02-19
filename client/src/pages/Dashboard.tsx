import america_cryo_logo from "@/assets/logo-official.png";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Clock, 
  Calendar,
  Bluetooth,
  ThermometerSnowflake,
  CheckCircle2,
  Zap,
  Waves,
  ShieldCheck,
  Plus,
  CreditCard,
  ChevronDown,
  Search,
  Bell,
  MoreHorizontal
} from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Horse } from "@/components/icons/Horse";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'scanning' | 'connecting' | 'connected' | 'error'>('idle');
  const [selectedHorse, setSelectedHorse] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedTreatment, setSelectedTreatment] = useState<string>("");

  const horses = [
    "Thunder Spirit",
    "Bella Luna",
    "Apollo",
    "Midnight Star",
    "Storm",
    "Shadow"
  ];

  const treatments = [
    { id: "cryo", label: "Cryotherapy", icon: Zap, color: "text-blue-400" },
    { id: "3b_laser", label: "3B Laser", icon: Activity, color: "text-red-400" },
    { id: "shockwave", label: "Shockwave", icon: Waves, color: "text-orange-400" },
    { id: "class_iv", label: "Class IV Laser", icon: ShieldCheck, color: "text-purple-400" },
    { id: "assessment", label: "New Assessment", icon: Activity, color: "text-green-400" },
  ];

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

  return (
    <div className="min-h-screen text-white p-4 md:p-8 pb-24 md:pb-8 bg-[#0a0f1d]">
      <div className="flex justify-center mb-10">
        <div className="flex flex-col items-center">
          <img src={america_cryo_logo} alt="America Cryo Logo" className="h-10 md:h-12 w-auto mb-1" />
        </div>
      </div>
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <div className="h-px w-6 bg-primary/50" />
            <span className="text-[10px] font-semibold">Clinical dashboard</span>
          </div>
          <h1 className="md:text-4xl tracking-tight text-[26px] text-left font-semibold">
            Welcome, <span className="text-[#3d63dd]">Dr. Anderson</span>
          </h1>
          <p className="text-gray-400 text-sm">You have 5 sessions scheduled for today.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Action Card */}
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-primary/20 via-[#0a0f1d] to-[#050810] border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
            <div className="p-4 md:p-6 relative flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 space-y-4">
                <div className="space-y-2 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-none text-left">
                    Equine therapy <br/><span className="text-primary">solutions</span>
                  </h2>
                  <p className="text-gray-400 text-xs md:text-sm max-w-md leading-relaxed text-left">
                    Precision equine care powered by America Cryo's advanced recovery protocols.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Link href="/treatment">
                    <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all text-xs">
                      <ThermometerSnowflake className="w-5 h-5" />
                      Start session
                    </Button>
                  </Link>
                  <Link href="/diagnose">
                    <Button variant="outline" className="w-full h-14 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold active:scale-95 transition-all flex items-center justify-center gap-2 text-xs">
                      <Activity className="w-5 h-5 text-primary" />
                      New diagnosis
                    </Button>
                  </Link>
                  <Link href="/billing">
                    <Button variant="outline" className="w-full h-14 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold active:scale-95 transition-all flex items-center justify-center gap-2 text-xs">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Create invoice
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => setIsScheduleOpen(true)}
                    variant="outline" 
                    className="w-full h-14 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold active:scale-95 transition-all flex items-center justify-center gap-2 text-xs"
                  >
                    <Calendar className="w-5 h-5 text-primary" />
                    Schedule
                  </Button>
                </div>
              </div>
              <div className="hidden md:block w-1/3 aspect-square relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <Horse className="w-32 h-32 text-primary opacity-80" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl rounded-[2rem] overflow-hidden sticky top-8">
            <div className="h-1.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 w-full" />
            <CardHeader className="p-6 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-gray-400">Scheduled today</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/5 text-gray-500">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { time: "09:00 AM", horse: "Thunder Spirit", protocol: "Tendon Repair", status: "Confirmed", modalities: ["cryo", "3b_laser"] },
                { time: "10:30 AM", horse: "Bella Luna", protocol: "Recovery", status: "Confirmed", modalities: ["cryo"] },
                { time: "01:15 PM", horse: "Apollo", protocol: "Inflammation", status: "Delayed", modalities: ["shockwave"] },
                { time: "03:00 PM", horse: "Midnight Star", protocol: "Manual", status: "Confirmed", modalities: ["class_iv"] },
                { time: "04:30 PM", horse: "Storm", protocol: "Recovery", status: "Confirmed", modalities: ["cryo"] },
              ].map((row, i) => (
                <div key={i} className="group flex items-center gap-4 p-3 rounded-2xl bg-[#121826]/50 border border-white/5 hover:border-primary/30 transition-all cursor-pointer">
                  <div className="text-center min-w-[50px]">
                    <p className="text-[9px] font-semibold text-primary">{row.time.split(' ')[1]}</p>
                    <p className="text-sm font-bold text-white leading-tight">{row.time.split(' ')[0]}</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{row.horse}</h4>
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full shadow-[0_0_8px]",
                        row.status === "Confirmed" ? "bg-green-500 shadow-green-500/50" : "bg-orange-400 shadow-orange-400/50"
                      )} />
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium">{row.protocol}</p>
                  </div>
                </div>
              ))}
              <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl h-12 text-xs font-bold mt-2">
                View all schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Bluetooth Connection Dialog */}
      <Dialog open={isConnectOpen} onOpenChange={setIsConnectOpen}>
        <DialogContent className="sm:max-w-md bg-[#0a0f1d] border-white/10 text-white rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight">Device Connection</DialogTitle>
            <DialogDescription className="text-gray-400 text-sm">
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
                    className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20"
                  >
                    <Bluetooth className="w-12 h-12 text-primary" />
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
                    <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <Bluetooth className="w-10 h-10 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </motion.div>
                )}
                {connectionStatus === 'connected' && (
                  <motion.div 
                    key="connected"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20"
                  >
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm font-black text-white uppercase tracking-widest">
                {connectionStatus === 'idle' && "Ready to Connect"}
                {connectionStatus === 'scanning' && "Scanning for Devices..."}
                {connectionStatus === 'connecting' && "Pairing with ESP32-Cryo..."}
                {connectionStatus === 'connected' && "Connection Successful"}
              </p>
              <p className="text-xs text-gray-500 px-8">
                {connectionStatus === 'idle' && "Make sure your handheld device is turned on."}
                {connectionStatus === 'scanning' && "Looking for nearby America Cryo hardware."}
                {connectionStatus === 'connecting' && "Establishing secure Bluetooth tunnel."}
                {connectionStatus === 'connected' && "ESP32 Handheld Controller is ready."}
              </p>
            </div>

            <Button 
              onClick={handleConnect}
              disabled={connectionStatus !== 'idle'}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black tracking-widest rounded-2xl"
            >
              {connectionStatus === 'idle' ? "START SCANNING" : (
                connectionStatus === 'connected' ? "CONNECTED" : "PROCESSING..."
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Schedule Dialog */}
      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent className="sm:max-w-lg bg-[#0a0f1d] border-white/10 text-white rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold tracking-tight">Schedule new session</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-3">
                <Label className="text-xs font-semibold text-primary uppercase tracking-wider">Select date</Label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-semibold text-primary uppercase tracking-wider">Available slots</Label>
                <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar -mx-1 px-1">
                {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"].map((time) => (
                  <Button
                    key={time}
                    variant="outline"
                    className={cn(
                      "text-[10px] font-black border-white/5 bg-white/5 hover:bg-white/10 text-white h-12 rounded-xl transition-all flex-shrink-0 min-w-[90px]",
                      selectedTime === time && "border-primary bg-primary/20 text-primary scale-105"
                    )}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-primary uppercase tracking-wider">Select patient</Label>
                  <Button variant="ghost" className="h-6 text-[10px] text-primary hover:bg-primary/10 px-2 rounded-lg gap-1">
                    <Plus className="w-3 h-3" /> New horse
                  </Button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-between font-bold border-white/5 bg-white/5 hover:bg-white/10 text-white rounded-xl h-12 px-4 transition-all",
                        selectedHorse && "border-primary/50 bg-primary/5"
                      )}
                    >
                      <div className="flex items-center">
                        <Horse className="w-4 h-4 mr-3 shrink-0 text-primary" />
                        <span className={cn(!selectedHorse && "text-gray-500 font-medium")}>
                          {selectedHorse || "Select a patient..."}
                        </span>
                      </div>
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)] bg-[#121826] border-white/10 text-white rounded-xl">
                    {horses.map((horse) => (
                      <DropdownMenuItem
                        key={horse}
                        onClick={() => setSelectedHorse(horse)}
                        className="hover:bg-primary/20 cursor-pointer py-3 px-4 flex items-center gap-3 transition-colors"
                      >
                        <Horse className="w-4 h-4 text-primary/70" />
                        <span className="font-medium">{horse}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-semibold text-primary uppercase tracking-wider">Treatment modality</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-between font-bold border-white/5 bg-white/5 hover:bg-white/10 text-white rounded-xl h-12 px-4 transition-all",
                        selectedTreatment && "border-primary/50 bg-primary/5"
                      )}
                    >
                      {selectedTreatment ? (
                        <div className="flex items-center">
                          {(() => {
                            const t = treatments.find(t => t.id === selectedTreatment);
                            return t ? (
                              <>
                                <t.icon className={cn("w-4 h-4 mr-3 shrink-0", t.color)} />
                                <span>{t.label}</span>
                              </>
                            ) : null;
                          })()}
                        </div>
                      ) : (
                        <span className="text-gray-500 font-medium">Select modality...</span>
                      )}
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)] bg-[#121826] border-white/10 text-white rounded-xl">
                    {treatments.map((t) => (
                      <DropdownMenuItem
                        key={t.id}
                        onClick={() => setSelectedTreatment(t.id)}
                        className="hover:bg-primary/20 cursor-pointer py-3 px-4 flex items-center gap-3 transition-colors"
                      >
                        <t.icon className={cn("w-4 h-4", t.color)} />
                        <span className="font-medium">{t.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
          </div>

          <DialogFooter className="mt-4">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-2xl shadow-xl shadow-primary/20" onClick={() => setIsScheduleOpen(false)}>
              Confirm schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
