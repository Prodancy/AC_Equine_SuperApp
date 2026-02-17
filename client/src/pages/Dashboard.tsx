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
  Rabbit,
} from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import horseHero from "@/assets/horse-hero.jpg";

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Dr. Anderson</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105">
          <Bluetooth className="w-4 h-4" /> Connect Device
        </Button>
      </header>

      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[21/9] md:aspect-[32/9]">
        <img 
          src={horseHero} 
          alt="Rabbit running" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-8 md:p-12">
          <div className="max-w-xl space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Advanced Equine <span className="text-blue-400">Cryotherapy</span>
            </h2>
            <p className="text-gray-200 text-lg">
              Precision temperature control for optimal recovery and performance.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="/treatment">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 border-0">
                  Start Session <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Treatments", value: "3", icon: Activity, color: "text-blue-500" },
          { label: "Avg. Temp Drop", value: "-25°C", icon: Thermometer, color: "text-cyan-500" },
          { label: "Hours This Week", value: "12.5h", icon: Clock, color: "text-indigo-500" },
          { label: "Scheduled Today", value: "5", icon: Calendar, color: "text-violet-500" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Quick Actions / Recent Activity */}
        <Card className="col-span-4 shadow-sm border-secondary/20">
          <CardHeader>
            <CardTitle>Recent Treatments</CardTitle>
            <CardDescription>
              Latest cryotherapy sessions recorded.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { horse: "Thunder Spirit", condition: "Tendonitis - Left Foreleg", time: "2 hours ago", protocol: "Inflammation Reduction" },
                { horse: "Bella Luna", condition: "Post-Race Recovery", time: "5 hours ago", protocol: "General Recovery" },
                { horse: "Midnight Star", condition: "Muscle Soreness - Hindquarters", time: "Yesterday", protocol: "Deep Tissue" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{item.horse}</p>
                    <p className="text-sm text-muted-foreground">{item.condition}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">{item.protocol}</div>
                    <div className="text-xs text-muted-foreground">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Start Panel */}
        <Card className="col-span-3 bg-gradient-to-br from-primary/5 to-secondary/20 border-primary/10">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your clinic</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/treatment">
              <Button className="w-full h-20 text-lg flex flex-col gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                <ThermometerSnowflake className="w-8 h-8" />
                New Treatment
              </Button>
            </Link>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/horses">
                <Button variant="outline" className="w-full h-16 flex flex-col gap-1 bg-background/50 backdrop-blur hover:bg-background/80">
                  <Rabbit className="w-5 h-5" />
                  Add Rabbit
                </Button>
              </Link>
              <Link href="/records">
                <Button variant="outline" className="w-full h-16 flex flex-col gap-1 bg-background/50 backdrop-blur hover:bg-background/80">
                  <Activity className="w-5 h-5" />
                  Records
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
