import america_cryo_logo from "@/assets/logo-official.png";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Activity, Waves, ShieldCheck, Bluetooth, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Treatment() {
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

  const therapies = [
    {
      id: "cryo",
      name: "Cryotherapy",
      description: "Advanced nitrogen-free localized cooling for inflammation and recovery.",
      icon: Zap,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
      href: "/treatment/cryotherapy"
    },
    {
      id: "laser3b",
      name: "3B Laser Therapy",
      description: "Low-level laser therapy for tissue repair and pain management.",
      icon: Activity,
      color: "text-red-400",
      bg: "bg-red-400/10",
      border: "border-red-400/20",
      href: "/treatment/3b-laser"
    },
    {
      id: "shockwave",
      name: "Shockwave Therapy",
      description: "Extracorporeal shockwave for chronic pain and tendon issues.",
      icon: Waves,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      border: "border-orange-400/20",
      href: "/treatment/shockwave"
    },
    {
      id: "class4",
      name: "Class IV Laser",
      description: "High-power laser for deep tissue penetration and rapid healing.",
      icon: ShieldCheck,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/20",
      href: "/treatment/class-iv"
    }
  ];

  return (
    <div className="p-3 md:p-6 max-w-7xl mx-auto space-y-6 pb-20 md:pb-6">
      <div className="flex justify-center mb-5">
        <div className="flex flex-col items-center">
          <img src={america_cryo_logo} alt="America Cryo Logo" className="h-7 md:h-9 w-auto mb-1" />
        </div>
      </div>

      <div className="flex justify-between items-center bg-card/30 backdrop-blur-md sticky top-0 z-50 py-4 px-4 md:px-8 -mx-4 md:-mx-8 mb-6">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Treatments</h1>
            <p className="text-[10px] text-muted-foreground tracking-tight hidden md:block">Select clinical modality</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {therapies.map((therapy, i) => (
          <motion.div
            key={therapy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={therapy.href}>
              <Card className={cn(
                "group cursor-pointer overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] border-white/5 bg-card/50 backdrop-blur hover:border-primary/30",
                "relative"
              )}>
                <div className={cn("absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40", therapy.bg)} />
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className={cn("p-3 rounded-2xl transition-transform group-hover:scale-110 shadow-lg", therapy.bg, therapy.border)}>
                    <therapy.icon className={cn("w-6 h-6", therapy.color)} />
                  </div>
                  <div>
                    <CardTitle className="text-lg md:text-xl font-bold">{therapy.name}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">Select to start session</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    {therapy.description}
                  </p>
                  <div className="flex items-center text-primary text-xs font-semibold group-hover:translate-x-1 transition-transform">
                    Start protocol <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <Dialog open={isConnectOpen} onOpenChange={setIsConnectOpen}>
        <DialogContent className="sm:max-w-md bg-card border-white/10">
          <DialogHeader>
            <DialogTitle>Bluetooth Connection</DialogTitle>
            <DialogDescription>
              Connect to your America Cryo ESP32 handheld device.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            <div className="text-center space-y-1">
              <p className="text-sm font-semibold text-foreground tracking-wider">
                {connectionStatus === 'idle' && "Ready to Connect"}
                {connectionStatus === 'scanning' && "Scanning for Devices..."}
                {connectionStatus === 'connecting' && "Pairing with ESP32-Cryo..."}
                {connectionStatus === 'connected' && "Connection Successful"}
              </p>
            </div>
            <Button 
              onClick={handleConnect}
              disabled={connectionStatus !== 'idle'}
              className="w-full h-12 text-base font-bold tracking-wide"
            >
              {connectionStatus === 'idle' ? "Start Scanning" : "Connected"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
