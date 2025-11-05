import { ArrowLeft, Plus, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

const MapView = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Map Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <Link to="/">
          <Button variant="secondary" size="icon" className="rounded-full shadow-lg">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        
        <div className="bg-card rounded-lg shadow-lg px-4 py-2">
          <h2 className="font-semibold">Sector 132 Public Park</h2>
          <p className="text-xs text-muted-foreground">सेक्टर 132 पब्लिक पार्क</p>
        </div>
        
        <div className="w-10" />
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[calc(100vh-5rem)] bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-full" />
            </div>
            <p className="text-muted-foreground">Map view - Location services</p>
          </div>
        </div>

        {/* Compass */}
        <div className="absolute bottom-24 left-4">
          <Button variant="secondary" size="icon" className="rounded-full shadow-lg">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              stroke="currentColor"
            >
              <path d="M12 2L8 12L12 10L16 12L12 2Z" strokeWidth="2" />
            </svg>
          </Button>
        </div>

        {/* Layers */}
        <div className="absolute bottom-24 right-4">
          <Button variant="secondary" size="icon" className="rounded-full shadow-lg">
            <Layers className="h-5 w-5" />
          </Button>
        </div>

        {/* New Project Button */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
          <Button className="rounded-full shadow-lg px-6" size="lg">
            <Plus className="h-5 w-5 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default MapView;
