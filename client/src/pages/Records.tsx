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
import thermalHorse from "@/assets/thermal-horse.jpg";
import { Link } from "wouter";

export default function Records() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex items-center gap-2">
          <Link href="/">
             <Button variant="ghost" size="icon" className="md:hidden -ml-2">
               <ChevronLeft className="w-6 h-6" />
             </Button>
           </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Health Records</h1>
            <p className="text-sm md:text-base text-muted-foreground">Diagnose, track, and analyze treatment history.</p>
          </div>
        </div>
        <div className="flex w-full md:w-auto gap-2">
            <Button className="flex-1 md:flex-none gap-2 bg-blue-600 hover:bg-blue-700">
            <Camera className="w-4 h-4" /> New Scan
            </Button>
            <Button variant="outline" className="flex-1 md:flex-none gap-2">
            <Download className="w-4 h-4" /> Export
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1 shadow-md">
          <CardHeader>
            <CardTitle>Thermal Imaging Analysis</CardTitle>
            <CardDescription>Compare pre and post treatment thermal scans.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-2">
                <div className="aspect-square relative rounded-xl overflow-hidden border bg-muted group cursor-pointer shadow-inner">
                  <img src={thermalHorse} alt="Before Treatment" className="object-cover w-full h-full transition-transform group-hover:scale-105" />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] md:text-xs px-2 py-1 rounded-md backdrop-blur-sm font-medium">
                    BEFORE (14:00)
                  </div>
                  <div className="absolute bottom-2 right-2 bg-red-500/90 text-white text-[10px] md:text-xs px-2 py-1 rounded-full backdrop-blur-sm font-bold shadow-sm">
                    38.5°C
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="aspect-square relative rounded-xl overflow-hidden border bg-muted group cursor-pointer shadow-inner">
                  <img src={thermalHorse} alt="After Treatment" className="object-cover w-full h-full grayscale transition-transform group-hover:scale-105" style={{ filter: "hue-rotate(90deg) contrast(1.2)" }} />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] md:text-xs px-2 py-1 rounded-md backdrop-blur-sm font-medium">
                    AFTER (14:20)
                  </div>
                   <div className="absolute bottom-2 right-2 bg-blue-500/90 text-white text-[10px] md:text-xs px-2 py-1 rounded-full backdrop-blur-sm font-bold shadow-sm">
                    22.1°C
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-secondary/30 p-4 rounded-lg border border-secondary">
              <h4 className="font-medium text-sm flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4" /> Diagnosis Note
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Significant inflammation reduction observed in the left hock area. Thermal delta indicates successful cryotherapy application. Recommended follow-up in 48 hours.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 md:col-span-1 shadow-md">
          <CardHeader>
            <CardTitle>Treatment History</CardTitle>
            <CardDescription>Recent sessions across all patients.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 md:p-6">
            <div className="rounded-md md:border overflow-hidden">
              <Table>
                <TableHeader className="hidden md:table-header-group">
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Horse</TableHead>
                    <TableHead>Protocol</TableHead>
                    <TableHead>Status</TableHead>
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
                    <TableRow key={i} className="flex flex-col md:table-row border-b md:border-b-0 p-4 md:p-0">
                      <TableCell className="font-medium text-xs text-muted-foreground md:table-cell pb-1 md:pb-4 pt-0 md:pt-4 border-none md:border-b">
                        <span className="md:hidden font-semibold text-foreground mr-2">Date:</span>{row.date}
                      </TableCell>
                      <TableCell className="md:table-cell py-1 md:py-4 border-none md:border-b text-base md:text-sm font-semibold md:font-normal">
                         <span className="md:hidden font-normal text-muted-foreground mr-2 text-xs">Patient:</span>{row.horse}
                      </TableCell>
                      <TableCell className="md:table-cell py-1 md:py-4 border-none md:border-b text-sm">
                         <span className="md:hidden font-normal text-muted-foreground mr-2 text-xs">Protocol:</span>{row.protocol}
                      </TableCell>
                      <TableCell className="md:table-cell py-1 md:py-4 border-none md:border-b">
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
              <Button variant="ghost" className="w-full text-primary hover:text-primary/80">
                View Full History <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
