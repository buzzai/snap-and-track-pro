import { Settings, Search, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NotificationCenter from "./NotificationCenter";

interface HeaderProps {
  title?: string;
  showDropdown?: boolean;
  showSettings?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  projectId?: string;
}

const Header = ({
  title = "My Company",
  showDropdown = true,
  showSettings = true,
  showSearch = true,
  showNotifications = true,
  projectId = "demo-project"
}: HeaderProps) => {
  return (
    <header className="sticky top-0 bg-card border-b border-border z-40">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
            {showDropdown && <ChevronDown className="h-5 w-5 text-muted-foreground" />}
          </div>

          <div className="flex items-center gap-2">
            {showNotifications && (
              <NotificationCenter projectId={projectId} />
            )}
            {showSettings && (
              <Link to="/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            )}
            {showSearch && (
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
