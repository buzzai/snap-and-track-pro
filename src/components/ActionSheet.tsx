import { MapPin, Camera, FileText, CheckSquare, Image } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface ActionSheetProps {
  children: React.ReactNode;
}

const ActionSheet = ({ children }: ActionSheetProps) => {
  const actions = [
    {
      icon: MapPin,
      title: "Create Project",
      description: "Get organized at a new location",
      link: "/create-project",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Camera,
      title: "AI Walkthrough Note",
      description: "Talk, capture, get AI organized notes",
      link: "/camera",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      icon: FileText,
      title: "Create Page",
      description: "Create custom documents with your photos",
      link: "/tasks",
      iconBg: "bg-background",
      iconColor: "text-foreground",
    },
    {
      icon: CheckSquare,
      title: "Add Task",
      description: "Keep track of what needs to get done",
      link: "/tasks",
      iconBg: "bg-background",
      iconColor: "text-foreground",
    },
    {
      icon: Image,
      title: "Upload Photos",
      description: "Add photos from your camera roll",
      link: "/camera",
      iconBg: "bg-background",
      iconColor: "text-foreground",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl">
        <SheetHeader className="sr-only">
          <SheetTitle>Actions</SheetTitle>
        </SheetHeader>
        <div className="space-y-2 py-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} to={action.link}>
                <button className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors text-left">
                  <div className={`w-12 h-12 rounded-xl ${action.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-6 w-6 ${action.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </button>
              </Link>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ActionSheet;
