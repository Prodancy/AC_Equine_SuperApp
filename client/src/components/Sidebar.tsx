import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ThermometerSnowflake,
  FileText,
  Settings,
} from "lucide-react";
import { Horse } from "@/components/icons/Horse";

export default function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: ThermometerSnowflake, label: "Treatment", href: "/treatment" },
    { icon: Horse, label: "Horse Registry", href: "/horses" },
    { icon: FileText, label: "Health Records", href: "/records" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="hidden md:flex w-64 border-r bg-card flex-col h-full sticky top-0">
      <div className="p-6 border-b">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-primary tracking-tighter">
            America<span className="text-foreground">Cryo</span>
          </h1>
          <a 
            href="https://www.americacryo.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-widest"
          >
            WWW.AMERICACRYO.COM
          </a>
        </div>
        <p className="text-xs text-muted-foreground mt-2 tracking-widest font-medium">
          Equine Therapy
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-transform group-hover:scale-110",
                    isActive ? "stroke-[2.5px]" : "stroke-[2px]"
                  )}
                />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 px-4 py-3 bg-secondary/50 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <div className="text-xs font-medium">
            <div className="text-foreground">Device Connected</div>
            <div className="text-muted-foreground">Battery: 85%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
