import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Stethoscope,
  ThermometerSnowflake,
  FileText,
  Settings,
  Rabbit,
} from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: ThermometerSnowflake, label: "Treatment", href: "/treatment" },
    { icon: Rabbit, label: "Rabbit Registry", href: "/horses" },
    { icon: FileText, label: "Health Records", href: "/records" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="w-64 border-r bg-card flex flex-col h-full">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary tracking-tighter uppercase">
          America<span className="text-foreground">Cryo</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">
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
