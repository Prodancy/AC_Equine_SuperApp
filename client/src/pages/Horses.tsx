import america_cryo_logo from "@/assets/logo-official.png";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Trash2, Edit, ChevronLeft, History, Clock, Thermometer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

// Mock Data with History
const initialHorses = [
  { 
    id: 1, 
    name: "Thunder Spirit", 
    breed: "Thoroughbred", 
    age: 5, 
    owner: "Sarah Jenkins", 
    notes: "Sensitive to cold on left flank.",
    history: [
      { date: "Feb 24, 2024", protocol: "Tendon Repair", temp: "-120°C", status: "Completed" },
      { date: "Feb 21, 2024", protocol: "Tendon Repair", temp: "-120°C", status: "Completed" },
    ]
  },
  { 
    id: 2, 
    name: "Bella Luna", 
    breed: "Arabian", 
    age: 7, 
    owner: "Mark Davis", 
    notes: "Regular maintenance required.",
    history: [
      { date: "Feb 23, 2024", protocol: "Recovery", temp: "-130°C", status: "Completed" },
    ]
  },
  { 
    id: 3, 
    name: "Midnight Star", 
    breed: "Quarter Horse", 
    age: 4, 
    owner: "Elena Rodriguez", 
    notes: "Recovering from fetlock injury.",
    history: [
      { date: "Feb 22, 2024", protocol: "Deep Tissue", temp: "-150°C", status: "Completed" },
    ]
  },
  { 
    id: 4, 
    name: "Apollo", 
    breed: "Warmblood", 
    age: 9, 
    owner: "James Wilson", 
    notes: "Arthritis in right knee.",
    history: [
      { date: "Feb 23, 2024", protocol: "Inflammation", temp: "-140°C", status: "Interrupted" },
    ]
  },
];

