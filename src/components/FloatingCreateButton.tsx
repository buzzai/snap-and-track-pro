import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ActionSheet from "@/components/ActionSheet";

const FloatingCreateButton = () => {
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40">
      <ActionSheet>
        <Button
          size="lg"
          className="h-14 px-8 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Plus className="h-6 w-6 mr-2" />
          Create
        </Button>
      </ActionSheet>
    </div>
  );
};

export default FloatingCreateButton;
