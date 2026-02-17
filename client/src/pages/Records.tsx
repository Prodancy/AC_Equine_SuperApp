import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, ArrowUpRight, ChevronLeft, Camera, Plus } from "lucide-react";
import thermalHorseDark from "@/assets/thermal-horse-dark.jpg"; // Using new dark thermal asset
import { Link } from "wouter";

export default function Records() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex items-center gap-2">
          <Link href="/">
             <Button variant="ghost" size="icon" className="md:hidden -ml-2 text-muted-foreground hover:text-primary">
               <ChevronLeft className="w-6 h-6" />
             </Button>
           </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase tracking-widest">Health Records</h1>
            <p className="text-sm md:text-base text-muted-foreground">Diagnose, track, and analyze treatment history.</p>
          </div>
        </div>
        <div className="flex w-full md:w-auto gap-2">
            <Button className="flex-1 md:flex-none gap-2 bg-primary hover:bg-primary/90 text-white border-0 shadow-lg shadow-primary/20">
            <Camera className="w-4 h-4" /> NEW SCAN
            </Button>
            <Button variant="outline" className="flex-1 md:flex-none gap-2 border-white/10 bg-card/50 hover:bg-card text-foreground">
            <Download className="w-4 h-4" /> EXPORT
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1 shadow-lg bg-card/50 backdrop-blur border-white/5">
          <CardHeader>
            <CardTitle className="uppercase tracking-wider text-sm md:text-base">Thermal Imaging Analysis</CardTitle>
            <CardDescription>Compare pre and post treatment thermal scans.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-2">
                <div className="aspect-square relative rounded-xl overflow-hidden border border-white/10 bg-black/50 group cursor-pointer shadow-inner">
                  <img src={thermalHorseDark} alt="Before Treatment" className="object-cover w-full h-full opacity-90 transition-transform group-hover:scale-105" />
                  <div className="absolute top-2 left-2 bg-black/80 text-white text-[10px] md:text-xs px-2 py-1 rounded-md backdrop-blur-sm font-medium border border-white/10">
                    BEFORE (14:00)
                  </div>
                  <div className="absolute bottom-2 right-2 bg-red-500/90 text-white text-[10px] md:text-xs px-2 py-1 rounded-full backdrop-blur-sm font-bold shadow-lg border border-red-400/50">
                    38.5°C
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="aspect-square relative rounded-xl overflow-hidden border border-white/10 bg-black/50 group cursor-pointer shadow-inner">
                  <img src={thermalHorseDark} alt="After Treatment" className="object-cover w-full h-full grayscale opacity-80 transition-transform group-hover:scale-105" style={{ filter: "hue-rotate(180deg) contrast(1.4) brightness(0.8)" }} />
                  <div className="absolute top-2 left-2 bg-black/80 text-white text-[10px] md:text-xs px-2 py-1 rounded-md backdrop-blur-sm font-medium border border-white/10">
                    AFTER (14:20)
                  </div>
                   <div className="absolute bottom-2 right-2 bg-primary/90 text-white text-[10px] md:text-xs px-2 py-1 rounded-full backdrop-blur-sm font-bold shadow-lg border border-primary/50">
                    22.1°C
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <h4 className="font-bold text-sm flex items-center gap-2 mb-2 text-primary uppercase tracking-wide">
                <FileText className="w-4 h-4" /> Diagnosis Note
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Significant inflammation reduction observed in the left hock area. Thermal delta indicates successful cryotherapy application. Recommended follow-up in 48 hours.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 md:col-span-1 shadow-lg bg-card/50 backdrop-blur border-white/5">
          <CardHeader>
            <CardTitle className="uppercase tracking-wider text-sm md:text-base">Treatment History</CardTitle>
            <CardDescription>Recent sessions across all patients.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 md:p-6">
            <div className="rounded-md md:border border-white/10 overflow-hidden">
              <Table>
                <TableHeader className="hidden md:table-header-group">
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Date</TableHead>
                    <TableHead className="text-muted-foreground">Horse</TableHead>
                    <TableHead className="text-muted-foreground">Protocol</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { date: "Feb 24, 2024", horse: "Thunder Spirit", protocol: "Tendon Repair", status: "Completed" },
                    { date: "Feb 23, 2024", horse: "Bella Luna", protocol: "Recovery", status: "Completed" },
                    { date: "Feb 23, 2024", horse: "Apollo", protocol: "Inflammation", status: "Interrupted" },
                    { date: "Feb 22, 2024", horse: "Midnight Star", protocol: "Manual", status: "Completed" },
                    { date: "Feb 21, 2024", horse: "Thunder Spirit", protocol: "Tendon Repair", status: "Completed" },
                  ].map((row, i) => (
                    <TableRow key={i} className="flex flex-col md:table-row border-b md:border-b-0 p-4 md:p-0 border-white/5 hover:bg-white/5">
                      <TableCell className="font-medium text-xs text-muted-foreground md:table-cell pb-1 md:pb-4 pt-0 md:pt-4 border-none md:border-b border-white/5">
                        <span className="md:hidden font-semibold text-foreground mr-2">Date:</span>{row.date}
                      </TableCell>
                      <TableCell className="md:table-cell py-1 md:py-4 border-none md:border-b border-white/5 text-base md:text-sm font-semibold md:font-normal text-foreground">
                         <span className="md:hidden font-normal text-muted-foreground mr-2 text-xs">Patient:</span>{row.horse}
                      </TableCell>
                      <TableCell className="md:table-cell py-1 md:py-4 border-none md:border-b border-white/5 text-sm text-primary font-medium">
                         <span className="md:hidden font-normal text-muted-foreground mr-2 text-xs">Protocol:</span>{row.protocol}
                      </TableCell>
                      <TableCell className="md:table-cell py-1 md:py-4 border-none md:border-b border-white/5">
                        <div className="flex justify-between items-center md:block">
                           <span className="md:hidden text-xs text-muted-foreground">Status:</span>
                           <Badge variant={row.status === "Completed" ? "default" : "destructive"} className="text-[10px] md:text-xs">
                             {row.status}
                           </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 md:p-0 md:mt-4">
              <Button variant="ghost" className="w-full text-primary hover:text-primary/80 hover:bg-primary/10">
                View Full History <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
