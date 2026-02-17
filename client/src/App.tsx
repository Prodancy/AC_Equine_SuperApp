import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Horses from "@/pages/Horses";
import Treatment from "@/pages/Treatment";
import Records from "@/pages/Records";
import Settings from "@/pages/Settings";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

function Router() {
  return (
    <div className="flex h-screen bg-background flex-col md:flex-row overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0 scroll-smooth">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/horses" component={Horses} />
          <Route path="/treatment" component={Treatment} />
          <Route path="/records" component={Records} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
