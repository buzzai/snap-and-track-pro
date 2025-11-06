import { ArrowLeft, Camera, CheckCircle2, Users, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Timeline = () => {
  const timelineItems = [
    {
      id: 1,
      type: "photo",
      title: "New photos uploaded",
      description: "5 photos added to foundation work",
      user: "John Doe",
      avatar: "JD",
      time: "2 hours ago",
      date: "Nov 6, 2025",
      icon: Camera,
      images: [
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1513694261810-ae0a29da1eaf?w=200&h=200&fit=crop",
      ]
    },
    {
      id: 2,
      type: "task",
      title: "Task completed",
      description: "Foundation inspection completed",
      user: "Sarah Wilson",
      avatar: "SW",
      time: "5 hours ago",
      date: "Nov 6, 2025",
      icon: CheckCircle2,
      badge: "Completed"
    },
    {
      id: 3,
      type: "team",
      title: "Team member added",
      description: "Mike Johnson joined the project",
      user: "Admin",
      avatar: "AD",
      time: "1 day ago",
      date: "Nov 5, 2025",
      icon: Users,
    },
    {
      id: 4,
      type: "location",
      title: "Location updated",
      description: "Site address verified and confirmed",
      user: "John Doe",
      avatar: "JD",
      time: "1 day ago",
      date: "Nov 5, 2025",
      icon: MapPin,
    },
    {
      id: 5,
      type: "task",
      title: "New task created",
      description: "Electrical rough-in scheduled",
      user: "Sarah Wilson",
      avatar: "SW",
      time: "2 days ago",
      date: "Nov 4, 2025",
      icon: Clock,
      badge: "In Progress"
    },
    {
      id: 6,
      type: "photo",
      title: "Photos uploaded",
      description: "3 photos from site inspection",
      user: "Mike Johnson",
      avatar: "MJ",
      time: "3 days ago",
      date: "Nov 3, 2025",
      icon: Camera,
      images: [
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop",
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 bg-card border-b border-border z-40">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link to="/project-details">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Project Timeline</h1>
              <p className="text-sm text-muted-foreground">Residential Complex Project</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {timelineItems.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === timelineItems.length - 1;
            
            return (
              <div key={item.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  {!isLast && <div className="w-0.5 h-full bg-border mt-2" />}
                </div>

                <Card className="flex-1 mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-2">
                          {item.badge}
                        </Badge>
                      )}
                    </div>

                    {item.images && (
                      <div className="flex gap-2 my-3">
                        {item.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Preview ${idx + 1}`}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="" />
                          <AvatarFallback className="text-xs">{item.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{item.user}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.time} • {item.date}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Timeline;