import { Bell, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

interface Notification {
  id: string;
  type: "task_update" | "new_photo" | "team_activity";
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

interface NotificationCenterProps {
  projectId?: string;
}

const NotificationCenter = ({ projectId = "demo-project" }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
    subscribeToNotifications();
  }, [projectId]);

  const loadNotifications = async () => {
    try {
      const userId = "current-user-id";

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .eq("project_id", projectId)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;

      setNotifications(data || []);
      setUnreadCount((data || []).filter((n) => !n.read).length);
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  const subscribeToNotifications = () => {
    const userId = "current-user-id";

    const subscription = supabase
      .channel(`notifications:${userId}:${projectId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const newNotification = payload.new as Notification;
          setNotifications((prev) => [newNotification, ...prev]);
          setUnreadCount((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await supabase
        .from("notifications")
        .update({ read: true })
        .eq("id", notificationId);

      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      await supabase
        .from("notifications")
        .delete()
        .eq("id", notificationId);

      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "task_update":
        return "📋";
      case "new_photo":
        return "📸";
      case "team_activity":
        return "👥";
      default:
        return "🔔";
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-80 max-h-96 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden flex flex-col">
          <div className="border-b border-border p-4 flex items-center justify-between bg-muted/50">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount} new
              </Badge>
            )}
          </div>

          <div className="overflow-y-auto flex-1">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No notifications yet
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted/50 transition-colors ${
                      !notification.read ? "bg-muted/30" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{getNotificationIcon(notification.type)}</span>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-sm leading-tight">
                            {notification.title}
                          </h4>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <p className="text-xs text-muted-foreground mb-2">
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(notification.created_at), "h:mm a")}
                          </span>
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-primary hover:underline"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="border-t border-border p-3 bg-muted/50">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
