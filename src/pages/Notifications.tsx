import { ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
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

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    loadNotifications();
    subscribeToNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const userId = "current-user-id";

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setNotifications(data || []);
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToNotifications = () => {
    const userId = "current-user-id";

    const subscription = supabase
      .channel(`all-notifications:${userId}`)
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
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const userId = "current-user-id";
      await supabase
        .from("notifications")
        .update({ read: true })
        .eq("user_id", userId)
        .eq("read", false);

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      console.error("Error marking all as read:", error);
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

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold flex-1 text-center">Notifications</h1>
        <div className="w-10" />
      </div>

      <div className="p-4">
        {/* Filter and Actions */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("unread")}
            >
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </Button>
          </div>

          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {loading && (
            <p className="text-center text-muted-foreground">Loading...</p>
          )}

          {!loading && filteredNotifications.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              {filter === "unread" ? "No unread notifications" : "No notifications"}
            </p>
          )}

          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 ${!notification.read ? "bg-muted/30" : ""}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">
                  {getNotificationIcon(notification.type)}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="font-semibold text-sm">{notification.title}</h3>
                      {!notification.read && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          New
                        </Badge>
                      )}
                    </div>

                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.message}
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(notification.created_at), "MMM d, h:mm a")}
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
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
