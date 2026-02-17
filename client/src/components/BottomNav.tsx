import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Zap, 
  Camera, 
  Users, 
  UserCircle,
  Stethoscope,
  Plus,
  X,
  ShieldCheck,
  Loader2,
  Activity,
  Waves
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import thermalHorseDark from "@/assets/thermal-horse-dark.jpg";

export default function BottomNav() {
  const [location] = useLocation();
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [diagnosisNote, setDiagnosisNote] = useState("");
  const [conditionLabel, setConditionLabel] = useState("");
  const [proposedTreatment, setProposedTreatment] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const treatments = [
    { id: "cryo", label: "Cryotherapy", icon: Zap, color: "text-blue-400" },
    { id: "3b_laser", label: "3B Laser", icon: Activity, color: "text-red-400" },
    { id: "shockwave", label: "Shockwave", icon: Waves, color: "text-orange-400" },
    { id: "class_iv", label: "Class IV Laser", icon: ShieldCheck, color: "text-purple-400" },
  ];

  const handleCapture = () => {
    if (capturedImages.length < 4) {
      setCapturedImages([...capturedImages, thermalHorseDark]);
    }
  };

  const toggleTreatment = (id: string) => {
    setProposedTreatment(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const removeImage = (index: number) => {
    setCapturedImages(capturedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsScanOpen(false);
    setCapturedImages([]);
    setDiagnosisNote("");
    setConditionLabel("");
    setProposedTreatment([]);
  };

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Zap, label: "Therapy", href: "/treatment" },
    { icon: Camera, label: "Diagnose", href: "/diagnose", isCenter: true },
    { icon: Users, label: "Horses", href: "/horses" },
    { icon: UserCircle, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0f1d] border-t border-white/5 z-50 md:hidden pb-safe shadow-2xl">
      <nav className="flex justify-around items-center h-16 relative">
        {navItems.map((item) => {
          const isActive = location === item.href;
          if (item.isCenter) {
            return (
              <Link key={item.href} href={item.href}>
                <div className="relative flex flex-col items-center justify-center -mt-8">
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl active:scale-90 cursor-pointer",
                    isActive 
                      ? "bg-primary text-white shadow-primary/30" 
                      : "bg-[#1a2234] text-gray-400 border border-white/10"
                  )}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <span className={cn(
                    "mt-1 text-[10px] font-bold tracking-tight transition-colors",
                    isActive ? "text-primary" : "text-gray-500"
                  )}>
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          }
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex flex-col items-center justify-center w-16 h-full gap-1 transition-all duration-300 relative active:scale-95 cursor-pointer",
                  isActive
                    ? "text-primary"
                    : "text-gray-500 hover:text-gray-400"
                )}
              >
                <item.icon
                  className={cn(
                    "w-6 h-6 transition-all duration-300",
                    isActive ? "scale-110" : "scale-100"
                  )}
                />
                <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="nav-active-dot"
                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
