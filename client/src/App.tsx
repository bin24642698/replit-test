import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Projects from "@/pages/writing/projects";
import Project from "@/pages/writing/project";
import Plot from "@/pages/plot";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/writing" component={Projects} />
      <Route path="/writing/:id" component={Project} />
      <Route path="/plot" component={Plot} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