export default function Horses() {
  const [horses, setHorses] = useState(initialHorses);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedHorse, setExpandedHorse] = useState<number | null>(null);

  // Form State
  const [newHorse, setNewHorse] = useState({ name: "", breed: "", age: "", owner: "", notes: "" });

  const filteredHorses = horses.filter(h => 
    h.name.toLowerCase().includes(search.toLowerCase()) || 
    h.owner.toLowerCase().includes(search.toLowerCase())
  );

  const toggleHistory = (id: number) => {
    setExpandedHorse(expandedHorse === id ? null : id);
  };

  const handleAddHorse = () => {
    if (!newHorse.name || !newHorse.owner) {
      toast({
        title: "Validation Error",
        description: "Name and Owner are required.",
        variant: "destructive"
      });
      return;
    }

    const horse = {
      id: Date.now(),
      name: newHorse.name,
      breed: newHorse.breed,
      age: parseInt(newHorse.age) || 0,
      owner: newHorse.owner,
      notes: newHorse.notes,
      history: []
    };

    setHorses([...horses, horse]);
    setNewHorse({ name: "", breed: "", age: "", owner: "", notes: "" });
    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: `${horse.name} has been registered.`,
    });
  };

  const handleDelete = (id: number) => {
    setHorses(horses.filter(h => h.id !== id));
    toast({
      title: "Deleted",
      description: "Horse record removed.",
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 pb-24 md:pb-8">
      <div className="flex justify-center md:hidden mb-2">
        <div className="flex flex-col items-center">
          <img src={america_cryo_logo} alt="America Cryo Logo" className="h-8 w-auto mb-1" />
        </div>
      </div>
    <div className="flex justify-between items-center bg-card/30 backdrop-blur-md sticky top-0 z-50 py-4 px-4 md:px-8 border-b border-white/5 -mx-4 md:-mx-8 mb-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 text-primary">
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-widest uppercase text-foreground">Registry</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-tight hidden md:block">Patient Profiles & History</p>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="gap-2 shadow-md h-9 text-[10px] font-bold uppercase tracking-wider">
            <Plus className="w-4 h-4" /> <span>Add Patient</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] w-[95vw] rounded-xl">
          <DialogHeader>
            <DialogTitle>Register New Patient</DialogTitle>
            <DialogDescription>
              Create a new profile for treatment tracking.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Patient Name</Label>
              <Input id="name" value={newHorse.name} onChange={e => setNewHorse({...newHorse, name: e.target.value})} placeholder="e.g., Thunder Spirit" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="breed">Breed</Label>
                <Input id="breed" value={newHorse.breed} onChange={e => setNewHorse({...newHorse, breed: e.target.value})} placeholder="e.g., Thoroughbred" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" value={newHorse.age} onChange={e => setNewHorse({...newHorse, age: e.target.value})} placeholder="e.g., 5" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="owner">Owner</Label>
              <Input id="owner" value={newHorse.owner} onChange={e => setNewHorse({...newHorse, owner: e.target.value})} placeholder="Owner Name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Medical Notes</Label>
              <Textarea id="notes" value={newHorse.notes} onChange={e => setNewHorse({...newHorse, notes: e.target.value})} placeholder="Any specific conditions..." />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddHorse} className="w-full md:w-auto">Register Patient</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

      <div className="flex items-center gap-2 bg-card p-3 rounded-xl border shadow-sm max-w-md w-full">
        <Search className="w-5 h-5 text-muted-foreground ml-1" />
        <Input 
          className="border-0 shadow-none focus-visible:ring-0 bg-transparent h-auto p-0 text-base" 
          placeholder="Search by name or owner..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredHorses.map((horse) => (
          <motion.div
            key={horse.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-primary active:scale-[0.99] transition-transform overflow-hidden">
              <CardHeader className="pb-2 p-4 md:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg md:text-xl">{horse.name}</CardTitle>
                    <CardDescription>{horse.breed} • {horse.age} years old</CardDescription>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {horse.name.charAt(0)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0 space-y-4">
                <div className="space-y-2 text-sm mt-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Owner:</span>
                    <span className="font-medium">{horse.owner}</span>
                  </div>
                  <div className="bg-secondary/50 p-2 rounded text-xs text-muted-foreground italic">
                    {horse.notes || "No notes available."}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-between h-8 text-xs font-bold tracking-wider uppercase text-primary hover:bg-primary/5"
                    onClick={() => toggleHistory(horse.id)}
                  >
                    <span className="flex items-center gap-2">
                      <History className="w-3.5 h-3.5" />
                      Treatment History
                    </span>
                    <ChevronLeft className={cn("w-4 h-4 transition-transform", expandedHorse === horse.id ? "-rotate-90" : "rotate-0")} />
                  </Button>
                  
                  <AnimatePresence>
                    {expandedHorse === horse.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 pt-3">
                          {horse.history?.map((entry, idx) => (
                            <Link key={idx} href={`/horses/${horse.id}/history/${entry.date.replace(/ /g, '-')}`}>
                              <div className="bg-[#1a2234]/40 rounded-lg p-3 border border-white/5 flex justify-between items-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all active:scale-[0.98] group mb-2">
                                <div className="space-y-1">
                                  <div className="text-[10px] text-muted-foreground flex items-center gap-1.5 uppercase font-bold tracking-tighter">
                                    <Clock className="w-3 h-3 text-primary" />
                                    {entry.date}
                                  </div>
                                  <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{entry.protocol}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-[10px] text-primary flex items-center justify-end gap-1 font-bold">
                                    <Thermometer className="w-3 h-3" />
                                    {entry.temp}
                                  </div>
                                  <div className={cn(
                                    "text-[9px] uppercase font-black tracking-widest mt-0.5",
                                    entry.status === "Completed" ? "text-green-500" : "text-yellow-500"
                                  )}>
                                    {entry.status}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-0 pb-4 px-4 md:px-6 bg-secondary/10">
                <Button variant="ghost" size="sm" className="hover:text-primary text-xs font-bold tracking-widest">
                  <Edit className="w-3.5 h-3.5 mr-1" /> EDIT
                </Button>
                <Button variant="ghost" size="sm" className="hover:text-destructive text-destructive/80 text-xs font-bold tracking-widest" onClick={() => handleDelete(horse.id)}>
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> DELETE
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
