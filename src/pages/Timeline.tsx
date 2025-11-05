import { ArrowLeft, Camera, CheckSquare, Users, Clock } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

interface TimelineEvent {
  id: string;
  type: "task" | "photo" | "activity";
  timestamp: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  metadata?: Record<string, any>;
  status?: string;
  userInitials?: string;
}

const Timeline = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId") || "demo-project";
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimelineEvents();
    subscribeToChanges();
  }, [projectId]);

  const loadTimelineEvents = async () => {
    try {
      setLoading(true);

      const [tasksRes, photosRes, activitiesRes] = await Promise.all([
        supabase
          .from("tasks")
          .select("*")
          .eq("project_id", projectId)
          .order("created_at", { ascending: false }),
        supabase
          .from("photos")
          .select("*")
          .eq("project_id", projectId)
          .order("created_at", { ascending: false }),
        supabase
          .from("activities")
          .select("*")
          .eq("project_id", projectId)
          .order("created_at", { ascending: false }),
      ]);

      const combinedEvents: TimelineEvent[] = [];

      if (tasksRes.data) {
        tasksRes.data.forEach((task) => {
          combinedEvents.push({
            id: `task-${task.id}`,
            type: "task",
            timestamp: task.created_at,
            title: task.title,
            description: `Status: ${task.status}`,
            icon: <CheckSquare className="h-5 w-5 text-blue-500" />,
            status: task.status,
            metadata: { taskId: task.id },
          });
        });
      }

      if (photosRes.data) {
        photosRes.data.forEach((photo) => {
          combinedEvents.push({
            id: `photo-${photo.id}`,
            type: "photo",
            timestamp: photo.created_at,
            title: "New Photo Added",
            description: "A new photo was uploaded to the project",
            icon: <Camera className="h-5 w-5 text-green-500" />,
            metadata: { photoId: photo.id },
          });
        });
      }

      if (activitiesRes.data) {
        activitiesRes.data.forEach((activity) => {
          combinedEvents.push({
            id: `activity-${activity.id}`,
            type: "activity",
            timestamp: activity.created_at,
            title: activity.description,
            description: activity.type.replace(/_/g, " "),
            icon: <Users className="h-5 w-5 text-purple-500" />,
            userInitials: "TM",
            metadata: activity.metadata,
          });
        });
      }

      combinedEvents.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      setEvents(combinedEvents);
    } catch (error) {
      console.error("Error loading timeline events:", error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToChanges = () => {
    const tasksSubscription = supabase
      .channel(`tasks:${projectId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
          filter: `project_id=eq.${projectId}`,
        },
        () => {
          loadTimelineEvents();
        }
      )
      .subscribe();

    const photosSubscription = supabase
      .channel(`photos:${projectId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "photos",
          filter: `project_id=eq.${projectId}`,
        },
        () => {
          loadTimelineEvents();
        }
      )
      .subscribe();

    const activitiesSubscription = supabase
      .channel(`activities:${projectId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "activities",
          filter: `project_id=eq.${projectId}`,
        },
        () => {
          loadTimelineEvents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(tasksSubscription);
      supabase.removeChannel(photosSubscription);
      supabase.removeChannel(activitiesSubscription);
    };
  };

  const getStatusBadgeVariant = (
    status: string
  ): "default" | "secondary" | "outline" => {
    if (status === "completed") return "default";
    if (status === "in-progress") return "secondary";
    return "outline";
  };

  const groupedEvents = events.reduce(
    (acc, event) => {
      const date = format(new Date(event.timestamp), "MMM d, yyyy");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    },
    {} as Record<string, TimelineEvent[]>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <Link to="/project-details">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold flex-1">Project Timeline</h1>
      </div>

      <div className="p-4 space-y-6">
        {loading && <p className="text-center text-muted-foreground">Loading timeline...</p>}

        {!loading && events.length === 0 && (
          <p className="text-center text-muted-foreground">No events yet</p>
        )}

        {!loading &&
          Object.entries(groupedEvents).map(([date, dateEvents]) => (
            <div key={date}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-border" />
                <p className="text-sm font-semibold text-muted-foreground">
                  {date}
                </p>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="space-y-3">
                {dateEvents.map((event, index) => (
                  <div key={event.id} className="relative">
                    {index !== dateEvents.length - 1 && (
                      <div className="absolute left-5 top-10 bottom-0 w-px bg-border" />
                    )}

                    <Card className="p-4 relative">
                      <div className="absolute -left-8 top-4 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center">
                        {event.icon}
                      </div>

                      <div className="ml-2">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-sm">{event.title}</h3>
                          {event.status && (
                            <Badge
                              variant={getStatusBadgeVariant(event.status)}
                              className="text-xs"
                            >
                              {event.status}
                            </Badge>
                          )}
                        </div>

                        {event.description && (
                          <p className="text-xs text-muted-foreground mb-2">
                            {event.description}
                          </p>
                        )}

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {format(new Date(event.timestamp), "h:mm a")}
                        </div>

                        {event.userInitials && (
                          <div className="mt-2 flex items-center gap-2">
                            <Avatar className="w-6 h-6 bg-muted">
                              <AvatarFallback className="text-xs font-semibold">
                                {event.userInitials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">
                              Team member
                            </span>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Timeline;
