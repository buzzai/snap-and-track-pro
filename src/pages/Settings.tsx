import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const preferenceItems = [
    "Camera",
    "Location",
    "Notifications",
    "Open Device Settings",
    "Uploads",
  ];

  const aboutItems = [
    "Billing",
    "Manage Accounts",
    "Stored Resources",
    "Technical",
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 bg-card border-b border-border z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto">
        {/* Preferences Section */}
        <div className="py-6">
          <h2 className="px-6 mb-3 text-sm font-semibold text-foreground">Preferences</h2>
          <div className="bg-card border-y border-border">
            {preferenceItems.map((item, index) => (
              <button
                key={item}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors border-b border-border last:border-0"
              >
                <span className="text-foreground">{item}</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="py-6">
          <h2 className="px-6 mb-3 text-sm font-semibold text-foreground">About</h2>
          <div className="bg-card border-y border-border">
            {aboutItems.map((item, index) => (
              <button
                key={item}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors border-b border-border last:border-0"
              >
                <span className="text-foreground">{item}</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="py-6">
          <h2 className="px-6 mb-3 text-sm font-semibold text-foreground">Help</h2>
          <div className="bg-card border-y border-border">
            <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors">
              <span className="text-foreground">Help Center</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Settings;
