import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { User, Shield, Zap, Info, Smartphone, ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";

export default function Settings() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 pb-24 md:pb-8">
      <div className="flex items-center gap-2">
         <Link href="/">
           <Button variant="ghost" size="icon" className="md:hidden -ml-2">
             <ChevronLeft className="w-6 h-6" />
           </Button>
         </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-sm md:text-base text-muted-foreground">Manage application preferences.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5 text-primary" /> Clinic Profile
          </CardTitle>
          <CardDescription>Update your veterinary clinic details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="clinicName">Clinic Name</Label>
            <Input id="clinicName" defaultValue="Equine Performance Center" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="vetName">Lead Veterinarian</Label>
              <Input id="vetName" defaultValue="Dr. Sarah Anderson" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="license">License Number</Label>
              <Input id="license" defaultValue="VET-883920" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-secondary/10 px-6 py-4">
          <Button className="w-full md:w-auto">Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Smartphone className="w-5 h-5 text-primary" /> Device Connection
          </CardTitle>
          <CardDescription>Manage ESP32 Handheld Controller connection.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Bluetooth Discovery</Label>
              <p className="text-xs md:text-sm text-muted-foreground max-w-[200px] md:max-w-none">Allow the handheld device to connect automatically.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Auto-Sync Records</Label>
              <p className="text-xs md:text-sm text-muted-foreground max-w-[200px] md:max-w-none">Sync treatment data to cloud when Wi-Fi is available.</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="w-5 h-5 text-primary" /> About
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div className="flex justify-between py-2 border-b">
            <span>Software Version</span>
            <span className="text-foreground">v2.4.1 (Stable)</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Firmware Version (Handheld)</span>
            <span className="text-foreground">FW-2024-02-15</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Support Contact</span>
            <span className="text-primary hover:underline cursor-pointer">support@americacryo.com</span>
          </div>
          <div className="pt-4 text-xs text-center">
            &copy; 2024 America Cryo. All rights reserved. <br/>Designed for professional equine therapy.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
