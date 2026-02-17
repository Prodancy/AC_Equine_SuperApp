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
  Stethoscope,
  Users,
  Play
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

  const stats = [
    { label: "Active Treatments", value: "3", icon: Activity, trend: "+12%", color: "text-blue-400" },
    { label: "Avg. Temp Drop", value: "-25°C", icon: Thermometer, trend: "-5%", color: "text-cyan-400" },
    { label: "Hours This Week", value: "12.5h", icon: Clock, trend: "+2.4h", color: "text-purple-400" },
    { label: "Scheduled Today", value: "5", icon: Calendar, trend: "Stable", color: "text-emerald-400" },
    { label: "Total Patients", value: "124", icon: Users, trend: "+8", color: "text-orange-400" },
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
    <div className="min-h-screen bg-[#030712] pb-24 md:pb-8">
      {/* Mobile Logo */}
      <div className="flex justify-center md:hidden p-4">
        <img src={america_cryo_logo} alt="America Cryo Logo" className="h-8 w-auto" />
      </div>

      <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">Doctor Dashboard</h1>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Clinic Status & Rapid Controls</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button 
              onClick={() => setIsConnectOpen(true)}
              className="flex-1 md:flex-none gap-2 bg-[#1a2234] hover:bg-[#252e45] text-white border border-white/10 h-12 px-6 rounded-2xl transition-all active:scale-95"
            >
              <Bluetooth className="w-4 h-4 text-primary" /> 
              <span className="font-black uppercase tracking-widest text-[10px]">Connect Device</span>
            </Button>
          </div>
        </header>

        {/* Horizontal Metrics */}
        <section className="relative group">
          <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar snap-x -mx-4 px-4 md:mx-0 md:px-0">
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[200px] flex-1 snap-center"
              >
                <div className="bg-[#111827]/50 backdrop-blur-xl border border-white/5 p-5 rounded-[2rem] hover:border-primary/30 transition-all group/stat">
                  <div className="flex justify-between items-start mb-4">
                    <div className={cn("p-2 rounded-xl bg-white/5", stat.color)}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">{stat.trend}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-3xl font-black text-white tracking-tighter group-hover/stat:text-primary transition-colors">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Integrated Actions & Controls */}
          <div className="lg:col-span-5 space-y-8">
            <section className="space-y-4">
              <Label className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Command Center</Label>
              <div className="grid grid-cols-1 gap-4">
                <Link href="/treatment">
                  <button className="w-full group relative overflow-hidden rounded-[2.5rem] bg-primary p-1 shadow-[0_20px_50px_rgba(239,68,68,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98]">
                    <div className="flex items-center justify-between bg-primary p-6 rounded-[2.4rem]">
                      <div className="flex items-center gap-4">
                        <div className="p-4 bg-white/20 rounded-3xl">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-white font-black text-xl uppercase tracking-tighter">Start Session</p>
                          <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Immediate Treatment</p>
                        </div>
                      </div>
                      <ArrowRight className="w-6 h-6 text-white/50 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </Link>

                <div className="grid grid-cols-2 gap-4">
                  <Link href="/diagnose/new">
                    <button className="flex flex-col items-center justify-center gap-3 bg-[#1a2234] border border-white/5 p-6 rounded-[2rem] hover:border-primary/50 transition-all group">
                      <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary transition-colors">
                        <Stethoscope className="w-6 h-6 text-primary group-hover:text-white" />
                      </div>
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">New Assessment</span>
                    </button>
                  </Link>
                  <Link href="/horses">
                    <button className="flex flex-col items-center justify-center gap-3 bg-[#1a2234] border border-white/5 p-6 rounded-[2rem] hover:border-primary/50 transition-all group">
                      <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">
                        <Horse className="w-6 h-6 text-blue-400" />
                      </div>
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Registry</span>
                    </button>
                  </Link>
                </div>

                <button 
                  onClick={() => setIsScheduleOpen(true)}
                  className="w-full flex items-center justify-between bg-[#111827] border border-white/5 p-5 rounded-[2rem] hover:bg-[#1a2234] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-2xl">
                      <Calendar className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold text-sm uppercase tracking-tight">Schedule Slot</p>
                      <p className="text-gray-500 text-[10px] font-bold uppercase">Manage Appointments</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] font-black">2 OPEN</Badge>
                </button>
              </div>
            </section>

            {/* Quick Metrics Detail */}
            <Card className="bg-[#111827]/30 border-white/5 rounded-[2.5rem] overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-black text-gray-500 uppercase tracking-widest">System Health</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <div className="flex justify-between items-center p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <Bluetooth className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-bold text-gray-300 uppercase">Device Status</span>
                  </div>
                  <span className="text-[9px] font-black text-green-500 uppercase">Online</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span className="text-[10px] font-bold text-gray-300 uppercase">Sync Status</span>
                  </div>
                  <span className="text-[9px] font-black text-blue-400 uppercase">Last Sync: 2m ago</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Treatment Pipeline */}
          <div className="lg:col-span-7">
            <Card className="bg-[#111827]/50 backdrop-blur-xl border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
              <CardHeader className="p-8 pb-4">
                <div className="flex justify-between items-end">
                  <div>
                    <CardTitle className="text-2xl font-black text-white tracking-tighter uppercase">Recent Activity</CardTitle>
                    <CardDescription className="text-gray-500 font-bold text-[10px] uppercase tracking-widest">Live Treatment Pipeline</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary font-black uppercase text-[10px] tracking-widest">Export All</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px] px-8 pb-8">
                  <div className="space-y-4">
                    {[
                      { date: "Feb 24, 2024", horse: "Thunder Spirit", protocol: "Tendon Repair", status: "Completed", modalities: ["cryo", "3b_laser"] },
                      { date: "Feb 23, 2024", horse: "Bella Luna", protocol: "Recovery", status: "Completed", modalities: ["cryo"] },
                      { date: "Feb 23, 2024", horse: "Apollo", protocol: "Inflammation", status: "Interrupted", modalities: ["shockwave"] },
                      { date: "Feb 22, 2024", horse: "Midnight Star", protocol: "Manual", status: "Completed", modalities: ["class_iv"] },
                      { date: "Feb 21, 2024", horse: "Storm", protocol: "Recovery", status: "Completed", modalities: ["cryo"] },
                      { date: "Feb 20, 2024", horse: "Shadow", protocol: "Tendon Repair", status: "Completed", modalities: ["3b_laser"] },
                    ].map((row, i) => (
                      <div key={i} className="group relative bg-[#1a2234]/40 rounded-3xl p-5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                          <div className="space-y-1">
                            <div className="text-[9px] font-black text-gray-500 tracking-widest uppercase">{row.date}</div>
                            <div className="text-lg font-black text-white tracking-tight group-hover:text-primary transition-colors">{row.horse}</div>
                          </div>
                          <Badge variant={row.status === "Completed" ? "default" : "destructive"} className="text-[9px] font-black uppercase tracking-tighter rounded-xl h-6 px-3">
                            {row.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-[10px] text-primary font-black uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-xl border border-primary/10">{row.protocol}</div>
                          <div className="flex gap-2">
                            {row.modalities.map(m => {
                              const tool = treatments.find(t => t.id === m);
                              return tool ? <tool.icon key={m} className={cn("w-4 h-4", tool.color)} /> : null;
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 px-2 pb-4">
                      <Link href="/diagnose">
                        <Button variant="outline" className="w-full border-dashed border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] h-14 rounded-[1.5rem] transition-all">
                          View All Clinical Records
                        </Button>
                      </Link>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bluetooth Connection Dialog */}
      <Dialog open={isConnectOpen} onOpenChange={setIsConnectOpen}>
        <DialogContent className="sm:max-w-md bg-[#0a0f1d] border-white/10 rounded-[2.5rem]">
          <DialogHeader>
            <DialogTitle className="text-white font-black uppercase tracking-tight">Bluetooth Connection</DialogTitle>
            <DialogDescription className="text-gray-500 font-medium">
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
                    className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/5"
                  >
                    <Bluetooth className="w-12 h-12 text-primary shadow-primary/20" />
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
                    <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin shadow-lg" />
                    <Bluetooth className="w-10 h-10 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </motion.div>
                )}
                {connectionStatus === 'connected' && (
                  <motion.div 
                    key="connected"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center border-4 border-green-500/10"
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
              <p className="text-xs text-gray-500 font-medium px-8 leading-relaxed">
                {connectionStatus === 'idle' && "Make sure your handheld device is powered on and within range."}
                {connectionStatus === 'scanning' && "Looking for nearby America Cryo medical hardware."}
                {connectionStatus === 'connecting' && "Establishing secure high-speed Bluetooth tunnel."}
                {connectionStatus === 'connected' && "ESP32 Handheld Controller is linked and ready for surgery."}
              </p>
            </div>

            <Button 
              onClick={handleConnect}
              disabled={connectionStatus !== 'idle'}
              className="w-full h-14 text-xs font-black uppercase tracking-[0.2em] rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              {connectionStatus === 'idle' ? "Initiate Pairing" : (
                connectionStatus === 'connected' ? "Connected" : "Synchronizing..."
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Dialog (Kept functional but restyled) */}
      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent className="sm:max-w-md bg-[#0a0f1d] border-white/10 rounded-[2.5rem]">
          <DialogHeader>
            <DialogTitle className="text-white font-black uppercase tracking-tight">Schedule Treatment</DialogTitle>
            <DialogDescription className="text-gray-500 font-medium">Book a new precision session for a patient.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-[10px] uppercase tracking-widest text-primary font-black">Select Patient</Label>
                <button 
                  onClick={() => setIsAddingNewHorse(!isAddingNewHorse)}
                  className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-bold"
                >
                  {isAddingNewHorse ? "Cancel" : "Add New +"}
                </button>
              </div>
              
              {isAddingNewHorse ? (
                <input 
                  type="text"
                  placeholder="Enter horse name..."
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm focus:ring-1 focus:ring-primary/50 text-white outline-none"
                  value={newHorseName}
                  onChange={(e) => setNewHorseName(e.target.value)}
                  autoFocus
                />
              ) : (
                <div className="relative">
                  <select 
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm focus:ring-1 focus:ring-primary/50 text-white appearance-none cursor-pointer outline-none"
                    value={selectedHorse}
                    onChange={(e) => setSelectedHorse(e.target.value)}
                  >
                    <option value="" disabled className="bg-[#0a0f1d]">Select a horse...</option>
                    {horses.map(horse => (
                      <option key={horse} value={horse} className="bg-[#0a0f1d]">{horse}</option>
                    ))}
                  </select>
                  <Plus className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 rotate-45 pointer-events-none" />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] uppercase tracking-widest text-primary font-black">Date Selection</Label>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className={cn(
                    "aspect-square rounded-xl border border-white/5 flex flex-col items-center justify-center text-[10px] font-bold cursor-pointer transition-all hover:border-primary/50",
                    i === 1 ? "bg-primary text-white shadow-lg" : "bg-white/5 text-gray-500"
                  )}>
                    <span className="text-[8px] uppercase">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                    <span className="text-xs">{16 + i}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] uppercase tracking-widest text-primary font-black">Available Slots</Label>
              <div className="grid grid-cols-3 gap-2">
                {['09:00', '10:30', '14:00', '15:30', '17:00'].map(time => (
                  <Button key={time} variant="outline" className="h-11 text-xs border-white/5 bg-white/5 hover:border-primary/50 text-white rounded-xl uppercase font-bold tracking-tighter">{time}</Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              className="w-full bg-primary text-white font-black tracking-widest uppercase h-14 rounded-2xl shadow-xl shadow-primary/20" 
              onClick={() => {
                setIsScheduleOpen(false);
                setIsAddingNewHorse(false);
              }}
              disabled={isAddingNewHorse ? !newHorseName : !selectedHorse}
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

