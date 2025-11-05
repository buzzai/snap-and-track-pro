import { ArrowLeft, Search, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const MapLocation = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    toast.success("Location confirmed!");
    navigate("/create-project");
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Map Container */}
      <div className="relative w-full h-screen bg-muted">
        {/* Search Bar */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="bg-card rounded-full shadow-lg flex items-center px-4 py-3 gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1 flex items-center gap-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Type Address"
                className="border-0 p-0 h-auto focus-visible:ring-0 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Map Placeholder with marker */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="relative">
              <MapPin className="h-12 w-12 text-primary mx-auto fill-primary" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full" />
            </div>
          </div>
        </div>

        {/* Location Info Card */}
        <div className="absolute bottom-24 left-4 right-4 bg-card rounded-xl shadow-lg p-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold">Noida, UP 201304</p>
              <p className="text-sm text-muted-foreground">28.515695, 77.377166</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-3 z-10">
          <Link to="/" className="flex-1">
            <Button variant="outline" size="lg" className="w-full rounded-xl bg-muted">
              Cancel
            </Button>
          </Link>
          <Button
            onClick={handleConfirm}
            size="lg"
            className="flex-1 rounded-xl"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapLocation;
