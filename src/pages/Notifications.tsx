import { ArrowLeft, CheckCircle2, Camera, Users, AlertCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Notifications = () => {
  const notifications = {
    all: [
      {
        id: 1,
        type: "task",
        title: "Task assigned to you",
        message: "You've been assigned to 'Foundation inspection'",
        time: "5 minutes ago",
        read: false,
        icon: CheckCircle2,
        user: "Sarah Wilson",
        avatar: "SW",
      },
      {
        id: 2,
        type: "photo",
        title: "New photos uploaded",
        message: "John Doe added 5 photos to Residential Complex",
        time: "2 hours ago",
        read: false,
        icon: Camera,
        user: "John Doe",
        avatar: "JD",
      },
      {
        id: 3,
        type: "team",
        title: "Team member joined",
        message: "Mike Johnson has joined your project team",
        time: "1 day ago",
        read: true,
        icon: Users,
        user: "Admin",
        avatar: "AD",
      },
      {
        id: 4,
        type: "alert",
        title: "Task deadline approaching",
        message: "Electrical rough-in due in 2 days",
        time: "1 day ago",
        read: true,
        icon: AlertCircle,
        user: "System",
        avatar: "SY",
      },
      {
        id: 5,
        type: "task",
        title: "Task completed",
        message: "Site preparation has been marked as complete",
        time: "2 days ago",
        read: true,
        icon: CheckCircle2,
        user: "Mike Johnson",
        avatar: "MJ",
      },
    ],
  };

  const unreadCount = notifications.all.filter(n => !n.read).length;

  const NotificationItem = ({ notification }: { notification: typeof notifications.all[0] }) => {
    const Icon = notification.icon;
    
    return (
      <Card className={notification.read ? "opacity-60" : ""}>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                notification.read ? "bg-muted" : "bg-primary/10"
              }`}>
                <Icon className={`h-5 w-5 ${notification.read ? "text-muted-foreground" : "text-primary"}`} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-semibold text-foreground text-sm">{notification.title}</h3>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
              
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-xs">{notification.avatar}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{notification.user}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 bg-card border-b border-border z-40">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
                )}
              </div>
            </div>
            
            <Button variant="ghost" size="sm">
              Mark all read
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="all">
              All
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 min-w-5 px-1">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {notifications.all.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </TabsContent>

          <TabsContent value="tasks" className="space-y-3">
            {notifications.all
              .filter(n => n.type === "task" || n.type === "alert")
              .map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
          </TabsContent>

          <TabsContent value="photos" className="space-y-3">
            {notifications.all
              .filter(n => n.type === "photo")
              .map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
          </TabsContent>

          <TabsContent value="team" className="space-y-3">
            {notifications.all
              .filter(n => n.type === "team")
              .map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Notifications;