import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Tasks = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Lalit Shukla" />
      
      <main className="max-w-2xl mx-auto">
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent px-4">
            <TabsTrigger value="tasks" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Tasks
            </TabsTrigger>
            <TabsTrigger value="photos" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Photos
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Projects
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="px-4 py-12">
            <div className="text-center space-y-6 max-w-md mx-auto">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your work here is done!</h2>
                <p className="text-muted-foreground">
                  When you have unfinished tasks, they'll show up here.
                </p>
              </div>
              
              <Button className="rounded-full" size="lg">
                Add Task
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="photos" className="px-4 py-12">
            <div className="text-center text-muted-foreground">
              No photos yet
            </div>
          </TabsContent>

          <TabsContent value="projects" className="px-4 py-12">
            <div className="text-center text-muted-foreground">
              No projects yet
            </div>
          </TabsContent>

          <TabsContent value="reports" className="px-4 py-12">
            <div className="text-center text-muted-foreground">
              No reports yet
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default Tasks;
