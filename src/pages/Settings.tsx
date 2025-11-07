import { useState } from "react";
import { Settings as SettingsIcon, Search, ChevronDown } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("tasks");

  const tabs = [
    { id: "tasks", label: "Tasks" },
    { id: "photos", label: "Photos" },
    { id: "projects", label: "Projects" },
    { id: "reports", label: "Reports" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-card border-b border-border z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Lalit Shukla</h1>
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <SettingsIcon className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="max-w-2xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-border rounded-none">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 font-semibold"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Tasks Tab Content */}
        {activeTab === "tasks" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-3xl font-bold mb-4">Your work here is done!</h2>
            <p className="text-muted-foreground mb-8">
              When you have unfinished tasks,<br />they'll show up here.
            </p>
            <Link to="/tasks" className="w-full max-w-md">
              <Button className="w-full h-12 text-lg font-semibold">
                Add Task
              </Button>
            </Link>
          </div>
        )}

        {/* Photos Tab Content */}
        {activeTab === "photos" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-3xl font-bold mb-4">No photos yet!</h2>
            <p className="text-muted-foreground mb-8">
              Your photos will appear here<br />once you start capturing.
            </p>
            <Link to="/photo-gallery" className="w-full max-w-md">
              <Button className="w-full h-12 text-lg font-semibold">
                View Gallery
              </Button>
            </Link>
          </div>
        )}

        {/* Projects Tab Content */}
        {activeTab === "projects" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-3xl font-bold mb-4">No projects yet!</h2>
            <p className="text-muted-foreground mb-8">
              Start your first project<br />and track your progress.
            </p>
            <Link to="/create-project" className="w-full max-w-md">
              <Button className="w-full h-12 text-lg font-semibold">
                Create Project
              </Button>
            </Link>
          </div>
        )}

        {/* Reports Tab Content */}
        {activeTab === "reports" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-3xl font-bold mb-4">No reports available!</h2>
            <p className="text-muted-foreground mb-8">
              Generate reports from your<br />projects and tasks.
            </p>
            <Button className="w-full max-w-md h-12 text-lg font-semibold">
              Generate Report
            </Button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Settings;
