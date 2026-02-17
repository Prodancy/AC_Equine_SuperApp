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
import { FileText, Download, Calendar, ArrowUpRight } from "lucide-react";
import thermalHorse from "@/assets/thermal-horse.jpg";

export default function Records() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Electronic Health Records</h1>
          <p className="text-muted-foreground">Diagnose, track, and analyze treatment history.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Export All Data
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Thermal Imaging Analysis</CardTitle>
            <CardDescription>Compare pre and post treatment thermal scans.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="aspect-square relative rounded-lg overflow-hidden border bg-muted group cursor-pointer">
                  <img src={thermalHorse} alt="Before Treatment" className="object-cover w-full h-full transition-transform group-hover:scale-105" />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    BEFORE (14:00)
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Max Temp:</span>
                  <span className="font-mono text-red-500 font-bold">38.5°C</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="aspect-square relative rounded-lg overflow-hidden border bg-muted group cursor-pointer">
                  <img src={thermalHorse} alt="After Treatment" className="object-cover w-full h-full grayscale transition-transform group-hover:scale-105" style={{ filter: "hue-rotate(90deg) contrast(1.2)" }} />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    AFTER (14:20)
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Max Temp:</span>
                  <span className="font-mono text-blue-500 font-bold">22.1°C</span>
                </div>
              </div>
            </div>
            <div className="bg-secondary/30 p-4 rounded-lg border border-secondary">
              <h4 className="font-medium text-sm flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4" /> Diagnosis Note
              </h4>
              <p className="text-sm text-muted-foreground">
                Significant inflammation reduction observed in the left hock area. Thermal delta indicates successful cryotherapy application. Recommended follow-up in 48 hours.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Treatment History</CardTitle>
            <CardDescription>Recent sessions across all patients.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
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
                  <TableRow key={i}>
                    <TableCell className="font-medium text-xs text-muted-foreground">{row.date}</TableCell>
                    <TableCell>{row.horse}</TableCell>
                    <TableCell>{row.protocol}</TableCell>
                    <TableCell>
                      <Badge variant={row.status === "Completed" ? "default" : "destructive"}>
                        {row.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="ghost" className="w-full mt-4 text-primary hover:text-primary/80">
              View Full History <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
