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
import { Plus, Search, Trash2, Edit, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Link } from "wouter";

// Mock Data
const initialHorses = [
  { id: 1, name: "Thunder Spirit", breed: "Thoroughbred", age: 5, owner: "Sarah Jenkins", notes: "Sensitive to cold on left flank." },
  { id: 2, name: "Bella Luna", breed: "Arabian", age: 7, owner: "Mark Davis", notes: "Regular maintenance required." },
  { id: 3, name: "Midnight Star", breed: "Quarter Horse", age: 4, owner: "Elena Rodriguez", notes: "Recovering from fetlock injury." },
  { id: 4, name: "Apollo", breed: "Warmblood", age: 9, owner: "James Wilson", notes: "Arthritis in right knee." },
];

export default function Horses() {
  const [horses, setHorses] = useState(initialHorses);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form State
  const [newHorse, setNewHorse] = useState({ name: "", breed: "", age: "", owner: "", notes: "" });

  const filteredHorses = horses.filter(h => 
    h.name.toLowerCase().includes(search.toLowerCase()) || 
    h.owner.toLowerCase().includes(search.toLowerCase())
  );

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
      notes: newHorse.notes
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
          <h1 className="text-xl font-bold text-primary tracking-tighter">
            America<span className="text-foreground">Cryo</span>
          </h1>
          <a 
            href="https://www.americacryo.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[8px] text-muted-foreground hover:text-primary transition-colors tracking-[0.2em]"
          >
            WWW.AMERICACRYO.COM
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
           <Link href="/">
             <Button variant="ghost" size="icon" className="md:hidden -ml-2">
               <ChevronLeft className="w-6 h-6" />
             </Button>
           </Link>
           <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Horse Registry</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage patient profiles and history.</p>
           </div>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto gap-2 shadow-md">
              <Plus className="w-4 h-4" /> <span className="hidden md:inline">Register New Horse</span><span className="md:hidden">Add Horse</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] w-[95vw] rounded-xl">
            <DialogHeader>
              <DialogTitle>Register New Horse</DialogTitle>
              <DialogDescription>
                Create a new profile for treatment tracking.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Horse Name</Label>
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
              <Button onClick={handleAddHorse} className="w-full md:w-auto">Register Horse</Button>
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
            <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-primary active:scale-[0.99] transition-transform">
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
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="space-y-2 text-sm mt-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Owner:</span>
                    <span className="font-medium">{horse.owner}</span>
                  </div>
                  <div className="bg-secondary/50 p-2 rounded text-xs text-muted-foreground italic">
                    {horse.notes || "No notes available."}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-0 pb-4 px-4 md:px-6">
                <Button variant="ghost" size="sm" className="hover:text-primary">
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button variant="ghost" size="sm" className="hover:text-destructive text-destructive/80" onClick={() => handleDelete(horse.id)}>
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
