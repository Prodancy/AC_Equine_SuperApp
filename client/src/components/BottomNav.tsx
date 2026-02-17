import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ThermometerSnowflake,
  FileText,
  Settings,
} from "lucide-react";
import { Horse } from "@/components/icons/Horse";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Home", href: "/" },
    { icon: ThermometerSnowflake, label: "Therapy", href: "/treatment" },
    { icon: FileText, label: "Diagnosis", href: "/records", isCenter: true },
    { icon: Horse, label: "Horses", href: "/horses" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[#0a0f1d]/80 backdrop-blur-xl border border-white/10 rounded-[28px] z-50 md:hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
      <nav className="flex justify-between items-center h-20 px-4 relative">
        {navItems.map((item) => {
          const isActive = location === item.href;
          if (item.isCenter) {
            return (
              <Link key={item.href} href={item.href}>
                <div className="relative -top-6 flex items-center justify-center">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 shadow-2xl rotate-45 group active:scale-90",
                    isActive 
                      ? "bg-primary text-white shadow-primary/40" 
                      : "bg-[#1a2234] text-gray-400 border border-white/5"
                  )}>
                    <div className="-rotate-45 flex flex-col items-center gap-0.5">
                      <item.icon className="w-6 h-6" />
                      <span className="text-[9px] font-bold tracking-tight uppercase">DR</span>
                    </div>
                  </div>
                  <span className={cn(
                    "absolute -bottom-8 text-[10px] font-bold tracking-wider transition-colors uppercase",
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
                  "flex flex-col items-center justify-center px-3 py-2 gap-1.5 transition-all duration-300 relative group active:scale-95",
                  isActive
                    ? "text-primary"
                    : "text-gray-500 hover:text-gray-300"
                )}
              >
                <item.icon
                  className={cn(
                    "w-6 h-6 transition-all duration-300",
                    isActive ? "scale-110" : "group-hover:translate-y-[-2px]"
                  )}
                />
                <span className="text-[10px] font-bold tracking-wide uppercase">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="nav-active"
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
