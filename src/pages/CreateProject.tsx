import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProjectFormData {
  projectName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
}

const CreateProject = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ProjectFormData>();

  const onSubmit = (data: ProjectFormData) => {
    console.log("Project data:", data);
    toast.success("Project created successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Create Project</h1>
        <Button
          variant="ghost"
          className="text-primary"
          onClick={handleSubmit(onSubmit)}
        >
          Create
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="projectName" className="text-sm text-muted-foreground">
            Project Name
          </Label>
          <Input
            id="projectName"
            {...register("projectName")}
            className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressLine1" className="text-sm text-muted-foreground">
            Address Line 1
          </Label>
          <Input
            id="addressLine1"
            {...register("addressLine1")}
            className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressLine2" className="text-sm text-muted-foreground">
            Address Line 2
          </Label>
          <Input
            id="addressLine2"
            {...register("addressLine2")}
            className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm text-muted-foreground">
              City
            </Label>
            <Input
              id="city"
              {...register("city")}
              defaultValue="Noida"
              className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" className="text-sm text-muted-foreground">
              State
            </Label>
            <Input
              id="state"
              {...register("state")}
              defaultValue="UP"
              className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postalCode" className="text-sm text-muted-foreground">
              Postal Code
            </Label>
            <Input
              id="postalCode"
              {...register("postalCode")}
              defaultValue="201304"
              className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 font-medium"
            />
          </div>
        </div>

        <Button type="submit" className="w-full rounded-lg" size="lg">
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateProject;
