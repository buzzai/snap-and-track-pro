import { ArrowLeft, FlipHorizontal, Zap, Grid3x3 } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

const Camera = () => {
  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Camera Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between p-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Zap className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Grid3x3 className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Camera Viewfinder */}
      <div className="relative w-full h-[calc(100vh-5rem)] bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white/50 space-y-4">
          <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-white/20 rounded-full" />
          </div>
          <p>Camera access required</p>
          <p className="text-sm">Enable camera permissions to take photos</p>
        </div>
      </div>

      {/* Camera Controls */}
      <div className="absolute bottom-24 left-0 right-0 pb-6">
        <div className="flex items-center justify-center gap-12">
          <div className="w-12" />
          
          <button className="w-20 h-20 rounded-full bg-white border-4 border-gray-300 hover:border-gray-400 transition-colors" />
          
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <FlipHorizontal className="h-7 w-7" />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Camera;
