import america_cryo_logo from "@/assets/logo-official.png";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Thermometer, 
  Clock, 
  Calendar,
  ArrowRight,
  Bluetooth,
  ThermometerSnowflake,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Zap,
  Waves,
  ShieldCheck,
  Plus
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
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export default function Dashboard() {
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'scanning' | 'connecting' | 'connected' | 'error'>('idle');
  const [selectedHorse, setSelectedHorse] = useState<string>("");
  const [isAddingNewHorse, setIsAddingNewHorse] = useState(false);
  const [newHorseName, setNewHorseName] = useState("");

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
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto pb-24 md:pb-8">
      <div className="flex justify-center md:hidden mb-2">
        <div className="flex flex-col items-center">
          <img src={america_cryo_logo} alt="America Cryo Logo" className="h-8 w-auto mb-1" />
        </div>
      </div>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground tracking-widest uppercase">Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">Welcome back, Dr. Anderson</p>
        </div>
      </header>

      <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 md:mx-0 md:px-0 no-scrollbar snap-x">
        {[
          { label: "Active Treatments", value: "3", icon: Activity, color: "text-primary" },
          { label: "Patient Recovery", value: "94%", icon: ShieldCheck, color: "text-green-400" },
          { label: "Revenue MTD", value: "$12.4k", icon: Zap, color: "text-orange-400" },
          { label: "Scheduled Today", value: "5", icon: Calendar, color: "text-primary" },
        ].map((stat, i) => (
          <motion.div key={i} className="min-w-[160px] md:min-w-0 snap-center">
            <Card className="hover:shadow-lg transition-shadow h-full bg-card/50 backdrop-blur border-white/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                <CardTitle className="text-xs font-medium text-muted-foreground whitespace-nowrap tracking-wider">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent className="p-4 pt-0"><div className="text-2xl font-bold text-foreground">{stat.value}</div></CardContent>
            </Card>
          </motion.div>
        ))}
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

      <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl aspect-[16/10] md:aspect-[32/12] border border-white/10 bg-gradient-to-br from-[#0a0f1d] via-[#111827] to-[#030712]">
        <div className="absolute inset-0 flex items-center p-6 md:p-12">
          <div className="w-full grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-2 md:space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight drop-shadow-md uppercase">
                EQUINE HEALTH <br/><span className="text-primary glow-text">SOLUTIONS</span>
              </h2>
              <p className="text-gray-300 text-sm md:text-lg max-w-[90%] drop-shadow-sm">
                Comprehensive management for peak performance and recovery.
              </p>
              <div className="flex gap-4 pt-2">
                <Link href="/treatment">
                  <Button size="lg" className="bg-primary text-white hover:bg-primary/90 border-0 font-bold shadow-lg shadow-primary/20">
                    START SESSION <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => setIsScheduleOpen(true)}
                className="h-24 md:h-32 flex flex-col gap-2 justify-center bg-white/5 hover:bg-white/10 border-white/10 text-white transition-all backdrop-blur-sm"
              >
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-center">Schedule<br/>Treatment</span>
              </Button>
              <Link href="/horses">
                <Button 
                  className="w-full h-24 md:h-32 flex flex-col gap-2 justify-center bg-white/5 hover:bg-white/10 border-white/10 text-white transition-all backdrop-blur-sm"
                >
                  <Horse className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-center">Patient<br/>Registry</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1">
        <Card className="shadow-lg border-white/5 bg-card/50 backdrop-blur overflow-hidden">
          <div className="h-1 bg-gray-500/20 w-full" />
          <CardHeader>
            <CardTitle className="tracking-[0.2em] text-[10px] uppercase text-gray-400 font-black">Treatment Pipeline</CardTitle>
            <CardDescription className="text-gray-400">Aggregated patient sessions and outcomes.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 md:p-6">
            <div className="space-y-3 pb-4 px-4 md:px-0 max-h-[800px] overflow-y-auto no-scrollbar">
              {[
                { date: "Feb 24, 2024", horse: "Thunder Spirit", protocol: "Tendon Repair", status: "Completed", modalities: ["cryo", "3b_laser"] },
                { date: "Feb 23, 2024", horse: "Bella Luna", protocol: "Recovery", status: "Completed", modalities: ["cryo"] },
                { date: "Feb 23, 2024", horse: "Apollo", protocol: "Inflammation", status: "Interrupted", modalities: ["shockwave"] },
                { date: "Feb 22, 2024", horse: "Midnight Star", protocol: "Manual", status: "Completed", modalities: ["class_iv"] },
                { date: "Feb 21, 2024", horse: "Storm", protocol: "Recovery", status: "Completed", modalities: ["cryo"] },
                { date: "Feb 20, 2024", horse: "Shadow", protocol: "Tendon Repair", status: "Completed", modalities: ["3b_laser"] },
                { date: "Feb 19, 2024", horse: "Blaze", protocol: "Inflammation", status: "Completed", modalities: ["shockwave"] },
                { date: "Feb 18, 2024", horse: "Luna", protocol: "Manual", status: "Completed", modalities: ["class_iv"] },
                { date: "Feb 17, 2024", horse: "Spirit", protocol: "Deep Tissue", status: "Completed", modalities: ["cryo", "3b_laser"] },
                { date: "Feb 16, 2024", horse: "Titan", protocol: "Recovery", status: "Completed", modalities: ["cryo"] },
                { date: "Feb 15, 2024", horse: "Flash", protocol: "Tendon Repair", status: "Completed", modalities: ["shockwave"] },
              ].map((row, i) => (
                <div key={i} className="group relative bg-[#1a2234]/40 rounded-2xl p-4 border border-white/5 hover:border-primary/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-0.5">
                      <div className="text-[9px] font-black text-gray-500 tracking-widest uppercase">{row.date}</div>
                      <div className="text-sm font-bold text-white tracking-tight">{row.horse}</div>
                    </div>
                    <Badge variant={row.status === "Completed" ? "default" : "destructive"} className="text-[9px] font-black uppercase tracking-tighter rounded-lg h-5 px-2">
                      {row.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-[11px] text-primary font-bold uppercase tracking-tight bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">{row.protocol}</div>
                    <div className="flex gap-1">
                      {row.modalities.map(m => {
                        const tool = treatments.find(t => t.id === m);
                        return tool ? <tool.icon key={m} className={cn("w-3.5 h-3.5", tool.color)} /> : null;
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
