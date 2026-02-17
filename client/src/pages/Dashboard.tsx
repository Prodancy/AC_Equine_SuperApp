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
  Plus,
  CreditCard
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
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center">
          <img src={america_cryo_logo} alt="America Cryo Logo" className="h-10 md:h-12 w-auto mb-1" />
        </div>
      </div>
      <div className="flex justify-between items-center bg-card/30 backdrop-blur-md sticky top-0 z-50 py-4 px-4 md:px-8 border-b border-white/5 -mx-4 md:-mx-8 mb-6">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-widest text-foreground">Dashboard</h1>
            <p className="text-[10px] text-muted-foreground tracking-tight hidden md:block">Welcome back, Dr. Anderson</p>
          </div>
        </div>
      </div>
      <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 md:mx-0 md:px-0 no-scrollbar snap-x">
        {[
          { label: "Active Treatments", value: "3", icon: Activity, color: "text-primary" },
          { label: "Patient Recovery", value: "94%", icon: ShieldCheck, color: "text-green-400" },
          { label: "Revenue MTD", value: "$12.4k", icon: CreditCard, color: "text-orange-400", href: "/billing" },
          { label: "Scheduled Today", value: "5", icon: Calendar, color: "text-primary" },
        ].map((stat, i) => (
          <motion.div key={i} className="min-w-[160px] md:min-w-0 snap-center">
            {stat.href ? (
              <Link href={stat.href}>
                <Card className="hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer h-full bg-card/50 backdrop-blur border-white/5">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                    <CardTitle className="text-xs font-medium text-muted-foreground whitespace-nowrap tracking-wider">{stat.label}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <Card className="hover:shadow-lg transition-shadow h-full bg-card/50 backdrop-blur border-white/5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                  <CardTitle className="text-xs font-medium text-muted-foreground whitespace-nowrap tracking-wider">{stat.label}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                </CardContent>
              </Card>
            )}
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
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#0a0f1d]">
        <div className="p-8 md:p-12">
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <div className="h-px w-8 bg-primary/50" />
                  <span className="text-[10px] tracking-[0.4em] font-black">Professional Equine Care</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-none">
                  Equine Health <br/><span className="font-black text-primary italic">Solutions</span>
                </h2>
              </div>
              <p className="text-gray-400 text-sm md:text-lg max-w-2xl leading-relaxed font-medium">
                Elevating performance through precision management and advanced recovery protocols.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Link href="/treatment">
                <Button className="w-full h-20 md:h-24 flex flex-col items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 rounded-2xl transition-all shadow-lg shadow-primary/20 group/btn px-4">
                  <ThermometerSnowflake className="w-6 h-6 transition-transform group-hover:scale-110" />
                  <span className="md:text-xs font-bold tracking-[0.1em] text-[15px]">Start Session</span>
                </Button>
              </Link>
              
              <Button 
                onClick={() => setIsScheduleOpen(true)}
                className="w-full h-20 md:h-24 flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl transition-all backdrop-blur-md group/btn shadow-lg px-4"
              >
                <Calendar className="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
                <span className="md:text-xs font-bold tracking-[0.1em] text-[15px]">Schedule</span>
              </Button>

              <Link href="/horses" className="w-full">
                <Button 
                  className="w-full h-20 md:h-24 flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl transition-all backdrop-blur-md group/btn shadow-lg px-4"
                >
                  <Horse className="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.1em]">Patients</span>
                </Button>
              </Link>

              <Link href="/billing" className="w-full">
                <Button 
                  className="w-full h-20 md:h-24 flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl transition-all backdrop-blur-md group/btn shadow-lg px-4"
                >
                  <CreditCard className="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.1em]">Billing</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 sticky top-0 z-20">
        <Card className="shadow-lg border-white/5 bg-card/80 backdrop-blur-xl overflow-hidden border-t-primary/20">
          <div className="h-1 bg-primary/40 w-full" />
          <CardHeader className="bg-card/50 backdrop-blur-md z-30 pb-4">
            <CardTitle className="tracking-[0.2em] text-[10px] text-primary font-black">Scheduled Today</CardTitle>
            <CardDescription className="text-gray-400">Upcoming sessions for {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</CardDescription>
          </CardHeader>
          <CardContent className="p-0 md:p-6">
            <div className="space-y-3 pb-4 px-4 md:px-0">
              {[
                { time: "09:00 AM", horse: "Thunder Spirit", protocol: "Tendon Repair", status: "Confirmed", modalities: ["cryo", "3b_laser"] },
                { time: "10:30 AM", horse: "Bella Luna", protocol: "Recovery", status: "Confirmed", modalities: ["cryo"] },
                { time: "01:15 PM", horse: "Apollo", protocol: "Inflammation", status: "Delayed", modalities: ["shockwave"] },
                { time: "03:00 PM", horse: "Midnight Star", protocol: "Manual", status: "Confirmed", modalities: ["class_iv"] },
                { time: "04:30 PM", horse: "Storm", protocol: "Recovery", status: "Confirmed", modalities: ["cryo"] },
              ].map((row, i) => (
                <div key={i} className="group relative bg-[#1a2234]/40 rounded-2xl p-4 border border-white/5 hover:border-primary/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-0.5">
                      <div className="text-[10px] font-black text-primary tracking-widest flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {row.time}
                      </div>
                      <div className="text-sm font-bold text-white tracking-tight">{row.horse}</div>
                    </div>
                    <Badge variant={row.status === "Confirmed" ? "default" : "destructive"} className={cn(
                      "text-[9px] font-black tracking-tighter rounded-lg h-5 px-2",
                      row.status === "Confirmed" ? "bg-green-500/20 text-green-500 border-green-500/30" : "bg-red-500/20 text-red-500 border-red-500/30"
                    )}>
                      {row.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-[11px] text-primary font-bold tracking-tight bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">{row.protocol}</div>
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
