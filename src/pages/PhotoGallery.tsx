import { ArrowLeft, Search, Filter, Camera, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import ActionSheet from "@/components/ActionSheet";

const PhotoGallery = () => {
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedDate, setSelectedDate] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const photos = [
    { id: 1, date: "Nov 4, 2024", project: "Sector 132 Public Park", location: "Noida" },
    { id: 2, date: "Nov 4, 2024", project: "Sector 132 Public Park", location: "Noida" },
    { id: 3, date: "Nov 4, 2024", project: "Sector 132 Public Park", location: "Noida" },
    { id: 4, date: "Nov 3, 2024", project: "Residential Tower", location: "Delhi" },
    { id: 5, date: "Nov 3, 2024", project: "Residential Tower", location: "Delhi" },
    { id: 6, date: "Nov 3, 2024", project: "Residential Tower", location: "Delhi" },
    { id: 7, date: "Nov 2, 2024", project: "Commercial Complex", location: "Gurgaon" },
    { id: 8, date: "Nov 2, 2024", project: "Commercial Complex", location: "Gurgaon" },
    { id: 9, date: "Nov 2, 2024", project: "Commercial Complex", location: "Gurgaon" },
    { id: 10, date: "Nov 1, 2024", project: "Sector 132 Public Park", location: "Noida" },
    { id: 11, date: "Nov 1, 2024", project: "Sector 132 Public Park", location: "Noida" },
    { id: 12, date: "Nov 1, 2024", project: "Residential Tower", location: "Delhi" },
  ];

  const projects = [
    { value: "all", label: "All Projects" },
    { value: "sector-132", label: "Sector 132 Public Park" },
    { value: "residential", label: "Residential Tower" },
    { value: "commercial", label: "Commercial Complex" },
  ];

  const dateFilters = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
  ];

  const filteredPhotos = photos.filter((photo) => {
    const matchesProject = selectedProject === "all" || photo.project.toLowerCase().includes(selectedProject);
    const matchesSearch = photo.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         photo.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProject && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link to="/project-details">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Photos</h1>
          <div className="w-10" />
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search photos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/50"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 pb-3 flex gap-2">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="flex-1">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.value} value={project.value}>
                  {project.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="flex-1">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {dateFilters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Photo Count */}
      <div className="px-4 py-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredPhotos.length} {filteredPhotos.length === 1 ? "photo" : "photos"}
        </p>
        <Badge variant="secondary">{selectedProject === "all" ? "All Projects" : projects.find(p => p.value === selectedProject)?.label}</Badge>
      </div>

      {/* Photo Grid */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-2">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="relative group">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end p-2">
                <p className="text-xs text-white font-medium truncate">{photo.date}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <Card className="p-8 text-center mt-8">
            <Camera className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No photos found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your filters or add new photos
            </p>
            <ActionSheet>
              <Button>
                <Camera className="h-4 w-4 mr-2" />
                Add Photos
              </Button>
            </ActionSheet>
          </Card>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-4 z-20">
        <ActionSheet>
          <Button size="lg" className="rounded-full h-14 w-14 shadow-lg">
            <Camera className="h-6 w-6" />
          </Button>
        </ActionSheet>
      </div>
    </div>
  );
};

export default PhotoGallery;
