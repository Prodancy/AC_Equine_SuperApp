import america_cryo_logo from "@/assets/logo-official.png";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Plus, 
  Download, 
  Search, 
  ChevronRight, 
  DollarSign, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Billing() {
  const [isStripeConnected, setIsStripeConnected] = useState(false);

  const invoices = [
    { id: "INV-001", horse: "Thunder Spirit", owner: "Sarah Jenkins", amount: "$450.00", date: "Feb 24, 2024", status: "Paid" },
    { id: "INV-002", horse: "Bella Luna", owner: "Mark Davis", amount: "$320.00", date: "Feb 23, 2024", status: "Pending" },
    { id: "INV-003", horse: "Apollo", owner: "James Wilson", amount: "$1,200.00", date: "Feb 23, 2024", status: "Paid" },
    { id: "INV-004", horse: "Midnight Star", owner: "Elena Rodriguez", amount: "$580.00", date: "Feb 22, 2024", status: "Pending" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 pb-24 md:pb-8">
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center">
          <img src={america_cryo_logo} alt="America Cryo Logo" className="h-10 md:h-12 w-auto mb-1" />
        </div>
      </div>

      <div className="flex justify-between items-center bg-card/30 backdrop-blur-md sticky top-0 z-50 py-4 px-4 md:px-8 border-b border-white/5 -mx-4 md:-mx-8 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-widest text-foreground">Billing</h1>
          <p className="text-[10px] text-muted-foreground tracking-tight hidden md:block">Financial Management & Stripe Integration</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="gap-2 h-9 text-[10px] font-bold tracking-wider">
            <Plus className="w-4 h-4" /> New Invoice
          </Button>
        </div>
      </div>

      {!isStripeConnected && (
        <Card className="bg-primary/5 border-primary/20 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <CreditCard className="w-32 h-32 text-primary" />
          </div>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-primary/20 text-primary border-primary/30">Action Required</Badge>
            </div>
            <CardTitle className="text-2xl font-bold">Connect your Stripe account</CardTitle>
            <CardDescription className="max-w-md text-gray-400">
              Enable full payment processing, automatic invoicing, and secure payouts directly to your bank account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setIsStripeConnected(true)}
              className="bg-[#635bff] hover:bg-[#534bb3] text-white gap-2 h-12 px-8 font-bold text-sm shadow-xl shadow-[#635bff]/20"
            >
              <ArrowUpRight className="w-4 h-4" /> Connect with Stripe
            </Button>
          </CardContent>
        </Card>
      )}

      {isStripeConnected && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 md:grid-cols-3"
        >
          <Card className="bg-card/50 backdrop-blur border-white/5 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] tracking-widest text-muted-foreground flex items-center gap-2">
                <DollarSign className="w-3 h-3 text-green-400" /> Stripe Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-white">$4,850.20</div>
              <p className="text-[10px] text-green-400 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur border-white/5 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] tracking-widest text-muted-foreground flex items-center gap-2">
                <Clock className="w-3 h-3 text-orange-400" /> Pending Payouts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-white">$1,240.00</div>
              <p className="text-[10px] text-gray-500 mt-1">Next payout: Feb 28</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur border-white/5 shadow-xl border-t-2 border-t-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] tracking-widest text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-primary" /> Stripe Status
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold text-white">Active</span>
              </div>
              <Button variant="ghost" size="sm" className="text-[10px] text-primary font-black tracking-widest">
                Stripe Dashboard <ArrowUpRight className="w-3 h-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Card className="bg-card/50 backdrop-blur border-white/5 shadow-xl overflow-hidden">
        <CardHeader className="bg-white/[0.02] border-b border-white/5">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-[10px] tracking-[0.2em] text-primary font-black">Recent Invoices</CardTitle>
              <CardDescription className="text-gray-500 text-xs">Manage patient billing and transaction history.</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input className="pl-10 h-10 bg-black/20 border-white/10 text-xs rounded-xl" placeholder="Search invoices..." />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px]">
            <div className="divide-y divide-white/5">
              {invoices.map((inv, i) => (
                <div key={i} className="p-4 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          {inv.horse}
                          <span className="text-[10px] text-gray-600 font-medium tracking-tight">({inv.id})</span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium">{inv.owner} • {inv.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm font-black text-white">{inv.amount}</div>
                        <Badge className={cn(
                          "text-[8px] font-black tracking-widest h-5",
                          inv.status === "Paid" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                        )}>
                          {inv.status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="icon" className="text-gray-600 group-hover:text-primary transition-colors">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="bg-white/[0.02] border-t border-white/5 p-4 justify-center">
          <Button variant="ghost" size="sm" className="text-[10px] font-black tracking-widest text-muted-foreground hover:text-primary transition-colors">
            View All Billing History <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
