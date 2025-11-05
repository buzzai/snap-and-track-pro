import { ArrowLeft, Trash2, Calendar as CalendarIcon, User } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { format } from "date-fns";

interface TaskFormData {
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  priority: string;
  completed: boolean;
}

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [dueDate, setDueDate] = useState<Date>();
  
  const { register, handleSubmit, setValue, watch } = useForm<TaskFormData>({
    defaultValues: {
      title: isNew ? "" : "Site inspection",
      description: isNew ? "" : "Complete full site inspection and document findings",
      status: isNew ? "pending" : "in-progress",
      assignedTo: "",
      priority: "medium",
      completed: false,
    },
  });

  const completed = watch("completed");

  const onSubmit = (data: TaskFormData) => {
    console.log("Task data:", data, "Due date:", dueDate);
    toast.success(isNew ? "Task created successfully!" : "Task updated successfully!");
    navigate("/project-details");
  };

  const handleDelete = () => {
    toast.success("Task deleted successfully!");
    navigate("/project-details");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <Link to="/project-details">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">{isNew ? "New Task" : "Edit Task"}</h1>
        {!isNew && (
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash2 className="h-5 w-5 text-destructive" />
          </Button>
        )}
        {isNew && <div className="w-10" />}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6">
        {/* Mark as Complete */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              completed ? "bg-primary border-primary" : "border-muted-foreground/30"
            }`}>
              {completed && <div className="w-3 h-3 bg-background rounded-full" />}
            </div>
            <Label htmlFor="completed" className="font-semibold cursor-pointer">
              Mark as Complete
            </Label>
          </div>
          <Switch
            id="completed"
            checked={completed}
            onCheckedChange={(checked) => setValue("completed", checked)}
          />
        </div>

        {/* Task Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Task Title</Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="Enter task title"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Add task description..."
            rows={4}
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            defaultValue={isNew ? "pending" : "in-progress"}
            onValueChange={(value) => setValue("status", value)}
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            defaultValue="medium"
            onValueChange={(value) => setValue("priority", value)}
          >
            <SelectTrigger id="priority">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Due Date */}
        <div className="space-y-2">
          <Label>Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Assign To */}
        <div className="space-y-2">
          <Label htmlFor="assignedTo">Assign To</Label>
          <Select onValueChange={(value) => setValue("assignedTo", value)}>
            <SelectTrigger id="assignedTo">
              <SelectValue placeholder="Select team member" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lalit">Lalit Shukla</SelectItem>
              <SelectItem value="rajesh">Rajesh Kumar</SelectItem>
              <SelectItem value="priya">Priya Singh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Link to="/project-details" className="flex-1">
            <Button type="button" variant="outline" size="lg" className="w-full">
              Cancel
            </Button>
          </Link>
          <Button type="submit" size="lg" className="flex-1">
            {isNew ? "Create Task" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskDetail;
