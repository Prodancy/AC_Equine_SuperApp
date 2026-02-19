import america_cryo_logo from "@/assets/logo-official.png";
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
    <div className="p-3 md:p-6 max-w-4xl mx-auto space-y-6 pb-20 md:pb-6">
      <div className="flex justify-center mb-5">
        <div className="flex flex-col items-center">
          <img src={america_cryo_logo} alt="America Cryo Logo" className="h-7 md:h-9 w-auto mb-1" />
        </div>
      </div>
      <div className="flex justify-between items-center bg-card/30 backdrop-blur-md sticky top-0 z-50 py-4 px-4 md:px-8 -mx-4 md:-mx-8 mb-6">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-widest text-foreground">Settings</h1>
            <p className="text-[10px] text-muted-foreground tracking-tight hidden md:block">Preferences & Configuration</p>
          </div>
        </div>
      </div>

      <Card className="border-none bg-white/5 backdrop-blur-sm">
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

      <Card className="border-none bg-white/5 backdrop-blur-sm">
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

      <Card className="border-none bg-white/5 backdrop-blur-sm">
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
