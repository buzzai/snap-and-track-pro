import { ArrowLeft, MoreVertical, MapPin, Calendar, Users, Camera, CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ActionSheet from "@/components/ActionSheet";

const ProjectDetails = () => {
  const project = {
    name: "Sector 132 Public Park",
    address: "Sector 132, Noida, UP 201304",
    created: "Nov 4, 2024",
    photoCount: 24,
    taskCount: 8,
    teamCount: 3,
  };

  const photos = [
    { id: 1, date: "Nov 4, 2024" },
    { id: 2, date: "Nov 4, 2024" },
    { id: 3, date: "Nov 3, 2024" },
    { id: 4, date: "Nov 3, 2024" },
    { id: 5, date: "Nov 2, 2024" },
    { id: 6, date: "Nov 2, 2024" },
  ];

  const tasks = [
    { id: 1, title: "Site inspection", status: "completed", dueDate: "Nov 5, 2024" },
    { id: 2, title: "Material procurement", status: "in-progress", dueDate: "Nov 8, 2024" },
    { id: 3, title: "Foundation work", status: "pending", dueDate: "Nov 12, 2024" },
  ];

  const team = [
    { id: 1, name: "Lalit Shukla", role: "Owner", initials: "LS" },
    { id: 2, name: "Rajesh Kumar", role: "Manager", initials: "RK" },
    { id: 3, name: "Priya Singh", role: "Inspector", initials: "PS" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold flex-1 text-center">Project Details</h1>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Project Info */}
      <div className="p-4 space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{project.address}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Created {project.created}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Link to="/photo-gallery">
            <Card className="p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
              <Camera className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-2xl font-bold">{project.photoCount}</p>
              <p className="text-xs text-muted-foreground">Photos</p>
            </Card>
          </Link>
          <Card className="p-4 text-center">
            <CheckSquare className="h-5 w-5 mx-auto mb-1 text-primary" />
            <p className="text-2xl font-bold">{project.taskCount}</p>
            <p className="text-xs text-muted-foreground">Tasks</p>
          </Card>
          <Card className="p-4 text-center">
            <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
            <p className="text-2xl font-bold">{project.teamCount}</p>
            <p className="text-xs text-muted-foreground">Team</p>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="w-full rounded-none border-b border-border bg-transparent h-auto p-0 px-4">
          <TabsTrigger
            value="photos"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Photos
          </TabsTrigger>
          <TabsTrigger
            value="tasks"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Tasks
          </TabsTrigger>
          <TabsTrigger
            value="team"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="p-4 mt-0">
          <div className="grid grid-cols-3 gap-2">
            {photos.map((photo) => (
              <Link key={photo.id} to="/photo-gallery">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
          <Link to="/photo-gallery">
            <Button variant="outline" className="w-full mt-4">
              View All Photos
            </Button>
          </Link>
        </TabsContent>

        <TabsContent value="tasks" className="p-4 mt-0 space-y-3">
          {tasks.map((task) => (
            <Link key={task.id} to={`/task-detail/${task.id}`}>
              <Card className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{task.title}</h3>
                  <Badge
                    variant={
                      task.status === "completed"
                        ? "default"
                        : task.status === "in-progress"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {task.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Due {task.dueDate}</span>
                </div>
              </Card>
            </Link>
          ))}
          <Link to="/task-detail/new">
            <Button variant="outline" className="w-full">
              Add New Task
            </Button>
          </Link>
        </TabsContent>

        <TabsContent value="team" className="p-4 mt-0 space-y-3">
          {team.map((member) => (
            <Card key={member.id} className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 bg-muted">
                  <AvatarFallback className="font-semibold">{member.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            </Card>
          ))}
          <Link to="/invite-users">
            <Button variant="outline" className="w-full">
              Invite Team Member
            </Button>
          </Link>
        </TabsContent>
      </Tabs>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-4 z-20">
        <ActionSheet>
          <Button size="lg" className="rounded-full h-14 w-14 shadow-lg">
            <Camera className="h-6 w-6" />
          </Button>
        </ActionSheet>
      </div>
    </div>
  );
};

export default ProjectDetails;
