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
    { icon: Horse, label: "Horses", href: "/horses" },
    { icon: FileText, label: "Records", href: "/records" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 md:hidden pb-safe">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full px-2 gap-1 transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "w-6 h-6 transition-transform",
                    isActive && "scale-110"
                  )}
                />
                <span className="text-[10px] font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
