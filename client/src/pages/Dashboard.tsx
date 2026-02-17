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
  AlertCircle
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
} from "@/components/ui/dialog";

import america_cryo_logo_horizontalh_64 from "@assets/america-cryo-logo-horizontalh-64.png";

export default function Dashboard() {
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'scanning' | 'connecting' | 'connected' | 'error'>('idle');

  const handleConnect = async () => {
    setConnectionStatus('scanning');
    // Simulate Bluetooth scanning and connection logic
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConnectionStatus('connecting');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setConnectionStatus('connected');
    
    // Auto-close after success
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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground tracking-widest">Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">Welcome back, Dr. Anderson</p>
        </div>
        <Button 
          onClick={() => setIsConnectOpen(true)}
          className="w-full md:w-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all active:scale-95 border border-primary/20"
        >
          <Bluetooth className="w-4 h-4" /> Connect Device
        </Button>
      </header>
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
      {/* Hero Section - Solid Branding */}
      <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl aspect-[16/9] md:aspect-[32/9] border border-white/10 bg-gradient-to-br from-[#0a0f1d] via-[#111827] to-[#030712]">
        <div className="absolute inset-0 flex items-end md:items-center p-6 md:p-12">
          <div className="max-w-xl space-y-2 md:space-y-4 pb-4 md:pb-0">
            <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight drop-shadow-md">
              ADVANCED EQUINE <br/><span className="text-primary glow-text">CRYOTHERAPY</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-lg max-w-[90%] drop-shadow-sm">
              Precision temperature control for optimal recovery and performance.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="/treatment">
                <Button size="lg" className="w-full md:w-auto bg-primary text-white hover:bg-primary/90 border-0 font-bold shadow-lg shadow-primary/20">
                  START SESSION <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Stats - Horizontal scroll on mobile */}
      <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 md:mx-0 md:px-0 no-scrollbar snap-x">
        {[
          { label: "Active Treatments", value: "3", icon: Activity, color: "text-primary" },
          { label: "Avg. Temp Drop", value: "-25°C", icon: Thermometer, color: "text-primary" },
          { label: "Hours This Week", value: "12.5h", icon: Clock, color: "text-muted-foreground" },
          { label: "Scheduled Today", value: "5", icon: Calendar, color: "text-muted-foreground" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="min-w-[160px] md:min-w-0 snap-center"
          >
            <Card className="hover:shadow-lg transition-shadow h-full bg-card/50 backdrop-blur border-white/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                <CardTitle className="text-xs font-medium text-muted-foreground whitespace-nowrap tracking-wider">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Quick Actions / Recent Activity */}
        <Card className="col-span-full lg:col-span-4 shadow-lg border-white/5 bg-card/50 backdrop-blur order-2 lg:order-1">
          <CardHeader>
            <CardTitle className="tracking-wider text-sm md:text-base">Recent Treatments</CardTitle>
            <CardDescription>
              Latest cryotherapy sessions recorded.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 md:p-6">
            <div className="divide-y divide-white/5">
              {[
                { horse: "Thunder Spirit", condition: "Tendonitis - Left Foreleg", time: "2h ago", protocol: "Inflammation" },
                { horse: "Bella Luna", condition: "Post-Race Recovery", time: "5h ago", protocol: "Recovery" },
                { horse: "Midnight Star", condition: "Muscle Soreness", time: "Yesterday", protocol: "Deep Tissue" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground leading-none">{item.horse}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{item.condition}</p>
                  </div>
                  <div className="text-right pl-4">
                    <div className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20 whitespace-nowrap tracking-wide">{item.protocol}</div>
                    <div className="text-[10px] text-muted-foreground mt-1">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full text-xs text-muted-foreground mt-2 md:hidden hover:text-primary">
              View All History <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Quick Start Panel */}
        <Card className="col-span-full lg:col-span-3 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 order-1 lg:order-2">
          <CardHeader>
            <CardTitle className="tracking-wider text-sm md:text-base">Quick Actions</CardTitle>
            <CardDescription>Manage your clinic</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/treatment">
              <Button className="w-full h-20 text-lg flex flex-col gap-1 justify-center items-center shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all active:scale-[0.98] bg-primary text-white border-0">
                <ThermometerSnowflake className="w-8 h-8 mb-1" />
                <span className="font-bold tracking-wide">NEW TREATMENT</span>
              </Button>
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/horses">
                <Button variant="outline" className="w-full h-14 flex flex-col gap-0.5 justify-center bg-card/50 backdrop-blur hover:bg-card border-white/10 hover:border-primary/50 text-foreground transition-all">
                  <Horse className="w-5 h-5 text-primary" />
                  <span className="text-xs font-medium tracking-wide">Add Horse</span>
                </Button>
              </Link>
              <Link href="/records">
                <Button variant="outline" className="w-full h-14 flex flex-col gap-0.5 justify-center bg-card/50 backdrop-blur hover:bg-card border-white/10 hover:border-primary/50 text-foreground transition-all">
                  <Activity className="w-5 h-5 text-primary" />
                  <span className="text-xs font-medium tracking-wide">Records</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
