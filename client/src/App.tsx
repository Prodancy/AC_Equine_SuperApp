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
import Billing from "@/pages/Billing";
import HistoryDetail from "@/pages/HistoryDetail";
import Diagnose from "@/pages/Diagnose";
import NewAssessment from "@/pages/NewAssessment";
import Cryotherapy from "@/pages/Cryotherapy";
import Laser3B from "@/pages/Laser3B";
import Shockwave from "@/pages/Shockwave";
import ClassIV from "@/pages/ClassIV";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

function Router() {
  return (
    <div className="flex h-screen bg-background flex-col md:flex-row overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden touch-pan-y scroll-smooth overscroll-contain pb-20 md:pb-0">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/horses" component={Horses} />
          <Route path="/treatment" component={Treatment} />
          <Route path="/treatment/cryotherapy" component={Cryotherapy} />
          <Route path="/treatment/3b-laser" component={Laser3B} />
          <Route path="/treatment/shockwave" component={Shockwave} />
          <Route path="/treatment/class-iv" component={ClassIV} />
          <Route path="/records" component={Records} />
          <Route path="/diagnose" component={Diagnose} />
          <Route path="/diagnose/new" component={NewAssessment} />
          <Route path="/billing" component={Billing} />
          <Route path="/settings" component={Settings} />
          <Route path="/horses/:horseId/history/:date" component={HistoryDetail} />
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
