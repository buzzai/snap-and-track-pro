import { Camera, MapPin, Users, ChevronRight, MoreVertical, Plus, Clock, CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import AIChatButton from "@/components/AIChatButton";
import FloatingCreateButton from "@/components/FloatingCreateButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Home = () => {
  const quickActions = [
    { icon: Clock, label: "Timeline", path: "/timeline", color: "text-blue-500" },
    { icon: Camera, label: "Photos", path: "/photo-gallery", color: "text-green-500" },
    { icon: CheckSquare, label: "Tasks", path: "/tasks", color: "text-orange-500" },
    { icon: Users, label: "Team", path: "/invite-users", color: "text-purple-500" },
  ];

  const onboardingTasks = [
    { icon: MapPin, title: "Create a Project", completed: false },
    { icon: Camera, title: "Take a Photo", completed: false },
    { icon: Users, title: "Invite Your Team", completed: false },
  ];

  const projectFilters = ["Nearby", "Recent", "Starred", "Company"];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Lalit Shukla" />
      
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Trial Badge */}
        <div className="flex justify-center">
          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 px-4 py-1.5 text-sm font-medium">
            ⚡ 10 days left!
          </Badge>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <Link key={action.path} to={action.path}>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors">
                    <action.icon className={`h-7 w-7 ${action.color}`} />
                    <span className="text-xs font-medium text-center text-foreground">{action.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Getting Started Card */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👋</span>
              <h2 className="text-lg font-semibold">Start with the Basics</h2>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="w-full h-1.5 bg-muted rounded-full mb-4">
            <div className="h-full w-0 bg-primary rounded-full transition-all" />
          </div>

          <div className="space-y-3">
            {onboardingTasks.map((task, index) => {
              const Icon = task.icon;
              return (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30" />
                    <span className="font-medium text-foreground">{task.title}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>
              );
            })}
          </div>
        </Card>

        {/* Team Members */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Link to="/invite-users">
              <button className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary flex items-center justify-center bg-primary/5">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs text-primary font-medium">Invite</span>
              </button>
            </Link>
            
            <div className="flex flex-col items-center gap-2">
              <Avatar className="w-16 h-16 bg-muted">
                <AvatarFallback className="text-lg font-semibold">LS</AvatarFallback>
              </Avatar>
              <span className="text-xs text-foreground font-medium">Lalit<br/>Shukla</span>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Projects</h2>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Project Filters */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {projectFilters.map((filter, index) => (
              <Button
                key={filter}
                variant={index === 0 ? "default" : "outline"}
                className="rounded-full whitespace-nowrap"
                size="sm"
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Sample Project - Replace with empty state when no projects */}
          <Link to="/project-details">
            <Card className="p-4 hover:bg-muted/50 transition-colors mb-3">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold mb-1">Sector 132 Public Park</h3>
                  <p className="text-sm text-muted-foreground">Sector 132, Noida</p>
                </div>
                <Badge variant="secondary">24 photos</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>Created Nov 4, 2024</span>
              </div>
            </Card>
          </Link>

          {/* Empty State */}
          <Card className="p-8 text-center bg-card">
            <h3 className="text-lg font-semibold mb-2">Ready to get started?</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Photos are automatically grouped by location, so everything stays in the right place.
            </p>
          </Card>
        </div>
      </main>

      <FloatingCreateButton />
      <AIChatButton />
      <BottomNav />
    </div>
  );
};

export default Home;
