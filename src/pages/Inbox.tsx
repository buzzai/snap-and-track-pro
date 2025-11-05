import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Bell } from "lucide-react";

const Inbox = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Inbox" showDropdown={false} />
      
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Bell className="h-10 w-10 text-muted-foreground" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-2">No notifications yet</h2>
            <p className="text-muted-foreground">
              You'll be notified about updates, mentions, and important activity here.
            </p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Inbox;
