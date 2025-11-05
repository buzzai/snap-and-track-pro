import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MapView from "./pages/MapView";
import MapLocation from "./pages/MapLocation";
import CreateProject from "./pages/CreateProject";
import ProjectDetails from "./pages/ProjectDetails";
import InviteUsers from "./pages/InviteUsers";
import Camera from "./pages/Camera";
import Tasks from "./pages/Tasks";
import TaskDetail from "./pages/TaskDetail";
import PhotoGallery from "./pages/PhotoGallery";
import Inbox from "./pages/Inbox";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/map-location" element={<MapLocation />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/project-details" element={<ProjectDetails />} />
          <Route path="/invite-users" element={<InviteUsers />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/task-detail/:id" element={<TaskDetail />} />
          <Route path="/photo-gallery" element={<PhotoGallery />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
