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
} from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Horse } from "@/components/icons/Horse";

export default function Dashboard() {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto pb-24 md:pb-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground tracking-widest">Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">Welcome back, Dr. Anderson</p>
        </div>
        <Button className="w-full md:w-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all active:scale-95 border border-primary/20">
          <Bluetooth className="w-4 h-4" /> Connect Device
        </Button>
      </header>
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
